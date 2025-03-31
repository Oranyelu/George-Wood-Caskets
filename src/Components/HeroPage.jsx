import React from "react";
import HeroImg from "../assets/svgs/heroPageBackground.svg";
function HeroPage() {
  return (
    <div
      className="relative pt-[100px] bg-no-repeat bg-center bg-cover overflow-hidden"
      style={{ backgroundImage: `url(${HeroImg})` }}
    >
      {/* Blur Effect */}
      <div className="absolute inset-0 backdrop-blur-[4px] bg-white/10"></div>

      {/* Reflection Effect */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                 w-full h-full rotate-12 animate-reflection"
      ></div>

      {/* Content */}
      <article className="relative z-10">
        <h1 className="text-[50px] text-white font-bold">41 Years</h1>
        <p className="text-[25px] text-[#000000]">Established in 1984</p>
        <h1 className="text-[#135B3A] text-[26px] pt-10 font-bold">
          Celebrating Life and Legacy
        </h1>
        <p className="text-[19px] text-[#011309]">
          At George Wood Casket, we are deeply committed to the art of
          craftsmanship. Since 1984, our legacy has been built on creating
          high-quality, meticulously crafted caskets that honor life and legacy.
        </p>
      </article>
    </div>
  );
}

export default HeroPage;
