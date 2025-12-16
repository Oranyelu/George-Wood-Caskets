import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Services from "../assets/service-api";
import { ProductContext } from "../Providers/ProductProvider";
import { FaPlus, FaStar, FaShareAlt, FaCheck } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedColor, setSelectedColor] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { products, addToCart, toggleFavorite, isFavorite } = useContext(ProductContext);
  const { servicesData } = Services;

  useEffect(() => {
    const foundProduct = products.find((item) => item.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      // Default to the first color if available
      if (foundProduct.colors && foundProduct.colors.length > 0) {
        setSelectedColor(foundProduct.colors[0]);
      }
    }
  }, [productId, products]);

  if (!product) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const isXclusive = product.label === "Xclusive";

  const handleAddToCart = (item) => {
    addToCart({ ...item, selectedColor });
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };


  // Mock data for extended details if not present in product object
  const extendedDetails = {
    material: product.material || "Premium Hardwood / Solid Metal Construction",
    features: product.features || [
      "Velvet interior lining for superior comfort",
      "Adjustable bed mechanism",
      "Locking mechanism for security",
      "High-gloss protective finish"
    ],
    dimensions: product.dimensions || "Standard Adult Size: 84\" L x 28\" W x 23\" H",
    weight: product.weight || "200 lbs (approx)",
    story: product.story || `The ${product.name} represents the pinnacle of our craftsmanship. Designed for those who appreciate the finer details in life, this piece serves as a dignified final resting place. Every curve and finish is meticulously applied by our master artisans to ensure perfection.`
  };

  // --- XCLUSIVE VIEW ---
  if (isXclusive) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen font-montserrat text-white">
        <Helmet>
          <title>{product.name} | Exclusive Collection</title>
        </Helmet>

        {/* Hero / Story Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* Use product image as background with heavy overlay */}
            <img src={product.thumbnail} alt="" className="w-full h-full object-cover opacity-30 blur-sm scale-110" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]"></div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-full h-auto max-h-[600px] object-contain drop-shadow-2xl rounded-sm border border-[#333]"
              />
            </div>
            <div className="order-1 md:order-2 text-center md:text-left">
              <h2 className="text-[#D4AF37] tracking-[0.2em] text-sm uppercase mb-4">The Exclusive Collection</h2>
              <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-white leading-tight">{product.name}</h1>
              <div className="h-1 w-20 bg-[#D4AF37] mb-8 mx-auto md:mx-0"></div>
              <p className="text-lg text-gray-300 leading-relaxed font-light italic mb-8">
                "{extendedDetails.story}"
              </p>

              <div className="space-y-4">
                <p className="text-3xl text-[#D4AF37] font-light">
                  {product.price.toLocaleString()} <span className="text-sm">NGN</span>
                </p>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-[#D4AF37] text-black px-8 py-4 text-sm uppercase tracking-widest font-bold hover:bg-white transition-colors duration-300 w-full md:w-auto"
                >
                  Acquire This Masterpiece
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Details Grid */}
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8 border border-[#333] bg-[#111]">
              <h3 className="text-[#D4AF37] font-serif text-xl mb-4">Material</h3>
              <p className="text-gray-400">{extendedDetails.material}</p>
            </div>
            <div className="p-8 border border-[#333] bg-[#111]">
              <h3 className="text-[#D4AF37] font-serif text-xl mb-4">Craftsmanship</h3>
              <p className="text-gray-400">Hand-finished by master artisans with over 20 years of experience.</p>
            </div>
            <div className="p-8 border border-[#333] bg-[#111]">
              <h3 className="text-[#D4AF37] font-serif text-xl mb-4">Interior</h3>
              <p className="text-gray-400">Luxurious velvet interior available in multiple custom shades.</p>
            </div>
          </div>
        </section>

        {showPopup && (
          <div className="fixed bottom-10 right-10 bg-[#D4AF37] text-black px-6 py-4 rounded shadow-2xl z-50 animate-fade-in-up">
            <p className="font-bold">Added to your selection.</p>
          </div>
        )}
      </div>
    );
  }

  // --- STANDARD VIEW ---
  return (
    <div className="min-h-screen font-montserrat text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <Helmet>
        <title>{product.name} | George Wood Caskets</title>
        <meta name="description" content={product.description} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "image": [product.thumbnail],
            "description": product.description || extendedDetails.story,
            "brand": {
              "@type": "Brand",
              "name": "George Wood Casket"
            },
            "offers": {
              "@type": "Offer",
              "url": window.location.href,
              "priceCurrency": "NGN",
              "price": product.price,
              "availability": "https://schema.org/InStock",
              "itemCondition": "https://schema.org/NewCondition"
            }
          })}
        </script>
      </Helmet>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
          {/* Image Gallery */}
          <div className="flex flex-col-reverse">
            <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-full h-full object-center object-contain p-8"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">{product.name}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-[#135B3A] dark:text-green-400 font-bold">{product.price.toLocaleString()} NGN</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-gray-700 dark:text-gray-300 space-y-6">{product.description}</p>
            </div>

            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
              {/* Color Selector */}
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Color</h3>
              <div className="mt-4 flex items-center space-x-3">
                {product.colors && product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ${selectedColor === color ? 'ring ring-[#135B3A]' : ''}`}
                  >
                    <span className="sr-only">{color}</span>
                    <span
                      aria-hidden="true"
                      className="h-8 w-8 rounded-full border border-black border-opacity-10"
                      style={{ backgroundColor: color.toLowerCase() }}
                    ></span>
                  </button>
                ))}
                <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">Selected: {selectedColor}</span>
              </div>
            </div>

            <div className="mt-10 flex sm:flex-col1">
              <button
                onClick={() => handleAddToCart(product)}
                className="max-w-xs flex-1 bg-[#135B3A] border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-[#0e422b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#135B3A] sm:w-full"
              >
                <FaPlus className="mr-2" /> Add to Cart
              </button>

              <button
                onClick={() => toggleFavorite(product)}
                className={`ml-4 py-3 px-3 rounded-md flex items-center justify-center transition-colors ${isFavorite(product.id) ? 'text-[#F0B52E] bg-yellow-50' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-500'}`}
                title={isFavorite(product.id) ? "Remove from Favorites" : "Add to Favorites"}
              >
                <FaStar className="h-6 w-6 flex-shrink-0" />
                <span className="sr-only">{isFavorite(product.id) ? "Remove from favorites" : "Add to favorites"}</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied!");
                }}
                className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              >
                <FaShareAlt className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                <span className="sr-only">Share</span>
              </button>
            </div>

            {/* Tabs Section */}
            <div className="mt-12">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8">
                  {['description', 'features', 'specifications'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`${activeTab === tab
                        ? 'border-[#135B3A] text-[#135B3A]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>
              <div className="pt-6">
                {activeTab === 'description' && (
                  <div className="prose prose-sm text-gray-500 dark:text-gray-400">
                    <p>{product.description}</p>
                    <p className="mt-4">
                      Our caskets are crafted with the utmost care and respect, ensuring a dignified resting place for your loved ones.
                    </p>
                  </div>
                )}
                {activeTab === 'features' && (
                  <ul className="space-y-4">
                    {extendedDetails.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <FaCheck className="flex-shrink-0 h-5 w-5 text-green-500" />
                        <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {activeTab === 'specifications' && (
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Material</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{extendedDetails.material}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Dimensions</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{extendedDetails.dimensions}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Weight</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{extendedDetails.weight}</dd>
                    </div>
                  </dl>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products & Services (Reused from original) */}
        <section className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">You May Also Like</h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.slice(0, 4).map((item) => (
              <div key={item.id} className="group relative">
                <div className="w-full min-h-80 bg-gray-200 dark:bg-gray-700 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700 dark:text-gray-200">
                      <Link to={`/product/${item.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {item.name}
                      </Link>
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-green-400">{item.price.toLocaleString()} NGN</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {showPopup && (
        <div className="fixed bottom-5 right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-500 transform translate-y-0">
          Added to cart successfully!
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
