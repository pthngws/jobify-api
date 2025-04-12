const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const authenticateToken = require("../middlewares/authenticateToken");
const authorizeRole = require("../middlewares/authorizeRole");

//
router.post("/",authenticateToken,authorizeRole("recruit"), companyController.createCompany);
router.get("/",authenticateToken, companyController.getAllCompanies);
router.get("/:id",authenticateToken, companyController.getCompanyById);
router.put("/:id",authenticateToken,authorizeRole("recruit"), companyController.updateCompany);
router.delete("/:id",authenticateToken,authorizeRole("recruit"), companyController.deleteCompany);

module.exports = router;
