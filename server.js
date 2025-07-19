// server.js

// Import necessary packages
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config(); // To load environment variables from a .env file

// --- 1. INITIAL SETUP ---
const app = express();
const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
    console.error("FATAL ERROR: GEMINI_API_KEY is not defined in the .env file.");
    process.exit(1);
}

// --- 2. MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- 3. GEMINI API CONFIGURATION ---
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
// ===================================================================
// === FINAL FIX: Using the latest recommended model name ===
// ===================================================================
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// --- 4. API ENDPOINT ---
app.post('/ask', async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message is required.' });
    }

    try {
        const prompt = `You are TalkBuddy, a friendly and encouraging AI for conversation practice. Keep your responses concise and engaging. User's message: "${message}"`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.json({ reply: text });

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        res.status(500).json({ error: 'Failed to get a response from the AI.' });
    }
});

// --- 5. START THE SERVER ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
