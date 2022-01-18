const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const http = require("https");
const ejs = require("ejs");
const date = require(__dirname + "/date.js");

const app = express();
// const port = process.env.PORT;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let page = [];

app
  .get("/", (req, res) => {
    let today = date.getDate();
  })
  .post("/", (req, res) => {
    const data = req.body.country_;

    const options = {
      method: "GET",
      hostname: "covid-19-data.p.rapidapi.com",
      port: null,
      path: `/country?name=${data}`,
      headers: {
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": process.env.API_KEY,
        useQueryString: true,
      },
    };

    http.get(options, function (response) {
      response.on("data", function (chunk) {
        //chunks.push(chunk);
        const covidData = JSON.parse(chunk);

        res.render("home", {
          dayOfTheWeek: today,
          cCountry: covidData[0].country,
          cCode: covidData[0].code,
          cConfirmed: covidData[0].confirmed,
          cRecovered: covidData[0].recovered,
          cDeath: covidData[0].deaths,
          cCritical: covidData[0].critical,
          cUpdate: covidData[0].lastUpdate,
        });
        console.log(covidData);
      });
    });
  });

  app.listen(process.env.PORT, (req, res) => {
    console.log("Server is UP⬆️");
  });
