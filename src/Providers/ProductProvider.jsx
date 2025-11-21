import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from './AuthProvider';
import productsData from '../assets/product-api'; // Import the hardcoded product data

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [orderHistory, setOrderHistory] = useState(() => {
    const savedHistory = localStorage.getItem('orderHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const [products, setProducts] = useState(productsData);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
  }, [orderHistory]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (product) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== product.id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkout = async (customerInfo) => {
    if (!user) {
      throw new Error("User is not authenticated. Cannot checkout.");
    }

    const token = await user.getIdToken();
    const items = cart.map(item => ({ productId: item.id, qty: 1 })); // Assuming qty is 1 for now

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ items, customerInfo }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Error placing order: ${errorBody}`);
      }

      const result = await response.json();
      
      // Add to local order history
      setOrderHistory(prevHistory => [...prevHistory, { ...result, customerInfo, date: new Date().toISOString() }]);

      clearCart();
      return result.id; // The new backend returns the order with an 'id'
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <ProductContext.Provider value={{ products, cart, addToCart, removeFromCart, clearCart, checkout, getTotalPrice, orderHistory, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductProvider;
