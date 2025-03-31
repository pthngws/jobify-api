const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const authenticateToken = require("../middlewares/authMiddleware");
const authorizeRole = require("../middlewares/authorizeRoleMiddleware");

router.post("/",authenticateToken,authorizeRole("applicant"), companyController.createCompany);
router.get("/",authenticateToken, companyController.getAllCompanies);
router.get("/:id",authenticateToken, companyController.getCompanyById);
router.put("/:id",authenticateToken,authorizeRole("applicant"), companyController.updateCompany);
router.delete("/:id",authenticateToken,authorizeRole("applicant"), companyController.deleteCompany);

module.exports = router;
