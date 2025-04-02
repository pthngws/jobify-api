const authService = require("../services/authService");
const otpService = require("../services/otpService");
const User = require("../models/User");

// Đăng ký người dùng mới
const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Kiểm tra nếu email đã tồn tại
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email đã tồn tại!" });
    }

    // Gửi OTP & lưu vào Redis
    await otpService.storeOtp(email, password, role);

    res.status(200).json({ message: "OTP đã được gửi đến email của bạn!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const forgetPassword = async (req,res)=>{
  try{
    const {email} = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({ error: "Email không tồn tại!" });
  }
  await otpService.storeOtpResetPassword(email);
  res.status(200).json({ message: "OTP đã được gửi đến email của bạn!" });
  
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const comfirmOtp = async(req,res) =>{
  try{
    const { email, otp } = req.body;
    await otpService.verifyOtp(email,otp);
    res.status(201).json({ message: "Xác thực OTP thành công!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const resetPassword =async(req,res) =>{
  try{
    const {email, newPassword} = req.body;
    await authService.resetPasswordUser(email,newPassword);
    res.status(201).json({ message: "Đổi mật khẩu thành công!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const completeRegistration = async (req, res) => {
  try {
    const { email, otp } = req.body;
    // Xác thực OTP & lấy thông tin từ Redis
    const { password, role } = await otpService.verifyOtp(email, otp);

    // Lưu vào database
    const { user } = await authService.registerUser(email, password, role);
    res.status(201).json({ message: "Đăng ký thành công!", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Đăng nhập người dùng
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);
    res.status(200).json({ message: "Đăng nhập thành công!", user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const logout = async (req, res) => {
  // Cách đơn giản: Xóa token khỏi phía client (client sẽ xóa trong localStorage, cookies,...)
  res.clearCookie("auth_token"); // Nếu bạn lưu token trong cookies
  res.status(200).json({ message: "Đăng xuất thành công" });
};

module.exports = { register, login, logout, completeRegistration, forgetPassword, comfirmOtp, resetPassword };
