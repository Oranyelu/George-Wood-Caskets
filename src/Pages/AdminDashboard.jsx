
import { useEffect, useState, useCallback } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"; // Import the initialized db from your firebase config
import { migrateProducts } from "../utils/migrateProducts";
import ProductList from "../Components/Admin/ProductList";
import ProductForm from "../Components/Admin/ProductForm";

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
        orderStatus: newStatus,
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
    <div className="bg-white min-h-screen flex flex-col font-montserrat p-5">
      <section className="mt-[120px]">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleMigration}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Migrate Products
          </button>
        </div>

        <div className="flex mb-6 border-b">
          <button
            className={`px-4 py-2 ${activeTab === "orders" ? "border-b-2 border-primary font-bold" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "products" ? "border-b-2 border-primary font-bold" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            Products
          </button>
        </div>

        {activeTab === "orders" ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b">Order ID</th>
                  <th className="py-2 px-4 border-b">Customer</th>
                  <th className="py-2 px-4 border-b">Total</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="py-2 px-4 border-b">{order.id}</td>
                    <td className="py-2 px-4 border-b">
                      {order.customerInfo?.firstName} {order.customerInfo?.lastName}
                    </td>
                    <td className="py-2 px-4 border-b">{order.total?.toLocaleString()} NGN</td>
                    <td className="py-2 px-4 border-b">{order.orderStatus}</td>
                    <td className="py-2 px-4 border-b">
                      {order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <select onChange={(e) => handleUpdateStatus(order.id, e.target.value)} defaultValue={order.orderStatus}>
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
        ) : (
          <div>
            <div className="flex justify-end mb-4">
              {!showProductForm && (
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setShowProductForm(true);
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
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
      </section>
    </div>
  );
};

export default AdminDashboard;
