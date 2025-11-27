const Company = require('../models/Company');
const UserCompany = require('../models/UserCompany');
const CompanyRepo = require('../repositories/companyRepository');
const UserRepo = require('../repositories/userRepository');
const UserCompanyRepo = require('../repositories/UserCompanyRepo');

class CompanyService {
    async getCompanyDetails(companyId) {
    const company = await CompanyRepo.findById(companyId);
    if (!company) throw new Error('Company not found');

    const adminRelations = await UserCompanyRepo.findAdminsByCompany(companyId);

    if (!adminRelations || adminRelations.length === 0) throw new Error('Admin not found');

    // map للإدمنز بعد populate
    const admins = adminRelations.map(a => {
        if (!a.user) throw new Error('Admin user not populated correctly');
        return a.user;
    });

    return {
        company,
        admins,          
        adminRelations
    };
}

    /*async approveCompany(companyId) {
        const company = await Company.findById(companyId);
        if (!company) throw new Error('Company not found');

        company.status = 'approved';
        await company.save();
        return company;
    }

    async rejectCompany(companyId, reason) {
        const company = await Company.findById(companyId);
        if (!company) throw new Error('Company not found');

        company.status = 'rejected';
        company.rejectReason = reason;
        await company.save();
        return company;
    }*/
}

module.exports = new CompanyService();
