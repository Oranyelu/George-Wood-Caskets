// Xclusive.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Products from '../assets/product-api'; // Importing the product data

const Xclusive = () => {
  const { productData } = Products;

  // Filter products with the label "Xclusive"
  const xclusiveProducts = productData.filter(product => product.label === "Xclusive");

  return (
    <div className="min-h-screen bg-custom-gradient font-montserrat">
      <section className="products-section pt-[40px]">
        <header className="flex flex-col items-center">
          <h2 className="text-[31px] text-white">Exclusive Collection</h2>
          <h1 className="text-[50px] text-[#A37E2C] font-bold">
            XCLUSIVE PRODUCTS
          </h1>
          <p className="text-[19px] text-gray-50">
            Discover our exclusive range...
          </p>
        </header>
        <div>
          <ul className="flex flex-wrap gap-4 justify-center">
            {xclusiveProducts.map((product) => (
              <div
                key={product.id}
                className="w-[232.69px] bg-white border border-gray-200 p-4 rounded-lg"
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
                  <h3>Description: {product.description}</h3>
                  <p>Color: {product.color}</p>
                  <p>${product.price}</p>
                  <button
                    className="bg-[#A37E2C] text-white px-4 py-2 rounded mt-2 hover:bg-[#8b6824] active:bg-[#70541c] transition-colors"
                    onClick={() => addToCart(product)}
                  >
                    Order now
                  </button>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Xclusive;
