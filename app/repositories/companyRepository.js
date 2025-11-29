const Company = require('../models/Company');

class CompanyRepository {
  async create(companyData) {
    return Company.create(companyData);
  }

  async findByEmail(email) {
    return Company.findOne({ email });
  }
  async findById(id) {
    return Company.findById(id);
  }

  async findBySubdomain(subdomain) {
    return Company.findOne({ subdomain });
  }

  async findAll() {
    return Company.find();
  }
}

module.exports = new CompanyRepository();
