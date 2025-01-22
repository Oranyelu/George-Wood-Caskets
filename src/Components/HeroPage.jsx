import React from "react";
import HeroPageImg from "../assets/svgs/Hero-png.png";

function HeroPage() {
  return (
    <div className="">
      {/* Desktop view */}
      <div className="hidden md:block bg-white w-full h-[500px]">
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex items-center w-[90%] h-[90%]">
            <main className="flex flex-col justify-end w-[50%] h-full">
              <article className="pl-3 pr-3">
                <h1 className="text-[50px] text-[#135B3A] font-bold">41 Years</h1>
                <p className="text-[25px] text-[#000000]">Established in 1984</p>
                <h1 className="text-[#135B3A] text-[26px] pt-10 font-bold">
                  Celebrating Life and Legacy
                </h1>
                <p className="text-[19px] text-[#011309]">
                  At George Wood Casket, we are deeply committed to the art of
                  craftsmanship. Since 1984, our legacy has been built on
                  creating high-quality, meticulously crafted caskets that honor
                  life and legacy.
                </p>
              </article>
            </main>
          
          </div>
        </div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden bg-white w-full pt-[100px]">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex flex-col items-center w-[90%]">
            <main className="flex flex-col justify-end w-full text-center">
              <article className="pl-3 pr-3">
                <h1 className="text-[30px] text-[#135B3A] font-bold">41 Years</h1>
                <p className="text-[20px] text-[#000000]">Established in 1984</p>
                <h1 className="text-[#135B3A] text-[22px] pt-6 font-bold">
                  Celebrating Life and Legacy
                </h1>
                <p className="text-[16px] text-[#011309] px-4">
                  At George Wood Casket, we are deeply committed to the art of
                  craftsmanship. Since 1984, our legacy has been built on
                  creating high-quality, meticulously crafted caskets that honor
                  life and legacy.
                </p>
              </article>
            </main>
        
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroPage;
