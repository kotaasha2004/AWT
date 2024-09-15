const express = require("express");
const bp = require("body-parser");
const ejs = require("ejs");
const axios = require("axios");
const app = express();
app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index", { result: "" });
});
app.post("/", (req, res) => {
  const Currency = req.body.currency;
  const To = req.body.to;
  const From = req.body.from;
  console.log(Currency, To, From);
  let url = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_I5GAqcCKMRCOgN5ObU44s81I7f4ZDJAGrgDJez37&currencies=${From}%2CUSD%2C${To}`;
  axios
    .get(url)
    .then((response) => {
      const result = response.data.data[To];
      console.log(result);
      const result1 = Currency * result;
      console.log(result1);
      res.render("index", { result: result1 });
    })
    .catch((error) => {
      console.log(error);
    });
});
app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
