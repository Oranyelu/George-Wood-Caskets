
import * as functions from "firebase-functions";
import { firestore, storage } from "firebase-admin";
import { checkAdmin } from "../utils/admin";

const db = firestore();
const bucket = storage().bucket();

// POST /api/orders/:id/invoice
export const createInvoice = functions.https.onRequest(async (req, res) => {
  // TODO: Implement PDF generation and email sending
  res.status(501).send("Not Implemented");
});

// GET /api/invoices/:invoiceId
export const getInvoice = functions.https.onRequest(async (req, res) => {
  // TODO: Implement signed URL generation
  res.status(501).send("Not Implemented");
});

// POST /api/invoices/:invoiceId/remind
export const sendInvoiceReminder = functions.https.onRequest(async (req, res) => {
  // TODO: Implement email sending logic
  res.status(501).send("Not Implemented");
});
