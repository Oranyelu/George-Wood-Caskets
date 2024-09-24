import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function TermsOfService() {
  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto py-12 mt-[70px]">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

        <p>
          Welcome to George Wood Casket and Furniture. By accessing or using our website (georgewoodcasket.com),
          you agree to be bound by these terms of service (the “Terms”). If you do not agree to these terms, you may not access or use the site.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">1. Use of the Site</h2>
        <p>
          You agree to use our site only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit the use and enjoyment of the site by any third party. You are prohibited from posting or transmitting to or from this site any material that is unlawful, threatening, defamatory, or obscene.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">2. Product Orders and Purchases</h2>
        <p>
          By placing an order with George Wood Casket and Furniture, you agree to provide true, accurate, current, and complete information about yourself. Any orders placed through the site are subject to acceptance by us. We reserve the right to refuse or cancel any order.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">3. Payment Terms</h2>
        <p>
          All payments made through our website are subject to verification and acceptance. You agree to pay for all charges and fees incurred in connection with your purchase. We reserve the right to cancel or reject any order or payment at our discretion.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">4. Intellectual Property</h2>
        <p>
          All content on this website, including text, graphics, logos, and images, is the property of George Wood Casket and Furniture. You are not permitted to use any content without our prior written permission.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">5. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, George Wood Casket and Furniture shall not be liable for any damages arising out of your use of the website or services provided. This includes, but is not limited to, direct, indirect, incidental, punitive, and consequential damages.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">6. Changes to Terms</h2>
        <p>
          We reserve the right to modify or replace these Terms at any time. Any changes will be posted on this page, and it is your responsibility to review the terms periodically. Your continued use of the site after any changes indicates your acceptance of the new terms.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">7. Contact Information</h2>
        <p>
          If you have any questions about these Terms, please contact us at support@georgewoodcasket.com.
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default TermsOfService;
