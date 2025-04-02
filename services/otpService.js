const redisClient = require("../config/redisClient");
const nodemailer = require("nodemailer");

// Tạo OTP ngẫu nhiên
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 số
};

// Gửi OTP qua email
const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: "Xác nhận đăng ký",
    text: `Mã OTP của bạn là: ${otp}. Hết hạn sau 5 phút.`,
  });
};

// Lưu OTP vào Redis
const storeOtp = async (email, password, role) => {
  const otp = generateOtp();
  await redisClient.set(`otp:${email}`, JSON.stringify({ otp, email, password, role }), {
    EX: 300, // Hết hạn sau 5 phút
  });
  await sendOtpEmail(email, otp);
};

const verifyOtp = async (email, otp) => {
    console.log(`ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ`);
  
    // Lấy dữ liệu OTP từ Redis
    const data = await redisClient.get(`otp:${email}`);
    if (!data) {
      console.log("Không tìm thấy OTP trong Redis hoặc OTP đã hết hạn.");
      throw new Error("OTP hết hạn hoặc không hợp lệ!");
    }
  
    console.log("Dữ liệu OTP từ Redis:", data);
  
    const { otp: storedOtp, password, role } = JSON.parse(data);
    console.log(`OTP từ Redis: ${storedOtp}, OTP nhập vào: ${otp}`);
  
    if (otp !== storedOtp) {
      console.log("OTP không đúng!");
      throw new Error("OTP không đúng!");
    }
  
    // Xóa OTP sau khi xác thực
    await redisClient.del(`otp:${email}`);
    console.log("Đã xóa OTP sau khi xác thực");
  
    return { email, password, role };
  };
  

module.exports = { storeOtp, verifyOtp };
