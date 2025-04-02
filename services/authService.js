const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const registerUser = async (email, password, role) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword, role });
  await newUser.save();

  return { user: {
    _id: newUser.id,
    email: newUser.email,
    role: newUser.role,
  } };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email không tồn tại");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Sai mật khẩu!");
  }
  const token = jwt.sign({ userId: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

  return {  user: {
    _id: user.id,
    email: user.email,
    role: user.role,
    fullname: user.fullName,
    avatarUrl: user.avatarUrl,
    resumeUrl: user.resumeUrl,
  }, token };

};

const resetPasswordUser = async(email,newPassword)=>{
  const user = await User.findOneAndUpdate(
    { email: email }, 
    { $set: { password: await bcrypt.hash(newPassword, 10) } }, 
    { new: true } 
  );
  return {user: {
    _id: user.id,
    email: user.email,
    role: user.role,
  }};
}

module.exports = { registerUser, loginUser, resetPasswordUser };
