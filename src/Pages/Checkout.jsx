import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { ProductContext } from "../ProductProvider";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    borderRadius: "10px",
    padding: "20px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

const Checkout = () => {
  const { cart, removeFromCart, getTotalPrice } = useContext(ProductContext);
  const totalPrice = getTotalPrice();

  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);

  const openCardModal = () => setIsCardModalOpen(true);
  const closeCardModal = () => setIsCardModalOpen(false);

  const openBankModal = () => setIsBankModalOpen(true);
  const closeBankModal = () => setIsBankModalOpen(false);

  const handleCompleteOrderCall = () => {
    window.location.href = "tel:+2348143904414";
  };

  return (
    <div className="bg-custom-gradient min-h-screen flex flex-col font-montserrat">
      <section>
        <Header />
      </section>
      <section className="mt-[100px]">
        <nav className="h-[50px] flex items-center text-white pl-5 md:pl-40 gap-5 mt-10">
          <Link to="/">Home</Link>
          <span>{" / "}</span>
          <Link to="/products">Products</Link>
          <span>{" / "}</span>
          <Link to="/cart" className="text-[#e4c88a]">
            Shopping Cart
          </Link>
        </nav>
      </section>
      <section className="flex flex-row flex-wrap justify-between p-5">
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
                    <p>${item.price.toFixed(2)}</p>
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
            <p className="text-[18px] font-bold">${totalPrice.toFixed(2)}</p>
          </div>
        </main>
        <aside className="sm:w-[654px] w-full bg-white p-5 flex flex-col justify-between">
          <h2 className="text-[19px] font-bold">Payment Options</h2>
          <div className="mt-5">
            <button
              onClick={openCardModal}
              className="bg-[#135B3A] text-white w-full h-[56px] rounded-[5px] mb-3"
            >
              Pay with Card
            </button>
            <button
              onClick={openBankModal}
              className="bg-[#135B3A] text-white w-full h-[56px] rounded-[5px]"
            >
              Pay with Bank Transfer
            </button>
          </div>
          {cart.length > 0 && (
            <button
              onClick={handleCompleteOrderCall}
              className="bg-[#135B3A] text-white w-full h-[56px] rounded-[5px] mt-5"
            >
              Complete Order (Call)
            </button>
          )}
        </aside>
      </section>
      <section>
        <Footer />
      </section>

      {/* Card Payment Modal */}
      <Modal
        isOpen={isCardModalOpen}
        onRequestClose={closeCardModal}
        style={customStyles}
        contentLabel="Card Payment"
      >
        <div className="p-5">
          <h2 className="text-[24px] font-bold mb-4">Card Payment</h2>
          <form>
            {/* Form fields for card payment */}
            <input
              type="text"
              placeholder="Card Number"
              className="border border-gray-300 rounded w-full p-2 mb-4"
            />
            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              className="border border-gray-300 rounded w-full p-2 mb-4"
            />
            <input
              type="text"
              placeholder="CVC"
              className="border border-gray-300 rounded w-full p-2 mb-4"
            />
            <button
              type="submit"
              className="bg-[#135B3A] text-white w-full h-[56px] rounded-[5px]"
            >
              Pay Now
            </button>
          </form>
        </div>
      </Modal>

      {/* Bank Transfer Modal */}
      <Modal
        isOpen={isBankModalOpen}
        onRequestClose={closeBankModal}
        style={customStyles}
        contentLabel="Bank Transfer"
      >
        <div className="p-5">
          <h2 className="text-[24px] font-bold mb-4">Bank Transfer</h2>
          <div className="text-lg">
            <p>Account No: 2198210889</p>
            <p>UBA</p>
            <p>George Chime</p>
          </div>
          <button
            onClick={closeBankModal}
            className="bg-[#135B3A] text-white w-full h-[56px] rounded-[5px] mt-5"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Checkout;
