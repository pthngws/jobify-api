const express = require('express');
const app = express();

app.use(express.json()); // Middleware xử lý JSON
app.use(express.urlencoded({ extended: true })); // Middleware xử lý form data

module.exports = app;
