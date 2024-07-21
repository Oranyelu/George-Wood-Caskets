import React from "react";
import Logo from "../assets/Favicon.svg";
import HamburgerMenu from "./HamburgerMenu";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 ">
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
        <main className="mr-auto">
          <img src={Logo} alt="Logo" className="flex p-4" />
        </main>
        <div className="flex justify-center items-center">
          <div className="hidden sm:block">
            <span className=" w-[60vw] flex justify-evenly ">
              <Link to="./">HOME</Link>
              <Link to="/services">SERVICES</Link>
              <Link to="/about-us">ABOUT US</Link>
              <Link to="/giving">GIVING</Link>
              <Link to="/track-order">TRACK ORDER</Link>
              <Link to="/xclusive">XCLUSIVE</Link>
            </span>
          </div>
          <span className="ml-4 block sm:hidden">
            <HamburgerMenu />
          </span>{" "}
        </div>
      </section>
    </div>
  );
}

export default Header;
