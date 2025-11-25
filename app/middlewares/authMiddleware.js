const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserCompany = require("../models/UserCompany");
const ROLES = require("../constants/roles");

module.exports = async function (req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.cookies.token;

    if (!authHeader) {
      return handleUnauthorized(req, res);
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 1) Fetch the basic user
    const user = await User.findById(decoded.id);
    if (!user) return handleUnauthorized(req, res);

    // 2) Super Admin → not linked to any company
    if (decoded.role === ROLES.SUPER_ADMIN || user.role === ROLES.SUPER_ADMIN) {
      req.user = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: ROLES.SUPER_ADMIN,
        companyId: null,
        companyRole: "super_admin",
      };
      return next();
    }

    // 3) Regular user → must have a selected company
    if (!decoded.companyId) {
      return handleUnauthorized(req, res, "No company selected. Please choose a company before accessing the dashboard.");
    }

    // 4) Fetch user-company relation
    const userCompany = await UserCompany.findOne({
      user: user._id,
      company: decoded.companyId,
      deletedAt: null,
    });

    if (!userCompany) {
      return handleUnauthorized(req, res, "You are not part of this company");
    }

    // 5) Store user data for downstream use
    req.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: decoded.role || user.role,
      companyId: decoded.companyId,
      companyRole: userCompany.role,
    };

    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return handleUnauthorized(req, res);
  }
};

function handleUnauthorized(req, res, message = "Unauthorized") {
  const isApi =
    req.xhr ||
    req.headers.accept?.includes("application/json") ||
    req.originalUrl.startsWith("/api");

  if (isApi) {
    return res.status(401).json({ message });
  }

 
  return res.redirect("/auth/login");
}
