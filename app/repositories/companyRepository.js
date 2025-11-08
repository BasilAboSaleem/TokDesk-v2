const Company = require('../models/Company');

class CompanyRepository {
  async create(companyData) {
    return Company.create(companyData);
  }

  async findByEmail(email) {
    return Company.findOne({ email });
  }

  async findBySubdomain(subdomain) {
    return Company.findOne({ subdomain });
  }
}

module.exports = new CompanyRepository();
