import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { sendApplicationEmail } from "../utils/api";

const Volunteer = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        interests: '',
        availability: '',
        experience: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Reusing sendApplicationEmail for now, as it sends to admin.
        // Ideally we might want a specific sendVolunteerEmail but this works for "Application" context.
        try {
            await sendApplicationEmail({
                ...formData,
                position: 'Volunteer', // forcing position
                resumeLink: 'N/A',
                coverLetter: `Interests: ${formData.interests}\nAvailability: ${formData.availability}\nExperience: ${formData.experience}`
            });
            setSuccess(true);
        } catch (error) {
            alert("Failed to send application. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
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
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-montserrat">
            <Helmet>
                <title>Volunteer with Us | George Wood Caskets</title>
            </Helmet>

            <div className="max-w-3xl mx-auto px-4">
                <header className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#135B3A] dark:text-green-500 mb-4">
                        Volunteer with Us
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        Join our community of compassionate individuals dedicated to making a difference.
                    </p>
                </header>

                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[#011309] dark:text-white font-semibold mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#135B3A]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[#011309] dark:text-white font-semibold mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#135B3A]"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[#011309] dark:text-white font-semibold mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#135B3A]"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-[#011309] dark:text-white font-semibold mb-2">Areas of Interest</label>
                            <select
                                name="interests"
                                value={formData.interests}
                                onChange={handleChange}
                                className="w-full p-3 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#135B3A]"
                                required
                            >
                                <option value="">Select an Area</option>
                                <option value="Event Planning">Event Planning & Support</option>
                                <option value="Community Outreach">Community Outreach</option>
                                <option value="Administrative Support">Administrative Support</option>
                                <option value="Fundraising">Fundraising</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-[#011309] dark:text-white font-semibold mb-2">Availability</label>
                            <input
                                type="text"
                                name="availability"
                                value={formData.availability}
                                onChange={handleChange}
                                placeholder="e.g. Weekends, Evenings, Mondays"
                                className="w-full p-3 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#135B3A]"
                            />
                        </div>

                        <div>
                            <label className="block text-[#011309] dark:text-white font-semibold mb-2">Previous Experience (Optional)</label>
                            <textarea
                                name="experience"
                                rows="3"
                                value={formData.experience}
                                onChange={handleChange}
                                className="w-full p-3 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#135B3A]"
                                placeholder="Tell us about any relevant skills or past volunteer work..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#135B3A] text-white font-bold py-4 rounded-lg hover:bg-[#0f462c] transition-colors shadow-lg disabled:opacity-50 text-lg"
                        >
                            {loading ? 'Submitting...' : 'Sign Up to Volunteer'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Volunteer;
