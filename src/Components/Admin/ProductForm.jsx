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
        category: "Emperor",
        label: "Classic",
        material: "Hard wood",
        colors: "",
        hardware: "Gold",
        handle: "Swing-bar handle",
        interiorMaterial: "Velvet",
        interiorColor: "White",
        finish: "High-Gloss",
        shellShape: "Rectangular",
        shellCover: "Dome top",
        couch: "Half-couch",
        style: "Traditional",
        size: "",
        weight: "",
    });
    const [imageFiles, setImageFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                colors: initialData.colors ? initialData.colors.join(", ") : "",
                // Ensure defaults for new fields if editing old data
                category: initialData.category || "Emperor",
                label: initialData.label || "Classic",
                material: initialData.material || "Hard wood",
                hardware: initialData.hardware || "Gold",
                handle: initialData.handle || "Swing-bar handle",
                interiorMaterial: initialData.interiorMaterial || "Velvet",
                interiorColor: initialData.interiorColor || "White",
                finish: initialData.finish || "High-Gloss",
                shellShape: initialData.shellShape || "Rectangular",
                shellCover: initialData.shellCover || "Dome top",
                couch: initialData.couch || "Half-couch",
                style: initialData.style || "Traditional",
                size: initialData.size || "",
                weight: initialData.weight || "",
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            if (files.length > 5) {
                alert("You can only upload up to 5 images.");
                return;
            }
            setImageFiles(files);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        setError(null);

        try {
            let imageUrls = initialData ? (initialData.images || (initialData.thumbnail ? [initialData.thumbnail] : [])) : [];

            if (imageFiles.length > 0) {
                const uploadPromises = imageFiles.map(async (file) => {
                    const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
                    await uploadBytes(storageRef, file);
                    return await getDownloadURL(storageRef);
                });
                const newUrls = await Promise.all(uploadPromises);

                // If editing, we might want to append or replace. For simplicity, we'll replace if new images are uploaded.
                // Or if we want to support adding to existing, we would concat. 
                // Given the instructions imply "upload up to 5", replacing is a safer bet for a clean state unless we build a complex UI.
                imageUrls = newUrls;
            }

            const productData = {
                name: formData.name,
                price: Number(formData.price),
                description: formData.description,
                category: formData.category,
                label: formData.label,
                material: formData.material,
                colors: formData.colors.split(",").map((c) => c.trim()).filter(c => c),
                hardware: formData.hardware,
                handle: formData.handle,
                interiorMaterial: formData.interiorMaterial,
                interiorColor: formData.interiorColor,
                finish: formData.finish,
                shellShape: formData.shellShape,
                shellCover: formData.shellCover,
                couch: formData.couch,
                style: formData.style,
                size: formData.size,
                weight: formData.weight,
                thumbnail: imageUrls.length > 0 ? imageUrls[0] : "", // Main image
                images: imageUrls,
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
            setError(`Failed to save product: ${err.message}`);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md mb-6 border border-gray-100 dark:border-gray-700 transition-colors h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{initialData ? "Edit Product" : "Add New Product"}</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    {/* Basic Info */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Price (NGN)</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white" required />
                    </div>

                    {/* Category & Label */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Category (Model)</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white">
                            {["Emperor", "Balmoral", "Oxford", "Senator", "Havard", "Coffin", "Craft", "Presidential", "Military", "Promise", "Clifton", "Carnation", "Berkshire", "Victorian", "Barnett", "Belmont"].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Label (Tier)</label>
                        <select name="label" value={formData.label} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white">
                            {["Classic", "Xclusive", "Bestseller"].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>

                    {/* Specifications */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Material</label>
                        <select name="material" value={formData.material} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white">
                            {["Hard wood", "Steel", "Medium Density Fiber Board", "Ply Wood"].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Hardware</label>
                        <select name="hardware" value={formData.hardware} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white">
                            {["Gold", "Silver", "Bronze", "Copper", "Rosegold", "Carved wood", "Plastic"].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Handle</label>
                        <select name="handle" value={formData.handle} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white">
                            {["Swing-bar handle", "Fixed bar handles"].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Finish</label>
                        <select name="finish" value={formData.finish} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white">
                            {["High-Gloss", "Hand-Rubbed", "Dark Red/Brown", "Metallic", "Airbrush", "Matte"].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Shell Shape</label>
                        <select name="shellShape" value={formData.shellShape} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white">
                            {["Rectangular", "Hexagonal", "Octagonal", "Rounded corners", "Urn shaped"].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Shell Cover</label>
                        <select name="shellCover" value={formData.shellCover} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white">
                            {["Dome top", "Flat top"].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Couch</label>
                        <select name="couch" value={formData.couch} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white">
                            {["Half-couch", "Full-couch", "Double-couch"].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Style</label>
                        <select name="style" value={formData.style} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white">
                            {["Traditional", "Regal", "English", "Minimal"].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>

                    {/* Text Inputs */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Colors (comma separated)</label>
                        <input type="text" name="colors" value={formData.colors} onChange={handleChange} placeholder="e.g. Red, Black" className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Interior Material</label>
                        <input type="text" name="interiorMaterial" value={formData.interiorMaterial} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Interior Color</label>
                        <input type="text" name="interiorColor" value={formData.interiorColor} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Size</label>
                        <input type="text" name="size" value={formData.size} onChange={handleChange} placeholder="e.g. 84x28x23 in" className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Weight</label>
                        <input type="text" name="weight" value={formData.weight} onChange={handleChange} placeholder="e.g. 200kg" className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white" />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white" rows="3" required />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">Product Images (Max 5)</label>
                    <input type="file" multiple onChange={handleImageChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white" accept="image/*" />
                    <div className="flex gap-2 mt-2">
                        {initialData && initialData.images && initialData.images.map((img, idx) => (
                            <img key={idx} src={img} alt={`Current ${idx}`} className="h-20 object-contain rounded border border-gray-200" />
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded hover:bg-gray-400" disabled={uploading}>Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-[#135B3A] text-white rounded hover:bg-[#0e422b] disabled:bg-gray-500" disabled={uploading}>{uploading ? "Saving..." : "Save Product"}</button>
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
