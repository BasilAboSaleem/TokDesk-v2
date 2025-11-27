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
    const { email, password } = req.body;
    const result = await loginService.login({ email, password });
    // if multiple companies, return the list for selection
    if (result.userCompanies) {
      return res.status(200).json({
        success: true,
        message: "Select a company to continue",
        userCompanies: result.userCompanies
      });
    }

    // if single company, set cookie and return token
    res.cookie("token", result.token, { httpOnly: true, maxAge: 24*60*60*1000 });
    res.status(200).json({
      success: true,
      message: "Login successful!",
      token: result.token,
      redirect: "/dashboard"
    });

  } catch (err) {
  res.status(400).json({
    errors: [
      { msg: err.message, path: err.field || 'server' }
    ]
  });
}
};

// Confirm company selection and finalize login
exports.confirmCompany = async (req, res) => {
  try {
    const { email, password, companyId } = req.body;
    const result = await loginService.confirmCompany({ email, password, companyId });

    res.cookie("token", result.token, { httpOnly: true, maxAge: 24*60*60*1000 });
    res.status(200).json({
      success: true,
      message: "Login successful!",
      token: result.token,
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