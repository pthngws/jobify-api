const Job = require("../models/Job");
const User = require("../models/User");


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
  return await Job.find();
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
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
};
