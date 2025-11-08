const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { registerCompanyValidator } = require('../validators/authValidator');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get('/register', authController.renderRegisterCompanyPage);
router.post('/register-company', upload.single('logo'), registerCompanyValidator, authController.registerCompany);


module.exports = router; 