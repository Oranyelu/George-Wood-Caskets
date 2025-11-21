
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const getAllOrders = functions.https.onCall(async (data, context) => {
    isAdmin(context); 

    try {
        const ordersSnapshot = await db.collection("orders").orderBy("createdAt", "desc").get();
        const orders = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return orders;
    } catch (error) {
        console.error("Error fetching all orders:", error);
        throw new functions.https.HttpsError("internal", "An error occurred while fetching orders.");
    }
});

export const updateOrderStatus = functions.https.onCall(async (data, context) => {
    isAdmin(context);

    const { orderId, status } = data;

    if (!orderId || !status) {
        throw new functions.https.HttpsError("invalid-argument", "Order ID and status are required.");
    }

    try {
        const orderRef = db.collection("orders").doc(orderId);
        await orderRef.update({ 
            orderStatus: status,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        return { success: true, message: `Order ${orderId} updated to ${status}` };
    } catch (error) {
        console.error("Error updating order status:", error);
        throw new functions.https.HttpsError("internal", "An error occurred while updating the order.");
    }
});

const isAdmin = (context: functions.https.CallableContext) => {
    if (context.auth?.uid !== 'eHa6zCIQFtHwU862WGuezHE7J79i') {
        throw new functions.https.HttpsError("permission-denied", "You must be an admin to perform this action.");
    }
    return true;
};
