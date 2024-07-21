import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="flex flex-col justify-around w-8 h-8 cursor-pointer z-10" onClick={toggleMenu}>
        <div className="w-8 h-1 bg-black rounded"></div>
        <div className="w-8 h-1 bg-black rounded"></div>
        <div className="w-8 h-1 bg-black rounded"></div>
      </div>
      <div className={`flex flex-col items-start absolute top-16 left-0 bg-gray-800 w-48 p-2 rounded ${isOpen ? 'block' : 'hidden'}`}>
        <Link to="./" className="text-white p-2 w-full hover:bg-gray-700">HOME</Link>
        <a className="text-white p-2 w-full hover:bg-gray-700">SERVICES</a>
        <a className="text-white p-2 w-full hover:bg-gray-700">ABOUT US</a>
        <a className="text-white p-2 w-full hover:bg-gray-700">GIVING</a>
        <a className="text-white p-2 w-full hover:bg-gray-700">TRACK ORDER</a>
        <a className="text-white p-2 w-full hover:bg-gray-700">XCLUSIVE</a>
      </div>
    </div>
  );
};

export default HamburgerMenu;
