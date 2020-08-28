const express = require("express");
const data = require("./sample_data.json");
const app = express();

app.get("/api/json", (req, res) => {
  res.json(data);
});

app.listen(8080, () => {
  console.log("app listening at 8080");
});
