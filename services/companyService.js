const Company = require("../models/Company");
const User = require("../models/User");

const createCompany = async (userId,name, description, location, website,avatarUrl) => {
  const user = await User.findById(userId);
  if(!user){
    throw new Error("User not found");
  }
  const company = await Company.create({
    name,
    description,
    location,
    website,
    avatarUrl,
    recruiter: user._id,
  });

  // Gán company vào user
  user.company = company._id;
  await user.save();
  
  return company;
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
