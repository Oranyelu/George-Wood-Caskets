// OrderTrackingPage.jsx
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { OrderContext } from '../OrderProvider';

const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const { currentOrder, getOrderById, updateOrder } = useContext(OrderContext);

  useEffect(() => {
    const order = getOrderById(parseInt(orderId));
    if (order) {
      updateOrder(order);
    }
  }, [orderId, getOrderById, updateOrder]);

  if (!currentOrder) return <div>Loading...</div>;

  const handleExpediteRequest = () => {
    // Logic to request expedite (e.g., update status in the database)
    const updatedOrder = { ...currentOrder, expediteRequested: true };
    updateOrder(updatedOrder);
  };

  return (
    <div>
      <h1>Order Tracking</h1>
      <p>Status: {currentOrder.status}</p>
      <p>Estimated Delivery: {currentOrder.estimatedDelivery}</p>
      {currentOrder.status === 'Pending' && !currentOrder.expediteRequested && (
        <button onClick={handleExpediteRequest}>Request Expedite</button>
      )}
      {currentOrder.expediteRequested && (
        <p>Your request to expedite this order is being processed.</p>
      )}
    </div>
  );
};

export default OrderTrackingPage;
