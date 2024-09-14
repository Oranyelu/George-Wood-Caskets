import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const OrderTrackingPage = () => {
  const [trackingId, setTrackingId] = useState('');
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchOrder = async () => {
    if (!trackingId) {
      setError("Please enter a valid tracking ID");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://george-wood-backend.vercel.app/api/order-status/${trackingId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch order status");
      }

      const data = await response.json();
      if (data) {
        setCurrentOrder(data);
      } else {
        setError("Order not found");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-custom-gradient min-h-screen flex flex-col font-montserrat">
      <Header />
      <section className="mt-[180px] min-h-[50vh] flex flex-col justify-center items-center">
        <h1 className="">Order Tracking</h1>
        <input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Enter your tracking ID"
          className="border p-2"
        />
        <button onClick={handleFetchOrder} className="ml-2 bg-blue-500 text-white p-2">
          Track Order
        </button>

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {currentOrder && (
          <div>
            <p>Status: {currentOrder.status}</p>
            <p>Estimated Delivery: {currentOrder.estimatedDelivery}</p>
            {currentOrder.status === "Pending" &&
              !currentOrder.expediteRequested && (
                <button onClick={() => handleExpediteRequest(trackingId)}>Request Expedite</button>
              )}
            {currentOrder.expediteRequested && (
              <p>Your request to expedite this order is being processed.</p>
            )}
          </div>
        )}
        {!currentOrder && !loading && !error && (
          <p>No order information available. Please enter a tracking ID to search.</p>
        )}
      </section>
      <Footer />
    </div>
  );
};

const handleExpediteRequest = async (trackingId) => {
  try {
    const updatedOrder = { expediteRequested: true };
    const response = await fetch(
      `https://george-wood-backend.vercel.app/api/update-order/${trackingId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedOrder),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update order");
    }

    const data = await response.json();
    setCurrentOrder((prevOrder) => ({
      ...prevOrder,
      expediteRequested: true,
    }));
  } catch (err) {
    setError(err.message);
  }
};

export default OrderTrackingPage;
