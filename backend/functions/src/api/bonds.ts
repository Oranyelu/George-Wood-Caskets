
import * as functions from "firebase-functions";
import { firestore } from "firebase-admin";
import { checkAdmin } from "../utils/admin";

const db = firestore();

// POST /api/admin/bonds
export const createBond = functions.https.onRequest(async (req, res) => {
  await checkAdmin(req, res, async (user) => {
    // TODO: Implement bond creation logic
    res.status(501).send("Not Implemented");
  });
});

// GET /api/bonds
export const getBonds = functions.https.onRequest(async (req, res) => {
  // TODO: Implement bond listing logic
  res.status(501).send("Not Implemented");
});

// POST /api/bonds/:bondId/purchase
export const purchaseBond = functions.https.onRequest(async (req, res) => {
  // TODO: Implement bond purchase logic
  res.status(501).send("Not Implemented");
});

// GET /api/investments/:id
export const getInvestment = functions.https.onRequest(async (req, res) => {
  // TODO: Implement ownership check
  res.status(501).send("Not Implemented");
});
