import { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FaBoxOpen, FaShippingFast, FaCheckCircle, FaClipboardList } from "react-icons/fa";

const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expediteLoading, setExpediteLoading] = useState(false);

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const docRef = doc(db, "orders", orderId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setOrder({ id: docSnap.id, ...docSnap.data() });
      } else {
        setError("Order not found. Please check the ID and try again.");
      }
    } catch (err) {
      console.error("Error tracking order:", err);
      setError(`Failed to track order: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleExpediteRequest = async () => {
    if (!order) return;
    setExpediteLoading(true);
    try {
      const orderRef = doc(db, "orders", order.id);
      await updateDoc(orderRef, {
        expediteRequested: true
      });
      setOrder(prev => ({ ...prev, expediteRequested: true }));
      alert("Expedite request sent! We will prioritize your order.");
    } catch (err) {
      console.error("Error requesting expedite:", err);
      alert("Failed to send request. Please try again.");
    } finally {
      setExpediteLoading(false);
    }
  };

  const getStatusStep = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 1;
      case 'processing': return 2;
      case 'shipped': return 3;
      case 'delivered': return 4;
      default: return 0;
    }
  };

  const currentStep = getStatusStep(order?.status);

  return (
    <div className="bg-custom-gradient min-h-screen flex flex-col font-montserrat p-5">
      <section className="mt-[120px] max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md w-full">
        <h1 className="text-2xl font-bold mb-5 text-center">Track Your Order</h1>
        <form onSubmit={handleTrackOrder} className="flex flex-col gap-4 mb-8">
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
            className="bg-[#135B3A] text-white w-full h-[56px] rounded-[5px] disabled:bg-gray-400 font-bold hover:bg-[#0e462d] transition-colors"
            disabled={loading}
          >
            {loading ? 'Tracking...' : 'Track Order'}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {order && (
          <div className="animate-fade-in">
            {/* Status Progress Bar */}
            <div className="mb-10">
              <div className="flex justify-between mb-2 relative">
                {/* Progress Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
                <div
                  className="absolute top-1/2 left-0 h-1 bg-[#135B3A] -z-10 transform -translate-y-1/2 transition-all duration-500"
                  style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                ></div>

                {['Pending', 'Processing', 'Shipped', 'Delivered'].map((step, index) => {
                  const stepNum = index + 1;
                  const isActive = currentStep >= stepNum;
                  return (
                    <div key={step} className="flex flex-col items-center bg-white px-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${isActive ? 'bg-[#135B3A] border-[#135B3A] text-white' : 'bg-white border-gray-300 text-gray-300'}`}>
                        {isActive ? <FaCheckCircle /> : stepNum}
                      </div>
                      <span className={`text-xs mt-1 ${isActive ? 'font-bold text-[#135B3A]' : 'text-gray-400'}`}>{step}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Animated Illustration Area */}
            <div className="flex flex-col items-center justify-center py-8 bg-gray-50 rounded-lg mb-8">
              {order.status === 'pending' && (
                <div className="text-center">
                  <FaClipboardList className="text-6xl text-gray-400 mb-4 mx-auto animate-pulse" />
                  <p className="text-lg font-medium text-gray-600">Order Received</p>
                  <p className="text-sm text-gray-500">We have received your order and are reviewing it.</p>
                </div>
              )}
              {order.status === 'processing' && (
                <div className="text-center">
                  <FaBoxOpen className="text-6xl text-[#e4c88a] mb-4 mx-auto animate-bounce" />
                  <p className="text-lg font-medium text-[#135B3A]">Packing Your Order</p>
                  <p className="text-sm text-gray-500">Your items are being carefully prepared.</p>
                </div>
              )}
              {order.status === 'shipped' && (
                <div className="text-center">
                  <FaShippingFast className="text-6xl text-[#135B3A] mb-4 mx-auto animate-pulse" />
                  <p className="text-lg font-medium text-[#135B3A]">On The Way</p>
                  <p className="text-sm text-gray-500">Your package is in transit to your destination.</p>
                </div>
              )}
              {order.status === 'delivered' && (
                <div className="text-center">
                  <FaCheckCircle className="text-6xl text-green-600 mb-4 mx-auto" />
                  <p className="text-lg font-medium text-green-600">Delivered</p>
                  <p className="text-sm text-gray-500">Package has been delivered successfully.</p>
                </div>
              )}
              {order.status === 'cancelled' && (
                <div className="text-center">
                  <p className="text-lg font-medium text-red-600">Order Cancelled</p>
                </div>
              )}
            </div>

            <div className="p-6 border border-gray-200 rounded-lg bg-white">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold">Order Details</h2>
                {order.status !== 'delivered' && order.status !== 'cancelled' && (
                  <button
                    onClick={handleExpediteRequest}
                    disabled={order.expediteRequested || expediteLoading}
                    className={`text-sm px-4 py-2 rounded border ${order.expediteRequested ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'border-[#135B3A] text-[#135B3A] hover:bg-[#135B3A] hover:text-white'}`}
                  >
                    {order.expediteRequested ? 'Expedite Requested' : 'Request Expedited Shipping'}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-gray-500 text-sm">Order ID</p>
                  <p className="font-mono font-medium">{order.id}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Date Placed</p>
                  <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Amount</p>
                  <p className="font-medium text-lg">{order.totalPrice?.toLocaleString()} NGN</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Current Status</p>
                  <p className="font-bold text-[#135B3A] capitalize">{order.status}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-bold mb-3">Items in Order</h3>
                <ul className="space-y-3">
                  {order.items?.map((item, index) => (
                    <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                      <div className="flex items-center gap-3">
                        {item.thumbnail && <img src={item.thumbnail} alt={item.name} className="w-10 h-10 object-cover rounded" />}
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                        </div>
                      </div>
                      <span className="font-medium">{item.price?.toLocaleString()} NGN</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default OrderTracking;
