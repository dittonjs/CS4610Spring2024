import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// /users/...
export const buildSessionsController = (db: PrismaClient) => {
  const router = Router();

  router.post("/", async (req, res) => {
    const user = await db.user.findUnique({
      where: {
        email: req.body.email
      }
    });

    if (user && bcrypt.compareSync(req.body.password, user.password_hash)) {
      const token = jwt.sign({
        userId: user.id,
      }, process.env.ENCRYPTION_KEY as string);

      res.json({ token });
    } else {
      res.status(404).json({ error: "Invalid email or password" })
    }
  });

  return router;
}

