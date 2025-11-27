
import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './AuthProvider';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); // Use the useAuth hook

  useEffect(() => {
    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const q = query(collection(db, "orders"), where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orderList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(orderList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching orders:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const getOrderById = (id) => {
    return orders.find(order => order.id === id);
  };

  // The addOrder and updateOrder functions will be handled by the backend now.
  // Components should use the checkout function from ProductContext to create new orders.

  const value = {
    orders,
    loading,
    getOrderById,
    getOrderById,
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
