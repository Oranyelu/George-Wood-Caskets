/* eslint-disable react/prop-types, react-refresh/only-export-components */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHandsHelping, FaCalendarAlt, FaBullhorn, FaHeart, FaCopy, FaFacebookF, FaTwitter, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa';
import Modal from 'react-modal';
import { API_MODE, sendReportEmail, sendContactEmail } from './api';
import { db } from '../firebase';

// Bind Modal to #root for accessibility
Modal.setAppElement('#root');

// 1. Action Card Component for Get Involved page
const ActionCard = ({ icon, title, description, link, buttonText, onClick }) => {
  return (
    <div className="bg-brand-card dark:bg-brand-card-dark p-6 rounded-2xl border border-[#135B3A]/10 dark:border-white/5 shadow-md flex flex-col h-full justify-between hover:shadow-lg transition-all duration-300">
      <div>
        <div className="text-4xl mb-4 text-[#135B3A] dark:text-green-500">{icon}</div>
        <h3 className="text-xl font-serif font-bold mb-2 text-brand-black dark:text-brand-white">{title}</h3>
        <p className="text-sm text-brand-black/80 dark:text-gray-300 mb-6 font-light leading-relaxed">{description}</p>
      </div>
      {onClick ? (
        <button onClick={onClick} className="w-full bg-[#135B3A] hover:bg-[#0E462D] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-sm">
          {buttonText}
        </button>
      ) : (
        <Link to={link}>
          <button className="w-full bg-[#135B3A] hover:bg-[#0E462D] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-sm">
            {buttonText}
          </button>
        </Link>
      )}
    </div>
  );
};

