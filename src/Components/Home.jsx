import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../ProductProvider";
import Products from "../assets/product-api"; // Importing the product data
import Services from "../assets/service-api"; // Importing the service data
// import AmbulanceBanner from "../assets/svgs/Ambulace banner.svg";

function Home() {
  const { addToCart } = useContext(ProductContext);
  const { productsData } = Products; // Accessing the product data
  const { servicesData } = Services; // Accessing the service data
  const [notification, setNotification] = useState(null);
  const [randomServices, setRandomServices] = useState([]);
  const [featuredProducts, setRandomProducts] = useState([]);

  const handleAddToCart = (item) => {
    addToCart(item);
    setNotification(`Added to cart: ${item.name}`);
    setTimeout(() => {
      setNotification(null);
    }, 3000); // 3 seconds duration
  };

  // Select 5 random products
  useEffect(() => {
    const featuredProducts = productsData.sort(() => 0.5 - Math.random());
    setRandomProducts(featuredProducts.slice(0, 8));
  }, [productsData]);

  // Select 5 random services
  useEffect(() => {
    const shuffledServices = servicesData.sort(() => 0.5 - Math.random());
    setRandomServices(shuffledServices.slice(0, 6));
  }, [servicesData]);

  return (
    <div>
      {notification && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-500 text-white px-4 py-2 rounded shadow-lg text-center">
            {notification}
          </div>
        </div>
      )}

      {/* <section className="pt-10 flex justify-center">
        <img
          src={AmbulanceBanner}
          alt="Luxrry SUV Ambulance Serivices"
          className=" w-[98vw]"
        />{" "}
      </section> */}

      <section className="products-section pt-[40px] p-4">
        <header className="flex flex-col text-center">
          <h2 className="text-[24.8px] text-[#135B3A] font-bold">
            Featured Products
          </h2>
          <p className="text-[15px] text-[#8b6824] pb-7">
            Make your choice based on popular demand...
          </p>
        </header>
        <div>
          <ul
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {featuredProducts.map((product) => (
              <li
                key={product.id}
                className="flex-shrink-0 w-[400px] bg-white bg-opacity-100 backdrop-filter backdrop-blur-md border border-white border-opacity-20 p-4 rounded-lg shadow-lg snap-center"
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-[300px] object-cover rounded-md"
                  />
                </Link>
                <h1 className="text-lg font-semibold mt-2 text-[#011309]">
                  {product.name}
                </h1>
                <p className="text-[#135B3A] text-lg font-semibold mt-2">
                  {product.label||
                    "Economy"}
                </p>
                <p>Color: {product.color}</p>
               
                <div className="w-full flex justify-end">
                  <button
                    className="bg-[#135B3A] text-white px-4 py-2 rounded mt-2 hover:bg-[#8b6824] active:bg-[#70541c] transition-colors"
                    onClick={() => handleAddToCart(product)}
                  >
                    Order Now
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center mt-6">
          <Link to="/products">
            <button className="bg-[#135B3A] text-white px-6 py-3 rounded hover:bg-[#8b6824] active:bg-[#70541c] transition-colors">
              View All Products
            </button>
          </Link>
        </div>
      </section>

      <section className="achievements-section pt-[40px] p-4">
        <header className="flex flex-col text-center">
          <h2 className="text-[24.8px] text-[#135B3A] font-bold">
            Featured Services
          </h2>
          <p className="text-[15px] text-white pb-7">
            Explore our range of services
          </p>
        </header>
        <div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {randomServices.map((service) => (
              <li
                key={service.id}
                className="bg-[#f0c068] bg-opacity-100 backdrop-filter backdrop-blur-md border border-white border-opacity-20 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center h-[200px]"
              >
                <h2 className="text-lg font-semibold text-[#135B3A] mb-2">
                  {service.name}
                </h2>
                <p className="text-white text-center">
                  {service.description ||
                    "Lorem ipsum dolor sit amet consectetur."}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Home;
