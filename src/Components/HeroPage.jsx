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
        <div className="flex h-[700px] items-center w-[100%]">
          <main
            className="flex flex-col justify-center w-[70vw] h-[100%] bg-no-repeat bg-center bg-cover background"
          >
            <article className="pl-7 pt-20">
              <h1 className=" text-[50px] text-[#A37E2C]">40 Years</h1>
              <p className=" text-[25px] text-[#FFFFFF]">Established in 1984</p>
            </article>
          </main>
          <aside
            className="bg-[#A37E2C] w-[30vw] h-[100%] flex flex-col justify-center items-center"
            id="weather-app"
          >
            <div className="weather-clock">
              <Weather />
            </div>
            <h1 className="text-[#011309] text-[26px] pt-10 font-bold text-center">Celebrating Life and Legacy</h1>
            <p className="dynamic-text text-[17px] text-center pt-5"></p>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default HeroPage;
