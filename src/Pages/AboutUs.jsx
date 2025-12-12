import { Link } from "react-router-dom";
import AboutImage from "../assets/woodworking_workshop.png";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col font-montserrat pt-24 pb-12 transition-colors duration-300">
      <main className="max-w-[1300px] mx-auto px-4 md:px-8 flex-grow">

        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#A37E2C] dark:text-yellow-500 mb-4">About Us</h1>
          <p className="text-lg text-[#011309] dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Learn more about George Wood Caskets and George Wood&#39;s Legacy.
            Dedicated to craftsmanship, compassion, and community.
          </p>
          <div className="w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-xl mb-10">
            <img src={AboutImage} alt="Woodworking Workshop" className="w-full h-full object-cover" />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#011309] dark:text-white mb-5">
            George Wood Caskets
          </h2>
          <p className="text-lg mb-5 text-gray-800 dark:text-gray-300">
            Founded in 1984 by George-Wood Mmaduka Chime, George Wood Caskets has
            established itself as a leading casket manufacturer in Nigeria. With
            decades of experience, our dedication to craftsmanship and quality
            has earned us the reputation of producing the finest caskets in the
            country. Our commitment to excellence and client satisfaction is at
            the core of everything we do.
          </p>
          <h3 className="text-2xl font-semibold text-[#A37E2C] dark:text-yellow-500 mb-2">
            Our Mission
          </h3>
          <p className="text-lg mb-5 text-gray-800 dark:text-gray-300">
            At George Wood Caskets, we understand the significance of our
            products in commemorating loved ones. We aim to provide caskets that
            reflect dignity, respect, and the unique essence of each individual.
            Our team of skilled artisans employs traditional craftsmanship
            combined with modern techniques to create caskets that are not only
            reliable but also aesthetically pleasing.
          </p>
          <h3 className="text-2xl font-semibold text-[#A37E2C] dark:text-yellow-500 mb-2">
            Our Services
          </h3>
          <ul className="text-lg mb-5 list-disc list-inside text-gray-800 dark:text-gray-300">
            <li>
              Custom Casket Design: We offer bespoke casket designs to meet the
              specific needs and preferences of our clients.
            </li>
            <li>
              Quality Materials: Our caskets are made from the finest materials,
              ensuring durability and elegance.
            </li>
            <li>
              Exceptional Craftsmanship: Each casket is meticulously crafted to
              ensure it meets our high standards of quality.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#011309] dark:text-white mb-5">
            George Wood&#39;s Legacy
          </h2>
          <p className="text-lg mb-5 text-gray-800 dark:text-gray-300">
            In 2024, we expanded our mission of care and compassion with the
            establishment of George Wood&#39;s Legacy (formerly George Wood Charity Foundation). This new arm of
            our enterprise aims to impact the lives of people beyond our
            immediate clientele, extending our dedication to support and uplift
            communities across Nigeria.
          </p>
          <h3 className="text-2xl font-semibold text-[#A37E2C] dark:text-yellow-500 mb-2">
            Our Impact
          </h3>
          <ul className="text-lg mb-5 list-disc list-inside text-gray-800 dark:text-gray-300">
            <li>
              Educational Support: Providing scholarships and educational
              resources to underprivileged children.
            </li>
            <li>
              Healthcare Assistance: Offering medical aid and health awareness
              programs in underserved areas.
            </li>
            <li>
              Community Development: Engaging in projects that promote
              sustainable development and improve living conditions.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#011309] dark:text-white mb-5">
            Our Founder
          </h2>
          <p className="text-lg mb-5 text-gray-800 dark:text-gray-300">
            George-Wood Mmaduka Chime, the visionary behind George Wood Caskets
            and George Wood&#39;s Legacy, has always believed in
            combining business excellence with social responsibility. His
            leadership and passion for making a difference have been the driving
            force behind our continuous growth and community impact.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-[#011309] dark:text-white mb-5">
            Our Commitment
          </h2>
          <p className="text-lg mb-5 text-gray-800 dark:text-gray-300">
            At George Wood Caskets and George Wood&#39;s Legacy, we
            deeply care about our clients and the broader community. We are
            committed to providing the highest quality products and services
            while actively contributing to the well-being and development of
            society.
          </p>
          <h3 className="text-2xl font-semibold text-[#A37E2C] dark:text-yellow-500 mb-2">
            Contact Us
          </h3>
          <p className="text-lg mb-5 text-gray-800 dark:text-gray-300">
            For more information about our products and services or to learn
            more about our initiatives, please reach out to us
            through our{" "}
            <Link
              to="/contacts"
              className="text-[#A37E2C] dark:text-yellow-500 underline hover:text-[#57492b] dark:hover:text-yellow-400"
            >
              contact page
            </Link>
            .
          </p>
          <p className="text-lg text-gray-800 dark:text-gray-300">
            Thank you for choosing George Wood Caskets. We are honored to serve
            you and your loved ones.
          </p>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;
