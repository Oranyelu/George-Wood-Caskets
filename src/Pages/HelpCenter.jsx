

function HelpCenter() {
  return (
    <div className="min-h-screen font-montserrat pt-24 pb-12 transition-colors duration-300">

      {/* Main content section with margin and padding */}
      <main className="max-w-[1300px] mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-bold mb-8 text-[#135B3A] dark:text-green-500">Help Center</h1>

        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Welcome to the George Wood Casket Help Center. We&#39;re here to assist you with any inquiries or issues
          you may encounter. Below are common topics that can help you navigate our products and services.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">1. Frequently Asked Questions (FAQ)</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Find answers to common questions about our casket options, ordering process, delivery timelines,
          and more. If you can&#39;t find the answer you&#39;re looking for, feel free to contact us directly.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">2. Order Support</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Need help with an existing order? Whether it&#39;s tracking your shipment or modifying your order,
          we&#39;re here to help. Please have your order number ready for faster service.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">3. Payment and Billing</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Learn more about the payment methods we accept, how to update your payment information, and
          understanding your billing statement. You can also find assistance with refund requests here.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">4. Product Information</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Detailed information about our range of caskets and other products can be found here.
          From material descriptions to personalization options, you can explore what fits your needs best.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">5. Contact Us</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          If you need further assistance or have a question that hasn&#39;t been answered, don&#39;t hesitate to
          reach out to our support team.
        </p>
        <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 space-y-2">
          <li><strong>Email:</strong> georgewoodcasket@gmail.com</li>
          <li><strong>Phone:</strong> 08143904414</li>
          <li><strong>Live Chat:</strong> Available Monday to Friday, 9 AM - 5 PM (GMT) <a href="https://wa.me/message/UFLPIQN2MJHTL1" className='text-[#D4AF37] hover:underline'>Chat Now</a></li>
        </ul>
      </main>

    </div>
  );
}

export default HelpCenter;
