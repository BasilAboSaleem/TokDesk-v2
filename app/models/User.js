const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  // Stores the user's last selected company
  preferredCompany: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    default: null
  },

  // Optional department field; can be linked via UserCompany if needed
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    default: null
  },

  language: {
    type: String,
    enum: ['en', 'ar'],
    default: 'en'
  },

  status: {
    type: String,
    enum: ['online', 'offline', 'busy', 'away', 'invisible'],
    default: 'offline'
  },

  profileImage: {
    type: String,
    default: 'https://ui-avatars.com/api/?background=random&name=User'
  },

  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date,
    default: null
  }

}, { timestamps: true });

// Unique index for email only (company removed, now handled via UserCompany)
userSchema.index({ email: 1 }, { unique: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to generate auth token
userSchema.methods.generateAuthToken = function() {
  // JWT payload now only includes user's preferredCompany, role is managed in UserCompany
  const payload = {
    id: this._id,
    email: this.email,
    preferredCompany: this.preferredCompany
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

module.exports = mongoose.model('User', userSchema);
