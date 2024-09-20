import React from "react";
import { Link } from "react-router-dom";
import Mascot from "../assets/svgs/GW-svg.svg";

function GWFoundation() {
  return (
    <div className="flex flex-col p-4 text-white] gap-5 meme mt-8 mb-5 ">
      <h1 className="text-[35px] text-[#135B3A] font-bold underline ">
        GEORGE WOOD FOUNDATION
      </h1>
      <div className="bg-[#135B3A] rounded-xl flex flex-col backdrop-blur-md pt-2 pb-5 w[95%] items-center">
        <section className="flex flex-row gap-10 w-[90%] items-center">
          <img src={Mascot} />

          <article className="text-center flex flex-col gap-7">
            <h3 className="text-[#F9E5BA] text-[24.8px] font-bold">
              Celebrating Life and Legacy
            </h3>
            <p className="text-left text-white">
              Discover the George Wood Foundation: a beacon of hope dedicated
              to empowering the youth and inspiring a new generation of leaders.{" "}
              George Wood Foundation is a non-profit organization that supports
              the local community through philanthropy and volunteerism. The
              Foundation is dedicated to advancing George Wood's mission of
              education,+ research, and service. Join us in nurturing the
              potential of young minds to create a brighter, more innovative
              future.
            </p>
            <Link to="giving">
              <button className="bg-[#A37E2C] text-white font-semibold w-[300px] h-[56px] rounded-[5px] float-right">
                Go to page
              </button>
            </Link>
          </article>
        </section>
      </div>
    </div>
  );
}

export default GWFoundation;
