import React from "react";
import Weather from "./Weather";
import HeroMobileComp from "./HeroMobileComp";
import Background from '../assets/svgs/Background.svg'

function HeroPage() {
  return (
    <div className="mt-[70px]">
      <div className="w-[100%] meme block md:hidden bg-[url(https://wallpapercave.com/wp/wp4348559.jpg)] ">
        <HeroMobileComp />
      </div>
      <div className="hidden md:block">
        <div className="flex h-[700px] items-center w-[100%] background">
          <main
            className="flex flex-col justify-end w-[70vw] h-[100%] bg-no-repeat bg-center bg-cover"
          >
            <article className="pl-7 pb-20 pr-7">
              <h1 className=" text-[50px] text-[#A37E2C]">40 Years</h1>
              <p className=" text-[25px] text-[#FFFFFF]">Established in 1984</p>
              <p className=" text-[19px] text-[#A37E2C]">
              At George Wood Casket, we are deeply committed to the art of craftsmanship. Since 1984, our legacy has been built on creating high-quality, meticulously crafted caskets that honor life and legacy.</p>
            </article>
          </main>
          <aside
            className="w-[30vw] h-[100%] flex flex-col justify-center items-center"
            id="weather-app"
          >
            <div className="weather-clock">
              <Weather />
            </div>
            <h1 className="text-white text-[26px] pt-10 font-bold text-center">Celebrating Life and Legacy</h1>
            <p className="dynamic-text text-[17px] text-center pt-5"></p>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default HeroPage;
