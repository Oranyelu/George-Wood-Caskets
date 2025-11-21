
import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './AuthProvider'; // Import useAuth

export const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); // Use the useAuth hook

  const fetchOrders = useCallback(async () => {
    if (!user) {
      setOrders([]);
      return;
    }

    setLoading(true);
    try {
      const token = await user.getIdToken();
      const response = await fetch(`/api/orders/${user.uid}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const orderList = await response.json();
      setOrders(orderList);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const getOrderById = (id) => {
    return orders.find(order => order.id === id);
  };

  // The addOrder and updateOrder functions will be handled by the backend now.
  // Components should use the checkout function from ProductContext to create new orders.

  const value = {
    orders,
    loading,
    getOrderById,
    refetchOrders: fetchOrders, // Expose a function to manually refetch orders
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

OrderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default OrderProvider;
