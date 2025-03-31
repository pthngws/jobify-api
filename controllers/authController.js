const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await authService.registerUser(email, password, role);
    res.status(201).json({ message: "Đăng ký thành công!", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.loginUser(email, password);
    res.json({ message: "Đăng nhập thành công!", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login };
