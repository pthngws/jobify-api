const Application = require("../models/Application");

const createApplication = async (job, applicant, resume, coverLetter) => {
  return await Application.create({ job, applicant, resume, coverLetter });
};

const getAllApplications = async () => {
  return await Application.find().populate("job applicant");
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
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
};
