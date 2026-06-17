import { useState, useEffect } from 'react';
import { supabase, uploadToSupabase } from '../supabase';
import { API_MODE, fetchMemorials, createMemorial, updateMemorial, uploadFile } from "../utils/api";
import Modal from 'react-modal';
import { FaSearch, FaFire, FaPenFancy, FaPrint } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../Providers/AuthProvider';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '600px',
    padding: '0',
    border: 'none',
    backgroundColor: 'transparent'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1000
  }
};

export const mapMemorialFromDB = (dbMemorial) => {
  if (!dbMemorial) return null;
  return {
    ...dbMemorial,
    birthYear: dbMemorial.birth_year,
    deathYear: dbMemorial.death_year,
    submittedBy: dbMemorial.submitted_by,
    contactEmail: dbMemorial.contact_email,
    createdAt: dbMemorial.created_at,
  };
};

const BookOfLife = () => {
  const { user } = useAuth();
  const [memorials, setMemorials] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);

  // Create Modal State
  const [createModalLastOpen, setCreateModalOpen] = useState(false);
  const [newMemorial, setNewMemorial] = useState({
    name: '', birthYear: '', deathYear: '', bio: '', submittedBy: '', contactEmail: '', image: null
  });
  const [uploading, setUploading] = useState(false);

  // Tribute State
  const [tributeText, setTributeText] = useState("");
  const [tributeSigner, setTributeSigner] = useState("");

  useEffect(() => {
    if (API_MODE === 'backend') {
      const loadMemorials = async () => {
        try {
          const data = await fetchMemorials();
          setMemorials(data);
        } catch (error) {
          console.error("Error fetching memorials from API:", error);
        }
      };
      loadMemorials();
      return;
    }

    const loadSupabaseMemorials = async () => {
      try {
        const { data, error } = await supabase
          .from('memorials')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setMemorials((data || []).map(mapMemorialFromDB));
      } catch (err) {
        console.error("Error loading memorials from Supabase:", err);
      }
    };

    loadSupabaseMemorials();

    // Subscribe to changes to memorials table
    const channel = supabase
      .channel('public-approved-memorials')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'memorials'
      }, () => {
        loadSupabaseMemorials();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Filter Logic
  const filteredMemorials = memorials.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setNewMemorial({ ...newMemorial, image: e.target.files[0] });
    }
  }

  const handleSubmitMemorial = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      let imageUrl = "https://via.placeholder.com/300?text=No+Image";
      if (newMemorial.image) {
        if (API_MODE === 'backend') {
          imageUrl = await uploadFile(newMemorial.image, "memorials");
        } else {
          imageUrl = await uploadToSupabase(newMemorial.image, 'memorials');
        }
      }

      const memorialData = {
        name: newMemorial.name,
        birth_year: newMemorial.birthYear,
        death_year: newMemorial.deathYear,
        bio: newMemorial.bio,
        submitted_by: newMemorial.submittedBy,
        contact_email: newMemorial.contactEmail,
        image: imageUrl,
        status: 'pending', // Requires admin approval
        created_at: new Date().toISOString(),
        tributes: [],
        candles: 0
      };

      if (user) {
        memorialData.user_id = user.id;
      }

      if (API_MODE === 'backend') {
        await createMemorial(memorialData);
      } else {
        const { error } = await supabase.from('memorials').insert(memorialData);
        if (error) throw error;
      }

      toast.success("Memorial submitted successfully! It will be visible after admin approval.");
      setCreateModalOpen(false);
      setNewMemorial({ name: '', birthYear: '', deathYear: '', bio: '', submittedBy: '', contactEmail: '', image: null });
    } catch (error) {
      console.error("Error creating memorial:", error);
      toast.error("Failed to create memorial.");
    } finally {
      setUploading(false);
    }
  }

  const handleLightCandle = async (person) => {
    const updatedCandles = (person.candles || 0) + 1;
    // Optimistic update
    setMemorials(prev => prev.map(m => m.id === person.id ? { ...m, candles: updatedCandles } : m));

    try {
      if (API_MODE === 'backend') {
        await updateMemorial(person.id, { candles: updatedCandles });
      } else {
        const { error } = await supabase
          .from('memorials')
          .update({ candles: updatedCandles })
          .eq('id', person.id);
        if (error) throw error;
      }
    } catch (error) {
      console.error("Error lighting candle:", error);
    }
  }

  const handleSubmitTribute = async (e) => {
    e.preventDefault();
    if (!tributeText || !tributeSigner) return;

    try {
      const newTribute = {
        text: tributeText,
        signer: tributeSigner,
        date: new Date().toISOString()
      };

      const updatedTributes = [...(activePerson.tributes || []), newTribute];

      // Optimistic update
      setMemorials(prev => prev.map(m => m.id === selectedPerson.id ? { ...m, tributes: updatedTributes } : m));

      if (API_MODE === 'backend') {
        await updateMemorial(selectedPerson.id, { tributes: updatedTributes });
      } else {
        const { error } = await supabase
          .from('memorials')
          .update({ tributes: updatedTributes })
          .eq('id', selectedPerson.id);
        if (error) throw error;
      }

      setTributeText("");
      setTributeSigner("");
      toast.success("Tribute posted successfully!");
    } catch (error) {
      console.error("Error submitting tribute:", error);
      toast.error("Failed to post tribute.");
    }
  }

  // Get the up-to-date selected person data if selected
  const activePerson = selectedPerson ? memorials.find(m => m.id === selectedPerson.id) : null;

  return (
    <div className="min-h-screen font-montserrat pt-24 pb-12 transition-colors duration-300">
      <main className="max-w-[1300px] mx-auto px-4 md:px-8">

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#A37E2C] dark:text-yellow-500 mb-4 tracking-wide">The Book of Life</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-light italic">
            &quot;To live in hearts we leave behind is not to die.&quot;
          </p>
          <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
            <button
              onClick={() => setCreateModalOpen(true)}
              className="bg-[#135B3A] text-white px-8 py-3 rounded-full font-bold hover:bg-[#0E462D] transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <FaPenFancy /> Create a Memorial
            </button>
            {/* New Feature: Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for a loved one..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#A37E2C] w-full md:w-80 shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* Memorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMemorials.map((person) => (
            <div
              key={person.id}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 group relative"
              onClick={() => setSelectedPerson(person)}
            >
              <div className="h-64 overflow-hidden relative">
                <img src={person.image} alt={person.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110" />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-xl font-bold font-serif">{person.name}</h3>
                  <p className="text-gray-300 text-sm">{person.birthYear} - {person.deathYear}</p>
                </div>
              </div>
              <div className="p-4 flex justify-between items-center bg-[#fcfbf7] dark:bg-gray-700/50">
                <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 text-sm font-semibold">
                  <FaFire /> {person.candles || 0} Candles Lit
                </div>
                <span className="text-[#135B3A] dark:text-green-400 text-sm font-bold group-hover:underline">View Tribute &rarr;</span>
              </div>
            </div>
          ))}
        </div>

        {filteredMemorials.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p>No memorials found.</p>
          </div>
        )}

      </main>

      {/* Create Memorial Modal */}
      <Modal isOpen={createModalLastOpen} onRequestClose={() => setCreateModalOpen(false)} style={customStyles} contentLabel="Create Memorial">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
          <button onClick={() => setCreateModalOpen(false)} className="absolute top-4 right-4 text-gray-500 text-2xl">&times;</button>
          <h2 className="text-2xl font-bold text-[#135B3A] dark:text-white mb-6 text-center font-serif">Create a Forever Memorial</h2>

          <form onSubmit={handleSubmitMemorial} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Name of Deceased</label>
              <input type="text" value={newMemorial.name} onChange={(e) => setNewMemorial({ ...newMemorial, name: e.target.value })} required className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Year of Birth</label>
                <input type="text" value={newMemorial.birthYear} onChange={(e) => setNewMemorial({ ...newMemorial, birthYear: e.target.value })} required className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white" placeholder="1950" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Year of Death</label>
                <input type="text" value={newMemorial.deathYear} onChange={(e) => setNewMemorial({ ...newMemorial, deathYear: e.target.value })} required className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white" placeholder="2024" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Biography / Obituary</label>
              <textarea value={newMemorial.bio} onChange={(e) => setNewMemorial({ ...newMemorial, bio: e.target.value })} required rows="4" className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Upload Photo</label>
              <input type="file" accept="image/*" onChange={handleImageChange} required className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white" />
            </div>
            <hr className="border-gray-200 dark:border-gray-700 my-4" />
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Your Name (Submitted By)</label>
              <input type="text" value={newMemorial.submittedBy} onChange={(e) => setNewMemorial({ ...newMemorial, submittedBy: e.target.value })} required className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Contact Email (Private)</label>
              <input type="email" value={newMemorial.contactEmail} onChange={(e) => setNewMemorial({ ...newMemorial, contactEmail: e.target.value })} required className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white" />
            </div>

            <button type="submit" disabled={uploading} className="w-full bg-[#135B3A] text-white py-3 rounded font-bold hover:bg-[#0E462D] transition-colors disabled:opacity-50">
              {uploading ? "Submitting..." : "Submit for Approval"}
            </button>
          </form>
        </div>
      </Modal>

      {/* View Detail Modal */}
      {selectedPerson && activePerson && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-y-auto font-serif">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row">
              <button onClick={() => setSelectedPerson(null)} className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70">&times;</button>

              {/* Left Side: Image & Actions */}
              <div className="w-full md:w-1/3 bg-gray-100 dark:bg-gray-800 p-6 flex flex-col items-center justify-center text-center">
                <img src={activePerson.image} alt={activePerson.name} className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-xl mb-6 border-4 border-[#A37E2C]" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{activePerson.name}</h2>
                <p className="text-lg text-[#A37E2C] italic mb-6">{activePerson.birthYear} - {activePerson.deathYear}</p>

                <button
                  onClick={() => handleLightCandle(activePerson)}
                  className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105 mb-4"
                >
                  <FaFire /> Light a Candle ({activePerson.candles || 0})
                </button>

                <Link to="/contacts" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#135B3A] dark:text-gray-400 mt-4">
                  <FaPrint /> Request Death Certificate Help
                </Link>
              </div>

              {/* Right Side: Bio & Tributes */}
              <div className="w-full md:w-2/3 p-8 md:p-10 max-h-[80vh] overflow-y-auto">
                <h3 className="text-2xl font-bold text-[#135B3A] dark:text-green-500 mb-4 font-sans">Biography</h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed mb-8 font-sans">
                  {activePerson.bio}
                </p>

                <hr className="border-gray-200 dark:border-gray-700 mb-8" />

                <h3 className="text-xl font-bold text-[#135B3A] dark:text-green-500 mb-4 font-sans">Tributes</h3>
                <div className="space-y-4 mb-8">
                  {(activePerson.tributes && activePerson.tributes.length > 0) ? (
                    activePerson.tributes.map((tribute, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-l-4 border-[#A37E2C]">
                        <p className="text-gray-600 dark:text-gray-300 italic mb-2">&quot;{tribute.text}&quot;</p>
                        <p className="text-right text-sm font-bold text-gray-800 dark:text-gray-400">- {tribute.signer}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 italic">No tributes yet. Be the first to leave one.</p>
                  )}
                </div>

                <form onSubmit={handleSubmitTribute} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-sans">
                  <h4 className="font-bold mb-2 text-gray-700 dark:text-gray-200">Leave a Tribute</h4>
                  <textarea
                    value={tributeText}
                    onChange={(e) => setTributeText(e.target.value)}
                    placeholder="Write a message..."
                    className="w-full p-2 rounded mb-2 border dark:bg-gray-700 dark:text-white"
                    rows="2"
                    required
                  ></textarea>
                  <input
                    type="text"
                    value={tributeSigner}
                    onChange={(e) => setTributeSigner(e.target.value)}
                    placeholder="Your Name"
                    className="w-full p-2 rounded mb-2 border dark:bg-gray-700 dark:text-white"
                    required
                  />
                  <button type="submit" className="bg-[#135B3A] text-white px-4 py-2 rounded text-sm font-bold hover:bg-[#0E462D]">Post Tribute</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default BookOfLife;
