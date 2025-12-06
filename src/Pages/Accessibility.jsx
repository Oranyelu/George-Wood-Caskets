
function Accessibility() {
  return (
    <div className="min-h-screen font-montserrat pt-24 pb-12 transition-colors duration-300">
      <main className="max-w-[1300px] mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-bold mb-8 text-[#135B3A] dark:text-green-500">Accessibility Statement</h1>

        <p className="text-gray-700 dark:text-gray-300 mb-4"><strong>Effective Date: 24th September, 2024.</strong></p>
        <p className="text-gray-600 dark:text-gray-300">
          At George Wood Casket, we are committed to ensuring that our website is accessible to all individuals,
          including those with disabilities. We continuously work to enhance the usability and accessibility
          of our site in accordance with industry standards.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">1. Our Commitment</h2>
        <p className="text-gray-600 dark:text-gray-300">
          We strive to comply with the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA,
          ensuring individuals of all abilities can navigate, understand, and interact with our website.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">2. Key Features for Accessibility</h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-600 dark:text-gray-300">
          <li><strong>Keyboard Navigation</strong>: Fully navigable using a keyboard.</li>
          <li><strong>Text Alternatives</strong>: Alternative text for images and non-text content.</li>
          <li><strong>Contrast and Readability</strong>: High contrast and scalable fonts for readability.</li>
          <li><strong>Form Labels and Instructions</strong>: Clear labels for forms to ensure easy completion.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">3. Ongoing Improvement</h2>
        <p className="text-gray-600 dark:text-gray-300">
          We regularly review our website for accessibility and welcome feedback from our users.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">4. Contact Us</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          If you have any difficulty accessing our website, please contact us at:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-600 dark:text-gray-300">
          <li><strong>Email</strong>: georgewoodcasket@gmail.com</li>
          <li><strong>Phone</strong>: 08143904414</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">5. Updates to This Statement</h2>
        <p className="text-gray-600 dark:text-gray-300">
          We may update this Accessibility Statement as needed to reflect improvements or changes in web standards.
        </p>
      </main>
    </div>
  );
}

export default Accessibility;
