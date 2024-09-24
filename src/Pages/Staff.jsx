import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Staff() {
  return (
    <div>
      <Header />

      {/* Main content section with margin and padding */}
      <main className="max-w-6xl mx-auto py-12 mt-[70px]">
        <h1 className="text-4xl font-bold mb-8">Our Staff</h1>

        <p>
          At George Wood Casket and Furniture, we pride ourselves on having a dedicated and talented team. 
          Our staff is committed to providing exceptional service and ensuring customer satisfaction.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">Meet Our Team</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Staff Member 1 */}
          <div className="border p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">John Doe</h3>
            <p className="text-gray-600">Sales Manager</p>
            <p className="mt-2">
              John has over 10 years of experience in the funeral service industry. He is passionate about helping families find the right casket for their loved ones.
            </p>
          </div>

          {/* Staff Member 2 */}
          <div className="border p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">Jane Smith</h3>
            <p className="text-gray-600">Customer Service Representative</p>
            <p className="mt-2">
              Jane is dedicated to ensuring that every customer receives the highest level of service. She is here to answer your questions and assist with any concerns.
            </p>
          </div>

          {/* Staff Member 3 */}
          <div className="border p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">Michael Johnson</h3>
            <p className="text-gray-600">Operations Manager</p>
            <p className="mt-2">
              Michael oversees the day-to-day operations of our business, ensuring that everything runs smoothly and efficiently.
            </p>
          </div>

          {/* Add more staff members as needed */}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Staff;
