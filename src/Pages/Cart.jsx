import { useContext } from "react";
import { ProductContext } from "../Providers/ProductProvider";
import { Link } from "react-router-dom";
import Services from "../assets/service-api";
import { FiChevronRight } from "react-icons/fi"; // right-pointing arrow
import ScrollReveal from "../Components/ScrollReveal";


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
  const vat = totalPrice * 0.08;
  const finalTotal = totalPrice + vat;


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
            <span className="text-[#A37E2C] font-bold">Shopping cart</span>
          </nav>
        </ScrollReveal>

        <section className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <main className="bg-brand-card dark:bg-brand-card-dark p-6 rounded-2xl shadow-md flex-grow flex-1 border border-[#135B3A]/10 dark:border-white/5 transition-colors duration-300">
            <ScrollReveal>
              <h1 className="text-3xl font-serif font-bold mb-6 text-[#135B3A] dark:text-green-500">Shopping Cart</h1>
            </ScrollReveal>

            <div className="bg-[#135B3A] text-white flex justify-between py-3.5 px-6 rounded-xl mb-4 hidden md:flex font-semibold text-sm">
              <p className="w-1/2">Item</p>
              <p className="w-1/4 text-center">Quantity</p>
              <p className="w-1/4 text-right">Price</p>
            </div>

            <ul className="space-y-4">
              {groupedCart.map((item, index) => (
                <li key={index} className="flex flex-col md:flex-row justify-between items-center border-b border-[#135B3A]/10 dark:border-white/5 pb-4 last:border-0">
                  <div className="flex items-center gap-4 w-full md:w-1/2">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50"
                    />
                    <p className="text-brand-black dark:text-brand-white font-medium">{item.name}</p>
                  </div>

                  <div className="flex justify-between w-full md:w-1/2 md:items-center mt-4 md:mt-0">
                    <p className="text-brand-black/70 dark:text-gray-300 md:w-1/2 md:text-center font-light">x {item.quantity}</p>
                    <div className="flex items-center gap-4 md:w-1/2 justify-end">
                      <p className="font-bold text-brand-black dark:text-brand-white">{item.price.toLocaleString()} NGN</p>
                      <button
                        onClick={() => removeFromCart(item)}
                        className="bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400 px-3.5 py-1.5 rounded-xl hover:bg-red-100 dark:hover:bg-red-950/40 transition-colors text-xs font-semibold border border-red-100/50 dark:border-red-900/30"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {groupedCart.length === 0 && (
              <p className="text-center text-gray-400 dark:text-gray-500 py-12 font-light">Your shopping cart is empty.</p>
            )}
          </main>

          {/* Checkout Summary */}
          <aside className="lg:w-1/3 bg-brand-card dark:bg-brand-card-dark p-6 rounded-2xl shadow-md h-fit border border-[#135B3A]/10 dark:border-white/5 transition-colors duration-300">
            <ScrollReveal>
              <h2 className="text-xl font-bold font-serif mb-6 text-[#135B3A] dark:text-green-500">Order Summary</h2>

              <div className="space-y-4 text-brand-black/90 dark:text-gray-300 text-sm">
                <div className="flex justify-between">
                  <p>{cart.length} items</p>
                  <p className="font-semibold">{totalPrice.toLocaleString()} NGN</p>
                </div>
                <div className="h-px bg-[#135B3A]/10 dark:bg-white/10 my-2"></div>
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p className="font-semibold">{totalPrice.toLocaleString()} NGN</p>
                </div>
                <div className="flex justify-between">
                  <p>VAT (8%)</p>
                  <p className="font-semibold">{vat.toLocaleString()} NGN</p>
                </div>
                <div className="h-px bg-[#135B3A]/10 dark:bg-white/10 my-2"></div>
                <div className="flex justify-between text-base font-bold text-brand-black dark:text-brand-white">
                  <p>Total</p>
                  <p className="text-[#135B3A] dark:text-green-400">{finalTotal.toLocaleString()} NGN</p>
                </div>
              </div>

              {groupedCart.length > 0 ? (
                <Link to="/checkout">
                  <button className="w-full bg-[#135B3A] hover:bg-[#0E462D] text-white py-4 rounded-xl mt-6 font-bold transition-all shadow-md text-sm uppercase tracking-wider">
                    Proceed to Checkout
                  </button>
                </Link>
              ) : (
                <button disabled className="w-full bg-gray-200 dark:bg-gray-700/50 text-gray-400 dark:text-gray-500 py-4 rounded-xl mt-6 font-bold cursor-not-allowed text-sm uppercase tracking-wider">
                  Cart is Empty
                </button>
              )}
            </ScrollReveal>
          </aside>
        </section>

        {/* Often Bought Together */}
        <section className="mt-16">
          <ScrollReveal>
            <h2 className="text-2xl font-serif font-bold text-[#135B3A] dark:text-green-500 mb-8 flex items-center gap-4">
              Recommended Services
              <div className="h-px flex-1 bg-[#135B3A]/10 dark:bg-white/5"></div>
            </h2>
          </ScrollReveal>

          <ScrollReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((service) => (
              <div
                key={service.id}
                className="bg-brand-card dark:bg-brand-card-dark p-4 rounded-2xl shadow-md border border-[#135B3A]/10 dark:border-white/5 flex flex-col hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={service.thumbnail}
                  alt={service.name}
                  className="w-full h-40 object-cover rounded-xl mb-4 shadow-sm"
                />
                <div className="flex flex-col flex-grow">
                  <h3 className="text-brand-black dark:text-brand-white font-semibold text-base mb-1">
                    {service.name}
                  </h3>
                  {service.color && <p className="text-xs text-brand-black/60 dark:text-gray-400 mb-2 font-light">Color: {service.color}</p>}
                  <p className="text-[#135B3A] dark:text-green-400 font-bold text-sm mb-4">Price on Request</p>

                  <Link
                    to={`/book-service/${service.name.replace(/\s+/g, '-').toLowerCase()}`}
                    className="mt-auto w-full text-center bg-[#A37E2C] hover:bg-[#8C6A1C] text-white py-2.5 rounded-xl transition-colors block font-semibold text-xs uppercase tracking-wider"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </section>

        <ScrollReveal className="mt-12 mb-8">
          <Link to="/products" className="inline-flex items-center text-[#135B3A] dark:text-green-400 font-bold hover:underline">
            <FiChevronRight className="rotate-180 mr-2" />
            Continue Shopping
          </Link>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Cart;
