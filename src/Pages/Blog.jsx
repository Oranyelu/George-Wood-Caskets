import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Blog() {
  return (
    <div>
      <Header />

      {/* Main content section with margin and padding */}
      <main className="max-w-6xl mx-auto py-12 mt-[70px]">
        <h1 className="text-4xl font-bold mb-8">Our Blog</h1>

        <p>
          Welcome to the George Wood Casket and Furniture blog! Here, we share insights, stories, and resources to help you navigate the difficult 
          journey of saying goodbye to a loved one. Stay informed and inspired by exploring our latest articles.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">Recent Posts</h2>

        {/* Example Blog Post 1 */}
        <div className="border-b mb-8 pb-4">
          <h3 className="text-xl font-semibold mb-2">Understanding the Importance of Pre-Planning</h3>
          <p className="text-gray-600 mb-2">
            Pre-planning your arrangements can relieve your loved ones of the stress of decision-making during difficult times. 
            Learn more about the benefits of planning ahead.
          </p>
          <a href="#" className="text-blue-600 hover:underline">Read More</a>
        </div>

        {/* Example Blog Post 2 */}
        <div className="border-b mb-8 pb-4">
          <h3 className="text-xl font-semibold mb-2">How to Choose the Right Casket</h3>
          <p className="text-gray-600 mb-2">
            Choosing a casket is a significant decision. This article provides guidance on factors to consider when making your selection.
          </p>
          <a href="#" className="text-blue-600 hover:underline">Read More</a>
        </div>

        {/* Example Blog Post 3 */}
        <div className="border-b mb-8 pb-4">
          <h3 className="text-xl font-semibold mb-2">The Role of a Funeral Director</h3>
          <p className="text-gray-600 mb-2">
            A funeral director plays a crucial role in coordinating services. Discover what to expect when working with a funeral professional.
          </p>
          <a href="#" className="text-blue-600 hover:underline">Read More</a>
        </div>

        {/* Add more blog posts as needed */}
      </main>

      <Footer />
    </div>
  );
}

export default Blog;
