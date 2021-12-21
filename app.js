const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const http = require('https');
const ejs = require('ejs');
const date = require(__dirname +'/date.js');
const apiKey = require(__dirname +'/apiKey.js')

const app = express()
const port = process.env.PORT

app.listen(port, (req,res)=>{
  console.log('Server is UP⬆️');
})

app.use(bodyParser.urlencoded({extended :  true}))
app.use(express.static('public'))
app.set('view engine', 'ejs')



let page = [];



app.get('/',(req,res)=>{
  let today = date.getDate()
  res.render('home', {dayOfTheWeek : today, homeContent : page})
})



app.post('/',(req,res)=>{
  const data = req.body.country_
  let key = apiKey()
  const options = {
	"method": "GET",
	"hostname": "covid-19-data.p.rapidapi.com",
	"port": null,
	"path": `/country?name=${data}`,
	"headers": {
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
		"x-rapidapi-key": `${key}`,
		"useQueryString": true
	}
};

http.get(options, function (response) {


	response.on("data", function (chunk) {
		//chunks.push(chunk);
    const covidData = JSON.parse(chunk);
    const info = {
      cCountry : covidData[0].country,
      cCode : covidData[0].code,
      cConfirmed : covidData[0].confirmed,
      cRecovered : covidData[0].recovered,
      cDeath : covidData[0].deaths,
      cCritical : covidData[0].critical,
      cUpdate : covidData[0].lastUpdate,
    }



    console.log(covidData);

    page.push(info)
    res.redirect('/')

	});

});

})
