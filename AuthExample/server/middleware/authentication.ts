import { PrismaClient } from "@prisma/client";
import { Middleware, MiddlewareBuilder } from "./middleware";
import jwt from "jsonwebtoken";

export const authMiddleware: MiddlewareBuilder = (db) => async (req, res, next) => {
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
}