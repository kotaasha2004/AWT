const express = require("express");
const bp = require("body-parser");
const ejs = require("ejs");
const app = express();
app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index.ejs", { value: "", result: "" });
});
app.post("/", (req, res) => {
  const data = req.body.name;
  let result = "";
  passed_list = [
    "22pa1a1284",
    "22pa1a1278",
    "22pa1a1280",
    "22pa1a1274",
    "22pa1a12b8",
    "22p1a1256",
  ];
  if (passed_list.includes(data)) {
    result = "Passed";
  } else {
    result = "Failed";
  }
  res.render("index.ejs", { value: data, result: result });
});
app.listen(4000, () => console.log("sever is running at port 4000"));
