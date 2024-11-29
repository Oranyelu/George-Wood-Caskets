import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Services from "../assets/service-api"; // Importing the service data
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const ServicesPage = () => {
  const { servicesData } = Services;
  const [visibleServices, setVisibleServices] = useState([]);
  const [serviceLimit, setServiceLimit] = useState(15);

  useEffect(() => {
    // Initially load 15 services
    setVisibleServices(servicesData.slice(0, serviceLimit));
  }, [serviceLimit, servicesData]);

  const loadMoreServices = () => {
    setServiceLimit((prevLimit) => prevLimit + 10);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        loadMoreServices();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-montserrat">
      <section>
        <Header />
      </section>
      <div className="h-[80px]"></div>
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center mb-8">All Services</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {visibleServices.map((service) => (
            <div key={service.id} className="bg-white p-4 rounded-lg shadow-md">
              <Link to={`/product/${service.id}`}>
                <img
                  src={service.thumbnail}
                  alt={service.name}
                  className="w-full h-40 object-cover rounded-md"
                />
              </Link>
              <h2 className="text-lg font-semibold mt-2">{service.name}</h2>
              <p className="text-gray-700">{service.description}</p>
              <p className="text-gray-900 font-bold">
                {service.price.toLocaleString()} NGN
              </p>
            </div>
          ))}
        </div>
      </div>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default ServicesPage;
