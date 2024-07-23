import React, { createContext, useState, useEffect } from 'react';

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

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
  }, [orderHistory]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkout = () => {
    const order = {
      id: new Date().getTime(),
      items: cart,
      date: new Date().toLocaleString(),
    };
    setOrderHistory([...orderHistory, order]);
    clearCart();
  };

  return (
    <ProductContext.Provider value={{ cart, addToCart, checkout, orderHistory }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
