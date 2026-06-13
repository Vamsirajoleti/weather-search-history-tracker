# 🌤️ Weather Search History Tracker

🌍 A modern, beginner-friendly full-stack web application to check current weather conditions and track your search history.

## ✨ Features
- 🔍 **Search Weather:** Find real-time weather data for any city using the Open-Meteo API.
- 💾 **Search History:** Automatically saves your 10 most recent searches to a local MongoDB database.
- ⚡ **Quick Access:** Click on any previously searched city to instantly load its weather.
- 🌗 **Dark/Light Mode:** Toggle between themes, with your preference saved in `localStorage`.
- 📱 **Responsive Design:** A clean, modern UI featuring a Green-Teal color palette.

## 🚀 Installation Steps
1. Make sure **Node.js** and **MongoDB** are installed.
2. Clone or download this project.
3. Open your terminal in the project directory.
4. Run `npm install` to download dependencies.
5. Rename `.env.example` to `.env`.

## 🍃 MongoDB Setup
Ensure your local MongoDB instance is running on port `27017`. The app will automatically connect to `mongodb://127.0.0.1:27017/weather_history_tracker` and create the database for you.

## 💻 Run Instructions
- Start the server: 
```bash
  npm start
​Access the app in your browser at: http://localhost:3000
​👨‍💻 Created by Vamsi Raju Oleti
