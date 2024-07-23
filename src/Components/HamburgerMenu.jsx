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
        <div className="w-8 h-1 bg-[#A37E2C]"></div>
        <div className="w-8 h-1 bg-[#A37E2C]"></div>
        <div className="w-8 h-1 bg-[#A37E2C]"></div>
      </div>
      <div className={`flex flex-col items-start absolute top-16 right-0 bg-[#135B3A] w-48 p-2 rounded ${isOpen ? 'block' : 'hidden'}`}>
        <Link to="./" className="text-white p-2 w-full hover:bg-[#A37E2C]">HOME</Link>
        <Link to="/services" className="text-white p-2 w-full hover:bg-[#A37E2C]">SERVICES</Link>
        <Link to="/about-us" className="text-white p-2 w-full hover:bg-[#A37E2C]">ABOUT US</Link>
        <Link to="/giving"className="text-white p-2 w-full hover:bg-[#A37E2C]">GIVING</Link>
        <Link to="/track-order" className="text-white p-2 w-full hover:bg-[#A37E2C]">TRACK ORDER</Link>
        <Link to="/xclusive" className="text-white p-2 w-full hover:bg-[#A37E2C]">XCLUSIVE</Link>
      </div>
    </div>
  );
};

export default HamburgerMenu;
