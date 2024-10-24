import React from "react";
import Weather from "./Weather";
import HeroMobileComp from "./HeroMobileComp";
import Background from "../assets/svgs/Background.svg";

function HeroPage() {
  return (
    <div className="mt-[70px]">
      <div className="w-[100%] meme block md:hidden bg-[url(https://wallpapercave.com/wp/wp4348559.jpg)] ">
        <HeroMobileComp />
      </div>
      <div className="hidden md:block background w-[100%] h-[700px] pt-7 ">
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex items-center bg-white bg-opacity-10 backdrop-filter backdrop-blur-md border border-white border-opacity-20 p-6 rounded-lg shadow-lg w-[90%] h-[90%]">
            <main className="flex flex-col justify-end w-[70%] h-[100%]">
              <article className="pl-3 pr-3">
                <h1 className=" text-[50px] text-[#135B3A]">40 Years</h1>
                <p className=" text-[25px] text-[#FFFFFF]">
                  Established in 1984
                </p>
                <p className=" text-[19px] text-[#011309]">
                  At George Wood Casket, we are deeply committed to the art of
                  craftsmanship. Since 1984, our legacy has been built on
                  creating high-quality, meticulously crafted caskets that honor
                  life and legacy.
                </p>
              </article>
            </main>
            <aside
              className="w-[30%] h-[100%] flex flex-col justify-center items-center"
              id="weather-app"
            >
              <div className="weather-clock">
                <Weather />
              </div>
              <h1 className="text-[#135B3A]  text-[26px] pt-10 font-bold text-center">
                Celebrating Life and Legacy
              </h1>
              <p className="dynamic-text text-[17px] text-center pt-5"></p>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroPage;
