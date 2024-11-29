import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import Products from "../assets/product-api"; // Importing the product data
import Services from "../assets/service-api"; // Importing the service data
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { ProductContext } from "../ProductProvider";
import { FaPlus } from 'react-icons/fa'; // Importing plus icon

const ProductDetail = () => {
  const { productId } = useParams(); // Get the productId from URL parameters
  const [product, setProduct] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for pop-up
  const { productsData } = Products;
  const { servicesData } = Services;
  const { addToCart } = useContext(ProductContext);

  useEffect(() => {
    // Find the product with the matching ID
    const foundProduct = productsData.find(
      (item) => item.id === parseInt(productId, 10)
    );
    setProduct(foundProduct);
  }, [productId, productsData]);

  if (!product) return <p>Loading...</p>;

  const handleImageClick = () => {
    setIsFullScreen(true);
  };

  const exitFullScreen = () => {
    setIsFullScreen(false);
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    setShowPopup(true); // Show pop-up when the item is added to cart
    setTimeout(() => {
      setShowPopup(false); // Hide pop-up after 2 seconds
    }, 2000);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col font-montserrat">
      <section>
        <Header />
      </section>
      <div className="h-[80px]"></div>
      
      <section className="mt-16 p-4 flex flex-col items-center">
        {/* Card-styled component */}
        <div className="bg-white shadow-md rounded-lg p-6 max-w-5xl w-full lg:flex lg:space-x-6">
          
          {/* Product Carousel Section */}
          <div className="lg:w-1/2">
            <Carousel
              showArrows={true}
              showStatus={false}
              infiniteLoop={true}
              showThumbs={false}
              autoPlay={true}
              interval={5000}
            >
              {product.thumbnail.map((image, index) => (
                <div key={index} onClick={handleImageClick} className="cursor-pointer">
                  <img
                    src={image}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-auto object-contain rounded-md"
                  />
                </div>
              ))}
            </Carousel>
          </div>

          {/* Product Details Section */}
          <div className="lg:w-1/2 mt-4 lg:mt-0">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg mb-4">{product.description}</p>
            <p className="text-xl font-semibold mb-2">Color: {product.color}</p>
            <p className="text-2xl font-bold mb-4">Price: {product.price.toLocaleString()} NGN</p>
            <button
              className="bg-[#A37E2C] text-white px-4 py-2 rounded hover:bg-[#8b6824] active:bg-[#70541c] transition-colors flex items-center"
              onClick={() => handleAddToCart(product)}
            >
              <FaPlus className="mr-2" /> Add to Cart
            </button>
          </div>
        </div>
      </section>
      
      <section className="mt-8 p-4">
        <h1 className="text-2xl font-bold mb-4">You May Also Like</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productsData.slice(0, 5).map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-full h-[300px] object-cover rounded-md cursor-pointer"
                />
              </Link>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p>{item.description}</p>
              <p>Price: {item.price.toLocaleString()} NGN</p>
              <div className="w-full flex justify-end"> 
                <button
                  className="bg-[#A37E2C] text-white px-4 py-2 mt-2 rounded hover:bg-[#8b6824] active:bg-[#70541c] transition-colors flex items-center"
                  onClick={() => handleAddToCart(item)}
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="mt-8 p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Services You May Like</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {servicesData.slice(0, 5).map((service) => (
            <div key={service.id} className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <h2 className="text-xl font-semibold mb-4">{service.name}</h2>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />

      {/* Fullscreen Image Modal */}
      {isFullScreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="relative">
            <button
              className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={exitFullScreen}
            >
              X
            </button>
            <img
              src={product.thumbnail[0]}
              alt="Full screen product"
              className="w-full h-auto max-h-screen object-contain rounded-md"
            />
          </div>
        </div>
      )}

      {/* Pop-up notification */}
      {showPopup && (
         <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50 transition-opacity">
          Added to cart!
        </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
