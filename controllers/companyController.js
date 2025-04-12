const companyService = require("../services/companyService");

// Tạo công ty
const createCompany = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, description, location, website, avatarUrl } = req.body;
    const company = await companyService.createCompany(userId, name, description, location, website, avatarUrl);
    res.status(201).json({ success: true, data: company });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Lấy danh sách các công ty
const getAllCompanies = async (req, res) => {
  try {
    const companies = await companyService.getAllCompanies();
    res.status(200).json({ success: true, data: companies });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Lấy cụ thể công ty
const getCompanyById = async (req, res) => {
  try {
    const company = await companyService.getCompanyById(req.params.companyId);
    if (!company) return res.status(404).json({ success: false, message: "Không tìm thấy công ty!" });
    res.status(200).json({ success: true, data: company });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Cập nhật công ty
const updateCompany = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const userId = req.user.userId;

    await companyService.checkCompanyOwnership(companyId, userId);

    const updatedCompany = await companyService.updateCompany(companyId, req.body);
    if (!updatedCompany) return res.status(404).json({ success: false, message: "Không tìm thấy công ty!" });
    res.status(200).json({ success: true, data: updatedCompany });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Xóa công ty
const deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const userId = req.user.userId;

    await companyService.checkCompanyOwnership(companyId, userId);

    await companyService.deleteCompany(companyId);
    res.status(200).json({ success: true, message: "Đã xóa công ty!" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
