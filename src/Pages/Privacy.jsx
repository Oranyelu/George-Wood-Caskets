import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function PrivacyPolicy() {
  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto py-12 mt-[70px]">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <p>
          At George Wood Casket and Furniture, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and disclose your information when you use our website.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">1. Information We Collect</h2>
        <p>
          We may collect the following information from you:
          <ul className="list-disc list-inside mt-2">
            <li>Personal identification information (such as your name, email address, and phone number).</li>
            <li>Payment and billing information when you make a purchase.</li>
            <li>Technical data such as your IP address, browser type, and operating system.</li>
          </ul>
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">2. How We Use Your Information</h2>
        <p>
          We use the information we collect to:
          <ul className="list-disc list-inside mt-2">
            <li>Process your orders and provide customer support.</li>
            <li>Send you updates about our services and promotional offers.</li>
            <li>Improve our website’s functionality and user experience.</li>
          </ul>
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">3. Sharing Your Information</h2>
        <p>
          We do not sell, trade, or rent your personal information to third parties. However, we may share your information with trusted third parties who assist us in operating our website and conducting our business, as long as these parties agree to keep your information confidential.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">4. Cookies</h2>
        <p>
          We use cookies to improve your experience on our site. Cookies are small data files stored on your device to track your usage of our site. You can opt to disable cookies through your browser settings, though doing so may limit certain functionality.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">5. Data Security</h2>
        <p>
          We take data security seriously and implement various measures to protect your personal information. However, no method of transmission over the internet is entirely secure, and we cannot guarantee absolute security.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">6. Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal information. If you wish to exercise these rights, please contact us at support@georgewoodcasket.com.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">7. Changes to This Policy</h2>
        <p>
          We reserve the right to modify this Privacy Policy at any time. Any changes will be posted on this page, and your continued use of our site signifies your acceptance of the updated policy.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">8. Contact Information</h2>
        <p>
          If you have any questions regarding this Privacy Policy, please contact us at support@georgewoodcasket.com.
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
