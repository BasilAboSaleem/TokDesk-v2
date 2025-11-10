const ROLES = require('../constants/roles');

exports.getDashboard = (req, res) => {
    res.render('dashboard/index', {
    title: 'Dashboard',
    page: 'dashboard',
    ROLES 
  });
}