import React from "react";
import HeroImg from "../assets/svgs/heroPageBackground.svg";

function HeroPage() {
  return (
    <div
      className="relative pt-[100px] bg-no-repeat bg-center bg-cover overflow-hidden h-[100vh]"
      style={{ backgroundImage: `url(${HeroImg})` }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-[4px] bg-white/10 z-0"></div>

      {/* Reflection Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full h-full rotate-12 animate-reflection z-10 pointer-events-none"></div>

      {/* Centered Content */}
      <div className="relative z-20 flex items-center justify-center h-full px-4">
        <article className="backdrop-blur-2xl p-6 md:p-10 rounded-3xl bg-white/70 max-w-2xl text-center">
          <h1 className="text-[50px] text-[#135B3A] font-bold">41 Years</h1>
          <p className="text-[25px] text-black">Established in 1984</p>
          <h2 className="text-[#135B3A] text-[26px] pt-10 font-bold">
            Celebrating Life and Legacy
          </h2>
          <p className="text-[19px] text-[#011309] pt-4">
            At George Wood Casket, we are deeply committed to the art of
            craftsmanship. Since 1984, our legacy has been built on creating
            high-quality, meticulously crafted caskets that honor life and legacy.
          </p>
        </article>
      </div>
    </div>
  );
}

export default HeroPage;
