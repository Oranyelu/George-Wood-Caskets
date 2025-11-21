
import { useEffect, useState, useCallback } from "react";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";

const db = getFirestore();

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div className="mt-[120px] p-5">Loading orders...</div>;
  }

  if (error) {
    return <div className="mt-[120px] p-5 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white min-h-screen flex flex-col font-montserrat p-5">
      <section className="mt-[120px]">
        <h1 className="text-2xl font-bold mb-5">Admin Dashboard</h1>
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
                    <select>
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
      </section>
    </div>
  );
};

export default AdminDashboard;
