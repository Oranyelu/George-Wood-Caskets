import { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import PropTypes from 'prop-types';

const PostForm = ({ initialData, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        content: "",
        image: "",
        isRecommended: false,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                description: initialData.description || "",
                content: initialData.content || "",
                image: initialData.image || "",
                isRecommended: initialData.isRecommended || false,
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const postData = {
                ...formData,
                date: initialData ? initialData.date : new Date().toISOString(),
                views: initialData ? (initialData.views || 0) : 0,
            };

            if (initialData) {
                await updateDoc(doc(db, "posts", initialData.id), postData);
            } else {
                await addDoc(collection(db, "posts"), postData);
            }
            onSuccess();
        } catch (error) {
            console.error("Error saving post:", error);
            alert("Failed to save post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto border border-gray-100 dark:border-gray-700 transition-colors">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{initialData ? "Edit Post" : "Add New Post"}</h2>

            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Short Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded h-24 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Image URL</label>
                <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="https://example.com/image.jpg"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Content</label>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded h-64 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                />
            </div>

            <div className="mb-6 flex items-center">
                <input
                    type="checkbox"
                    name="isRecommended"
                    checked={formData.isRecommended}
                    onChange={handleChange}
                    className="mr-2 h-5 w-5 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-primary focus:ring-primary"
                />
                <label className="text-gray-700 dark:text-gray-300 font-bold">Mark as Recommended</label>
            </div>

            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white transition-colors"
                    disabled={loading}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary disabled:bg-gray-400 transition-colors"
                    disabled={loading}
                >
                    {loading ? "Saving..." : (initialData ? "Update Post" : "Create Post")}
                </button>
            </div>
        </form>
    );
};

PostForm.propTypes = {
    initialData: PropTypes.object,
    onSuccess: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default PostForm;
