'use strict';

const Router = require('koa-router');
const homeController = require('./controllers/home');


const router = new Router();
router.get('/', homeController.getPoll);
router.get('/user/:userId/votes', homeController.getUserVotes)
router.post('/create', homeController.makePoll);
router.post('/poll/:pollId', homeController.vote);
router.post('/poll/:pollId/close', homeController.closePoll);

module.exports = router;
