const UserCompany = require('../models/UserCompany');

class UserCompanyRepository {
  
  // Create a new UserCompany record
  async create(data) {
    return await UserCompany.create(data);
  }

  // Find a UserCompany record by user ID and company ID
  async findByUserAndCompany(userId, companyId) {
    return await UserCompany.findOne({ user: userId, company: companyId });
  }

  // Get all companies for a given user
  async findAllByUser(userId) {
    return await UserCompany.find({ user: userId }).populate('company');
  }

  // Get all users for a given company
  async findAllByCompany(companyId) {
    return await UserCompany.find({ company: companyId }).populate('user');
  }

  // Update a UserCompany record
  async update(id, data) {
    return await UserCompany.findByIdAndUpdate(id, data, { new: true });
  }

  // Delete (soft or hard) a UserCompany record
  async delete(id) {
    return await UserCompany.findByIdAndDelete(id);
  }
}

module.exports = new UserCompanyRepository();
