import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { authMiddleware } from "../middleware/authentication";
import { UsersRepository } from "../repositories/users_respository";

// /users/...
export const buildUsersController = (usersRepository: UsersRepository) => {
  const router = Router();

  router.post("/", async (req, res) => {
    const user = await usersRepository.createUser(req.body);

    const token = jwt.sign({
      userId: user.id,
    }, process.env.ENCRYPTION_KEY as string);

    res.json({ user, token });
  });

  router.get("/me", authMiddleware, (req, res) => {
    res.json({ user: req.user });
  });

  return router;
}

