import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../ProductProvider";
import Products from "../assets/product-api"; // Importing the product data
import Services from "../assets/service-api"; // Importing the service data

function Home() {
  const { addToCart } = useContext(ProductContext);
  const { productData } = Products; // Accessing the product data
  const { servicesData } = Services; // Accessing the service data
  const [notification, setNotification] = useState(null);

  const handleAddToCart = (item) => {
    addToCart(item);
    setNotification(`Added to cart: ${item.name}`);
    setTimeout(() => {
      setNotification(null);
    }, 3000); // 8 seconds duration
  };

  return (
    <div>
      {notification && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-500 text-white px-4 py-2 rounded shadow-lg text-center">
            {notification}
          </div>
        </div>
      )}
      <section className="products-section pt-[40px]">
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
          <ul className="flex flex-wrap gap-1 justify-center">
            {productData.map((product) => (
              <div
                key={product.id}
                className="w-[200px] bg-white border border-gray-200 p-4 rounded-lg"
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.thumbnail}
                    alt="product img"
                    className="w-full h-auto object-cover cursor-pointer"
                  />
                </Link>

                <div>
                  <h1 className="text-[#011309] font-semibold text-lg">
                    {product.name}
                  </h1>
                  <h2 className="text-[#135B3A]">{product.label}</h2>
                  <p>Color: {product.color}</p>
                  <p>${product.price}</p>
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
      </section>

      <section className="achievements-section pt-[40px]">
        <header className="flex flex-col text-center">
          <h2 className="text-[24.8px] text-white">Our Services</h2>
          <h1 className="text-[40px] text-[#011309] font-bold ">
            THE BEST SERVICES
          </h1>
          <p className="text-[15px] text-gray-50 pb-7">
            Explore our range of services...
          </p>
        </header>
        <div>
          <ul className="flex flex-wrap gap-1 justify-center">
            {servicesData.map((service) => (
              <div
                key={service.id}
                className="w-[200px] bg-white border border-gray-200 p-4 rounded-lg"
              >
                <img
                  src={service.thumbnail}
                  alt={service.name}
                  className="w-full h-auto object-cover"
                />
                <div>
                  <h1 className="text-[#011309] font-semibold text-lg">
                    {service.name}
                  </h1>
                  <p>Color: {service.color}</p>
                  <p>Price: {service.price.toLocaleString()} NGN</p>
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
      </section>
    </div>
  );
}

export default Home;
