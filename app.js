const express = require("express");

const connectDB = require("./config/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB(); 

app.get("/", (req, res) => {
    res.json({ message: "Hello, world!" });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));
app.use("/api/companies", require("./routes/companyRoutes"));



module.exports = app;
