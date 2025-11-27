import { FaWhatsapp, FaPhone } from 'react-icons/fa';

const FloatingContact = () => {
    const phoneNumber = "2348143904414"; // Format: CountryCode+Number
    const whatsappMessage = "Hello, I would like to make an inquiry about George Wood Caskets.";

    return (
        <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
            {/* Phone Call */}
            <a
                href={`tel:+${phoneNumber}`}
                className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-secondary transition-colors transform hover:scale-110"
                aria-label="Call Us"
            >
                <FaPhone size={24} />
            </a>

            {/* WhatsApp */}
            <a
                href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors transform hover:scale-110"
                aria-label="Chat on WhatsApp"
            >
                <FaWhatsapp size={24} />
            </a>
        </div>
    );
};

export default FloatingContact;
