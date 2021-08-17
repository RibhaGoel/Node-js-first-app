const fetch = require("node-fetch");
const forecast = async(place,callback)=>{
    const url =
      "http://api.weatherstack.com/current?access_key=c2b143f46281473a6fbfbe7b62b0ce3d&query="+place;

     const res = await fetch(url)
     if(res.ok){
         const resJSON = await res.json()
         callback(undefined,resJSON.current.temperature)
     }else{
         callback('Error is connection', undefined)
     }
    }

 module.exports = forecast;

// fetch(url)
//   .then((res) => res.json())
//   .then((json) => {
//     console.log(json.current.temperature);
//     console.log(json.current.weather_descriptions[0]);
//   });
