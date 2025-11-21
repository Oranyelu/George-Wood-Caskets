
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const getOrderById = functions.https.onCall(async (data, context) => {
    const { orderId } = data;

    if (!orderId) {
        throw new functions.https.HttpsError("invalid-argument", "Order ID is required.");
    }

    try {
        const orderDoc = await db.collection("orders").doc(orderId).get();

        if (!orderDoc.exists) {
            throw new functions.https.HttpsError("not-found", "Order not found.");
        }

        return { id: orderDoc.id, ...orderDoc.data() };
    } catch (error) {
        if (error instanceof functions.https.HttpsError) {
            throw error; // Re-throw HttpsError as is
        }
        console.error(`Error fetching order ${orderId}:`, error);
        throw new functions.https.HttpsError("internal", "An error occurred while fetching the order.");
    }
});

