import { useState } from 'react';
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
    textAlign: 'center',
  },
};

const Giving = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className="min-h-screen flex flex-col font-montserrat pt-24 pb-12 transition-colors duration-300">
      <main className="max-w-[1300px] mx-auto px-4 md:px-8 flex-grow">
        <section className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#A37E2C] dark:text-yellow-500 mb-2">Support Our Cause</h1>
          <p className="text-lg text-gray-800 dark:text-gray-300">Join us in making a difference in our communities through the George Wood Charity Foundation.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-[#011309] dark:text-white mb-5">About the George Wood Charity Foundation</h2>
          <p className="text-lg mb-5 text-gray-800 dark:text-gray-300">
            Established in 2024, the George Wood Charity Foundation is dedicated to uplifting and empowering communities across Nigeria. We believe that by working together, we can create lasting change and improve the quality of life for many individuals.
          </p>
          <h3 className="text-2xl font-semibold text-[#A37E2C] dark:text-yellow-500 mb-2">Our Mission</h3>
          <p className="text-lg mb-5 text-gray-800 dark:text-gray-300">
            Our mission is to provide educational support, healthcare assistance, and community development initiatives. We aim to create opportunities for growth and self-sufficiency, fostering a brighter future for all.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-[#011309] dark:text-white mb-5">How Your Donation Helps</h2>
          <ul className="text-lg mb-5 list-disc list-inside text-gray-800 dark:text-gray-300">
            <li>
              <strong>Educational Support:</strong> Your donations fund scholarships, educational materials, and resources for underprivileged children, ensuring they have the tools to succeed.
            </li>
            <li>
              <strong>Healthcare Assistance:</strong> Contributions help us provide medical aid, health screenings, and awareness programs in underserved areas, improving overall community health.
            </li>
            <li>
              <strong>Community Development:</strong> Your support enables us to engage in sustainable development projects, enhancing living conditions and creating economic opportunities.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-[#011309] dark:text-white mb-5">Why We Need Your Support</h2>
          <p className="text-lg mb-5 text-gray-800 dark:text-gray-300">
            The challenges faced by our communities are immense, but with your help, we can make a significant impact. Every donation, no matter the size, brings us closer to achieving our goals and creating a positive change. Your generosity ensures that the George Wood Charity Foundation can continue its vital work and reach more people in need.
          </p>
          <h3 className="text-2xl font-semibold text-[#A37E2C] dark:text-yellow-500 mb-2">Ways to Give</h3>
          <p className="text-lg mb-5 text-gray-800 dark:text-gray-300">
            There are several ways you can contribute to our cause:
          </p>
          <ul className="text-lg mb-5 list-disc list-inside text-gray-800 dark:text-gray-300">
            <li>One-time donation</li>
            <li>Monthly giving</li>
            <li>Corporate sponsorships</li>
            <li>In-kind donations</li>
          </ul>
          <p className="text-lg mb-5 text-gray-800 dark:text-gray-300">
            To make a donation, please contact us for more information on how you can get involved.
          </p>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold text-[#011309] dark:text-white mb-5">Thank You for Your Support</h2>
          <p className="text-lg mb-5 text-gray-800 dark:text-gray-300">
            Your generosity is the cornerstone of our work at the George Wood Charity Foundation. Together, we can create a better future for all. Thank you for standing with us and for your commitment to making a difference.
          </p>
          <button onClick={openModal} className="bg-[#A37E2C] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#8c6b25] transition-colors">Donate Now</button>
        </section>
      </main>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Donate Now Modal"
        className="bg-white dark:bg-gray-800 p-8 rounded-lg outline-none max-w-lg mx-auto mt-20 shadow-xl border border-gray-100 dark:border-gray-700"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start overflow-y-auto"
      >
        <h2 className="text-2xl font-bold mb-5 text-gray-900 dark:text-white">Make a Donation</h2>
        <p className="text-lg mb-5 text-gray-700 dark:text-gray-300">
          Thank you for your generosity! Please make your donations to the account below:
        </p>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-5 text-left">
          <p className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Account Name: <span className="font-normal">George Chime</span></p>
          <p className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Account Number: <span className="font-normal font-mono">2198210889</span></p>
          <p className="text-lg font-semibold mb-0 text-gray-900 dark:text-white">Bank: <span className="font-normal">United Bank for Africa (UBA)</span></p>
        </div>
        <p className="text-lg mb-5 text-gray-700 dark:text-gray-300">
          Your contribution helps us continue our vital work in supporting communities. Together, we can make a difference!
        </p>
        <button onClick={closeModal} className="bg-[#A37E2C] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#8c6b25] transition-colors w-full">Close</button>
      </Modal>
    </div>
  );
};

export default Giving;
