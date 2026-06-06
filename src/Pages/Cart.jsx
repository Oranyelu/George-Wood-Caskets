import { useContext } from "react";
import { ProductContext } from "../Providers/ProductProvider";
import { Link } from "react-router-dom";
import Services from "../assets/service-api";
import { FiChevronRight } from "react-icons/fi"; // right-pointing arrow


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
    <div className="min-h-screen flex flex-col font-montserrat pt-24 pb-12 transition-colors duration-300">
      <div className="max-w-[1300px] mx-auto w-full px-4 md:px-8">

        {/* Breadcrumb */}
        <nav className="flex items-center text-[#135B3A] dark:text-green-500 gap-2 mb-8 text-sm md:text-base">
          <Link to="/">Home</Link>
          <FiChevronRight className="inline" />
          <Link to="/products">Products</Link>
          <FiChevronRight className="inline" />
          <span className="text-[#e4c88a] font-bold">Shopping cart</span>
        </nav>

        <section className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <main className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm flex-1 border border-gray-100 dark:border-gray-700">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Shopping Cart</h1>

            <div className="bg-[#135B3A] text-white flex justify-between py-3 px-4 rounded-t-md mb-4 hidden md:flex">
              <p className="w-1/2">Item</p>
              <p className="w-1/4 text-center">Quantity</p>
              <p className="w-1/4 text-right">Price</p>
            </div>

            <ul className="space-y-4">
              {groupedCart.map((item, index) => (
                <li key={index} className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                  <div className="flex items-center gap-4 w-full md:w-1/2">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <p className="text-gray-900 dark:text-gray-200 font-medium">{item.name}</p>
                  </div>

                  <div className="flex justify-between w-full md:w-1/2 md:items-center mt-4 md:mt-0">
                    <p className="text-gray-700 dark:text-gray-300 md:w-1/2 md:text-center">x {item.quantity}</p>
                    <div className="flex items-center gap-4 md:w-1/2 justify-end">
                      <p className="font-bold text-gray-900 dark:text-white">{item.price.toLocaleString()} NGN</p>
                      <button
                        onClick={() => removeFromCart(item)}
                        className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-3 py-1 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {groupedCart.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400 py-10">Your cart is empty.</p>}
          </main>

          {/* Checkout Summary */}
          <aside className="lg:w-1/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm h-fit border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Order Summary</h2>

            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div className="flex justify-between">
                <p>{cart.length} items</p>
                <p className="font-medium">{totalPrice.toLocaleString()} NGN</p>
              </div>
              <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p className="font-medium">{totalPrice.toLocaleString()} NGN</p>
              </div>
              <div className="flex justify-between">
                <p>VAT (8%)</p>
                <p className="font-medium">{vat.toLocaleString()} NGN</p>
              </div>
              <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
              <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                <p>Total</p>
                <p>{finalTotal.toLocaleString()} NGN</p>
              </div>
            </div>

            {groupedCart.length > 0 ? (
              <Link to="/checkout">
                <button className="w-full bg-[#135B3A] text-white py-4 rounded-lg mt-6 font-bold hover:bg-[#0e422b] transition-colors shadow-lg shadow-green-900/20">
                  Proceed to Checkout
                </button>
              </Link>
            ) : (
              <button disabled className="w-full bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 py-4 rounded-lg mt-6 font-bold cursor-not-allowed">
                Cart is Empty
              </button>
            )}
          </aside>
        </section>

        {/* Often Bought Together */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
            Recommended Services
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((service) => (
              <div
                key={service.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col"
              >
                <img
                  src={service.thumbnail}
                  alt={service.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <div className="flex flex-col flex-1">
                  <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-1">
                    {service.name}
                  </h3>
                  {service.color && <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Color: {service.color}</p>}
                  <p className="text-[#135B3A] dark:text-green-400 font-bold mb-4">Price on Request</p>

                  <Link
                    to={`/book-service/${service.name.replace(/\s+/g, '-').toLowerCase()}`}
                    className="mt-auto w-full text-center bg-[#A37E2C] text-white py-2 rounded hover:bg-[#8c6b25] transition-colors block font-semibold text-sm"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 mb-8">
          <Link to="/products" className="inline-flex items-center text-[#135B3A] dark:text-green-400 font-bold hover:underline">
            <FiChevronRight className="rotate-180 mr-2" />
            Continue Shopping
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Cart;
