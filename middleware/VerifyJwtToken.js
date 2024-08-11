const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
 
  if (!token) {
    return res.status(401).json({ 
      success: 0,
      message: "Access Denied! Unauthorized User"
    });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(verified.id);
    console.log('verified',verified);
    if (!user) {
      return res.status(401).json({
        success: 0,
        message: "Access Denied! No user found!" 
      });
    }
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};