import { useState, useEffect } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";

const ProjectForm = ({ initialData, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        targetAmount: "",
        raisedAmount: "0",
        status: "active", // active, completed
        articleLink: "",
        image: null, // File object for upload
        existingImage: "", // URL string if editing
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                description: initialData.description || "",
                targetAmount: initialData.targetAmount || "",
                raisedAmount: initialData.raisedAmount || "0",
                status: initialData.status || "active",
                articleLink: initialData.articleLink || "",
                image: null,
                existingImage: initialData.image || "",
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setFormData({ ...formData, image: e.target.files[0] });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            let imageUrl = formData.existingImage;

            // Upload new image if selected
            if (formData.image) {
                const imageRef = ref(storage, `projects/${Date.now()}_${formData.image.name}`);
                const snapshot = await uploadBytes(imageRef, formData.image);
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            const projectData = {
                title: formData.title,
                description: formData.description,
                targetAmount: parseFloat(formData.targetAmount),
                raisedAmount: parseFloat(formData.raisedAmount),
                status: formData.status,
                articleLink: formData.articleLink,
                image: imageUrl,
                updatedAt: new Date(),
            };

            if (initialData) {
                await updateDoc(doc(db, "charityProjects", initialData.id), projectData);
            } else {
                await addDoc(collection(db, "charityProjects"), {
                    ...projectData,
                    createdAt: new Date(),
                });
            }

            onSuccess();
        } catch (error) {
            console.error("Error saving project:", error);
            alert("Failed to save project.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                {initialData ? "Edit Project" : "Add New Charity Project"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Project Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="mt-1 block w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                        required
                    ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Target Amount (NGN)</label>
                        <input
                            type="number"
                            name="targetAmount"
                            value={formData.targetAmount}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Raised Amount (NGN)</label>
                        <input
                            type="number"
                            name="raisedAmount"
                            value={formData.raisedAmount}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                            placeholder="0"
                        />
                        <p className="text-xs text-gray-500 mt-1">Update manually if offline donations are received.</p>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    >
                        <option value="active">Active / Ongoing</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                {formData.status === 'completed' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Success Story Article Link (URL)</label>
                        <input
                            type="url"
                            name="articleLink"
                            value={formData.articleLink}
                            onChange={handleChange}
                            placeholder="https://georgewoodcaskets.com/blog/..."
                            className="mt-1 block w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Project Image</label>
                    {formData.existingImage && (
                        <img src={formData.existingImage} alt="Preview" className="h-32 w-auto mb-2 rounded" />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        required={!formData.existingImage} // Required only if no existing image
                    />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                        disabled={uploading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                        disabled={uploading}
                    >
                        {uploading ? "Saving..." : "Save Project"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProjectForm;
