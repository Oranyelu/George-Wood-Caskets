import { useContext, useState } from "react";
import { usePaystackPayment } from 'react-paystack';
import { ProductContext } from "../Providers/ProductProvider";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi"; // right-pointing arrow

const Checkout = () => {
  const { cart, removeFromCart, getTotalPrice, checkout } = useContext(ProductContext);
  const totalPrice = getTotalPrice();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    referredBy: "",
  });

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const config = {
    reference: (new Date()).getTime().toString(),
    email: formData.email,
    amount: Math.round(totalPrice * 1.08 * 100), // Paystack expects amount in kobo, incl. 8% VAT
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    firstname: formData.firstName,
    lastname: formData.lastName,
    phone: formData.phone,
  };

  const onSuccess = async (reference) => {
    try {
      const orderDataWithPayment = {
        ...formData,
        paymentInfo: reference
      };
      const orderId = await checkout(orderDataWithPayment);
      setTrackingId(orderId);
      setOrderSuccess(true);
    } catch (error) {
      console.error("Error placing order:", error);
      alert(`There was an error placing your order: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onClose = () => {
    setIsSubmitting(false);
    alert("Payment cancelled.");
  }

  const initializePayment = usePaystackPayment(config);

  const handleCompleteOrder = () => {
    if (isSubmitting) return;

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    initializePayment(onSuccess, onClose);
  };

  return (
    <div className="min-h-screen flex flex-col font-montserrat pt-24 pb-12 transition-colors duration-300">
      <div className="max-w-[1300px] mx-auto w-full px-4 md:px-8">

        {/* Breadcrumb */}
        <nav className="flex items-center text-[#135B3A] dark:text-green-500 gap-2 mb-8 text-sm md:text-base">
          <Link to="/">Home</Link>
          <FiChevronRight className="inline" />
          <Link to="/products">Products</Link>
          <FiChevronRight className="inline" />
          <Link to="/cart">Shopping Cart</Link>
          <FiChevronRight className="inline" />
          <span className="text-[#e4c88a] font-bold">Checkout</span>
        </nav>

        <section className="flex flex-col lg:flex-row gap-8">
          {!orderSuccess ? (
            <>
              {/* Order Items */}
              <main className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm flex-1 border border-gray-100 dark:border-gray-700">
                <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Review your Order</h1>
                <div className="bg-[#135B3A] text-white flex justify-between py-3 px-4 rounded-t-md mb-4 hidden md:flex">
                  <p className="w-1/2">Item</p>
                  <p className="w-1/2 text-right">Price</p>
                </div>
                <ul className="space-y-4">
                  {cart.map((item, index) => (
                    <li key={index} className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center">
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="w-12 h-12 mr-4 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-medium text-gray-900 dark:text-gray-200">{item.price.toLocaleString()} NGN</p>
                        <button
                          onClick={() => removeFromCart(item)}
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 px-2 py-1 rounded"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 space-y-2 text-gray-700 dark:text-gray-300">
                  <div className="flex justify-between text-lg">
                    <p>Subtotal:</p>
                    <p>{totalPrice.toLocaleString()} NGN</p>
                  </div>
                  <div className="flex justify-between text-lg">
                    <p>VAT (8%):</p>
                    <p>{(totalPrice * 0.08).toLocaleString()} NGN</p>
                  </div>
                  <div className="flex justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-xl font-bold text-gray-900 dark:text-white">
                    <p>Total Price:</p>
                    <p>{(totalPrice * 1.08).toLocaleString()} NGN</p>
                  </div>
                </div>
              </main>

              {/* Checkout Form */}
              <aside className="lg:w-1/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm h-fit border border-gray-100 dark:border-gray-700">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Shipping Details</h2>
                <form className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-500"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-500"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-500"
                      required
                    />
                  </div>

                  {/* Delivery Address Section */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Delivery Address</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={formData.address || ''}
                      onChange={handleInputChange}
                      className="p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city || ''}
                        onChange={handleInputChange}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-500"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">State</label>
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state || ''}
                        onChange={handleInputChange}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">How did you hear about Us <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <input
                      type="text"
                      name="referredBy"
                      value={formData.referredBy}
                      onChange={handleInputChange}
                      className="p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-500"
                    />
                  </div>

                  {cart.length > 0 && (
                    <button
                      type="button"
                      onClick={handleCompleteOrder}
                      className="bg-[#135B3A] text-white w-full h-[56px] rounded-lg mt-4 text-lg font-bold hover:bg-[#0e422b] transition-colors shadow-lg disabled:bg-gray-400 dark:disabled:bg-gray-600"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Placing Order...' : 'Pay with Paystack'}
                    </button>
                  )}
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
                    Secured by Paystack. Your data is safe.
                  </p>
                </form>
              </aside>
            </>
          ) : (
            <div className="w-full bg-white dark:bg-gray-800 p-10 rounded-lg shadow-sm text-center border border-gray-100 dark:border-gray-700">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🎉</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Order Placed Successfully!</h2>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md inline-block mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Your Tracking ID</p>
                <p className="text-2xl font-mono font-bold text-[#135B3A] dark:text-green-400">{trackingId}</p>
              </div>
              <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
                Thank you for choosing George Wood Caskets. We have sent a confirmation email to <strong>{formData.email}</strong> with your order details.
              </p>
              <Link to="/tracking">
                <button className="mt-8 bg-[#135B3A] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#0e422b] transition-colors">
                  Track Your Order
                </button>
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Checkout;
