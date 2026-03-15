const User = require("../models/userModel");
const Company = require("../models/companyModel");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const [user, company] = await Promise.all([
      User.findById(userId).select("-password"),
      Company.findOne({ ownerId: userId }).select("_id name slug"),
    ]);

    res.json({
      ...user.toObject(),
      company: company
        ? {
            id: company._id,
            name: company.name,
            slug: company.slug,
          }
        : null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch profile",
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
