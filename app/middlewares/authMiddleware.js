const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function authMiddleware(req, res, next) {
  try {
    // get token from cookie or header
    const token =
      req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) return handleUnauthorized(req, res);

    // expected token structure: JWT with user id, companyId, role
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.id) return handleUnauthorized(req, res);

    // prepare user data from decoded
    let userData = {
      id: decoded.id,
      companyId: decoded.companyId || null, 
      role: decoded.role || null,             
      name: decoded.name || null,           
      email: decoded.email || null         
    };

    // ===== Fallback: fetch full user data from database if important fields are missing =====
    if (!userData.name || !userData.email) {
      const user = await User.findById(decoded.id).select('_id name email status');
      if (!user) return handleUnauthorized(req, res);

      userData = {
        ...userData,
        name: user.name,
        email: user.email,
        status: user.status
      };
    }

    // attach user to request
    req.user = userData;
    next();

  } catch (err) {
    console.error('Auth middleware error:', err);
    return handleUnauthorized(req, res);
  }
}

// ===== Handle unauthorized user =====
function handleUnauthorized(req, res) {
  const isApi =
    req.xhr ||
    req.headers.accept?.includes('application/json') ||
    req.originalUrl.startsWith('/api');

  if (isApi) {
    return res.status(401).json({
      message: 'Unauthorized: token invalid or expired',
    });
  }
// for page requests, redirect to login
  return res.redirect('/auth/login');
}

module.exports = authMiddleware;
