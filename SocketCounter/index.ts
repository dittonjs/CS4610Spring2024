import express from "express";
import { engine } from 'express-handlebars';
import {createServer} from "node:http";
import { Server } from "socket.io";
import fs from "fs";
const DEBUG = process.env.NODE_ENV !== "production";
const MANIFEST: Record<string, any> = DEBUG ? {} : JSON.parse(fs.readFileSync("static/.vite/manifest.json").toString())

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Connection recieved!");

  socket.on("disconnect",  () => {
    console.log("Client disconnected!")
  });

  socket.on("increment", (data) => {
    console.log(data)
  });

  socket.on("decrement", (data) => {
    console.log(data)
  });
});

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
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

server.listen(3000, () => {
  console.log("Listening on port 3000...");
});


