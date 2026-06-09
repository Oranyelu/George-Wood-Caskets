import { useState, useContext, useMemo, useEffect } from "react";
import { ProductContext } from "../Providers/ProductProvider";
import ProductCard from "../Components/ProductCard";
import { FaFilter } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const ProductsPage = () => {
  const { products, loading, fetchProducts, hasMore } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLabel, setSelectedLabel] = useState("All");
  const [selectedMaterial, setSelectedMaterial] = useState("All");

  const maxProductPrice = useMemo(() => {
    if (products.length === 0) return 3000000;
    return Math.max(...products.map(p => p.price || 0), 3000000);
  }, [products]);

  const [priceRange, setPriceRange] = useState(3000000);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (products.length > 0) {
      setPriceRange(Math.max(...products.map(p => p.price || 0)));
    }
  }, [products]);

  // Derive unique categories and materials
  const categories = ["All", ...new Set(products.map(p => p.category).filter(Boolean))];
  const labels = ["All", ...new Set(products.map(p => p.label).filter(Boolean))];
  const materials = ["All", ...new Set(products.map(p => p.material).filter(Boolean))];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesLabel = selectedLabel === "All" || product.label === selectedLabel;
      const matchesMaterial = selectedMaterial === "All" || product.material === selectedMaterial;
      const matchesPrice = product.price <= priceRange;
      return matchesSearch && matchesCategory && matchesLabel && matchesMaterial && matchesPrice;
    });
  }, [products, searchTerm, selectedCategory, selectedLabel, selectedMaterial, priceRange]);

  return (
    <div className="pt-24 pb-12 min-h-screen transition-colors duration-300">
      <Helmet>
        <title>Our Casket Collection | George Wood Caskets</title>
        <meta name="description" content="Browse our premium selection of handcrafted solid wood and metal caskets. Designed with care and dignity to serve as a comforting final resting place." />
        <link rel="canonical" href="https://georgewoodcasket.com/products" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Our Casket Collection",
            "description": "Premium handcrafted caskets by George Wood Casket.",
            "url": "https://georgewoodcasket.com/products",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": products.map((p, idx) => ({
                "@type": "ListItem",
                "position": idx + 1,
                "url": `https://georgewoodcasket.com/product/${p.id}`,
                "name": p.name
              }))
            }
          })}
        </script>
      </Helmet>
      <div className="max-w-[1300px] mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-serif font-bold text-center text-primary dark:text-green-500 mb-8">Our Collection</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <button
            className="lg:hidden flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filters
          </button>

          {/* Sidebar Filters */}
          <aside className={`lg:w-1/4 bg-brand-card dark:bg-brand-card-dark p-6 rounded-2xl border border-[#135B3A]/10 dark:border-white/5 shadow-sm h-fit ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <h2 className="text-xl font-serif font-bold mb-4 text-primary dark:text-green-400">Filters</h2>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Search</label>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Category (Model)</label>
              <select
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Label */}
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Label (Tier)</label>
              <select
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedLabel}
                onChange={(e) => setSelectedLabel(e.target.value)}
              >
                {labels.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            {/* Material */}
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Material</label>
              <select
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
              >
                {materials.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Max Price: {priceRange.toLocaleString()} NGN</label>
              <input
                type="range"
                min="0"
                max={maxProductPrice}
                step="50000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-primary mt-2"
              />
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:w-3/4">
            {loading && products.length === 0 ? (
              <p className="text-center text-xl dark:text-gray-300">Loading products...</p>
            ) : filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {hasMore && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() => fetchProducts(true)}
                      disabled={loading}
                      className="bg-[#135B3A] hover:bg-[#0E462D] text-white px-8 py-3 rounded-xl transition-all shadow-md font-bold disabled:opacity-50"
                    >
                      {loading ? 'Loading...' : 'Load More'}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-center text-xl text-gray-500 dark:text-gray-400">No products found matching your criteria.</p>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
