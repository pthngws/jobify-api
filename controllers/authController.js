const authService = require("../services/authService");

// Đăng ký người dùng mới
const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const { user, token } = await authService.registerUser(email, password, role);
    res.status(201).json({ message: "Đăng ký thành công!", user, token });
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

module.exports = { register, login };
