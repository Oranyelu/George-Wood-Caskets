import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { usePaystackPayment } from 'react-paystack';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ScrollReveal from '../Components/ScrollReveal';
import toast from 'react-hot-toast';

const Charity = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    tier: 'custom'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [txRef, setTxRef] = useState('');

  const tiers = [
    {
      id: 'family',
      title: 'Sponsor a Family',
      amount: 10000,
      description: 'Provides essential logistics and a dignified memorial package for underprivileged families experiencing loss.',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'education',
      title: 'Education Initiative',
      amount: 25000,
      description: 'Sponsors secondary school scholarships and vocational kits for youths in our workshop communities.',
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'heritage',
      title: 'Heritage Preservation',
      amount: 50000,
      description: 'Sponsors civic monument restoration, historic archives, and local cultural preservation workshops.',
      image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=600&auto=format&fit=crop'
    }
  ];

  const handleTierSelect = (tierId, amount) => {
    setFormData(prev => ({
      ...prev,
      tier: tierId,
      amount: amount.toString()
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      tier: name === 'amount' ? 'custom' : prev.tier
    }));
  };

  const amountInKobo = Math.round(parseFloat(formData.amount || 0) * 100);

  const config = {
    reference: `donation_${Date.now()}`,
    email: formData.email,
    amount: amountInKobo,
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    firstname: formData.name,
    phone: formData.phone,
    metadata: {
      custom_fields: [
        {
          display_name: "Donor Name",
          variable_name: "donor_name",
          value: formData.name
        },
        {
          display_name: "Donation Tier",
          variable_name: "donation_tier",
          value: formData.tier
        }
      ]
    }
  };

  const initializePayment = usePaystackPayment(config);

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.amount) {
      toast.error("Please fill out all donation details.");
      return;
    }
    if (parseFloat(formData.amount) <= 0) {
      toast.error("Please enter a donation amount greater than 0.");
      return;
    }
    
    setIsSubmitting(true);
    initializePayment(onSuccess, onClose);
  };

  const onSuccess = async (reference) => {
    try {
      const donationRecord = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        amount: parseFloat(formData.amount),
        tier: formData.tier,
        paymentReference: reference.reference || reference,
        status: "success",
        createdAt: new Date().toISOString()
      };
      
      await addDoc(collection(db, "donations"), donationRecord);
      setTxRef(reference.reference || reference.trans || 'Success');
      setDonationSuccess(true);
      toast.success("Thank you for your generous contribution!");
      
    } catch (error) {
      console.error("Error logging donation:", error);
      toast.error("Donation succeeded but logging failed. We will track it manually.");
      setDonationSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onClose = () => {
    setIsSubmitting(false);
    toast.error("Donation process cancelled.");
  };

  return (
    <div className="min-h-screen font-montserrat pt-24 pb-12 bg-brand-cream dark:bg-primary-dark transition-colors duration-300">
      <Helmet>
        <title>George Wood Charity Foundation | Giving Back</title>
        <meta name="description" content="The George Wood Charity Foundation is dedicated to supporting our community, funding local student scholarships, and preserving heritage." />
      </Helmet>

      <div className="container mx-auto px-4 max-w-[1300px]">
        {/* Header Section */}
        <ScrollReveal className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#135B3A] dark:text-green-500 mb-6">
            {t('charity')}
          </h1>
          <p className="text-lg text-brand-black/80 dark:text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            For generations, George Wood Caskets has been supported by our community. We honor that support by serving families in their times of need, investing in local youths, and preserving historical heritage.
          </p>
        </ScrollReveal>

        {!donationSuccess ? (
          <>
            {/* Tiers List */}
            <ScrollReveal className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
              {tiers.map((tier) => (
                <div 
                  key={tier.id} 
                  className={`bg-brand-card dark:bg-brand-card-dark rounded-2xl overflow-hidden shadow-md border transition-all duration-300 flex flex-col ${
                    formData.tier === tier.id 
                      ? 'border-[#135B3A] ring-2 ring-[#135B3A]/20 scale-[1.02]' 
                      : 'border-[#135B3A]/10 dark:border-white/5 hover:shadow-lg'
                  }`}
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={tier.image} 
                      alt={tier.title} 
                      className="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-brand-black dark:text-brand-white mb-2">
                        {tier.title}
                      </h3>
                      <p className="text-brand-black/70 dark:text-gray-300 text-sm mb-4 leading-relaxed font-light">
                        {tier.description}
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-serif font-bold text-[#135B3A] dark:text-green-400 mb-4">
                        {tier.amount.toLocaleString()} NGN
                      </p>
                      <button 
                        type="button"
                        onClick={() => handleTierSelect(tier.id, tier.amount)}
                        className={`w-full py-2.5 rounded-xl font-bold transition-all text-sm uppercase tracking-wider ${
                          formData.tier === tier.id 
                            ? 'bg-[#135B3A] text-white' 
                            : 'border border-[#135B3A]/30 text-[#135B3A] dark:text-green-500 dark:border-green-500/30 hover:bg-[#135B3A]/5'
                        }`}
                      >
                        Select Tier
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollReveal>

            {/* Donation Form */}
            <ScrollReveal className="max-w-xl mx-auto bg-brand-card dark:bg-brand-card-dark p-8 rounded-2xl shadow-xl border border-[#135B3A]/10 dark:border-white/5 transition-colors duration-300">
              <h2 className="text-2xl font-serif font-bold text-center text-[#135B3A] dark:text-green-500 mb-6">
                Make a Secure Contribution
              </h2>
              <form onSubmit={handleDonateSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-brand-black/80 dark:text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-brand-white dark:bg-[#1a2e23]/30 text-brand-black dark:text-brand-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-600 focus:border-transparent text-sm transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-brand-black/80 dark:text-gray-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@example.com"
                      className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-brand-white dark:bg-[#1a2e23]/30 text-brand-black dark:text-brand-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-600 focus:border-transparent text-sm transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-brand-black/80 dark:text-gray-300">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g., 08012345678"
                      className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-brand-white dark:bg-[#1a2e23]/30 text-brand-black dark:text-brand-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-600 focus:border-transparent text-sm transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1 text-brand-black/80 dark:text-gray-300">
                    Contribution Amount (NGN)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="amount"
                      required
                      min="100"
                      value={formData.amount}
                      onChange={handleInputChange}
                      placeholder="Enter amount to donate"
                      className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-brand-white dark:bg-[#1a2e23]/30 text-brand-black dark:text-brand-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-600 focus:border-transparent text-sm transition-all font-semibold text-lg"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-bold">
                      NGN
                    </span>
                  </div>
                  {formData.tier !== 'custom' && (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1.5 font-medium">
                      Selected Tier: <span className="capitalize">{formData.tier}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#135B3A] hover:bg-[#0E462D] dark:bg-green-700 dark:hover:bg-green-800 text-white font-bold py-4 rounded-xl transition-all shadow-md text-sm uppercase tracking-wider disabled:opacity-50 mt-4"
                >
                  {isSubmitting ? 'Initializing Payment...' : 'Donate via Paystack'}
                </button>

                <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4 leading-relaxed font-light">
                  Your donation is securely encrypted by Paystack. George Wood Caskets uses these funds strictly for designated charity projects.
                </p>
              </form>
            </ScrollReveal>
          </>
        ) : (
          /* Thank You Screen */
          <ScrollReveal className="max-w-xl mx-auto bg-brand-card dark:bg-brand-card-dark p-10 rounded-2xl shadow-xl border border-[#135B3A]/10 dark:border-white/5 text-center transition-colors duration-300">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              Thank You!
            </h2>
            <p className="text-brand-black/80 dark:text-gray-300 mb-6 leading-relaxed font-light">
              We have received your contribution of <strong>{parseFloat(formData.amount).toLocaleString()} NGN</strong>. Your generosity will bring warmth and relief to local families and community initiatives.
            </p>
            <div className="bg-brand-white dark:bg-gray-800 p-4 rounded-xl inline-block mb-8 border border-gray-200 dark:border-gray-700 text-sm">
              <span className="text-gray-500 block mb-0.5">Reference ID</span>
              <strong className="font-mono text-gray-800 dark:text-gray-200">{txRef}</strong>
            </div>
            <div>
              <button
                type="button"
                onClick={() => {
                  setDonationSuccess(false);
                  setFormData(prev => ({ ...prev, amount: '', tier: 'custom' }));
                }}
                className="bg-[#135B3A] hover:bg-[#0E462D] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md text-sm uppercase tracking-wider"
              >
                Make Another Donation
              </button>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
};

export default Charity;
