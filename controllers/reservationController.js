const Reservation = require('../models/Reservation');
const Service = require('../models/Service');

// Tạo đặt chỗ mới
exports.createReservation = async (req, res) => {
  const { serviceId, date, people } = req.body;
  const userId = req.userId;

  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const newReservation = new Reservation({ user: userId, service: serviceId, date, people });
    await newReservation.save();
    res.status(201).json({ message: 'Reservation created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Lấy danh sách đặt chỗ của người dùng
exports.getUserReservations = async (req, res) => {
  const userId = req.userId;

  try {
    const reservations = await Reservation.find({ user: userId }).populate('service');
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Xóa đặt chỗ
exports.deleteReservation = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    if (reservation.user.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this reservation' });
    }

    await reservation.remove();
    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
