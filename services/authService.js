const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const registerUser = async (email, password, role) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword, role });
  await newUser.save();

  const token = jwt.sign(
    { userId: newUser._id, role: newUser.role, email: newUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { user: newUser, token };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Sai email hoặc mật khẩu!");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Sai email hoặc mật khẩu!");
  }
  const token = jwt.sign({ userId: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

  return { user, token };
};


module.exports = { registerUser, loginUser };
