import React from "react";
import { Link } from "react-router-dom";
function HeroMobileComp() {
  return (
    <div className="relative w-full flex flex-col justify-between p-[20px] pt-[50px] bg-cover bg-center text-white">
      {/* Glass Morph Effect Background */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 p-6 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg">
        {/* Brand and Tagline */}
        <h3 className="text-[20px] text-white font-semibold mb-2">
          George Wood Casket and Furniture
        </h3>
        <h3 className="text-[28px] text-[#A37E2C] font-bold mb-1">
          Hounoring Life and Legacy
        </h3>
        <h1 className="text-[#135B3A] text-[32px] font-bold mb-2">40 YEARS</h1>
        <h2 className="text-[#ffffff] text-[18px]">Established in 1984</h2>

        {/* Story Section */}
        <p className="text-[15px] text-white leading-relaxed mt-4">
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
