
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { isAdmin } from "../utils/admin";

const db = admin.firestore();

export const createProduct = functions.https.onCall(async (data, context) => {
    isAdmin(context);

    // TODO: Add validation for the data object

    try {
        const productRef = await db.collection("products").add(data);
        return { id: productRef.id, ...data };
    } catch (error) {
        console.error("Error creating product:", error);
        throw new functions.https.HttpsError("internal", "Something went wrong");
    }
});

export const updateProduct = functions.https.onCall(async (data, context) => {
    isAdmin(context);

    const { id, ...productData } = data;

    // TODO: Add validation for the data object

    try {
        await db.collection("products").doc(id).update(productData);
        return { id, ...productData };
    } catch (error) {
        console.error("Error updating product:", error);
        throw new functions.https.HttpsError("internal", "Something went wrong");
    }
});

export const deleteProduct = functions.https.onCall(async (data, context) => {
    isAdmin(context);

    const { id } = data;

    try {
        await db.collection("products").doc(id).delete();
        return { id };
    } catch (error) {
        console.error("Error deleting product:", error);
        throw new functions.https.HttpsError("internal", "Something went wrong");
    }
});
