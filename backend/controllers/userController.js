import User from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    console.log("Cookies:", req.cookies);
    console.log("User:", req.user);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({
      success: true,
      user: {
        // 👈 đổi từ userData → user
        id: user._id,
        name: user.username,
        email: user.email,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