// 2. Report Issue Component
const ReportPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', issue: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (API_MODE === 'backend') {
        await sendReportEmail(formData);
      } else {
        const { collection, addDoc } = await import('firebase/firestore');
        await addDoc(collection(db, 'reports'), {
          ...formData,
          createdAt: new Date().toISOString()
        });
      }
      setIsSubmitted(true);
      setFormData({ name: '', email: '', issue: '' });
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center p-4">
        <div className="bg-brand-card dark:bg-brand-card-dark p-8 rounded-2xl shadow-xl text-center max-w-lg w-full border border-[#135B3A]/10 dark:border-white/5">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-green-600 dark:text-green-400">✓</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#135B3A] dark:text-green-500 mb-4">Report Submitted</h1>
          <p className="text-brand-black/80 dark:text-gray-300 mb-6 font-light leading-relaxed">
            Thank you for bringing this to our attention. Our team has received your report and is working to resolve the issue.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-[#135B3A] dark:text-green-500 font-bold hover:underline"
          >
            Submit another report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-montserrat pt-24 pb-12 bg-brand-cream dark:bg-primary-dark transition-colors duration-300">
      <main className="max-w-[1300px] mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-serif font-bold mb-8 text-[#135B3A] dark:text-green-500">Report an Issue</h1>
        <p className="text-brand-black/80 dark:text-gray-300 text-base mb-8 max-w-2xl font-light">
          If you are experiencing any technical bugs or issues with our services, please let us know so we can assist you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-brand-card dark:bg-brand-card-dark p-8 rounded-2xl shadow-md border border-[#135B3A]/10 dark:border-white/5 transition-colors h-fit">
            <h2 className="text-2xl font-serif font-bold mb-4 text-[#135B3A] dark:text-green-500">Contact Information</h2>
            <p className="text-brand-black/80 dark:text-gray-300 mb-6 font-light">You can also reach our support team directly via:</p>
            <ul className="space-y-4 text-brand-black/90 dark:text-gray-200">
              <li className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</span>
                <span className="font-semibold text-sm">georgewoodcasket@gmail.com</span>
              </li>
              <li className="flex flex-col mt-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone</span>
                <span className="font-semibold text-sm">08143904414</span>
              </li>
            </ul>
          </div>

          {/* Form */}
          <div className="bg-brand-card dark:bg-brand-card-dark p-8 rounded-2xl shadow-md border border-[#135B3A]/10 dark:border-white/5 transition-colors">
            <h2 className="text-2xl font-serif font-bold mb-6 text-[#135B3A] dark:text-green-500">Send a Report</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-1 text-brand-black/80 dark:text-gray-300">
                  Your Name
                </label>
                <input
                  type="text" id="name" name="name"
                  value={formData.name} onChange={handleChange} required
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-brand-white dark:bg-[#1a2e23]/30 text-brand-black dark:text-brand-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-600 focus:border-transparent text-sm transition-all"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-1 text-brand-black/80 dark:text-gray-300">
                  Your Email
                </label>
                <input
                  type="email" id="email" name="email"
                  value={formData.email} onChange={handleChange} required
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-brand-white dark:bg-[#1a2e23]/30 text-brand-black dark:text-brand-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-600 focus:border-transparent text-sm transition-all"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label htmlFor="issue" className="block text-sm font-semibold mb-1 text-brand-black/80 dark:text-gray-300">
                  Describe the Issue
                </label>
                <textarea
                  id="issue" name="issue"
                  value={formData.issue} onChange={handleChange} rows="4" required
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-brand-white dark:bg-[#1a2e23]/30 text-brand-black dark:text-brand-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-600 focus:border-transparent text-sm transition-all"
                  placeholder="What is happening?"
                ></textarea>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-[#135B3A] hover:bg-[#0e462c] text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md text-sm uppercase tracking-wider">
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

// 3. Volunteer Application Component
const VolunteerPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (API_MODE === 'backend') {
        await sendContactEmail({
          name: formData.name,
          email: formData.email,
          subject: 'Volunteer Application',
          message: `Phone: ${formData.phone}\n\nMessage: ${formData.message}`
        });
      } else {
        const { collection, addDoc } = await import('firebase/firestore');
        await addDoc(collection(db, 'volunteers'), {
          ...formData,
          createdAt: new Date().toISOString()
        });
      }
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error submitting volunteer details:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-24 pb-12 font-montserrat flex items-center justify-center px-4 bg-brand-cream dark:bg-primary-dark">
        <div className="bg-brand-card dark:bg-brand-card-dark p-8 rounded-2xl shadow-xl text-center max-w-lg w-full border border-[#135B3A]/10 dark:border-white/5">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🤝</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#135B3A] dark:text-green-500 mb-4">Thank You for Volunteering!</h1>
          <p className="text-brand-black/80 dark:text-gray-300 mb-6 font-light leading-relaxed">
            We have received your details. Our team will review your application and get back to you shortly regarding upcoming opportunities.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-[#135B3A] dark:text-green-500 font-bold hover:underline"
          >
            Submit another application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-montserrat pt-24 pb-12 bg-brand-cream dark:bg-primary-dark transition-colors duration-300">
      <main className="max-w-[800px] mx-auto px-4">
        <div className="bg-brand-card dark:bg-brand-card-dark p-8 rounded-2xl shadow-xl border border-[#135B3A]/10 dark:border-white/5 transition-colors">
          <h1 className="text-3xl font-serif font-bold mb-4 text-[#135B3A] dark:text-green-500 text-center">Volunteer Form</h1>
          <p className="text-center text-brand-black/80 dark:text-gray-300 mb-8 font-light max-w-md mx-auto">
            Join our compassionate community service projects and help make a difference.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-1 text-brand-black/80 dark:text-gray-300">
                Your Name
              </label>
              <input
                type="text" id="name" name="name"
                value={formData.name} onChange={handleChange} required
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-brand-white dark:bg-[#1a2e23]/30 text-brand-black dark:text-brand-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-600 focus:border-transparent text-sm transition-all"
                placeholder="Enter your full name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-1 text-brand-black/80 dark:text-gray-300">
                  Email Address
                </label>
                <input
                  type="email" id="email" name="email"
                  value={formData.email} onChange={handleChange} required
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-brand-white dark:bg-[#1a2e23]/30 text-brand-black dark:text-brand-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-600 focus:border-transparent text-sm transition-all"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold mb-1 text-brand-black/80 dark:text-gray-300">
                  Phone Number
                </label>
                <input
                  type="tel" id="phone" name="phone"
                  value={formData.phone} onChange={handleChange} required
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-brand-white dark:bg-[#1a2e23]/30 text-brand-black dark:text-brand-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-600 focus:border-transparent text-sm transition-all"
                  placeholder="Phone number"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-1 text-brand-black/80 dark:text-gray-300">
                Why do you want to volunteer? (Interests / Background)
              </label>
              <textarea
                id="message" name="message"
                value={formData.message} onChange={handleChange} rows="4" required
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-brand-white dark:bg-[#1a2e23]/30 text-brand-black dark:text-brand-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-600 focus:border-transparent text-sm transition-all"
                placeholder="Share a bit about yourself..."
              ></textarea>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-[#135B3A] hover:bg-[#0e462c] text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md text-sm uppercase tracking-wider">
              {isSubmitting ? 'Submitting Details...' : 'Apply to Volunteer'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

// 4. Get Involved Component
const GetInvolvedPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const websiteUrl = window.location.origin;

  const openShareModal = () => setModalIsOpen(true);
  const closeShareModal = () => setModalIsOpen(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(websiteUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const socialLinks = [
    { name: 'Facebook', color: 'bg-blue-600', icon: <FaFacebookF />, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(websiteUrl)}` },
    { name: 'Twitter', color: 'bg-sky-500', icon: <FaTwitter />, url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(websiteUrl)}` },
    { name: 'WhatsApp', color: 'bg-green-500', icon: <FaWhatsapp />, url: `https://api.whatsapp.com/send?text=${encodeURIComponent(websiteUrl)}` },
    { name: 'LinkedIn', color: 'bg-blue-700', icon: <FaLinkedinIn />, url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(websiteUrl)}` },
  ];

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 999
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'transparent',
      border: 'none',
      padding: '0'
    }
  };

  return (
    <div className="min-h-screen font-montserrat pt-24 pb-12 bg-brand-cream dark:bg-primary-dark transition-colors duration-300">
      <main className="max-w-[1300px] mx-auto px-4 md:px-8">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-[#135B3A] dark:text-green-500">Get Involved</h1>
          <p className="text-xl text-brand-black/80 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            Believe in the power of community? Join us in making a difference. Whether through volunteering, attending events, or spreading the word, your involvement matters.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ActionCard
            icon={<FaHandsHelping />}
            title="Volunteer with Us"
            description="Join our compassionate team. We have various opportunities for you to contribute your time and skills."
            link="/info/volunteer"
            buttonText="Sign Up to Volunteer"
          />

          <ActionCard
            icon={<FaCalendarAlt />}
            title="Join Our Events"
            description="Participate in our community gatherings, workshops, and memorial services. Connect and find support."
            link="/events"
            buttonText="View Upcoming Events"
          />

          <ActionCard
            icon={<FaBullhorn />}
            title="Spread the Word"
            description="Help us reach more people. Share our mission and services with your friends, family, and network."
            onClick={openShareModal}
            buttonText="Share Now"
          />

          <ActionCard
            icon={<FaHeart />}
            title="Make a Donation"
            description="Support our charitable initiatives. Every contribution helps us provide for those in need."
            link="/charity"
            buttonText="Donate Now"
          />
        </div>

        <div className="mt-20 bg-brand-card dark:bg-brand-card-dark border border-[#135B3A]/10 dark:border-white/5 rounded-2xl p-8 md:p-12 text-center shadow-xl">
          <h2 className="text-3xl font-serif font-bold mb-4 text-[#135B3A] dark:text-green-500">Have Questions?</h2>
          <p className="text-brand-black/80 dark:text-gray-300 text-lg mb-8 max-w-2xl mx-auto font-light">
            We are here to help. If you&apos;re unsure how you can help or need more specific information, don&apos;t hesitate to reach out.
          </p>
          <Link to="/contacts">
            <button className="bg-[#135B3A] hover:bg-[#0E462D] text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg uppercase tracking-wider text-sm">
              Speak with Our Team
            </button>
          </Link>
        </div>
      </main>

      {/* Share Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeShareModal}
        style={customStyles}
        contentLabel="Share Modal"
      >
        <div className="bg-brand-card dark:bg-brand-card-dark p-8 rounded-2xl shadow-2xl relative max-w-md w-full mx-auto border border-[#135B3A]/15 dark:border-white/5 text-brand-black dark:text-brand-white">
          <button onClick={closeShareModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white text-2xl">&times;</button>
          <h3 className="text-2xl font-serif font-bold mb-2 text-center text-[#135B3A] dark:text-green-500">Spread the Word</h3>
          <p className="text-center text-brand-black/70 dark:text-gray-400 mb-6 font-light text-sm">Share this link with your friends and family!</p>

          <div className="flex items-center gap-2 bg-brand-white dark:bg-gray-800 p-3 rounded-xl mb-6 border border-gray-200 dark:border-gray-700">
            <input
              type="text"
              readOnly
              value={websiteUrl}
              className="bg-transparent w-full outline-none text-brand-black/70 dark:text-gray-300 text-sm font-medium"
            />
            <button onClick={handleCopyLink} className="text-[#135B3A] hover:text-[#0E462D] dark:text-green-500 dark:hover:text-green-400 font-bold p-2 transition-colors">
              {copySuccess ? <span className="text-green-600 dark:text-green-400 text-xs">Copied!</span> : <FaCopy size={18} />}
            </button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group"
              >
                <div className={`w-12 h-12 ${social.color} text-white rounded-full flex items-center justify-center text-lg shadow-md transform group-hover:scale-110 transition-transform duration-300`}>
                  {social.icon}
                </div>
                <span className="text-xs text-brand-black/80 dark:text-gray-400 font-medium">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const infoData = {
  'accessibility': () => (
    <div className="min-h-screen font-montserrat pt-24 pb-12 transition-colors duration-300 bg-brand-cream dark:bg-primary-dark">
      <main className="max-w-[1300px] mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-serif font-bold mb-8 text-[#135B3A] dark:text-green-500">Accessibility Statement</h1>

        <p className="text-brand-black/90 dark:text-gray-300 mb-4"><strong>Effective Date: 24th September, 2024.</strong></p>
        <p className="text-brand-black/80 dark:text-gray-300 leading-relaxed font-light">
          At George Wood Casket, we are committed to ensuring that our website is accessible to all individuals,
          including those with disabilities. We continuously work to enhance the usability and accessibility
          of our site in accordance with industry standards.
        </p>

        <h2 className="text-2xl font-serif font-bold mt-8 mb-4 text-[#135B3A] dark:text-green-400">1. Our Commitment</h2>
        <p className="text-brand-black/80 dark:text-gray-300 leading-relaxed font-light">
          We strive to comply with the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA,
          ensuring individuals of all abilities can navigate, understand, and interact with our website.
        </p>

        <h2 className="text-2xl font-serif font-bold mt-8 mb-4 text-[#135B3A] dark:text-green-400">2. Key Features for Accessibility</h2>
        <ul className="list-disc ml-6 space-y-2 text-brand-black/80 dark:text-gray-300 leading-relaxed font-light">
          <li><strong>Keyboard Navigation</strong>: Fully navigable using a keyboard.</li>
          <li><strong>Text Alternatives</strong>: Alternative text for images and non-text content.</li>
          <li><strong>Contrast and Readability</strong>: High contrast and scalable fonts for readability.</li>
          <li><strong>Form Labels and Instructions</strong>: Clear labels for forms to ensure easy completion.</li>
        </ul>

        <h2 className="text-2xl font-serif font-bold mt-8 mb-4 text-[#135B3A] dark:text-green-400">3. Ongoing Improvement</h2>
        <p className="text-brand-black/80 dark:text-gray-300 leading-relaxed font-light">
          We regularly review our website for accessibility and welcome feedback from our users.
        </p>

        <h2 className="text-2xl font-serif font-bold mt-8 mb-4 text-[#135B3A] dark:text-green-400">4. Contact Us</h2>
        <p className="text-brand-black/80 dark:text-gray-300 mb-2 font-light">
          If you have any difficulty accessing our website, please contact us at:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-brand-black/80 dark:text-gray-300 leading-relaxed font-light">
          <li><strong>Email</strong>: georgewoodcasket@gmail.com</li>
          <li><strong>Phone</strong>: 08143904414</li>
        </ul>
      </main>
    </div>
  ),
  'help': () => (
    <div className="min-h-screen font-montserrat pt-24 pb-12 transition-colors duration-300 bg-brand-cream dark:bg-primary-dark">
      <main className="max-w-[1300px] mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-serif font-bold mb-8 text-[#135B3A] dark:text-green-500">Help Center</h1>

        <p className="text-lg text-brand-black/80 dark:text-gray-300 mb-6 font-light leading-relaxed">
          Welcome to the George Wood Casket Help Center. We&#39;re here to assist you with any inquiries or issues
          you may encounter. Below are common topics that can help you navigate our products and services.
        </p>

        <h2 className="text-2xl font-serif font-bold mt-8 mb-4 text-[#135B3A] dark:text-green-400">1. Frequently Asked Questions (FAQ)</h2>
        <p className="text-brand-black/80 dark:text-gray-300 leading-relaxed font-light">
          Find answers to common questions about our casket options, ordering process, delivery timelines,
          and more. If you can&#39;t find the answer you&#39;re looking for, feel free to contact us directly.
        </p>

        <h2 className="text-2xl font-serif font-bold mt-8 mb-4 text-[#135B3A] dark:text-green-400">2. Order Support</h2>
        <p className="text-brand-black/80 dark:text-gray-300 leading-relaxed font-light">
          Need help with an existing order? Whether it&#39;s tracking your shipment or modifying your order,
          we&#39;re here to help. Please have your order number ready for faster service.
        </p>

        <h2 className="text-2xl font-serif font-bold mt-8 mb-4 text-[#135B3A] dark:text-green-400">3. Payment and Billing</h2>
        <p className="text-brand-black/80 dark:text-gray-300 leading-relaxed font-light">
          Learn more about the payment methods we accept, how to update your payment information, and
          understanding your billing statement. You can also find assistance with refund requests here.
        </p>

        <h2 className="text-2xl font-serif font-bold mt-8 mb-4 text-[#135B3A] dark:text-green-400">4. Product Information</h2>
        <p className="text-brand-black/80 dark:text-gray-300 leading-relaxed font-light">
          Detailed information about our range of caskets and other products can be found here.
          From material descriptions to personalization options, you can explore what fits your needs best.
        </p>

        <h2 className="text-2xl font-serif font-bold mt-8 mb-4 text-[#135B3A] dark:text-green-400">5. Contact Us</h2>
        <p className="text-brand-black/80 dark:text-gray-300 mb-4 font-light">
          If you need further assistance or have a question that hasn&#39;t been answered, don&#39;t hesitate to
          reach out to our support team.
        </p>
        <ul className="list-disc ml-6 text-brand-black/80 dark:text-gray-300 space-y-2 leading-relaxed font-light">
          <li><strong>Email:</strong> georgewoodcasket@gmail.com</li>
          <li><strong>Phone:</strong> 08143904414</li>
          <li><strong>Live Chat:</strong> Available Monday to Friday, 9 AM - 5 PM (GMT) <a href="https://wa.me/message/UFLPIQN2MJHTL1" className="text-[#A37E2C] dark:text-green-500 font-bold hover:underline">Chat Now</a></li>
        </ul>
      </main>
    </div>
  ),
  'report': () => <ReportPage />,
  'safety': () => (
    <div className="min-h-screen font-montserrat pt-24 pb-12 transition-colors duration-300 bg-brand-cream dark:bg-primary-dark">
      <main className="max-w-[1300px] mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-serif font-bold mb-8 text-[#135B3A] dark:text-green-500">Safety Center</h1>

        <p className="text-brand-black/80 dark:text-gray-300 text-lg mb-6 leading-relaxed font-light">
          Welcome to the Safety Center of George Wood Casket. We prioritize your safety and security while
          using our products and services. Below are important guidelines and resources to ensure a safe experience.
        </p>

        <div className="space-y-8">
          <section className="bg-brand-card dark:bg-brand-card-dark p-6 rounded-2xl shadow-sm border border-[#135B3A]/10 dark:border-white/5 transition-colors">
            <h2 className="text-2xl font-serif font-bold mb-4 text-[#135B3A] dark:text-green-400">1. Product Safety Information</h2>
            <p className="text-brand-black/80 dark:text-gray-300 leading-relaxed font-light">
              Our caskets are designed and manufactured with the utmost care and attention to detail.
              Please refer to the specific product guidelines for safety and handling instructions.
            </p>
          </section>

          <section className="bg-brand-card dark:bg-brand-card-dark p-6 rounded-2xl shadow-sm border border-[#135B3A]/10 dark:border-white/5 transition-colors">
            <h2 className="text-2xl font-serif font-bold mb-4 text-[#135B3A] dark:text-green-400">2. Safe Handling Practices</h2>
            <p className="text-brand-black/80 dark:text-gray-300 mb-2 leading-relaxed font-light">
              When handling our caskets, please follow these safety practices:
            </p>
            <ul className="list-disc ml-6 text-brand-black/80 dark:text-gray-300 space-y-2 leading-relaxed font-light">
              <li>Always lift with assistance to avoid injury.</li>
              <li>Ensure the area is clear of obstacles before moving a casket.</li>
              <li>Use proper equipment when necessary to ensure safety.</li>
            </ul>
          </section>

          <section className="bg-brand-card dark:bg-brand-card-dark p-6 rounded-2xl shadow-sm border border-[#135B3A]/10 dark:border-white/5 transition-colors">
            <h2 className="text-2xl font-serif font-bold mb-4 text-[#135B3A] dark:text-green-400">3. Emergency Procedures</h2>
            <p className="text-brand-black/80 dark:text-gray-300 mb-2 leading-relaxed font-light">
              In case of an emergency, please follow these steps:
            </p>
            <ol className="list-decimal ml-6 text-brand-black/80 dark:text-gray-300 space-y-2 leading-relaxed font-light">
              <li>Assess the situation and ensure your safety first.</li>
              <li>Contact emergency services if needed.</li>
              <li>Notify the appropriate personnel if in a professional setting.</li>
            </ol>
          </section>

          <section className="bg-brand-card dark:bg-brand-card-dark p-6 rounded-2xl shadow-sm border border-[#135B3A]/10 dark:border-white/5 transition-colors">
            <h2 className="text-2xl font-serif font-bold mb-4 text-[#135B3A] dark:text-green-400">4. Contact for Safety Concerns</h2>
            <p className="text-brand-black/80 dark:text-gray-300 mb-2 leading-relaxed font-light">
              If you have any safety concerns or questions regarding our products, please reach out to us:
            </p>
            <ul className="list-disc ml-6 text-brand-black/80 dark:text-gray-300 space-y-1 leading-relaxed font-light">
              <li><strong>Email:</strong> georgewoodcasket@gmail.com</li>
              <li><strong>Phone:</strong> 08143904414</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  ),
  'cookies': () => (
    <div className="min-h-screen font-montserrat pt-24 pb-12 transition-colors duration-300 bg-brand-cream dark:bg-primary-dark">
      <main className="max-w-[1300px] mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-serif font-bold mb-8 text-[#135B3A] dark:text-green-500">Cookies Policy</h1>

        <p className="text-brand-black/90 dark:text-gray-300 mb-4"><strong>Effective Date: May 5th, 2023.</strong></p>
        <p className="text-brand-black/80 dark:text-gray-300 leading-relaxed font-light">
          At George Wood Casket, we respect your privacy and strive to offer you the best browsing experience.
          This Cookies Policy explains how we use cookies and similar tracking technologies on our website.
        </p>

        <h2 className="text-2xl font-serif font-bold mt-8 mb-4 text-[#135B3A] dark:text-green-400">1. What are Cookies?</h2>
        <p className="text-brand-black/80 dark:text-gray-300 leading-relaxed font-light">
          Cookies are small data files stored on your device when you visit a website.
          They help us improve your user experience by remembering your preferences and ensuring the website functions smoothly.
        </p>

        <h2 className="text-2xl font-serif font-bold mt-8 mb-4 text-[#135B3A] dark:text-green-400">2. Types of Cookies We Use</h2>
        <ul className="list-disc ml-6 space-y-2 text-brand-black/80 dark:text-gray-300 leading-relaxed font-light">
          <li><strong>Essential Cookies</strong>: Necessary for the website to function properly.</li>
          <li><strong>Performance Cookies</strong>: Collect anonymous data to improve the structure and content of our website.</li>
          <li><strong>Functional Cookies</strong>: Remember choices like language or region.</li>
          <li><strong>Marketing Cookies</strong>: Track browsing habits to deliver tailored advertising.</li>
        </ul>

        <h2 className="text-2xl font-serif font-bold mt-8 mb-4 text-[#135B3A] dark:text-green-400">3. Managing Cookies</h2>
        <p className="text-brand-black/80 dark:text-gray-300 leading-relaxed font-light">
          You can control or delete cookies through your browser settings.
          However, disabling cookies may affect your ability to use certain features on our website.
        </p>

        <h2 className="text-2xl font-serif font-bold mt-8 mb-4 text-[#135B3A] dark:text-green-400">4. Updates to This Policy</h2>
        <p className="text-brand-black/80 dark:text-gray-300 leading-relaxed font-light">
          We may update this Cookies Policy from time to time. When we do, we will revise the &quot;Effective Date&quot; at the top of this page.
        </p>
      </main>
    </div>
  ),
  'volunteer': () => <VolunteerPage />,
  'hiring': () => (
    <div className="min-h-screen font-montserrat pt-24 pb-12 transition-colors duration-300 bg-brand-cream dark:bg-primary-dark">
      <main className="max-w-[1300px] mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-serif font-bold mb-8 text-[#135B3A] dark:text-green-500">We Are Hiring</h1>

        <p className="text-lg text-brand-black/80 dark:text-gray-300 mb-8 max-w-3xl leading-relaxed font-light">
          At George Wood Casket and Furniture, we are always looking for talented and dedicated individuals
          to join our team. Currently, we have an opening for the position of Sales Manager.
        </p>

        <div className="bg-brand-card dark:bg-brand-card-dark p-8 rounded-2xl shadow-xl border border-[#135B3A]/10 dark:border-white/5 transition-colors duration-300">
          <h2 className="text-2xl font-serif font-bold mb-6 text-[#135B3A] dark:text-green-500 border-b border-[#135B3A]/10 dark:border-white/5 pb-2">Position: Sales Manager</h2>

          <div className="mb-6">
            <h3 className="text-lg font-serif font-bold mb-2 text-[#A37E2C]">Job Description</h3>
            <p className="text-brand-black/80 dark:text-gray-300 leading-relaxed font-light">
              As a Sales Manager, you will be responsible for leading our sales team, developing strategies to
              drive sales growth, and ensuring the highest level of customer satisfaction.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-serif font-bold mb-2 text-[#A37E2C]">Key Responsibilities</h3>
            <ul className="list-disc ml-6 space-y-2 text-brand-black/80 dark:text-gray-300 leading-relaxed font-light">
              <li>Develop and implement effective sales strategies.</li>
              <li>Lead and motivate the sales team to achieve targets.</li>
              <li>Analyze sales data and market trends to identify opportunities.</li>
              <li>Build and maintain strong customer relationships.</li>
              <li>Prepare regular sales reports for management.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-serif font-bold mb-2 text-[#A37E2C]">Qualifications</h3>
            <ul className="list-disc ml-6 space-y-2 text-brand-black/80 dark:text-gray-300 leading-relaxed font-light">
              <li>Bachelor’s degree in Business Administration or related field.</li>
              <li>Proven experience in sales management, preferably in the casket or furniture industry.</li>
              <li>Strong leadership and communication skills.</li>
              <li>Ability to analyze data and make strategic decisions.</li>
              <li>Customer-focused mindset.</li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-[#135B3A]/10 dark:border-white/5">
            <h3 className="text-lg font-serif font-bold mb-2 text-[#A37E2C]">How to Apply</h3>
            <p className="text-brand-black/80 dark:text-gray-300 font-light">
              If you are interested in joining our team, please send your resume and a cover letter to:
              <a href="mailto:georgewoodcasket@gmail.com" className="font-bold text-[#135B3A] dark:text-green-500 hover:underline ml-1">georgewoodcasket@gmail.com</a>.
            </p>
          </div>
        </div>

        <p className="text-lg font-medium text-center mt-8 text-brand-black/90 dark:text-gray-300">
          We look forward to hearing from you!
        </p>
      </main>
    </div>
  ),
  'get-involved': () => <GetInvolvedPage />,
  'giving': () => null
};
