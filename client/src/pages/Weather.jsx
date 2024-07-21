import React, { useState } from 'react';
import { FaSearch, FaTachometerAlt } from 'react-icons/fa';
import { FaTemperatureHigh, FaDroplet, FaWind } from 'react-icons/fa6';

export default function Weather() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/weather/getweather?location=${location}`);
      if (!res.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await res.json();
      setWeatherData(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      setWeatherData(null);
    }
  };

  return (
    <div className="container p-8 mx-auto">
      <div className="flex justify-center items-center pb-5">
        <form className="flex" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for a city..."
            className="bg-gray-100 px-4 py-2 rounded-l-md focus:outline-none"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-md">
            <FaSearch />
          </button>
        </form>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {weatherData && (
        <div className="flex flex-col md:flex-row bg-gray-300 p-8 pt-16 rounded-lg shadow-lg z-10">
          <div className="flex-1 mb-8 md:mb-0 pr-4">
            <div className="weather__body mt-6 text-center">
              <h1 className="text-3xl font-bold">{weatherData.location}</h1>
              <div className="weather__datetime mb-4">{new Date(weatherData.currentWeather.time).toLocaleString()}</div>
              <div className="weather__icon mb-4 flex justify-center">
                <img src={weatherData.currentWeather.iconUrl} alt="weather icon" className="w-32 h-32" />
              </div>
              <p className="weather__temperature text-4xl font-bold">{weatherData.currentWeather.temperature}&#176;</p>
              <div className="weather__minmax flex justify-center">
                <p>Min: {weatherData.currentWeather.minTemp}&#176;</p>
                <p className="mx-4">Max: {weatherData.currentWeather.maxTemp}&#176;</p>
              </div>
              <div className="weather__info grid grid-cols-2 gap-4 mt-6">
                <div className="weather__card flex items-center bg-blue-100 p-4 rounded-lg shadow-md">
                  <FaTemperatureHigh className="text-2xl mr-2" />
                  <div>
                    <p>Real Feel</p>
                    <p className="weather__realfeel">{weatherData.currentWeather.realFeel}&#176;</p>
                  </div>
                </div>
                <div className="weather__card flex items-center bg-green-100 p-4 rounded-lg shadow-md">
                  <FaDroplet className="text-2xl mr-2" />
                  <div>
                    <p>Humidity</p>
                    <p className="weather__humidity">{weatherData.currentWeather.humidity}%</p>
                  </div>
                </div>
                <div className="weather__card flex items-center bg-yellow-100 p-4 rounded-lg shadow-md">
                  <FaWind className="text-2xl mr-2" />
                  <div>
                    <p>Wind</p>
                    <p className="weather__wind">{weatherData.currentWeather.windSpeed} m/s</p>
                  </div>
                </div>
                <div className="weather__card flex items-center bg-red-100 p-4 rounded-lg shadow-md">
                  <FaTachometerAlt className="text-2xl mr-2" />
                  <div>
                    <p>Pressure</p>
                    <p className="weather__pressure">{weatherData.currentWeather.pressure} hPa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 pr-4">
            <div className="weather__hourly mt-6">
              <h2 className="text-xl font-semibold mb-2">Hourly Forecast</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {weatherData.hourlyData.map((hour, index) => (
                  <div key={index} className="weather__hourlycard bg-blue-100 p-4 rounded-lg shadow-md flex flex-col items-center">
                    <span className="text-sm font-semibold">{new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <img src={hour.iconUrl} alt="weather icon" className="w-16 h-16 my-2" />
                    <span className="text-lg">{hour.temperature}&#176;C</span>
                    <span className="text-sm">Humidity: {hour.humidity}%</span>
                    <span className="text-sm">{hour.description}</span>
                    <span className="text-sm">Wind: {hour.windSpeed} m/s</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="weather__forecast mt-6">
              <h2 className="text-xl font-semibold mb-2">4-Day Forecast</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {weatherData.dailyAverages.map((day, index) => (
                  <div key={index} className="weather__forecastcard bg-green-100 p-4 rounded-lg shadow-md flex flex-col items-center">
                    <span className="text-lg font-semibold">{new Date(day.date).toLocaleDateString()}</span>
                    <img src={day.iconUrl} alt="weather icon" className="w-16 h-16 my-2" />
                    <span className="text-md">{day.temperature}&#176;C</span>
                    <span className="text-sm">Humidity: {day.humidity}%</span>
                    <span className="text-sm">{day.description}</span>
                    <span className="text-sm">Wind: {day.windSpeed} m/s</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
