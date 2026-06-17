import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import PropTypes from 'prop-types';

const MemorialList = ({ onEdit }) => {
    const [memorials, setMemorials] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadMemorials = async () => {
        try {
            const { data, error } = await supabase
                .from("memorials")
                .select("*");
            if (error) throw error;
            const mapped = data.map(item => ({
                id: item.id,
                name: item.name,
                birthYear: item.birth_year,
                deathYear: item.death_year,
                bio: item.bio,
                status: item.status,
                image: item.image,
                submittedBy: item.submitted_by,
                contactEmail: item.contact_email,
                tributes: item.tributes,
                candles: item.candles,
                createdAt: item.created_at
            }));
            setMemorials(mapped);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching memorials:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMemorials();

        const channel = supabase
            .channel("memorials_realtime")
            .on("postgres_changes", { event: "*", schema: "public", table: "memorials" }, () => {
                loadMemorials();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this memorial?")) {
            try {
                const { error } = await supabase
                    .from("memorials")
                    .delete()
                    .eq("id", id);
                if (error) throw error;
            } catch (err) {
                console.error("Error deleting memorial:", err);
                alert("Failed to delete memorial.");
            }
        }
    };

    const handleApprove = async (id, currentStatus) => {
        const newStatus = currentStatus === 'approved' ? 'pending' : 'approved';
        if (window.confirm(`Are you sure you want to change status to ${newStatus}?`)) {
            try {
                const { error } = await supabase
                    .from("memorials")
                    .update({ status: newStatus })
                    .eq("id", id);
                if (error) throw error;
            } catch (err) {
                console.error("Error updating status:", err);
                alert("Failed to update status.");
            }
        }
    };

    if (loading) return <div>Loading Memorials...</div>;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            Photo
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            Submitted By
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {memorials.map((memorial) => (
                        <tr key={memorial.id}>
                            <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
                                <div className="flex-shrink-0 w-10 h-10">
                                    <img className="w-full h-full rounded-full object-cover" src={memorial.image} alt="" />
                                </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
                                <p className="text-gray-900 dark:text-white whitespace-no-wrap font-bold">
                                    {memorial.name}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 text-xs">
                                    {memorial.birthYear} - {memorial.deathYear}
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
                                <p className="text-gray-900 dark:text-white">{memorial.submittedBy}</p>
                                <p className="text-xs text-gray-500">{memorial.contactEmail}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
                                <button
                                    onClick={() => handleApprove(memorial.id, memorial.status)}
                                    className={`relative inline-block px-3 py-1 font-semibold leading-tight text-white rounded-full ${memorial.status === 'approved' ? 'bg-green-500' : 'bg-yellow-500'
                                        }`}
                                >
                                    <span className="relative capitalize">{memorial.status}</span>
                                </button>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onEdit(memorial)}
                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(memorial.id)}
                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MemorialList;

MemorialList.propTypes = {
    onEdit: PropTypes.func.isRequired,
};
