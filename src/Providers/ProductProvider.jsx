import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { supabase } from '../supabase';
import { staticProducts } from '../assets/productsData';
import { API_MODE, createOrder } from '../utils/api';
import { useAuth } from './AuthProvider';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const { user } = useAuth();
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

    if (user) {
      orderData.userId = user.id;
    }

    try {
      let orderId;
      if (API_MODE === 'backend') {
        const response = await createOrder(orderData);
        orderId = response.orderId || response.id;
      } else {
        // Save to Supabase orders table
        const dbOrder = {
          user_id: user ? user.id : null,
          items,
          customer_info: customerInfo,
          payment_info: customerInfo.paymentInfo || {},
          subtotal: orderData.subtotal,
          tax: orderData.tax,
          total_price: orderData.totalPrice,
          status: orderData.status,
          created_at: orderData.createdAt
        };
        
        const { data, error } = await supabase
          .from('orders')
          .insert(dbOrder)
          .select('id')
          .single();

        if (error) throw error;
        orderId = data.id;
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

  // Sync favorites with Supabase when user logs in/changes
  useEffect(() => {
    if (!user) {
      // Load favorites from local storage if guest
      const savedFavorites = localStorage.getItem('favorites');
      setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
      return;
    }

    const loadSupabaseFavorites = async () => {
      try {
        const { data, error } = await supabase
          .from('favorites')
          .select('product_details')
          .eq('user_id', user.id);
        if (error) throw error;
        if (data) {
          const dbFavorites = data.map(item => item.product_details);
          setFavorites(dbFavorites);
        }
      } catch (err) {
        console.error("Error loading favorites from Supabase:", err);
      }
    };

    loadSupabaseFavorites();
  }, [user]);

  const toggleFavorite = async (product) => {
    const isFav = favorites.some(item => item.id === product.id);
    let newFavorites;
    if (isFav) {
      newFavorites = favorites.filter(item => item.id !== product.id);
    } else {
      newFavorites = [...favorites, product];
    }
    setFavorites(newFavorites);

    if (!user) {
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return;
    }

    try {
      if (isFav) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', product.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            product_id: product.id,
            product_details: product
          });
        if (error) throw error;
      }
    } catch (err) {
      console.error("Error updating favorite in Supabase:", err);
    }
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
