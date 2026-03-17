require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const registrationRoutes = require('./routes/registrationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { connectToDatabase } = require('./db/connect');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', registrationRoutes);
app.use('/api/admin', adminRoutes);

(async () => {
  try {
    const conn = await connectToDatabase();
    console.log(`Connected to MongoDB: ${conn.name}`);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
