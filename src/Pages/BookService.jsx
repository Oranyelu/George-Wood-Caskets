import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { sendBookingEmail } from "../utils/api";

const BookService = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Decode serviceId from URL if present (e.g. "funeral-planning")
    // or just use it directly. Assuming simple string for now.
    const initialServiceName = serviceId ? serviceId.replace(/-/g, ' ').toUpperCase() : '';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        serviceName: initialServiceName,
        date: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await sendBookingEmail(formData);
            alert("Booking request sent successfully! We will contact you shortly.");
            navigate('/');
        } catch (error) {
            alert("Failed to send booking request. Please try again or contact us directly.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-montserrat">
            <Helmet>
                <title>Book a Service | George Wood Caskets</title>
            </Helmet>

            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-[#F0B52E] rounded-xl shadow-2xl overflow-hidden">
                    <div className="p-8">
                        <h1 className="text-3xl font-bold text-[#135B3A] mb-2 text-center">Book a Service</h1>
                        <p className="text-[#011309] text-center mb-8">
                            Please fill out the form below to request a service.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-[#011309] font-semibold mb-2">Service Type</label>
                                <input
                                    type="text"
                                    name="serviceName"
                                    value={formData.serviceName}
                                    onChange={handleChange}
                                    placeholder="e.g. Funeral Planning"
                                    className="w-full p-3 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#135B3A]"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[#011309] font-semibold mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full p-3 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#135B3A]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#011309] font-semibold mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full p-3 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#135B3A]"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[#011309] font-semibold mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#135B3A]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-[#011309] font-semibold mb-2">Preferred Date (Optional)</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#135B3A]"
                                />
                            </div>

                            <div>
                                <label className="block text-[#011309] font-semibold mb-2">Additional Details</label>
                                <textarea
                                    name="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#135B3A]"
                                    placeholder="Please describe your needs..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#135B3A] text-white font-bold py-4 rounded-lg hover:bg-[#0f462c] transition-colors shadow-lg disabled:opacity-50 text-lg"
                            >
                                {loading ? 'Submitting Request...' : 'Book Service'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookService;
