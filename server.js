const app = require("./app"); // Import app.js
require("dotenv").config(); // Nạp biến môi trường từ .env
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
