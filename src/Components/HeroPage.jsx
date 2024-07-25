import React from "react";
import Weather from "./Weather";
import Carousel from "./Carousel";
import HeroMobileComp from "./HeroMobileComp";

function HeroPage() {
  return (
    <div className="mt-[70px]">
      <div className="w-[100%] meme block md:hidden bg-[url(https://wallpapercave.com/wp/wp4348559.jpg)] ">
        <HeroMobileComp />
      </div>
      <div className="hidden md:block">
        <div className="flex h-[100vh] items-center w-[100%]">
          <main
            className="flex flex-col justify-center w-[70vw] h-[100%]"
            id="slides"
          >
            <Carousel />
            <article className="pl-7 pt-20">
              <h1 className=" text-[50px] text-[#A37E2C]">40 Years</h1>
              <p className=" text-[25px] text-[#FFFFFF]">Established in 1984</p>
            </article>
          </main>
          <aside
            className="bg-[#A37E2C] w-[100%] h-[100%] flex flex-col justify-center items-center"
            id="weather-app"
          >
            <div className="weather-clock">
              <Weather />
            </div>
            <h1 className="text-[#011309]">Celebrating Life and Legacy</h1>
            <p className="dynamic-text"></p>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default HeroPage;
