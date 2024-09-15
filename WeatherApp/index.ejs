const express = require("express");
const bp = require("body-parser");
const ejs = require("ejs");
const axios = require("axios");
const app = express();
app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index", {
    temp: "",
    cityname: "",
    iconUrl: "",
    wind: "",
    description: "",
  });
});
app.post("/", (req, res) => {
  const City = req.body.city;
  console.log(City);
  let url = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${City}&appid=ce8050699e103af5e4d3a7995dc06328`;
  axios.get(url).then((response) => {
    const result1 = response.data.main.temp;
    const result = `${result1}°C`;
    const CityName = response.data.name;
    const iconCode = response.data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

    const Wind = response.data.wind.speed;
    const Description = response.data.weather[0].description;

    const windSpeed = `Wind Speed:${Wind} m/s`;
    res.render("index", {
      temp: result,
      cityname: CityName,
      iconUrl: iconUrl,
      wind: windSpeed,
      description: Description,
    });
  });
});
app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
