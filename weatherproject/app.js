const express=require('express');
const https=require('https');
const app=express();
app.get("/",function(req,res){
  const url="https://api.openweathermap.org/data/2.5/weather?q=chennai&appid=460e5aa8855adc5669a59e1777b62057&units=metric";
  
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherdata=JSON.parse(data);

      console.log(weatherdata);

    });
  });
  res.send("The server working");

});
app.listen(3000,function(){
  console.log("server started");
});
