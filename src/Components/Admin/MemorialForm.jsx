import { useState, useEffect } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";

import PropTypes from 'prop-types';

const MemorialForm = ({ initialData, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        name: "",
        birthYear: "",
        deathYear: "",
        bio: "",
        status: "approved",
        image: null,
        existingImage: "",
        submittedBy: "Admin",
        contactEmail: "" // Optional for admin
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || "",
                birthYear: initialData.birthYear || "",
                deathYear: initialData.deathYear || "",
                bio: initialData.bio || "",
                status: initialData.status || "approved",
                image: null,
                existingImage: initialData.image || "",
                submittedBy: initialData.submittedBy || "Admin",
                contactEmail: initialData.contactEmail || ""
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
                const imageRef = ref(storage, `memorials/${Date.now()}_${formData.image.name}`);
                const snapshot = await uploadBytes(imageRef, formData.image);
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            const memorialData = {
                name: formData.name,
                birthYear: formData.birthYear,
                deathYear: formData.deathYear,
                bio: formData.bio,
                status: formData.status,
                image: imageUrl,
                submittedBy: formData.submittedBy,
                contactEmail: formData.contactEmail,
                updatedAt: new Date(),
            };

            if (initialData) {
                await updateDoc(doc(db, "memorials", initialData.id), memorialData);
            } else {
                await addDoc(collection(db, "memorials"), {
                    ...memorialData,
                    createdAt: new Date(),
                    tributes: [] // Initialize empty tributes
                });
            }

            onSuccess();
        } catch (error) {
            console.error("Error saving memorial:", error);
            alert("Failed to save memorial.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                {initialData ? "Edit Memorial" : "Add New Memorial"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Deceased Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Birth Year</label>
                        <input
                            type="text"
                            name="birthYear"
                            value={formData.birthYear}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                            placeholder="1950"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Death Year</label>
                        <input
                            type="text"
                            name="deathYear"
                            value={formData.deathYear}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                            placeholder="2024"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Biography / Tribute</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows="6"
                        className="mt-1 block w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                        required
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    >
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>

                {/* Admin context: Submitted By is read-only usually, but editable here if needed */}
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded text-sm text-gray-500">
                    <p>Submitted By: {formData.submittedBy}</p>
                    <p>Contact: {formData.contactEmail}</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image</label>
                    {formData.existingImage && (
                        <img src={formData.existingImage} alt="Preview" className="h-32 w-auto mb-2 rounded" />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        required={!formData.existingImage}
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
                        {uploading ? "Saving..." : "Save Memorial"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MemorialForm;

MemorialForm.propTypes = {
    initialData: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        birthYear: PropTypes.string,
        deathYear: PropTypes.string,
        bio: PropTypes.string,
        status: PropTypes.string,
        image: PropTypes.string,
        submittedBy: PropTypes.string,
        contactEmail: PropTypes.string,
    }),
    onSuccess: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};
