// OrderProvider.jsx
import React, { createContext, useState } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);

  const addOrder = (order) => {
    setOrders([...orders, order]);
  };

  const updateOrder = (updatedOrder) => {
    setOrders(orders.map(order => order.id === updatedOrder.id ? updatedOrder : order));
    if (currentOrder && currentOrder.id === updatedOrder.id) {
      setCurrentOrder(updatedOrder);
    }
  };

  const getOrderById = (id) => {
    return orders.find(order => order.id === id);
  };

  return (
    <OrderContext.Provider value={{ orders, currentOrder, addOrder, updateOrder, getOrderById }}>
      {children}
    </OrderContext.Provider>
  );
};
