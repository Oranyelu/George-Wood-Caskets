import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Services from "../assets/service-api";
import { ProductContext } from "../Providers/ProductProvider";
import { FaPlus, FaHeart, FaShareAlt } from "react-icons/fa";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { products, addToCart } = useContext(ProductContext);
  const { servicesData } = Services;

  useEffect(() => {
    const foundProduct = products.find(
      (item) => item.id === productId
    );
    setProduct(foundProduct);
  }, [productId, products]);

  if (!product) return <p>Product Not Found</p>;

  const handleImageClick = () => {
    setIsFullScreen(true);
  };

  const exitFullScreen = () => {
    setIsFullScreen(false);
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  const handleAddToFavourites = (item) => {
    alert(`${item.name} added to favourites`);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col font-montserrat">
      <section className="mt-16 p-4 flex flex-col items-center">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-5xl w-full lg:flex lg:space-x-6">
          <div className="lg:w-1/2">
            <div onClick={handleImageClick} className="cursor-pointer">
              <img
                src={product.thumbnail}
                alt={`Product image`}
                className="w-full h-auto object-contain rounded-md"
              />
            </div>
          </div>
          <div className="lg:w-1/2 mt-4 lg:mt-0">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg mb-4">{product.description}</p>
            <p className="text-xl font-semibold mb-2">Color: {product.colors[0]}</p>
            <p className="text-lg mb-2">Label: {product.label}</p>
            <p className="text-2xl font-bold mb-4">
              Price: {product.price.toLocaleString()} NGN
            </p>
            <div className="flex gap-4 mb-4">
              <button
                className="bg-[#A37E2C] text-white px-4 py-2 rounded hover:bg-[#8b6824] active:bg-[#70541c] transition-colors flex items-center"
                onClick={() => handleAddToCart(product)}
              >
                <FaPlus className="mr-2" /> Add to Cart
              </button>
              <button
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 active:bg-gray-500 transition-colors flex items-center"
                onClick={() => handleAddToFavourites(product)}
              >
                <FaHeart className="mr-2" /> Add to Favourites
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 active:bg-blue-300 transition-colors flex items-center"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Product link copied to clipboard!");
                }}
              >
                <FaShareAlt className="mr-2" /> Share
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 p-4">
        <h1 className="text-2xl font-bold mb-4">You May Also Like</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.slice(0, 5).map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-full h-[300px] object-cover rounded-md cursor-pointer"
                />
              </Link>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p>Price: {item.price.toLocaleString()} NGN</p>
              <div className="w-full flex justify-end">
                <button
                  className="bg-[#135B3A] text-white px-4 py-2 mt-2 rounded hover:bg-[#8b6824] active:bg-[#70541c] transition-colors flex items-center"
                  onClick={() => handleAddToCart(item)}
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 p-4">
        <h1 className="text-2xl text-[#135B3A] font-bold mb-6 text-center">
          Services You May Like
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {servicesData.slice(0, 5).map((service) => (
            <div
              key={service.id}
              className="bg-[#f0c068] p-6 rounded-lg shadow-lg h-[200px] w-full flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <h2 className="text-xl text-[#135B3A] font-semibold mb-4">
                {service.name}
              </h2>
              <p className="text-white">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

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
              src={product.thumbnail}
              alt="Full screen product"
              className="w-full h-auto max-h-screen object-contain rounded-md"
            />
          </div>
        </div>
      )}

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
