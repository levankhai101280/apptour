const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware để xác thực token
exports.authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Lấy token từ header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Giải mã token để lấy userId
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.userId = decoded.userId;  // Lưu userId vào req để sử dụng ở các route sau
    next();  // Tiến tới tiếp theo (ví dụ: controller)
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
