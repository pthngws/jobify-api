const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const authenticateToken = require("../middlewares/authenticateToken");
const authorizeRole = require("../middlewares/authorizeRole");

// Tạo công ty
router.post(
    "/", 
    authenticateToken, 
    authorizeRole("recruit"), 
    companyController.createCompany
);

// Lấy danh sách công ty
router.get(
    "/", 
    authenticateToken, 
    companyController.getAllCompanies
);

// Lấy công ty theo id
router.get(
    "/:companyId", 
    authenticateToken, 
    companyController.getCompanyById
);

// Cập nhật công ty
router.put(
    "/:companyId", 
    authenticateToken, 
    authorizeRole("recruit"), 
    companyController.updateCompany
);

// Xóa công ty
router.delete(
    "/:companyId", 
    authenticateToken, 
    authorizeRole("recruit,admin"), 
    companyController.deleteCompany
);

module.exports = router;
