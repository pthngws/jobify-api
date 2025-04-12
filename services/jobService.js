const Job = require("../models/Job");
const User = require("../models/User");

const checkJobOwnership = async (jobId, userId) => {
  const job = await Job.findById(jobId).populate("company");

  if (!job) {
    throw new Error("Công việc không tồn tại!");
  }

  // Kiểm tra xem công ty có thuộc về người dùng không
  if (job.company.recruiter.toString() !== userId) {
    throw new Error("Bạn không có quyền truy cập công việc này!");
  }

  return job;
};

const createJob = async ({userId,title,description,requirements,location,salary,closingDate}) => {
  const user = await User.findById(userId);
  console.log(user);
  if (!user || !user.company) {
    throw new Error("User not found or user has no associated company");
  }
  const job = await Job.create({
    title,
    description,
    requirements,
    location,
    salary,
    closingDate,
    company: user.company,
  });
  
  return job;
};

const getAllJobs = async () => {
  return await Job.find().populate("company");
};

const getAllJobsByCompany = async (companyId) => {
  const jobs = await Job.find({ company: companyId }).populate("company");
  return jobs;
};

const getJobById = async (jobId) => {
  const job = await Job.findById(jobId);
  if (!job) {
    throw new Error("Công việc không tồn tại!");
  }
  return job;
};

const updateJob = async (jobId, {title,description,requirements,location,salary,closingDate}) => {
  const updatedJob = await Job.findByIdAndUpdate(jobId, jobData, { new: true });
  if (!updatedJob) {
    throw new Error("Không tìm thấy công việc để cập nhật!");
  }
  return updatedJob;
};

const deleteJob = async (jobId) => {
  const deletedJob = await Job.findByIdAndDelete(jobId);
  if (!deletedJob) {
    throw new Error("Không tìm thấy công việc để xóa!");
  }
  return deletedJob;
};

module.exports = {
  checkJobOwnership,
  createJob,
  getAllJobs,
  getAllJobsByCompany,
  getJobById,
  updateJob,
  deleteJob,
};
