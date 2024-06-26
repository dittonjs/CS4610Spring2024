import express from "express";
import path from "path";
import { engine } from 'express-handlebars';
import fs from "fs";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { buildUsersController } from "./server/controllers/users_controller";
import { buildSessionsController } from "./server/controllers/sessions_controller";
import { buildHomeController } from "./server/controllers/home_controller";
import { UsersRepository } from "./server/repositories/users_respository";


const db = new PrismaClient();
const usersRepository = UsersRepository.getInstance(db);

dotenv.config();

export const DEBUG = process.env.NODE_ENV !== "production";
export const MANIFEST: Record<string, any> = DEBUG ? {} : JSON.parse(fs.readFileSync("static/.vite/manifest.json").toString())

const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
});

if (!DEBUG) {
  app.use(express.static('static'));
} else {
  app.use((req, res, next) => {
    if (req.url.includes(".")) {
      res.redirect(`${process.env.ASSET_URL}/${req.url}`)
    } else {
      next();
    }
  });
}


app.use("/", buildHomeController());
app.use("/users", buildUsersController(usersRepository));
app.use("/sessions", buildSessionsController(db));

app.post("/uploads", (req, res) => {
  const data: Buffer[] = [];
  req.on("data", (chunk) => {
    data.push(chunk);
  });

  req.on("end", () => {
    // do something with the data
    const buffer = Buffer.concat(data);
    const dataString = buffer.toString("utf-8");
    const parts = dataString.split(/--.+\r\n/);
    const part = parts.at(-2)!!;
    const i = part.indexOf('\r\n\r\n');
    const splits = [part.slice(0,i), part.slice(i+4)];

    const fileBuffer = Buffer.from(splits[1]!!, "utf-8");
    fs.writeFileSync(path.join(__dirname, "uploaded_files", "file.txt"), fileBuffer);
    res.json({});
  })
});


app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}...`);
});


