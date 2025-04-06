import React, { useContext, useState } from "react";
import { ProductContext } from "../ProductProvider";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Arrow from "../Components/Arrow";

const Checkout = () => {
  const { cart, removeFromCart, getTotalPrice, clearCart } = useContext(ProductContext);
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
  const [paymentInstructions, setPaymentInstructions] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCompleteOrder = async () => {
    try {
      const response = await fetch("https://george-wood-backend.vercel.app/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          cart: cart,
          referral: formData.referredBy,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setTrackingId(result.trackingId); // Set the tracking ID from the response
        setOrderSuccess(true);
        
        // Generate payment instructions
        const paymentMessage = `
  <div style="
    font-family: Arial, sans-serif; 
    background-color: #f9f9f9; 
    padding: 20px; 
    border-radius: 10px; 
    color: #333;
    max-width: 600px; 
    margin: 0 auto;">
    
    <!-- Greeting Section -->
    <h2 style="font-size: 24px; color: #135b3a; margin-bottom: 10px;">Thank you for your order!</h2>
    <p style="font-size: 18px; margin-bottom: 20px;">
      Hello <strong>${formData.firstName} ${formData.lastName}</strong>,
    </p>

    <!-- Order Summary -->
    <div style="
      background-color: #fff; 
      padding: 15px; 
      border-radius: 10px; 
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
      margin-bottom: 20px;">
      
      <h3 style="color: #135b3a; font-size: 20px; margin-bottom: 10px;">Order Summary:</h3>
      <ul style="padding-left: 20px;">
        ${cart.map(item => `
          <li style="font-size: 16px; margin-bottom: 8px;">
            ${item.name} - <strong>${item.price.toLocaleString()} NGN</strong>
          </li>`).join('')}
      </ul>
      <p style="font-size: 18px; font-weight: bold; margin-top: 10px;">
        Total Price: ${totalPrice.toLocaleString()} NGN
      </p>
      <p style="font-size: 16px; color: #777;">
        Referred By: ${formData.referredBy || 'N/A'}
      </p>
    </div>

    <!-- Payment Instructions -->
    <div style="background-color: #fef6e6; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
      <h3 style="color: #d9831f; font-size: 20px;">Payment Instructions</h3>
      <p style="font-size: 16px; color: #555;">
        Please make a payment of <strong>${totalPrice.toLocaleString()} NGN</strong> to the account below:
      </p>
      <div style="background-color: #fff; padding: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <p style="font-size: 16px; font-weight: bold; margin-bottom: 4px;">George Chiemerie Chime</p>
        <p style="font-size: 16px;">Account Number: <strong>2198210889</strong></p>
        <p style="font-size: 16px;">Bank: <strong>United Bank of Africa (UBA)</strong></p>
      </div>
    </div>

    <!-- Tracking Info -->
    <div style="margin-bottom: 20px;">
      <h3 style="font-size: 18px; color: #135b3a;">Tracking Information</h3>
      <p style="font-size: 16px; color: #555;">
        Your tracking ID is: <strong>${result.trackingId}</strong>
      </p>
    </div>

    <!-- Contact Info -->
    <div style="margin-bottom: 10px;">
      <p style="font-size: 16px; color: #555;">
        We will contact you at: <strong>${formData.phone}</strong>.
      </p>
    </div>
  </div>
`;
        
        setPaymentInstructions(paymentMessage);
        clearCart(); // Clear the cart after successful order
      } else {
        throw new Error(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("There was an error placing your order. Please try again.");
    }
  };

  return (
    <div className="bg-custom-gradient min-h-screen flex flex-col font-montserrat">
      <section>
        <Header />
      </section>
      <section className="mt-[100px]">
        <nav className="h-[50px] flex items-center text-[#135B3A] pl-5 md:pl-40 gap-5 mt-10">
          <Link to="/">Home</Link>
          <Arrow />
          <Link to="/products">Products</Link>
          <Arrow />
          <Link to="/cart" className="text-[#e4c88a]">
            Shopping Cart
          </Link>
        </nav>
      </section>
      <section className="flex flex-row flex-wrap justify-between p-5">
        {!orderSuccess ? (
          <>
            <main className="bg-white sm:w-[654px] w-full p-5">
              <h1 className="text-[24px] font-bold">Checkout</h1>
              <div className="bg-[#135B3A] text-white flex justify-between h-12 items-center pr-1 pl-1">
                <p>Item</p>
                <p>Price</p>
              </div>
              <ul>
                {cart.map((item, index) => (
                  <li key={index} className="">
                    <div className="flex items-center justify-between">
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-12 h-12 mr-4"
                      />
                      <div>
                        <p className="w-[80px] text-nowrap overflow-hidden">
                          {item.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p>{item.price.toLocaleString()} NGN</p>
                        <button
                          onClick={() => removeFromCart(item)}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
                <hr />
              </ul>
              <div className="flex justify-between mt-5">
                <p className="text-[18px] font-bold">Total Price:</p>
                <p className="text-[18px] font-bold">{totalPrice.toLocaleString()} NGN</p>
              </div>
            </main>
            <aside className="sm:w-[654px] w-full bg-white p-5 flex flex-col justify-between">
              <h2 className="text-[24px] font-bold">Complete Your Order</h2>
              <form className="flex flex-col gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded"
                />
                <p>How did you hear about Us</p>
                <input
                  type="text"
                  name="referredBy"
                  placeholder="Referred By (Optional)"
                  value={formData.referredBy}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded"
                />
                {cart.length > 0 && (
                  <button
                    type="button"
                    onClick={handleCompleteOrder}
                    className="bg-[#135B3A] text-white w-full h-[56px] rounded-[5px] mt-5"
                  >
                    Complete Order
                  </button>
                )}
              </form>
            </aside>
          </>
        ) : (
          <div className="w-full bg-white p-5 text-center">
            <h2 className="text-[24px] font-bold">Order Placed Successfully!</h2>
            <p>Your tracking ID is: <strong>{trackingId}</strong></p>
            <p>To complete your order, kindly check your email for further instructions. Thank you for choosing us.</p>
          </div>
        )}
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default Checkout;
