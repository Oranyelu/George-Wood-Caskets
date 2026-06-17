const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
export const API_MODE = import.meta.env.VITE_API_MODE || "supabase";

// Helper to get auth headers with JWT token
const getHeaders = (extraHeaders = {}) => {
    const token = localStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        ...extraHeaders,
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
};

// --- Email Service Endpoints ---
const EMAIL_API_URL = `${BASE_URL}/api/email`;

export const sendOrderEmail = async (orderData) => {
    try {
        const response = await fetch(`${EMAIL_API_URL}/order`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(orderData),
        });
        return await response.json();
    } catch (error) {
        console.error("Error sending order email:", error);
        throw error;
    }
};

export const sendContactEmail = async (contactData) => {
    try {
        const response = await fetch(`${EMAIL_API_URL}/contact`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(contactData),
        });
        return await response.json();
    } catch (error) {
        console.error("Error sending contact email:", error);
        throw error;
    }
};

export const sendReportEmail = async (reportData) => {
    try {
        const response = await fetch(`${EMAIL_API_URL}/report`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(reportData),
        });
        return await response.json();
    } catch (error) {
        console.error("Error sending report email:", error);
        throw error;
    }
};

export const sendApplicationEmail = async (appData) => {
    try {
        const response = await fetch(`${EMAIL_API_URL}/application`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(appData),
        });
        return await response.json();
    } catch (error) {
        console.error("Error sending application email:", error);
        throw error;
    }
};

export const sendBondInquiryEmail = async (bondData) => {
    try {
        const response = await fetch(`${EMAIL_API_URL}/bond`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(bondData),
        });
        return await response.json();
    } catch (error) {
        console.error("Error sending bond inquiry email:", error);
        throw error;
    }
};

export const sendBookingEmail = async (bookingData) => {
    try {
        const response = await fetch(`${EMAIL_API_URL}/booking`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(bookingData),
        });
        return await response.json();
    } catch (error) {
        console.error("Error sending booking email:", error);
        throw error;
    }
};

// --- Auth REST Endpoints ---
export const loginUser = async (email, password) => {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to log in");
    }
    const data = await response.json();
    if (data.token) {
        localStorage.setItem("token", data.token);
    }
    return data;
};

export const signupUser = async (email, password, additionalData = {}) => {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, ...additionalData }),
    });
    if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to sign up");
    }
    const data = await response.json();
    if (data.token) {
        localStorage.setItem("token", data.token);
    }
    return data;
};

export const getCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const response = await fetch(`${BASE_URL}/api/auth/me`, {
        method: "GET",
        headers: getHeaders(),
    });
    if (!response.ok) {
        localStorage.removeItem("token");
        throw new Error("Session expired");
    }
    return await response.json();
};

export const logoutUser = async () => {
    localStorage.removeItem("token");
    // Optionally call logout endpoint if session is tracked on server
    try {
        await fetch(`${BASE_URL}/api/auth/logout`, {
            method: "POST",
            headers: getHeaders(),
        });
    } catch (e) {
        console.warn("Logout endpoint call failed", e);
    }
};

