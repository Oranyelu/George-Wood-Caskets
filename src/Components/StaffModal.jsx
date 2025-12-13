import ReactModal from "react-modal";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";

// Ensure accessibility for React Modal
ReactModal.setAppElement("#root");

const modalStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        position: "relative",
        inset: "auto",
        maxWidth: "800px",
        width: "90%",
        maxHeight: "90vh",
        padding: "0",
        border: "none",
        borderRadius: "16px",
        background: "#F0B52E",
        overflow: "auto",
    },
};

const StaffModal = ({ isOpen, onClose, staff }) => {
    if (!staff) return null;

    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} style={modalStyles} contentLabel="Staff Details">
            <div className="relative bg-[#F0B52E] text-[#011309] p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#011309] hover:text-white transition-colors p-2"
                    aria-label="Close modal"
                >
                    <FaTimes size={24} />
                </button>

                {/* Staff Image */}
                <div className="flex-shrink-0">
                    <img
                        src={staff.image}
                        alt={staff.name}
                        className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-xl border-4 border-white/20"
                    />
                </div>

                {/* Staff Info */}
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-bold mb-1">{staff.name}</h2>
                    <p className="text-xl font-semibold opacity-90 mb-6 border-b border-[#011309]/20 pb-4 inline-block">
                        {staff.title}
                    </p>
                    <div className="prose prose-lg max-w-none text-left">
                        <p className="leading-relaxed whitespace-pre-line">{staff.bio}</p>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
};

StaffModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    staff: PropTypes.shape({
        name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string,
        bio: PropTypes.string.isRequired,
    }),
};

export default StaffModal;
