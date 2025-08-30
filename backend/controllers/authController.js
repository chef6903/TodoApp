import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Thiếu thông tin",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email đã tồn tại" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // bắt buộc khi deploy HTTPS
      sameSite: "None", // cho phép cookie gửi cross-site
      maxAge: 24 * 60 * 60 * 1000, // 1 ngày
    });

    return res.status(200).json({
      success: true,
      message: "Đăng ký thành công",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User không tồn tại" });
    }

    // Kiểm tra password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Sai mật khẩu" });
    }

    // Tạo token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // bắt buộc khi deploy HTTPS
      sameSite: "None", // cho phép cookie gửi cross-site
      maxAge: 24 * 60 * 60 * 1000, // 1 ngày
    });

    return res.json({
      success: true,
      message: "Đăng nhập thành công",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV == "production" ? "none" : "strict",
    });
    return res
      .status(200)
      .json({ success: true, message: "Đăng xuất thành công" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const isAuthenticated = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
