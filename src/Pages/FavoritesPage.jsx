import { useContext } from "react";
import { ProductContext } from "../Providers/ProductProvider";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const FavoritesPage = () => {
    const { favorites, toggleFavorite } = useContext(ProductContext);

    return (
        <div className="min-h-screen pt-24 pb-12 font-montserrat transition-colors duration-300">
            <div className="max-w-[1300px] mx-auto px-4 md:px-8">
                <h1 className="text-3xl font-bold text-[#135B3A] dark:text-green-500 mb-8 flex items-center gap-2">
                    <FaStar className="text-[#F0B52E]" /> Your Favorites
                </h1>

                {favorites.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow">
                        <h2 className="text-xl text-gray-600 dark:text-gray-300 mb-4">No favorites yet!</h2>
                        <Link to="/products">
                            <button className="bg-[#A37E2C] text-white px-6 py-2 rounded hover:bg-[#8e6d25] transition-colors">
                                Browse Products
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {favorites.map((product) => (
                            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow relative group border border-gray-100 dark:border-gray-700">
                                <button
                                    onClick={() => toggleFavorite(product)}
                                    className="absolute top-2 right-2 z-10 bg-white/80 p-2 rounded-full text-[#F0B52E] hover:bg-white transition-colors shadow-sm"
                                    title="Remove from Favorites"
                                >
                                    <FaStar />
                                </button>
                                <Link to={`/product/${product.id}`}>
                                    <div className="h-64 overflow-hidden bg-gray-100 dark:bg-gray-700">
                                        <img
                                            src={product.thumbnail}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">{product.name}</h3>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;
