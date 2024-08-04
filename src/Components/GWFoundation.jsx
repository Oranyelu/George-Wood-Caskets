import React from "react";
import { Link } from "react-router-dom";

function GWFoundation() {
  return (
    <div className="flex text-center items-center p-4 text-white bg-[url(https://wallpapers.com/images/hd/funeral-gathering-hjja8pl7kuqmyan5.jpg)] meme mt-8 mb-5 h-[700px]">
      <div className="bg-[#e7c88452] h-[80%] rounded-xl flex flex-col justify-around items-center backdrop-blur-md">
        <h3 className="text-[#135B3A] text-[24.8px] font-bold">
          Celebrating Life and Legacy
        </h3>
        <h1 className="text-[40px] text-[#A37E2C] font-bold ">
          GEORGE WOOD FOUNDATION
        </h1>
        <p className="text-left pl-4 text-white">
          Discover the George Wood Foundation: a beacon of hope dedicated
          to empowering the youth and inspiring a new generation of leaders.{" "}
          George Wood Foundation is a non-profit organization that supports the
          local community through philanthropy and volunteerism. The Foundation
          is dedicated to advancing George Wood's mission of education,
          research, and service. Join us in nurturing the potential of young
          minds to create a brighter, more innovative future
        </p>
        <Link to="giving">
          <button className="bg-[#135B3A] text-white w-[300px] h-[56px] rounded-[5px]">
            Go to page
          </button>
        </Link>
      </div>
    </div>
  );
}

export default GWFoundation;
