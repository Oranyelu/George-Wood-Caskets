
import * as functions from "firebase-functions";
import { firestore } from "firebase-admin";
import { checkAdmin } from "../utils/admin";

const db = firestore();

// POST /api/admin/users
export const createAdminUser = functions.https.onRequest(async (req, res) => {
  await checkAdmin(req, res, async (user) => {
    // TODO: Implement user creation logic
    res.status(501).send("Not Implemented");
  });
});

// GET /api/admin/auditlogs
export const getAuditLogs = functions.https.onRequest(async (req, res) => {
  await checkAdmin(req, res, async (user) => {
    const auditLogsRef = db.collection("audits");
    const snapshot = await auditLogsRef.orderBy("timestamp", "desc").get();
    const auditLogs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(auditLogs);
  });
});
