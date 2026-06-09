import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Modal from 'react-modal';
import { sendBondInquiryEmail } from "../utils/api";
import ScrollReveal from "../Components/ScrollReveal";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FAF7F0',
        border: 'none',
        borderRadius: '20px',
        padding: '2.5rem',
        maxWidth: '550px',
        width: '90%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    overlay: {
        backgroundColor: 'rgba(6, 16, 11, 0.85)',
        zIndex: 1000,
        backdropFilter: 'blur(4px)'
    }
};

Modal.setAppElement('#root');

const Bonds = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedBond, setSelectedBond] = useState('');
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', message: ''
    });

    const openModal = (bondType) => {
        setSelectedBond(bondType);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await sendBondInquiryEmail({
                ...formData,
                bondType: selectedBond
            });
            alert("Your inquiry has been sent with care. Our team will speak with you shortly.");
            closeModal();
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            alert("Failed to send inquiry. Please try again or call us directly.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen font-sans pt-28 pb-20 transition-colors duration-300">
            <Helmet>
                <title>The George Wood Bond | Funeral Pre-Planning & Peace of Mind</title>
                <meta name="description" content="Secure an honorable farewell and shield your family from sudden burdens. Subscribe to The George Wood Bond, our monthly pre-need funeral arrangement plan." />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "The George Wood Bond",
                        "provider": {
                            "@type": "FuneralService",
                            "name": "George Wood Caskets",
                            "url": "https://georgewoodcasket.com"
                        },
                        "description": "Monthly pre-need funeral subscription plan providing families with peace of mind by arranging and funding caskets, transportation, and memorial services ahead of time.",
                        "offers": [
                            {
                                "@type": "Offer",
                                "name": "Legacy Plan",
                                "price": "15000",
                                "priceCurrency": "NGN",
                                "description": "Essential funeral pre-planning and solid wood casket coverage."
                            },
                            {
                                "@type": "Offer",
                                "name": "Honor Plan",
                                "price": "30000",
                                "priceCurrency": "NGN",
                                "description": "Premium hand-carved mahogany casket, hearse, and memorial live-stream."
                            },
                            {
                                "@type": "Offer",
                                "name": "Imperial Plan",
                                "price": "60000",
                                "priceCurrency": "NGN",
                                "description": "Luxury custom bronze/hardwood casket, royal convoy, permanent memorial site, and custom video tribute."
                            }
                        ]
                    })}
                </script>
            </Helmet>

            <div className="max-w-[1300px] mx-auto px-6 md:px-10">
                {/* Hero Header */}
                <ScrollReveal className="text-center mb-16 max-w-4xl mx-auto">
                    <span className="text-[#8C6A1C] dark:text-yellow-400 text-sm font-bold uppercase tracking-widest block mb-3">
                        Introducing a Legacy of Peace
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#135B3A] dark:text-green-500 mb-6 leading-tight">
                        The George Wood Bond
                    </h1>
                    <div className="h-1 w-24 bg-[#8C6A1C] dark:bg-yellow-400 mx-auto mb-8 rounded-full"></div>
                    <p className="text-lg md:text-xl text-brand-black/80 dark:text-gray-200 leading-relaxed font-light">
                        None of us can escape the passage of time, but we can choose how we prepare for it. The George Wood Bond is a monthly pre-planning plan designed to shield your family from the sudden emotional and financial weight of funeral arrangements. By planning ahead today, you guarantee that you or your loved ones receive a highly dignified, honorable farewell without burdening those left behind.
                    </p>
                </ScrollReveal>

                {/* Plan Tiers */}
                <ScrollReveal className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
                    {/* Legacy Plan */}
                    <div className="bg-brand-card dark:bg-brand-card-dark p-8 md:p-10 rounded-3xl shadow-lg border border-[#135B3A]/10 dark:border-white/5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-[#135B3A] dark:text-green-400 mb-2">Legacy Plan</h2>
                            <p className="text-xs text-[#8C6A1C] dark:text-yellow-400 font-bold uppercase tracking-wider mb-6">Essential Dignity</p>
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-brand-black dark:text-brand-white">₦15,000</span>
                                <span className="text-sm text-brand-black/60 dark:text-gray-400 font-light"> / month</span>
                            </div>
                            <p className="text-brand-black/80 dark:text-gray-300 text-sm mb-6 leading-relaxed">
                                A simple and reliable way to ensure a respectful farewell. Perfect for securing essential needs and professional care.
                            </p>
                            <ul className="space-y-3 mb-8 text-sm text-brand-black/75 dark:text-gray-400 border-t border-[#135B3A]/10 dark:border-white/10 pt-6">
                                <li className="flex items-center gap-2">✓ Solid wood casket selection</li>
                                <li className="flex items-center gap-2">✓ Professional embalming & preparation</li>
                                <li className="flex items-center gap-2">✓ Hearse transportation logistics</li>
                                <li className="flex items-center gap-2">✓ Dedicated memorial planner</li>
                            </ul>
                        </div>
                        <button
                            onClick={() => openModal('The George Wood Bond - Legacy Plan')}
                            className="bg-[#135B3A] dark:bg-green-700 hover:bg-green-800 dark:hover:bg-green-600 text-white py-3 px-6 rounded-xl font-bold transition-all shadow-md w-full"
                        >
                            Inquire for Plan
                        </button>
                    </div>

                    {/* Honor Plan */}
                    <div className="bg-brand-card dark:bg-brand-card-dark p-8 md:p-10 rounded-3xl shadow-xl border-2 border-[#8C6A1C] relative flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#8C6A1C] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                            Most Preferred
                        </span>
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-[#135B3A] dark:text-green-400 mb-2">Honor Plan</h2>
                            <p className="text-xs text-[#8C6A1C] dark:text-yellow-400 font-bold uppercase tracking-wider mb-6">Premium Celebration</p>
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-brand-black dark:text-brand-white">₦30,000</span>
                                <span className="text-sm text-brand-black/60 dark:text-gray-400 font-light"> / month</span>
                            </div>
                            <p className="text-brand-black/80 dark:text-gray-300 text-sm mb-6 leading-relaxed">
                                A highly elegant package designed to celebrate a lifetime of achievements with custom honors and premium accessories.
                            </p>
                            <ul className="space-y-3 mb-8 text-sm text-brand-black/75 dark:text-gray-400 border-t border-[#135B3A]/10 dark:border-white/10 pt-6">
                                <li className="flex items-center gap-2 font-medium">✓ Everything in Legacy +</li>
                                <li className="flex items-center gap-2">✓ Hand-carved mahogany casket</li>
                                <li className="flex items-center gap-2">✓ Deluxe hearse & professional staff</li>
                                <li className="flex items-center gap-2">✓ Custom programs & flower decor</li>
                                <li className="flex items-center gap-2">✓ Live-streaming service for relatives</li>
                            </ul>
                        </div>
                        <button
                            onClick={() => openModal('The George Wood Bond - Honor Plan')}
                            className="bg-[#8C6A1C] hover:bg-amber-800 text-white py-3 px-6 rounded-xl font-bold transition-all shadow-md w-full"
                        >
                            Inquire for Plan
                        </button>
                    </div>

                    {/* Imperial Plan */}
                    <div className="bg-brand-card dark:bg-brand-card-dark p-8 md:p-10 rounded-3xl shadow-lg border border-[#135B3A]/10 dark:border-white/5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-[#135B3A] dark:text-green-400 mb-2">Imperial Plan</h2>
                            <p className="text-xs text-[#8C6A1C] dark:text-yellow-400 font-bold uppercase tracking-wider mb-6">Exclusive Tribute</p>
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-brand-black dark:text-brand-white">₦60,000</span>
                                <span className="text-sm text-brand-black/60 dark:text-gray-400 font-light"> / month</span>
                            </div>
                            <p className="text-brand-black/80 dark:text-gray-300 text-sm mb-6 leading-relaxed">
                                The ultimate legacy of honor and prestige. Includes private concierge service, luxury fittings, and philanthropic actions.
                            </p>
                            <ul className="space-y-3 mb-8 text-sm text-brand-black/75 dark:text-gray-400 border-t border-[#135B3A]/10 dark:border-white/10 pt-6">
                                <li className="flex items-center gap-2 font-medium">✓ Everything in Honor +</li>
                                <li className="flex items-center gap-2">✓ Custom 18-gauge bronze casket</li>
                                <li className="flex items-center gap-2">✓ Royal convoy/carriage ceremony</li>
                                <li className="flex items-center gap-2">✓ Custom tribute video production</li>
                                <li className="flex items-center gap-2">✓ Permanent digital memorial page</li>
                                <li className="flex items-center gap-2">✓ Obituary publication & donation</li>
                            </ul>
                        </div>
                        <button
                            onClick={() => openModal('The George Wood Bond - Imperial Plan')}
                            className="bg-[#135B3A] dark:bg-green-700 hover:bg-green-800 dark:hover:bg-green-600 text-white py-3 px-6 rounded-xl font-bold transition-all shadow-md w-full"
                        >
                            Inquire for Plan
                        </button>
                    </div>
                </ScrollReveal>

                {/* FAQ Section */}
                <ScrollReveal className="max-w-4xl mx-auto mb-16 bg-brand-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 border border-[#135B3A]/5 shadow-sm">
                    <h3 className="text-3xl font-serif font-bold text-[#135B3A] dark:text-green-500 mb-8 text-center">
                        Frequently Asked Questions
                    </h3>
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-lg font-bold text-brand-black dark:text-brand-white mb-2">Why should I subscribe today?</h4>
                            <p className="text-brand-black/75 dark:text-gray-300 text-sm leading-relaxed">
                                Pre-planning protects your family during their most vulnerable moments from both the stress of organizing services and the burden of sudden expenses. Furthermore, it locks in today&apos;s rates, keeping your plan safe from future inflation.
                            </p>
                        </div>
                        <hr className="border-gray-100 dark:border-gray-800" />
                        <div>
                            <h4 className="text-lg font-bold text-brand-black dark:text-brand-white mb-2">How do the payments work?</h4>
                            <p className="text-brand-black/75 dark:text-gray-300 text-sm leading-relaxed">
                                Payments are managed through secure monthly subscriptions. We offer several options, and our team is happy to coordinate automated card payments or manual deposits according to your preferences.
                            </p>
                        </div>
                        <hr className="border-gray-100 dark:border-gray-800" />
                        <div>
                            <h4 className="text-lg font-bold text-brand-black dark:text-brand-white mb-2">Can I customize a plan or upgrade?</h4>
                            <p className="text-brand-black/75 dark:text-gray-300 text-sm leading-relaxed">
                                Absolutely. The plans represent standard benchmarks, but our team specializes in personalizing ceremonies. You can change casket materials, transportation details, or locations at any time. Speak with us to customize your package.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* Inquiry Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="George Wood Bond Inquiry Modal"
            >
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-serif font-bold text-[#135B3A]">Secure Peace of Mind</h2>
                        <p className="text-xs text-[#8C6A1C] mt-1">Inquiring for: {selectedBond}</p>
                    </div>
                    <button onClick={closeModal} className="text-gray-400 hover:text-red-500 text-3xl font-bold focus:outline-none">&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-[#16221B]/70 uppercase tracking-wider mb-1">Your Full Name</label>
                        <input
                            type="text" name="name" placeholder="John Doe" required
                            value={formData.name} onChange={handleChange}
                            className="w-full p-3.5 rounded-xl border border-gray-200 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-[#16221B]/70 uppercase tracking-wider mb-1">Email Address</label>
                        <input
                            type="email" name="email" placeholder="john@example.com" required
                            value={formData.email} onChange={handleChange}
                            className="w-full p-3.5 rounded-xl border border-gray-200 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-[#16221B]/70 uppercase tracking-wider mb-1">Phone Number</label>
                        <input
                            type="tel" name="phone" placeholder="08012345678" required
                            value={formData.phone} onChange={handleChange}
                            className="w-full p-3.5 rounded-xl border border-gray-200 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-[#16221B]/70 uppercase tracking-wider mb-1">Custom Notes / Questions</label>
                        <textarea
                            name="message" placeholder="Please share any preferences or questions with our family..." rows="3"
                            value={formData.message} onChange={handleChange}
                            className="w-full p-3.5 rounded-xl border border-gray-200 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm shadow-sm"
                        ></textarea>
                    </div>
                    <button
                        type="submit" disabled={loading}
                        className="w-full bg-[#135B3A] text-white font-bold py-4 rounded-xl hover:bg-[#0E462D] transition-colors shadow-lg disabled:opacity-50 mt-4 text-sm tracking-wider uppercase"
                    >
                        {loading ? 'Sending Request...' : 'Submit Inquiry'}
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default Bonds;
