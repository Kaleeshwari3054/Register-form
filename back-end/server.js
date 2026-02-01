const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Atlas connected');
    } catch (err) {
        console.error('❌ MongoDB connection failed:', err);
        process.exit(1);
    }
};
connectDB();

// User Schema - FIXED: Remove email unique constraint
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },        // ✅ No unique: true
    place: { type: String, required: true },
    country: { type: String, required: true },
    id: { type: Number, required: true, unique: true },
    timestamp: { type: String, required: true },
    status: { type: String, default: 'pending' }
});

const User = mongoose.model('User', userSchema);

// ✅ FIXED REGISTER ENDPOINTSaved to database!
app.post('/api/register', async (req, res) => {
    try {
        console.log('📥 Data received:', req.body.name);

        // ✅ FIXED: Safe ID generation
        let nextId = 1;
        try {
            const lastUser = await User.findOne().sort({ id: -1 });
            nextId = lastUser && lastUser.id ? lastUser.id + 1 : 1;
        } catch (idError) {
            nextId = 1; // Fallback
        }

        const newUser = new User({
            name: req.body.name || 'Unknown',
            phone: req.body.phone || '',
            email: req.body.email || '',
            place: req.body.place || '',
            country: req.body.country || 'India',
            timestamp: req.body.timestamp || new Date().toLocaleString(),
            id: nextId,
            status: 'pending'
        });

        await newUser.save();
        console.log('✅ SAVED:', newUser.name, 'ID:', nextId);
        res.json({ success: true });
    } catch (err) {
        console.error('❌ ERROR:', err.message);
        res.status(400).json({ error: err.message });
    }
});


app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find().sort({ id: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.patch('/api/users/:id/status', async (req, res) => {
    try {
        await User.findOneAndUpdate({ id: req.params.id }, { status: req.body.status });
        res.json({ success: true });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        await User.findOneAndDelete({ id: req.params.id });
        res.json({ success: true });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/', (req, res) => {
    res.json({ message: 'Admin Form API ✅ Running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
