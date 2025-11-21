
import * as functions from "firebase-functions";
import { firestore } from "firebase-admin";
import { checkAdmin } from "../utils/admin";

const db = firestore();

// POST /api/orders
export const createOrder = functions.https.onRequest(async (req, res) => {
  // TODO: Add validation and calculate totals server-side
  const newOrder = {
    ...req.body,
    createdAt: firestore.FieldValue.serverTimestamp(),
    updatedAt: firestore.FieldValue.serverTimestamp(),
    paymentStatus: "pending",
    orderStatus: "pending",
  };

  const docRef = await db.collection("orders").add(newOrder);
  res.status(201).json({ id: docRef.id, ...newOrder });
});

// GET /api/orders/:id
export const getOrder = functions.https.onRequest(async (req, res) => {
  const orderId = req.params.id;
  const orderRef = db.collection("orders").doc(orderId);
  const doc = await orderRef.get();

  if (!doc.exists) {
    res.status(404).send("Order not found");
    return;
  }

  // TODO: Add ownership check (customer or admin)

  res.status(200).json({ id: doc.id, ...doc.data() });
});
