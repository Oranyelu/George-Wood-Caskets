import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function WeAreHiring() {
  return (
    <div>
      <Header />

      {/* Main content section with margin and padding */}
      <main className="max-w-6xl mx-auto py-12 mt-[70px]">
        <h1 className="text-4xl font-bold mb-8">We Are Hiring</h1>

        <p>
          At George Wood Casket and Furniture, we are always looking for talented and dedicated individuals 
          to join our team. Currently, we have an opening for the position of Sales Manager.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">Position: Sales Manager</h2>
        
        <h3 className="text-xl font-semibold mt-4 mb-2">Job Description</h3>
        <p>
          As a Sales Manager, you will be responsible for leading our sales team, developing strategies to 
          drive sales growth, and ensuring the highest level of customer satisfaction.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">Key Responsibilities</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>Develop and implement effective sales strategies.</li>
          <li>Lead and motivate the sales team to achieve targets.</li>
          <li>Analyze sales data and market trends to identify opportunities.</li>
          <li>Build and maintain strong customer relationships.</li>
          <li>Prepare regular sales reports for management.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4 mb-2">Qualifications</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>Bachelor’s degree in Business Administration or related field.</li>
          <li>Proven experience in sales management, preferably in the casket or furniture industry.</li>
          <li>Strong leadership and communication skills.</li>
          <li>Ability to analyze data and make strategic decisions.</li>
          <li>Customer-focused mindset.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4 mb-2">How to Apply</h3>
        <p>
          If you are interested in joining our team, please send your resume and a cover letter to: 
          <strong> georgewoodcasket@gmail.com</strong>.
        </p>

        <p>
          We look forward to hearing from you!
        </p>
      </main>

      <Footer />
    </div>
  );
}

export default WeAreHiring;
