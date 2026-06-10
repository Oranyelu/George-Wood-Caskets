import { useContext, useState } from "react";
import { usePaystackPayment } from 'react-paystack';
import { ProductContext } from "../Providers/ProductProvider";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi"; // right-pointing arrow
import { sendOrderEmail } from "../utils/api";
import toast from 'react-hot-toast';
import ScrollReveal from "../Components/ScrollReveal";

const Checkout = () => {
  const { cart, removeFromCart, getTotalPrice, checkout } = useContext(ProductContext);
  const totalPrice = getTotalPrice();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    referredBy: "",
  });

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("paystack"); // paystack, bank_transfer, call_to_order

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const config = {
    reference: (new Date()).getTime().toString(),
    email: formData.email || "guest@georgewoodcaskets.com",
    amount: Math.round(totalPrice * 1.08 * 100), // Paystack expects amount in kobo, incl. 8% VAT
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    firstname: formData.firstName,
    lastname: formData.lastName,
    phone: formData.phone || "0000000000",
  };

  const onSuccess = async (reference) => {
    try {
      const orderDataWithPayment = {
        ...formData,
        paymentInfo: {
          reference: reference.reference || reference,
          status: "paid",
          method: "paystack"
        }
      };
      
      // Implement a 15-second Promise timeout to prevent infinite database hangs
      const checkoutPromise = checkout(orderDataWithPayment);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Order processing timed out. Your payment was confirmed. Please contact support with reference: " + (reference.reference || reference))), 15000)
      );

      const orderId = await Promise.race([checkoutPromise, timeoutPromise]);
      
      setTrackingId(orderId);
      setOrderSuccess(true);
      toast.success("Order Placed Successfully!");

      // Send Email Notification in the background (non-blocking)
      sendOrderEmail({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email || "guest@georgewoodcaskets.com",
        phone: formData.phone || "0000000000",
        cart: cart,
        totalPrice: totalPrice,
        trackingId: orderId,
        referral: formData.referredBy
      }).catch(emailErr => {
        console.error("Background email notification failed:", emailErr);
      });

    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(`There was an error placing your order: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onClose = () => {
    setIsSubmitting(false);
    toast.error("Payment cancelled.");
  };

  const initializePayment = usePaystackPayment(config);

  const handleCompleteOrder = async () => {
    if (isSubmitting) return;

    // Only First Name, Last Name, and Delivery Address are compulsory
    if (!formData.firstName || !formData.lastName || !formData.address) {
      toast.error("Please fill in the required fields: First Name, Last Name, and Delivery Address.");
      return;
    }

    setIsSubmitting(true);

    if (paymentMethod === 'paystack') {
      initializePayment(onSuccess, onClose);
    } else {
      try {
        const orderData = {
          ...formData,
          paymentInfo: {
            method: paymentMethod,
            status: "pending",
            reference: `offline_${Date.now()}`
          }
        };

        // Implement a 15-second Promise timeout to prevent infinite database hangs
        const checkoutPromise = checkout(orderData);
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Order processing timed out. Please check your network connection and try again.")), 15000)
        );

        const orderId = await Promise.race([checkoutPromise, timeoutPromise]);
        
        setTrackingId(orderId);
        setOrderSuccess(true);
        toast.success("Order Placed Successfully!");

        // Send Email Notification in the background
        sendOrderEmail({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email || "guest@georgewoodcaskets.com",
          phone: formData.phone || "0000000000",
          cart: cart,
          totalPrice: totalPrice,
          trackingId: orderId,
          referral: formData.referredBy
        }).catch(emailErr => {
          console.error("Background email notification failed:", emailErr);
        });

      } catch (error) {
        console.error("Error placing order:", error);
        toast.error(`There was an error placing your order: ${error.message}`);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-montserrat pt-24 pb-12 bg-brand-cream dark:bg-primary-dark transition-colors duration-300">
      <div className="max-w-[1300px] mx-auto w-full px-4 md:px-8">

        {/* Breadcrumb */}
        <ScrollReveal>
          <nav className="flex items-center text-[#135B3A] dark:text-green-500 gap-2 mb-8 text-sm md:text-base">
            <Link to="/" className="hover:underline">Home</Link>
            <FiChevronRight className="inline" />
            <Link to="/products" className="hover:underline">Products</Link>
            <FiChevronRight className="inline" />
            <Link to="/cart" className="hover:underline">Shopping Cart</Link>
            <FiChevronRight className="inline" />
            <span className="text-[#A37E2C] font-bold">Checkout</span>
          </nav>
        </ScrollReveal>

        <section className="flex flex-col lg:flex-row gap-8">
          {!orderSuccess ? (
            <>
              {/* Order Items */}
              <main className="bg-brand-card dark:bg-brand-card-dark p-6 rounded-2xl shadow-md flex-grow flex-1 border border-[#135B3A]/10 dark:border-white/5 transition-colors duration-300">
                <ScrollReveal>
                  <h1 className="text-2xl font-serif font-bold mb-6 text-[#135B3A] dark:text-green-500">Review your Order</h1>
                  <div className="bg-[#135B3A] text-white flex justify-between py-3.5 px-6 rounded-xl mb-4 hidden md:flex font-semibold text-sm">
                    <p className="w-1/2">Item</p>
                    <p className="w-1/2 text-right">Price</p>
                  </div>
                  <ul className="space-y-4">
                    {cart.map((item, index) => (
                      <li key={index} className="flex justify-between items-center border-b border-[#135B3A]/10 dark:border-white/5 pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center">
                          <img
                            src={item.thumbnail}
                            alt={item.name}
                            className="w-12 h-12 mr-4 object-cover rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50"
                          />
                          <div>
                            <p className="font-medium text-brand-black dark:text-brand-white">{item.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-semibold text-brand-black/90 dark:text-gray-200">{item.price.toLocaleString()} NGN</p>
                          <button
                            onClick={() => removeFromCart(item)}
                            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 px-2.5 py-1 rounded-xl transition-colors font-medium text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 space-y-3 text-brand-black/90 dark:text-gray-300 text-sm">
                    <div className="flex justify-between text-base">
                      <p>Subtotal:</p>
                      <p className="font-semibold">{totalPrice.toLocaleString()} NGN</p>
                    </div>
                    <div className="flex justify-between text-base">
                      <p>VAT (8%):</p>
                      <p className="font-semibold">{(totalPrice * 0.08).toLocaleString()} NGN</p>
                    </div>
                    <div className="flex justify-between mt-4 pt-4 border-t border-[#135B3A]/10 dark:border-white/5 text-lg font-bold text-brand-black dark:text-brand-white">
                      <p>Total Price:</p>
                      <p className="text-[#135B3A] dark:text-green-400">{(totalPrice * 1.08).toLocaleString()} NGN</p>
                    </div>
                  </div>
                </ScrollReveal>
              </main>

              {/* Checkout Form */}
              <aside className="lg:w-1/3 bg-brand-card dark:bg-brand-card-dark p-6 rounded-2xl shadow-md h-fit border border-[#135B3A]/10 dark:border-white/5 transition-colors duration-300">
                <ScrollReveal>
                  <h2 className="text-2xl font-serif font-bold mb-6 text-[#135B3A] dark:text-green-500">Shipping Details</h2>
                  <form className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-brand-black/85 dark:text-gray-300">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-brand-white dark:bg-[#1a2e23]/30 text-brand-black dark:text-brand-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-600 focus:border-transparent text-sm transition-all"
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-brand-black/85 dark:text-gray-300">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-brand-white dark:bg-[#1a2e23]/30 text-brand-black dark:text-brand-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-600 focus:border-transparent text-sm transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-brand-black/85 dark:text-gray-300">Email Address <span className="text-gray-400 font-normal">(Optional)</span></label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-brand-white dark:bg-[#1a2e23]/30 text-brand-black dark:text-brand-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-600 focus:border-transparent text-sm transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-brand-black/85 dark:text-gray-300">Phone Number <span className="text-gray-400 font-normal">(Optional)</span></label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-brand-white dark:bg-[#1a2e23]/30 text-brand-black dark:text-brand-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-600 focus:border-transparent text-sm transition-all"
                      />
                    </div>

                    {/* Delivery Address Section */}
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-brand-black/85 dark:text-gray-300">Delivery Address</label>
                      <input
                        type="text"
                        name="address"
                        placeholder="Street Address"
                        value={formData.address || ''}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-brand-white dark:bg-[#1a2e23]/30 text-brand-black dark:text-brand-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-600 focus:border-transparent text-sm transition-all"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-brand-black/85 dark:text-gray-300">City <span className="text-gray-400 font-normal">(Optional)</span></label>
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          value={formData.city || ''}
                          onChange={handleInputChange}
                          className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-brand-white dark:bg-[#1a2e23]/30 text-brand-black dark:text-brand-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-600 focus:border-transparent text-sm transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-brand-black/85 dark:text-gray-300">State <span className="text-gray-400 font-normal">(Optional)</span></label>
                        <input
                          type="text"
                          name="state"
                          placeholder="State"
                          value={formData.state || ''}
                          onChange={handleInputChange}
                          className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-brand-white dark:bg-[#1a2e23]/30 text-brand-black dark:text-brand-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-600 focus:border-transparent text-sm transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-brand-black/85 dark:text-gray-300">How did you hear about Us <span className="text-gray-400 font-normal">(Optional)</span></label>
                      <input
                        type="text"
                        name="referredBy"
                        value={formData.referredBy}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-brand-white dark:bg-[#1a2e23]/30 text-brand-black dark:text-brand-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-600 focus:border-transparent text-sm transition-all"
                      />
                    </div>

                    {/* Payment Method Selector */}
                    <div className="flex flex-col gap-2 mt-4">
                      <label className="text-xs font-bold text-brand-black/85 dark:text-gray-300 uppercase tracking-wider">Select Payment Method</label>
                      <div className="grid grid-cols-1 gap-2">
                        <label className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'paystack' ? 'border-[#135B3A] bg-[#135B3A]/5' : 'border-[#135B3A]/10 dark:border-gray-700'}`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="paystack"
                            checked={paymentMethod === 'paystack'}
                            onChange={() => setPaymentMethod('paystack')}
                            className="accent-[#135B3A]"
                          />
                          <div>
                            <p className="font-bold text-[#135B3A] dark:text-green-500 text-sm">Pay Online (Paystack)</p>
                            <p className="text-xs text-brand-black/60 dark:text-gray-400 font-light">Pay securely with card, bank transfer, or USSD.</p>
                          </div>
                        </label>

                        <label className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'bank_transfer' ? 'border-[#135B3A] bg-[#135B3A]/5' : 'border-[#135B3A]/10 dark:border-gray-700'}`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="bank_transfer"
                            checked={paymentMethod === 'bank_transfer'}
                            onChange={() => setPaymentMethod('bank_transfer')}
                            className="accent-[#135B3A]"
                          />
                          <div>
                            <p className="font-bold text-[#135B3A] dark:text-green-500 text-sm">Bank Transfer / Cash Deposit</p>
                            <p className="text-xs text-brand-black/60 dark:text-gray-400 font-light">Transfer directly to our corporate bank account.</p>
                          </div>
                        </label>

                        <label className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'call_to_order' ? 'border-[#135B3A] bg-[#135B3A]/5' : 'border-[#135B3A]/10 dark:border-gray-700'}`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="call_to_order"
                            checked={paymentMethod === 'call_to_order'}
                            onChange={() => setPaymentMethod('call_to_order')}
                            className="accent-[#135B3A]"
                          />
                          <div>
                            <p className="font-bold text-[#135B3A] dark:text-green-500 text-sm">Request a Call to Order</p>
                            <p className="text-xs text-brand-black/60 dark:text-gray-400 font-light">We will call you on your phone number to finalize your order.</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    {paymentMethod === 'bank_transfer' && (
                      <div className="mt-4 p-4 bg-amber-500/10 border border-[#A37E2C]/30 rounded-xl text-sm text-brand-black/90 dark:text-gray-300">
                        <p className="font-bold mb-2 text-[#A37E2C]">Corporate Bank Account Details:</p>
                        <p><strong>Account Name:</strong> George Wood Casket</p>
                        <p><strong>Account Number:</strong> 8143904414</p>
                        <p><strong>Bank:</strong> Moniepoint Microfinance Bank</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">* Please send proof of payment to our support team.</p>
                      </div>
                    )}

                    {cart.length > 0 && (
                      <button
                        type="button"
                        onClick={handleCompleteOrder}
                        className="bg-[#135B3A] hover:bg-[#0E462D] text-white w-full h-[56px] rounded-xl mt-4 text-sm font-bold transition-all shadow-md uppercase tracking-wider disabled:opacity-50"
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? 'Placing Order...'
                          : paymentMethod === 'paystack'
                            ? 'Pay with Paystack'
                            : paymentMethod === 'bank_transfer'
                              ? 'Complete Order (Bank Transfer)'
                              : 'Request Call to Order'}
                      </button>
                    )}
                    <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-2 font-light">
                      Your checkout process is safe and secure.
                    </p>

                  </form>
                </ScrollReveal>
              </aside>
            </>
          ) : (
            <div className="w-full bg-brand-card dark:bg-brand-card-dark p-10 rounded-2xl shadow-xl text-center border border-[#135B3A]/10 dark:border-white/5 transition-colors duration-300">
              <ScrollReveal>
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">🎉</span>
                </div>
                <h2 className="text-3xl font-serif font-bold mb-4 text-[#135B3A] dark:text-green-500">Order Placed Successfully!</h2>
                <div className="bg-brand-white dark:bg-gray-800 p-4 rounded-xl inline-block mb-6 border border-gray-200/50 dark:border-gray-700/50">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Your Tracking ID</p>
                  <p className="text-2xl font-mono font-bold text-[#135B3A] dark:text-green-400">{trackingId}</p>
                </div>
                <p className="text-brand-black/80 dark:text-gray-300 max-w-lg mx-auto leading-relaxed font-light">
                  Thank you for choosing George Wood Caskets. {formData.email ? <span>We have sent a confirmation email to <strong>{formData.email}</strong> with your order details.</span> : <span>Your order details have been saved successfully.</span>}
                </p>
                <Link to="/track-order">
                  <button className="mt-8 bg-[#135B3A] hover:bg-[#0E462D] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md text-sm uppercase tracking-wider">
                    Track Your Order
                  </button>
                </Link>
              </ScrollReveal>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Checkout;
