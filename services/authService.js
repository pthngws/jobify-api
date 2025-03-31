const User = require("../models/User");

const registerUser = async (email, password, role = "user") => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email đã tồn tại!");
  }

  const newUser = new User({ email, password, role });
  await newUser.save();
  return newUser;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    throw new Error("Sai email hoặc mật khẩu!");
  }
  return user;
};

module.exports = { registerUser, loginUser };
