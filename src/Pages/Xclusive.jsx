// Xclusive.jsx

import { Link } from 'react-router-dom';
import Products from '../assets/product-api'; // Importing the product data

const Xclusive = () => {
  const { productsData } = Products;

  // Filter products with the label "Xclusive"
  const xclusiveProducts = productsData.filter(product => product.label === "Xclusive");

  // Simple addToCart implementation that stores items in localStorage and shows basic feedback
  const addToCart = (product) => {
    try {
      const existing = JSON.parse(localStorage.getItem('cart') || '[]');
      existing.push(product);
      localStorage.setItem('cart', JSON.stringify(existing));
      // Basic user feedback; replace with a toast/snackbar in a real app
      alert(`${product.name} added to cart`);
    } catch (e) {
      // Fallback for environments without localStorage or parse errors
      console.error('Failed to add to cart', e);
    }
  };

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
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <Link to={`/product/${product.id}`}>
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
                  <h3>Description: {product.description}</h3>
                  <p>Color: {product.color}</p>
                  <p>{product.price} NGN</p>
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
