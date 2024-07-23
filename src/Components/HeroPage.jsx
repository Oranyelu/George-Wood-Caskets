import React from "react";
import Weather from "./Weather";
import Carousel from "./Carousel";

function HeroPage() {
  return (
    <div className="flex h-[100vh] items-center">
      <main className="flex flex-col justify-center w-[70vw] h-[100%]">
        <Carousel />
        <article className="pl-7 pt-20">
          <h1 className=" text-[50px] text-[#A37E2C]">40 Years</h1>
          <p className=" text-[25px] text-[#FFFFFF]">Established in 1984</p>
        </article>
      </main>
      <aside className="bg-[#A37E2C] w-[30vw] h-[100%] flex flex-col justify-center items-center">
        <div className="weather-clock">
          <Weather />
        </div>
        <h1 className="text-[#011309]">Celebrating Life and Legacy</h1>
        <p className="dynamic-text"></p>
      </aside>
    </div>
  );
}

export default HeroPage;
