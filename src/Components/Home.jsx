import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../ProductProvider";
import Products from "../assets/product-api"; // Importing the product data
import Services from "../assets/service-api"; // Importing the service data

function Home() {
  const { addToCart } = useContext(ProductContext);
  const { productData } = Products; // Accessing the product data
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
  const featuredProducts = productData.sort(() => 0.5 - Math.random());
  setRandomProducts(featuredProducts.slice(0, 15));
}, [productData]);

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
      <section className="products-section pt-[40px] p-4">
        <header className="flex flex-col text-center">
          <h2 className="text-[24.8px] text-white">Featured Products</h2>
          <h1 className="text-[40px] text-[#A37E2C] font-bold">
            BESTSELLER PRODUCTS
          </h1>
          <p className="text-[15px] text-gray-50 pb-7">
            Make your choice based on popular demand...
          </p>
        </header>
        <div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-md"
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
                  {product.label}
                </p>
                <p>Color: {product.color}</p>
                <p className="text-gray-900 font-bold">
                  {product.price.toLocaleString()} NGN
                </p>
                <div className="w-full flex justify-end">
                  <button
                    className="bg-[#A37E2C] text-white px-4 py-2 rounded mt-2 hover:bg-[#8b6824] active:bg-[#70541c] transition-colors"
                    onClick={() => handleAddToCart(product)}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </ul>
        </div>
        <div className="text-center mt-6">
          <Link to="/products">
            <button className="bg-[#A37E2C] text-white px-6 py-3 rounded hover:bg-[#8b6824] active:bg-[#70541c] transition-colors">
              View All Products
            </button>
          </Link>
        </div>
      </section>

      <section className="achievements-section pt-[40px] p-4">
        <header className="flex flex-col text-center">
          <h2 className="text-[24.8px] text-white">Our Services</h2>
          <h1 className="text-[35px] text-[#011309] font-bold ">
            THE BEST SERVICES
          </h1>
          <p className="text-[15px] text-gray-50 pb-7">
            Explore our range of services...
          </p>
        </header>
        <div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {randomServices.map((service) => (
              <div
                key={service.id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <img
                  src={service.thumbnail}
                  alt={service.name}
                  className="w-full h-[250px] object-cover rounded-md"
                />
                <h1 className="text-lg font-semibold mt-2 text-[#011309]">
                  {service.name}
                </h1>
                <p>Color: {service.color}</p>
                <p className="text-gray-900 font-bold">
                  Price: {service.price.toLocaleString()} NGN
                </p>
                <div className="w-full flex justify-end">
                  <button
                    className="bg-[#A37E2C] text-white px-4 py-2 rounded mt-2 hover:bg-[#8b6824] active:bg-[#70541c] transition-colors"
                    onClick={() => handleAddToCart(service)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </ul>
        </div>
        <div className="text-center mt-6">
          <Link to="/services">
            <button className="bg-[#A37E2C] text-white px-6 py-3 rounded hover:bg-[#8b6824] active:bg-[#70541c] transition-colors">
              View All Services
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
