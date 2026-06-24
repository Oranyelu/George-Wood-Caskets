import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { 
    FaUserCircle, FaSignOutAlt, FaHeart, FaShoppingBag, FaHistory, 
    FaChurch, FaAward, FaShieldAlt, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope
} from "react-icons/fa";
import { useAuth } from "../Providers/AuthProvider";
import { supabase } from "../supabase";

const SummaryCard = ({ title, value, unit = "", icon, colorClass = "border-[#135B3A]" }) => (
    <div className={`bg-white dark:bg-gray-900/60 p-6 rounded-2xl border-l-4 ${colorClass} border border-gray-100 dark:border-gray-800/80 shadow-sm flex items-center justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-0.5`}>
        <div>
            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{title}</span>
            <div className="mt-1 flex items-baseline">
                <span className="text-3xl font-extrabold text-gray-900 dark:text-white font-sans">{value}</span>
                {unit && <span className="ml-1 text-xs font-bold text-gray-400 dark:text-gray-500">{unit}</span>}
            </div>
        </div>
        <div className="text-xl text-gray-400 dark:text-gray-550 bg-gray-55/50 dark:bg-gray-800/40 p-3 rounded-xl">
            {icon}
        </div>
    </div>
);

SummaryCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    unit: PropTypes.string,
    icon: PropTypes.element,
    colorClass: PropTypes.string
};

