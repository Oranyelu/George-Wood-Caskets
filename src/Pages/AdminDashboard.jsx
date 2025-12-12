
import { useEffect, useState, useCallback } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"; // Import the initialized db from your firebase config
import { migrateProducts } from "../utils/migrateProducts";
import ProductList from "../Components/Admin/ProductList";
import ProductForm from "../Components/Admin/ProductForm";
import PostList from "../Components/Admin/PostList";
import PostForm from "../Components/Admin/PostForm";
import ProjectList from "../Components/Admin/ProjectList";
import ProjectForm from "../Components/Admin/ProjectForm";
import MemorialList from "../Components/Admin/MemorialList";
import MemorialForm from "../Components/Admin/MemorialForm";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("orders");
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const ordersCollection = collection(db, "orders");
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersList = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const sortedOrders = ordersList.sort((a, b) => {
        const dateA = a.createdAt?.seconds || 0;
        const dateB = b.createdAt?.seconds || 0;
        return dateB - dateA;
      });
      setOrders(sortedOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(`Failed to fetch orders: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, {
        status: newStatus,
      });
      fetchOrders();
    } catch (err) {
      console.error("Error updating order status:", err);
      alert(`Failed to update status: ${err.message}`);
    }
  };

  const handleMigration = async () => {
    if (!window.confirm("Are you sure you want to migrate products? This should only be done once.")) return;
    setLoading(true);
    try {
      const result = await migrateProducts();
      alert(`Migration Complete! Success: ${result.successCount}, Errors: ${result.errorCount}`);
      fetchOrders(); // Refresh or whatever needs refreshing
    } catch (err) {
      console.error("Migration failed:", err);
      alert("Migration failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="mt-[120px] p-5">Loading orders...</div>;
  }

  if (error) {
    return <div className="mt-[120px] p-5 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col font-montserrat p-5 transition-colors duration-300">
      <section className="mt-[120px]">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <button
            onClick={handleMigration}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Migrate Products
          </button>
        </div>

        <div className="flex mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            className={`px-4 py-2 transition-colors ${activeTab === "orders" ? "border-b-2 border-primary text-primary font-bold" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </button>
          <button
            className={`px-4 py-2 transition-colors ${activeTab === "products" ? "border-b-2 border-primary text-primary font-bold" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
            onClick={() => setActiveTab("products")}
          >
            Products
          </button>
          <button
            className={`px-4 py-2 transition-colors ${activeTab === "posts" ? "border-b-2 border-primary text-primary font-bold" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
            onClick={() => setActiveTab("posts")}
          >
            Blog Posts
          </button>
          <button
            className={`px-4 py-2 transition-colors ${activeTab === "projects" ? "border-b-2 border-primary text-primary font-bold" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
            onClick={() => setActiveTab("projects")}
          >
            Charity Projects
          </button>
          <button
            className={`px-4 py-2 transition-colors ${activeTab === "memorials" ? "border-b-2 border-primary text-primary font-bold" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
            onClick={() => setActiveTab("memorials")}
          >
            Memorial Wall
          </button>
        </div>

        {activeTab === "orders" && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Order ID</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Customer</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Total</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Status</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Date</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300">{order.id}</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300">
                      {order.customerInfo?.firstName} {order.customerInfo?.lastName}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300">{(order.totalPrice || order.total)?.toLocaleString()} NGN</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 capitalize text-gray-900 dark:text-gray-300">
                      {order.status || order.orderStatus}
                      {order.expediteRequested && (
                        <span className="ml-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                          Expedite
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300">
                      {order.createdAt
                        ? (typeof order.createdAt === 'string' ? new Date(order.createdAt).toLocaleDateString() : new Date(order.createdAt.seconds * 1000).toLocaleDateString())
                        : 'N/A'}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                      <select
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                        defaultValue={order.status || order.orderStatus || 'pending'}
                        className="p-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "products" && (
          <div>
            <div className="flex justify-end mb-4">
              {!showProductForm && (
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setShowProductForm(true);
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                >
                  Add New Product
                </button>
              )}
            </div>

            {showProductForm ? (
              <ProductForm
                initialData={editingProduct}
                onSuccess={() => {
                  setShowProductForm(false);
                  setEditingProduct(null);
                }}
                onCancel={() => {
                  setShowProductForm(false);
                  setEditingProduct(null);
                }}
              />
            ) : (
              <ProductList
                onEdit={(product) => {
                  setEditingProduct(product);
                  setShowProductForm(true);
                }}
              />
            )}
          </div>
        )}

        {activeTab === "posts" && (
          <div>
            <div className="flex justify-end mb-4">
              {!showProductForm && (
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setShowProductForm(true);
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                >
                  Add New Post
                </button>
              )}
            </div>

            {showProductForm ? (
              <PostForm
                initialData={editingProduct}
                onSuccess={() => {
                  setShowProductForm(false);
                  setEditingProduct(null);
                }}
                onCancel={() => {
                  setShowProductForm(false);
                  setEditingProduct(null);
                }}
              />
            ) : (
              <PostList
                onEdit={(post) => {
                  setEditingProduct(post);
                  setShowProductForm(true);
                }}
              />
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
