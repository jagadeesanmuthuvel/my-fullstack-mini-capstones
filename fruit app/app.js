const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/fruitDB",{ useNewUrlParser: true,useUnifiedTopology: true });
const fruitSchema=new mongoose.Schema({
name:String,
age:Number});
const Fruit=mongoose.model("Fruit",fruitSchema);
const fruit= new Fruit({
  name:"grape",
  age:"12"
});
//fruit.save()
Fruit.find(function(err,fruits){
  if(err){
    console.log(err);
  }
  else{
    mongoose.connection.close();
    fruits.forEach(function(fruit){
      console.log(fruit.name);
    })
  }
});
