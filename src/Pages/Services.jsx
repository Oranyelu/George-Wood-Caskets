import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Services from "../assets/service-api"; // Importing the service data

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
    <div className="min-h-screen font-montserrat pt-24 pb-12 transition-colors duration-300">
      <Helmet>
        <title>Funeral Services | George Wood Caskets</title>
        <meta name="description" content="Professional funeral services including ambulance, hearse, and pallbearers in Enugu, Nigeria." />
        <link rel="canonical" href="https://georgewoodcasket.com/services" />
      </Helmet>
      <div className="max-w-[1300px] mx-auto w-full px-4 md:px-8">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-12 text-[#135B3A] dark:text-green-500 font-serif">All Services</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleServices.map((service) => (
            <Link
              key={service.id}
              to={`/book-service/${service.name.replace(/\s+/g, '-').toLowerCase()}`}
              className="group"
            >
              <div className="bg-[#F0B52E] p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 border border-white/10 flex flex-col h-full">
                <div className="overflow-hidden rounded-md mb-4 flex-shrink-0">
                  <img
                    src={service.thumbnail}
                    alt={service.name}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <h2 className="text-lg font-bold mt-2 text-[#011309] mb-2">{service.name}</h2>
                  <p className="text-[#011309]/80 text-sm mb-4 line-clamp-3 flex-1 font-medium">{service.description}</p>
                  <div className="mt-auto">
                    <p className="text-[#135B3A] font-extrabold text-lg mb-2">
                      {service.price.toLocaleString()} NGN
                    </p>
                    <button className="w-full mt-1 bg-[#135B3A] text-white py-2 rounded hover:bg-[#0E462D] transition-colors font-bold shadow-md">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {visibleServices.length < servicesData.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={loadMoreServices}
              className="px-6 py-3 bg-[#135B3A] text-white rounded-full hover:bg-green-800 transition-colors shadow-lg"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
