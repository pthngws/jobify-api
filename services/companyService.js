const Company = require("../models/Company");
const User = require("../models/User");

const checkCompanyOwnership = async (companyId, userId) => {
  const company = await Company.findById(companyId);

  if (!company) {
    throw new Error("Công ty không tồn tại!");
  }

  // Kiểm tra xem công ty có thuộc về người dùng không
  if (company.recruiter.toString() !== userId) {
    throw new Error("Bạn không có quyền truy cập công ty này!");
  }

  return company;
};

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
  checkCompanyOwnership,
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
