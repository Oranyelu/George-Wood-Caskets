import React, { useState, useEffect } from 'react';
import WeatherDisplay from './WeatherDisplay';



const Weather = () => {
  const [location, setLocation] = useState('Loading...');
  const [temperature, setTemperature] = useState(null);
  const [unit, setUnit] = useState('Celsius');
  const [time, setTime] = useState('');

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
        },
        error => {
          console.error('Error getting location:', error);
          setLocation('Location Unavailable');
        }
      );
    } else {
      setLocation('Geolocation not supported');
    }

    // Set the time
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    setTime(`${hours}:${minutes < 10 ? '0' + minutes : minutes}`);

    // Set a mock temperature (replace this with actual weather data fetching)
    setTemperature(29); // Replace with actual temperature fetching logic
  }, []);


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
