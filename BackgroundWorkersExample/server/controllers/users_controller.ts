import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { authMiddleware } from "../middleware/authentication";
import { UsersRepository } from "../repositories/users_respository";
import { Queue } from "bullmq";

const workQueue = new Queue(
  "unimportant work",
  {
    connection: {
      host: "localhost",
      port: 6379
    }
  });

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

  router.post("/lotsofwork", authMiddleware, (req, res) => {
    workQueue.add("print nums", { num: req.body.num })
    workQueue.add("print nums", { num: req.body.num })
    workQueue.add("print nums", { num: req.body.num })
    workQueue.add("print nums", { num: req.body.num })
    workQueue.add("print nums", { num: req.body.num })
    workQueue.add("print nums", { num: req.body.num })
    workQueue.add("print nums", { num: req.body.num })
    workQueue.add("print nums", { num: req.body.num })
    workQueue.add("print nums", { num: req.body.num })
    workQueue.add("print nums", { num: req.body.num })
    workQueue.add("print nums", { num: req.body.num })
    workQueue.add("print nums", { num: req.body.num })
    workQueue.add("print nums", { num: req.body.num })
    res.json({working: true});
  })

  return router;
}

