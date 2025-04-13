const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const authenticateToken = require("../middlewares/authenticateToken");
const authorizeRole = require("../middlewares/authorizeRole");

// Đăng tuyển dụng
router.post(
    "/",
    authenticateToken,
    authorizeRole("recruit"),
    jobController.createJob
);

// Lấy danh sách công việc
router.get(
    "/", 
    jobController.getAllJobs
);

// Tìm kiếm công việc
router.get(
    "/search", 
    jobController.searchJobs
);

// Lấy công việc bằng ID
router.get("/:jobId", 
    jobController.getJobById
);

// Lấy công việc theo công ty
router.get("/company/:companyId", 
    jobController.getJobsByCompany
);

// Cập nhật công việc
router.put("/:jobId", 
    authenticateToken,
    authorizeRole("recruit"),
    jobController.updateJob
);

// Xóa công việc
router.delete("/:jobId", 
    authenticateToken, 
    authorizeRole(["recruit", "admin"]), 
    jobController.deleteJob
);

module.exports = router;