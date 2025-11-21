
import * as functions from "firebase-functions";
import { firestore } from "firebase-admin";
import { checkAdmin } from "../utils/admin";

const db = firestore();

// POST /api/payments/initiate
export const initiatePayment = functions.https.onRequest(async (req, res) => {
  // TODO: Integrate with Paystack or Flutterwave
  res.status(501).send("Not Implemented");
});

// POST /api/payments/webhook/paystack
export const paystackWebhook = functions.https.onRequest(async (req, res) => {
  // TODO: Implement webhook verification
  res.status(501).send("Not Implemented");
});

// POST /api/payments/webhook/flutterwave
export const flutterwaveWebhook = functions.https.onRequest(async (req, res) => {
  // TODO: Implement webhook verification
  res.status(501).send("Not Implemented");
});

// POST /api/payments/:orderId/confirm
export const confirmPayment = functions.https.onRequest(async (req, res) => {
  await checkAdmin(req, res, async (user) => {
    const orderId = req.params.orderId;
    // TODO: Implement manual payment confirmation logic
    res.status(501).send("Not Implemented");
  });
});
