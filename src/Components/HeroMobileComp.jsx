import React from "react";
import { Link } from "react-router-dom";
import HeroPageImg from "../assets/svgs/Hero-png.png"; // Update this path to the correct image location.

function HeroMobileComp() {
  return (
    <div className="relative w-full flex flex-col justify-between p-5 pt-11 bg-cover bg-center text-white">
      {/* Glass Morph Effect Background */}
      <div className="absolute inset-0 bg-[white] bg-opacity-100"></div>

      {/* Content Section */}
      <div className="relative z-10 p-6 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg">
        {/* Brand and Tagline */}
        <h1 className="text-[25px] text-[#135B3A] font-bold mb-2">
          George Wood Casket and Furniture
        </h1>
        <h2 className="text-[22px] text-[#A37E2C] font-semibold mb-1">
          Honouring Life and Legacy
        </h2>
        <h2 className="text-[#A37E2C] text-[18px]">Celebrating Legacies Since 1984</h2>
        <h3 className="text-[#135B3A] text-[32px] font-bold mb-2">40 YEARS</h3>
        

        {/* Story Section */}
        <p className="text-[15px] text-[#103c29] leading-relaxed mt-4">
          For four decades, we have honored lives by crafting caskets and
          furniture with empathy, artistry, and unparalleled quality. At George
          Wood Caskets, each piece is not just a product—it's a legacy of
          craftsmanship.
        </p>

        {/* Call to Action */}
        <div className="mt-6">
          <Link
            to="/about-us"
            className="bg-[#135B3A] hover:bg-[#0F4E2E] text-white font-semibold py-2 px-6 rounded-lg inline-block transition duration-300"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroMobileComp;
