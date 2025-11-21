
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const checkAndCancelExpiredInvoices = functions.pubsub.schedule("every 24 hours").onRun(async (context) => {
    const now = new Date();
    const query = db.collection("invoices").where("status", "==", "pending").where("dueDate", "<=", now);

    try {
        const snapshot = await query.get();
        if (snapshot.empty) {
            console.log("No expired invoices found.");
            return null;
        }

        const batch = db.batch();

        snapshot.forEach(doc => {
            const invoice = doc.data();
            const invoiceRef = db.collection("invoices").doc(doc.id);
            const orderRef = db.collection("orders").doc(invoice.orderId);

            batch.update(invoiceRef, { status: "expired" });
            batch.update(orderRef, { orderStatus: "canceled", paymentStatus: "unpaid" });
        });

        await batch.commit();
        console.log(`Canceled ${snapshot.size} expired orders.`);
        return null;

    } catch (error) {
        console.error("Error in checkAndCancelExpiredInvoices job:", error);
        return null; // Ensure the function always returns gracefully
    }
});
