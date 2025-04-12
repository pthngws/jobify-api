const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");
const authenticateToken = require("../middlewares/authenticateToken");
const authorizeRole = require("../middlewares/authorizeRole");


//Nộp đơn ứng tuyển
router.post("/",authenticateToken,authorizeRole("candidate"), applicationController.createApplication);
//Lấy danh sách ứng tuyển
router.get("/job/:jobId",authenticateToken,authorizeRole("recruit"), applicationController.getAllApplicationsByJobId);
//Lấy danh sách ứng tuyển bởi Id
router.get("/:id",authenticateToken,authorizeRole("recruit"), applicationController.getApplicationById);
//Cập nhật trạng thái ứng tuyển
router.put("/:id",authenticateToken,authorizeRole("recruit"), applicationController.updateApplicationStatus);

router.delete("/:id",authenticateToken,authorizeRole("recruit,admin"), applicationController.deleteApplication);

module.exports = router;
