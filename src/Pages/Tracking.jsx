import { useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions();

const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const getOrderById = httpsCallable(functions, 'getOrderById');
      const result = await getOrderById({ orderId });
      setOrder(result.data);
    } catch (err) {
      console.error("Error tracking order:", err);
      setError(`Failed to track order: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-custom-gradient min-h-screen flex flex-col font-montserrat p-5">
      <section className="mt-[120px] max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-5 text-center">Track Your Order</h1>
        <form onSubmit={handleTrackOrder} className="flex flex-col gap-4">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter your Order ID"
            className="p-3 border border-gray-300 rounded-lg"
            required
          />
          <button
            type="submit"
            className="bg-[#135B3A] text-white w-full h-[56px] rounded-[5px] disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? 'Tracking...' : 'Track Order'}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {order && (
          <div className="mt-8 p-6 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p><strong>Order ID:</strong></p>
                <p>{order.id}</p>
              </div>
              <div>
                <p><strong>Status:</strong></p>
                <p className="font-semibold text-[#135B3A]">{order.orderStatus}</p>
              </div>
              <div>
                <p><strong>Date:</strong></p>
                <p>{new Date(order.createdAt.seconds * 1000).toLocaleDateString()}</p>
              </div>
              <div>
                <p><strong>Total:</strong></p>
                <p>{order.total.toLocaleString()} NGN</p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-bold mb-2">Items:</h3>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index} className="flex justify-between py-1">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>{item.price.toLocaleString()} NGN</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default OrderTracking;
