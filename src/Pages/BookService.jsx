import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ProductContext } from '../Providers/ProductProvider';
import toast from 'react-hot-toast';
import ScrollReveal from '../Components/ScrollReveal';

// Nigeria States List
const NIGERIA_STATES = [
  "Enugu", "Anambra", "Ebonyi", "Abia", "Imo", "Lagos", "Abuja (FCT)", "Rivers",
  "Adamawa", "Akwa Ibom", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", 
  "Delta", "Edo", "Ekiti", "Gombe", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", 
  "Kogi", "Kwara", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", 
  "Sokoto", "Taraba", "Yobe", "Zamfara"
];

// Curated list of unique states in alphabetical order
const UNIQUE_STATES = [...new Set(NIGERIA_STATES)].sort();

// LGA mapping for major operating states
const STATES_LGAS = {
  "Enugu": [
    "Enugu East", "Enugu North", "Enugu South", "Udi", "Awgu", "Nkanu West", "Nkanu East",
    "Ezeagu", "Igbo Etiti", "Igbo Eze North", "Igbo Eze South", "Isi Uzo", "Oji River", 
    "Udenu", "Uzo Uwani", "Aninri"
  ],
  "Anambra": [
    "Awka South", "Awka North", "Onitsha North", "Onitsha South", "Nnewi North", "Nnewi South", 
    "Aguata", "Anaocha", "Dunukofia", "Idemili North", "Idemili South", "Ihiala", "Njikoka", 
    "Orumba North", "Orumba South", "Oyi", "Ayamelum", "Ogbaru"
  ],
  "Ebonyi": [
    "Abakaliki", "Afikpo North", "Afikpo South", "Ebonyi", "Ezza North", "Ezza South", 
    "Ikwo", "Ishielu", "Ivo", "Ohaozara", "Ohaukwu", "Onicha"
  ],
  "Abia": [
    "Umuahia North", "Umuahia South", "Aba North", "Aba South", "Arochukwu", "Bende", 
    "Isiala Ngwa North", "Isiala Ngwa South", "Ohafia", "Osisioma"
  ],
  "Imo": [
    "Owerri Municipal", "Owerri North", "Owerri West", "Orlu", "Okigwe", "Mbaitoli", "Ikeduru"
  ],
  "Lagos": [
    "Ikeja", "Lagos Island", "Lagos Mainland", "Victoria Island", "Alimosho", "Lekki", "Epe", "Badagry"
  ],
  "Abuja (FCT)": [
    "Garki", "Wuse", "Maitama", "Asokoro", "Gwagwalada", "Bwari", "Kuje"
  ],
  "Rivers": [
    "Port Harcourt", "Obio-Akpor", "Bonny", "Degema", "Eleme"
  ]
};

// Services Data List
const SERVICES = [
  { id: "ambulance-and-pall-bearing-service", name: "Ambulance and Pall Bearing Service", basePrice: 50000 },
  { id: "lowering-device", name: "Lowering Device", basePrice: 15000 },
  { id: "graphics-design-and-printing-services", name: "Graphics Design and Printing Services", basePrice: 10000 },
  { id: "photography-and-video-coverage", name: "Photography and Video Coverage", basePrice: 40000 },
  { id: "funeral-planning-&-co-ordination", name: "Funeral Planning & Co-ordination", basePrice: 30000 },
  { id: "custom-services", name: "Custom Services / Other", basePrice: 20000 }
];

