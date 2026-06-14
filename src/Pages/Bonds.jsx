import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Modal from 'react-modal';
import { usePaystackPayment } from 'react-paystack';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { sendBondInquiryEmail, sendBondSubEmail } from "../utils/api";
import ScrollReveal from "../Components/ScrollReveal";
import toast from 'react-hot-toast';

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
    const [modalTab, setModalTab] = useState('subscribe'); // 'subscribe' or 'inquire'
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [txRef, setTxRef] = useState('');
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', message: ''
    });

    const getPlanDetails = (bondType) => {
        let price = 15000;
        let planName = 'Legacy Plan';
        if (bondType.includes('Honor')) {
            price = 30000;
            planName = 'Honor Plan';
        } else if (bondType.includes('Imperial')) {
            price = 60000;
            planName = 'Imperial Plan';
        }
        return { price, planName };
    };

    const { price, planName } = getPlanDetails(selectedBond);

    const openModal = (bondType) => {
        setSelectedBond(bondType);
        setIsOpen(true);
        setModalTab('subscribe');
        setPaymentSuccess(false);
        setTxRef('');
    };

    const closeModal = () => {
        setIsOpen(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 1. Inquiry Submit handler
    const handleInquirySubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await sendBondInquiryEmail({
                ...formData,
                bondType: selectedBond
            });
            toast.success("Your inquiry has been sent. Our team will contact you shortly.");
            closeModal();
        } catch (error) {
            toast.error("Failed to send inquiry. Please try again or call us directly.");
        } finally {
            setLoading(false);
        }
    };

    // 2. Paystack Online Subscription configuration
    const amountInKobo = price * 100;
    const paystackConfig = {
        reference: `sub_${Date.now()}`,
        email: formData.email,
        amount: amountInKobo,
        publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        firstname: formData.name,
        phone: formData.phone,
        metadata: {
            custom_fields: [
                {
                    display_name: "Subscriber Name",
                    variable_name: "subscriber_name",
                    value: formData.name
                },
                {
                    display_name: "Plan Name",
                    variable_name: "plan_name",
                    value: planName
                }
            ]
        }
    };

    const initializePayment = usePaystackPayment(paystackConfig);

    const handleSubscribeSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.phone) {
            toast.error("Please fill in all details before checking out.");
            return;
        }
        setLoading(true);
        initializePayment(onPaymentSuccess, onPaymentClose);
    };

    const onPaymentSuccess = async (reference) => {
        try {
            const nextDate = new Date();
            nextDate.setDate(nextDate.getDate() + 30);

            // Log Subscription details to Firestore
            const subscriptionData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                planType: planName,
                status: "active",
                startDate: new Date().toISOString(),
                nextPaymentDate: nextDate.toISOString(),
                monthlyPrice: price,
                paymentReference: reference.reference || reference
            };

            const bondDoc = await addDoc(collection(db, "bonds"), subscriptionData);

            // Log initial subscription payment
            const paymentData = {
                subscriptionId: bondDoc.id,
                name: formData.name,
                email: formData.email,
                amount: price,
                reference: reference.reference || reference,
                status: "success",
                paidAt: new Date().toISOString(),
                planType: planName
            };

            await addDoc(collection(db, "payments"), paymentData);

            // Send notification to Admin
            try {
                await sendBondSubEmail({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    planType: planName,
                    monthlyPrice: price,
                    paymentReference: reference.reference || reference
                });
            } catch (emailErr) {
                console.error("Bond subscription admin email notification failed:", emailErr);
            }
            
            setTxRef(reference.reference || 'Success');
            setPaymentSuccess(true);
            toast.success("Subscription initialized successfully!");

        } catch (error) {
            console.error("Error logging subscription details in database:", error);
            toast.error("Subscription payment succeeded but server logging failed. We will contact you.");
            setPaymentSuccess(true);
        } finally {
            setLoading(false);
        }
    };

    const onPaymentClose = () => {
        setLoading(false);
        toast.error("Payment sheet closed.");
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
                          <p className="text-brand-black/80 dark:text-gray-300 text-sm mb-6 leading-relaxed font-light">
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
                            className="bg-[#135B3A] dark:bg-green-700 hover:bg-green-800 dark:hover:bg-green-600 text-white py-3.5 px-6 rounded-xl font-bold transition-all shadow-md w-full uppercase tracking-wider text-xs"
                        >
                            Select Plan
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
                          <p className="text-brand-black/80 dark:text-gray-300 text-sm mb-6 leading-relaxed font-light">
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
                            className="bg-[#8C6A1C] hover:bg-amber-800 text-white py-3.5 px-6 rounded-xl font-bold transition-all shadow-md w-full uppercase tracking-wider text-xs"
                        >
                            Select Plan
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
                          <p className="text-brand-black/80 dark:text-gray-300 text-sm mb-6 leading-relaxed font-light">
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
                            className="bg-[#135B3A] dark:bg-green-700 hover:bg-green-800 dark:hover:bg-green-600 text-white py-3.5 px-6 rounded-xl font-bold transition-all shadow-md w-full uppercase tracking-wider text-xs"
                        >
                            Select Plan
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
                            <p className="text-brand-black/75 dark:text-gray-300 text-sm leading-relaxed font-light">
                                Pre-planning protects your family during their most vulnerable moments from both the stress of organizing services and the burden of sudden expenses. Furthermore, it locks in today&apos;s rates, keeping your plan safe from future inflation.
                            </p>
                        </div>
                        <hr className="border-gray-100 dark:border-gray-800" />
                        <div>
                            <h4 className="text-lg font-bold text-brand-black dark:text-brand-white mb-2">How do the payments work?</h4>
                            <p className="text-brand-black/75 dark:text-gray-300 text-sm leading-relaxed font-light">
                                Payments are managed through secure monthly subscriptions. We offer several options, and our team is happy to coordinate automated card payments or manual deposits according to your preferences.
                            </p>
                        </div>
                        <hr className="border-gray-100 dark:border-gray-800" />
                        <div>
                            <h4 className="text-lg font-bold text-brand-black dark:text-brand-white mb-2">Can I customize a plan or upgrade?</h4>
                            <p className="text-brand-black/75 dark:text-gray-300 text-sm leading-relaxed font-light">
                                Absolutely. The plans represent standard benchmarks, but our team specializes in personalizing ceremonies. You can change casket materials, transportation details, or locations at any time. Speak with us to customize your package.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* Inquiry & Purchase Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="George Wood Bond Inquiry Modal"
            >
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-serif font-bold text-[#135B3A]">George Wood Bond</h2>
                        <p className="text-xs text-[#8C6A1C] mt-1 font-semibold">{planName} — ₦{price.toLocaleString()} / month</p>
                    </div>
                    <button onClick={closeModal} className="text-gray-400 hover:text-red-500 text-3xl font-bold focus:outline-none">&times;</button>
                </div>

                {!paymentSuccess ? (
                    <>
                        {/* Tab Switcher */}
                        <div className="flex border-b border-gray-200 mb-6 font-semibold text-xs uppercase tracking-wider">
                            <button
                                type="button"
                                onClick={() => setModalTab('subscribe')}
                                className={`flex-1 pb-3 text-center transition-all border-b-2 ${
                                    modalTab === 'subscribe' 
                                        ? 'border-[#135B3A] text-[#135B3A]' 
                                        : 'border-transparent text-gray-400 hover:text-gray-600'
                                }`}
                            >
                                Pay Online
                            </button>
                            <button
                                type="button"
                                onClick={() => setModalTab('inquire')}
                                className={`flex-1 pb-3 text-center transition-all border-b-2 ${
                                    modalTab === 'inquire' 
                                        ? 'border-[#135B3A] text-[#135B3A]' 
                                        : 'border-transparent text-gray-400 hover:text-gray-600'
                                }`}
                            >
                                Request Callback
                            </button>
                        </div>

                        {modalTab === 'subscribe' ? (
                            /* Subscribe Form */
                            <form onSubmit={handleSubscribeSubmit} className="space-y-4">
                                <p className="text-xs text-brand-black/70 font-light mb-4 leading-relaxed">
                                    Secure your plan instantly by paying the first month&apos;s subscription online. Payments are processed safely via Paystack.
                                </p>
                                <div>
                                    <label className="block text-xs font-bold text-[#16221B]/70 uppercase tracking-wider mb-1">Your Full Name</label>
                                    <input
                                        type="text" name="name" placeholder="John Doe" required
                                        value={formData.name} onChange={handleChange}
                                        className="w-full p-3 rounded-xl border border-gray-200 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#16221B]/70 uppercase tracking-wider mb-1">Email Address</label>
                                    <input
                                        type="email" name="email" placeholder="john@example.com" required
                                        value={formData.email} onChange={handleChange}
                                        className="w-full p-3 rounded-xl border border-gray-200 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#16221B]/70 uppercase tracking-wider mb-1">Phone Number</label>
                                    <input
                                        type="tel" name="phone" placeholder="08012345678" required
                                        value={formData.phone} onChange={handleChange}
                                        className="w-full p-3 rounded-xl border border-gray-200 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm shadow-sm"
                                    />
                                </div>
                                <button
                                    type="submit" disabled={loading}
                                    className="w-full bg-[#135B3A] text-white font-bold py-4 rounded-xl hover:bg-[#0E462D] transition-colors shadow-lg disabled:opacity-50 mt-4 text-xs tracking-wider uppercase"
                                >
                                    {loading ? 'Initializing Checkout...' : `Pay first month (₦${price.toLocaleString()})`}
                                </button>
                            </form>
                        ) : (
                            /* Inquiry Form */
                            <form onSubmit={handleInquirySubmit} className="space-y-4">
                                <p className="text-xs text-brand-black/70 font-light mb-4 leading-relaxed">
                                    Have questions before subscribing? Submit your details and our planning counselors will contact you directly.
                                </p>
                                <div>
                                    <label className="block text-xs font-bold text-[#16221B]/70 uppercase tracking-wider mb-1">Your Full Name</label>
                                    <input
                                        type="text" name="name" placeholder="John Doe" required
                                        value={formData.name} onChange={handleChange}
                                        className="w-full p-3 rounded-xl border border-gray-200 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm shadow-sm"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-[#16221B]/70 uppercase tracking-wider mb-1">Email Address</label>
                                        <input
                                            type="email" name="email" placeholder="john@example.com" required
                                            value={formData.email} onChange={handleChange}
                                            className="w-full p-3 rounded-xl border border-gray-200 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#16221B]/70 uppercase tracking-wider mb-1">Phone Number</label>
                                        <input
                                            type="tel" name="phone" placeholder="08012345678" required
                                            value={formData.phone} onChange={handleChange}
                                            className="w-full p-3 rounded-xl border border-gray-200 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm shadow-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#16221B]/70 uppercase tracking-wider mb-1">Custom Notes / Questions</label>
                                    <textarea
                                        name="message" placeholder="Please share any preferences or questions with our team..." rows="3"
                                        value={formData.message} onChange={handleChange}
                                        className="w-full p-3.5 rounded-xl border border-gray-200 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm shadow-sm animate-all"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit" disabled={loading}
                                    className="w-full bg-[#135B3A] text-white font-bold py-4 rounded-xl hover:bg-[#0E462D] transition-colors shadow-lg disabled:opacity-50 mt-4 text-xs tracking-wider uppercase"
                                >
                                    {loading ? 'Sending Request...' : 'Submit Inquiry'}
                                </button>
                            </form>
                        )}
                    </>
                ) : (
                    /* Successful Purchase Screen */
                    <div className="text-center py-6 text-brand-black">
                        <div className="w-16 h-16 bg-green-150 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200 shadow-sm">
                            <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-[#135B3A] mb-3">Subscription Confirmed</h3>
                        <p className="text-sm text-brand-black/80 font-light mb-6 leading-relaxed">
                            Thank you, <strong>{formData.name}</strong>. Your subscription to the <strong>{planName}</strong> has been initialized successfully. We have securely created your bond record in our system.
                        </p>
                        <div className="bg-white p-4 rounded-xl inline-block mb-6 border border-gray-200 text-xs">
                            <span className="text-gray-400 block mb-0.5">Payment Reference</span>
                            <strong className="font-mono text-gray-800 font-bold">{txRef}</strong>
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="bg-[#135B3A] hover:bg-[#0E462D] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md text-xs uppercase tracking-wider"
                            >
                                Back to Plans
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Bonds;
