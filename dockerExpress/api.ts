import express from "express";
import cors from "cors";
const app = express();

app.use(cors())

let numVisits = 0;

app.get("/", (req, res) => {
  numVisits ++;
  res.json({ numVisits })
});

app.listen(3010, () => {
  console.log("Listening on port 3010")
})
