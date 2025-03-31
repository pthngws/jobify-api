const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  location: { type: String, required: true },
  website: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Company", CompanySchema);
