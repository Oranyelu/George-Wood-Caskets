import React, { useContext } from "react";
import { ProductContext } from "../ProductProvider";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Services from "../assets/service-api";
import Footer from "../Components/Footer";
import Arrow from "../Components/Arrow";

const Cart = () => {
  const { cart, addToCart, removeFromCart } = useContext(ProductContext);
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

  const handleBookNowClick = (service) => {
    addToCart(service);
  };

  return (
    <div className="bg-custom-gradient min-h-screen flex flex-col font-montserrat">
      <Header />
      <section className="mt-[100px]">
        <nav className="h-[50px] flex items-center text-white pl-5 md:pl-40 gap-5 mt-10">
          <Link to="/">Home</Link>
          <Arrow />
          <Link to="/products">Products</Link>
          <Arrow />
          <Link to="/cart" className="text-[#e4c88a]">
            Shopping cart
          </Link>
        </nav>
      </section>
      <section className="flex flex-col lg:flex-row flex-wrap justify-between p-5 ">
        <main className="bg-white sm:w-[654px] w-full p-5">
          <h1 className="text-[24px] font-bold">Shopping Cart</h1>
          <div className="bg-[#135B3A] text-white flex justify-between h-12 items-center pr-1 pl-1">
            <p>Item</p>
            <p>Quantity</p>
            <p>Price</p>
          </div>
          <ul>
            {groupedCart.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center "
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-16 h-16 object-cover"
                  />
                  <p className="w-[65px] text-nowrap overflow-hidden">{item.name}</p>
                </div>
                <p>{item.quantity}</p>
                <div className="flex items-center gap-1">
                
                  <p>{item.price.toLocaleString()} NGN</p>
                  <button
                    onClick={() => removeFromCart(item)}
                    className="bg-red-500 text-white px-3 py-1 rounded mt-2 sm:mt-0"
                  >
                    -
                  </button>
                </div>
              </li>
            ))}
            <hr />
          </ul>
        </main>
        <aside className="sm:w-[654px] w-full bg-white p-5 flex flex-col justify-between">
          <div className="flex justify-between">
            <h2 className="text-[19px] font-bold">Order Summary</h2>
            <p>{cart.length} items</p>
          </div>
          <div className="flex justify-between">
            <p>Delivery Charges</p>
            <p>{deliveryFee.toLocaleString()} NGN</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <p>VAT</p>
            <p>{vat} NGN</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <p>Total</p>
            <p>{finalTotal.toLocaleString()} NGN</p>
          </div>
          <hr />
          <div>
            {groupedCart.length > 0 && (
              <Link to="/checkout">
                <button className="bg-[#135B3A] text-white w-full h-[56px] rounded-[5px] mt-5">
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
        <div className="p-4">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {servicesData.map((service) => (
              <div
                key={service.id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <img
                  src={service.thumbnail}
                  alt={service.name}
                   className="w-full h-40 object-cover rounded-md"
                />
                <div>
                  <h1 className="text-[#011309] font-semibold text-lg">
                    {service.name}
                  </h1>
                  <p>Color: {service.color}</p>
                  <p>Price: {service.price.toLocaleString()} NGN</p>
                  <div className="w-full flex justify-end">
                  <button
                    className="bg-[#A37E2C] text-white px-4 py-2 rounded"
                    onClick={() => handleBookNowClick(service)}
                  >
                    Book Now
                  </button>
                  </div>
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
