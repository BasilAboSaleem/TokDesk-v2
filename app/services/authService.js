const CompanyRepo = require('../repositories/companyRepository');
const UserRepo = require('../repositories/userRepository');
const ROLES = require('../constants/roles');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');


class registerCompany {
  async registerCompany(data, file) {
    const { company, admin } = data;  
    const { name: companyName, email: companyEmail, subdomain } = company;
    const { name: adminName, email: adminEmail, password: adminPassword } = admin;

    // validations 
    if (await CompanyRepo.findByEmail(companyEmail)) {
      throw new Error('Company email already exists');  
    }
    if (await CompanyRepo.findBySubdomain(subdomain)) {
      throw new Error('Subdomain already exists'); 
    }
  
    // upload logo to Cloudinary
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

    // create admin
    const createdAdmin = await UserRepo.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: ROLES.ADMIN,
      company: createdCompany._id
    });

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
    return { user, token };
  }
}

module.exports = {
  registerCompany: new registerCompany(),
  loginService: new login()
};
