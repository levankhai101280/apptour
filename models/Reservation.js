const mongoose = require('mongoose');

// Schema cho Reservation
const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  date: { type: Date, required: true },
  people: { type: Number, required: true },
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
