import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function Staff() {
  return (
    <div>
      <Header />

      {/* Main content section with margin and padding */}
      <main className="max-w-6xl mx-auto py-12 mt-[70px]">
        <h1 className="text-4xl font-bold mb-8">Our Staff</h1>

        <p>
          At George Wood Casket and Furniture, we pride ourselves on having a
          dedicated and talented team. Our staff is committed to providing
          exceptional service and ensuring customer satisfaction.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">Meet Our Team</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Staff Member 1 */}
          <div className="border p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">George-Wood Mmaduka Chime</h3>
            <p className="text-gray-600">Founder</p>
            <p className="mt-2">
              George-Wood Chime is the visionary behind George Wood Casket.
              Established in 1984, his mission was to redefine the funeral
              industry in Nigeria by providing high-quality caskets crafted to
              compete with intrenational standards. Under his leadership, the
              company grew from a small workshop into a reputable brand known
              for its craftsmanship, innovation, and commitment to honoring
              lives and legacies. His dedication laid the foundation for what
              George Wood Casket represents today—excellence, tradition, and
              compassion.
            </p>
          </div>

          {/* Staff Member 2 */}
          <div className="border p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">Ekwutosi Appolonia Chime</h3>
            <p className="text-gray-600">Co-Founder</p>
            <p className="mt-2">
              Ekwutosi Appolonia Chime played a pivotal role in co-founding
              George Wood Casket alongside George-Wood Chime. With a strong
              sense of dedication and a passion for service, she contributed
              significantly to the company’s foundation, ensuring that the
              values of quality, integrity, and empathy were at the heart of the
              business. Her influence extended beyond operations, shaping the
              company’s customer relations and fostering a legacy of excellence
              and compassion that continues to define George Wood Casket today.
            </p>
          </div>

          {/* Staff Member 3 */}
          <div className="border p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">George Chiemerie Chime</h3>
            <p className="text-gray-600">Executive Director</p>
            <p className="mt-2">
              As the Executive Director of George Wood Casket, George Chiemerie
              Chime is at the forefront of driving the company’s legacy into the
              future. With a deep-rooted passion for innovation and excellence,
              he is committed to modernizing the funeral industry in Nigeria
              while preserving the traditions and values established since 1984.
              Leveraging his expertise in web development, digital marketing,
              and business strategy, George has been instrumental in enhancing
              the company’s online presence, streamlining operations, and
              expanding its reach. Under his leadership, George Wood Casket
              continues to evolve, embracing technology and innovative solutions
              to provide premium funeral services that honor lives with dignity
              and respect. Beyond his executive role, George is also the
              visionary behind George Wood Charity Foundation (GWCF), an
              initiative dedicated to honoring legacies while making a positive
              impact on future generations. His ambition is not just to sustain
              the company but to revolutionize the funeral industry in Nigeria
              through pioneering innovations.
            </p>
          </div>

          {/* Add more staff members as needed */}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Staff;
