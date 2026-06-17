import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import PropTypes from 'prop-types';
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const PostList = ({ onEdit }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadPosts = async () => {
        try {
            const { data, error } = await supabase
                .from("posts")
                .select("*");
            if (error) throw error;
            const mapped = data.map(item => ({
                id: item.id,
                title: item.title,
                description: item.description,
                content: item.content,
                image: item.image,
                isRecommended: item.is_recommended,
                views: item.views || 0,
                date: item.created_at
            })).sort((a, b) => new Date(b.date) - new Date(a.date));
            setPosts(mapped);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching posts:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPosts();

        const channel = supabase
            .channel("posts_realtime")
            .on("postgres_changes", { event: "*", schema: "public", table: "posts" }, () => {
                loadPosts();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                const { error } = await supabase
                    .from("posts")
                    .delete()
                    .eq("id", id);
                if (error) throw error;
            } catch (err) {
                console.error("Error deleting post:", err);
                alert("Failed to delete post.");
            }
        }
    };

    if (loading) return <p>Loading posts...</p>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                        <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Image</th>
                        <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Title</th>
                        <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Date</th>
                        <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Views</th>
                        <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Recommended</th>
                        <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                                {post.image && <img src={post.image} alt={post.title} className="w-12 h-12 object-cover rounded bg-gray-100 dark:bg-gray-600" />}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 font-medium text-gray-900 dark:text-white">{post.title}</td>
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">{new Date(post.date).toLocaleDateString()}</td>
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-1 text-gray-700 dark:text-gray-300">
                                <FaEye className="text-gray-500 dark:text-gray-400" /> {post.views || 0}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                                {post.isRecommended ? (
                                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Yes</span>
                                ) : (
                                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">No</span>
                                )}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onEdit(post)}
                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                        title="Edit"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                                        title="Delete"
                                    >
                                        <FaTrash />
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

PostList.propTypes = {
    onEdit: PropTypes.func.isRequired,
};

export default PostList;
