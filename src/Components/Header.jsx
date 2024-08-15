import React from "react";
import Logo from "../assets/Favicon.svg";
import HamburgerMenu from "./HamburgerMenu";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="hidden md:block">
        <section className="bg-[#A37E2C] flex justify-between p-2 text-white">
          <p>08143904414</p>
          <p>georgechime91@gmail.com</p>
          <p>
            Follow us and stay upadted with the lastes community development
            programs
          </p>
          <p>Follow Us:</p>
        </section>
      </div>
      <section className="flex justify-center bg-[#135B3A] h-16">
        <main className="mr-auto flex">
          <div className="">
            <Link to="/">
              <img src={Logo} alt="Logo" className="flex p-4" />{" "}
            </Link>
          </div>
          <div className="flex text-center items-center text-white font-bold text-[20px]">
            <h1 className="">GEORGE WOOD</h1>
          </div>
        </main>

        <div className="flex justify-center items-center">
          <div className="hidden sm:block">
            <span className=" w-[60vw] flex justify-evenly text-white font-bold">
              <Link to="/">HOME</Link>
              <Link to="/products">PRODUCTS</Link>
              <Link to="/services">SERVICES</Link>
              <Link to="/about-us">ABOUT US</Link>
              <Link to="/giving">GIVING</Link>
              <Link to="/track-order">TRACK ORDER</Link>
              <Link to="/xclusive">XCLUSIVE</Link>
            </span>
          </div>
          <div className="pr-5 flex items-center gap-5 font-semibold text-white">
            <Link to="/cart" className="flex items-center">
              Cart
            </Link>
          </div>
          <span className="ml-2 block sm:hidden pr-4">
            <HamburgerMenu />
          </span>{" "}
        </div>
      </section>
    </div>
  );
}

export default Header;
