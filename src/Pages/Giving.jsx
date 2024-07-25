import React, { useState } from 'react';
import Modal from 'react-modal';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

// Set your Stripe publishable key here
const stripePromise = loadStripe('your-publishable-key-here');

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
  },
};

const CheckoutForm = ({ onClose }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      console.log('Payment Method:', paymentMethod);
      // You can handle further actions with paymentMethod here
      onClose(); // Close the modal after successful payment method creation
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe} className="bg-[#A37E2C] text-white px-6 py-3 rounded-lg text-lg font-semibold mt-5">
        Pay Now
      </button>
    </form>
  );
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
    <div className="bg-custom-gradient min-h-screen flex flex-col font-montserrat mt-16">
      <Header />
      <main className="flex-grow p-10">
        <section className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#A37E2C] mb-2">Support Our Cause</h1>
          <p className="text-lg text-white">Join us in making a difference in our communities through the George Wood Foundation</p>
        </section>

        <section className="bg-white p-10 rounded-lg shadow-lg mb-10">
          <h2 className="text-3xl font-bold text-[#011309] mb-5">About the George Wood Foundation</h2>
          <p className="text-lg mb-5">
            Established in 2024, the George Wood Foundation is dedicated to uplifting and empowering communities across Nigeria. We believe that by working together, we can create lasting change and improve the quality of life for many individuals.
          </p>
          <h3 className="text-2xl font-semibold text-[#A37E2C] mb-2">Our Mission</h3>
          <p className="text-lg mb-5">
            Our mission is to provide educational support, healthcare assistance, and community development initiatives. We aim to create opportunities for growth and self-sufficiency, fostering a brighter future for all.
          </p>
        </section>

        <section className="bg-white p-10 rounded-lg shadow-lg mb-10">
          <h2 className="text-3xl font-bold text-[#011309] mb-5">How Your Donation Helps</h2>
          <ul className="text-lg mb-5 list-disc list-inside">
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

        <section className="bg-white p-10 rounded-lg shadow-lg mb-10">
          <h2 className="text-3xl font-bold text-[#011309] mb-5">Why We Need Your Support</h2>
          <p className="text-lg mb-5">
            The challenges faced by our communities are immense, but with your help, we can make a significant impact. Every donation, no matter the size, brings us closer to achieving our goals and creating a positive change. Your generosity ensures that the George Wood Foundation can continue its vital work and reach more people in need.
          </p>
          <h3 className="text-2xl font-semibold text-[#A37E2C] mb-2">Ways to Give</h3>
          <p className="text-lg mb-5">
            There are several ways you can contribute to our cause:
          </p>
          <ul className="text-lg mb-5 list-disc list-inside">
            <li>One-time donation</li>
            <li>Monthly giving</li>
            <li>Corporate sponsorships</li>
            <li>In-kind donations</li>
          </ul>
          <p className="text-lg mb-5">
            To make a donation, please visit our donation page or contact us for more information on how you can get involved.
          </p>
        </section>

        <section className="bg-white p-10 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold text-[#011309] mb-5">Thank You for Your Support</h2>
          <p className="text-lg mb-5">
            Your generosity is the cornerstone of our work at the George Wood Foundation. Together, we can create a better future for all. Thank you for standing with us and for your commitment to making a difference.
          </p>
          <button onClick={openModal} className="bg-[#A37E2C] text-white px-6 py-3 rounded-lg text-lg font-semibold">Donate Now</button>
        </section>
      </main>
      <Footer />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Donate Now Modal"
      >
        <h2 className="text-2xl font-bold mb-5">Donate Now</h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm onClose={closeModal} />
        </Elements>
        <button onClick={closeModal} className="mt-5 text-[#A37E2C]">Cancel</button>
      </Modal>
    </div>
  );
};

export default Giving;
