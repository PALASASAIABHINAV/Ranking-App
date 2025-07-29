const express = require('express');
const router = express.Router();
const { claimPoints, getLeaderboard, getHistory } = require('../controllers/claimController');

router.post('/:userId', claimPoints);
router.get('/leaderboard', getLeaderboard);
router.get('/history', getHistory);

module.exports = router;
