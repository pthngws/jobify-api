const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },  // Mô tả công việc
  requirements: { type: [String] },  // Mảng các yêu cầu với ứng viên
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  location: { type: String },  // Tùy chọn: có thể bỏ nếu muốn dùng location của company
  salary: { type: Number },
  closingDate: { type: Date },  // Ngày kết thúc tuyển dụng
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", JobSchema);
