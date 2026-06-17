import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import PropTypes from 'prop-types';

const ProjectList = ({ onEdit }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadProjects = async () => {
        try {
            const { data, error } = await supabase
                .from("charity_projects")
                .select("*");
            if (error) throw error;
            const mapped = data.map(item => ({
                id: item.id,
                title: item.title,
                description: item.description,
                image: item.image,
                targetAmount: item.target_amount,
                raisedAmount: item.raised_amount,
                status: item.status,
                articleLink: item.article_link,
                createdAt: item.created_at
            }));
            setProjects(mapped);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching charity projects:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProjects();

        const channel = supabase
            .channel("charity_projects_realtime")
            .on("postgres_changes", { event: "*", schema: "public", table: "charity_projects" }, () => {
                loadProjects();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            try {
                const { error } = await supabase
                    .from("charity_projects")
                    .delete()
                    .eq("id", id);
                if (error) throw error;
            } catch (err) {
                console.error("Error deleting project:", err);
                alert("Failed to delete project.");
            }
        }
    };

    if (loading) return <div>Loading Projects...</div>;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            Project
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            Target / Raised
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
                    {projects.map((project) => (
                        <tr key={project.id}>
                            <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 w-10 h-10">
                                        <img className="w-full h-full rounded-full object-cover" src={project.image} alt="" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-900 dark:text-white whitespace-no-wrap font-bold">
                                            {project.title}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
                                <p className="text-gray-900 dark:text-white whitespace-no-wrap">
                                    Target: {parseInt(project.targetAmount).toLocaleString()} NGN
                                    <br />
                                    Raised: {parseInt(project.raisedAmount || 0).toLocaleString()} NGN
                                </p>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
                                    <div
                                        className="bg-green-600 h-2.5 rounded-full"
                                        style={{ width: `${Math.min(((project.raisedAmount || 0) / project.targetAmount) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
                                <span
                                    className={`relative inline-block px-3 py-1 font-semibold leading-tight text-white rounded-full ${project.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                                        }`}
                                >
                                    <span className="relative capitalize">{project.status}</span>
                                </span>
                                {project.status === 'completed' && !project.articleLink && (
                                    <p className="text-xs text-red-500 mt-1">Needs Article Link!</p>
                                )}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onEdit(project)}
                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id)}
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

export default ProjectList;

ProjectList.propTypes = {
    onEdit: PropTypes.func.isRequired,
};
