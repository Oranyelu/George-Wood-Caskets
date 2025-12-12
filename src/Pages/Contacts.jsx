import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { sendContactEmail } from "../utils/api";

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        createdAt: new Date(),
        status: 'new'
      });

      // Send Email Notification
      await sendContactEmail(formData);

      setStatus({ type: 'success', message: 'Thank you! Your message has been sent.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-montserrat pt-24 pb-12 transition-colors duration-300">
      <Helmet>
        <title>Contact Us | George Wood Caskets</title>
        <meta name="description" content="Get in touch with George Wood Caskets. We are here to assist you with your inquiries and orders." />
      </Helmet>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#135B3A] dark:text-green-500 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We are here to support you. Whether you have a question about our products, need assistance with an order, or just want to get in touch, we are ready to listen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="bg-[#F0B52E] p-8 rounded-lg shadow-md h-fit border border-white/10 transition-colors">
            <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-black/20 p-3 rounded-full text-white">
                  <FaPhone className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Phone</h3>
                  <p className="text-white/80">08143904414</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-black/20 p-3 rounded-full text-white">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Email</h3>
                  <p className="text-white/80">georgewoodcasket@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-black/20 p-3 rounded-full text-white">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Location</h3>
                  <p className="text-white/80">
                    11 Senator Avenue, Opposite Milestone Hospital,<br />
                    Along Old Enugu-Onitsha Express Road.<br />
                    Okwojo Ngwo.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-black/20 p-3 rounded-full text-white">
                  <FaClock className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Business Hours</h3>
                  <ul className="text-white/80 text-sm">
                    <li>Monday - Friday: 9 AM - 5 PM (GMT)</li>
                    <li>Saturday: 10 AM - 2 PM (GMT)</li>
                    <li>Sunday: Closed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#F0B52E] p-8 rounded-lg shadow-md border border-white/10 transition-colors">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>

            {status.message && (
              <div className={`p-4 mb-6 rounded ${status.type === 'success' ? 'bg-green-500/20 text-white border border-green-400' : 'bg-red-500/20 text-white border border-red-400'}`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-white mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-white/30 rounded bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-white/30 rounded bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 border border-white/30 rounded bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full p-3 border border-white/30 rounded bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-white"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#135B3A] text-white font-bold py-3 rounded hover:bg-[#0f462c] transition-colors disabled:opacity-50 shadow-md"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