const BookService = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(ProductContext);

    // Decode initial service selection
    const getInitialService = () => {
        if (!serviceId) return SERVICES[5]; // Default Custom
        const matched = SERVICES.find(s => 
            s.id === serviceId.toLowerCase() || 
            s.name.toLowerCase().includes(serviceId.toLowerCase().replace(/-/g, ' '))
        );
        return matched || SERVICES[5];
    };

    const [selectedService, setSelectedService] = useState(getInitialService());
    const [selectedState, setSelectedState] = useState("Enugu");
    const [selectedLga, setSelectedLga] = useState("Enugu North");
    const [customLga, setCustomLga] = useState("");
    const [isConfirmed, setIsConfirmed] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        message: ''
    });

    // Reset LGA when state changes
    useEffect(() => {
        if (STATES_LGAS[selectedState]) {
            setSelectedLga(STATES_LGAS[selectedState][0]);
            setCustomLga("");
        } else {
            setSelectedLga("Other");
            setCustomLga("");
        }
    }, [selectedState]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Calculation Engine
    const calculatePricing = () => {
        const base = selectedService.basePrice;
        let travelSurcharge = 0;
        let lgaSurcharge = 0;

        // Proximity calculation based on State
        switch (selectedState) {
            case "Enugu":
                travelSurcharge = 0;
                break;
            case "Ebonyi":
                travelSurcharge = 12000;
                break;
            case "Anambra":
                travelSurcharge = 15000;
                break;
            case "Abia":
                travelSurcharge = 18000;
                break;
            case "Imo":
                travelSurcharge = 20000;
                break;
            case "Rivers":
                travelSurcharge = 45000;
                break;
            case "Abuja (FCT)":
                travelSurcharge = 70000;
                break;
            case "Lagos":
                travelSurcharge = 80000;
                break;
            default:
                travelSurcharge = 60000; // Other States
        }

        // LGA refinement
        if (selectedState === "Enugu") {
            const centralEnugu = ["Enugu North", "Enugu South", "Enugu East"];
            const nearEnugu = ["Udi", "Awgu", "Nkanu West", "Nkanu East"];
            
            if (centralEnugu.includes(selectedLga)) {
                lgaSurcharge = 0;
            } else if (nearEnugu.includes(selectedLga)) {
                lgaSurcharge = 5000;
            } else {
                lgaSurcharge = 10000; // Remote LGAs (Igbo Eze, Ezeagu, Uzo Uwani, Oji River, etc.)
            }
        } else if (STATES_LGAS[selectedState]) {
            // Check if major capital hub LGA
            const capitalHubs = [
                "Abakaliki", "Awka South", "Umuahia North", "Umuahia South", "Aba South", 
                "Owerri Municipal", "Ikeja", "Victoria Island", "Garki", "Wuse", "Port Harcourt"
            ];
            if (capitalHubs.includes(selectedLga)) {
                lgaSurcharge = 0;
            } else {
                lgaSurcharge = 5000; // Remote LGA surcharge for travel inside neighboring state
            }
        } else {
            lgaSurcharge = 5000; // Other state custom LGA
        }

        const totalSurcharge = travelSurcharge + lgaSurcharge;
        const totalEstimated = base + totalSurcharge;

        return {
            basePrice: base,
            travelSurcharge: totalSurcharge,
            totalPrice: totalEstimated
        };
    };

    const pricing = calculatePricing();

    const handleServiceChange = (e) => {
        const matched = SERVICES.find(s => s.name === e.target.value);
        if (matched) {
            setSelectedService(matched);
            setIsConfirmed(false);
        }
    };

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        setIsConfirmed(false);
    };

    const handleLgaChange = (e) => {
        setSelectedLga(e.target.value);
        setIsConfirmed(false);
    };

    const handleAddToCart = () => {
        if (!formData.name || !formData.email || !formData.phone) {
            toast.error("Please fill in your Name, Email, and Phone Number.");
            return;
        }

        const locationString = STATES_LGAS[selectedState] 
            ? `${selectedLga}, ${selectedState} State` 
            : `${customLga || "General LGA"}, ${selectedState} State`;

        const serviceCartItem = {
            id: `service_${Date.now()}`,
            name: `${selectedService.name} Booking (${locationString})`,
            price: pricing.totalPrice,
            thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=200&auto=format&fit=crop', // generic premium service placeholder
            isService: true,
            selectedColor: null,
            bookingDetails: {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                serviceId: selectedService.id,
                serviceName: selectedService.name,
                location: locationString,
                date: formData.date || 'To be determined',
                message: formData.message || 'No additional instructions',
                basePrice: pricing.basePrice,
                travelSurcharge: pricing.travelSurcharge,
                totalPrice: pricing.totalPrice
            }
        };

        addToCart(serviceCartItem);
        toast.success(
            (t) => (
                <span className="flex items-center gap-2 text-sm text-brand-black dark:text-brand-white">
                    Service added to Cart! 
                    <Link 
                        to="/cart" 
                        onClick={() => toast.dismiss(t.id)} 
                        className="underline font-bold text-[#135B3A] dark:text-green-400 pl-1"
                    >
                        View Cart
                    </Link>
                </span>
            ),
            { duration: 5000 }
        );
        setIsConfirmed(true);
    };

    return (
        <div className="min-h-screen pt-28 pb-20 font-montserrat transition-colors duration-300">
            <Helmet>
                <title>Book a Professional Service | George Wood Caskets</title>
                <meta name="description" content="Request professional ambulance, pall bearing, lowering device, or photography funeral coverage. Instant pricing calculations based on location." />
            </Helmet>

            <div className="container mx-auto px-6 max-w-[1300px]">
                <ScrollReveal className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#135B3A] dark:text-green-500 mb-4">Book a Service</h1>
                    <p className="text-lg text-brand-black/80 dark:text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                        We provide compassionate, premium logistics and ceremonial support. Select your service, event date, and location to calculate an upfront travel and service quote.
                    </p>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
                    {/* Booking Form Card */}
                    <ScrollReveal className="lg:col-span-7 bg-brand-card dark:bg-brand-card-dark p-8 md:p-10 rounded-3xl shadow-lg border border-[#135B3A]/10 dark:border-white/5 transition-colors text-brand-black dark:text-brand-white">
                        <h2 className="text-2xl font-serif font-bold text-primary dark:text-green-400 mb-6">Booking Details</h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-brand-black/70 dark:text-gray-300 uppercase tracking-wider mb-1">Select Service</label>
                                <select
                                    value={selectedService.name}
                                    onChange={handleServiceChange}
                                    className="w-full p-3.5 border border-gray-200 dark:border-gray-700/50 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm shadow-sm"
                                >
                                    {SERVICES.map(s => (
                                        <option key={s.id} value={s.name}>{s.name} (Base: ₦{s.basePrice.toLocaleString()})</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-brand-black/70 dark:text-gray-300 uppercase tracking-wider mb-1">Your Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full p-3.5 border border-gray-200 dark:border-gray-700/50 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm shadow-sm"
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-brand-black/70 dark:text-gray-300 uppercase tracking-wider mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full p-3.5 border border-gray-200 dark:border-gray-700/50 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm shadow-sm"
                                        placeholder="Phone"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-brand-black/70 dark:text-gray-300 uppercase tracking-wider mb-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-3.5 border border-gray-200 dark:border-gray-700/50 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm shadow-sm"
                                    placeholder="Email Address"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-brand-black/70 dark:text-gray-300 uppercase tracking-wider mb-1">Select State (Nigeria)</label>
                                    <select
                                        value={selectedState}
                                        onChange={handleStateChange}
                                        className="w-full p-3.5 border border-gray-200 dark:border-gray-700/50 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm shadow-sm"
                                    >
                                        {UNIQUE_STATES.map(state => (
                                            <option key={state} value={state}>{state}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-brand-black/70 dark:text-gray-300 uppercase tracking-wider mb-1">
                                        Local Government (LGA)
                                    </label>
                                    {STATES_LGAS[selectedState] ? (
                                        <select
                                            value={selectedLga}
                                            onChange={handleLgaChange}
                                            className="w-full p-3.5 border border-gray-200 dark:border-gray-700/50 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm shadow-sm"
                                        >
                                            {STATES_LGAS[selectedState].map(lga => (
                                                <option key={lga} value={lga}>{lga}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            value={customLga}
                                            onChange={(e) => { setCustomLga(e.target.value); setIsConfirmed(false); }}
                                            required
                                            className="w-full p-3.5 border border-gray-200 dark:border-gray-700/50 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm shadow-sm"
                                            placeholder="Enter LGA name"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-brand-black/70 dark:text-gray-300 uppercase tracking-wider mb-1">Event Date (Optional)</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="w-full p-3.5 border border-gray-200 dark:border-gray-700/50 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm shadow-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-brand-black/70 dark:text-gray-300 uppercase tracking-wider mb-1">Special Instructions</label>
                                <textarea
                                    name="message"
                                    rows="3"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="w-full p-3.5 border border-gray-200 dark:border-gray-700/50 rounded-xl bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm shadow-sm"
                                    placeholder="Any custom program details or planning preferences..."
                                ></textarea>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Estimate Summary Panel */}
                    <ScrollReveal className="lg:col-span-5 flex flex-col gap-6">
                        <div className="bg-brand-card dark:bg-brand-card-dark p-8 rounded-3xl shadow-lg border border-[#135B3A]/10 dark:border-white/5 transition-colors text-brand-black dark:text-brand-white flex flex-col justify-between h-full">
                            <div>
                                <h3 className="text-xl font-serif font-bold text-primary dark:text-green-400 mb-6 pb-2 border-b border-gray-100 dark:border-white/5">Quote Summary</h3>
                                
                                <div className="space-y-4 text-sm font-medium">
                                    <div className="flex justify-between items-center text-brand-black/80 dark:text-gray-300">
                                        <span>Base Service Fee:</span>
                                        <span className="font-semibold text-brand-black dark:text-brand-white">₦{pricing.basePrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-start text-brand-black/80 dark:text-gray-300">
                                        <div>
                                            <span>Travel & Logistics:</span>
                                            <p className="text-[10px] text-gray-400 font-light mt-0.5">Calculated from Enugu</p>
                                        </div>
                                        <span className="font-semibold text-brand-black dark:text-brand-white">₦{pricing.travelSurcharge.toLocaleString()}</span>
                                    </div>
                                    <hr className="border-gray-100 dark:border-white/5" />
                                    <div className="flex justify-between items-center text-lg font-bold">
                                        <span className="text-primary dark:text-green-400">Estimated Total:</span>
                                        <span className="text-primary dark:text-green-400 font-serif text-2xl">₦{pricing.totalPrice.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="mt-8 bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-white/5 text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-light">
                                    <p className="font-semibold text-brand-black/80 dark:text-gray-300 mb-2">Dynamic Calculation Details:</p>
                                    <ul className="list-disc pl-4 space-y-1">
                                        <li>State logistics: ₦{pricing.travelSurcharge.toLocaleString()}</li>
                                        <li>Proximity category: {selectedState === "Enugu" ? "Local State" : "Inter-State Logistical Transit"}</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-8">
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full bg-[#135B3A] hover:bg-[#0E462D] text-white font-bold py-4 rounded-xl transition-all shadow-md text-sm uppercase tracking-wider text-center"
                                >
                                    Confirm Price & Add to Cart
                                </button>
                                
                                {isConfirmed && (
                                    <div className="mt-4 text-center">
                                        <Link 
                                            to="/cart" 
                                            className="inline-block w-full bg-[#A37E2C] hover:bg-amber-800 text-white font-bold py-3.5 rounded-xl transition-all text-xs uppercase tracking-wider shadow-sm"
                                        >
                                            Go to Shopping Cart
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
};

export default BookService;
