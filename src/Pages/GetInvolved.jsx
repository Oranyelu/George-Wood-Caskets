import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaCopy, FaHeart, FaCalendarAlt, FaHandsHelping, FaBullhorn } from 'react-icons/fa';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '500px',
    padding: '0',
    border: 'none',
    backgroundColor: 'transparent'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000
  }
};

const ActionCard = ({ icon, title, description, link, buttonText, onClick, colorClass }) => (
  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center group">
    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 text-3xl ${colorClass} bg-opacity-10 dark:bg-opacity-20`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 mb-6 flex-1">
      {description}
    </p>
    {onClick ? (
      <button
        onClick={onClick}
        className="w-full bg-[#135B3A] text-white py-3 rounded-lg font-bold hover:bg-[#0E462D] transition-colors shadow-md"
      >
        {buttonText}
      </button>
    ) : (
      <Link to={link || '#'} className="w-full">
        <button className="w-full bg-[#135B3A] text-white py-3 rounded-lg font-bold hover:bg-[#0E462D] transition-colors shadow-md">
          {buttonText}
        </button>
      </Link>
    )}
  </div>
);

ActionCard.propTypes = {
  icon: PropTypes.element,
  title: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  colorClass: PropTypes.string
};

function GetInvolved() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const websiteUrl = window.location.origin; // Dynamically get base URL
  const shareText = "Check out George Wood Caskets and their amazing community initiatives! Honouring life and legacies.";

  const openShareModal = () => setModalIsOpen(true);
  const closeShareModal = () => {
    setModalIsOpen(false);
    setCopySuccess(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${shareText} ${websiteUrl}`);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const socialLinks = [
    { name: 'WhatsApp', icon: <FaWhatsapp />, url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + websiteUrl)}`, color: 'bg-green-500' },
    { name: 'Facebook', icon: <FaFacebook />, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(websiteUrl)}`, color: 'bg-blue-600' },
    { name: 'Twitter', icon: <FaTwitter />, url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(websiteUrl)}`, color: 'bg-sky-500' },
    { name: 'LinkedIn', icon: <FaLinkedin />, url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(websiteUrl)}&title=${encodeURIComponent('George Wood Caskets')}&summary=${encodeURIComponent(shareText)}`, color: 'bg-blue-700' },
  ];

  return (
    <div className="min-h-screen font-montserrat pt-24 pb-12 transition-colors duration-300">
      <main className="max-w-[1300px] mx-auto px-4 md:px-8">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#135B3A] dark:text-green-500">Get Involved</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Believe in the power of community? Join us in making a difference. Whether through volunteering, attending events, or spreading the word, your involvement matters.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <ActionCard
            icon={<FaHandsHelping className="text-[#135B3A]" />}
            colorClass="bg-[#135B3A] text-[#135B3A]"
            title="Volunteer with Us"
            description="Join our compassionate team. We have various opportunities for you to contribute your time and skills."
            link="/volunteer"
            buttonText="Sign Up to Volunteer"
          />

          <ActionCard
            icon={<FaCalendarAlt className="text-[#A37E2C]" />}
            colorClass="bg-[#A37E2C] text-[#A37E2C]"
            title="Join Our Events"
            description="Participate in our community gatherings, workshops, and memorial services. Connect and find support."
            link="/events"
            buttonText="View Upcoming Events"
          />

          <ActionCard
            icon={<FaBullhorn className="text-blue-600" />}
            colorClass="bg-blue-600 text-blue-600"
            title="Spread the Word"
            description="Help us reach more people. Share our mission and services with your friends, family, and network."
            onClick={openShareModal}
            buttonText="Share Now"
          />

          <ActionCard
            icon={<FaHeart className="text-red-500" />}
            colorClass="bg-red-500 text-red-500"
            title="Make a Donation"
            description="Support our charitable initiatives. Every contribution helps us provide for those in need."
            link="/giving"
            buttonText="Donate Now"
          />

        </div>

        <div className="mt-20 bg-[#F0B52E] rounded-2xl p-8 md:p-12 text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4 text-[#135B3A]">Have Questions?</h2>
          <p className="text-[#011309] text-lg mb-8 max-w-2xl mx-auto">
            We are here to help. If you&apos;re unsure how you can help or need more specific information, don&apos;t hesitate to reach out.
          </p>
          <Link to="/contacts">
            <button className="bg-[#135B3A] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#0E462D] transition-colors shadow-lg">
              Contact Our Team
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
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl relative max-w-md mx-auto">
          <button onClick={closeShareModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white text-2xl">&times;</button>
          <h3 className="text-2xl font-bold mb-2 text-center text-gray-900 dark:text-white">Spread the Word</h3>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-6">Share this link with your friends and family!</p>

          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-6 border border-gray-200 dark:border-gray-700">
            <input
              type="text"
              readOnly
              value={websiteUrl}
              className="bg-transparent w-full outline-none text-gray-600 dark:text-gray-300 text-sm"
            />
            <button onClick={handleCopyLink} className="text-[#135B3A] hover:text-[#0E462D] font-bold p-2">
              {copySuccess ? <span className="text-green-600 text-xs">Copied!</span> : <FaCopy size={20} />}
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
                <div className={`w-12 h-12 ${social.color} text-white rounded-full flex items-center justify-center text-xl shadow-lg transform group-hover:scale-110 transition-transform`}>
                  {social.icon}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </Modal>

    </div>
  );
}

export default GetInvolved;
