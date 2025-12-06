

function WeAreHiring() {
  return (
    <div className="min-h-screen font-montserrat pt-24 pb-12 transition-colors duration-300">

      {/* Main content section with margin and padding */}
      <main className="max-w-[1300px] mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-bold mb-8 text-[#135B3A] dark:text-green-500">We Are Hiring</h1>

        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-3xl">
          At George Wood Casket and Furniture, we are always looking for talented and dedicated individuals
          to join our team. Currently, we have an opening for the position of Sales Manager.
        </p>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 transition-colors">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">Position: Sales Manager</h2>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-[#135B3A] dark:text-green-400">Job Description</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              As a Sales Manager, you will be responsible for leading our sales team, developing strategies to
              drive sales growth, and ensuring the highest level of customer satisfaction.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-[#135B3A] dark:text-green-400">Key Responsibilities</h3>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Develop and implement effective sales strategies.</li>
              <li>Lead and motivate the sales team to achieve targets.</li>
              <li>Analyze sales data and market trends to identify opportunities.</li>
              <li>Build and maintain strong customer relationships.</li>
              <li>Prepare regular sales reports for management.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-[#135B3A] dark:text-green-400">Qualifications</h3>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Bachelor’s degree in Business Administration or related field.</li>
              <li>Proven experience in sales management, preferably in the casket or furniture industry.</li>
              <li>Strong leadership and communication skills.</li>
              <li>Ability to analyze data and make strategic decisions.</li>
              <li>Customer-focused mindset.</li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">How to Apply</h3>
            <p className="text-gray-700 dark:text-gray-300">
              If you are interested in joining our team, please send your resume and a cover letter to:
              <a href="mailto:georgewoodcasket@gmail.com" className="font-bold text-[#135B3A] dark:text-green-500 hover:underline ml-1">georgewoodcasket@gmail.com</a>.
            </p>
          </div>
        </div>

        <p className="text-lg font-medium text-center mt-8 text-gray-700 dark:text-gray-300">
          We look forward to hearing from you!
        </p>
      </main>

    </div>
  );
}

export default WeAreHiring;
