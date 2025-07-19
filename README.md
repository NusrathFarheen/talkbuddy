# TalkBuddy: AI Communication Practice Bot 🤖

TalkBuddy is an interactive web application designed to help users practice their communication and public speaking skills. It uses the Web Speech API for voice recognition and speech synthesis, and connects to the Google Gemini API for intelligent, conversational responses.

# ✨Live Demo--https://nusrathfarheen.github.io/talkbuddy/ ✨
# 📸 Sneak Peek
<img width="620" height="1322" alt="image" src="https://github.com/user-attachments/assets/fd3b8815-9f02-48df-ba82-6232f57fedd4" />

# Features
**Voice Input:** Speak directly into the mic using the Web Speech API.

**Real-time Transcription:** See your spoken words appear on the screen instantly.

**AI-Powered Chat:** Get intelligent and context-aware responses from Google's gemini-1.5-flash model.

**Text-to-Speech:** Hear the AI's response read out loud in a natural voice.

**Responsive Design:** A clean, mobile-first interface that works on any device.

# 🛠️ Tech Stack
**Frontend:** HTML5, CSS3, Vanilla JavaScript

**Backend:** Node.js, Express.js

**APIs:** Web Speech API (SpeechRecognition & SpeechSynthesis), Google Gemini API

**Hosting:** Frontend on GitHub Pages, Backend on Render (Free Tier).

# 🚀 How to Run Locally
**Clone the repository:**

*git clone https://github.com/NusrathFarheen/talkbuddy.git*

**Navigate to the project directory:**

*cd talkbuddy*

**Install backend dependencies:**

*npm install*

**Create a .env file in the root directory and add your API key:**

GEMINI_API_KEY=YOUR_API_KEY

**Start the server:**

*npm start*

Open the index.html file in your browser.

# ⚠️ Important Note
This project is hosted on Render's free tier, which causes the server to "spin down" (go to sleep) after 15 minutes of inactivity.

If the app doesn't respond on your first try, please wait about 30-60 seconds for the server to wake up and then try speaking again. It's not a bug, it's a feature of free hosting!
