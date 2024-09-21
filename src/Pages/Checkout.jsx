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
      const response = await fetch("https://george-wood-backend.vercel.app/", {
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
          Hello ${formData.firstName} ${formData.lastName},
          Thank you for your order!
          Here is a summary of your order:
          ${cart.map(item => `${item.name} - ${item.price.toLocaleString()} NGN`).join(", ")}
          Total Price: ${totalPrice.toLocaleString()} NGN
          Referred By: ${formData.referredBy}

          To complete your order, please make a payment of the sum Total Price: ${totalPrice.toLocaleString()} NGN
          to the account below:

          George Chiemerie Chime 
          2198210889
          United Bank of Africa (UBA)

          Here is your tracking ID to track the progress of your order: ${result.trackingId}

          We will contact you at ${formData.phone}.
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
        <nav className="h-[50px] flex items-center text-white pl-5 md:pl-40 gap-5 mt-10">
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
            <p>{paymentInstructions}</p>
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
