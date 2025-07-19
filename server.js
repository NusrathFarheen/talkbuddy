// server.js

// Import necessary packages
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config(); // To load environment variables from a .env file

// --- 1. INITIAL SETUP ---

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Get Gemini API Key from environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
    console.error("FATAL ERROR: GEMINI_API_KEY is not defined in the .env file.");
    process.exit(1); // Exit the process if the key is not found
}

// --- 2. MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- 3. GEMINI API CONFIGURATION ---
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// --- 4. API ENDPOINT (MODIFIED FOR TESTING) ---

// We are changing this from app.post to app.get to make it testable in the browser.
app.get('/ask', async (req, res) => {
    // For a GET test, we don't have a request body, so we'll use a hardcoded message.
    const testMessage = "Hello"; 

    try {
        const prompt = `You are TalkBuddy, a friendly AI. User's message: "${testMessage}"`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Send a successful JSON response
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
