import React from "react";
import HeroImg from "../assets/svgs/heroPageBackground.svg";

function HeroPage() {
  return (
    <div
      className="relative pt-[100px] bg-no-repeat bg-center bg-cover overflow-hidden h-[90vh]"
      style={{ backgroundImage: `url(${HeroImg})` }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-[4px] bg-white/10 z-0"></div>

      {/* Reflection Effect */}
      <div
        className="absolute top-0 left-[-50%] w-[200%] h-full pointer-events-none z-10 animate-reflection mirror-effect"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)",
          transform: "rotate(12deg)",
        }}
      ></div>

      {/* Centered Content */}
      <div className="relative z-20 flex items-center justify-center h-full px-4 animate-fadeInScale transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <article className="backdrop-blur p-6 md:p-10 rounded-3xl max-w-2xl text-center">
          <h1 className="text-[50px] text-white font-bold">41 Years</h1>
          <h2 className="text-[#f0c068] text-[20px] pt-1">
            Honouring Lives and Legacies Since 1984.
          </h2>
          <p className="text-[19px] text-white pt-4">
            At George Wood Casket, we take great pride in creating caskets that
            honor the memory of loved ones. Each piece is carefully crafted to
            reflect the dignity and legacy of those we serve, offering families
            a meaningful tribute.
          </p>
        </article>
      </div>
    </div>
  );
}

export default HeroPage;
