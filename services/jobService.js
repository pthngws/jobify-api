const Job = require("../models/Job");

const createJob = async (jobData) => {
  const job = new Job(jobData);
  await job.save();
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

const updateJob = async (jobId, jobData) => {
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
