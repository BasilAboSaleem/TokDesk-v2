const User = require('../models/User');

class UserRepository {
  async create(userData) {
    return User.create(userData);
  }

  async findByEmailAndCompany(email, companyId) {
    return User.findOne({ email, company: companyId });
  }
}

module.exports = new UserRepository();
