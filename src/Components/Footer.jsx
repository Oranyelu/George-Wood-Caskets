import { useState } from "react";
import { Link } from "react-router-dom";

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
      <hr className="border-t-2 border-gray-300" />
      <footer className="flex justify-evenly pt-5 flex-wrap p-6 bg-[#135B3A] text-white">
        <div className="flex flex-col sm:flex-row sm:justify-evenly text-left w-full">
          {/* Company Info Section */}
          <nav className="flex flex-col mb-6 md:mb-4">
            <h2 className="font-bold text-lg mb-2 text-[#f0c068]">
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
            <h2 className="font-bold text-lg mb-2 text-[#f0c068]">Legal</h2>
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
            <h2 className="font-bold text-lg mb-2 text-[#f0c068]">Support</h2>
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
            <h2 className="font-bold text-lg mb-2 text-[#f0c068]">Features</h2>
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

          {/* Contact Form Section */}
          <form
            className="flex flex-col mb-6 md:mb-4 max-w-xs w-full"
            onSubmit={handleSubmit}
          >
            <h2 className="font-bold text-lg mb-2 text-[#f0c068]">Contact Us</h2>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-2 p-2 rounded text-black bg-white"
              required
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mb-2 p-2 rounded text-black bg-white"
              required
            />
            <button
              type="submit"
              className="bg-[#f0c068] text-[#135B3A] font-bold py-2 px-4 rounded hover:bg-[#d4a041]"
            >
              Send
            </button>
            {isSubmitted && (
              <span className="text-green-300 mt-2">Message sent!</span>
            )}
          </form>
        </div>
      </footer>
      <article className="flex flex-col sm:flex-row text-center justify-around p-4 text-[#135B3A]">
        <p>George Wood Casket © {new Date().getFullYear()} All Rights Reserved</p>
        <p>
          Powered by
          <a
            href="https://georgechiemeriechime.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#135B3A] pl-1 hover:text-[#d4a041]"
          >
            Ocubyte
          </a>
        </p>
      </article>
    </div>
  );
}

export default Footer;
