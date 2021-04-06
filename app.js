const express = require('express');
const https = require('https');
const bodyparser = require('body-parser')
const app = express();
const port = 3000;
app.use(bodyparser.urlencoded({extended:true}))

// app.get("/",(req,res)=>{
//
//   const url = 'https://api.openweathermap.org/data/2.5/weather?q=Hyderabad&appid=ca52cab3755421662015ec7f4169df49&units=metric';
//   https.get(url,(response)=>{
//     console.log(response.statusCode)
//     response.on('data',(data)=>{
//       const datae  = JSON.parse(data);
//       const temp = datae.main.temp;
//       console.log(temp);
//       const feels_like = datae.main.feels_like;
//       console.log(feels_like);
//       const discrip = datae.weather[0].description;
//       console.log(discrip);
//       const icon = datae.weather[0].icon
//       const icon_url = 'https://openweathermap.org/img/wn/'+icon+'@2x.png'
//       const img = "<img src="+icon_url+">"
//
//
//       res.write("<h1> The current temperature is "+temp+ " in hyderabad</h1>");
//       res.write("<h1>The current weather description in hyderabd is: "+discrip+"</h1>");
//       console.log(icon_url)
//       res.write(img)
//         res.send();
//     })
//   })
//
// })
//

app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/index.html")
})

app.post("/",(req,res)=>{
var city = req.body.city;
console.log(city)
const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=ca52cab3755421662015ec7f4169df49&units=metric"
https.get(url,(response)=>{
  response.on('data',(data)=>{
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const feels_like = weatherData.main.feels_like;
    const description = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const iconUrl = 'https://openweathermap.org/img/wn/'+icon+'@2x.png';
    console.log(iconUrl)
    const img = "<img src="+iconUrl+">"
    res.write("<h1> The current temperature is "+temp+ " in "+city+"</h1>");
     res.write("<h1>The current weather description in "+city+" is: "+description+"</h1>");
     res.write(img);
       res.send();
  })
})
})








app.listen(port,function(){
  console.log('up and running on port:' +port)
})
