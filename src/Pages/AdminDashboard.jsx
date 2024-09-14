// Example dashboard component
import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [newOrders, setNewOrders] = useState([]);

  useEffect(() => {
    // Fetch orders on component mount
    const fetchOrders = async () => {
      const response = await fetch("/api/orders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  const handleUpdateOrder = async (orderId, updates) => {
    const response = await fetch(`/api/update-order/${orderId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: JSON.stringify(updates),
    });

    if (response.ok) {
      // Update the orders state
      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>New Orders</h2>
      <ul>
        {newOrders.map((order) => (
          <li key={order._id}>
            {order.details}
            <button onClick={() => handleUpdateOrder(order._id, { status: "Processing" })}>Update</button>
          </li>
        ))}
      </ul>
      <h2>All Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            {order.details} - Status: {order.status}
            <button onClick={() => handleUpdateOrder(order._id, { status: "Shipped" })}>Mark as Shipped</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
