const Company = require('../models/Company');
const CompanyService = require('../services/superAdminServices');

exports.renderPendingCompaniesPage = async (req, res) => {
    try {
        const companies = await Company.find({ status: 'pending' });
        res.render('dashboard/pages/superAdmin/companies/pendingCompanies', {
            title: 'Pending Companies',
            companies
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

exports.renderCompanyDetailsPage = async (req, res) => {
    const companyId = req.params.id;
    try {
        const { company, admins, adminRelations  } = await CompanyService.getCompanyDetails(companyId);

        res.render('dashboard/pages/superAdmin/companies/companyDetails', {
            title: 'Company Details',
            company,
            admins,
            adminRelations
        });
    } catch (error) {
        console.error('Company Details Error:', error);
        res.status(500).send('Server Error');
    }
}

exports.approveCompany = async (req, res) => {
    const companyId = req.params.id;
    try {
        await CompanyService.approveCompany(companyId);
        const successMessage = req.t('dashboard:superAdmin.companies.flash_company_approved');
        req.flash('success_msg', successMessage);
        res.redirect('/superadmin/companies/pending-approval');
    } catch (error) {
        console.error('Approve Company Error:', error);
        res.status(500).send('Server Error');
    }
}