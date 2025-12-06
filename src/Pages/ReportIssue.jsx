import { useState } from 'react';


function ReportIssue() {
  const [formData, setFormData] = useState({ name: '', email: '', issue: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://george-wood-backend.vercel.app/api/ContactUs.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="min-h-screen font-montserrat pt-24 pb-12 transition-colors duration-300">

      <main className="max-w-[1300px] mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-bold mb-8 text-[#135B3A] dark:text-green-500">Report an Issue</h1>

        <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">If you are experiencing any issues with our products or services, we are here to help.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 transition-colors h-fit">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Contact Information</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">You can also reach us via:</p>
            <ul className="space-y-4">
              <li className="flex flex-col">
                <span className="font-bold text-[#135B3A] dark:text-green-400">Email</span>
                <span className="text-gray-700 dark:text-gray-300">georgewoodcasket@gmail.com</span>
              </li>
              <li className="flex flex-col">
                <span className="font-bold text-[#135B3A] dark:text-green-400">Phone</span>
                <span className="text-gray-700 dark:text-gray-300">08143904414</span>
              </li>
            </ul>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 transition-colors">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send a Report</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-300">
                  Your Name
                </label>
                <input
                  type="text" id="name" name="name"
                  value={formData.name} onChange={handleChange} required
                  className="p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-500 w-full"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-300">
                  Your Email
                </label>
                <input
                  type="email" id="email" name="email"
                  value={formData.email} onChange={handleChange} required
                  className="p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-500 w-full"
                />
              </div>

              <div>
                <label htmlFor="issue" className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-300">
                  Describe the Issue
                </label>
                <textarea
                  id="issue" name="issue"
                  value={formData.issue} onChange={handleChange} rows="4" required
                  className="p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-500 w-full"
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-[#135B3A] hover:bg-[#0f462c] text-white font-bold py-3 px-4 rounded transition-colors shadow-md">
                Submit Report
              </button>
            </form>
          </div>
        </div>

      </main>
    </div>
  );
}

export default ReportIssue;
