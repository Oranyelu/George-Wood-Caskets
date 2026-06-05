import { useState } from "react";
import { Link } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "messages"), {
        email,
        message,
        createdAt: new Date().toISOString(),
        status: 'unread'
      });

      setIsSubmitted(true);
      setEmail("");
      setMessage("");

      // Reset success message after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Something went wrong, please try again.");
    }
  };

  return (
    <div className="bg-transparent">
      <hr className="border-t-2 border-gray-300 dark:border-white/10" />
      <footer className="flex justify-evenly pt-5 flex-wrap p-6 bg-[#135B3A] text-white transition-colors duration-300">
        <div className="flex flex-col sm:flex-row sm:justify-evenly text-left w-full">
          {/* Company Info Section */}
          <nav className="flex flex-col mb-6 md:mb-4">
            <h2 className="font-bold text-lg mb-2 text-secondary">
              Company Info
            </h2>
            <Link to="/about-us" className="hover:text-secondary">
              About Us
            </Link>
            <Link to="/info/get-involved" className="hover:text-secondary">
              Get Involved
            </Link>
            <Link to="/book-of-life" className="hover:text-secondary">
              Book of Life
            </Link>
            <Link to="/info/hiring" className="hover:text-secondary">
              We are hiring
            </Link>
            <Link to="/bonds" className="hover:text-secondary">
              Bonds
            </Link>
          </nav>

          {/* Legal Section */}
          <nav className="flex flex-col mb-6 md:mb-4">
            <h2 className="font-bold text-lg mb-2 text-secondary">Legal</h2>
            <Link to="/terms-and-conditions" className="hover:text-secondary">
              Terms and Conditions
            </Link>
            <Link to="/privacy-policy" className="hover:text-secondary">
              Privacy Policy
            </Link>
            <Link to="/refund-policy" className="hover:text-secondary">
              Refund Policy
            </Link>
            <Link to="/info/cookies" className="hover:text-secondary">
              Cookies Policy
            </Link>
            <Link to="/info/accessibility" className="hover:text-secondary">
              Accessibility
            </Link>
          </nav>

          {/* Support Section */}
          <nav className="flex flex-col mb-6 md:mb-4">
            <h2 className="font-bold text-lg mb-2 text-secondary">Support</h2>
            <Link to="/info/help" className="hover:text-secondary">
              Help Center
            </Link>
            <Link to="/contacts" className="hover:text-secondary">
              Contact Us
            </Link>
            <Link to="/info/safety" className="hover:text-secondary">
              Safety Center
            </Link>
            <Link to="/info/report" className="hover:text-secondary">
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
            <label htmlFor="contact-email" className="sr-only">Your Email</label>
            <input
              type="email"
              name="email"
              id="contact-email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-2 p-2 rounded text-brand-black bg-white dark:bg-gray-800 dark:text-brand-white dark:border dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-secondary"
              required
            />
            <label htmlFor="contact-message" className="sr-only">Your Message</label>
            <textarea
              name="message"
              id="contact-message"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mb-2 p-2 rounded text-brand-black bg-white dark:bg-gray-800 dark:text-brand-white dark:border dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-secondary"
              required
            />
            <button
              type="submit"
              className="bg-secondary dark:bg-secondary-bronze text-brand-white font-bold py-2 px-4 rounded hover:bg-yellow-600 dark:hover:bg-yellow-700 transition-colors"
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
        <p>George Wood Casket (RC - 8129223) © {new Date().getFullYear()} All Rights Reserved</p>
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
