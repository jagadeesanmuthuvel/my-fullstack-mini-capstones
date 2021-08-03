const express=require('express');
const app=express();
app.get("/",function(req,res){
res.send("<h1>Hellow world</h1>");
});
app.get("/contact",function(req,res){
res.send("<h1>contact me at jagadeesanmuthuvel@gmail.com</h1>");
});
app.get("/about",function(req,res){
res.send("name:jagadeesan");
});
app.listen(8000,function(){
  console.log("The server started in http://localhost:8000");
});