const TabButton = ({ active, label, icon, onClick }) => (
    <button
        onClick={onClick}
        role="tab"
        aria-selected={active}
        className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
            active 
                ? 'bg-[#135B3A] text-white dark:bg-green-700 shadow-md transform scale-[1.02]' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-150/80 dark:text-gray-400 dark:hover:bg-gray-800/60 hover:text-gray-950 dark:hover:text-white'
        }`}
    >
        <span className={active ? 'text-[#D4AF37] dark:text-yellow-400' : 'text-gray-400'}>{icon}</span>
        <span>{label}</span>
    </button>
);

TabButton.propTypes = {
    active: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    onClick: PropTypes.func.isRequired
};

const DashboardSkeleton = () => (
    <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
                <div key={n} className="border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
                        </div>
                    </div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                </div>
            ))}
        </div>
    </div>
);

const UserDashboard = () => {
    const { user, isAdmin, logout } = useAuth();
    
    const [orders, setOrders] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [viewHistory, setViewHistory] = useState([]);
    const [memorials, setMemorials] = useState([]);
    const [bonds, setBonds] = useState([]);
    const [payments, setPayments] = useState([]);
    const [donations, setDonations] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [activeSection, setActiveSection] = useState("favorites");

    // Profile settings states
    const [profile, setProfile] = useState({ name: "", phone: "", address: "" });
    const [profileLoading, setProfileLoading] = useState(false);
    const [profileSuccess, setProfileSuccess] = useState("");
    const [profileError, setProfileError] = useState("");

    useEffect(() => {
        if (!user) return;

        const loadDashboardData = async () => {
            setDataLoading(true);
            try {
                // Fetch Profile details
                let { data: profileData, error: profileErr } = await supabase
                    .from("profiles")
                    .select("name, phone, address")
                    .eq("id", user.id)
                    .maybeSingle();

                if (profileErr) {
                    console.error("Error loading profile:", profileErr);
                } else if (profileData) {
                    setProfile({
                        name: profileData.name || "",
                        phone: profileData.phone || "",
                        address: profileData.address || ""
                    });
                } else {
                    // Profile row doesn't exist yet
                    const { data: newProfile } = await supabase
                        .from("profiles")
                        .insert({ id: user.id, email: user.email, role: "user" })
                        .select("name, phone, address")
                        .maybeSingle();
                    if (newProfile) {
                        setProfile({
                            name: newProfile.name || "",
                            phone: newProfile.phone || "",
                            address: newProfile.address || ""
                        });
                    }
                }

                // 1. Fetch Orders
                const { data: ordersData } = await supabase
                    .from("orders")
                    .select("*")
                    .eq("user_id", user.id)
                    .order("created_at", { ascending: false });

                // 2. Fetch Favorites
                const { data: favoritesData } = await supabase
                    .from("favorites")
                    .select("*")
                    .eq("user_id", user.id)
                    .order("created_at", { ascending: false });

                // 3. Fetch View History
                const { data: viewHistoryData } = await supabase
                    .from("view_history")
                    .select("*")
                    .eq("user_id", user.id)
                    .order("viewed_at", { ascending: false })
                    .limit(12);

                // 4. Fetch Memorials
                const { data: memorialsData } = await supabase
                    .from("memorials")
                    .select("*")
                    .eq("user_id", user.id)
                    .order("created_at", { ascending: false });

                // 5. Fetch Bonds Subscriptions
                const { data: bondsData } = await supabase
                    .from("bonds")
                    .select("*")
                    .eq("user_id", user.id)
                    .order("created_at", { ascending: false });

                // 6. Fetch Payments
                const { data: paymentsData } = await supabase
                    .from("payments")
                    .select("*")
                    .eq("user_id", user.id)
                    .order("paid_at", { ascending: false });

                // 7. Fetch Donations
                const { data: donationsData } = await supabase
                    .from("donations")
                    .select("*")
                    .eq("user_id", user.id)
                    .order("created_at", { ascending: false });

                setOrders(ordersData || []);
                setFavorites((favoritesData || []).map(f => f.product_details));
                setViewHistory((viewHistoryData || []).map(vh => ({
                    ...vh.product_details,
                    viewedAt: vh.viewed_at
                })));
                setMemorials((memorialsData || []).map(m => ({
                    id: m.id,
                    name: m.name,
                    birthYear: m.birth_year,
                    deathYear: m.death_year,
                    bio: m.bio,
                    status: m.status,
                    image: m.image,
                    createdAt: m.created_at
                })));
                setBonds((bondsData || []).map(b => ({
                    id: b.id,
                    name: b.name,
                    planType: b.plan_type,
                    status: b.status,
                    startDate: b.start_date,
                    nextPaymentDate: b.next_payment_date,
                    monthlyPrice: b.monthly_price,
                    paymentReference: b.payment_reference,
                    createdAt: b.created_at
                })));
                setPayments((paymentsData || []).map(p => ({
                    id: p.id,
                    subscriptionId: p.subscription_id,
                    amount: p.amount,
                    reference: p.reference,
                    status: p.status,
                    paidAt: p.paid_at,
                    planType: p.plan_type
                })));
                setDonations((donationsData || []).map(d => ({
                    id: d.id,
                    amount: d.amount,
                    tier: d.tier,
                    paymentReference: d.payment_reference,
                    status: d.status,
                    createdAt: d.created_at
                })));

            } catch (error) {
                console.error("Error loading user dashboard history:", error);
            } finally {
                setDataLoading(false);
            }
        };

        loadDashboardData();
    }, [user]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setProfileLoading(true);
        setProfileSuccess("");
        setProfileError("");
        try {
            const { error } = await supabase
                .from("profiles")
                .update({
                    name: profile.name,
                    phone: profile.phone,
                    address: profile.address
                })
                .eq("id", user.id);
            if (error) throw error;
            setProfileSuccess("Profile updated successfully!");
        } catch (err) {
            console.error("Error updating profile:", err);
            setProfileError(`Failed to update profile: ${err.message}`);
        } finally {
            setProfileLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen pt-32 text-center flex flex-col justify-center items-center bg-gray-50 dark:bg-[#0a0a0a]">
                <div className="p-8 rounded-3xl border border-gray-100 dark:border-gray-800/80 bg-white dark:bg-gray-900 shadow-sm max-w-sm w-full mx-4">
                    <FaUserCircle className="text-6xl text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-650 dark:text-gray-300 font-medium mb-6">Please log in to view your dashboard.</p>
                    <Link to="/login" className="inline-block bg-[#135B3A] hover:bg-[#0E462D] text-white px-6 py-3 rounded-2xl font-bold text-sm tracking-wider uppercase transition-all w-full">
                        Login Here
                    </Link>
                </div>
            </div>
        );
    }

    const totalDonated = donations.reduce((sum, d) => sum + Number(d.amount), 0);
    const activeBondsCount = bonds.filter(b => b.status === "active").length;

    return (
        <div className="min-h-screen pt-24 pb-16 font-montserrat transition-colors duration-300 bg-gray-50 dark:bg-[#0a0a0a]">
            <div className="max-w-[1300px] mx-auto px-4 md:px-8">
                
                {/* Header card */}
                <div className="relative overflow-hidden mb-8 bg-gradient-to-r from-[#135B3A] to-[#0A3D25] text-white p-6 md:p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-850/10">
                    {/* Background decorations */}
                    <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-10 translate-x-10 text-9xl">
                        <FaUserCircle />
                    </div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            {user?.user_metadata?.avatar_url || user?.user_metadata?.picture ? (
                                <img
                                    src={user.user_metadata.avatar_url || user.user_metadata.picture}
                                    alt="Profile Avatar"
                                    className="w-20 h-20 rounded-full object-cover border-4 border-white/20 shadow-xl"
                                />
                            ) : (
                                <div className="bg-white/10 p-4 rounded-full text-5xl">
                                    <FaUserCircle />
                                </div>
                            )}
                            <div>
                                <span className="text-[10px] font-bold text-gray-300 dark:text-gray-400 uppercase tracking-widest">Welcome back,</span>
                                <h1 className="text-2xl md:text-3xl font-bold font-serif mt-1 text-white leading-tight">{profile.name || user.email}</h1>
                                <p className="text-xs text-gray-300 font-medium mt-1">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {isAdmin && (
                                <Link 
                                    to="/admin/dashboard" 
                                    className="bg-[#D4AF37] hover:bg-[#C29E2E] text-brand-black px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-md transition-all hover:-translate-y-0.5"
                                >
                                    Admin Panel
                                </Link>
                            )}
                            <button
                                onClick={logout}
                                className="bg-white/10 hover:bg-white/25 text-white border border-white/20 px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all hover:-translate-y-0.5"
                            >
                                <FaSignOutAlt /> Log Out
                            </button>
                        </div>
                    </div>
                </div>

                {/* Summary Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <SummaryCard title="Saved Favorites" value={favorites.length} icon={<FaHeart />} colorClass="border-red-400" />
                    <SummaryCard title="Active Pre-Planning Bonds" value={activeBondsCount} icon={<FaShieldAlt />} colorClass="border-[#135B3A]" />
                    <SummaryCard title="Legacy Contributions" value={totalDonated.toLocaleString()} unit="NGN" icon={<FaAward />} colorClass="border-[#D4AF37]" />
                    <SummaryCard title="Uploaded Memorials" value={memorials.length} icon={<FaChurch />} colorClass="border-purple-400" />
                </div>

                {/* Dashboard Main Layout */}
                <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 rounded-3xl shadow-sm overflow-hidden">
                    
                    {/* Tab Navigation Segmented Controller */}
                    <div className="flex items-center gap-2 overflow-x-auto p-3 bg-gray-50/50 dark:bg-gray-900/30 border-b border-gray-100 dark:border-gray-800/80 scrollbar-none">
                        <TabButton 
                            active={activeSection === "favorites"} 
                            label="Favorites" 
                            icon={<FaHeart />} 
                            onClick={() => setActiveSection("favorites")} 
                        />
                        <TabButton 
                            active={activeSection === "orders"} 
                            label="Order History" 
                            icon={<FaShoppingBag />} 
                            onClick={() => setActiveSection("orders")} 
                        />
                        <TabButton 
                            active={activeSection === "viewHistory"} 
                            label="Recently Viewed" 
                            icon={<FaHistory />} 
                            onClick={() => setActiveSection("viewHistory")} 
                        />
                        <TabButton 
                            active={activeSection === "memorials"} 
                            label="My Memorials" 
                            icon={<FaChurch />} 
                            onClick={() => setActiveSection("memorials")} 
                        />
                        <TabButton 
                            active={activeSection === "bonds"} 
                            label="Pre-Planning Bonds" 
                            icon={<FaShieldAlt />} 
                            onClick={() => setActiveSection("bonds")} 
                        />
                        <TabButton 
                            active={activeSection === "donations"} 
                            label="Legacy Donations" 
                            icon={<FaAward />} 
                            onClick={() => setActiveSection("donations")} 
                        />
                        <TabButton 
                            active={activeSection === "profile"} 
                            label="Profile Settings" 
                            icon={<FaUserCircle />} 
                            onClick={() => setActiveSection("profile")} 
                        />
                    </div>

                    {/* Section details */}
                    <div className="p-6 md:p-8">
                        {dataLoading ? (
                            <DashboardSkeleton />
                        ) : (
                            <>
                                {/* FAVORITES SECTION */}
                                {activeSection === "favorites" && (
                                    <div className="animate-fadeInScale">
                                        {favorites.length === 0 ? (
                                            <div className="py-16 text-center max-w-sm mx-auto">
                                                <FaHeart className="text-4xl text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                                                <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm font-light leading-relaxed">You haven&apos;t added any products to your favorites yet.</p>
                                                <Link to="/products" className="inline-block bg-[#135B3A] hover:bg-[#0E462D] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all">Explore Products</Link>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {favorites.map((prod) => (
                                                    <div key={prod.id} className="group border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-2xl p-4 flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                                                        <div className="flex items-center gap-4 mb-4">
                                                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-850 flex-shrink-0">
                                                                <img src={prod.thumbnail || prod.image} alt={prod.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-serif font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-[#135B3A] dark:group-hover:text-green-400 transition-colors">{prod.name}</h4>
                                                                <span className="text-[10px] tracking-wider text-gray-400 dark:text-gray-500 font-bold uppercase">{prod.category}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-end border-t border-gray-50 dark:border-gray-805 pt-3 mt-2">
                                                            <Link to={`/product/${prod.id}`} className="text-xs font-bold text-[#135B3A] dark:text-green-400 hover:text-[#A37E2C] dark:hover:text-yellow-400 uppercase tracking-widest transition-colors">View Details →</Link>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* ORDER HISTORY SECTION */}
                                {activeSection === "orders" && (
                                    <div className="space-y-6 animate-fadeInScale">
                                        {orders.length === 0 ? (
                                            <div className="py-16 text-center max-w-sm mx-auto">
                                                <FaShoppingBag className="text-4xl text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                                                <p className="text-gray-550 dark:text-gray-400 font-light text-sm">No purchases found.</p>
                                            </div>
                                        ) : (
                                            orders.map((ord) => (
                                                <div key={ord.id} className="border border-gray-100 dark:border-gray-800 rounded-2xl p-6 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all">
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50 dark:border-gray-800/85 pb-4 mb-4">
                                                        <div>
                                                            <p className="text-[10px] text-gray-400 dark:text-gray-550 font-bold uppercase tracking-wider">Order ID</p>
                                                            <span className="font-mono text-sm font-semibold text-gray-850 dark:text-gray-250">{ord.id}</span>
                                                        </div>
                                                        <div className="flex items-center gap-6">
                                                            <div>
                                                                <p className="text-[10px] text-gray-400 dark:text-gray-550 font-bold uppercase tracking-wider">Date Placed</p>
                                                                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                                                                    {new Date(ord.created_at).toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                            <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider border ${
                                                                ord.status === "delivered" 
                                                                    ? "bg-green-50 text-green-700 border-green-250 dark:bg-green-950/20 dark:text-green-400 dark:border-green-900/30" 
                                                                    : ord.status === "shipped"
                                                                    ? "bg-blue-50 text-blue-700 border-blue-250 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30"
                                                                    : "bg-amber-50 text-amber-700 border-amber-250 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30"
                                                            }`}>
                                                                {ord.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="mb-4">
                                                        <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider mb-3">Purchased Items</p>
                                                        <ul className="space-y-3">
                                                            {(ord.items || []).map((item, index) => (
                                                                <li key={index} className="flex justify-between items-center text-sm border-b border-dashed border-gray-55 dark:border-gray-800/85 pb-2 last:border-0 last:pb-0">
                                                                    <div className="flex flex-col">
                                                                        <span className="text-gray-900 dark:text-white font-semibold">{item.name}</span>
                                                                        {item.selectedColor && (
                                                                            <span className="text-[10px] text-gray-405 font-medium">Color: {item.selectedColor}</span>
                                                                        )}
                                                                    </div>
                                                                    <span className="font-mono font-bold text-gray-750 dark:text-gray-300">Qty: {item.quantity || 1}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-50 dark:border-gray-800/80 pt-4 mt-2 gap-4">
                                                        <div className="text-sm">
                                                            <span className="text-gray-450 font-medium">Total Paid: </span>
                                                            <span className="font-bold text-gray-900 dark:text-white">{ord.total_amount ? `${ord.total_amount.toLocaleString()} NGN` : "Custom Quote"}</span>
                                                        </div>
                                                        <Link 
                                                            to={`/track-order?id=${ord.id}`} 
                                                            className="text-xs font-bold bg-[#135B3A] hover:bg-[#A37E2C] dark:bg-green-700 dark:hover:bg-green-800 text-white px-5 py-2.5 rounded-xl transition-all uppercase tracking-widest shadow-sm hover:shadow-md"
                                                        >
                                                            Track Shipment
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}

                                {/* VIEW HISTORY SECTION */}
                                {activeSection === "viewHistory" && (
                                    <div className="animate-fadeInScale">
                                        {viewHistory.length === 0 ? (
                                            <div className="py-16 text-center max-w-sm mx-auto">
                                                <FaHistory className="text-4xl text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                                                <p className="text-gray-500 dark:text-gray-400 font-light text-sm">No view history found.</p>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {viewHistory.map((vh, index) => (
                                                    <div key={index} className="group border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-2xl p-4 flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                                                        <div className="flex items-center gap-4 mb-4">
                                                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-850 flex-shrink-0">
                                                                <img src={vh.thumbnail || vh.image} alt={vh.name} className="w-full h-full object-cover" />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-serif font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-[#135B3A] dark:group-hover:text-green-400 transition-colors">{vh.name}</h4>
                                                                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                                                                    Viewed: {new Date(vh.viewedAt).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-end border-t border-gray-50 dark:border-gray-800/80 pt-3 mt-2">
                                                            <Link to={`/product/${vh.id}`} className="text-xs font-bold text-[#135B3A] dark:text-green-400 hover:text-[#A37E2C] dark:hover:text-yellow-400 uppercase tracking-widest transition-colors">View Details →</Link>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* UPLOADED MEMORIALS SECTION */}
                                {activeSection === "memorials" && (
                                    <div className="animate-fadeInScale">
                                        {memorials.length === 0 ? (
                                            <div className="py-16 text-center max-w-sm mx-auto">
                                                <FaChurch className="text-4xl text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                                                <p className="text-gray-550 dark:text-gray-400 mb-6 text-sm font-light leading-relaxed">You haven&apos;t uploaded any memorials yet.</p>
                                                <Link to="/book-of-life" className="inline-block bg-[#135B3A] hover:bg-[#0E462D] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all">Submit Memorial</Link>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {memorials.map((mem) => (
                                                    <div key={mem.id} className="border border-gray-100 dark:border-gray-850 rounded-2xl p-5 flex gap-5 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-300">
                                                        <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 border-gray-100 dark:border-gray-800 shadow-inner bg-gray-50">
                                                            <img src={mem.image} alt={mem.name} className="w-full h-full object-cover animate-fadeInScale" />
                                                        </div>
                                                        <div className="flex-1 flex flex-col justify-between">
                                                            <div>
                                                                <div className="flex items-center justify-between gap-2">
                                                                    <h4 className="font-bold text-gray-900 dark:text-white font-serif text-lg leading-tight">{mem.name}</h4>
                                                                    <span className={`text-[9px] px-2 py-0.5 rounded font-extrabold uppercase tracking-widest border ${
                                                                        mem.status === "approved" 
                                                                            ? "bg-green-50 text-green-700 border-green-200" 
                                                                            : "bg-amber-50 text-amber-700 border-amber-200"
                                                                    }`}>
                                                                        {mem.status}
                                                                    </span>
                                                                </div>
                                                                <p className="text-xs font-semibold text-[#A37E2C] dark:text-yellow-500 mt-1">{mem.birthYear} – {mem.deathYear}</p>
                                                                <p className="text-xs text-gray-550 dark:text-gray-400 mt-2 line-clamp-2 italic leading-relaxed">
                                                                    &ldquo;{mem.bio}&rdquo;
                                                                </p>
                                                            </div>
                                                            <div className="mt-3 text-right">
                                                                <Link to="/book-of-life" className="text-xs font-bold text-[#135B3A] dark:text-green-400 hover:text-[#A37E2C] dark:hover:text-yellow-400 transition-colors uppercase tracking-wider">
                                                                    View Memorial Wall →
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* PRE-PLANNING BONDS SECTION */}
                                {activeSection === "bonds" && (
                                    <div className="space-y-8 animate-fadeInScale">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 font-serif border-b border-gray-50 dark:border-gray-800 pb-2">Active Subscriptions</h3>
                                            {bonds.length === 0 ? (
                                                <div className="py-12 text-center max-w-sm mx-auto">
                                                    <FaShieldAlt className="text-4xl text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                                                    <p className="text-gray-500 dark:text-gray-450 font-light text-sm leading-relaxed mb-6">You don&apos;t have any active pre-planning bonds yet.</p>
                                                    <Link to="/bonds" className="inline-block bg-[#135B3A] hover:bg-[#0E462D] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all">Browse Pre-Planning Plans</Link>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {bonds.map((bond) => (
                                                        <div key={bond.id} className="border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm">
                                                            <div className="flex items-center justify-between border-b border-gray-50 dark:border-gray-800 pb-3 mb-3">
                                                                <span className="font-bold text-gray-900 dark:text-white capitalize">{bond.planType} Plan</span>
                                                                <span className={`text-[10px] px-2.5 py-0.5 rounded font-extrabold uppercase border ${
                                                                    bond.status === "active" 
                                                                        ? "bg-green-50 text-green-700 border-green-200" 
                                                                        : "bg-red-50 text-red-700 border-red-200"
                                                                }`}>
                                                                    {bond.status}
                                                                </span>
                                                            </div>
                                                            <div className="space-y-2 text-sm">
                                                                <div className="flex justify-between">
                                                                    <span className="text-gray-400">Monthly Contribution:</span>
                                                                    <span className="font-extrabold text-gray-950 dark:text-white">{Number(bond.monthlyPrice)?.toLocaleString()} NGN</span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span className="text-gray-400">Start Date:</span>
                                                                    <span className="font-semibold text-gray-850 dark:text-gray-200">
                                                                        {new Date(bond.startDate).toLocaleDateString()}
                                                                    </span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span className="text-gray-400">Next Renewal Payment:</span>
                                                                    <span className="font-semibold text-gray-850 dark:text-gray-200">
                                                                        {bond.nextPaymentDate ? new Date(bond.nextPaymentDate).toLocaleDateString() : 'Pending'}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 font-serif border-b border-gray-50 dark:border-gray-800 pb-2">Payment History Logs</h3>
                                            {payments.length === 0 ? (
                                                <p className="text-gray-550 dark:text-gray-400 font-light text-sm py-4">No payment logs recorded yet.</p>
                                            ) : (
                                                <div className="w-full">
                                                    {/* Mobile Card List */}
                                                    <div className="block md:hidden space-y-4">
                                                        {payments.map((pmt) => (
                                                            <div key={pmt.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 rounded-2xl p-5 shadow-sm space-y-3">
                                                                <div className="flex justify-between items-center border-b border-gray-50 dark:border-gray-850 pb-2">
                                                                    <span className="text-xs text-gray-450 dark:text-gray-500 font-bold uppercase">Date</span>
                                                                    <span className="text-xs font-semibold text-gray-750 dark:text-gray-200">{new Date(pmt.paidAt).toLocaleDateString()}</span>
                                                                </div>
                                                                <div className="flex justify-between items-center">
                                                                    <span className="text-xs text-gray-450 dark:text-gray-550 font-bold uppercase">Plan Type</span>
                                                                    <span className="text-xs font-bold text-[#135B3A] dark:text-green-400 capitalize">{pmt.planType}</span>
                                                                </div>
                                                                <div className="flex justify-between items-center">
                                                                    <span className="text-xs text-gray-450 dark:text-gray-550 font-bold uppercase">Amount</span>
                                                                    <span className="text-sm font-extrabold text-gray-900 dark:text-white">{pmt.amount?.toLocaleString()} NGN</span>
                                                                </div>
                                                                <div className="flex justify-between items-center">
                                                                    <span className="text-xs text-gray-455 dark:text-gray-555 font-bold uppercase">Reference</span>
                                                                    <span className="font-mono text-[10px] text-gray-500 max-w-[150px] truncate">{pmt.reference}</span>
                                                                </div>
                                                                <div className="flex justify-between items-center pt-1">
                                                                    <span className="text-xs text-gray-455 dark:text-gray-555 font-bold uppercase">Status</span>
                                                                    <span className={`text-[9px] px-2 py-0.5 rounded font-extrabold uppercase border ${
                                                                        pmt.status === "success" 
                                                                            ? "bg-green-50 text-green-700 border-green-150 dark:bg-green-950/20 dark:text-green-400 dark:border-green-900/30" 
                                                                            : "bg-amber-50 text-amber-700 border-amber-150 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30"
                                                                    }`}>
                                                                        {pmt.status}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Desktop Table View */}
                                                    <div className="hidden md:block overflow-hidden border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm bg-white dark:bg-gray-900">
                                                        <table className="min-w-full text-sm">
                                                            <thead className="bg-gray-50 dark:bg-gray-800/50">
                                                                <tr>
                                                                    <th className="py-3.5 px-6 text-left text-xs font-bold text-gray-400 dark:text-gray-550 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">Date Paid</th>
                                                                    <th className="py-3.5 px-6 text-left text-xs font-bold text-gray-400 dark:text-gray-550 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">Plan Type</th>
                                                                    <th className="py-3.5 px-6 text-left text-xs font-bold text-gray-400 dark:text-gray-555 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">Amount</th>
                                                                    <th className="py-3.5 px-6 text-left text-xs font-bold text-gray-400 dark:text-gray-555 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">Payment Reference</th>
                                                                    <th className="py-3.5 px-6 text-left text-xs font-bold text-gray-400 dark:text-gray-555 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">Status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/80">
                                                                {payments.map((pmt) => (
                                                                    <tr key={pmt.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                                                        <td className="py-4 px-6 text-gray-750 dark:text-gray-300 font-medium">
                                                                            {new Date(pmt.paidAt).toLocaleDateString()}
                                                                        </td>
                                                                        <td className="py-4 px-6 text-[#135B3A] dark:text-green-400 capitalize font-bold">
                                                                            {pmt.planType}
                                                                        </td>
                                                                        <td className="py-4 px-6 text-gray-900 dark:text-white font-extrabold">
                                                                            {pmt.amount?.toLocaleString()} NGN
                                                                        </td>
                                                                        <td className="py-4 px-6 text-gray-550 dark:text-gray-400 font-mono text-xs">
                                                                            {pmt.reference}
                                                                        </td>
                                                                        <td className="py-4 px-6">
                                                                            <span className={`text-[9px] px-2 py-0.5 rounded font-extrabold uppercase border ${
                                                                                pmt.status === "success" 
                                                                                    ? "bg-green-50 text-green-700 border-green-150 dark:bg-green-950/20 dark:text-green-400 dark:border-green-900/30" 
                                                                                    : "bg-amber-50 text-amber-700 border-amber-150 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30"
                                                                            }`}>
                                                                                {pmt.status}
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* LEGACY DONATIONS SECTION */}
                                {activeSection === "donations" && (
                                    <div className="animate-fadeInScale">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 font-serif border-b border-gray-50 dark:border-gray-800 pb-2">Contribution Records</h3>
                                        {donations.length === 0 ? (
                                            <div className="py-16 text-center max-w-sm mx-auto">
                                                <FaAward className="text-4xl text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                                                <p className="text-gray-550 dark:text-gray-450 mb-6 text-sm font-light leading-relaxed">No donation records found.</p>
                                                <Link to="/charity" className="inline-block bg-[#135B3A] hover:bg-[#0E462D] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all">Support Campaigns</Link>
                                            </div>
                                        ) : (
                                            <div className="w-full">
                                                {/* Mobile Card List */}
                                                <div className="block md:hidden space-y-4">
                                                    {donations.map((don) => (
                                                        <div key={don.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 rounded-2xl p-5 shadow-sm space-y-3">
                                                            <div className="flex justify-between items-center border-b border-gray-50 dark:border-gray-850 pb-2">
                                                                <span className="text-xs text-gray-450 dark:text-gray-500 font-bold uppercase">Date</span>
                                                                <span className="text-xs font-semibold text-gray-750 dark:text-gray-250">{new Date(don.createdAt).toLocaleDateString()}</span>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-xs text-gray-455 dark:text-gray-550 font-bold uppercase">Campaign Tier</span>
                                                                <span className="text-xs font-bold text-[#135B3A] dark:text-green-400 capitalize">{don.tier}</span>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-xs text-gray-455 dark:text-gray-555 font-bold uppercase">Amount</span>
                                                                <span className="text-sm font-extrabold text-gray-900 dark:text-white">{don.amount?.toLocaleString()} NGN</span>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-xs text-gray-455 dark:text-gray-555 font-bold uppercase">Reference</span>
                                                                <span className="font-mono text-[10px] text-gray-550 max-w-[150px] truncate">{don.paymentReference}</span>
                                                            </div>
                                                            <div className="flex justify-between items-center pt-1">
                                                                <span className="text-xs text-gray-455 dark:text-gray-555 font-bold uppercase">Status</span>
                                                                <span className="text-[9px] px-2 py-0.5 rounded font-extrabold uppercase bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400 border border-green-150 dark:border-green-900/30">
                                                                    {don.status || 'success'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Desktop Table View */}
                                                <div className="hidden md:block overflow-hidden border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm bg-white dark:bg-gray-900">
                                                    <table className="min-w-full text-sm">
                                                        <thead className="bg-gray-55 dark:bg-gray-800/50">
                                                            <tr>
                                                                <th className="py-3.5 px-6 text-left text-xs font-bold text-gray-400 dark:text-gray-555 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">Date</th>
                                                                <th className="py-3.5 px-6 text-left text-xs font-bold text-gray-400 dark:text-gray-555 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">Tier / Level</th>
                                                                <th className="py-3.5 px-6 text-left text-xs font-bold text-gray-400 dark:text-gray-555 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">Amount</th>
                                                                <th className="py-3.5 px-6 text-left text-xs font-bold text-gray-400 dark:text-gray-555 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">Reference</th>
                                                                <th className="py-3.5 px-6 text-left text-xs font-bold text-gray-400 dark:text-gray-555 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">Status</th>
                                                             </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800/80">
                                                            {donations.map((don) => (
                                                                <tr key={don.id} className="hover:bg-gray-55 dark:hover:bg-gray-800/30 transition-colors">
                                                                    <td className="py-4 px-6 text-gray-750 dark:text-gray-300 font-medium">
                                                                        {new Date(don.createdAt).toLocaleDateString()}
                                                                    </td>
                                                                    <td className="py-4 px-6 text-[#135B3A] dark:text-green-400 capitalize font-bold">
                                                                        {don.tier}
                                                                    </td>
                                                                    <td className="py-4 px-6 text-gray-900 dark:text-white font-extrabold">
                                                                        {don.amount?.toLocaleString()} NGN
                                                                    </td>
                                                                    <td className="py-4 px-6 text-gray-555 dark:text-gray-400 font-mono text-xs">
                                                                        {don.paymentReference}
                                                                    </td>
                                                                    <td className="py-4 px-6">
                                                                        <span className="text-[9px] px-2 py-0.5 rounded font-extrabold uppercase bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400 border border-green-150 dark:border-green-900/30">
                                                                            {don.status || 'success'}
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* PROFILE SETTINGS SECTION */}
                                {activeSection === "profile" && (
                                    <div className="max-w-xl mx-auto animate-fadeInScale">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 font-serif border-b border-gray-50 dark:border-gray-800 pb-2">Profile Settings</h3>
                                        
                                        {profileSuccess && (
                                            <div className="text-green-750 dark:text-green-400 bg-green-50 dark:bg-green-950/20 py-2.5 px-4 rounded-xl text-sm mb-6 text-center border border-green-150 dark:border-green-900/30">
                                                {profileSuccess}
                                            </div>
                                        )}
                                        {profileError && (
                                            <div className="text-red-650 dark:text-red-400 bg-red-50 dark:bg-red-950/20 py-2.5 px-4 rounded-xl text-sm mb-6 text-center border border-red-155 dark:border-red-900/30">
                                                {profileError}
                                            </div>
                                        )}
                                        
                                        <form onSubmit={handleUpdateProfile} className="space-y-5">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Email Address (Non-editable)</label>
                                                <div className="relative">
                                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                                                        <FaEnvelope size={14} />
                                                    </span>
                                                    <input
                                                        type="text"
                                                        disabled
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 text-gray-500 cursor-not-allowed text-sm focus:outline-none"
                                                        value={user.email}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 dark:text-gray-550 uppercase tracking-widest mb-2">Full Name</label>
                                                <div className="relative">
                                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                                                        <FaUserCircle size={14} />
                                                    </span>
                                                    <input
                                                        type="text"
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-350 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm"
                                                        value={profile.name}
                                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                                        placeholder="Enter your full name"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 dark:text-gray-555 uppercase tracking-widest mb-2">Phone Number</label>
                                                <div className="relative">
                                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-405 pointer-events-none">
                                                        <FaPhoneAlt size={14} />
                                                    </span>
                                                    <input
                                                        type="tel"
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm"
                                                        value={profile.phone}
                                                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                                        placeholder="Enter your phone number"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 dark:text-gray-555 uppercase tracking-widest mb-2">Shipping / Contact Address</label>
                                                <div className="relative">
                                                    <span className="absolute top-3.5 left-3.5 text-gray-400 pointer-events-none">
                                                        <FaMapMarkerAlt size={14} />
                                                    </span>
                                                    <textarea
                                                        rows="4"
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm"
                                                        value={profile.address}
                                                        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                                        placeholder="Enter your primary address"
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div className="pt-2">
                                                <button
                                                    type="submit"
                                                    disabled={profileLoading}
                                                    className="w-full bg-[#135B3A] hover:bg-[#0E462D] dark:bg-green-700 dark:hover:bg-green-800 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md text-xs uppercase tracking-widest disabled:opacity-50 hover:-translate-y-0.5"
                                                >
                                                    {profileLoading ? "Saving Changes..." : "Save Profile Settings"}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
