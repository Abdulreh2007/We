"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiStrongWind, WiThunderstorm, WiFog } from 'react-icons/wi';
import WeatherCard from './weatherCard'; 
import Link from 'next/link';

// Replace with your actual API key
const API_KEY=process.env.NEXT_PUBLIC_API_KEY


const Home: React.FC = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
    }
  };

  const getWeatherIcon = (iconCode: string) => {
    switch (iconCode) {
      case '01d':
      case '01n':
        return <WiDaySunny size={60} className="text-yellow-400" />;
      case '02d':
      case '02n':
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return <WiCloudy size={60} className="text-gray-400" />;
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        return <WiRain size={60} className="text-blue-500" />;
      case '11d':
      case '11n':
        return <WiThunderstorm size={60} className="text-purple-600" />;
      case '13d':
      case '13n':
        return <WiSnow size={60} className="text-white" />;
      case '50d':
      case '50n':
        return <WiFog size={60} className="text-gray-600" />;
      default:
        return <WiStrongWind size={60} className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-500 via-teal-500 to-white flex items-center justify-center relative">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full z-10">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">Weather App</h1>

        <form onSubmit={handleSubmit} className="mb-6">
          <input 
            type="text" 
            placeholder="Enter city name" 
            value={city} 
            onChange={handleInputChange} 
            className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out" 
          />
          <button 
            type="submit" 
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md shadow-lg transition duration-200 ease-in-out"
          >
            Get Weather
          </button>
        </form>

        {weatherData && (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {getWeatherIcon(weatherData.weather[0].icon)}
            </div>
            <WeatherCard 
              city={weatherData.name}
              temperature={weatherData.main.temp}
              description={weatherData.weather[0].description}
              icon={getWeatherIcon(weatherData.weather[0].icon)} // Pass the correct icon here
            />
          </div>
        )}

        {!weatherData && (
          <p className="text-center text-gray-500 mt-4">Search for a city to see the weather!</p>
        )}
      </div>

      {/* Copyright section */}
      <footer className="absolute bottom-4 text-center text-white w-full">
        <Link href='https://abdul-rehman-portfolio.vercel.app' target='blank'>
        
        <p>&copy; {new Date().getFullYear()} Abdul Dev. All rights reserved.</p>
        </Link>
      </footer>
    </div>
  );
};

export default Home;
