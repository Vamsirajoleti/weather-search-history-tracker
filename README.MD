Weather Search History Tracker
​A modern, beginner-friendly full-stack web application that allows users to check current weather conditions for any city while automatically tracking their search history. Built with a focus on clean UI/UX and efficient backend data management.
​Features
​Real-Time Weather Data: Fetches live temperature, wind speed, and humidity for any global city using the free Open-Meteo API.
​Automated Search History: Seamlessly saves your 10 most recent successful searches to a local MongoDB database.
​Quick Access Sidebar: Click on any previously searched city in your history to instantly reload its weather data without needing to type it again.
​Dark/Light Mode Toggle: Switch between themes for better accessibility. Your preference is persistently saved in the browser's localStorage.
​Responsive UI: A fully responsive, modern interface featuring a custom Green-Teal color palette optimized for both desktop and mobile viewing.
​Technologies Used
​Frontend: HTML5, CSS3, Vanilla JavaScript
​Backend: Node.js, Express.js
​Database: MongoDB, Mongoose ODM
​External API: Open-Meteo API (No API key required)
​Prerequisites
Before you begin, ensure you have the following installed on your local machine:
​Node.js (v14 or higher)
​MongoDB (Local server running)
​Installation & Setup
​Clone the repository:
git clone https://github.com/yourusername/weather-history-tracker.git
cd weather-history-tracker
​Install dependencies:
npm install
​Environment Variables:
Rename the .env.example file to .env and configure your environment variables:
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/weather_history_tracker
​Database Configuration:
Ensure your local MongoDB instance is running on port 27017. The backend server will automatically connect to the URI specified in your .env file and create the weather_history_tracker database upon your first search.
​Running the Application
​Start the Express server:
npm start
​Open your web browser and navigate to:
http://localhost:3000
​Project Structure
weather-history-tracker/
|-- public/ (Frontend assets: index.html, style.css, app.js)
|-- models/ (Database schemas: SearchHistory.js)
|-- server.js (Express application entry point)
|-- .env (Environment variables)
|-- package.json (Project dependencies)
|-- README.md
​Future Enhancements
​Add a 5-day weather forecast visualization.
​Implement user authentication to track individual user histories.
​Deploy the application using a cloud database (like MongoDB Atlas) and a hosting provider (like Render or Heroku).
​Created by Vamsi Raju Oleti