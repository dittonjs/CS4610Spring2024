import express from "express";
import path from "path";
import fetch from "node-fetch";

const app = express();

app.get("/", async (req, res) => {
  console.log(process.env);
  const data = await fetch(process.env.API_URL || "http://localhost:3010");
  const body = await data.json();
  console.log(body);
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, () => {
  console.log("Listening on port 3000")
})
