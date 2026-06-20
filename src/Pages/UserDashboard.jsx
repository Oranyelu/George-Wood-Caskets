import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { 
    FaUserCircle, FaPenFancy, FaCalendarAlt, FaHandsHelping, FaSignOutAlt, 
    FaHeart, FaShoppingBag, FaHistory, FaChurch, FaAward, FaShieldAlt 
} from "react-icons/fa";
import { useAuth } from "../Providers/AuthProvider";
import { supabase } from "../supabase";

const SummaryCard = ({ title, value, unit = "" }) => (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{title}</span>
        <div className="mt-2 flex items-baseline">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{value}</span>
            {unit && <span className="ml-1 text-sm font-semibold text-gray-500">{unit}</span>}
        </div>
    </div>
);

SummaryCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    unit: PropTypes.string
};

const TabButton = ({ active, label, icon, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-5 py-3 border-b-2 font-medium text-sm transition-all whitespace-nowrap ${
            active 
                ? 'border-[#135B3A] text-[#135B3A] dark:border-green-500 dark:text-green-400 font-bold' 
                : 'border-transparent text-gray-550 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
        }`}
    >
        {icon}
        <span>{label}</span>
    </button>
);

TabButton.propTypes = {
    active: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    onClick: PropTypes.func.isRequired
};

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
                    // Profile row doesn't exist yet (e.g. signup via OAuth redirect callback)
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
            <div className="min-h-screen pt-32 text-center">
                <p>Please log in to view your dashboard.</p>
                <Link to="/login" className="text-blue-500 underline">Login here</Link>
            </div>
        );
    }

    const totalDonated = donations.reduce((sum, d) => sum + Number(d.amount), 0);
    const activeBondsCount = bonds.filter(b => b.status === "active").length;

    return (
        <div className="min-h-screen pt-24 pb-12 font-montserrat transition-colors duration-300 bg-gray-50 dark:bg-[#0a0a0a]">
            <div className="max-w-[1300px] mx-auto px-4 md:px-8">
                {/* Header card */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-4">
                        <FaUserCircle className="text-6xl text-gray-400 dark:text-gray-600" />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-serif">{user.email}</h1>
                            <p className="text-gray-550 dark:text-gray-400 text-sm">Account Dashboard</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {isAdmin && (
                            <Link 
                                to="/admin/dashboard" 
                                className="bg-[#135B3A] hover:bg-[#0E462D] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all"
                            >
                                Admin Panel
                            </Link>
                        )}
                        <button
                            onClick={logout}
                            className="border border-red-200 text-red-650 hover:bg-red-50 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-950/20 px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all"
                        >
                            <FaSignOutAlt /> Log Out
                        </button>
                    </div>
                </div>

                {/* Summary Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <SummaryCard title="Saved Favorites" value={favorites.length} />
                    <SummaryCard title="Active pre-planning bonds" value={activeBondsCount} />
                    <SummaryCard title="Legacy Contributions" value={totalDonated.toLocaleString()} unit="NGN" />
                    <SummaryCard title="Uploaded Memorials" value={memorials.length} />
                </div>

                {/* Dashboard Main layout */}
                <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
                    {/* Tab Navigation header */}
                    <div className="flex items-center overflow-x-auto border-b border-gray-150 dark:border-gray-800 px-6 bg-gray-50/50 dark:bg-gray-900/30">
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
                            <div className="py-12 text-center text-gray-500">Loading details...</div>
                        ) : (
                            <>
                                {/* FAVORITES SECTION */}
                                {activeSection === "favorites" && (
                                    <div>
                                        {favorites.length === 0 ? (
                                            <div className="py-12 text-center">
                                                <p className="text-gray-550 dark:text-gray-400 mb-4 text-sm font-light">You haven&apos;t added any products to your favorites yet.</p>
                                                <Link to="/products" className="text-[#135B3A] dark:text-green-500 font-bold hover:underline">Explore Products</Link>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {favorites.map((prod) => (
                                                    <div key={prod.id} className="border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition-all">
                                                        <div className="flex items-center gap-4 mb-4">
                                                            <img src={prod.thumbnail || prod.image} alt={prod.name} className="w-16 h-16 object-cover rounded bg-white" />
                                                            <div>
                                                                <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1">{prod.name}</h4>
                                                                <span className="text-xs text-gray-400 dark:text-gray-550 font-bold uppercase">{prod.category}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-end border-t border-gray-100 dark:border-gray-850 pt-3 mt-2">
                                                            <Link to={`/product/${prod.id}`} className="text-xs font-bold text-gray-650 hover:text-black dark:text-gray-400 dark:hover:text-white uppercase tracking-wider">View Product</Link>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* ORDER HISTORY SECTION */}
                                {activeSection === "orders" && (
                                    <div className="space-y-6">
                                        {orders.length === 0 ? (
                                            <div className="py-12 text-center text-gray-550 dark:text-gray-400 font-light">
                                                No purchases found.
                                            </div>
                                        ) : (
                                            orders.map((ord) => (
                                                <div key={ord.id} className="border border-gray-150 dark:border-gray-800 rounded-xl p-5 bg-gray-50/20 dark:bg-gray-900/10">
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-150 dark:border-gray-800 pb-4 mb-4">
                                                        <div>
                                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Order / Tracking ID</p>
                                                            <span className="font-mono text-sm font-semibold text-gray-900 dark:text-white">{ord.id}</span>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <div>
                                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Date</p>
                                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                    {new Date(ord.created_at).toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                            <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wide ${
                                                                ord.status === "delivered" 
                                                                    ? "bg-green-100 text-green-700 dark:bg-green-950/20 dark:text-green-400 border border-green-250" 
                                                                    : ord.status === "shipped"
                                                                    ? "bg-blue-100 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400 border border-blue-250"
                                                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-400 border border-yellow-250"
                                                            }`}>
                                                                {ord.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="mb-4">
                                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Items</p>
                                                        <ul className="space-y-2">
                                                            {(ord.items || []).map((item, index) => (
                                                                <li key={index} className="flex justify-between items-center text-sm">
                                                                    <span className="text-gray-900 dark:text-white font-medium">{item.name} {item.selectedColor ? `(${item.selectedColor})` : ""}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="flex flex-col sm:flex-row justify-end items-center border-t border-gray-150 dark:border-gray-800 pt-4 mt-2 gap-4">
                                                        <Link 
                                                            to={`/track-order?id=${ord.id}`} 
                                                            className="text-xs font-bold bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-750 dark:text-gray-300 px-4 py-2 rounded-xl transition-all uppercase tracking-wider"
                                                        >
                                                            Track Order
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}

                                {/* VIEW HISTORY SECTION */}
                                {activeSection === "viewHistory" && (
                                    <div>
                                        {viewHistory.length === 0 ? (
                                            <div className="py-12 text-center text-gray-550 dark:text-gray-400 font-light">
                                                No view history found.
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {viewHistory.map((vh, index) => (
                                                    <div key={index} className="border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition-all">
                                                        <div className="flex items-center gap-4 mb-4">
                                                            <img src={vh.thumbnail || vh.image} alt={vh.name} className="w-14 h-14 object-cover rounded bg-white" />
                                                            <div>
                                                                <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1">{vh.name}</h4>
                                                                <p className="text-[10px] text-gray-400 font-medium">
                                                                    Viewed: {new Date(vh.viewedAt).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-end border-t border-gray-100 dark:border-gray-850 pt-3 mt-2">
                                                            <Link to={`/product/${vh.id}`} className="text-xs font-bold text-gray-650 hover:text-black dark:text-gray-400 dark:hover:text-white uppercase tracking-wider">View Page</Link>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* UPLOADED MEMORIALS SECTION */}
                                {activeSection === "memorials" && (
                                    <div>
                                        {memorials.length === 0 ? (
                                            <div className="py-12 text-center">
                                                <p className="text-gray-550 dark:text-gray-400 mb-4 text-sm font-light">You haven&apos;t uploaded any memorials yet.</p>
                                                <Link to="/book-of-life" className="text-[#135B3A] dark:text-green-500 font-bold hover:underline">Submit Memorial</Link>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {memorials.map((mem) => (
                                                    <div key={mem.id} className="border border-gray-150 dark:border-gray-800 rounded-xl p-5 flex gap-4 bg-gray-50/20 dark:bg-gray-900/10">
                                                        <img src={mem.image} alt={mem.name} className="w-20 h-20 rounded-lg object-cover bg-gray-100" />
                                                        <div className="flex-1 flex flex-col justify-between">
                                                            <div>
                                                                <div className="flex items-center justify-between gap-2">
                                                                    <h4 className="font-bold text-gray-900 dark:text-white font-serif">{mem.name}</h4>
                                                                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                                                                        mem.status === "approved" 
                                                                            ? "bg-green-100 text-green-700 border border-green-200" 
                                                                            : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                                                                    }`}>
                                                                        {mem.status}
                                                                    </span>
                                                                </div>
                                                                <p className="text-xs text-gray-550 dark:text-gray-450 mt-1">{mem.birthYear} - {mem.deathYear}</p>
                                                                <p className="text-xs text-gray-600 dark:text-gray-300 font-light mt-2 line-clamp-2 italic">
                                                                    &quot;{mem.bio}&quot;
                                                                </p>
                                                            </div>
                                                            <div className="mt-3 text-right">
                                                                <Link to="/book-of-life" className="text-xs font-bold text-[#135B3A] dark:text-green-400 hover:underline">
                                                                    Go to Memorial Wall
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
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 font-serif">Active Subscriptions</h3>
                                            {bonds.length === 0 ? (
                                                <div className="py-8 text-center text-gray-550 dark:text-gray-400 font-light">
                                                    You don&apos;t have any active pre-planning bonds.
                                                    <br />
                                                    <Link to="/bonds" className="text-[#135B3A] dark:text-green-500 font-bold hover:underline inline-block mt-2">Browse Pre-Planning Plans</Link>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {bonds.map((bond) => (
                                                        <div key={bond.id} className="border border-gray-150 dark:border-gray-800 rounded-xl p-5 bg-gray-50/20 dark:bg-gray-900/10">
                                                            <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-800 pb-3 mb-3">
                                                                <span className="font-bold text-gray-900 dark:text-white capitalize">{bond.planType} Plan</span>
                                                                <span className={`text-xs px-2.5 py-0.5 rounded font-bold uppercase tracking-wide ${
                                                                    bond.status === "active" ? "bg-green-100 text-green-700" : "bg-red-155 text-red-700"
                                                                }`}>
                                                                    {bond.status}
                                                                </span>
                                                            </div>
                                                            <div className="space-y-1.5 text-sm">
                                                                <div className="flex justify-between">
                                                                    <span className="text-gray-400">Monthly Contribution:</span>
                                                                    <span className="font-bold text-gray-850 dark:text-gray-200">{Number(bond.monthlyPrice)?.toLocaleString()} NGN</span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span className="text-gray-400">Start Date:</span>
                                                                    <span className="font-semibold text-gray-850 dark:text-gray-200">
                                                                        {new Date(bond.startDate).toLocaleDateString()}
                                                                    </span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span className="text-gray-400">Next Payment:</span>
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
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 font-serif">Payment Logs</h3>
                                            {payments.length === 0 ? (
                                                <p className="text-gray-550 dark:text-gray-400 font-light text-sm">No payment references logged yet.</p>
                                            ) : (
                                                <div className="overflow-x-auto">
                                                    <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-800 text-sm">
                                                        <thead className="bg-gray-100 dark:bg-gray-700">
                                                            <tr>
                                                                <th className="py-2 px-4 text-left font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-gray-600">Date Paid</th>
                                                                <th className="py-2 px-4 text-left font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-gray-600">Plan Type</th>
                                                                <th className="py-2 px-4 text-left font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-gray-600">Amount</th>
                                                                <th className="py-2 px-4 text-left font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-gray-600">Payment Reference</th>
                                                                <th className="py-2 px-4 text-left font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-gray-600">Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {payments.map((pmt) => (
                                                                <tr key={pmt.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                                    <td className="py-2.5 px-4 text-gray-750 dark:text-gray-300 border-b dark:border-gray-800">
                                                                        {new Date(pmt.paidAt).toLocaleDateString()}
                                                                    </td>
                                                                    <td className="py-2.5 px-4 text-gray-750 dark:text-gray-300 border-b dark:border-gray-800 capitalize font-medium">
                                                                        {pmt.planType}
                                                                    </td>
                                                                    <td className="py-2.5 px-4 text-gray-750 dark:text-gray-300 border-b dark:border-gray-800 font-bold">
                                                                        {pmt.amount?.toLocaleString()} NGN
                                                                    </td>
                                                                    <td className="py-2.5 px-4 text-gray-750 dark:text-gray-300 border-b dark:border-gray-800 font-mono text-xs">
                                                                        {pmt.reference}
                                                                    </td>
                                                                    <td className="py-2.5 px-4 text-gray-750 dark:text-gray-300 border-b dark:border-gray-800">
                                                                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                                                                            pmt.status === "success" 
                                                                                ? "bg-green-100 text-green-700" 
                                                                                : "bg-yellow-105 text-yellow-800"
                                                                        }`}>
                                                                            {pmt.status}
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* LEGACY DONATIONS SECTION */}
                                {activeSection === "donations" && (
                                    <div>
                                        {donations.length === 0 ? (
                                            <div className="py-12 text-center">
                                                <p className="text-gray-550 dark:text-gray-400 mb-4 text-sm font-light">No donation records found.</p>
                                                <Link to="/charity" className="text-[#135B3A] dark:text-green-500 font-bold hover:underline">George Wood Charity Campaigns</Link>
                                            </div>
                                        ) : (
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-800 text-sm">
                                                    <thead className="bg-gray-100 dark:bg-gray-700">
                                                        <tr>
                                                            <th className="py-2 px-4 text-left font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-gray-600">Date</th>
                                                            <th className="py-2 px-4 text-left font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-gray-600">Tier / Level</th>
                                                            <th className="py-2 px-4 text-left font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-gray-600">Amount</th>
                                                            <th className="py-2 px-4 text-left font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-gray-600">Reference</th>
                                                            <th className="py-2 px-4 text-left font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-gray-600">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {donations.map((don) => (
                                                            <tr key={don.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                                <td className="py-2.5 px-4 text-gray-750 dark:text-gray-300 border-b dark:border-gray-800">
                                                                    {new Date(don.createdAt).toLocaleDateString()}
                                                                </td>
                                                                <td className="py-2.5 px-4 text-gray-750 dark:text-gray-300 border-b dark:border-gray-800 capitalize font-medium">
                                                                    {don.tier}
                                                                </td>
                                                                <td className="py-2.5 px-4 text-gray-750 dark:text-gray-300 border-b dark:border-gray-800 font-bold">
                                                                    {don.amount?.toLocaleString()} NGN
                                                                </td>
                                                                <td className="py-2.5 px-4 text-gray-750 dark:text-gray-300 border-b dark:border-gray-800 font-mono text-xs">
                                                                    {don.paymentReference}
                                                                </td>
                                                                <td className="py-2.5 px-4 text-gray-750 dark:text-gray-300 border-b dark:border-gray-800">
                                                                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-green-100 text-green-700`}>
                                                                        {don.status || 'success'}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* PROFILE SETTINGS SECTION */}
                                {activeSection === "profile" && (
                                    <div className="max-w-xl mx-auto">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 font-serif">Profile Settings</h3>
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
                                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address (Non-editable)</label>
                                                <input
                                                    type="text"
                                                    disabled
                                                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900/30 text-gray-500 cursor-not-allowed text-sm focus:outline-none"
                                                    value={user.email}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm"
                                                    value={profile.name}
                                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                                    placeholder="Enter your full name"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm"
                                                    value={profile.phone}
                                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                                    placeholder="Enter your phone number"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Shipping / Contact Address</label>
                                                <textarea
                                                    rows="4"
                                                    className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm"
                                                    value={profile.address}
                                                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                                    placeholder="Enter your primary address"
                                                ></textarea>
                                            </div>
                                            <div className="pt-2">
                                                <button
                                                    type="submit"
                                                    disabled={profileLoading}
                                                    className="w-full bg-[#135B3A] hover:bg-[#0E462D] dark:bg-green-700 dark:hover:bg-green-800 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md text-sm uppercase tracking-wider disabled:opacity-50"
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
