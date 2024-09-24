import React, { useContext } from "react"; 
import Logo from "../assets/Favicon.svg";
import HamburgerMenu from "./HamburgerMenu";
import { Link } from "react-router-dom";
import CartIcon from '../assets/svgs/cart_svg.svg';
import { ProductContext } from "../ProductProvider"; // Import the ProductContext

function Header() {
  const { cart } = useContext(ProductContext); // Access cart from context
  const cartItemCount = cart.length; // Get the number of items in the cart

  return (
    <div className="fixed top-0 left-0 right-0 z-50 text-[1rem]">
      <div className="hidden md:block">
        <section className="bg-[#A37E2C] flex justify-between p-2 text-white text-sm">
          <p>08143904414</p>
          <p>georgewoodcasket@gmail.com</p>
          <p>
            Follow us and stay updated with the latest community development
            programs;{" "}
            <a
              href="https://www.instagram.com/georgewoodcaskets?igsh=MWttbHNsMmdreHhoNA=="
              target="_blank"
              rel="noopener noreferrer"
              className="pl-1 hover:text-[#135B3A]"
            >
              @georgewoodcaskets
            </a>
          </p>
        </section>
      </div>

      <section className="flex justify-between items-center bg-[#135B3A] h-16 p-4">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="ml-3 pt-[70px]" />
        </Link>

        <div className="flex-1 text-center text-white font-bold">
          <h1>George Wood Casket and Furniture</h1>
        </div>

        <div className="flex items-center">
          <div className="hidden sm:flex">
            <span className="w-[60vw] flex justify-evenly text-white font-semibold">
              <Link to="/">HOME</Link>
              <Link to="/products">PRODUCTS</Link>
              <Link to="/services">SERVICES</Link>
              <Link to="/about-us">ABOUT US</Link>
              <Link to="/giving">GIVING</Link>
              <Link to="/track-order">TRACK ORDER</Link>
              <Link to="/xclusive">XCLUSIVE</Link>
            </span>
          </div>

          {/* Cart Icon with Red Dot */}
          <div className="relative flex items-center pr-5">
            <Link to="/cart" className="flex items-center">
              <img src={CartIcon} alt="Cart" />
              {/* Conditional rendering of the red dot */}
              {cartItemCount > 0 && (
                <span className="absolute top-[-5px] right-[-5px] bg-red-500 rounded-full h-3 w-3" />
              )}
            </Link>
          </div>

          <div className="ml-2 block sm:hidden pr-4">
            <HamburgerMenu />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Header;
