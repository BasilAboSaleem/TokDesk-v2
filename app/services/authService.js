const CompanyRepo = require('../repositories/companyRepository');
const UserRepo = require('../repositories/userRepository');
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
      role: ROLES.ADMIN,
      company: createdCompany._id
    });
    console.log("Created admin:", createdAdmin);

    return { company: createdCompany, admin: createdAdmin };
  }
}

class login {
  async login(data) {
    const { email, password } = data;

    // validations
    const user = await UserRepo.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    // generate token
    const token = user.generateAuthToken();
    return  token ;
  }
}

module.exports = {
  registerCompany: new registerCompany(),
  loginService: new login()
};
