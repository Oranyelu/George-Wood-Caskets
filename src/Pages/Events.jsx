

function Events() {
  return (
    <div className="min-h-screen font-montserrat pt-24 pb-12 transition-colors duration-300">
      {/* Main content section with margin and padding */}
      <main className="max-w-[1300px] mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-[#135B3A] dark:text-green-500">Upcoming Events</h1>

        <p className="text-lg text-center max-w-3xl mx-auto mb-12 text-gray-700 dark:text-gray-300">
          Join us for our upcoming events aimed at supporting families and fostering community.
          Stay connected and engaged as we come together to honor and remember loved ones.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-8 text-[#1A1A1A] dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">Our Upcoming Events</h2>

        {/* Example Event 1 */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8 pb-8 last:border-0">
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Annual Memorial Service</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg inline-block border border-gray-100 dark:border-gray-700">
            Date: <strong className="text-gray-900 dark:text-gray-200">Saturday, October 14, 2024</strong><br />
            Time: <strong className="text-gray-900 dark:text-gray-200">2:00 PM - 4:00 PM</strong><br />
            Location: <strong className="text-gray-900 dark:text-gray-200">George Wood Casket & Furniture Hall</strong>
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Join us for a heartfelt service honoring the memories of those we&#39;ve lost.
            All are welcome to participate in this special occasion.
          </p>
          <a href="#" className="text-[#135B3A] dark:text-green-400 font-semibold hover:underline">Learn More</a>
        </div>

        {/* Example Event 2 */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8 pb-8 last:border-0">
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Community Support Workshop</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg inline-block border border-gray-100 dark:border-gray-700">
            Date: <strong className="text-gray-900 dark:text-gray-200">Saturday, November 11, 2024</strong><br />
            Time: <strong className="text-gray-900 dark:text-gray-200">10:00 AM - 12:00 PM</strong><br />
            Location: <strong className="text-gray-900 dark:text-gray-200">George Wood Casket & Furniture Conference Room</strong>
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This workshop will provide resources and support for families navigating grief and loss.
            Led by trained professionals, this is a safe space to share and learn.
          </p>
          <a href="#" className="text-[#135B3A] dark:text-green-400 font-semibold hover:underline">Learn More</a>
        </div>

        {/* Example Event 3 */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8 pb-8 last:border-0">
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Volunteer Appreciation Day</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg inline-block border border-gray-100 dark:border-gray-700">
            Date: <strong className="text-gray-900 dark:text-gray-200">Sunday, December 10, 2024</strong><br />
            Time: <strong className="text-gray-900 dark:text-gray-200">1:00 PM - 5:00 PM</strong><br />
            Location: <strong className="text-gray-900 dark:text-gray-200">George Wood Casket & Furniture Grounds</strong>
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We invite all our volunteers for a day of recognition and appreciation.
            Join us for food, fun, and fellowship as we celebrate your contributions.
          </p>
          <a href="#" className="text-[#135B3A] dark:text-green-400 font-semibold hover:underline">Learn More</a>
        </div>
      </main>
    </div>
  );
}

export default Events;
