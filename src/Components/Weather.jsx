import React, { useState, useEffect } from 'react';
import WeatherDisplay from './WeatherDisplay';
import axios from 'axios';

const Weather = () => {
  const [location, setLocation] = useState('Loading...');
  const [temperature, setTemperature] = useState(null);
  const [unit, setUnit] = useState('Celsius');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = '44835acf5f2dfa92cc383257a1418788'; // Replace with your OpenWeatherMap API key

  useEffect(() => {
    // Get the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
            .then(response => response.json())
            .then(data => {
              setLocation(data.city || 'Unknown Location');
            });

          // Fetch temperature data
          const fetchTemperature = async (lat, lon) => {
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
              );
              setTemperature(response.data.main.temp);
              setLoading(false);
            } catch (error) {
              setError('Error fetching the temperature');
              setLoading(false);
            }
          };

          fetchTemperature(latitude, longitude);
        },
        error => {
          console.error('Error getting location:', error);
          setLocation('Location Unavailable');
          setLoading(false);
        }
      );
    } else {
      setLocation('Geolocation not supported');
      setLoading(false);
    }

    // Set the time
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    setTime(`${hours}:${minutes < 10 ? '0' + minutes : minutes}`);
  }, []);

  if (loading) {
    return <p>Loading temperature...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="app">
      <WeatherDisplay
        location={location}
        temperature={temperature}
        unit={unit}
        time={time}
      />
    </div>
  );
};

export default Weather;
