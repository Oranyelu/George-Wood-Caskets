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
        <main className="mr-auto">
          <img src={Logo} alt="Logo" className="flex p-4" />
        </main>
        <div className="flex justify-center items-center">
          <div className="hidden sm:block">
            <span className=" w-[60vw] flex justify-evenly text-white font-bold">
              <Link to="/">HOME</Link>
              <Link to="/services">SERVICES</Link>
              <Link to="/about-us">ABOUT US</Link>
              <Link to="/giving">GIVING</Link>
              <Link to="/track-order">TRACK ORDER</Link>
              <Link to="/xclusive">XCLUSIVE</Link>
            </span>
          </div>
          <div className="pr-5 flex items-center gap-5">
            <div className="flex items-center">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35px"
                height="35px"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#FFFFFF"
                  d="M22 4.25A2.25 2.25 0 0 0 19.75 2h-5.466a3.25 3.25 0 0 0-2.299.953l-8.5 8.51a3.25 3.25 0 0 0 .004 4.596l4.462 4.455a3.255 3.255 0 0 0 4.596-.001l.094-.094a5.5 5.5 0 1 1 7.777-7.779l.63-.63A3.25 3.25 0 0 0 22 9.712zm-6.5 2.752a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0m4.668 12.105a4.5 4.5 0 1 0-1.06 1.06l2.612 2.613a.75.75 0 1 0 1.06-1.06zM19.5 16.5a3 3 0 1 1-6 0a3 3 0 0 1 6 0"
                />
              </svg>
            </div>
            <Link to="/cart" className="flex items-center">
         
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35px"
                height="35px"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#FFFFFF"
                  d="m9.564 8.73l.515 1.863c.485 1.755.727 2.633 1.44 3.032c.713.4 1.618.164 3.428-.306l1.92-.5c1.81-.47 2.715-.705 3.127-1.396c.412-.692.17-1.57-.316-3.325l-.514-1.862c-.485-1.756-.728-2.634-1.44-3.033c-.714-.4-1.619-.164-3.429.307l-1.92.498c-1.81.47-2.715.706-3.126 1.398c-.412.691-.17 1.569.315 3.324"
                />
                <path
                  fill="#FFFFFF"
                  d="M2.277 5.247a.75.75 0 0 1 .924-.522l1.703.472A2.707 2.707 0 0 1 6.8 7.075l2.151 7.786l.158.547a2.96 2.96 0 0 1 1.522 1.267l.31-.096l8.87-2.305a.75.75 0 1 1 .378 1.452l-8.837 2.296l-.33.102c-.006 1.27-.883 2.432-2.21 2.776c-1.59.414-3.225-.502-3.651-2.044c-.426-1.543.518-3.129 2.108-3.542a3.35 3.35 0 0 1 .237-.052L5.354 7.474a1.207 1.207 0 0 0-.85-.831L2.8 6.17a.75.75 0 0 1-.523-.923"
                />
              </svg>
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
