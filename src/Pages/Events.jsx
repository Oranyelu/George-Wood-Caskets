import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Events() {
  return (
    <div>
      <Header />

      {/* Main content section with margin and padding */}
      <main className="max-w-6xl mx-auto py-12 mt-[70px]">
        <h1 className="text-4xl font-bold mb-8">Upcoming Events</h1>

        <p>
          Join us for our upcoming events aimed at supporting families and fostering community. 
          Stay connected and engaged as we come together to honor and remember loved ones.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">Our Upcoming Events</h2>

        {/* Example Event 1 */}
        <div className="border-b mb-8 pb-4">
          <h3 className="text-xl font-semibold mb-2">Annual Memorial Service</h3>
          <p className="text-gray-600 mb-2">
            Date: <strong>Saturday, October 14, 2024</strong><br />
            Time: <strong>2:00 PM - 4:00 PM</strong><br />
            Location: <strong>George Wood Casket & Furniture Hall</strong>
          </p>
          <p>
            Join us for a heartfelt service honoring the memories of those we've lost. 
            All are welcome to participate in this special occasion.
          </p>
          <a href="#" className="text-blue-600 hover:underline">Learn More</a>
        </div>

        {/* Example Event 2 */}
        <div className="border-b mb-8 pb-4">
          <h3 className="text-xl font-semibold mb-2">Community Support Workshop</h3>
          <p className="text-gray-600 mb-2">
            Date: <strong>Saturday, November 11, 2024</strong><br />
            Time: <strong>10:00 AM - 12:00 PM</strong><br />
            Location: <strong>George Wood Casket & Furniture Conference Room</strong>
          </p>
          <p>
            This workshop will provide resources and support for families navigating grief and loss. 
            Led by trained professionals, this is a safe space to share and learn.
          </p>
          <a href="#" className="text-blue-600 hover:underline">Learn More</a>
        </div>

        {/* Example Event 3 */}
        <div className="border-b mb-8 pb-4">
          <h3 className="text-xl font-semibold mb-2">Volunteer Appreciation Day</h3>
          <p className="text-gray-600 mb-2">
            Date: <strong>Sunday, December 10, 2024</strong><br />
            Time: <strong>1:00 PM - 5:00 PM</strong><br />
            Location: <strong>George Wood Casket & Furniture Grounds</strong>
          </p>
          <p>
            We invite all our volunteers for a day of recognition and appreciation. 
            Join us for food, fun, and fellowship as we celebrate your contributions.
          </p>
          <a href="#" className="text-blue-600 hover:underline">Learn More</a>
        </div>

        {/* Add more events as needed */}
      </main>

      <Footer />
    </div>
  );
}

export default Events;
