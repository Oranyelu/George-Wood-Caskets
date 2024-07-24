import React, { useContext } from "react";
import { ProductContext } from "../ProductProvider";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Services from "../assets/service-api";
import Footer from "../Components/Footer";

const Cart = () => {
  const { cart, removeFromCart } = useContext(ProductContext);
  const { servicesData } = Services;

  // Group items by ID and calculate the total price
  const groupedCart = cart.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.price += item.price;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  const totalPrice = groupedCart.reduce((total, item) => total + item.price, 0);
  const deliveryFee = 1000;
  const vat = 0;
  const finalTotal = totalPrice + deliveryFee + vat;

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
            Shopping cart
          </Link>
        </nav>
      </section>
      <section className="flex flex-row flex-wrap justify-between p-5 gap-10">
        <main className="bg-white w-[654px] p-10">
          <h1 className="text-[24px] font-bold">Shopping Cart</h1>
          <div className="bg-[#135B3A] text-white flex justify-around h-12 items-center">
            <p>Item Details</p>
            <p>Quantity</p>
            <p>Price</p>
          </div>
          <ul>
            {groupedCart.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-16 h-16 object-cover"
                  />
                  <p>{item.name}</p>
                </div>
                <p>{item.quantity}</p>
                <p>{item.price}</p>
                <button
                  onClick={() => removeFromCart(item)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
            <hr />
          </ul>
        </main>
        <aside className="w-[451px] bg-white p-5 flex flex-col justify-between">
          <div className="flex justify-between">
            <h2 className="text-[19px] font-bold">Order Summary</h2>
            <p>{cart.length} items</p>
          </div>
          <div className="flex justify-between">
            <p>Delivery Charges</p>
            <p>{deliveryFee} NGN</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <p>VAT</p>
            <p>{vat} NGN</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <p>Total</p>
            <p>{finalTotal} NGN</p>
          </div>
          <hr />
          <div className="flex items-center justify-center">
            {groupedCart.length > 0 && (
              <Link to="/checkout">
                <button className="bg-[#135B3A] text-white w-[389px] h-[56px] rounded-[5px]">
                  Proceed to Checkout
                </button>
              </Link>
            )}
          </div>
        </aside>
      </section>
      <section>
        <h1 className="text-[31px] text-[#011309] p-10 font-bold">
          OFTEN BOUGHT TOGETHER
          <hr />
        </h1>
        <div>
          <ul className="flex flex-wrap gap-4 justify-center">
            {servicesData.map((service) => (
              <div key={service.id} className="w-[232.69px] bg-white border border-gray-200 p-4 rounded-lg">
                <img src={service.thumbnail} alt={service.name} className="w-full h-auto object-cover" />
                <div>
                  <h1 className="text-[#011309] font-semibold text-lg">{service.name}</h1>
                  <p>{service.description}</p>
                  <p>Color: {service.color}</p>
                  <p>Price: {service.price.toLocaleString()} NGN</p>
                  <button
                    className="bg-[#A37E2C] text-white px-4 py-2 rounded"
                    onClick={() => handleBookNowClick(service)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </section>
      <section>
        <Link to="/">Back to Products</Link>
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default Cart;
