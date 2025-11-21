import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../Providers/ProductProvider";

const ProductsPage = () => {
  const { products, loading } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen flex flex-col font-montserrat mt-20 mb-10">
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-[#A37E2C] mb-8">All Products</h1>
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full max-w-lg p-2 border border-gray-300 rounded-md"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-full h-[300px] object-cover rounded-md"
                />
              </Link>
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-700">{product.colors[0]}</p>
              <p className="text-gray-900 font-bold">{product.price.toLocaleString()} NGN</p>
            </div>
          ))}
        </div>
        {loading && <p className="text-center">Loading more products...</p>}
      </div>
    </div>
  );
};

export default ProductsPage;
