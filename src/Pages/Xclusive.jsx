// Xclusive.jsx

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../Providers/ProductProvider';
import toast from 'react-hot-toast';

const Xclusive = () => {
  const { products, addToCart } = useContext(ProductContext);

  // Filter products with the label "Xclusive"
  const xclusiveProducts = products.filter(product => product.label === "Xclusive");

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      style: {
        background: '#333',
        color: '#D4AF37',
        border: '1px solid #D4AF37',
      },
      iconTheme: {
        primary: '#D4AF37',
        secondary: '#333',
      },
    });
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-montserrat text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1518655048521-f130df041f66?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat bg-fixed">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 text-center px-4">
          <h2 className="text-xl md:text-2xl tracking-[0.3em] text-[#D4AF37] mb-4 uppercase">The Pinnacle of Craftsmanship</h2>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif">
            XCLUSIVE COLLECTION
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light">
            Experience the epitome of luxury and dignity. Our exclusive range is designed for those who seek nothing but the extraordinary.
          </p>
        </div>
      </div>

      {/* Products Section */}
      <section className="py-20 px-4 md:px-12 lg:px-20">
        <div className="flex flex-col items-center mb-16">
          <div className="h-1 w-20 bg-[#D4AF37] mb-6"></div>
          <h3 className="text-3xl font-serif text-white">Curated Excellence</h3>
        </div>

        {xclusiveProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
            {xclusiveProducts.map((product) => (
              <div
                key={product.slug}
                className="group relative bg-[#1a1a1a] border border-[#333] hover:border-[#D4AF37] transition-all duration-500 ease-in-out rounded-sm overflow-hidden flex flex-col"
              >
                {/* Image Container */}
                <Link to={`/product/${product.slug}`} className="block overflow-hidden relative aspect-[4/5]">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>

                  {/* Quick View / Action Overlay (Optional enhancement) */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/90 to-transparent">
                    <span className="text-sm text-[#D4AF37] uppercase tracking-wider">View Details</span>
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-6 flex flex-col flex-grow text-center">
                  <h2 className="text-xl font-serif text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-400 mb-4 uppercase tracking-widest">
                    {product.label}
                  </p>

                  <div className="mt-auto">
                    <p className="text-2xl text-[#D4AF37] font-light mb-6">
                      {product.price.toLocaleString()} <span className="text-sm align-top">NGN</span>
                    </p>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full py-3 px-6 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 uppercase tracking-widest text-sm font-semibold"
                    >
                      Acquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500 font-light">No exclusive items available at the moment.</p>
          </div>
        )}
      </section>

      {/* Footer Teaser / Brand Statement */}
      <section className="py-20 bg-[#050505] text-center px-4">
        <h3 className="text-2xl md:text-3xl font-serif text-[#D4AF37] mb-6">George Wood Caskets</h3>
        &quot;Honoring lives with the dignity and grace they deserve.&quot;
      </section>
    </div>
  );
};

export default Xclusive;
