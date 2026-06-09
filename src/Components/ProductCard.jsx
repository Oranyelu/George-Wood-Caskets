import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { FaStar } from "react-icons/fa";
import { useContext } from "react";
import { ProductContext } from "../Providers/ProductProvider";

const ProductCard = ({ product }) => {
    const { addToCart, toggleFavorite, isFavorite } = useContext(ProductContext);

    const handleToggleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(product);
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        // Alert handled by context or component (Home uses notification state, we can use simple alert or rely on parent feedback if needed, but Home has local state notification. We'll stick to simple alert or nothing for now to match Home's visual style primarily)
        // Actually Home.jsx sets a notification state. ProductCard doesn't have access to Home's state. 
        // We'll leave the feedback side-effect simple or assume a global toast later. For now, simple alert or nothing.
        // The original Home code did: addToCart(item); setNotification(...)
        // The original ProductCard code did: addToCart(product); alert("Added to cart!");
        alert("Added to cart!");
    };

    // Robust image fallback
    const mainImage = product.thumbnail || product.image || (product.images && product.images.length > 0 ? product.images[0] : null) || "https://placehold.co/600x400?text=No+Image";

    return (
        <div className="bg-brand-card dark:bg-brand-card-dark p-5 rounded-2xl shadow-md border border-[#135B3A]/10 dark:border-white/5 flex flex-col transition-all duration-300 hover:scale-102 hover:shadow-xl relative group">
            {/* Favorite Button */}
            <button
                onClick={handleToggleFavorite}
                className={`absolute top-3 right-3 p-2 rounded-full transition-colors z-10 ${isFavorite(product.id) ? 'text-secondary-gold dark:text-yellow-400' : 'text-brand-black/20 dark:text-brand-white/20 hover:text-[#135B3A] dark:hover:text-green-400'}`}
                title={isFavorite(product.id) ? "Remove from Favorites" : "Add to Favorites"}
            >
                <FaStar className="w-6 h-6 drop-shadow-sm" />
            </button>

            {/* Label */}
            {product.label && (
                <span className="absolute top-3 left-3 bg-[#135B3A]/90 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm z-10 shadow-sm">
                    {product.label}
                </span>
            )}

            <Link
                to={`/product/${product.id}`}
                className="overflow-hidden rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
            >
                <img
                    src={mainImage}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
            </Link>

            <div className="mt-4 flex flex-col flex-1">
                <Link to={`/product/${product.id}`}>
                    <h1 className="text-lg font-serif font-bold text-brand-black dark:text-brand-white hover:text-[#135B3A] dark:hover:text-green-400 transition-colors">
                        {product.name}
                    </h1>
                </Link>
                <p className="text-brand-black dark:text-brand-white font-medium mt-1">
                    Price: {product.price.toLocaleString()} NGN
                </p>
                <p className="text-brand-black/80 dark:text-brand-white/80 text-sm mt-1">
                    Color: {product.colors?.join(', ') || 'N/A'}
                </p>
            </div>

            <div className="mt-5 flex justify-center">
                <button
                    className="bg-[#135B3A] hover:bg-[#0E462D] dark:bg-[#135B3A] dark:hover:bg-[#1E7C52] text-white px-4 py-2.5 rounded-xl w-full transition-colors font-bold shadow-md hover:shadow-lg"
                    onClick={handleAddToCart}
                >
                    Order Now
                </button>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired,
        image: PropTypes.string,
        images: PropTypes.arrayOf(PropTypes.string),
        price: PropTypes.number.isRequired,
        category: PropTypes.string,
        material: PropTypes.string,
        label: PropTypes.string,
        colors: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
};

export default ProductCard;
