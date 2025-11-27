const Company = require('../models/Company');
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