// Map Open-Meteo codes to readable text and emojis
const weatherCodeMap = {
    0: { label: 'Clear Sky', icon: '☀️' },
    1: { label: 'Mainly Clear', icon: '🌤️' },
    2: { label: 'Partly Cloudy', icon: '⛅' },
    3: { label: 'Overcast', icon: '☁️' },
    45: { label: 'Fog', icon: '🌫️' },
    48: { label: 'Rime Fog', icon: '🌫️' },
    51: { label: 'Light Drizzle', icon: '🌧️' },
    53: { label: 'Moderate Drizzle', icon: '🌧️' },
    55: { label: 'Heavy Drizzle', icon: '🌧️' },
    61: { label: 'Slight Rain', icon: '🌦️' },
    63: { label: 'Moderate Rain', icon: '🌧️' },
    65: { label: 'Heavy Rain', icon: '⛈️' },
    71: { label: 'Slight Snow', icon: '🌨️' },
    73: { label: 'Moderate Snow', icon: '❄️' },
    75: { label: 'Heavy Snow', icon: '❄️' },
    95: { label: 'Thunderstorm', icon: '🌩️' }
};

// DOM Elements
const form = document.getElementById('searchForm');
const input = document.getElementById('searchInput');
const weatherCard = document.getElementById('weatherCard');
const loader = document.getElementById('loader');
const historyList = document.getElementById('historyList');
const chipsContainer = document.getElementById('chipsContainer');
const messageBox = document.getElementById('messageBox');
const themeBtn = document.getElementById('themeToggle');
const clearBtn = document.getElementById('clearHistoryBtn');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    fetchHistory();
});

// Theme Logic
function initTheme() {
    const saved = localStorage.getItem('theme') || 'dark-mode';
    document.body.className = saved;
    themeBtn.textContent = saved === 'dark-mode' ? '☀️' : '🌙';

    themeBtn.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode');
        document.body.className = isDark ? 'light-mode' : 'dark-mode';
        localStorage.setItem('theme', document.body.className);
        themeBtn.textContent = isDark ? '🌙' : '☀️';
    });
}

// Show message utility
function showMessage(text, type = 'error') {
    messageBox.textContent = text;
    messageBox.className = `message-box ${type}`;
    messageBox.classList.remove('hidden');
    setTimeout(() => messageBox.classList.add('hidden'), 3500);
}

// Form Submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = input.value.trim();
    if (!city) {
        showMessage('Please enter a city name');
        return;
    }
    
    await getWeatherData(city);
    input.value = '';
});

// Fetch Weather Data
async function getWeatherData(city) {
    loader.classList.remove('hidden');
    weatherCard.classList.add('hidden');
    
    try {
        const response = await fetch(`/api/weather/${encodeURIComponent(city)}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Unable to fetch weather');
        }

        renderWeather(data);
        await saveHistory(data.city);
        fetchHistory(); // Refresh history lists

    } catch (error) {
        showMessage(error.message);
    } finally {
        loader.classList.add('hidden');
    }
}

// Render Weather UI
function renderWeather(data) {
    document.getElementById('cityName').textContent = data.city;
    document.getElementById('countryName').textContent = data.country;
    document.getElementById('temp').textContent = Math.round(data.temperature);
    document.getElementById('feelsLike').textContent = `${Math.round(data.feelsLike)}°C`;
    document.getElementById('humidity').textContent = `${data.humidity}%`;
    document.getElementById('wind').textContent = `${data.windSpeed} km/h`;

    const mapped = weatherCodeMap[data.weatherCode] || { label: 'Unknown', icon: '🌍' };
    document.getElementById('weatherIcon').textContent = mapped.icon;
    document.getElementById('condition').textContent = mapped.label;

    const date = new Date(data.lastUpdated);
    document.getElementById('lastUpdated').textContent = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    weatherCard.classList.remove('hidden');
}

// Database Actions
async function fetchHistory() {
    try {
        const res = await fetch('/api/history');
        const history = await res.json();
        renderHistoryList(history);
        renderChips(history);
    } catch (err) {
        console.error('Failed to load history');
    }
}

async function saveHistory(city) {
    try {
        await fetch('/api/history', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ city })
        });
    } catch (err) {
        console.error('Failed to save history');
    }
}

// Clear History Button
clearBtn.addEventListener('click', async () => {
    try {
        await fetch('/api/history', { method: 'DELETE' });
        showMessage('History cleared', 'success');
        fetchHistory();
    } catch (err) {
        showMessage('Database error');
    }
});

// Render UI Components for History
function renderHistoryList(history) {
    historyList.innerHTML = '';
    
    if (history.length === 0) {
        historyList.innerHTML = '<li style="justify-content:center; color:var(--text-muted)">No recent searches</li>';
        return;
    }

    history.forEach(item => {
        const li = document.createElement('li');
        const date = new Date(item.searchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        li.innerHTML = `
            <span class="history-city">${item.city}</span>
            <span style="font-size: 0.8rem; color: var(--text-muted)">${date}</span>
        `;
        li.addEventListener('click', () => getWeatherData(item.city));
        historyList.appendChild(li);
    });
}

function renderChips(history) {
    chipsContainer.innerHTML = '';
    
    // Default chips if history is empty
    const cities = history.length > 0 
        ? history.map(h => h.city) 
        : ['Vijayawada', 'Delhi', 'New York', 'London'];

    // Take top 4 for chips
    cities.slice(0, 4).forEach(city => {
        const chip = document.createElement('div');
        chip.className = 'chip';
        chip.textContent = city;
        chip.addEventListener('click', () => getWeatherData(city));
        chipsContainer.appendChild(chip);
    });
}