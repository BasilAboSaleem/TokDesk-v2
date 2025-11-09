const authService = require('../services/authService');

exports.renderRegisterCompanyPage = (req, res) => {
  res.render('dashboard/pages/auth/register-company'); 
};

exports.registerCompany = async (req, res) => {
  try {
    const result = await authService.registerCompany(req.body, req.file);
return res.status(200).json({ 
      success: true, 
      message: "Company and Admin registered successfully!",
      redirect: "/auth/login" 
    });
 } catch (err) {
    res.status(400).json({
      errors: [
        { msg: err.message, path: 'server' }
      ]
    });
  }
};

exports.renderLoginPage = (req, res) => {
  res.render('dashboard/pages/auth/login'); 
}