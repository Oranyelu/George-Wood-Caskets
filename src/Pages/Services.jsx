import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Services from "../assets/service-api"; // Importing the service data
import ScrollReveal from "../Components/ScrollReveal";

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
    <div className="min-h-screen bg-brand-cream dark:bg-primary-dark font-montserrat pt-24 pb-12 transition-colors duration-300">
      <Helmet>
        <title>Funeral Services | George Wood Caskets</title>
        <meta name="description" content="Professional funeral services including ambulance, hearse, and pallbearers in Enugu, Nigeria." />
        <link rel="canonical" href="https://georgewoodcasket.com/services" />
      </Helmet>
      <div className="max-w-[1300px] mx-auto w-full px-4 md:px-8">
        <ScrollReveal>
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-12 text-[#135B3A] dark:text-green-500 font-serif">All Services</h1>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleServices.map((service) => (
            <ScrollReveal key={service.id}>
              <Link
                to={`/book-service/${service.name.replace(/\s+/g, '-').toLowerCase()}`}
                className="group block h-full"
              >
                <div className="bg-brand-card dark:bg-brand-card-dark p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-102 border border-[#135B3A]/10 dark:border-white/5 flex flex-col h-full">
                  <div className="overflow-hidden rounded-xl mb-4 flex-shrink-0 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                    <img
                      src={service.thumbnail}
                      alt={service.name}
                      className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <h2 className="text-lg font-bold font-serif text-brand-black dark:text-brand-white group-hover:text-[#135B3A] dark:group-hover:text-green-400 transition-colors mb-2">{service.name}</h2>
                    <p className="text-brand-black/70 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-1 font-light leading-relaxed">{service.description}</p>
                    <div className="mt-auto">
                      <div className="inline-block px-3 py-1 text-xs font-bold bg-[#135B3A]/10 dark:bg-green-500/10 text-[#135B3A] dark:text-green-400 rounded-full mb-3">
                        Price on Request
                      </div>
                      <button className="w-full bg-[#135B3A] text-white py-3 rounded-xl hover:bg-[#0E462D] dark:bg-[#135B3A] dark:hover:bg-[#1E7C52] transition-colors font-bold shadow-md">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
        {visibleServices.length < servicesData.length && (
          <ScrollReveal>
            <div className="flex justify-center mt-10">
              <button
                onClick={loadMoreServices}
                className="px-8 py-3 bg-[#135B3A] hover:bg-[#0E462D] dark:bg-[#135B3A] dark:hover:bg-[#1E7C52] text-white rounded-xl transition-colors shadow-md font-bold"
              >
                Load More
              </button>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;

