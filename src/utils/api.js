const API_URL = "http://localhost:5000/api/email";

export const sendOrderEmail = async (orderData) => {
    try {
        const response = await fetch(`${API_URL}/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
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
        const response = await fetch(`${API_URL}/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
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
        const response = await fetch(`${API_URL}/report`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
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
        const response = await fetch(`${API_URL}/application`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
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
        const response = await fetch(`${API_URL}/bond`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
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
        const response = await fetch(`${API_URL}/booking`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData),
        });
        return await response.json();
    } catch (error) {
        console.error("Error sending booking email:", error);
        throw error;
    }
};
