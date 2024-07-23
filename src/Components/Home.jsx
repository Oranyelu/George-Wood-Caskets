import React, { useContext } from "react";
import { ProductContext } from "../ProductProvider";
import { Link } from "react-router-dom";
import Products from '../assets/product-api'; // Importing the product data
import Services from '../assets/service-api'; // Importing the service data

function Home() {
  const { addToCart } = useContext(ProductContext);
  const { productData } = Products; // Accessing the product data
  const { servicesData } = Services; // Accessing the service data

  return (
    <div>
      <section className="products-section pt-[40px]">
        <header className="flex flex-col items-center">
          <h2 className="text-[31px] text-white">Featured Products</h2>
          <h1 className="text-[50px] text-[#A37E2C] font-bold">BESTSELLER PRODUCTS</h1>
          <p className="text-[19px] text-gray-50">Make your choice based on popular demand...</p>
        </header>
        <div>
          <ul className="flex flex-wrap gap-4">
            {productData.map((product) => (
              <div key={product.id} className="w-[232.69px] bg-white border border-gray-200 p-4 rounded-lg">
                <img src={product.thumbnail} alt="product img" className="w-full h-auto object-cover" />
                <div>
                  <h1 className="text-[#011309] font-semibold text-lg">{product.name}</h1>
                  <h2 className="text-[#135B3A]">{product.label}</h2>
                  <h3>Description: {product.description}</h3>
                  <p>Color: {product.color}</p>
                  <p>${product.price}</p>
                  <button className="bg-[#A37E2C] text-white px-4 py-2 rounded" onClick={() => addToCart(product)}>Order now</button>
                </div>
              </div>
            ))}
          </ul>
          <Link to="/cart" className="text-blue-500 hover:underline mt-4 inline-block">Go to Cart</Link>
        </div>
      </section>

      <section className="achievements-section pt-[40px]">
        <header className="flex flex-col items-center">
          <h2 className="text-[31px] text-white">Our Services</h2>
          <h1 className="text-[50px] text-[#A37E2C] font-bold">THE BEST SERVICES</h1>
          <p className="text-[19px] text-gray-50">Explore our range of services...</p>
        </header>
        <div>
          <ul className="flex flex-wrap gap-4">
            {servicesData.map((service) => (
              <div key={service.id} className="w-[232.69px] bg-white border border-gray-200 p-4 rounded-lg">
                <img src={service.thumbnail} alt={service.name} className="w-full h-auto object-cover" />
                <div>
                  <h1 className="text-[#011309] font-semibold text-lg">{service.name}</h1>
                  <p>{service.description}</p>
                  <p>Color: {service.color}</p>
                  <p>Price: {service.price.toLocaleString()} NGN</p>
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
