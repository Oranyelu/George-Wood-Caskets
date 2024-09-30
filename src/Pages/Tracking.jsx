import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { orderDatabase } from "../assets/Order-api"; // Import pseudo database

const OrderTrackingPage = () => {
  const [trackingId, setTrackingId] = useState('');
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchOrder = () => {
    if (!trackingId) {
      setError("Please enter a valid tracking ID");
      return;
    }

    setLoading(true);
    setError(null);

    // Simulating order fetching from the pseudo database
    setTimeout(() => {
      const order = orderDatabase[trackingId];

      if (order) {
        setCurrentOrder(order);
      } else {
        setError("Order not found");
      }

      setLoading(false);
    }, 1000); // Simulating a delay for fetching data
  };

  const handleExpediteRequest = () => {
    if (currentOrder) {
      // Simulating an order update in the pseudo database
      const updatedOrder = {
        ...currentOrder,
        expediteRequested: true,
      };

      // Updating the pseudo database manually
      orderDatabase[trackingId] = updatedOrder;
      setCurrentOrder(updatedOrder);
    }
  };

  // Function to calculate the progress percentage
  const calculateProgress = () => {
    if (!currentOrder || !currentOrder.orderDate) return 0;

    const orderDate = new Date(currentOrder.orderDate);
    const today = new Date();
    const timeDiff = today - orderDate; // Difference in milliseconds
    const daysElapsed = Math.floor(timeDiff / (1000 * 3600 * 24));
    const totalDays = 14; // Total days for the order to be ready
    const progress = Math.min((daysElapsed / totalDays) * 100, 100); // Limit to 100%

    return progress;
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
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {Math.floor(calculateProgress())}% of the time elapsed
              </p>
            </div>

            {currentOrder.status === "Pending" && !currentOrder.expediteRequested && (
              <button
                onClick={handleExpediteRequest}
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
