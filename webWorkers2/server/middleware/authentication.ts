import { PrismaClient, User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { Middleware, } from "./middleware";
import { JwtPayload } from "../utils/jwt";
import { UsersRepository } from "../repositories/users_respository";

export const authMiddleware: Middleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) {
    res.status(401).json({ error: "not authorized" });
    return;
  }
  try {
    const payload = jwt.verify(token, process.env.ENCRYPTION_KEY as string) as JwtPayload
    console.log(payload);
    const user = await UsersRepository.getInstance().getUserById(payload.userId);
    console.log(user);
    if (!user) {
      throw Error("no user found")
    }
    req.user = user as User;
    req.jwtPayload = payload;

    next();
  } catch(e) {
    console.log(e);
    res.status(401).json({ error: "not authorized" });
    return;
  }
}

