import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { collection, onSnapshot, doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";
import { usePaystackPayment } from 'react-paystack';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '500px',
    padding: '0',
    border: 'none',
    backgroundColor: 'transparent'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000
  }
};

const Giving = () => {
  const [projects, setProjects] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Donation Form State
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donationAmount, setDonationAmount] = useState(""); // in NGN

  useEffect(() => {
    // 1. Fetch Charity Projects
    const unsubscribe = onSnapshot(collection(db, "charityProjects"), (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(projectsData);
    });
    return () => unsubscribe();
  }, []);

  const openDonationModal = (project) => {
    setSelectedProject(project);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProject(null);
    setDonationAmount("");
    setDonorName("");
    setDonorEmail("");
  };

  // --- Paystack Config ---
  const config = {
    email: donorEmail,
    amount: Math.round(parseFloat(donationAmount || 0) * 100), // convert NGN to kobo
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    firstname: donorName,
  };

  const onSuccess = async () => {
    try {
      if (selectedProject) {
        // Update Firestore raisedAmount
        const projectRef = doc(db, "charityProjects", selectedProject.id);
        const amount = parseFloat(donationAmount);

        await updateDoc(projectRef, {
          raisedAmount: increment(amount)
        });

        alert(`Thank you ${donorName}! Your donation of ${amount.toLocaleString()} NGN has been received.`);
        closeModal();
      }
    } catch (error) {
      console.error("Error updating donation:", error);
      alert("Donation successful but failed to update record. Please contact us.");
    }
  };

  const onClose = () => {
    alert("Donation cancelled.");
  };

  const initializePayment = usePaystackPayment(config);

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    if (!donorName || !donorEmail || !donationAmount) {
      alert("Please fill in all fields.");
      return;
    }
    initializePayment(onSuccess, onClose);
  };

  const activeProjects = projects.filter(p => p.status === 'active');
  const completedProjects = projects.filter(p => p.status === 'completed');

  return (
    <div className="min-h-screen flex flex-col font-montserrat pt-24 pb-12 transition-colors duration-300">
      <main className="max-w-[1300px] mx-auto px-4 md:px-8 flex-grow w-full">

        {/* Header */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#A37E2C] dark:text-yellow-500 mb-4">George Wood&#39;s Legacy</h1>
          <p className="text-lg md:text-xl text-gray-800 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Continuing a legacy of compassion. Join us in uplifting communities, supporting education, and providing healthcare to those in need.
          </p>
        </section>

        {/* --- Active Projects --- */}
        {activeProjects.length > 0 && (
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-[#135B3A] dark:text-green-500 mb-8 border-b-2 border-gray-200 dark:border-gray-700 pb-2">Ongoing Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeProjects.map(project => {
                const percentage = Math.min(((project.raisedAmount || 0) / project.targetAmount) * 100, 100);
                return (
                  <div key={project.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex flex-col border border-gray-100 dark:border-gray-700">
                    <div className="h-48 overflow-hidden">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      <div className="mt-auto">
                        <div className="flex justify-between text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">
                          <span>Raised: ₦{(project.raisedAmount || 0).toLocaleString()}</span>
                          <span>Target: ₦{parseInt(project.targetAmount).toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4">
                          <div className="bg-[#A37E2C] h-2.5 rounded-full transition-all duration-1000" style={{ width: `${percentage}%` }}></div>
                        </div>

                        <button
                          onClick={() => openDonationModal(project)}
                          className="w-full bg-[#135B3A] text-white py-3 rounded-lg font-bold hover:bg-[#0E462D] transition-colors shadow-md"
                        >
                          Donate to this Cause
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* --- Completed Projects --- */}
        {completedProjects.length > 0 && (
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-[#135B3A] dark:text-green-500 mb-8 border-b-2 border-gray-200 dark:border-gray-700 pb-2">Our Impact (Completed Projects)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {completedProjects.map(project => (
                <div key={project.id} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl shadow opacity-90 hover:opacity-100 transition-opacity overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700">
                  <div className="h-48 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">COMPLETED</div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-3">
                        Successfully Raised: ₦{(project.raisedAmount || 0).toLocaleString()}
                      </p>
                      {project.articleLink ? (
                        <a href={project.articleLink} target="_blank" rel="noopener noreferrer" className="block text-center text-[#A37E2C] font-bold hover:underline">
                          Read Success Story &rarr;
                        </a>
                      ) : (
                        <span className="text-sm text-gray-400 italic">Success story coming soon...</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Initial Static Content (Mission etc) - kept for context but styled down */}
        <section className="mb-10 bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-[#011309] dark:text-white mb-4">Our Mission & Vision</h2>
          <p className="text-lg mb-4 text-gray-800 dark:text-gray-300">
            Established in 2024, George Wood&#39;s Legacy is dedicated to uplifting and empowering communities across Nigeria. We believe that by working together, we can create lasting change.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mt-6">
            <li className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
              <strong className="block text-[#A37E2C] text-lg mb-2">Education</strong>
              <span className="text-sm">Funding scholarships and resources for underprivileged children.</span>
            </li>
            <li className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
              <strong className="block text-[#A37E2C] text-lg mb-2">Healthcare</strong>
              <span className="text-sm">Providing medical aid and health screenings in underserved areas.</span>
            </li>
            <li className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
              <strong className="block text-[#A37E2C] text-lg mb-2">Community</strong>
              <span className="text-sm">Engaging in sustainable development projects to enhance living conditions.</span>
            </li>
          </ul>
        </section>

      </main>

      {/* Donation Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Donate Modal"
      >
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl relative">
          <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white text-2xl">&times;</button>
          <h2 className="text-2xl font-bold mb-2 text-[#135B3A] dark:text-green-500 text-center">Donate to {selectedProject?.title}</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-6 text-sm">Every contribution brings us closer to our goal.</p>

          <form onSubmit={handleDonateSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
              <input type="text" value={donorName} onChange={(e) => setDonorName(e.target.value)} required className="w-full p-3 rounded border dark:bg-gray-800 dark:border-gray-700 dark:text-white" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
              <input type="email" value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)} required className="w-full p-3 rounded border dark:bg-gray-800 dark:border-gray-700 dark:text-white" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Amount (NGN)</label>
              <input type="number" value={donationAmount} onChange={(e) => setDonationAmount(e.target.value)} required min="100" className="w-full p-3 rounded border dark:bg-gray-800 dark:border-gray-700 dark:text-white" placeholder="5000" />
            </div>

            <button type="submit" className="w-full bg-[#A37E2C] text-white py-3 rounded-lg font-bold text-lg hover:bg-[#8e6d25] transition-colors mt-4 shadow-lg">
              Pay Securely Now
            </button>
            <div className="flex justify-center mt-2">
              <span className="text-xs text-gray-400 flex items-center gap-1">🔒 Secured by Paystack</span>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Giving;
