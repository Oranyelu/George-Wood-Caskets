
import * as functions from "firebase-functions";
import { firestore } from "firebase-admin";
import { checkAdmin } from "../utils/admin";

const db = firestore();

// POST /api/custom-orders
export const createCustomOrder = functions.https.onRequest(async (req, res) => {
  // TODO: Integrate with Gemini/Genkit for AI pricing
  res.status(501).send("Not Implemented");
});

// GET /api/custom-orders/:id
export const getCustomOrder = functions.https.onRequest(async (req, res) => {
  // TODO: Implement ownership check
  res.status(501).send("Not Implemented");
});

// PUT /api/custom-orders/:id/approve
export const approveCustomOrder = functions.https.onRequest(async (req, res) => {
  await checkAdmin(req, res, async (user) => {
    // TODO: Implement order conversion logic
    res.status(501).send("Not Implemented");
  });
});
