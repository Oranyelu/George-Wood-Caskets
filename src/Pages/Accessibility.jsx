import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Accessibility() {
  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto py-12 mt-[70px]">
        <h1 className="text-4xl font-bold mb-8">Accessibility Statement</h1>

        <p><strong>Effective Date: 24th September, 2024.</strong></p>
        <p>
          At George Wood Casket, we are committed to ensuring that our website is accessible to all individuals, 
          including those with disabilities. We continuously work to enhance the usability and accessibility 
          of our site in accordance with industry standards.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">1. Our Commitment</h2>
        <p>
          We strive to comply with the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA, 
          ensuring individuals of all abilities can navigate, understand, and interact with our website.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">2. Key Features for Accessibility</h2>
        <ul className="list-disc ml-6">
          <li><strong>Keyboard Navigation</strong>: Fully navigable using a keyboard.</li>
          <li><strong>Text Alternatives</strong>: Alternative text for images and non-text content.</li>
          <li><strong>Contrast and Readability</strong>: High contrast and scalable fonts for readability.</li>
          <li><strong>Form Labels and Instructions</strong>: Clear labels for forms to ensure easy completion.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-6 mb-4">3. Ongoing Improvement</h2>
        <p>
          We regularly review our website for accessibility and welcome feedback from our users.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">4. Contact Us</h2>
        <p>
          If you have any difficulty accessing our website, please contact us at:
        </p>
        <ul className="list-disc ml-6">
          <li><strong>Email</strong>: georgewoodcasket@gmail.com</li>
          <li><strong>Phone</strong>: 08143904414</li>
        </ul>

        <h2 className="text-2xl font-bold mt-6 mb-4">5. Updates to This Statement</h2>
        <p>
          We may update this Accessibility Statement as needed to reflect improvements or changes in web standards.
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default Accessibility;
