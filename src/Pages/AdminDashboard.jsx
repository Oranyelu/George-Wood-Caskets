import { useEffect, useState, useCallback } from "react";
import { supabase } from "../supabase";
import ProductList from "../Components/Admin/ProductList";
import ProductForm from "../Components/Admin/ProductForm";
import PostList from "../Components/Admin/PostList";
import PostForm from "../Components/Admin/PostForm";
import ProjectList from "../Components/Admin/ProjectList";
import ProjectForm from "../Components/Admin/ProjectForm";
import MemorialList from "../Components/Admin/MemorialList";
import MemorialForm from "../Components/Admin/MemorialForm";
import { sendReplyEmail } from "../utils/api";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("orders");
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);

  // States for the audited loose ends
  const [messages, setMessages] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [reports, setReports] = useState([]);
  const [donations, setDonations] = useState([]);
  const [bonds, setBonds] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [sendingReply, setSendingReply] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: dbError } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (dbError) throw dbError;

      const ordersList = data.map(item => ({
        id: item.id,
        userId: item.user_id,
        items: item.items,
        customerInfo: item.customer_info,
        paymentInfo: item.payment_info,
        subtotal: item.subtotal,
        tax: item.tax,
        totalPrice: item.total_price,
        status: item.status,
        createdAt: item.created_at
      }));
      setOrders(ordersList);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(`Failed to fetch orders: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: messagesData, error: messagesError } = await supabase
        .from("messages")
        .select("*");
      if (messagesError) throw messagesError;

      const { data: inquiriesData, error: inquiriesError } = await supabase
        .from("inquiries")
        .select("*");
      if (inquiriesError) throw inquiriesError;

      const msgs = messagesData.map(item => ({
        id: item.id,
        source: 'Footer',
        name: item.name,
        email: item.email,
        message: item.message,
        status: item.status,
        createdAt: item.created_at,
        replyText: item.reply_text,
        repliedAt: item.replied_at
      }));

      const inqs = inquiriesData.map(item => ({
        id: item.id,
        source: 'Contact Page',
        name: item.name,
        email: item.email,
        subject: item.subject,
        message: item.message,
        status: item.status,
        createdAt: item.created_at,
        replyText: item.reply_text,
        repliedAt: item.replied_at
      }));

      const combined = [...msgs, ...inqs].sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA;
      });

      setMessages(combined);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError(`Failed to fetch messages: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchVolunteers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: dbError } = await supabase
        .from("volunteers")
        .select("*");
      if (dbError) throw dbError;

      const list = data.map(item => ({
        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        message: item.message,
        status: item.status,
        createdAt: item.created_at
      })).sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA;
      });
      setVolunteers(list);
    } catch (err) {
      console.error("Error fetching volunteers:", err);
      setError(`Failed to fetch volunteers: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: dbError } = await supabase
        .from("reports")
        .select("*");
      if (dbError) throw dbError;

      const list = data.map(item => ({
        id: item.id,
        name: item.name,
        email: item.email,
        issue: item.issue,
        status: item.status,
        createdAt: item.created_at
      })).sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA;
      });
      setReports(list);
    } catch (err) {
      console.error("Error fetching reports:", err);
      setError(`Failed to fetch reports: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDonations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: dbError } = await supabase
        .from("donations")
        .select("*");
      if (dbError) throw dbError;

      const list = data.map(item => ({
        id: item.id,
        userId: item.user_id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        amount: item.amount,
        tier: item.tier,
        paymentReference: item.payment_reference,
        status: item.status,
        createdAt: item.created_at
      })).sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA;
      });
      setDonations(list);
    } catch (err) {
      console.error("Error fetching donations:", err);
      setError(`Failed to fetch donations: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBonds = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: dbError } = await supabase
        .from("bonds")
        .select("*");
      if (dbError) throw dbError;

      const list = data.map(item => ({
        id: item.id,
        userId: item.user_id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        planType: item.plan_type,
        status: item.status,
        startDate: item.start_date,
        nextPaymentDate: item.next_payment_date,
        monthlyPrice: item.monthly_price,
        paymentReference: item.payment_reference,
        createdAt: item.created_at
      })).sort((a, b) => {
        const dateA = new Date(a.startDate || a.createdAt || 0);
        const dateB = new Date(b.startDate || b.createdAt || 0);
        return dateB - dateA;
      });
      setBonds(list);
    } catch (err) {
      console.error("Error fetching bonds:", err);
      setError(`Failed to fetch bonds: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "orders") {
      fetchOrders();
    } else if (activeTab === "inbox") {
      fetchMessages();
    } else if (activeTab === "volunteers") {
      fetchVolunteers();
    } else if (activeTab === "reports") {
      fetchReports();
    } else if (activeTab === "donations") {
      fetchDonations();
    } else if (activeTab === "bonds") {
      fetchBonds();
    }
  }, [activeTab, fetchOrders, fetchMessages, fetchVolunteers, fetchReports, fetchDonations, fetchBonds]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const { error: dbError } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);
      if (dbError) throw dbError;
      fetchOrders();
    } catch (err) {
      console.error("Error updating order status:", err);
      alert(`Failed to update status: ${err.message}`);
    }
  };

  const handleUpdateVolunteerStatus = async (id, newStatus) => {
    try {
      const { error: dbError } = await supabase
        .from("volunteers")
        .update({ status: newStatus })
        .eq("id", id);
      if (dbError) throw dbError;
      fetchVolunteers();
    } catch (err) {
      console.error("Error updating volunteer status:", err);
      alert(`Failed to update status: ${err.message}`);
    }
  };

  const handleUpdateReportStatus = async (id, newStatus) => {
    try {
      const { error: dbError } = await supabase
        .from("reports")
        .update({ status: newStatus })
        .eq("id", id);
      if (dbError) throw dbError;
      fetchReports();
    } catch (err) {
      console.error("Error updating report status:", err);
      alert(`Failed to update status: ${err.message}`);
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedMessage) return;

    setSendingReply(true);
    try {
      // Send SMTP email reply via Node backend
      await sendReplyEmail({
        toEmail: selectedMessage.email,
        toName: selectedMessage.name || '',
        originalMessage: selectedMessage.message,
        replyMessage: replyText
      });

      // Update Supabase table with reply details
      const tableName = selectedMessage.source === 'Footer' ? 'messages' : 'inquiries';
      const { error: dbError } = await supabase
        .from(tableName)
        .update({
          status: 'replied',
          reply_text: replyText,
          replied_at: new Date().toISOString()
        })
        .eq('id', selectedMessage.id);

      if (dbError) throw dbError;

      alert("Reply sent successfully via email!");
      setReplyText("");
      setSelectedMessage(null);
      fetchMessages(); // Refresh messages list
    } catch (err) {
      console.error("Error replying to message:", err);
      alert(`Failed to send reply: ${err.message}`);
    } finally {
      setSendingReply(false);
    }
  };


  if (loading) {
    return <div className="mt-[120px] p-5">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="mt-[120px] p-5 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col font-montserrat p-5 transition-colors duration-300">
      <section className="mt-[120px]">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
          <button
            className={`px-4 py-2 transition-colors ${activeTab === "orders" ? "border-b-2 border-primary text-primary font-bold" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </button>
          <button
            className={`px-4 py-2 transition-colors ${activeTab === "inbox" ? "border-b-2 border-primary text-primary font-bold" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
            onClick={() => setActiveTab("inbox")}
          >
            Inbox Messages
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
          <button
            className={`px-4 py-2 transition-colors ${activeTab === "donations" ? "border-b-2 border-primary text-primary font-bold" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
            onClick={() => setActiveTab("donations")}
          >
            Charity Donations
          </button>
          <button
            className={`px-4 py-2 transition-colors ${activeTab === "bonds" ? "border-b-2 border-primary text-primary font-bold" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
            onClick={() => setActiveTab("bonds")}
          >
            Bond Subscriptions
          </button>
          <button
            className={`px-4 py-2 transition-colors ${activeTab === "volunteers" ? "border-b-2 border-primary text-primary font-bold" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
            onClick={() => setActiveTab("volunteers")}
          >
            Volunteers
          </button>
          <button
            className={`px-4 py-2 transition-colors ${activeTab === "reports" ? "border-b-2 border-primary text-primary font-bold" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
            onClick={() => setActiveTab("reports")}
          >
            Technical Reports
          </button>
        </div>

        {activeTab === "inbox" && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Source</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Name</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Email</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Message</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Date</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-gray-700 dark:text-gray-200 font-semibold">Status</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300 font-semibold text-xs">{msg.source}</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300">{msg.name || 'N/A'}</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300">{msg.email}</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300 text-sm max-w-xs truncate" title={msg.message}>{msg.message}</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300 text-xs">
                      {msg.createdAt ? (typeof msg.createdAt === 'string' ? new Date(msg.createdAt).toLocaleDateString() : new Date(msg.createdAt.seconds * 1000).toLocaleDateString()) : 'N/A'}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${msg.status === 'replied' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-300' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-750 dark:text-yellow-400 border border-yellow-300'}`}>
                        {msg.status || 'unread'}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                      {msg.status === 'replied' ? (
                        <button 
                          onClick={() => {
                            alert(`Sent Reply:\n"${msg.replyText}"\n\nSent At: ${new Date(msg.repliedAt).toLocaleString()}`);
                          }} 
                          className="bg-gray-100 dark:bg-gray-700 text-gray-750 dark:text-gray-300 px-3 py-1 rounded text-xs hover:bg-gray-200 transition-colors"
                        >
                          View Reply
                        </button>
                      ) : (
                        <button 
                          onClick={() => setSelectedMessage(msg)} 
                          className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                        >
                          Reply
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "donations" && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Donor Name</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Email</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-gray-700 dark:text-gray-200 font-semibold">Phone</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Amount</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-gray-700 dark:text-gray-200 font-semibold">Tier</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-gray-700 dark:text-gray-200 font-semibold">Ref</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-gray-700 dark:text-gray-200 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300 font-semibold">{d.name}</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300">{d.email}</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300 text-sm">{d.phone || 'N/A'}</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-[#135B3A] dark:text-green-400 font-bold">{d.amount?.toLocaleString()} NGN</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 capitalize text-gray-900 dark:text-gray-300 text-sm">{d.tier}</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-mono text-xs">{d.paymentReference}</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300 text-xs">
                      {d.createdAt ? new Date(d.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "bonds" && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Subscriber</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Email</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Phone</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Plan</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-gray-700 dark:text-gray-200 font-semibold">Monthly Price</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-gray-700 dark:text-gray-200 font-semibold">Status</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-gray-700 dark:text-gray-200 font-semibold">Next Date</th>
                </tr>
              </thead>
              <tbody>
                {bonds.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300 font-semibold">{b.name}</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300">{b.email}</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300 text-sm">{b.phone}</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300 font-medium">{b.planType}</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300 font-semibold">{b.monthlyPrice?.toLocaleString()} NGN</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 capitalize text-gray-900 dark:text-gray-300">
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-0.5 rounded font-bold text-xs">{b.status}</span>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300 text-xs">
                      {b.nextPaymentDate ? new Date(b.nextPaymentDate).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "volunteers" && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Name</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Email</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Phone</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-gray-700 dark:text-gray-200 font-semibold">Interests</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-gray-700 dark:text-gray-200 font-semibold">Date</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-gray-700 dark:text-gray-200 font-semibold">Status</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-gray-700 dark:text-gray-200 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {volunteers.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300 font-semibold">{v.name}</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300">{v.email}</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300 text-sm">{v.phone}</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-750 dark:text-gray-350 text-sm max-w-xs truncate" title={v.message}>{v.message}</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300 text-xs">
                      {v.createdAt ? new Date(v.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300 capitalize text-sm">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase tracking-wider ${v.status === 'contacted' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>{v.status || 'new'}</span>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                      <select
                        onChange={(e) => handleUpdateVolunteerStatus(v.id, e.target.value)}
                        defaultValue={v.status || 'new'}
                        className="p-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xs focus:outline-none"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Reporter</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Email</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-200 font-semibold">Issue Description</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-gray-700 dark:text-gray-200 font-semibold">Date</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-gray-700 dark:text-gray-200 font-semibold">Status</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-gray-700 dark:text-gray-200 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300 font-semibold">{r.name}</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300">{r.email}</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-750 dark:text-gray-350 text-sm max-w-xs truncate" title={r.issue}>{r.issue}</td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300 text-xs">
                      {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300 capitalize text-sm">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase tracking-wider ${r.status === 'resolved' ? 'bg-green-150 text-green-700' : 'bg-red-100 text-red-700'}`}>{r.status || 'new'}</span>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                      <select
                        onChange={(e) => handleUpdateReportStatus(r.id, e.target.value)}
                        defaultValue={r.status || 'new'}
                        className="p-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xs focus:outline-none"
                      >
                        <option value="new">New</option>
                        <option value="investigating">Investigating</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

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

        {activeTab === "projects" && (
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
                  Add New Project
                </button>
              )}
            </div>

            {showProductForm ? (
              <ProjectForm
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
              <ProjectList
                onEdit={(project) => {
                  setEditingProduct(project);
                  setShowProductForm(true);
                }}
              />
            )}
          </div>
        )}

        {activeTab === "memorials" && (
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
                  Add New Memorial
                </button>
              )}
            </div>

            {showProductForm ? (
              <MemorialForm
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
              <MemorialList
                onEdit={(memorial) => {
                  setEditingProduct(memorial);
                  setShowProductForm(true);
                }}
              />
            )}
          </div>
        )}
      {/* Reply Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-gray-150 dark:border-gray-700 text-left">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Reply to Message</h3>
              <button 
                onClick={() => { setSelectedMessage(null); setReplyText(""); }} 
                className="text-gray-400 hover:text-red-500 text-2xl font-bold"
              >
                &times;
              </button>
            </div>
            <div className="mb-4 bg-gray-50 dark:bg-gray-700/50 p-3.5 rounded-xl border border-gray-200/50 dark:border-gray-600">
              <p className="text-xs text-gray-400 font-bold uppercase mb-1">From</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{selectedMessage.name || 'N/A'} ({selectedMessage.email})</p>
              <p className="text-xs text-gray-400 font-bold uppercase mt-3 mb-1">Message</p>
              <p className="text-sm text-gray-700 dark:text-gray-350 italic">"{selectedMessage.message}"</p>
            </div>
            <form onSubmit={handleReplySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Your Reply (Sent directly to customer email)</label>
                <textarea
                  required
                  rows="5"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply message here..."
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] text-sm"
                ></textarea>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setSelectedMessage(null); setReplyText(""); }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sendingReply}
                  className="px-5 py-2 bg-[#135B3A] text-white font-bold rounded-xl text-sm hover:bg-[#0E462D] transition-colors disabled:opacity-50"
                >
                  {sendingReply ? "Sending..." : "Send Reply"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </section>
    </div>
  );
};

export default AdminDashboard;
