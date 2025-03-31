const companyService = require("../services/companyService");

const createCompany = async (req, res) => {
  try {
    const { name, description, location, website } = req.body;
    const company = await companyService.createCompany(name, description, location, website);
    res.status(201).json(company);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const companies = await companyService.getAllCompanies();
    res.status(200).json(companies);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const company = await companyService.getCompanyById(req.params.id);
    if (!company) return res.status(404).json({ error: "Không tìm thấy công ty!" });
    res.status(200).json(company);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateCompany = async (req, res) => {
  try {
    const updatedCompany = await companyService.updateCompany(req.params.id, req.body);
    if (!updatedCompany) return res.status(404).json({ error: "Không tìm thấy công ty!" });
    res.status(200).json(updatedCompany);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

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
