import React, { useContext } from 'react';
import { ProductContext } from '../ProductProvider';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const Checkout = () => {
  const { cart, removeFromCart, getTotalPrice } = useContext(ProductContext);
  const totalPrice = getTotalPrice();

  return (
    <div className="bg-custom-gradient min-h-screen flex flex-col font-montserrat">
      <section>
        <Header />
      </section>
      <section className="mt-[100px]">
        <nav className="h-[50px] flex items-center text-white pl-40 gap-5">
          <Link to="./">Home</Link>
          <svg
            width="10"
            height="16"
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.680771 0.180771C0.737928 0.123469 0.805828 0.0780065 0.880583 0.0469869C0.955337 0.0159672 1.03548 0 1.11641 0C1.19735 0 1.27749 0.0159672 1.35224 0.0469869C1.427 0.0780065 1.4949 0.123469 1.55205 0.180771L8.9358 7.56452C8.9931 7.62168 9.03857 7.68958 9.06959 7.76433C9.10061 7.83909 9.11657 7.91923 9.11657 8.00016C9.11657 8.0811 9.10061 8.16124 9.06959 8.23599C9.03857 8.31074 8.9931 8.37865 8.9358 8.4358L1.55205 15.8196C1.43651 15.9351 1.27981 16 1.11641 16C0.953015 16 0.79631 15.9351 0.680771 15.8196C0.565232 15.704 0.500322 15.5473 0.500322 15.3839C0.500322 15.2205 0.565232 15.0638 0.680771 14.9483L7.63011 8.00016L0.680771 1.05205C0.623469 0.994897 0.578006 0.926996 0.546986 0.852242C0.515967 0.777487 0.5 0.697347 0.5 0.616412C0.5 0.535478 0.515967 0.455338 0.546986 0.380583C0.578006 0.305829 0.623469 0.237928 0.680771 0.180771V0.180771Z"
              fill="#FFFFFF"
            />
          </svg>

          <Link to="/product">Products</Link>
          <svg
            width="10"
            height="16"
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.680771 0.180771C0.737928 0.123469 0.805828 0.0780065 0.880583 0.0469869C0.955337 0.0159672 1.03548 0 1.11641 0C1.19735 0 1.27749 0.0159672 1.35224 0.0469869C1.427 0.0780065 1.4949 0.123469 1.55205 0.180771L8.9358 7.56452C8.9931 7.62168 9.03857 7.68958 9.06959 7.76433C9.10061 7.83909 9.11657 7.91923 9.11657 8.00016C9.11657 8.0811 9.10061 8.16124 9.06959 8.23599C9.03857 8.31074 8.9931 8.37865 8.9358 8.4358L1.55205 15.8196C1.43651 15.9351 1.27981 16 1.11641 16C0.953015 16 0.79631 15.9351 0.680771 15.8196C0.565232 15.704 0.500322 15.5473 0.500322 15.3839C0.500322 15.2205 0.565232 15.0638 0.680771 14.9483L7.63011 8.00016L0.680771 1.05205C0.623469 0.994897 0.578006 0.926996 0.546986 0.852242C0.515967 0.777487 0.5 0.697347 0.5 0.616412C0.5 0.535478 0.515967 0.455338 0.546986 0.380583C0.578006 0.305829 0.623469 0.237928 0.680771 0.180771V0.180771Z"
              fill="#FFFFFF"
            />
          </svg>

          <Link to="/cart" className="text-[#e4c88a]">
            Shopping Cart
          </Link>
        </nav>
      </section>
      <section className="flex flex-row flex-wrap justify-between p-5">
        <main className="bg-white w-[654px] p-10">
          <h1 className="text-[24px] font-bold">Checkout</h1>
          <div className="bg-[#135B3A] text-white flex justify-around h-12 items-center">
            <p>Item Details</p>
            <p>Quantity</p>
            <p>Price</p>
          </div>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <div className="flex items-center">
                  <img src={item.thumbnail} alt={item.name} className="w-12 h-12 mr-4" />
                  <div>
                    <p>{item.name}</p>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
            <hr />
          </ul>
          <div className="flex justify-between mt-5">
            <p className="text-[18px] font-bold">Total Price:</p>
            <p className="text-[18px] font-bold">${totalPrice.toFixed(2)}</p>
          </div>
        </main>
        <aside className="w-[451px] bg-white p-5 flex flex-col justify-between">
          <h2 className="text-[19px] font-bold">Payment Options</h2>
          <div className="mt-5">
            <button className="bg-[#135B3A] text-white w-full h-[56px] rounded-[5px] mb-3">
              Pay with Card
            </button>
            <button className="bg-[#135B3A] text-white w-full h-[56px] rounded-[5px]">
              Pay with Bank Transfer
            </button>
          </div>
          {cart.length > 0 && (
            <Link to="/checkout">
              <button className="bg-[#135B3A] text-white w-full h-[56px] rounded-[5px] mt-5">
                Proceed to Checkout
              </button>
            </Link>
          )}
        </aside>
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default Checkout;
