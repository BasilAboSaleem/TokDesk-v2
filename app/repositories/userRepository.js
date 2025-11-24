const User = require('../models/User');

class UserRepository {
  async create(userData) {
    return User.create(userData);
  }

  async findByEmailAndCompany(email, companyId) {
    return User.findOne({ email, company: companyId });
  }

  async findByEmail(email) {
    return User.findOne({ email });
  }

  async findById(userId) {
    return User.findById(userId);
  }
}

module.exports = new UserRepository();
