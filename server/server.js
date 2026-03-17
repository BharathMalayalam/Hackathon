require('dotenv').config();
const express = require('express');
const cors = require('cors');
const registrationRoutes = require('./routes/registrationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const fileRoutes = require('./routes/fileRoutes');
const { connectToDatabase } = require('./db/connect');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', registrationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', fileRoutes);

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
