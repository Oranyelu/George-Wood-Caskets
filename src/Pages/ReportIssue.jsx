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
    <div>

      <main className="max-w-6xl mx-auto py-12 mt-[70px]">
        <h1 className="text-4xl font-bold mb-8">Report an Issue</h1>

        <p>If you are experiencing any issues with our products or services, we are here to help.</p>

        <h2 className="text-2xl font-bold mt-6 mb-4">Contact Information</h2>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Your Name
            </label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="border border-gray-300 p-2 w-full" />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Your Email
            </label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="border border-gray-300 p-2 w-full" />
          </div>

          <div className="mb-4">
            <label htmlFor="issue" className="block text-sm font-medium mb-1">
              Describe the Issue
            </label>
            <textarea id="issue" name="issue" value={formData.issue} onChange={handleChange} rows="4" required className="border border-gray-300 p-2 w-full"></textarea>
          </div>

          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Submit</button>
        </form>

      </main>
    </div>
  );
}

export default ReportIssue;
