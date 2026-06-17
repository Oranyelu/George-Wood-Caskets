import { useState, useEffect } from "react";
import { supabase, uploadToSupabase } from "../../supabase";
import { API_MODE, createProduct, updateProduct, uploadFile } from "../../utils/api";
import PropTypes from 'prop-types';
import { FaTimes } from "react-icons/fa";
import { CircularProgress, Snackbar, Alert, Button } from "@mui/material";

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

    // State to manage images (both existing URLs and new File objects with preview URLs)
    // Structure: { id: string | number, url: string, file?: File, isNew: boolean }
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                colors: initialData.colors ? initialData.colors.join(", ") : "",
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

            // Initialize images from initialData
            const existingImages = (initialData.images || []).map((url, index) => ({
                id: `existing-${index}`,
                url,
                isNew: false
            }));
            setImages(existingImages);
        } else {
            // Reset logic if needed when switching from edit to add without unmounting (unlikely with current parent logic but good practice)
            setFormData({
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
            setImages([]);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const totalImages = images.length + files.length;

            if (totalImages > 5) {
                setSnackbar({ open: true, message: "You can only have up to 5 images in total.", severity: "warning" });
                return;
            }

            const newImages = files.map((file) => ({
                id: `new-${Date.now()}-${file.name}`,
                url: URL.createObjectURL(file), // Create preview URL
                file,
                isNew: true
            }));

            setImages((prev) => [...prev, ...newImages]);
        }
        // Reset input value to allow selecting the same file again if needed (though not common)
        e.target.value = "";
    };

    const handleRemoveImage = (id) => {
        setImages((prev) => {
            const imageToRemove = prev.find(img => img.id === id);
            if (imageToRemove && imageToRemove.isNew) {
                URL.revokeObjectURL(imageToRemove.url); // Cleanup memory
            }
            return prev.filter((img) => img.id !== id);
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        console.log("Starting product upload...");

        try {
            // Validate images
            if (images.length === 0) {
                throw new Error("Please add at least one product image.");
            }

            console.log("Uploading images...", images);
            const uploadPromises = images.map(async (img) => {
                if (img.isNew && img.file) {
                    try {
                        console.log(`Uploading file: ${img.file.name}`);
                        if (API_MODE === 'backend') {
                            const url = await uploadFile(img.file, "products");
                            return url;
                        } else {
                            const url = await uploadToSupabase(img.file, "products");
                            console.log(`File uploaded: ${img.file.name}, getting URL...`);
                            return url;
                        }
                    } catch (uploadErr) {
                        console.error(`Error uploading ${img.file.name}:`, uploadErr);
                        throw new Error(`Failed to upload ${img.file.name}: ${uploadErr.message}`);
                    }
                }
                return img.url; // Return existing URL
            });


            const finalImageUrls = await Promise.all(uploadPromises);
            console.log("All images uploaded successfully:", finalImageUrls);

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
                thumbnail: finalImageUrls.length > 0 ? finalImageUrls[0] : "", // First image is main
                images: finalImageUrls,
                updatedAt: new Date().toISOString(),
            };

            const dbProductData = {
                name: formData.name,
                price: Number(formData.price),
                description: formData.description,
                category: formData.category,
                label: formData.label,
                material: formData.material,
                colors: formData.colors.split(",").map((c) => c.trim()).filter(c => c),
                hardware: formData.hardware,
                handle: formData.handle,
                interior_color: formData.interiorColor,
                finish: formData.finish,
                shell_shape: formData.shellShape,
                shell_cover: formData.shellCover,
                couch: formData.couch,
                size: formData.size,
                weight: formData.weight,
                thumbnail: finalImageUrls.length > 0 ? finalImageUrls[0] : "",
                images: finalImageUrls,
            };

            console.log("Saving product data...", dbProductData);
            if (API_MODE === 'backend') {
                if (initialData) {
                    await updateProduct(initialData.id, productData);
                    console.log("Product updated successfully via API.");
                } else {
                    productData.createdAt = new Date().toISOString();
                    await createProduct(productData);
                    console.log("Product created successfully via API.");
                }
            } else {
                if (initialData) {
                    const { error } = await supabase
                        .from("products")
                        .update(dbProductData)
                        .eq("id", initialData.id);
                    if (error) throw error;
                    console.log("Product updated successfully.");
                } else {
                    const productId = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
                    const { error } = await supabase
                        .from("products")
                        .insert({ id: productId, ...dbProductData });
                    if (error) throw error;
                    console.log("Product created successfully.");
                }
            }

            setSnackbar({ open: true, message: "Product saved successfully!", severity: "success" });

            // Delay closing to let user see success message
            setTimeout(() => {
                onSuccess();
            }, 1000);

        } catch (err) {
            console.error("Error saving product (caught in handleSubmit):", err);
            setSnackbar({ open: true, message: `Failed to save product: ${err.message}`, severity: "error" });
        } finally {
            setUploading(false);
            console.log("Product upload process finished (finally block).");
        }
    };

    // Clean up object URLs on unmount
    useEffect(() => {
        return () => {
            images.forEach(img => {
                if (img.isNew) URL.revokeObjectURL(img.url);
            });
        };
    }, [images]);

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md mb-6 border border-gray-100 dark:border-gray-700 transition-colors h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{initialData ? "Edit Product" : "Add New Product"}</h2>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    {/* Basic Info */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white" required disabled={uploading} />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Price (NGN)</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white" required disabled={uploading} />
                    </div>

                    {/* Category & Label */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Category (Model)</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white" disabled={uploading}>
                            {["Emperor", "Balmoral", "Oxford", "Senator", "Havard", "Coffin", "Craft", "Presidential", "Military", "Promise", "Clifton", "Carnation", "Berkshire", "Victorian", "Barnett", "Belmont"].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Label (Tier)</label>
                        <select name="label" value={formData.label} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white" disabled={uploading}>
                            {["Classic", "Xclusive", "Bestseller"].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>

                    {/* Specifications */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Material</label>
                        <select name="material" value={formData.material} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white" disabled={uploading}>
                            {["Hard wood", "Steel", "Medium Density Fiber Board", "Ply Wood"].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Hardware</label>
                        <select name="hardware" value={formData.hardware} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white" disabled={uploading}>
                            {["Gold", "Silver", "Bronze", "Copper", "Rosegold", "Carved wood", "Plastic"].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Handle</label>
                        <select name="handle" value={formData.handle} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white" disabled={uploading}>
                            {["Swing-bar handle", "Fixed bar handles"].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Finish</label>
                        <select name="finish" value={formData.finish} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white" disabled={uploading}>
                            {["High-Gloss", "Hand-Rubbed", "Dark Red/Brown", "Metallic", "Airbrush", "Matte"].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Shell Shape</label>
                        <select name="shellShape" value={formData.shellShape} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white" disabled={uploading}>
                            {["Rectangular", "Hexagonal", "Octagonal", "Rounded corners", "Urn shaped"].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Shell Cover</label>
                        <select name="shellCover" value={formData.shellCover} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white" disabled={uploading}>
                            {["Dome top", "Flat top"].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Couch</label>
                        <select name="couch" value={formData.couch} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white" disabled={uploading}>
                            {["Half-couch", "Full-couch", "Double-couch"].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Style</label>
                        <select name="style" value={formData.style} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white" disabled={uploading}>
                            {["Traditional", "Regal", "English", "Minimal"].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>

                    {/* Text Inputs */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Colors (comma separated)</label>
                        <input type="text" name="colors" value={formData.colors} onChange={handleChange} placeholder="e.g. Red, Black" className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white" disabled={uploading} />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Interior Material</label>
                        <input type="text" name="interiorMaterial" value={formData.interiorMaterial} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white" disabled={uploading} />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Interior Color</label>
                        <input type="text" name="interiorColor" value={formData.interiorColor} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white" disabled={uploading} />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Size</label>
                        <input type="text" name="size" value={formData.size} onChange={handleChange} placeholder="e.g. 84x28x23 in" className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white" disabled={uploading} />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Weight</label>
                        <input type="text" name="weight" value={formData.weight} onChange={handleChange} placeholder="e.g. 200kg" className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white" disabled={uploading} />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white" rows="3" required disabled={uploading} />
                </div>

                {/* Enhanced Image Upload Section */}
                <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Product Images (Max 5)</label>

                    {/* Image Previews */}
                    <div className="flex flex-wrap gap-4 mb-4">
                        {images.map((img) => (
                            <div key={img.id} className="relative w-24 h-24 border border-gray-300 rounded overflow-hidden group">
                                <img src={img.url} alt="Preview" className="w-full h-full object-cover" />
                                {!uploading && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(img.id)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Remove Image"
                                    >
                                        <FaTimes size={12} />
                                    </button>
                                )}
                            </div>
                        ))}
                        {images.length < 5 && (
                            <label className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-green-500 hover:bg-gray-50 transition-colors dark:hover:bg-gray-700">
                                <span className="text-gray-400 text-sm font-bold">+ Add</span>
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleImageChange}
                                    className="hidden"
                                    accept="image/*"
                                    disabled={uploading}
                                />
                            </label>
                        )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        * Supported formats: Any image type. Max 5 images.
                    </p>
                </div>

                <div className="flex justify-end gap-3 border-t pt-4 dark:border-gray-700">
                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={onCancel}
                        disabled={uploading}
                        className="dark:text-white dark:border-gray-500"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={uploading}
                        style={{ backgroundColor: uploading ? '#ccc' : '#135B3A', color: '#fff' }}
                        startIcon={uploading ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                        {uploading ? "Saving Product..." : "Save Product"}
                    </Button>
                </div>
            </form>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

ProductForm.propTypes = {
    initialData: PropTypes.object,
    onSuccess: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default ProductForm;
