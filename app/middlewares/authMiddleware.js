const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function authMiddleware(req, res, next) {
  try {
    const token =
      req.cookies.token || req.headers.authorization?.split(' ')[1];

    // لا يوجد توكن
    if (!token) {
      return handleUnauthorized(req, res);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return handleUnauthorized(req, res);
    }

    const user = await User.findById(decoded.id)
      .select('_id name email role company status');

    if (!user) {
      return handleUnauthorized(req, res);
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    return handleUnauthorized(req, res);
  }
}

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

  return res.redirect('/auth/login');
}

module.exports = authMiddleware;
