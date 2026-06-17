import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import PropTypes from 'prop-types';
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductList = ({ onEdit }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadProducts = async () => {
        try {
            const { data, error } = await supabase
                .from("products")
                .select("*");
            if (error) throw error;
            const mapped = data.map(item => ({
                id: item.id,
                name: item.name,
                price: Number(item.price),
                description: item.description,
                category: item.category,
                label: item.label,
                material: item.material,
                size: item.size,
                weight: item.weight,
                hardware: item.hardware,
                handle: item.handle,
                interiorColor: item.interior_color,
                finish: item.finish,
                shellShape: item.shell_shape,
                shellCover: item.shell_cover,
                couch: item.couch,
                thumbnail: item.thumbnail,
                images: item.images,
                colors: item.colors,
                features: item.features,
                story: item.story
            }));
            setProducts(mapped);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching products:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();

        const channel = supabase
            .channel("products_realtime")
            .on("postgres_changes", { event: "*", schema: "public", table: "products" }, () => {
                loadProducts();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const { error } = await supabase
                    .from("products")
                    .delete()
                    .eq("id", id);
                if (error) throw error;
            } catch (err) {
                console.error("Error deleting product:", err);
                alert("Failed to delete product.");
            }
        }
    };

    if (loading) return <p>Loading products...</p>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                        <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Image</th>
                        <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Name</th>
                        <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Category</th>
                        <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Price</th>
                        <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                                <img src={product.thumbnail} alt={product.name} className="w-12 h-12 object-cover rounded bg-gray-100 dark:bg-gray-600" />
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 font-medium text-gray-900 dark:text-white">{product.name}</td>
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">{product.category}</td>
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">{product.price.toLocaleString()} NGN</td>
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onEdit(product)}
                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                        title="Edit"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
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

ProductList.propTypes = {
    onEdit: PropTypes.func.isRequired,
};

export default ProductList;
