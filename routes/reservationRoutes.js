const express = require('express');
const { createReservation, getUserReservations, deleteReservation } = require('../controllers/reservationController');
const { authenticate } = require('../middlewares/authenticate');
const router = express.Router();

// Tạo đặt chỗ mới (yêu cầu xác thực)
router.post('/reservations', authenticate, createReservation);

// Lấy danh sách đặt chỗ của người dùng (yêu cầu xác thực)
router.get('/reservations', authenticate, getUserReservations);

// Xóa đặt chỗ (yêu cầu xác thực)
router.delete('/reservations/:id', authenticate, deleteReservation);

module.exports = router;
