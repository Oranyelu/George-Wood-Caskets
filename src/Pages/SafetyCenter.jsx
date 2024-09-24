import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function SafetyCenter() {
  return (
    <div>
      <Header />

      {/* Main content section with margin and padding */}
      <main className="max-w-6xl mx-auto py-12 mt-[70px]">
        <h1 className="text-4xl font-bold mb-8">Safety Center</h1>
        
        <p>
          Welcome to the Safety Center of George Wood Casket. We prioritize your safety and security while 
          using our products and services. Below are important guidelines and resources to ensure a safe experience.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">1. Product Safety Information</h2>
        <p>
          Our caskets are designed and manufactured with the utmost care and attention to detail. 
          Please refer to the specific product guidelines for safety and handling instructions.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">2. Safe Handling Practices</h2>
        <p>
          When handling our caskets, please follow these safety practices:
        </p>
        <ul className="list-disc ml-6">
          <li>Always lift with assistance to avoid injury.</li>
          <li>Ensure the area is clear of obstacles before moving a casket.</li>
          <li>Use proper equipment when necessary to ensure safety.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-6 mb-4">3. Emergency Procedures</h2>
        <p>
          In case of an emergency, please follow these steps:
        </p>
        <ol className="list-decimal ml-6">
          <li>Assess the situation and ensure your safety first.</li>
          <li>Contact emergency services if needed.</li>
          <li>Notify the appropriate personnel if in a professional setting.</li>
        </ol>

        <h2 className="text-2xl font-bold mt-6 mb-4">4. Contact for Safety Concerns</h2>
        <p>
          If you have any safety concerns or questions regarding our products, please reach out to us:
        </p>
        <ul className="list-disc ml-6">
          <li><strong>Email:</strong> georgewoodcasket@gmail.com</li>
          <li><strong>Phone:</strong> 08143904414</li>
        </ul>
      </main>

      <Footer />
    </div>
  );
}

export default SafetyCenter;
