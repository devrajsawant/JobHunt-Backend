const User = require("../models/userModel");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch profile",
      error,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    }).select("-password");

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Profile update failed",
      error,
    });
  }
};
