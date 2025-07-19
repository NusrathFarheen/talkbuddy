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
// IMPORTANT: Create a .env file in your project root and add GEMINI_API_KEY=YOUR_API_KEY
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
    console.error("FATAL ERROR: GEMINI_API_KEY is not defined in the .env file.");
    process.exit(1); // Exit the process if the key is not found
}

// --- 2. MIDDLEWARE ---

// Enable Cross-Origin Resource Sharing (CORS) so your frontend can call the backend
app.use(cors());
// Enable Express to parse JSON request bodies
app.use(express.json());

// --- 3. GEMINI API CONFIGURATION ---

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// --- 4. API ENDPOINT ---

// Define a POST endpoint at /ask
app.post('/ask', async (req, res) => {
    // Get the user's message from the request body
    const { message } = req.body;

    // Basic validation: Check if a message was provided
    if (!message) {
        return res.status(400).json({ error: 'Message is required.' });
    }

    try {
        // A simple prompt to guide the AI's personality
        const prompt = `You are TalkBuddy, a friendly and encouraging AI for conversation practice. Keep your responses concise and engaging. User's message: "${message}"`;

        // Call the Gemini API to generate content
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Send the AI's response back to the frontend
        res.json({ reply: text });

    } catch (error) {
        // Log the error and send a generic error message to the client
        console.error("Error calling Gemini API:", error);
        res.status(500).json({ error: 'Failed to get a response from the AI.' });
    }
});

// --- 5. START THE SERVER ---

// Start listening for requests on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
