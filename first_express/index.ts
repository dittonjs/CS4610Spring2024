import express from "express";
import path from "path";

const app = express();
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
});


if (process.env.NODE_ENV === "production") {
  app.use(express.static('static'))
} else {
  app.use((req, res, next) => {
    if (req.url.includes(".")) {
      res.redirect(`http://localhost:5173${req.url}`)
    } else {
      next();
    }
  });
}


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

app.get("/random_number", (req, res) => {
  res.json({ number: Math.random() * 1000 });
});

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});