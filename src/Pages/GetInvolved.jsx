

function GetInvolved() {
  return (
    <div className="min-h-screen font-montserrat pt-24 pb-12 transition-colors duration-300">

      {/* Main content section with margin and padding */}
      <main className="max-w-[1300px] mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-bold mb-8 text-[#135B3A] dark:text-green-500">Get Involved</h1>

        <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
          At George Wood Casket and Furniture, we believe in the power of community and the importance of supporting one another during difficult times.
          There are several ways you can get involved and make a difference.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Ways to Get Involved</h2>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
            <h3 className="text-xl font-semibold mb-2 text-[#135B3A] dark:text-white">1. Volunteer with Us</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We are always looking for compassionate volunteers to help us in various capacities.
              If you are interested in volunteering, please reach out to us for more information.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
            <h3 className="text-xl font-semibold mb-2 text-[#135B3A] dark:text-white">2. Join Our Events</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Participate in our community events to support families in need and honor the lives of those we have lost.
              Keep an eye on our events page for upcoming opportunities.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
            <h3 className="text-xl font-semibold mb-2 text-[#135B3A] dark:text-white">3. Spread the Word</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Help us spread awareness about our services and the importance of planning ahead.
              Share our website and resources with your friends and family.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
            <h3 className="text-xl font-semibold mb-2 text-[#135B3A] dark:text-white">4. Donations</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Consider making a donation to support our mission. Your contributions help us provide quality services to families during their time of need.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Contact Us</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          If you have any questions or would like to get involved, please reach out to us:
        </p>
        <ul className="list-disc ml-6 mb-4 text-gray-700 dark:text-gray-300 space-y-1">
          <li><strong>Email:</strong> georgewoodcasket@gmail.com</li>
          <li><strong>Phone:</strong> 08143904414</li>
        </ul>

        <p className="text-lg font-medium text-[#135B3A] dark:text-green-400 mt-6">
          We look forward to working together to make a positive impact in our community!
        </p>
      </main>

    </div>
  );
}

export default GetInvolved;
