import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

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

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching products:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
    const items = cart.map(item => ({ productId: item.id, qty: 1 })); // Assuming qty is 1 for now

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
