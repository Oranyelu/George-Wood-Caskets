
import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './AuthProvider';
import { supabase } from '../supabase';

export const OrderContext = createContext();

export const mapOrderFromDB = (dbOrder) => {
  if (!dbOrder) return null;
  return {
    ...dbOrder,
    userId: dbOrder.user_id,
    customerInfo: dbOrder.customer_info,
    paymentInfo: dbOrder.payment_info,
    totalPrice: dbOrder.total_price,
    createdAt: dbOrder.created_at,
  };
};

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

    const fetchUserOrders = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders((data || []).map(mapOrderFromDB));
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();

    // Listen for real-time changes to the orders table for this user
    const channel = supabase
      .channel(`user-orders-${user.id}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'orders',
        filter: `user_id=eq.${user.id}`
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setOrders(prev => [mapOrderFromDB(payload.new), ...prev]);
        } else if (payload.eventType === 'DELETE') {
          setOrders(prev => prev.filter(order => order.id !== payload.old.id));
        } else if (payload.eventType === 'UPDATE') {
          setOrders(prev => prev.map(order => order.id === payload.new.id ? mapOrderFromDB(payload.new) : order));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const getOrderById = (id) => {
    return orders.find(order => order.id === id);
  };

  const value = {
    orders,
    loading,
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
