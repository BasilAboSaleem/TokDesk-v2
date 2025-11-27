const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { registerCompanyValidator , loginValidator } = require('../validators/authValidator');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get('/register', authController.renderRegisterCompanyPage);
router.post('/register-company', upload.single('logo'), registerCompanyValidator, authController.registerCompany);

router.get('/login', authController.renderLoginPage);
router.post('/login', loginValidator, authController.login); 

module.exports = router;    