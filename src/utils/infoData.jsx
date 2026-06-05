import { Link } from 'react-router-dom';

export const infoData = {
  'accessibility': () => (
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
  ),
  'help': () => (
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
  ),
  'report': () => (
<div className="min-h-screen font-montserrat pt-24 pb-12 transition-colors duration-300">

      <main className="max-w-[1300px] mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-bold mb-8 text-[#135B3A] dark:text-green-500">Report an Issue</h1>

        <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">If you are experiencing any issues with our products or services, we are here to help.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-[#F0B52E] p-8 rounded-lg shadow-md border border-white/10 transition-colors h-fit">
            <h2 className="text-2xl font-bold mb-4 text-white">Contact Information</h2>
            <p className="text-white/90 mb-4">You can also reach us via:</p>
            <ul className="space-y-4">
              <li className="flex flex-col">
                <span className="font-bold text-white">Email</span>
                <span className="text-white/80">georgewoodcasket@gmail.com</span>
              </li>
              <li className="flex flex-col">
                <span className="font-bold text-white">Phone</span>
                <span className="text-white/80">08143904414</span>
              </li>
            </ul>
          </div>

          {/* Form */}
          <div className="bg-[#F0B52E] p-8 rounded-lg shadow-md border border-white/10 transition-colors">
            <h2 className="text-2xl font-bold mb-6 text-white">Send a Report</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-bold mb-1 text-white">
                  Your Name
                </label>
                <input
                  type="text" id="name" name="name"
                  value={formData.name} onChange={handleChange} required
                  className="p-3 border border-white/30 rounded bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-white w-full"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold mb-1 text-white">
                  Your Email
                </label>
                <input
                  type="email" id="email" name="email"
                  value={formData.email} onChange={handleChange} required
                  className="p-3 border border-white/30 rounded bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-white w-full"
                />
              </div>

              <div>
                <label htmlFor="issue" className="block text-sm font-bold mb-1 text-white">
                  Describe the Issue
                </label>
                <textarea
                  id="issue" name="issue"
                  value={formData.issue} onChange={handleChange} rows="4" required
                  className="p-3 border border-white/30 rounded bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-white w-full"
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-[#135B3A] hover:bg-[#0f462c] text-white font-bold py-3 px-4 rounded transition-colors shadow-md border border-white/20">
                Submit Report
              </button>
            </form>
          </div>
        </div>

      </main>
    </div>
  ),
  'safety': () => (
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
  ),
  'cookies': () => (
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
  ),
  'volunteer': () => (
<div className="min-h-screen pt-24 pb-12 font-montserrat flex items-center justify-center px-4">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl text-center max-w-lg w-full border border-gray-100 dark:border-gray-700">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">🤝</span>
                    </div>
                    <h1 className="text-2xl font-bold text-[#135B3A] dark:text-green-500 mb-4">Thank You for Volunteering!</h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        We have received your details. Our team will review your application and get back to you shortly regarding upcoming opportunities.
                    </p>
                    <button
                        onClick={() => setSuccess(false)}
                        className="text-[#135B3A] font-bold hover:underline"
                    >
                        Submit another application
                    </button>
                </div>
            </div>
  ),
  'hiring': () => (
<div className="min-h-screen font-montserrat pt-24 pb-12 transition-colors duration-300">

      {/* Main content section with margin and padding */}
      <main className="max-w-[1300px] mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-bold mb-8 text-[#135B3A] dark:text-green-500">We Are Hiring</h1>

        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-3xl">
          At George Wood Casket and Furniture, we are always looking for talented and dedicated individuals
          to join our team. Currently, we have an opening for the position of Sales Manager.
        </p>

        <div className="bg-[#F0B52E] p-8 rounded-lg shadow-md border border-white/10 transition-colors">
          <h2 className="text-2xl font-bold mb-4 text-white border-b border-white/20 pb-2">Position: Sales Manager</h2>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-white">Job Description</h3>
            <p className="text-white/90 leading-relaxed">
              As a Sales Manager, you will be responsible for leading our sales team, developing strategies to
              drive sales growth, and ensuring the highest level of customer satisfaction.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-white">Key Responsibilities</h3>
            <ul className="list-disc ml-6 space-y-2 text-white/90">
              <li>Develop and implement effective sales strategies.</li>
              <li>Lead and motivate the sales team to achieve targets.</li>
              <li>Analyze sales data and market trends to identify opportunities.</li>
              <li>Build and maintain strong customer relationships.</li>
              <li>Prepare regular sales reports for management.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-white">Qualifications</h3>
            <ul className="list-disc ml-6 space-y-2 text-white/90">
              <li>Bachelor’s degree in Business Administration or related field.</li>
              <li>Proven experience in sales management, preferably in the casket or furniture industry.</li>
              <li>Strong leadership and communication skills.</li>
              <li>Ability to analyze data and make strategic decisions.</li>
              <li>Customer-focused mindset.</li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20">
            <h3 className="text-xl font-semibold mb-2 text-white">How to Apply</h3>
            <p className="text-white/90">
              If you are interested in joining our team, please send your resume and a cover letter to:
              <a href="mailto:georgewoodcasket@gmail.com" className="font-bold text-white hover:underline ml-1">georgewoodcasket@gmail.com</a>.
            </p>
          </div>
        </div>

        <p className="text-lg font-medium text-center mt-8 text-gray-700 dark:text-gray-300">
          We look forward to hearing from you!
        </p>
      </main>

    </div>
  ),
  'get-involved': () => (
<div className="min-h-screen font-montserrat pt-24 pb-12 transition-colors duration-300">
      <main className="max-w-[1300px] mx-auto px-4 md:px-8">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#135B3A] dark:text-green-500">Get Involved</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Believe in the power of community? Join us in making a difference. Whether through volunteering, attending events, or spreading the word, your involvement matters.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <ActionCard
            icon={<FaHandsHelping className="text-[#135B3A]" />}
            colorClass="bg-[#135B3A] text-[#135B3A]"
            title="Volunteer with Us"
            description="Join our compassionate team. We have various opportunities for you to contribute your time and skills."
            link="/volunteer"
            buttonText="Sign Up to Volunteer"
          />

          <ActionCard
            icon={<FaCalendarAlt className="text-[#A37E2C]" />}
            colorClass="bg-[#A37E2C] text-[#A37E2C]"
            title="Join Our Events"
            description="Participate in our community gatherings, workshops, and memorial services. Connect and find support."
            link="/events"
            buttonText="View Upcoming Events"
          />

          <ActionCard
            icon={<FaBullhorn className="text-blue-600" />}
            colorClass="bg-blue-600 text-blue-600"
            title="Spread the Word"
            description="Help us reach more people. Share our mission and services with your friends, family, and network."
            onClick={openShareModal}
            buttonText="Share Now"
          />

          <ActionCard
            icon={<FaHeart className="text-red-500" />}
            colorClass="bg-red-500 text-red-500"
            title="Make a Donation"
            description="Support our charitable initiatives. Every contribution helps us provide for those in need."
            link="/giving"
            buttonText="Donate Now"
          />

        </div>

        <div className="mt-20 bg-[#F0B52E] rounded-2xl p-8 md:p-12 text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4 text-[#135B3A]">Have Questions?</h2>
          <p className="text-[#011309] text-lg mb-8 max-w-2xl mx-auto">
            We are here to help. If you&apos;re unsure how you can help or need more specific information, don&apos;t hesitate to reach out.
          </p>
          <Link to="/contacts">
            <button className="bg-[#135B3A] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#0E462D] transition-colors shadow-lg">
              Contact Our Team
            </button>
          </Link>
        </div>

      </main>

      {/* Share Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeShareModal}
        style={customStyles}
        contentLabel="Share Modal"
      >
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl relative max-w-md mx-auto">
          <button onClick={closeShareModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white text-2xl">&times;</button>
          <h3 className="text-2xl font-bold mb-2 text-center text-gray-900 dark:text-white">Spread the Word</h3>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-6">Share this link with your friends and family!</p>

          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-6 border border-gray-200 dark:border-gray-700">
            <input
              type="text"
              readOnly
              value={websiteUrl}
              className="bg-transparent w-full outline-none text-gray-600 dark:text-gray-300 text-sm"
            />
            <button onClick={handleCopyLink} className="text-[#135B3A] hover:text-[#0E462D] font-bold p-2">
              {copySuccess ? <span className="text-green-600 text-xs">Copied!</span> : <FaCopy size={20} />}
            </button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group"
              >
                <div className={`w-12 h-12 ${social.color} text-white rounded-full flex items-center justify-center text-xl shadow-lg transform group-hover:scale-110 transition-transform`}>
                  {social.icon}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </Modal>

    </div>
  ),
  'giving': () => (
) => unsubscribe(
  ),
};
