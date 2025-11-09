const { loginService, registerCompany }  = require('../services/authService');

exports.renderRegisterCompanyPage = (req, res) => {
  res.render('dashboard/pages/auth/register-company'); 
};
exports.registerCompany = async (req, res) => {
  try {
    const result = await registerCompany.registerCompany(req.body, req.file);
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
exports.login = async (req, res) => {
  try {
    const token = await loginService.login(req.body);
    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      redirect: "/dashboard"

    });
  } catch (err) {
    res.status(400).json({
      errors: [
        { msg: err.message, path: 'server' }
      ]
    });
  }
};
