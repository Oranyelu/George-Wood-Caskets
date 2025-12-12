import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { ProductContext } from "../Providers/ProductProvider";

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(ProductContext);

    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevent navigation if clicking the button
        addToCart(product);
        alert("Added to cart!"); // Simple feedback for now
    };

    return (
        <Link to={`/product/${product.id}`} className="group block bg-[#F0B52E] rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-white/10">
            <div className="relative h-64 overflow-hidden">
                <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                {product.label && (
                    <span className="absolute top-2 left-2 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">
                        {product.label}
                    </span>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-lg font-serif font-bold text-white mb-1">{product.name}</h3>
                <p className="text-sm text-white/80 mb-2">{product.category} • {product.material}</p>
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-white">{product.price.toLocaleString()} NGN</span>
                    <button
                        onClick={handleAddToCart}
                        className="bg-primary text-white p-2 rounded-full hover:bg-secondary transition-colors"
                        title="Add to Cart"
                    >
                        <FaShoppingCart />
                    </button>
                </div>
            </div>
        </Link>
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
    }).isRequired,
};

export default ProductCard;
