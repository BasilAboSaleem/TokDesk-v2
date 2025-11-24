const CompanyRepo = require('../repositories/companyRepository');
const UserRepo = require('../repositories/userRepository');
const UserCompanyRepo = require('../repositories/UserCompanyRepo');
const ROLES = require('../constants/roles');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');


class registerCompany {
  async registerCompany(data, file) {
    console.log("called servec");
    const { company, admin } = data;  
    const { name: companyName, email: companyEmail, subdomain } = company;
    const { name: adminName, email: adminEmail, password: adminPassword } = admin;

    const errors = [];

    if (await CompanyRepo.findByEmail(companyEmail)) {
      console.log("Company email already exists");
      errors.push({ msg: 'Company email already exists', path: 'companyEmail' });
    }
    if (await CompanyRepo.findBySubdomain(subdomain)) {
      console.log("Subdomain already exists");
      errors.push({ msg: 'Subdomain already exists', path: 'subdomain' });
    }

    if (errors.length > 0) {
      // throw validation error
      const error = new Error('Validation failed');
      error.fieldErrors = errors;
      console.log("Validation errors:", errors);
      throw error;
    }

    // upload logo
    let logoUrl = '';
    if (file) {
      const result = await cloudinary.uploader.upload(file.path, { folder: 'TokDesk2/companies' });
      logoUrl = result.secure_url;
    } else {
      logoUrl = 'https://ui-avatars.com/api/?background=random&name=' + encodeURIComponent(companyName);
    }

    // create company
    const createdCompany = await CompanyRepo.create({
      name: companyName,
      email: companyEmail,
      subdomain,
      logo: logoUrl 
    });
    console.log("Created company:", createdCompany);

    // create admin
    const createdAdmin = await UserRepo.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      preferredCompany: createdCompany._id
    });
    console.log("Created admin:", createdAdmin);

    // create UserCompany link with COMPANY_ADMIN role
    const createdUserCompany = await UserCompanyRepo.create({
    user: createdAdmin._id,
    company: createdCompany._id,
    role: ROLES.ADMIN,  
    status: 'active',
    lastAccessAt: new Date()
});
    console.log("Created UserCompany link:", createdUserCompany);
    

    return { company: createdCompany, admin: createdAdmin, userCompany: createdUserCompany  };
  }
}

class login {
  async login(data) {
    const { email, password } = data;

    // ===== Validation: check if user exists =====
    const user = await UserRepo.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    // ===== Validation: compare password =====
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    // ===== Fetch all companies linked to the user =====
    const userCompanies = await UserCompanyRepo.findAllByUser(user._id);

    // ===== If no companies linked, throw error =====
    if (!userCompanies || userCompanies.length === 0) {
      throw new Error('User is not associated with any company');
    }

    // ===== If multiple companies, return list for frontend selection =====
    if (userCompanies.length > 1) {
      return { userCompanies };
    }

    // ===== If single company, generate token with company context =====
    if (userCompanies.length === 1) {
      const selectedCompany = userCompanies[0];
      const token = user.generateAuthToken({
        companyId: selectedCompany.company.toString(),
        role: selectedCompany.role
      });
      return { token };
    }
  
  }

  // Confirm selected company and generate final token
  async confirmCompany(userId, companyId) {
    // ===== Verify that the selected company is linked to the user =====
    const userCompany = await UserCompanyRepo.findByUserAndCompany(userId, companyId);
    if (!userCompany) throw new Error('Selected company is not linked to the user');

    // ===== Fetch user data =====
    const user = await UserRepo.findById(userId);
    if (!user) throw new Error('User not found');

    // ===== Generate final JWT with company and role context =====
    const token = user.generateAuthToken({
      companyId: userCompany.company.toString(),
      role: userCompany.role
    });

    return { token };
  }
}

module.exports = {
  registerCompany: new registerCompany(),
  loginService: new login()
};
