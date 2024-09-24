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

  return (
    <div className="bg-custom-gradient min-h-screen flex flex-col font-montserrat">
      <Header />
      <section className="mt-[180px] min-h-[50vh] flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">Order Tracking</h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Enter your tracking ID"
            className="border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          />
          <button
            onClick={handleFetchOrder}
            className="ml-2 bg-blue-600 text-white rounded-lg p-2 shadow-md hover:bg-blue-700 transition duration-200"
          >
            Track Order
          </button>
        </div>

        {loading && <p className="text-blue-600">Loading...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        {currentOrder && (
          <div className="border border-gray-300 rounded-lg p-4 mt-4 shadow-lg bg-white w-full max-w-md">
            <h2 className="text-xl font-semibold mb-2">Order Status</h2>
            <p>Status: <span className="font-medium">{currentOrder.status}</span></p>
            <p>Estimated Delivery: <span className="font-medium">{currentOrder.estimatedDelivery}</span></p>
            {currentOrder.status === "Pending" && !currentOrder.expediteRequested && (
              <button
                onClick={() => handleExpediteRequest(trackingId)}
                className="mt-4 bg-yellow-500 text-white rounded-lg p-2 shadow-md hover:bg-yellow-600 transition duration-200"
              >
                Request Expedite
              </button>
            )}
            {currentOrder.expediteRequested && (
              <p className="mt-2 text-green-600">Your request to expedite this order is being processed.</p>
            )}
          </div>
        )}
        {!currentOrder && !loading && !error && (
          <p className="text-gray-600">No order information available. Please enter a tracking ID to search.</p>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default OrderTrackingPage;
