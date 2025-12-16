import { useState, useEffect } from "react";
import { doc, addDoc, updateDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import PropTypes from 'prop-types';

const ProductForm = ({ initialData, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        category: "Traditional",
        material: "Wood",
        colors: "",
        label: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                colors: initialData.colors ? initialData.colors.join(", ") : "",
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        setError(null);

        try {
            let imageUrl = initialData ? initialData.thumbnail : "";

            if (imageFile) {
                const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
                await uploadBytes(storageRef, imageFile);
                imageUrl = await getDownloadURL(storageRef);
            }

            const productData = {
                name: formData.name,
                price: Number(formData.price),
                description: formData.description,
                category: formData.category,
                material: formData.material,
                colors: formData.colors.split(",").map((c) => c.trim()),
                label: formData.label,
                thumbnail: imageUrl,
                images: [imageUrl],
                updatedAt: new Date(),
            };

            if (initialData) {
                const productRef = doc(db, "products", initialData.id);
                await updateDoc(productRef, productData);
            } else {
                productData.createdAt = new Date();
                await addDoc(collection(db, "products"), productData);
            }

            onSuccess();
        } catch (err) {
            console.error("Error saving product:", err);
            setError("Failed to save product.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md mb-6 border border-gray-100 dark:border-gray-700 transition-colors">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{initialData ? "Edit Product" : "Add New Product"}</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Price (NGN)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                            <option value="Classic">Classic</option>
                            <option value="Xclusive">Xclusive</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Material</label>
                        <select
                            name="material"
                            value={formData.material}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                            <option value="Wood">Wood</option>
                            <option value="Mahogany">Mahogany</option>
                            <option value="Oak">Oak</option>
                            <option value="Pine">Pine</option>
                            <option value="Metal">Metal</option>
                            <option value="Cherry">Cherry</option>
                            <option value="Walnut">Walnut</option>
                            <option value="Maple">Maple</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Colors (comma separated)</label>
                        <input
                            type="text"
                            name="colors"
                            value={formData.colors}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="e.g. Brown, Gold"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Label (Optional)</label>
                        <input
                            type="text"
                            name="label"
                            value={formData.label}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="e.g. Bestseller"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                        rows="3"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">Product Image</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                        accept="image/*"
                    />
                    {initialData && initialData.thumbnail && (
                        <img src={initialData.thumbnail} alt="Current" className="h-20 mt-2 object-contain" />
                    )}
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                        disabled={uploading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-primary text-white rounded hover:bg-[#3a2b1f] disabled:bg-gray-500 transition-colors"
                        disabled={uploading}
                    >
                        {uploading ? "Saving..." : "Save Product"}
                    </button>
                </div>
            </form>
        </div>
    );
};

ProductForm.propTypes = {
    initialData: PropTypes.object,
    onSuccess: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default ProductForm;
