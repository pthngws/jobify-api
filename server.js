const express = require("express");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());

connectDB(); // Kết nối database

app.use("/api/auth", require("./routes/auth"));

app.listen(8080, () => console.log("🚀 Server is running on port 8080"));
