import React from 'react';

interface WeatherCardProps {
  city: string;
  temperature: number;
  description: string;
  icon: React.ReactNode;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, temperature, description, icon }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm mx-auto mt-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">{city}</h2>
      <div className="flex justify-center items-center mb-4">
        <div className="text-6xl">{icon}</div>
        <span className="ml-4 text-4xl font-semibold text-gray-900">{temperature}°C</span>
      </div>
      <p className="text-lg text-gray-600 text-center">{description.charAt(0).toUpperCase() + description.slice(1)}</p>
      <div className="mt-4 text-center">
        <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out">
          Refresh Weather
        </button>
      </div>
    </div>
  );
};

export default WeatherCard;
