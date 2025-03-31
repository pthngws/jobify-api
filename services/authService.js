const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config(); // Đảm bảo bạn đã nạp biến môi trường từ .env

// Hàm đăng ký người dùng mới
const registerUser = async (email, password, role = "user") => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email đã tồn tại!");
  }

  const newUser = new User({ email, password, role });
  await newUser.save();
  
  // Tạo token khi đăng ký thành công
  const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
  return { user: newUser, token };
};

// Hàm đăng nhập
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    throw new Error("Sai email hoặc mật khẩu!");
  }

  // Tạo token khi đăng nhập thành công
  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
  return { user, token };
};

module.exports = { registerUser, loginUser };
