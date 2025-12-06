import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

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
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md h-fit border border-gray-100 dark:border-gray-700 transition-colors">
            <h2 className="text-2xl font-bold text-[#135B3A] dark:text-white mb-6">Get in Touch</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#135B3A]/10 dark:bg-green-900/30 p-3 rounded-full text-[#135B3A] dark:text-green-400">
                  <FaPhone className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-300">08143904414</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#135B3A]/10 dark:bg-green-900/30 p-3 rounded-full text-[#135B3A] dark:text-green-400">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300">georgewoodcasket@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#135B3A]/10 dark:bg-green-900/30 p-3 rounded-full text-[#135B3A] dark:text-green-400">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Location</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    11 Senator Avenue, Opposite Milestone Hospital,<br />
                    Along Old Enugu-Onitsha Express Road.<br />
                    Okwojo Ngwo.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#135B3A]/10 dark:bg-green-900/30 p-3 rounded-full text-[#135B3A] dark:text-green-400">
                  <FaClock className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Business Hours</h3>
                  <ul className="text-gray-600 dark:text-gray-300 text-sm">
                    <li>Monday - Friday: 9 AM - 5 PM (GMT)</li>
                    <li>Saturday: 10 AM - 2 PM (GMT)</li>
                    <li>Sunday: Closed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 transition-colors">
            <h2 className="text-2xl font-bold text-[#135B3A] dark:text-white mb-6">Send us a Message</h2>

            {status.message && (
              <div className={`p-4 mb-6 rounded ${status.type === 'success' ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300'}`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-500"
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
