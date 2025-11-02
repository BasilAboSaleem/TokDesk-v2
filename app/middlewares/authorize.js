const permissions = require('../constants/permissions');
const ROLES = require('../constants/roles');

/**
 * Authorization middleware factory
 * @param {Array<string>} requiredPermissions - List of permissions required to access the route
 */
function authorize(requiredPermissions = []) {
  return (req, res, next) => {
    try {
      // جلب المستخدم من الطلب (يفترض أن يتم تعيينه بواسطة middleware المصادقة)
      const user = req.user;

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized: user not authenticated' });
      }

      const userRole = user.role;

      // السوبر أدمن يتخطى كل checks تلقائياً
      if (userRole === ROLES.SUPER_ADMIN) {
        return next();
      }

      const rolePermissions = permissions[userRole] || [];

      // التحقق من وجود كل الصلاحيات المطلوبة لدى المستخدم
      const hasPermissions = requiredPermissions.every(p => rolePermissions.includes(p));

      if (!hasPermissions) {
        return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
      }

      next(); // المستخدم لديه كل الصلاحيات المطلوبة
    } catch (err) {
      console.error('Authorization middleware error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}

module.exports = authorize;
