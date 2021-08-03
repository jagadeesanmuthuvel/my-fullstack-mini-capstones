const express=require('express');
const app=express();
const bodyparser=require('body-parser');

app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  var num1=Number(req.body.num1);
  var num2=Number(req.body.num2);
  var result=num1+num2;
  console.log(req.body);
  res.send("the total is "+result);
});

app.listen(3000,function(){
  console.log("server started");
});
