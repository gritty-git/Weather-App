const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){

  res.sendFile(__dirname + "/index.html");

})

app.post("/",function(req,res){
  var cityName = req.body.city;
  const query = cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=7bedca6af9f93923efe12438e312bfd8&units=metric";
  https.get(url, function(response){

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      res.render("weather", {temp: temp});
      // res.send("The current temperature is: "+temp);


    })

  })
})

app.get("/weather",function(req,res){

})


app.listen(process.env.PORT || 3000,function(){
  console.log("Running at 3000");
});
