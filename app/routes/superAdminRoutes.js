const express = require('express');
const router = express.Router();
const superAdminController = require('../controllers/superAdminController');
//const authMiddleware = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorize');

router.get('/superadmin/companies/pending-approval',authorize([]) , superAdminController.renderPendingCompaniesPage);

module.exports = router; 