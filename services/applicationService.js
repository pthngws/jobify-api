const Application = require("../models/Application");

const createApplication = async (job, applicant, coverLetter) => {
  return await Application.create({ job, applicant, coverLetter });
};

const getAllApplicationsByJobId = async (jobId) => {
  return await Application.find({ job: jobId }).populate("job applicant");
};

const getApplicationById = async (id) => {
  return await Application.findById(id).populate("job applicant");
};

const updateApplicationStatus = async (id, status) => {
  return await Application.findByIdAndUpdate(id, { status }, { new: true });
};

const deleteApplication = async (id) => {
  return await Application.findByIdAndDelete(id);
};

module.exports = {
  createApplication,
  getAllApplicationsByJobId,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
};
