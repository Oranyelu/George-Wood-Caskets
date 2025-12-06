
function CookiesPolicy() {
  return (
    <div className="min-h-screen font-montserrat pt-24 pb-12 transition-colors duration-300">
      <main className="max-w-[1300px] mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-bold mb-8 text-[#135B3A] dark:text-green-500">Cookies Policy</h1>

        <p className="text-gray-700 dark:text-gray-300 mb-4"><strong>Effective Date: May 5th, 2023.</strong></p>
        <p className="text-gray-600 dark:text-gray-300">
          At George Wood Casket, we respect your privacy and strive to offer you the best browsing experience.
          This Cookies Policy explains how we use cookies and similar tracking technologies on our website.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">1. What are Cookies?</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Cookies are small data files stored on your device when you visit a website.
          They help us improve your user experience by remembering your preferences and ensuring the website functions smoothly.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">2. Types of Cookies We Use</h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-600 dark:text-gray-300">
          <li><strong>Essential Cookies</strong>: Necessary for the website to function properly.</li>
          <li><strong>Performance Cookies</strong>: Collect anonymous data to improve the structure and content of our website.</li>
          <li><strong>Functional Cookies</strong>: Remember choices like language or region.</li>
          <li><strong>Marketing Cookies</strong>: Track browsing habits to deliver tailored advertising.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">3. Managing Cookies</h2>
        <p className="text-gray-600 dark:text-gray-300">
          You can control or delete cookies through your browser settings.
          However, disabling cookies may affect your ability to use certain features on our website.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">4. Updates to This Policy</h2>
        <p className="text-gray-600 dark:text-gray-300">
          We may update this Cookies Policy from time to time. When we do, we will revise the &quot;Effective Date&quot; at the top of this page.
        </p>
      </main>
    </div>
  );
}

export default CookiesPolicy;
