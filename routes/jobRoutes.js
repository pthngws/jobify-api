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
router.get("/:id", jobController.getJobById);
//Cập nhật công việc
router.put("/:id",authenticateToken, authorizeRole("recruit"), jobController.updateJob);
//Xóa công việc
router.delete("/:id",authenticateToken, authorizeRole("recruit,admin"), jobController.deleteJob);

module.exports = router;
