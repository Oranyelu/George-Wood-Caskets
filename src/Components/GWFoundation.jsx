import React from "react";
import { Link } from "react-router-dom";
import Mascot from "../assets/svgs/GW-svg.svg";

function GWFoundation() {
  return (
    <div className="flex flex-col p-6 text-[#135B3A] gap-8 mt-8 mb-10">
      {/* Page Title */}
      <h1 className="text-[28px] md:text-[35px] font-bold underline text-center">
        GEORGE WOOD CHARITY FOUNDATION
      </h1>

      {/* Main Content */}
      <div className="bg-[#135B3A] rounded-xl flex flex-col md:flex-row items-center gap-8 md:gap-12 p-6 md:p-10 w-[98%] md:w-[98%] mx-auto">
        {/* Image Section */}
        {/* <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={Mascot}
            className="w-[80%] max-w-[300px] md:max-w-none md:w-auto"
            alt="Mascot"
          />
        </div> */}

        {/* Text Content */}
        <div className="w-full flex flex-col items-center md:items-start text-center md:text-left gap-6">
          <h2 className="text-[#F9E5BA] text-[20px] md:text-[25px] font-bold">
            Celebrating Life and Legacy
          </h2>
          <p className="text-white text-sm md:text-base leading-relaxed">
            Discover the George Wood Charity Foundation: a beacon of hope dedicated to
            empowering the youth and inspiring a new generation of leaders.
            George Wood Charity Foundation is a non-profit organization that supports
            the local community through philanthropy and volunteerism. The
            Foundation is dedicated to advancing George Wood's mission of
            education, research, and service. Join us in nurturing the
            potential of young minds to create a brighter, more innovative
            future.
          </p>
          <Link to="giving">
            <button
              className="bg-white text-[#135B3A] font-semibold px-6 py-3 rounded-md shadow-lg hover:shadow-xl transition duration-300"
              style={{ minHeight: "56px", minWidth: "160px" }}
            >
              Go to Page
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GWFoundation;
