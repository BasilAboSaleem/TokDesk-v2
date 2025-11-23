const { loginService, registerCompany }  = require('../services/authService');

exports.renderRegisterCompanyPage = (req, res) => {
  res.render('dashboard/pages/auth/register-company'); 
};
exports.registerCompany = async (req, res) => {
  try {
    console.log(req.body);
    const result = await registerCompany.registerCompany(req.body, req.file);

    return res.status(200).json({ 
      success: true, 
      message: "Company and Admin registered successfully!",
      redirect: "/auth/login" 
    });

  } catch (err) {
    if (err.fieldErrors) {
      return res.status(400).json({ errors: err.fieldErrors });
    }

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
    res.cookie("token", token, { httpOnly: true, maxAge: 24*60*60*1000 });
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
