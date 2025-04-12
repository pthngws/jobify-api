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

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: "Thiếu Refresh Token!" });
    }

    const { accessToken } = await authService.refreshAccessToken(refreshToken);
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
// Đăng nhập người dùng
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken,refreshToken } = await authService.loginUser(email, password);
    res.status(200).json({ message: "Đăng nhập thành công!", user, accessToken,refreshToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies["refresh_token"]; 

    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      const { sessionId, userId } = decoded;
      const key = `refreshTokens:${userId}`;
      const userTokens = await redisClient.sMembers(key);
      const tokenToRemove = userTokens.find((token) => {
        const tokenDecoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        return tokenDecoded.sessionId === sessionId;
      });

      if (tokenToRemove) {
        await redisClient.sRem(key, tokenToRemove); 
      }
      res.clearCookie("refresh_token");
    }

    res.status(200).json({ message: "Đăng xuất thành công" });
  } catch (error) {
    res.status(500).json({ error: "Đã có lỗi xảy ra khi đăng xuất!" });
  }
};

module.exports = { register, login, logout, completeRegistration, forgetPassword, comfirmOtp, resetPassword, refreshToken};
