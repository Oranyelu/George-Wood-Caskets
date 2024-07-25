import React from 'react';
import '../index.css'

const WeatherDisplay = ({ location, temperature, unit, time }) => {
  return (
    <div className="text-center text-white w-[100%]">
    <div className="text-[50px] font-bold mb-2">{location}</div>
    <div className="text-[120px] mb-2">
      {temperature}° 
      </div>
      <span className="text-[20px]">{unit}</span>
    <div className="text-white text-[50px]">{time}</div>
  </div>
  );
};

export default WeatherDisplay;