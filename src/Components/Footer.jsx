import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import { API_MODE, createMessage, sendMessageEmail } from "../utils/api";

function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const messageData = {
        name,
        email,
        message,
        createdAt: new Date().toISOString(),
        status: 'unread'
      };

      if (API_MODE === 'backend') {
        await createMessage(messageData);
      } else {
        const { error } = await supabase.from('messages').insert({
          name: messageData.name,
          email: messageData.email,
          message: messageData.message,
          created_at: messageData.createdAt,
          status: 'unread'
        });
        if (error) throw error;
      }

      // Notify admin immediately
      try {
        await sendMessageEmail(messageData);
      } catch (emailErr) {
        console.error("Email notification failed:", emailErr);
      }

      setIsSubmitted(true);
      setName("");
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
      <footer className="pt-12 pb-8 px-6 md:px-12 bg-[#135B3A] text-white transition-colors duration-300">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
          {/* Company Legacy Section */}
          <nav className="flex flex-col gap-3">
            <h2 className="font-serif font-bold text-lg mb-2 text-[#D4AF37]">
              Our Legacy
            </h2>
            <Link to="/about-us" className="text-gray-200 hover:text-[#D4AF37] transition-colors text-sm">
              About Us
            </Link>
            <Link to="/book-of-life" className="text-gray-200 hover:text-[#D4AF37] transition-colors text-sm">
              Book of Life
            </Link>
            <Link to="/bonds" className="text-gray-200 hover:text-[#D4AF37] transition-colors text-sm">
              The George Wood Bond
            </Link>
            <Link to="/charity" className="text-gray-200 hover:text-[#D4AF37] transition-colors text-sm">
              Charity Foundation
            </Link>
          </nav>

          {/* Services Section */}
          <nav className="flex flex-col gap-3">
            <h2 className="font-serif font-bold text-lg mb-2 text-[#D4AF37]">
              Services
            </h2>
            <Link to="/products" className="text-gray-200 hover:text-[#D4AF37] transition-colors text-sm">
              View Collection
            </Link>
            <Link to="/services" className="text-gray-200 hover:text-[#D4AF37] transition-colors text-sm">
              Our Services
            </Link>
            <Link to="/track-order" className="text-gray-200 hover:text-[#D4AF37] transition-colors text-sm">
              Track Order
            </Link>
            <Link to="/blog" className="text-gray-200 hover:text-[#D4AF37] transition-colors text-sm">
              Articles & Updates
            </Link>
          </nav>

          {/* Legal Section */}
          <nav className="flex flex-col gap-3">
            <h2 className="font-serif font-bold text-lg mb-2 text-[#D4AF37]">
              Legal & Support
            </h2>
            <Link to="/terms-and-conditions" className="text-gray-200 hover:text-[#D4AF37] transition-colors text-sm">
              Terms & Conditions
            </Link>
            <Link to="/privacy-policy" className="text-gray-200 hover:text-[#D4AF37] transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/refund-policy" className="text-gray-200 hover:text-[#D4AF37] transition-colors text-sm">
              Refund Policy
            </Link>
            <Link to="/info/cookies" className="text-gray-200 hover:text-[#D4AF37] transition-colors text-sm">
              Cookies Policy
            </Link>
            <Link to="/info/accessibility" className="text-gray-200 hover:text-[#D4AF37] transition-colors text-sm">
              Accessibility Statement
            </Link>
          </nav>

          {/* Contact Form Section */}
          <form
            className="flex flex-col gap-3 max-w-xs w-full"
            onSubmit={handleSubmit}
          >
            <h2 className="font-serif font-bold text-lg mb-2 text-[#D4AF37]">Speak with Us</h2>
            <label htmlFor="contact-name" className="sr-only">Your Name</label>
            <input
              type="text"
              name="name"
              id="contact-name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 rounded-xl text-brand-black bg-white dark:bg-gray-800 dark:text-brand-white dark:border dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-[#8C6A1C] text-sm shadow-sm"
              required
            />
            <label htmlFor="contact-email" className="sr-only">Your Email</label>
            <input
              type="email"
              name="email"
              id="contact-email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-xl text-brand-black bg-white dark:bg-gray-800 dark:text-brand-white dark:border dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-[#8C6A1C] text-sm shadow-sm"
              required
            />
            <label htmlFor="contact-message" className="sr-only">Your Message</label>
            <textarea
              name="message"
              id="contact-message"
              placeholder="Your Message / Request"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-3 rounded-xl text-brand-black bg-white dark:bg-gray-800 dark:text-brand-white dark:border dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-[#8C6A1C] text-sm shadow-sm"
              rows="3"
              required
            />
            <button
              type="submit"
              className="bg-[#A37E2C] text-white font-bold py-3 rounded-xl hover:bg-amber-800 transition-colors shadow-md text-xs uppercase tracking-wider"
            >
              Send Message
            </button>
            {isSubmitted && (
              <span className="text-green-300 text-xs text-center mt-1">Thank you! Message sent with care.</span>
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
