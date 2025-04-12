const companyService = require("../services/companyService");

//Tạo công ty
const createCompany = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, description, location, website,avatarUrl } = req.body;
    const company = await companyService.createCompany(userId,name, description, location, website,avatarUrl);
    res.status(201).json(company);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Lấy danh sách các công ty
const getAllCompanies = async (req, res) => {
  try {
    const companies = await companyService.getAllCompanies();
    res.status(200).json(companies);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Lấy cụ thể công ty
const getCompanyById = async (req, res) => {
  try {
    const company = await companyService.getCompanyById(req.params.id);
    if (!company) return res.status(404).json({ error: "Không tìm thấy công ty!" });
    res.status(200).json(company);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Cập nhật công ty
const updateCompany = async (req, res) => {
  try {
    const updatedCompany = await companyService.updateCompany(req.params.id, req.body);
    if (!updatedCompany) return res.status(404).json({ error: "Không tìm thấy công ty!" });
    res.status(200).json(updatedCompany);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Xóa công ty
const deleteCompany = async (req, res) => {
  try {
    await companyService.deleteCompany(req.params.id);
    res.status(200).json({ message: "Đã xóa công ty!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
