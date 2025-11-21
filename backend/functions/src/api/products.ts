
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const getProducts = functions.https.onRequest(async (req, res) => {
  // Set CORS headers for preflight and actual requests
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, HEAD");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === 'OPTIONS') {
    // Send response to preflight OPTIONS requests
    res.status(204).send('');
    return;
  }

  if (req.method !== "GET") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  try {
    const snapshot = await db.collection("products").get();
    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
});
