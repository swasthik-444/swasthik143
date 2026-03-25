const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (Render will use your Environment Variable here)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the Schema (Now including the email field)
const feedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// API Route to handle incoming feedback from Vercel
app.post('/api/feedback', async (req, res) => {
    try {
        const newFeedback = new Feedback({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });
        
        await newFeedback.save();
        res.status(201).json({ message: "Feedback saved to database!" });
    } catch (error) {
        console.error("Error saving feedback:", error);
        res.status(500).json({ error: "Failed to save feedback" });
    }
}); // Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});;
});
