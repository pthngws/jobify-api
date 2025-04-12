const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const authenticateToken = require("../middlewares/authenticateToken.js")
const authorizeRole = require("../middlewares/authorizeRole.js")


//Đăng tuyển dụng
router.post("/",authenticateToken, authorizeRole("recruit"), jobController.createJob);
//Lấy danh sách công việc
router.get("/", jobController.getAllJobs);
//Lấy công việc bằng id
router.get("/:jobId", jobController.getJobById);
//Cập nhật công việc
router.put("/:jobId",authenticateToken, authorizeRole("recruit"), jobController.updateJob);
//Xóa công việc
router.delete("/:jobId",authenticateToken, authorizeRole("recruit,admin"), jobController.deleteJob);

router.get("/company/:companyId", jobController.getJobsByCompany);

module.exports = router;
