import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function ReportIssue() {
  return (
    <div>
      <Header />

      {/* Main content section with margin and padding */}
      <main className="max-w-6xl mx-auto py-12 mt-[70px]">
        <h1 className="text-4xl font-bold mb-8">Report an Issue</h1>

        <p>
          If you are experiencing any issues with our products or services, we are here to help. Please fill 
          out the form below, and our support team will get back to you as soon as possible.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">Contact Information</h2>
        <p>
          Please provide your contact details so we can reach out to you regarding your issue.
        </p>
        
        <form className="mt-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
            <input type="text" id="name" name="name" required className="border border-gray-300 p-2 w-full" />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Your Email</label>
            <input type="email" id="email" name="email" required className="border border-gray-300 p-2 w-full" />
          </div>

          <div className="mb-4">
            <label htmlFor="issue" className="block text-sm font-medium mb-1">Describe the Issue</label>
            <textarea id="issue" name="issue" rows="4" required className="border border-gray-300 p-2 w-full"></textarea>
          </div>

          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Submit</button>
        </form>

        <h2 className="text-2xl font-bold mt-6 mb-4">Alternative Contact Methods</h2>
        <p>
          If you prefer to contact us directly, you can reach out via phone or email:
        </p>
        <ul className="list-disc ml-6">
          <li><strong>Email:</strong> georgewoodcasket@gmail.com</li>
          <li><strong>Phone:</strong> 08143904414</li>
        </ul>
      </main>

      <Footer />
    </div>
  );
}

export default ReportIssue;
