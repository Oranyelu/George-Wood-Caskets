import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import BKOL from "../assets/svgs/bookoflife.svg";
import TestimonialsData from "../assets/Testinonials-api"; // Import the testimonials data

function TestimonialComp() {
  const [testimonials, setTestimonials] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    // Fetch testimonials from the pseudo API
    setTestimonials(TestimonialsData);

    // Calculate the average rating
    const totalRating = TestimonialsData.reduce(
      (sum, testimonial) => sum + testimonial.rating,
      0
    );
    const avgRating = totalRating / TestimonialsData.length;
    setAverageRating(avgRating);
  }, []);

  return (
    <div className="w-full flex justify-center pt-10">
      <div className="w-[95%] flex flex-col text-white gap-8">
        {/* Header Section */}
        <section className="flex justify-between  md:flex-row flex-col">
          <div>
            <h1 className="font-bold text-[25px]">
              Why Choose George Wood Casket?
            </h1>
            <h2 className="text-gray-300">
              Read what our customers have to say...
            </h2>
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
        <section className="flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="bg-[#135B3A] md:max-w-[250px] w-full h-[250px] rounded-md flex flex-col items-center justify-center">
            <div className="flex items-center">
              <span className="text-[60px] font-bold">
                {averageRating.toFixed(1)}
              </span>
              <FaStar size={50} color="gold" />
            </div>
            <div className="text-center">
              <p className="font-bold text-[20px]">
                {(averageRating * 20).toFixed(0)}%
              </p>
              <p>Customer satisfaction</p>
            </div>
          </div>

          <div
            className="w-[100%] h-[250px] bg-no-repeat bg-center bg-cover rounded-xl relative overflow-hidden"
            style={{ backgroundImage: `url(${BKOL})` }}
          >
            <div className="absolute inset-0 flex flex-col justify-end items-start p-4 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <Link
                to="/book-of-life"
                className="text-white underline hover:text-[#A37E2C]"
              >
                <h1 className="text-white text-md md:text-lg lg:text-xl font-bold hover:text-[#A37E2C]">
                  Discover “The Book Of Life”
                </h1>{" "}
              </Link>
              <p className="text-white text-left text-xs md:text-sm lg:text-base">
                "Step into the stories of those who shaped our journey. Each
                story is a reflection of love, strength, and unforgettable
                moments. In these pages, their legacies live on, offering
                comfort and inspiration."
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials
            .sort((a, b) => b.rating - a.rating) // Sort by rating (highest first)
            .slice(0, 6) // Limit to the top 6 testimonials
            .map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-lg text-white flex flex-col gap-3"
              >
                <p className="font-semibold underline text-lg">
                  - {testimonial.name}
                </p>
                <p className="text-sm">{testimonial.review}</p>
                <div className="flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map(
                    (_, index) => (
                      <FaStar key={index} size={15} color="gold" />
                    )
                  )}
                  {Array.from({ length: 5 - testimonial.rating }).map(
                    (_, index) => (
                      <FaStar key={index} size={15} color="gray" />
                    )
                  )}
                </div>
              </div>
            ))}
        </section>
      </div>
    </div>
  );
}

export default TestimonialComp;
