const authService = require('../services/authService');

exports.renderRegisterCompanyPage = (req, res) => {
  res.render('dashboard/pages/auth/register-company'); 
};

exports.registerCompany = async (req, res) => {
  try {
    const result = await authService.registerCompany(req.body, req.file);

    res.redirect('/login');
} catch (err) {
    res.status(400).render('dashboard/pages/auth/register-company', {
      error: err.message,
      old: req.body,
      errors: []
    }); 
  }
};