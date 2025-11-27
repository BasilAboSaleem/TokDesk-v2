const mongoose = require('mongoose');
const ROLES = require('../constants/roles');

const userCompanySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
role: {
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.EMPLOYEE
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  lastAccessAt: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

module.exports = mongoose.model('UserCompany', userCompanySchema);
