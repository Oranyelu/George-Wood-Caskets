
import { Request, Response } from "express";
import * as admin from "firebase-admin";

export const checkAdmin = async (
  req: Request,
  res: Response,
  next: (user: admin.auth.DecodedIdToken) => Promise<any>
) => {
  const idToken = req.headers.authorization?.split("Bearer ")[1];

  if (!idToken) {
    res.status(401).send("Unauthorized: No token provided");
    return;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (decodedToken.admin) {
      await next(decodedToken);
    } else {
      res.status(403).send("Forbidden: User is not an admin");
    }
  } catch (error) {
    res.status(401).send("Unauthorized: Invalid token");
  }
};
