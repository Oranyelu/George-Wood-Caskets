import { useState, useEffect } from "react";
import { collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const MemorialList = ({ onEdit }) => {
    const [memorials, setMemorials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "memorials"), (snapshot) => {
            const memorialsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMemorials(memorialsData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this memorial?")) {
            await deleteDoc(doc(db, "memorials", id));
        }
    };

    const handleApprove = async (id, currentStatus) => {
        const newStatus = currentStatus === 'approved' ? 'pending' : 'approved';
        if (window.confirm(`Are you sure you want to change status to ${newStatus}?`)) {
            await updateDoc(doc(db, "memorials", id), { status: newStatus });
        }
    }

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
