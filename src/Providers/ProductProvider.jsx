import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { staticProducts } from "../assets/productsData";
import { API_MODE, createOrder } from "../utils/api";

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
  const [products] = useState(staticProducts);
  const [loading] = useState(false);
  const [hasMore] = useState(false);

  // Stub function to replace dynamic fetch
  const fetchProducts = async () => {
    // No-op for hardcoded data route
    return;
  };

  useEffect(() => {
    // Hardcoded products are always available synchronously
    // fetchProducts is kept around as a dummy stub just in case components call it
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
    const items = cart.map(item => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      thumbnail: item.thumbnail,
      qty: 1, // Assuming qty is 1 for now
      selectedColor: item.selectedColor || null
    }));

    const orderData = {
      items,
      customerInfo,
      paymentInfo: customerInfo.paymentInfo || {}, // Store payment info
      subtotal: getTotalPrice(),
      tax: getTotalPrice() * 0.08,
      totalPrice: getTotalPrice() * 1.08,
      status: 'pending', // You might want to change this to 'paid' if payment is successful
      createdAt: new Date().toISOString(),
    };

    try {
      let orderId;
      if (API_MODE === 'backend') {
        const response = await createOrder(orderData);
        orderId = response.orderId || response.id;
      } else {
        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "orders"), orderData);
        orderId = docRef.id;
      }

      const newOrder = { id: orderId, ...orderData };

      // Add to local order history
      setOrderHistory(prevHistory => [...prevHistory, newOrder]);

      clearCart();
      return orderId;
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product) => {
    setFavorites(prev => {
      if (prev.some(item => item.id === product.id)) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId);
  };

  return (
    <ProductContext.Provider value={{ products, cart, addToCart, removeFromCart, clearCart, checkout, getTotalPrice, orderHistory, loading, favorites, toggleFavorite, isFavorite, fetchProducts, hasMore }}>
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductProvider;
