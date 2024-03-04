import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

type JwtPayload = {
  userId: number
}

// /users/...
export const buildUsersController = (db: PrismaClient) => {
  const router = Router();

  router.post("/", async (req, res) => {
    const user = await db.user.create({
      data: {
        email: req.body.email,
        password_hash: bcrypt.hashSync(req.body.password),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profile: {
          create: {}
        }
      }
    });

    const token = jwt.sign({
      userId: user.id,
    }, process.env.ENCRYPTION_KEY as string);

    res.json({ user, token });
  });

  router.get("/me", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
      res.status(401).json({ error: "not authorized" });
      return;
    }
    try {
      const payload = jwt.verify(token, process.env.ENCRYPTION_KEY as string) as JwtPayload
      // PRISMA IS OUR MODEL LAYER
      const user = await db.user.findUnique({
        where: {
          id: payload.userId
        },
        select: {
          id: true,
          firstName: true,
          lastName: true
        }
      });

      // VIEW
      res.json({ user });
    } catch(e) {
      res.status(401).json({ error: "not authorized" });
      return;
    }
  });

  return router;
}

