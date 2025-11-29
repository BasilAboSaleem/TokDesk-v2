const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  subdomain: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true 
  },

  logo: {
    type: String,
    default: 'https://ui-avatars.com/api/?background=random&name=Company'
  },

  industry: {
    type: String,
    default: ''
  },

  description: {
    type: String,
    default: ''
  },

  defaultLanguage: {
    type: String,
    enum: ['en', 'ar'],
    default: 'en'
  },


  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },

  rejectionReason: {
    type: String,
    default: ''
  },
  blocked: {
  type: Boolean,
  default: false
}, 

  isDeleted: {
    type: Boolean,
    default: false
  },

  deletedAt: {
    type: Date,
    default: null
  },

  settings: {
    type: Object,
    default: {} 
  }

}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
