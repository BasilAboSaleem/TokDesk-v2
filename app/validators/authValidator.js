const { body, validationResult } = require('express-validator');

// Validator for company registration
exports.registerCompanyValidator = [
  // ===== Step 1: Company Details =====
  body('companyName')
    .trim()
    .notEmpty().withMessage('Company name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Company name must be between 2 and 100 characters'),

  body('companyEmail')
    .trim()
    .notEmpty().withMessage('Company email is required')
    .isEmail().withMessage('Invalid email format'),

  body('subdomain')
    .trim()
    .notEmpty().withMessage('Subdomain is required')
    .matches(/^[a-z0-9-]+$/).withMessage('Subdomain can only contain lowercase letters, numbers, and hyphens'),

  // Optional: Logo file validation
  body('logo')
    .custom((value, { req }) => {
      if (!req.file) return true; // logo optional
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(req.file.mimetype)) {
        throw new Error('Logo must be a JPEG, PNG, or WEBP image');
      }
      return true;
    }),

  // ===== Step 2: Admin Details =====
  body('adminName')
    .trim()
    .notEmpty().withMessage('Admin name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Admin name must be between 2 and 50 characters'),

  body('adminEmail')
    .trim()
    .notEmpty().withMessage('Admin email is required')
    .isEmail().withMessage('Invalid admin email'),

  body('adminPassword')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter'),

  body('confirmPassword')
    .notEmpty().withMessage('Confirm password is required')
    .custom((value, { req }) => {
      if (value !== req.body.adminPassword) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),

  // ===== Error handler middleware =====
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