// --- Products REST Endpoints ---
export const fetchProducts = async () => {
    const response = await fetch(`${BASE_URL}/api/products`, {
        headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch products");
    return await response.json();
};

export const createProduct = async (productData) => {
    const response = await fetch(`${BASE_URL}/api/products`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error("Failed to create product");
    return await response.json();
};

export const updateProduct = async (id, productData) => {
    const response = await fetch(`${BASE_URL}/api/products/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error("Failed to update product");
    return await response.json();
};

export const deleteProduct = async (id) => {
    const response = await fetch(`${BASE_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Failed to delete product");
    return await response.json();
};

// --- Orders REST Endpoints ---
export const createOrder = async (orderData) => {
    const response = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(orderData),
    });
    if (!response.ok) throw new Error("Failed to place order");
    return await response.json();
};

export const fetchOrders = async () => {
    const response = await fetch(`${BASE_URL}/api/orders`, {
        headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch all orders");
    return await response.json();
};

export const fetchUserOrders = async () => {
    const response = await fetch(`${BASE_URL}/api/orders/my-orders`, {
        headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch user orders");
    return await response.json();
};

export const updateOrderStatus = async (id, status) => {
    const response = await fetch(`${BASE_URL}/api/orders/${id}/status`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error("Failed to update order status");
    return await response.json();
};

// --- Blog (Posts) REST Endpoints ---
export const fetchPosts = async () => {
    const response = await fetch(`${BASE_URL}/api/posts`, {
        headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch posts");
    return await response.json();
};

export const fetchPostById = async (id) => {
    const response = await fetch(`${BASE_URL}/api/posts/${id}`, {
        headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch post details");
    return await response.json();
};

export const createPost = async (postData) => {
    const response = await fetch(`${BASE_URL}/api/posts`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(postData),
    });
    if (!response.ok) throw new Error("Failed to create post");
    return await response.json();
};

export const updatePost = async (id, postData) => {
    const response = await fetch(`${BASE_URL}/api/posts/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(postData),
    });
    if (!response.ok) throw new Error("Failed to update post");
    return await response.json();
};

export const deletePost = async (id) => {
    const response = await fetch(`${BASE_URL}/api/posts/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Failed to delete post");
    return await response.json();
};

// --- Book of Life (Memorials) REST Endpoints ---
export const fetchMemorials = async () => {
    const response = await fetch(`${BASE_URL}/api/memorials`, {
        headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch approved memorials");
    return await response.json();
};

export const fetchAllMemorials = async () => {
    const response = await fetch(`${BASE_URL}/api/memorials/all`, {
        headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch all memorials");
    return await response.json();
};

export const createMemorial = async (memorialData) => {
    const response = await fetch(`${BASE_URL}/api/memorials`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(memorialData),
    });
    if (!response.ok) throw new Error("Failed to submit memorial request");
    return await response.json();
};

export const updateMemorial = async (id, updateData) => {
    const response = await fetch(`${BASE_URL}/api/memorials/${id}`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify(updateData),
    });
    if (!response.ok) throw new Error("Failed to update memorial");
    return await response.json();
};

export const deleteMemorial = async (id) => {
    const response = await fetch(`${BASE_URL}/api/memorials/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Failed to delete memorial");
    return await response.json();
};

// --- Charity Projects REST Endpoints ---
export const fetchCharityProjects = async () => {
    const response = await fetch(`${BASE_URL}/api/charity`, {
        headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch charity projects");
    return await response.json();
};

export const createCharityProject = async (projectData) => {
    const response = await fetch(`${BASE_URL}/api/charity`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(projectData),
    });
    if (!response.ok) throw new Error("Failed to create charity project");
    return await response.json();
};

export const updateCharityProject = async (id, projectData) => {
    const response = await fetch(`${BASE_URL}/api/charity/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(projectData),
    });
    if (!response.ok) throw new Error("Failed to update charity project");
    return await response.json();
};

// --- Footer Messages REST Endpoints ---
export const createMessage = async (messageData) => {
    const response = await fetch(`${BASE_URL}/api/messages`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(messageData),
    });
    if (!response.ok) throw new Error("Failed to save message");
    return await response.json();
};

export const sendMessageEmail = async (messageData) => {
    try {
        const response = await fetch(`${EMAIL_API_URL}/message`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(messageData),
        });
        return await response.json();
    } catch (error) {
        console.error("Error sending footer message email alert:", error);
        throw error;
    }
};

export const sendReplyEmail = async (replyData) => {
    try {
        const response = await fetch(`${EMAIL_API_URL}/reply`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(replyData),
        });
        return await response.json();
    } catch (error) {
        console.error("Error sending admin email reply:", error);
        throw error;
    }
};

export const sendDonationEmail = async (donationData) => {
    try {
        const response = await fetch(`${EMAIL_API_URL}/donation`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(donationData),
        });
        return await response.json();
    } catch (error) {
        console.error("Error sending donation notification email:", error);
        throw error;
    }
};

export const sendBondSubEmail = async (subData) => {
    try {
        const response = await fetch(`${EMAIL_API_URL}/bond-sub`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(subData),
        });
        return await response.json();
    } catch (error) {
        console.error("Error sending bond subscription notification email:", error);
        throw error;
    }
};

// --- File/Asset Storage Service ---
export const uploadFile = async (file, folder = "general") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const headers = getHeaders({});
    delete headers["Content-Type"]; // Let fetch boundary be set automatically for multipart

    const response = await fetch(`${BASE_URL}/api/upload`, {
        method: "POST",
        headers,
        body: formData,
    });
    if (!response.ok) throw new Error("Failed to upload file");
    const data = await response.json();
    return data.url; // Returns the uploaded file's URL
};
