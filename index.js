const express = require("express");
const { scrapeLogic } = require("./scrapeLogic");
const app = express();

const PORT = process.env.PORT || 4000;

app.get("/fnbi", (req, res) => {
  scrapeLogic(res);
});

app.get("/", (req, res) => {
  res.send("Frias Neto BI!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
