

function SafetyCenter() {
  return (
    <div className="min-h-screen font-montserrat pt-24 pb-12 transition-colors duration-300">

      {/* Main content section with margin and padding */}
      <main className="max-w-[1300px] mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-bold mb-8 text-[#135B3A] dark:text-green-500">Safety Center</h1>

        <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
          Welcome to the Safety Center of George Wood Casket. We prioritize your safety and security while
          using our products and services. Below are important guidelines and resources to ensure a safe experience.
        </p>

        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">1. Product Safety Information</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Our caskets are designed and manufactured with the utmost care and attention to detail.
              Please refer to the specific product guidelines for safety and handling instructions.
            </p>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">2. Safe Handling Practices</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              When handling our caskets, please follow these safety practices:
            </p>
            <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Always lift with assistance to avoid injury.</li>
              <li>Ensure the area is clear of obstacles before moving a casket.</li>
              <li>Use proper equipment when necessary to ensure safety.</li>
            </ul>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">3. Emergency Procedures</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              In case of an emergency, please follow these steps:
            </p>
            <ol className="list-decimal ml-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Assess the situation and ensure your safety first.</li>
              <li>Contact emergency services if needed.</li>
              <li>Notify the appropriate personnel if in a professional setting.</li>
            </ol>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">4. Contact for Safety Concerns</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              If you have any safety concerns or questions regarding our products, please reach out to us:
            </p>
            <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li><strong>Email:</strong> georgewoodcasket@gmail.com</li>
              <li><strong>Phone:</strong> 08143904414</li>
            </ul>
          </section>
        </div>
      </main>

    </div>
  );
}

export default SafetyCenter;
