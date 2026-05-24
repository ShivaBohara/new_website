const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// ── ADD THESE TWO LINES ──────────────
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
// ─────────────────────────────────────

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('Connection error:', err));

app.get('/', (req, res) => {
    res.json({ message: 'Jigu Store backend is running' });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});