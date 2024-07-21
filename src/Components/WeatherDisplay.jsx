import React from 'react';

const WeatherDisplay = ({ location, temperature, unit, time }) => {
  return (
    <div className="bg-[#00000049] rounded-lg text-center text-white w-48 mx-auto shadow-lg">
    <div className="text-2xl font-bold mb-2">{location}</div>
    <div className="text-4xl mb-2">
      {temperature}° <span className="text-lg">{unit}</span>
    </div>
    <div className="text-base text-gray-600">{time}</div>
  </div>
  );
};

export default WeatherDisplay;