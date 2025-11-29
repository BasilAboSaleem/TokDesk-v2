const express = require('express');
const router = express.Router();
const superAdminController = require('../controllers/superAdminController');
//const authMiddleware = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorize');

router.get('/superadmin/companies/pending-approval',authorize([]) , superAdminController.renderPendingCompaniesPage);
router.get('/superadmin/companies/:id/view',authorize([]) , superAdminController.renderCompanyDetailsPage);
router.post('/superadmin/companies/:id/approve',authorize([]) , superAdminController.approveCompany);
router.post('/superadmin/companies/:id/reject',authorize([]) , superAdminController.rejectCompany);
router.get('/superadmin/companies',authorize([]) , superAdminController.listAllCompanies);
module.exports = router; 