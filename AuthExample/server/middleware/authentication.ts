import { PrismaClient, User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { MiddlewareBuilder } from "./middleware";
import { JwtPayload } from "../utils/jwt";

export const authMiddleware: MiddlewareBuilder = (db) => async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) {
    res.status(401).json({ error: "not authorized" });
    return;
  }
  try {
    const payload = jwt.verify(token, process.env.ENCRYPTION_KEY as string) as JwtPayload

    const user = await db.user.findUnique({
      where: {
        id: payload.userId
      },
    });
    if (!user) {
      throw Error("no user found")
    }
    req.user = user as User;
    req.jwtPayload = payload;

    next();
  } catch(e) {
    res.status(401).json({ error: "not authorized" });
    return;
  }
}