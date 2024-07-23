import React from "react";
import { Link } from "react-router-dom";
import GeorgeWoodLogo from "../assets/svgs/George-wood.svg";

function Footer() {
  return (
    <div>
      <main>
        <img src={GeorgeWoodLogo} alt="" />
      </main>
      <hr />
      <footer className="flex justify-evenly pt-5 flex-wrap">
        <nav className="flex flex-col">
          <h3 className="font-bold">Company Info</h3>
          <Link to="">About Us</Link>
          <a href="">Get involved</a>
          <a href="">Customers</a>
          <a href="">We are hiring</a>
        </nav>
        <nav className="flex flex-col">
          <h3 className="font-bold">Legal</h3>
          <a href="">Terms of Service</a>
          <a href="">Privacy Policy</a>
          <a href="">Cookies Policy</a>
          <a href="">Accessibility</a>
        </nav>
        <nav className="flex flex-col">
          <h3 className="font-bold">Support</h3>
          <a href="">Help Center</a>
          <a href="">Contact Us</a>
          <a href="">Safety Center</a>
          <a href="">Report a Safety Issue</a>
        </nav>
        <nav className="flex flex-col">
          <h3 className="font-bold">Features</h3>
          <a href="">Jobs</a>
          <a href="">Track Order</a>
          <a href="">Learning</a>
          <a href="">Events</a>
        </nav>

        <div>
          <h3 className="font-bold">Get In Touch</h3>
          <form action="">
            <input type="email" placeholder="Your Email" />
            <button className="bg-[#135B3A]">Subscribe</button>
          </form>
        </div>
      </footer>
      <p className="flex items-center justify-center bg-[#135B3A] text-[#A37E2C]">
        George Wood Caskets | All Rights Reserved | Made by {" "}
        <a href="">George Chime</a>
      </p>
    </div>
  );
}

export default Footer;
