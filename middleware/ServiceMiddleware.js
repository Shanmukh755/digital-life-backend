const jwt = require('jsonwebtoken');

const authorize = (allowedRoles = []) => {
    return (req, res, next) => {
      try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
          return res.status(401).json({ message: 'Access denied. No token provided.' });
        }
  
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
  
        if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
          return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }
  
        next();
      } catch (err) {
        console.error(err);
        res.status(403).json({ message: 'Invalid or expired token.' });
      }
    };
  };
  

module.exports = {authorize}