const applicationService = require("../services/applicationService");


//Tạo đơn ứng tuyển
const createApplication = async (req, res) => {
  try {
    const { job, coverLetter } = req.body;
    const applicant = req.user.userId;
    const application = await applicationService.createApplication(job, applicant, coverLetter);
    
    res.status(201).json(application);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Lấy danh sách ứng viên
const getAllApplicationsByJobId = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await applicationService.getAllApplicationsByJobId(jobId);
    res.status(200).json(applications);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


//Lấy cụ thể thông tin ứng tuyển
const getApplicationById = async (req, res) => {
  try {
    const application = await applicationService.getApplicationById(req.params.id);
    res.status(200).json(application);
  } catch (err) {
    res.status(404).json({ error: "Không tìm thấy đơn ứng tuyển!" });
  }
};

//Cập nhật trạng thái ứng tuyển của ứng viên
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
  getAllApplicationsByJobId,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
};
