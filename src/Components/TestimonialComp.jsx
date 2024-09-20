import React from "react";
import BKOL from "../assets/svgs/bookoflife.svg";

function TestimonialComp() {
  return (
    <div className="w-[100%] flex justify-center">
      <div className=" w-[95%] flex  flex-col text-white gap-8">
        <section className="flex flex-row w-full justify-between">
          <div>
            <h1 className="font-bold text-[25px]">
              Why Choose George Wood Casket?
            </h1>
            <h2>Read what our customers have to say...</h2>
          </div>

          <div className="flex flex-row gap-5">
            <div>
              <h2 className="text-[25px] font-bold">482</h2>
              <p>Clients</p>
            </div>

            <div>
              <h2 className="text-[25px] font-bold">726</h2>
              <p>Projects</p>
            </div>
          </div>
        </section>

        <section className="flex flex-row justify-between">
          <div className="bg-[#135B3A] w-[35%] h-[250px] rounded-md flex flex-col items-center justify-center">
            <div>
              5 <img src="" alt="Stars" />
            </div>
            <div>
              <p className="font-bold">100%</p>
              <p>Customer satisfaction</p>
            </div>
          </div>
          <div
            className="w-[60%] h-full bg-no-repeat bg-center bg-cover rounded-xl  flex flex-col "
            style={{ backgroundImage: `url(${BKOL})` }}
          >
            <h1>Discover “The Book Of Life”</h1>
            <p className="">
              "Step into the stories of those who shaped our journey. Each story
              is a reflection of love, strength, and unforgettable moments. In
              these pages, their legacies live on, offering comfort and
              inspiration. Celebrate their journeys, their memories, and the
              lasting impact they leave behind."
            </p>
          </div>
        </section>
        <section className="flex flex-row gap-5">
          <div className=" flex flex-row gap-2">
            <img
              src=""
              alt="profile"
              className="rounded-full bg-black h-[50px] w-[50px]"
            />{" "}
            <div className="flex flex-col ">
              {" "}
              <p className="font-semibold underline">
                - John Doe, Customer at "The Living Room"
              </p>
              <p>
                "We absolutely adore our George Wood Caskets. They are stunning,
                meticulously crafted, and just as functional as they are
                beautiful. Our customers have been loving them for years!"
              </p>
            </div>
          </div>
          <div className=" flex flex-row gap-2">
            <img
              src=""
              alt="profile"
              className="rounded-full bg-black h-[50px] w-[50px]"
            />{" "}
            <div className="flex flex-col ">
              {" "}
              <p className="font-semibold underline">
                - John Doe, Customer at "The Living Room"
              </p>
              <p>
                "We absolutely adore our George Wood Caskets. They are stunning,
                meticulously crafted, and just as functional as they are
                beautiful. Our customers have been loving them for years!"
              </p>
            </div>
          </div>
          <div className=" flex flex-row gap-2">
            <img
              src=""
              alt="profile"
              className="rounded-full bg-black h-[50px] w-[50px]"
            />{" "}
            <div className="flex flex-col ">
              {" "}
              <p className="font-semibold underline">
                - Charles Eze, Customer at "The Living Room"
              </p>
              <p>
                I highly recommend George Wood casket. Had the funeral of a
                loved one recently and due to some circumstances I couldn't
                handle planning the burial so I requested for the funeral
                planning service and I must say every single thing went smoothly
                and in accordance with the necessary customs. Their casket of
                course was exceptional. I received multiple compliment from
                family and friends on the burial.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TestimonialComp;
