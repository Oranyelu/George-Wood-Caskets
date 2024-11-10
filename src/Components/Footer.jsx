import React, { useState } from "react";
import { Link } from "react-router-dom";
import GeorgeWoodLogo from "../assets/svgs/George-wood.svg";

function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make a POST request to send the email and message to the backend API
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          message,
          recipient: "georgewoodcasket@gmail.com",
        }), // Added recipient
      });

      if (response.ok) {
        setIsSubmitted(true);
        setEmail("");
        setMessage("");
      } else {
        alert("Something went wrong, please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="bg-transparent">
      <main className="p-6 bg-[#135B3A] flex flex-col md:flex-row justify-evenly md:items-center">
        <img src={GeorgeWoodLogo} alt="George Wood Logo" className="w-60" />
        <div className="flex flex-col text-white text-sm">
          <h1 className="font-bold">Est. Since 1984</h1>
          <p>Celebrating Life and Legacy</p>
        </div>
      </main>
      <hr className="border-t-2 border-gray-300" />
      <footer className="flex justify-evenly pt-5 flex-wrap p-6 bg-gray-100 text-gray-700">
        <div className="flex flex-col md:flex-row md:justify-evenly text-left w-full">
          {/* Company Info Section */}
          <nav className="flex flex-col mb-6 md:mb-4">
            <h2 className="font-bold text-lg mb-2 text-[#135B3A]">
              Company Info
            </h2>
            <Link to="/about-us" className="hover:text-[#A37E2C]">
              About Us
            </Link>
            <Link to="/get-involved" className="hover:text-[#A37E2C]">
              Get Involved
            </Link>
            <Link to="/book-of-life" className="hover:text-[#A37E2C]">
              Customers
            </Link>
            <Link to="/hiring" className="hover:text-[#A37E2C]">
              We are hiring
            </Link>
          </nav>

          {/* Legal Section */}
          <nav className="flex flex-col mb-6 md:mb-4">
            <h2 className="font-bold text-lg mb-2 text-[#135B3A]">Legal</h2>
            <Link to="/terms" className="hover:text-[#A37E2C]">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-[#A37E2C]">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="hover:text-[#A37E2C]">
              Cookies Policy
            </Link>
            <Link to="/accessibility" className="hover:text-[#A37E2C]">
              Accessibility
            </Link>
          </nav>

          {/* Support Section */}
          <nav className="flex flex-col mb-6 md:mb-4">
            <h2 className="font-bold text-lg mb-2 text-[#135B3A]">Support</h2>
            <Link to="/help" className="hover:text-[#A37E2C]">
              Help Center
            </Link>
            <Link to="/contacts" className="hover:text-[#A37E2C]">
              Contact Us
            </Link>
            <Link to="/safety" className="hover:text-[#A37E2C]">
              Safety Center
            </Link>
            <Link to="/report" className="hover:text-[#A37E2C]">
              Report an Issue
            </Link>
          </nav>

          {/* Features Section */}
          <nav className="flex flex-col mb-6 md:mb-4">
            <h2 className="font-bold text-lg mb-2 text-[#135B3A]">Features</h2>
            <Link to="/staff" className="hover:text-[#A37E2C]">
              Meet our Team
            </Link>
            <Link to="/track-order" className="hover:text-[#A37E2C]">
              Track Order
            </Link>
            <Link to="/blog" className="hover:text-[#A37E2C]">
              Articles
            </Link>
            <Link to="/events" className="hover:text-[#A37E2C]">
              Events
            </Link>
          </nav>
        </div>
      </footer>
      <article className="flex flex-col md:flex-row text-center justify-around bg-[#135B3A] p-4 text-white">
        <p>George Wood Casket and Furniture</p>
        <p>© {new Date().getFullYear()} All Rights Reserved</p>
        <p>
          Made by
          <a
            href="https://georgechiemeriechime.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white pl-1 hover:text-[#d4a041]"
          >
            George Chime
          </a>
        </p>
      </article>
    </div>
  );
}

export default Footer;
