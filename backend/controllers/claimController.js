const User = require('../models/User');
const History = require('../models/History');

exports.claimPoints = async (req, res) => {
  const { userId } = req.params;
  const randomPoints = Math.floor(Math.random() * 10) + 1;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.totalPoints += randomPoints;
  await user.save();

  const history = new History({
    userId,
    points: randomPoints
  });
  await history.save();

  res.json({
    message: "Points claimed!",
    points: randomPoints,
    user
  });
};

exports.getLeaderboard = async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users);
};

exports.getHistory = async (req, res) => {
  const history = await History.find().populate("userId", "name").sort({ claimedAt: -1 });
  res.json(history);
};
