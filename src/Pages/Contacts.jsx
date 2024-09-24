import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Contacts() {
  return (
    <div>
      <Header />

      {/* Main content section with margin and padding */}
      <main className="max-w-6xl mx-auto py-12 mt-[70px]">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        
        <p>
          We would love to hear from you! Please feel free to reach out using the contact information below.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">Get in Touch</h2>
        <p>
          You can contact us via phone or email. Our team is ready to assist you with any inquiries or concerns you may have.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">Phone:</h3>
        <p>08143904414</p>

        <h3 className="text-xl font-semibold mt-4 mb-2">Email:</h3>
        <p>georgewoodcasket@gmail.com</p>

        <h2 className="text-2xl font-bold mt-6 mb-4">Business Hours</h2>
        <p>
          Our customer service team is available to assist you during the following hours:
        </p>
        <ul className="list-disc ml-6">
          <li>Monday - Friday: 9 AM - 5 PM (GMT)</li>
          <li>Saturday: 10 AM - 2 PM (GMT)</li>
          <li>Sunday: Closed</li>
        </ul>

        <h2 className="text-2xl font-bold mt-6 mb-4">Location</h2>
        <p>
          [Insert Business Address Here]
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">Feedback</h2>
        <p>
          We value your feedback and suggestions! Feel free to send us your thoughts via email.
        </p>
      </main>

      <Footer />
    </div>
  );
}

export default Contacts;
