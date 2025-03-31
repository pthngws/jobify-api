const Company = require("../models/Company");

const createCompany = async (name, description, location, website) => {
  return await Company.create({ name, description, location, website });
};

const getAllCompanies = async () => {
  return await Company.find();
};

const getCompanyById = async (id) => {
  return await Company.findById(id);
};

const updateCompany = async (id, updateData) => {
  return await Company.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteCompany = async (id) => {
  return await Company.findByIdAndDelete(id);
};

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
