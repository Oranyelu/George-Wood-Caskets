import React from "react";
import { Link } from "react-router-dom";
import GeorgeWoodLogo from "../assets/svgs/George-wood.svg";

function Footer() {
  return (
    <div className="bg-transparent">
      <main className="p-5 flex justify-center">
        <img src={GeorgeWoodLogo} alt="George Wood Logo" className="w-40 h-auto" />
      </main>
      <hr className="border-t-2 border-gray-300" />
      <footer className="flex justify-evenly pt-5 flex-wrap p-4 bg-gray-100 text-gray-700">
        <nav className="flex flex-col mb-4">
          <h3 className="font-bold text-lg mb-2 text-[#135B3A]">Company Info</h3>
          <Link to="/about" className="hover:text-[#A37E2C]">About Us</Link>
          <Link to="/get-involved" className="hover:text-[#A37E2C]">Get Involved</Link>
          <Link to="/customers" className="hover:text-[#A37E2C]">Customers</Link>
          <Link to="/careers" className="hover:text-[#A37E2C]">We are hiring</Link>
        </nav>
        <nav className="flex flex-col mb-4">
          <h3 className="font-bold text-lg mb-2 text-[#135B3A]">Legal</h3>
          <Link to="/terms" className="hover:text-[#A37E2C]">Terms of Service</Link>
          <Link to="/privacy" className="hover:text-[#A37E2C]">Privacy Policy</Link>
          <Link to="/cookies" className="hover:text-[#A37E2C]">Cookies Policy</Link>
          <Link to="/accessibility" className="hover:text-[#A37E2C]">Accessibility</Link>
        </nav>
        <nav className="flex flex-col mb-4">
          <h3 className="font-bold text-lg mb-2 text-[#135B3A]">Support</h3>
          <Link to="/help" className="hover:text-[#A37E2C]">Help Center</Link>
          <Link to="/contact" className="hover:text-[#A37E2C]">Contact Us</Link>
          <Link to="/safety" className="hover:text-[#A37E2C]">Safety Center</Link>
          <Link to="/report-issue" className="hover:text-[#A37E2C]">Report a Safety Issue</Link>
        </nav>
        <nav className="flex flex-col mb-4">
          <h3 className="font-bold text-lg mb-2 text-[#135B3A]">Features</h3>
          <Link to="/team" className="hover:text-[#A37E2C]">Meet our Team</Link>
          <Link to="/track-order" className="hover:text-[#A37E2C]">Track Order</Link>
          <Link to="/learning" className="hover:text-[#A37E2C]">Learning</Link>
          <Link to="/events" className="hover:text-[#A37E2C]">Events</Link>
        </nav>
        <div className="flex flex-col mb-4">
          <h3 className="font-bold text-lg mb-2 text-[#135B3A]">Get In Touch</h3>
          <form action="" className="flex">
            <input 
              type="email" 
              placeholder="Your Email" 
              className="w-[321px] h-[58px] rounded-l-[5px] pl-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A37E2C]" 
            />
            <button className="bg-[#135B3A] w-[117px] h-[58px] rounded-r-[5px] text-white hover:bg-[#0e4a2f]">
              Send
            </button>
          </form>
        </div>
      </footer>
      <p className="flex items-center justify-center bg-[#135B3A] p-2 text-white">
        George Wood Caskets | All Rights Reserved | Made by
        <a href="https://georgechiemeriechime.netlify.app/" target="blank" className="text-[#A37E2C] pl-1 hover:text-[#d4a041]">
          George Chime
        </a>
      </p>
    </div>
  );
}

export default Footer;
