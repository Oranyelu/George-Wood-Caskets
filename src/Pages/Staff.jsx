import { useState } from "react";
import PropTypes from "prop-types";
import StaffModal from "../Components/StaffModal";
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

const StaffCard = ({ name, title, image, bio, onReadMore }) => {
  const preview = bio.slice(0, 100);

  return (
    <div className="flex flex-col items-center text-center p-6 border border-white/10 rounded-xl shadow-lg bg-[#F0B52E] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
      <img
        src={image}
        alt={name}
        className="w-32 h-32 object-cover rounded-full shadow-md mb-4 border-2 border-white/30"
      />

      <h3 className="text-xl font-bold text-[#011309] mb-1">{name}</h3>
      <p className="text-[#011309]/80 font-bold uppercase text-xs tracking-wider mb-3">{title}</p>

      <p className="text-sm leading-relaxed text-[#011309]/90 mb-4 line-clamp-3">
        {preview}...
      </p>

      <button
        className="mt-auto bg-[#135B3A] text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-[#0E462D] transition-colors shadow-md"
        onClick={onReadMore}
        aria-label={`Read more about ${name}`}
      >
        Read More
      </button>
    </div>
  );
};

StaffCard.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  image: PropTypes.string,
  bio: PropTypes.string,
  onReadMore: PropTypes.func.isRequired,
};

function Staff() {
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReadMore = (staff) => {
    setSelectedStaff(staff);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStaff(null);
  };

  return (
    <div className="bg-[#135B3A]/5 min-h-screen">
      <main className="max-w-7xl mx-auto py-16 mt-[70px] px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#135B3A] dark:text-green-500">Our Team</h1>
          <div className="h-1 w-24 bg-[#F0B52E] mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            At George Wood Casket, we pride ourselves on having a dedicated and talented team committed to providing exceptional service and honoring legacies with dignity.
          </p>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {staffData.map((staff, index) => (
            <StaffCard
              key={index}
              {...staff}
              onReadMore={() => handleReadMore(staff)}
            />
          ))}
        </div>

        {/* Staff Detail Modal */}
        <StaffModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          staff={selectedStaff}
        />
      </main>
    </div>
  );
}

export default Staff;
