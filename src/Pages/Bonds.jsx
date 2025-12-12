import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { sendBondInquiryEmail } from "../utils/api";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#F0B52E',
        border: 'none',
        borderRadius: '10px',
        padding: '2rem',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '90vh',
        overflowY: 'auto'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 1000
    }
};

Modal.setAppElement('#root'); // Ensure accessibility

const Bonds = () => {
    const { t } = useTranslation();
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
            alert("Inquiry sent successfully! We will contact you soon.");
            closeModal();
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            alert("Failed to send inquiry.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen font-sans pt-24 pb-12 transition-colors duration-300">
            <Helmet>
                <title>George Wood Bonds | Investment Opportunities</title>
                <meta name="description" content="Invest in the future with George Wood Bonds. Secure, reliable, and rooted in tradition." />
            </Helmet>

            <div className="max-w-[1300px] mx-auto px-4 md:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary dark:text-green-500 mb-4">{t('bonds')}</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Secure your future with George Wood Bonds. We offer stable investment opportunities backed by our legacy of trust and excellence.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="bg-[#F0B52E] p-8 rounded-lg shadow-md border-t-4 border-white">
                        <h2 className="text-2xl font-serif font-bold text-white mb-4">Standard Bond</h2>
                        <p className="text-white/80 mb-6">Perfect for short-term investment goals with guaranteed returns.</p>
                        <button
                            onClick={() => openModal('Standard Bond')}
                            className="bg-[#135B3A] hover:bg-green-800 text-white px-6 py-2 rounded transition-colors w-full border border-white/20 font-bold"
                        >
                            Inquire Now
                        </button>
                    </div>
                    <div className="bg-[#F0B52E] p-8 rounded-lg shadow-md border-t-4 border-white">
                        <h2 className="text-2xl font-serif font-bold text-white mb-4">Premium Bond</h2>
                        <p className="text-white/80 mb-6">Long-term growth with exclusive benefits and higher yield rates.</p>
                        <button
                            onClick={() => openModal('Premium Bond')}
                            className="bg-[#135B3A] hover:bg-green-800 text-white px-6 py-2 rounded transition-colors w-full border border-white/20 font-bold"
                        >
                            Inquire Now
                        </button>
                    </div>
                </div>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Bond Inquiry Modal"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-white">Inquire about {selectedBond}</h2>
                        <button onClick={closeModal} className="text-white text-3xl font-bold">&times;</button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text" name="name" placeholder="Full Name" required
                            value={formData.name} onChange={handleChange}
                            className="w-full p-3 rounded bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#135B3A]"
                        />
                        <input
                            type="email" name="email" placeholder="Email Address" required
                            value={formData.email} onChange={handleChange}
                            className="w-full p-3 rounded bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#135B3A]"
                        />
                        <input
                            type="tel" name="phone" placeholder="Phone Number" required
                            value={formData.phone} onChange={handleChange}
                            className="w-full p-3 rounded bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#135B3A]"
                        />
                        <textarea
                            name="message" placeholder="Any specific questions?" rows="4"
                            value={formData.message} onChange={handleChange}
                            className="w-full p-3 rounded bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#135B3A]"
                        ></textarea>
                        <button
                            type="submit" disabled={loading}
                            className="w-full bg-[#135B3A] text-white font-bold py-3 rounded hover:bg-[#0f462c] transition-colors shadow-lg disabled:opacity-50"
                        >
                            {loading ? 'Sending...' : 'Send Inquiry'}
                        </button>
                    </form>
                </Modal>
            </div>
        </div>
    );
};

export default Bonds;
