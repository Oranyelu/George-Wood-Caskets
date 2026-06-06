import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { FaUserCircle, FaPenFancy, FaCalendarAlt, FaHandsHelping, FaSignOutAlt, FaHeart } from "react-icons/fa";
import { useAuth } from "../Providers/AuthProvider";

const DashboardCard = ({ icon, title, description, link }) => (
    <Link to={link || "#"} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all flex flex-col items-center text-center">
        <div className="text-4xl text-[#135B3A] dark:text-green-500 mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
    </Link>
);

DashboardCard.propTypes = {
    icon: PropTypes.element,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string
};

const UserDashboard = () => {
    const { user, isAdmin, logout } = useAuth();

    if (!user) {
        return (
            <div className="min-h-screen pt-32 text-center">
                <p>Please log in to view your dashboard.</p>
                <Link to="/login" className="text-blue-500 underline">Login here</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 font-montserrat transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex items-center gap-4 mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <FaUserCircle className="text-6xl text-gray-400" />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome, {user.email}</h1>
                        <p className="text-gray-500 dark:text-gray-400">Manage your account and activities</p>
                    </div>
                </div>

                <h2 className="text-xl font-bold text-[#135B3A] dark:text-green-500 mb-4">Your Account</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <DashboardCard
                        icon={<FaHeart className="text-red-500" />}
                        title="My Favorites"
                        description="View your saved caskets and services."
                        link="/favorites"
                    />
                    {isAdmin && (
                        <DashboardCard
                            icon={<FaPenFancy className="text-blue-500" />}
                            title="Admin Dashboard"
                            description="Manage products, orders, and memorials."
                            link="/admin/dashboard"
                        />
                    )}
                </div>

                <h2 className="text-xl font-bold text-[#135B3A] dark:text-green-500 mb-4">Suggested for You</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <DashboardCard
                        icon={<FaPenFancy />}
                        title="Read Blog Posts"
                        description="Explore our latest articles on legacy and planning."
                        link="/blog"
                    />
                    <DashboardCard
                        icon={<FaCalendarAlt />}
                        title="Upcoming Events"
                        description="View a list of community events and memorial services."
                        link="/events"
                    />
                    <DashboardCard
                        icon={<FaHandsHelping />}
                        title="Volunteer Opportunities"
                        description="Join our team and help make a difference in the community."
                        link="/volunteer"
                    />
                </div>

                <div className="mt-8 border-t dark:border-gray-700 pt-6">
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 font-bold bg-white dark:bg-gray-800 px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all border border-red-100"
                    >
                        <FaSignOutAlt /> Log Out
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
