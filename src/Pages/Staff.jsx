import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import GeorgeChiemerieChime from "../assets/StaffPicture/WhatsApp Image 2025-04-06 at 19.34.03_7af4c85b.jpg";
import GeorgeWoodChime from "../assets/StaffPicture/WhatsApp Image 2025-04-06 at 19.13.00_97d1e770.jpg";
import EkwyChime from "../assets/StaffPicture/WhatsApp Image 2025-04-06 at 19.13.02_870855e6.jpg";
import NelsonOnoh from "../assets/StaffPicture/NelsonOnoh.jpg";

const staffData = [
  {
    name: "George-Wood Mmaduka Chime",
    title: "Founder",
    image: GeorgeWoodChime,
    bio: `George-Wood Chime is the visionary behind George Wood Casket. Established in 1984, his mission was to redefine the funeral industry in Nigeria by providing high-quality caskets crafted to compete with international standards. Under his leadership, the company grew from a small workshop into a reputable brand known for its craftsmanship, innovation, and commitment to honoring lives and legacies. His dedication laid the foundation for what George Wood Casket represents today—excellence, tradition, and compassion.`,
  },
  {
    name: "Ekwutosi Appolonia Chime",
    title: "Co-Founder",
    image: EkwyChime,
    bio: `Ekwutosi Appolonia Chime played a pivotal role in co-founding George Wood Casket alongside George-Wood Chime. With a strong sense of dedication and a passion for service, she contributed significantly to the company’s foundation, ensuring that the values of quality, integrity, and empathy were at the heart of the business. Her influence extended beyond operations, shaping the company’s customer relations and fostering a legacy of excellence and compassion that continues to define George Wood Casket today.`,
  },
  {
    name: "George Chiemerie Chime",
    title: "Executive Director",
    image: GeorgeChiemerieChime,
    bio: `As the Executive Director of George Wood Casket, George Chiemerie Chime is at the forefront of driving the company’s legacy into the future. With a deep-rooted passion for innovation and excellence, he is committed to modernizing the funeral industry in Nigeria while preserving the traditions and values established since 1984. Leveraging his expertise in web development, digital marketing, and business strategy, George has been instrumental in enhancing the company’s online presence, streamlining operations, and expanding its reach. Under his leadership, George Wood Casket continues to evolve, embracing technology and innovative solutions to provide premium funeral services that honor lives with dignity and respect. Beyond his executive role, George is also the visionary behind George Wood Charity Foundation (GWCF), an initiative dedicated to honoring legacies while making a positive impact on future generations. His ambition is not just to sustain the company but to revolutionize the funeral industry in Nigeria through pioneering innovations.`,
  },

  {
    name: "Nelson Chukwudi Onoh",
    title: "Executive Member",
    image: NelsonOnoh,
    bio: `Nelson Chukwudi Onoh is a dedicated executive member at George Wood Casket, contributing significantly to the company’s strategic direction and daily operations. With a strong sense of discipline and a results-driven mindset, he plays a vital role in overseeing logistics, team coordination, and customer relations. Nelson is passionate about upholding the legacy of excellence that defines George Wood Casket, ensuring that each service delivered meets the company’s high standards of dignity and professionalism. His commitment to integrity, innovation, and teamwork makes him an indispensable part of the leadership team driving the brand forward.`,
  },
];

const StaffCard = ({ name, title, image, bio }) => {
  const [expanded, setExpanded] = useState(false);
  const preview = bio.slice(0, 100);

  return (
    <div className="flex flex-col md:flex-row items-start gap-4 border p-4 rounded-xl shadow-md bg-white">
      <img
        src={image}
        alt={name}
        className="w-32 h-32 object-cover rounded-full"
      />
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">{title}</p>
        <p className="mt-2 text-sm leading-relaxed">
          {expanded ? bio : `${preview}...`}
        </p>
        {bio.length > 100 && (
          <button
            className="mt-2 text-blue-600 hover:underline text-sm"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
};

function Staff() {
  return (
    <div>
      <Header />

      <main className="max-w-6xl mx-auto py-12 mt-[70px] px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Staff</h1>

        <p className="mb-8 text-center max-w-3xl mx-auto">
          At George Wood Casket and Furniture, we pride ourselves on having a
          dedicated and talented team. Our staff is committed to providing
          exceptional service and ensuring customer satisfaction.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-6 text-center">
          Meet Our Team
        </h2>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staffData.map((staff, index) => (
            <StaffCard key={index} {...staff} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Staff;
