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
      <footer className="flex justify-evenly pt-5 flex-wrap p-6 bg-primary text-white">
        <div className="flex flex-col sm:flex-row sm:justify-evenly text-left w-full">
          {/* Company Info Section */}
          <nav className="flex flex-col mb-6 md:mb-4">
            <h2 className="font-bold text-lg mb-2 text-secondary">
              Company Info
            </h2>
            <Link to="/about-us" className="hover:text-secondary">
              About Us
            </Link>
            <Link to="/get-involved" className="hover:text-secondary">
              Get Involved
            </Link>
            <Link to="/book-of-life" className="hover:text-secondary">
              Customers
            </Link>
            <Link to="/hiring" className="hover:text-secondary">
              We are hiring
            </Link>
          </nav>

          {/* Legal Section */}
          <nav className="flex flex-col mb-6 md:mb-4">
            <h2 className="font-bold text-lg mb-2 text-secondary">Legal</h2>
            <Link to="/terms" className="hover:text-secondary">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-secondary">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="hover:text-secondary">
              Cookies Policy
            </Link>
            <Link to="/accessibility" className="hover:text-secondary">
              Accessibility
            </Link>
          </nav>

          {/* Support Section */}
          <nav className="flex flex-col mb-6 md:mb-4">
            <h2 className="font-bold text-lg mb-2 text-secondary">Support</h2>
            <Link to="/help" className="hover:text-secondary">
              Help Center
            </Link>
            <Link to="/contacts" className="hover:text-secondary">
              Contact Us
            </Link>
            <Link to="/safety" className="hover:text-secondary">
              Safety Center
            </Link>
            <Link to="/report" className="hover:text-secondary">
              Report an Issue
            </Link>
          </nav>

          {/* Features Section */}
          <nav className="flex flex-col mb-6 md:mb-4">
            <h2 className="font-bold text-lg mb-2 text-secondary">Features</h2>
            <Link to="/staff" className="hover:text-secondary">
              Meet our Team
            </Link>
            <Link to="/track-order" className="hover:text-secondary">
              Track Order
            </Link>
            <Link to="/blog" className="hover:text-secondary">
              Articles
            </Link>
            <Link to="/events" className="hover:text-secondary">
              Events
            </Link>
          </nav>

          {/* Contact Form Section */}
          <form
            className="flex flex-col mb-6 md:mb-4 max-w-xs w-full"
            onSubmit={handleSubmit}
          >
            <h2 className="font-bold text-lg mb-2 text-secondary">Contact Us</h2>
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
              className="bg-secondary text-primary font-bold py-2 px-4 rounded hover:bg-yellow-600"
            >
              Send
            </button>
            {isSubmitted && (
              <span className="text-green-300 mt-2">Message sent!</span>
            )}
          </form>
        </div>
      </footer>
      <article className="flex flex-col sm:flex-row text-center justify-around p-4 text-primary">
        <p>George Wood Casket © {new Date().getFullYear()} All Rights Reserved</p>
        <p>
          Powered by
          <a
            href="https://georgechiemeriechime.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary pl-1 hover:text-secondary"
          >
            Ocubyte
          </a>
        </p>
      </article>
    </div>
  );
}

export default Footer;
