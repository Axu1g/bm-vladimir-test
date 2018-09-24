/**
 * Тут комментируй
 */

const mongoose = require('mongoose')
const {extend} = require('lodash')

const {is} = require('./utils')
const ObjectID = require('mongodb').ObjectID
const ObjectId = mongoose.Schema.Types.ObjectId
/**
 * создание модели PollOption
 * включая поля из utils
 */
const model = new mongoose.Schema(extend({
  pollId: {type: ObjectId, ref: 'Post'}, // _id опроса
  value: {type: String, required: true}, // значение поля
  //
  votes: [{type: Number}], // список проголосовавших юзеров
}, is))

/**
 * индекс на pollId
 */
model.index({'pollId': 1})

model.statics.getMostVotedForPoll = async function (pollId) {
  const model = this
  model.aggregate(
    [
      {$match: {pollId: ObjectID(pollId)}},
      {$limit: 1},
      {$project: {_id: '$_id', length: {$size: '$votes'}}},
      {$sort: {length: -1}},
    ]
  )
}

/**
 * не очень понял что именно надо агрегировать из описания задачи, по этому просто список pollId, optionId, value
 * @param user
 * @returns {Promise<Aggregate>}
 */
model.statics.getUserVotes = async function(user = {}) {
  const model = this

  return model.aggregate([
    {$match: {votes: parseInt(user.id)}},
    {$project: {_id: 1, pollId: 1, value: 1}}
  ])
}

module.exports = mongoose.model('PollOption', model)
