const applicationService = require("../services/applicationService");

const createApplication = async (req, res) => {
  try {
    const { job, resume, coverLetter } = req.body;
    const applicant = req.user.id; // Lấy ID từ token đăng nhập
    const application = await applicationService.createApplication(job, applicant, resume, coverLetter);
    
    res.status(201).json(application);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const applications = await applicationService.getAllApplications();
    res.status(200).json(applications);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const application = await applicationService.getApplicationById(req.params.id);
    res.status(200).json(application);
  } catch (err) {
    res.status(404).json({ error: "Không tìm thấy đơn ứng tuyển!" });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedApplication = await applicationService.updateApplicationStatus(req.params.id, status);
    res.status(200).json(updatedApplication);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteApplication = async (req, res) => {
  try {
    await applicationService.deleteApplication(req.params.id);
    res.status(200).json({ message: "Đã xóa đơn ứng tuyển!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
};
