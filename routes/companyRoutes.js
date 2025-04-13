const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const authenticateToken = require("../middlewares/authenticateToken");
const authorizeRole = require("../middlewares/authorizeRole");

router.post("/", authenticateToken, authorizeRole(["recruit"]), companyController.createCompany);
router.get("/", authenticateToken, companyController.getAllCompanies);
router.get("/:companyId", authenticateToken, companyController.getCompanyById);
router.put("/:companyId", authenticateToken, authorizeRole(["recruit"]), companyController.updateCompany);
router.delete("/:companyId", authenticateToken, authorizeRole(["recruit", "admin"]), companyController.deleteCompany);

module.exports = router;
