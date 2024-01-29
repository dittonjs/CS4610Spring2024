import express from "express";
import path from "path";
import {name} from "./controllers/home_controller";
import { engine } from 'express-handlebars';
import fs from "fs";
const DEBUG = process.env.NODE_ENV !== "production";
const MANIFEST: Record<string, any> = DEBUG ? {} : JSON.parse(fs.readFileSync("static/.vite/manifest.json").toString())

const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  console.log(name);
  next()
});

if (!DEBUG) {
  app.use(express.static('static'));
} else {
  app.use((req, res, next) => {
    if (req.url.includes(".")) {
      res.redirect(`http://localhost:5173${req.url}`)
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
    layout: false
  });
});

app.get("/random_number", (req, res) => {
  res.json({ number: Math.random() * 1000 });
});

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});


