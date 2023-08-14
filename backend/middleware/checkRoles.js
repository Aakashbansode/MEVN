// middleware/checkRoles.js
module.exports = {
  checkAdminRole: (req, res, next) => {
    if (req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ error: 'Access denied.' });
    }
  },

  // You can keep the checkUserRole middleware as well if you need it for other routes.
  checkUserRole: (req, res, next) => {
    if (req.user.role === 'user') {
      next();
    } else {
      res.status(403).json({ error: 'Access denied.' });
    }
  },
};

  