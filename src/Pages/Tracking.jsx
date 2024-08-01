// OrderTrackingPage.jsx
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { OrderContext } from "../OrderProvider";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import {Link} from "react-router-dom"
const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const { currentOrder, getOrderById, updateOrder } = useContext(OrderContext);

  useEffect(() => {
    const order = getOrderById(parseInt(orderId));
    if (order) {
      updateOrder(order);
    }
  }, [orderId, getOrderById, updateOrder]);

  if (!currentOrder)
    return (
      <div className="">
        <div>
          <Header />
        </div>
        <div className="mt-[180px] min-h-[50vh]">
          <h1>This page is still under construction. <Link to="/" className="text-[#A37E2C]">Go to Homepage</Link></h1>
        </div>
        
        <div>
          <Footer />
        </div>
      </div>
    );

  const handleExpediteRequest = () => {
    // Logic to request expedite (e.g., update status in the database)
    const updatedOrder = { ...currentOrder, expediteRequested: true };
    updateOrder(updatedOrder);
  };

  return (
    <div>
      <section>
        <Header />{" "}
      </section>

      <section>
        <h1>Order Tracking</h1>
        <p>Status: {currentOrder.status}</p>
        <p>Estimated Delivery: {currentOrder.estimatedDelivery}</p>
        {currentOrder.status === "Pending" &&
          !currentOrder.expediteRequested && (
            <button onClick={handleExpediteRequest}>Request Expedite</button>
          )}
        {currentOrder.expediteRequested && (
          <p>Your request to expedite this order is being processed.</p>
        )}
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default OrderTrackingPage;
