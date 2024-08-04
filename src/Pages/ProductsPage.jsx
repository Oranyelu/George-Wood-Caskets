import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Products from "../assets/product-api"; // Importing the product data
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const ProductsPage = () => {
  const { productData } = Products;
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [productLimit, setProductLimit] = useState(15);

  useEffect(() => {
    // Initially load 15 products
    setVisibleProducts(productData.slice(0, productLimit));
  }, [productLimit, productData]);

  const loadMoreProducts = () => {
    setProductLimit((prevLimit) => prevLimit + 10);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        loadMoreProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-custom-gradient min-h-screen flex flex-col font-montserrat">
      <section>
        <Header />
      </section>
      <div className="min-h-screen p-4 mt-[100px]">
        <h1 className="text-3xl font-bold text-center text-[#A37E2C] mb-8">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {visibleProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-full h-[300px] object-cover rounded-md"
                />
              </Link>
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-700">{product.color}</p>
              <p className="text-gray-900 font-bold"> {product.price.toLocaleString()} NGN</p>
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

export default ProductsPage;
