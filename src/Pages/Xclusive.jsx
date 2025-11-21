// Xclusive.jsx

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../Providers/ProductProvider';

const Xclusive = () => {
  const { products, addToCart } = useContext(ProductContext);

  // Filter products with the label "Xclusive"
  const xclusiveProducts = products.filter(product => product.label === "Xclusive");

  const handleAddToCart = (product) => {
      addToCart(product);
      alert(`${product.name} added to cart`);
  }

  return (
    <div className="min-h-screen bg-white font-montserrat">

      <div className="h-[80px]"></div>
      <section className="products-section pt-[40px] pb-5">
        <header className="flex flex-col items-center">
          <h2 className="text-[31px] text-white">Exclusive Collection</h2>
          <h1 className="text-[50px] text-[#A37E2C] font-bold">
            XCLUSIVE PRODUCTS
          </h1>
          <p className="text-[19px] text-gray-50">
            Discover our exclusive range...
          </p>
        </header>
        <div className='pt-10'>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {xclusiveProducts.map((product) => (
              <div
                key={product.slug}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <Link to={`/product/${product.slug}`}>
                  <img
                    src={product.thumbnail}
                    alt="product img"
                    className="w-full h-[300px] object-cover rounded-md"
                  />
                </Link>
                <div>
                  <h1 className="text-[#011309] font-semibold text-lg">
                    {product.name}
                  </h1>
                  <h2 className="text-[#135B3A]">{product.label}</h2>
                  <p className="text-gray-600 mt-1">
                    Color: {product.colors[0]}
                  </p>
                  <p className="text-[#135B3A] font-medium mt-1">
                    {product.price.toLocaleString()} NGN
                  </p>
                  <button
                    className="bg-[#A37E2C] text-white px-4 py-2 rounded mt-2 hover:bg-[#8b6824] active:bg-[#70541c] transition-colors"
                    onClick={() => handleAddToCart(product)}
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
