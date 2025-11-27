const permissions = require('../constants/permissions');
const ROLES = require('../constants/roles');

/**
 * Authorization middleware factory
 * @param {Array<string>} requiredPermissions - List of permissions required to access the route
 */
function authorize(requiredPermissions = []) {
  return (req, res, next) => {
    try {
      const userPayload = req.user; // from JWT

      if (!userPayload) {
        return res.status(401).json({ message: 'Unauthorized: user not authenticated' });
      }

      const userRole = userPayload.role; 
      const companyId = userPayload.companyId;

      // super admin has all permissions
      if (userRole === ROLES.SUPER_ADMIN) {
        return next();
      }

      // check for company-related permissions
      if (!companyId) {
        return res.status(400).json({ message: 'Company context missing' });
      }

      const rolePermissions = permissions[userRole] || [];
      const hasPermissions = requiredPermissions.every(p => rolePermissions.includes(p));

      if (!hasPermissions) {
        return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
      }

      next();
    } catch (err) {
      console.error('Authorization middleware error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}

module.exports = authorize;
