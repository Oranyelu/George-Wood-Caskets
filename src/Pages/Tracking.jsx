import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../supabase";
import { FaBoxOpen, FaShippingFast, FaCheckCircle, FaClipboardList } from "react-icons/fa";
import ScrollReveal from "../Components/ScrollReveal";
import toast from 'react-hot-toast';

const OrderTracking = () => {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expediteLoading, setExpediteLoading] = useState(false);

  useEffect(() => {
    const idParam = searchParams.get("id");
    if (idParam) {
      setOrderId(idParam);
      const autoTrack = async () => {
        setLoading(true);
        setError(null);
        setOrder(null);
        try {
          const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('id', idParam.trim())
            .maybeSingle();

          if (error) throw error;

          if (data) {
            setOrder(mapOrder(data));
            toast.success("Order retrieved successfully!");
          } else {
            setError("Order not found. Please check the ID and try again.");
            toast.error("Order not found.");
          }
        } catch (err) {
          console.error("Error tracking order:", err);
          setError(`Failed to track order: ${err.message}`);
          toast.error("Error retrieving order.");
        } finally {
          setLoading(false);
        }
      };
      autoTrack();
    }
  }, [searchParams]);

  const mapOrder = (dbOrder) => {
    if (!dbOrder) return null;
    return {
      ...dbOrder,
      createdAt: dbOrder.created_at,
      totalPrice: dbOrder.total_price,
      customerInfo: dbOrder.customer_info,
      paymentInfo: dbOrder.payment_info,
      expediteRequested: dbOrder.expedite_requested
    };
  };

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId.trim())
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setOrder(mapOrder(data));
        toast.success("Order retrieved successfully!");
      } else {
        setError("Order not found. Please check the ID and try again.");
        toast.error("Order not found.");
      }
    } catch (err) {
      console.error("Error tracking order:", err);
      setError(`Failed to track order: ${err.message}`);
      toast.error("Error retrieving order.");
    } finally {
      setLoading(false);
    }
  };

  const handleExpediteRequest = async () => {
    if (!order) return;
    setExpediteLoading(true);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ expedite_requested: true })
        .eq('id', order.id);

      if (error) throw error;
      setOrder(prev => ({ ...prev, expediteRequested: true }));
      toast.success("Expedite request sent! We will prioritize your order.");
    } catch (err) {
      console.error("Error requesting expedite:", err);
      toast.error("Failed to send request. Please try again.");
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
    <div className="min-h-screen flex flex-col font-montserrat p-5 pb-20 bg-brand-cream dark:bg-primary-dark transition-colors duration-300">
      <section className="mt-[120px] max-w-3xl mx-auto bg-brand-card dark:bg-brand-card-dark p-8 rounded-2xl shadow-xl w-full border border-[#135B3A]/10 dark:border-white/5 transition-all duration-300">
        <ScrollReveal>
          <h1 className="text-3xl font-serif font-bold mb-6 text-center text-[#135B3A] dark:text-green-500">Track Your Order</h1>
          <form onSubmit={handleTrackOrder} className="flex flex-col gap-4 mb-8">
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter your Order ID"
              className="w-full p-3.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-brand-white dark:bg-[#1a2e23]/30 text-brand-black dark:text-brand-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-600 focus:border-transparent text-sm transition-all"
              required
            />
            <button
              type="submit"
              className="bg-[#135B3A] hover:bg-[#0E462D] text-white w-full h-[56px] rounded-xl disabled:bg-gray-400 font-bold transition-all shadow-md uppercase tracking-wider text-sm"
              disabled={loading}
            >
              {loading ? 'Tracking...' : 'Track Order'}
            </button>
          </form>

          {error && (
            <div className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 py-2 px-4 rounded-xl text-sm mb-4 text-center border border-red-100 dark:border-red-900/30">
              {error}
            </div>
          )}
        </ScrollReveal>

        {order && (
          <div className="animate-fade-in mt-6">
            {/* Status Progress Bar */}
            <ScrollReveal className="mb-12">
              <div className="flex justify-between mb-2 relative">
                {/* Progress Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 -z-10 transform -translate-y-1/2"></div>
                <div
                  className="absolute top-1/2 left-0 h-1 bg-[#135B3A] dark:bg-green-500 -z-10 transform -translate-y-1/2 transition-all duration-500"
                  style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                ></div>

                {['Pending', 'Processing', 'Shipped', 'Delivered'].map((step, index) => {
                  const stepNum = index + 1;
                  const isActive = currentStep >= stepNum;
                  return (
                    <div key={step} className="flex flex-col items-center bg-brand-card dark:bg-brand-card-dark px-2 transition-colors">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                        isActive 
                          ? 'bg-[#135B3A] border-[#135B3A] dark:bg-green-600 dark:border-green-600 text-white' 
                          : 'bg-brand-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-500'
                      }`}>
                        {isActive ? <FaCheckCircle size={14} /> : <span className="text-xs font-bold">{stepNum}</span>}
                      </div>
                      <span className={`text-xs mt-1.5 ${isActive ? 'font-bold text-[#135B3A] dark:text-green-500' : 'text-gray-400 dark:text-gray-500'}`}>{step}</span>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>

            {/* Animated Illustration Area */}
            <ScrollReveal className="flex flex-col items-center justify-center py-8 bg-brand-white dark:bg-gray-800/50 rounded-2xl mb-8 border border-[#135B3A]/5 dark:border-white/5 transition-all">
              {order.status === 'pending' && (
                <div className="text-center px-4">
                  <FaClipboardList className="text-5xl text-[#A37E2C] mb-4 mx-auto animate-pulse" />
                  <p className="text-lg font-serif font-bold text-[#135B3A] dark:text-green-400">Order Received</p>
                  <p className="text-sm text-brand-black/70 dark:text-gray-400 mt-1 font-light">We have received your order details and are currently preparing it.</p>
                </div>
              )}
              {order.status === 'processing' && (
                <div className="text-center px-4">
                  <FaBoxOpen className="text-5xl text-[#A37E2C] mb-4 mx-auto animate-bounce" />
                  <p className="text-lg font-serif font-bold text-[#135B3A] dark:text-green-400">Preparing & Crafting</p>
                  <p className="text-sm text-brand-black/70 dark:text-gray-400 mt-1 font-light">Our artisans are preparing your order items with exceptional care.</p>
                </div>
              )}
              {order.status === 'shipped' && (
                <div className="text-center px-4">
                  <FaShippingFast className="text-5xl text-[#135B3A] dark:text-green-500 mb-4 mx-auto animate-pulse" />
                  <p className="text-lg font-serif font-bold text-[#135B3A] dark:text-green-400">In Transit</p>
                  <p className="text-sm text-brand-black/70 dark:text-gray-400 mt-1 font-light">Your order is on its way to the delivery address.</p>
                </div>
              )}
              {order.status === 'delivered' && (
                <div className="text-center px-4">
                  <FaCheckCircle className="text-5xl text-green-600 dark:text-green-400 mb-4 mx-auto" />
                  <p className="text-lg font-serif font-bold text-green-600 dark:text-green-400">Delivered</p>
                  <p className="text-sm text-brand-black/70 dark:text-gray-400 mt-1 font-light">The order package has been successfully delivered. Thank you.</p>
                </div>
              )}
              {order.status === 'cancelled' && (
                <div className="text-center px-4">
                  <p className="text-lg font-serif font-bold text-red-600 dark:text-red-400">Order Cancelled</p>
                  <p className="text-sm text-brand-black/70 dark:text-gray-400 mt-1 font-light">This order has been cancelled. Please contact customer support.</p>
                </div>
              )}
            </ScrollReveal>

            <ScrollReveal className="p-6 border border-[#135B3A]/10 dark:border-white/5 rounded-2xl bg-brand-white dark:bg-gray-800 transition-colors">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                <h2 className="text-xl font-serif font-bold text-[#135B3A] dark:text-green-500">Order Details</h2>
                {order.status !== 'delivered' && order.status !== 'cancelled' && (
                  <button
                    onClick={handleExpediteRequest}
                    disabled={order.expediteRequested || expediteLoading}
                    className={`text-xs px-4 py-2 rounded-xl border font-bold uppercase tracking-wider transition-all ${
                      order.expediteRequested 
                        ? 'bg-gray-100 dark:bg-gray-700/50 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-700 cursor-not-allowed' 
                        : 'border-[#135B3A] text-[#135B3A] hover:bg-[#135B3A] hover:text-white dark:border-green-500 dark:text-green-500 dark:hover:bg-green-600 dark:hover:text-white'
                    }`}
                  >
                    {order.expediteRequested ? 'Expedite Requested' : 'Request Expedited Shipping'}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-brand-black dark:text-gray-200">
                <div>
                  <p className="text-gray-400 dark:text-gray-500 text-xs font-semibold uppercase tracking-wider">Order ID</p>
                  <p className="font-mono font-bold mt-0.5">{order.id}</p>
                </div>
                <div>
                  <p className="text-gray-400 dark:text-gray-500 text-xs font-semibold uppercase tracking-wider">Date Placed</p>
                  <p className="font-semibold mt-0.5">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 dark:text-gray-500 text-xs font-semibold uppercase tracking-wider">Total Amount</p>
                  <p className="font-bold text-[#135B3A] dark:text-green-400 mt-0.5">{order.totalPrice?.toLocaleString()} NGN</p>
                </div>
                <div>
                  <p className="text-gray-400 dark:text-gray-500 text-xs font-semibold uppercase tracking-wider">Current Status</p>
                  <p className="font-bold text-[#135B3A] dark:text-green-500 capitalize mt-0.5">{order.status}</p>
                </div>
              </div>

              <div className="border-t border-[#135B3A]/10 dark:border-white/5 pt-4">
                <h3 className="font-serif font-bold mb-4 text-[#135B3A] dark:text-green-500">Items in Order</h3>
                <ul className="space-y-3">
                  {order.items?.map((item, index) => (
                    <li key={index} className="flex justify-between items-center bg-brand-cream/50 dark:bg-gray-700/50 p-3.5 rounded-xl text-brand-black dark:text-gray-200 transition-colors border border-gray-150 dark:border-transparent">
                      <div className="flex items-center gap-3">
                        {item.thumbnail && <img src={item.thumbnail} alt={item.name} className="w-10 h-10 object-cover rounded-lg shadow-sm" />}
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">Qty: {item.qty}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-sm">{item.price?.toLocaleString()} NGN</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        )}
      </section>
    </div>
  );
};

export default OrderTracking;
