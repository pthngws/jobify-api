const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");
const authenticateToken = require("../middlewares/authMiddleware");


router.post("/",authenticateToken, applicationController.createApplication);
router.get("/",authenticateToken, applicationController.getAllApplications);
router.get("/:id",authenticateToken, applicationController.getApplicationById);
router.put("/:id",authenticateToken, applicationController.updateApplicationStatus);
router.delete("/:id",authenticateToken, applicationController.deleteApplication);

module.exports = router;
