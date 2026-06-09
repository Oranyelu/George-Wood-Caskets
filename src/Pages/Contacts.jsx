import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { sendContactEmail } from "../utils/api";
import ScrollReveal from "../Components/ScrollReveal";

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

      setStatus({ type: 'success', message: 'Thank you! Your message has been sent with care.' });
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
        <title>Speak with Us | George Wood Caskets</title>
        <meta name="description" content="Reach out to George Wood Caskets. We are here to support you with our professional and compassionate care." />
      </Helmet>
      <div className="container mx-auto px-4 max-w-[1300px]">
        <ScrollReveal className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#135B3A] dark:text-green-500 mb-4">Speak with Us</h1>
          <p className="text-lg text-brand-black/80 dark:text-gray-300 max-w-2xl mx-auto font-light">
            We are here to walk with you through every step. Whether you have questions about our products, need guidance on The George Wood Bond, or just want to speak, our compassionate team is here to listen.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <ScrollReveal className="bg-brand-card dark:bg-brand-card-dark p-8 md:p-10 rounded-3xl shadow-lg border border-[#135B3A]/10 dark:border-white/5 transition-colors text-brand-black dark:text-brand-white h-fit">
            <h2 className="text-2xl font-serif font-bold text-primary dark:text-green-400 mb-8">Get in Touch</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#135B3A]/10 dark:bg-white/10 p-3 rounded-full text-[#135B3A] dark:text-green-400">
                  <FaPhone className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#8C6A1C] dark:text-yellow-400 uppercase tracking-wider">Phone</h3>
                  <p className="text-brand-black/85 dark:text-gray-300 mt-1">08143904414</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#135B3A]/10 dark:bg-white/10 p-3 rounded-full text-[#135B3A] dark:text-green-400">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#8C6A1C] dark:text-yellow-400 uppercase tracking-wider">Email</h3>
                  <p className="text-brand-black/85 dark:text-gray-300 mt-1">georgewoodcasket@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#135B3A]/10 dark:bg-white/10 p-3 rounded-full text-[#135B3A] dark:text-green-400">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#8C6A1C] dark:text-yellow-400 uppercase tracking-wider">Location</h3>
                  <p className="text-brand-black/85 dark:text-gray-300 mt-1 leading-relaxed">
                    11 Senator Avenue, Opposite Milestone Hospital,<br />
                    Along Old Enugu-Onitsha Express Road.<br />
                    Okwojo Ngwo, Enugu.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#135B3A]/10 dark:bg-white/10 p-3 rounded-full text-[#135B3A] dark:text-green-400">
                  <FaClock className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#8C6A1C] dark:text-yellow-400 uppercase tracking-wider">Support Hours</h3>
                  <ul className="text-brand-black/85 dark:text-gray-300 mt-1 text-sm space-y-1">
                    <li>Monday - Friday: 9 AM - 5 PM (GMT)</li>
                    <li>Saturday: 10 AM - 2 PM (GMT)</li>
                    <li>Sunday: Closed</li>
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal className="bg-brand-card dark:bg-brand-card-dark p-8 md:p-10 rounded-3xl shadow-lg border border-[#135B3A]/10 dark:border-white/5 transition-colors text-brand-black dark:text-brand-white">
            <h2 className="text-2xl font-serif font-bold text-primary dark:text-green-400 mb-6">Send us a Message</h2>

            {status.message && (
              <div className={`p-4 mb-6 rounded-xl text-sm ${status.type === 'success' ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-400/30' : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-400/30'}`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-black/70 dark:text-gray-300 uppercase tracking-wider mb-1">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3.5 border border-gray-200 dark:border-gray-700/50 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-black/70 dark:text-gray-300 uppercase tracking-wider mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3.5 border border-gray-200 dark:border-gray-700/50 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-black/70 dark:text-gray-300 uppercase tracking-wider mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3.5 border border-gray-200 dark:border-gray-700/50 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-black/70 dark:text-gray-300 uppercase tracking-wider mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-3.5 border border-gray-200 dark:border-gray-700/50 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm shadow-sm"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#135B3A] hover:bg-[#0E462D] text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-50 shadow-md text-sm uppercase tracking-wider"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
