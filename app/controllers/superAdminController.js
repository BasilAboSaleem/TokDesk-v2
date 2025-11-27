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