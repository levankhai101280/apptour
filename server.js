const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use(authRoutes);
app.use(serviceRoutes);
app.use(reservationRoutes);

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/apptour', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error: ', err));

// Khởi chạy server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
