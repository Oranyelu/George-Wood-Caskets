import React from "react";
import BKOL from "../assets/svgs/bookoflife.svg";
import { Link } from "react-router-dom";
import { FaStar } from 'react-icons/fa';

function TestimonialComp() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[95%] flex flex-col text-white gap-8">
        {/* Header Section */}
        <section className="flex justify-between items-center">
          <div>
            <h1 className="font-bold text-[25px]">Why Choose George Wood Casket?</h1>
            <h2 className="text-gray-300">Read what our customers have to say...</h2>
          </div>

          <div className="flex gap-5">
            <div className="text-center">
              <h2 className="text-[25px] font-bold">482</h2>
              <p>Clients</p>
            </div>

            <div className="text-center">
              <h2 className="text-[25px] font-bold">726</h2>
              <p>Projects</p>
            </div>
          </div>
        </section>

        {/* Book of Life Section */}
        <section className="flex flex-row justify-between items-center">
        <div className="bg-[#135B3A] w-[35%] h-[250px] rounded-md flex flex-col items-center justify-center">
  <div className="flex items-center">
    <span className="text-[60px] font-bold">5</span>
    <FaStar size={50} color="gold" />
  </div>
  <div className="text-center">
    <p className="font-bold text-[20px]">100%</p>
    <p>Customer satisfaction</p>
  </div>
</div>

          
<div
  className="w-[100%] md:w-[60%] h-[250px] bg-no-repeat bg-center bg-cover rounded-xl relative overflow-hidden"
  style={{ backgroundImage: `url(${BKOL})` }}
>
  <div className="absolute inset-0 flex flex-col justify-end items-start p-4 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300">
    <h1 className="text-white text-md md:text-lg lg:text-xl font-bold">
      Discover “The Book Of Life”
    </h1>
    <p className="text-white text-left text-xs md:text-sm lg:text-base">
      "Step into the stories of those who shaped our journey. Each story
      is a reflection of love, strength, and unforgettable moments. In
      these pages, their legacies live on, offering comfort and
      inspiration. Celebrate their journeys, their memories, and the
      lasting impact they leave behind."
    </p>
    <Link to="/book-of-life" className="text-white underline hover:text-[#A37E2C]">
      Learn More
    </Link>
  </div>
</div>


        </section>

        {/* Testimonials Section */}
        <section className="flex flex-col gap-5">
          {/** Testimonial 1 */}
          <div className="flex gap-2 items-start">
            <div className="flex flex-col">
              <p className="font-semibold underline">- John Doe, Customer at "The Living Room"</p>
              <p>
                "We absolutely adore our George Wood Caskets. They are stunning,
                meticulously crafted, and just as functional as they are
                beautiful. Our customers have been loving them for years!"
              </p>
            </div>
          </div>

          {/** Testimonial 2 */}
          <div className="flex gap-2 items-start">
           
            <div className="flex flex-col">
              <p className="font-semibold underline">- John Doe, Customer at "The Living Room"</p>
              <p>
                "We absolutely adore our George Wood Caskets. They are stunning,
                meticulously crafted, and just as functional as they are
                beautiful. Our customers have been loving them for years!"
              </p>
            </div>
          </div>

          {/** Testimonial 3 */}
          <div className="flex gap-2 items-start">
            <div className="flex flex-col">
              <p className="font-semibold underline">- Charles Eze, Customer at "The Living Room"</p>
              <p>
                "I highly recommend George Wood casket. Had the funeral of a
                loved one recently and due to some circumstances I couldn't
                handle planning the burial so I requested for the funeral
                planning service and I must say every single thing went smoothly
                and in accordance with the necessary customs. Their casket of
                course was exceptional. I received multiple compliments from
                family and friends on the burial."
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TestimonialComp;
