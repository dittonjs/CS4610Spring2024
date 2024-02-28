import express from "express";
import path from "path";
import { engine } from 'express-handlebars';
import fs from "fs";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const db = new PrismaClient();

dotenv.config();

const DEBUG = process.env.NODE_ENV !== "production";
const MANIFEST: Record<string, any> = DEBUG ? {} : JSON.parse(fs.readFileSync("static/.vite/manifest.json").toString())

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


console.log(MANIFEST);
app.get("/", (req, res) => {
  res.render('index', {
    debug: DEBUG,
    jsBundle: DEBUG ? "" : MANIFEST["src/main.jsx"]["file"],
    cssBundle: DEBUG ? "" : MANIFEST["src/main.jsx"]["css"][0],
    assetUrl: process.env.ASSET_URL,
    layout: false
  });
});

app.post("/users", async (req, res) => {
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

app.post("/sessions", async (req, res) => {
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
})

type JwtPayload = {
  userId: number
}

app.get("/me", async (req, res) => {
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
      select: {
        id: true,
        firstName: true,
        lastName: true
      }
    });
    res.json({ user });
  } catch(e) {
    res.status(401).json({ error: "not authorized" });
    return;
  }
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}...`);
});


