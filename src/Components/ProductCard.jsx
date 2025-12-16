import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { FaShoppingCart, FaStar } from "react-icons/fa";
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
        <div className="bg-[#F0B52E] p-4 rounded-lg shadow-lg flex flex-col transition-transform hover:scale-105 duration-300 relative group">
            {/* Favorite Button */}
            <button
                onClick={handleToggleFavorite}
                className={`absolute top-2 right-2 p-2 rounded-full transition-colors z-10 ${isFavorite(product.id) ? 'text-[#135B3A]' : 'text-[#011309]/20 hover:text-[#135B3A]'}`}
                title={isFavorite(product.id) ? "Remove from Favorites" : "Add to Favorites"}
            >
                <FaStar className="w-6 h-6 drop-shadow-sm" />
            </button>

            {/* Label */}
            {product.label && (
                <span className="absolute top-2 left-2 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm z-10">
                    {product.label}
                </span>
            )}

            <Link
                to={`/product/${product.id}`}
                className="overflow-hidden rounded-md"
            >
                <img
                    src={mainImage}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md"
                    loading="lazy"
                />
            </Link>

            <div className="mt-3 flex flex-col flex-1">
                <Link to={`/product/${product.id}`}>
                    <h1 className="text-lg font-semibold text-[#011309] hover:text-[#135B3A] transition-colors">
                        {product.name}
                    </h1>
                </Link>
                <p className="text-[#011309] font-medium mt-1">
                    Price: {product.price.toLocaleString()} NGN
                </p>
                <p className="text-[#011309]/80 mt-1">
                    Color: {product.colors?.join(', ') || 'N/A'}
                </p>
            </div>

            <div className="mt-4 flex justify-center">
                <button
                    className="bg-[#135B3A] text-white px-4 py-2 rounded w-full hover:bg-[#0E462D] transition-colors font-bold"
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
        price: PropTypes.number.isRequired,
        category: PropTypes.string,
        material: PropTypes.string,
        label: PropTypes.string,
        colors: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
};

export default ProductCard;
