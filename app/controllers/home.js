'use strict';

const { models } = require('mongoose')
const ObjectID = require('mongodb').ObjectID

const pkginfo = require('../../package.json');
const spec = require('../spec');

exports.getPoll = async ctx => {
  const { pollId, userId } = ctx.query
  const result = {}

  try {
    result.poll = await models.Poll.getPollInfo({ _id: ObjectID(pollId) }, { userId: Number(userId) })
    ctx.res.ok(result, 'poll')
  } catch (e) {
    console.log(e)
    ctx.res.fail(result, e.toString())
  }
};

exports.makePoll = async ctx => {
  const { userId, postId, options, title } = ctx.request.body
  const result = {}

  try {
    result.poll = await models.Poll.makePoll(userId, { model: 'Post', item: postId }, options, title)
    ctx.res.ok(result, 'poll created')
  } catch (e) {
    console.log(e)
    ctx.res.fail(result, e.toString())
  }


}

exports.vote = async ctx => {
  const { pollId } = ctx.params
  const { userId, idArray = [] } = ctx.request.body
  const result = {}

  try {
    const  poll = await models.Poll.findOne({ _id: ObjectID(pollId) })
    if (!poll) throw new Error('no poll found')

    result.result = await poll.vote(userId, idArray)
    ctx.res.ok(result, !result.result ? 'something went wrong' : 'voted')

  } catch (e) {
    console.log(e)
    ctx.res.fail(result, e.toString())
  }
}

exports.closePoll = async ctx => {
  const { pollId } = ctx.params
  const result = {}

  try {
    const poll = await models.Poll.findOne({ _id: ObjectID(pollId) })
    if (!poll) throw new Error('no poll found')

    result.result = await poll.closePoll()
    ctx.res.ok(result, !result.result ? 'something went wrong' : 'voted')

  } catch (e) {
    console.log(e)
    ctx.res.fail(result, e.toString())
  }
}


exports.getUserVotes = async ctx => {
  const { userId } = ctx.params
  const result = {}

  try {
    const user = {id: userId} // get from db if not test
    result.result = await models.PollOption.getUserVotes(user)
    ctx.res.ok(result, 'ok')
  } catch (e) {
    console.log(e)
    ctx.res.fail(result, e.toString())
  }
}
