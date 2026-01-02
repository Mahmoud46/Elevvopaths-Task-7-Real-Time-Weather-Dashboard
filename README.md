# HelloSky Real-Time Weather Dashboard

**HelloSky** is a fully responsive, real-time weather dashboard that provides comprehensive weather insights through detailed metrics, forecasts, analytical visualizations, and interactive maps. The application is designed to deliver both quick daily overviews and in-depth weather analysis for any selected location.

---

## 📌 Overview

HelloSky delivers a complete weather monitoring experience by combining real-time data, short-term forecasts, and analytical dashboards:

- **Current Weather Overview**  
  Displays essential daily weather information including current temperature (°C and °F), daily high and low temperatures, humidity, and wind speed.

- **5-Day Weather Forecast**  
  Provides a clear and concise forecast for the next five days to help users plan ahead.

- **Daily Weather Analytics Dashboard**  
  Visualizes weather trends throughout the day, showing historical data and projections for the next 10 hours. Includes:

  - Recent and upcoming weather trends
  - “Feels like” temperature
  - UV index
  - Precipitation probability displayed as a bar chart across the day

- **Wind & Precipitation Analysis**

  - **Today’s Wind Trends** displaying wind speed and direction over hourly intervals
  - **Hourly Precipitation** visualized using bar charts for clear comparison

- **Interactive Weather Maps**  
  Provides detailed and interactive maps for:

  - Wind
  - Clouds
  - Precipitation
  - Pressure
  - Temperature

  Each map includes descriptive context to help users understand the displayed atmospheric parameters.

---

## 🚀 Features

- Fully responsive real-time weather dashboard
- Current temperature displayed in both °C and °F
- Daily high and low temperatures, humidity, and wind speed
- 5-day weather forecast
- Analytical dashboard with past and upcoming hourly weather trends
- Precipitation probability and hourly precipitation charts
- Wind speed and direction analysis throughout the day
- Interactive maps for wind, clouds, precipitation, pressure, and temperature
- Optimized data fetching and caching
- Clean, modular, and reusable UI components

---

## 🛠️ Tech Stack

- **React.js**
- **TypeScript**
- **Tailwind CSS**
- **React Router DOM**
- **Context API** (state management)
- **React Query** (data fetching and caching)
- **Recharts** (data visualization and charts)
- **React Icons**

---

## 🌐 APIs Used

- [OpenWeather API](https://openweathermap.org/)
- [WeatherAPI](https://www.weatherapi.com/)

The application retrieves real-time, forecast, and analytical weather data from these external services.

---

## Demo

![Demo](hellosky.gif)
[Demo link](https://elevvopaths-task-7-real-time-weathe.vercel.app/)

## 📂 Project Structure

```bash
src/
├── assets/
├── constants/
├── context/           # Context API for global state management
├── interfaces/
├── components/        # Reusable UI components (Charts, Cards, Maps, etc.)
├── pages/
|   ├── Dashboard.tsx
|   └── Home.tsx
├── utils/
├── App.tsx            # Root application component
├── index.css
└── main.tsx           # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later recommended)
- npm or yarn

### ⚙️ Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/Mahmoud46/Elevvopaths-Task-7-Real-Time-Weather-Dashboard.git
```

2. Navigate to the project directory

```bash
cd Elevvopaths-Task-7-Real-Time-Weather-Dashboard
```

3. Install dependencies

```bash
npm install
```

4. Configure environment variables
   Create a `.env` file and add your API keys:

```bash
VITE_WEATHER_API_KEY = your_weather_api_key
VITE_OPEN_WEATHER_API_KEY = your_open_weather_api_key
```

5. Run the development server

```bash
npm run dev
```
