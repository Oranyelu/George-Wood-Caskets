
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col font-montserrat">
      <main className="flex-grow mt-16 p-10">
        <section className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#A37E2C] mb-2">About Us</h1>
          <p className="text-lg text-[#011309]">
            Learn more about George Wood Casket and the George Wood Charity
            Foundation
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-[#011309] mb-5">
            George Wood Casket
          </h2>
          <p className="text-lg mb-5">
            Founded in 1984 by George-Wood Mmaduka Chime, George Wood Casket has
            established itself as a leading casket manufacturer in Nigeria. With
            decades of experience, our dedication to craftsmanship and quality
            has earned us the reputation of producing the finest caskets in the
            country. Our commitment to excellence and client satisfaction is at
            the core of everything we do.
          </p>
          <h3 className="text-2xl font-semibold text-[#A37E2C] mb-2">
            Our Mission
          </h3>
          <p className="text-lg mb-5">
            At George Wood Casket, we understand the significance of our
            products in commemorating loved ones. We aim to provide caskets that
            reflect dignity, respect, and the unique essence of each individual.
            Our team of skilled artisans employs traditional craftsmanship
            combined with modern techniques to create caskets that are not only
            reliable but also aesthetically pleasing.
          </p>
          <h3 className="text-2xl font-semibold text-[#A37E2C] mb-2">
            Our Services
          </h3>
          <ul className="text-lg mb-5 list-disc list-inside">
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

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-[#011309] mb-5">
            George Wood Charity Foundation
          </h2>
          <p className="text-lg mb-5">
            In 2024, we expanded our mission of care and compassion with the
            establishment of the George Wood Charity Foundation. This new arm of
            our enterprise aims to impact the lives of people beyond our
            immediate clientele, extending our dedication to support and uplift
            communities across Nigeria.
          </p>
          <h3 className="text-2xl font-semibold text-[#A37E2C] mb-2">
            Our Impact
          </h3>
          <ul className="text-lg mb-5 list-disc list-inside">
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

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-[#011309] mb-5">
            Our Founder
          </h2>
          <p className="text-lg mb-5">
            George-Wood Mmaduka Chime, the visionary behind George Wood Casket
            and the George Wood Charity Foundation, has always believed in
            combining business excellence with social responsibility. His
            leadership and passion for making a difference have been the driving
            force behind our continuous growth and community impact.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-[#011309] mb-5">
            Our Commitment
          </h2>
          <p className="text-lg mb-5">
            At George Wood Casket and the George Wood Charity Foundation, we
            deeply care about our clients and the broader community. We are
            committed to providing the highest quality products and services
            while actively contributing to the well-being and development of
            society.
          </p>
          <h3 className="text-2xl font-semibold text-[#A37E2C] mb-2">
            Contact Us
          </h3>
          <p className="text-lg mb-5">
            For more information about our products and services or to learn
            more about our foundation’s initiatives, please reach out to us
            through our{" "}
            <Link
              to="/contacts"
              className="text-[#A37E2C] underline hover:text-[#57492b]"
            >
              contact page
            </Link>
            .
          </p>
          <p className="text-lg">
            Thank you for choosing George Wood Casket. We are honored to serve
            you and your loved ones.
          </p>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;
