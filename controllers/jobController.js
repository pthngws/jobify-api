const jobService = require("../services/jobService");

// Tạo công việc mới
const createJob = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {title,description,requirements,location,salary,closingDate} = req.body;
    const job = await jobService.createJob({userId,title,description,requirements,location,salary,closingDate});
    res.status(201).json({ success: true, data: job });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Lấy danh sách tất cả công việc
const getAllJobs = async (req, res) => {
  try {
    const jobs = await jobService.getAllJobs();
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getJobsByCompany = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const jobs = await jobService.getAllJobsByCompany(companyId);
    res.status(200).json({ success: true, data: jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// Lấy công việc theo ID
const getJobById = async (req, res) => {
  try {
    const job = await jobService.getJobById(req.params.id);
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// Cập nhật công việc
const updateJob = async (req, res) => {
  try {
    const {title,description,requirements,location,salary,closingDate} = req.body;
    const updatedJob = await jobService.updateJob(req.params.id, {title,description,requirements,location,salary,closingDate});
    res.status(200).json({ success: true, data: updatedJob });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Xóa công việc
const deleteJob = async (req, res) => {
  try {
    await jobService.deleteJob(req.params.id);
    res.status(200).json({ success: true, message: "Công việc đã bị xóa!" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { createJob, getAllJobs,getJobsByCompany, getJobById, updateJob, deleteJob };
