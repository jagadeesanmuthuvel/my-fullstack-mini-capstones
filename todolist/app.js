const express=require('express');
const bodyparser=require('body-parser');
const app=express();
const date=require(__dirname+"/date.js");
const mongoose=require("mongoose");
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema=mongoose.Schema({name:String});
const Item=mongoose.model("Item",itemsSchema);


const listSchema=mongoose.Schema({name:String,items:[itemsSchema]});
const List=mongoose.model("List",listSchema);
const item1=new Item({name:"Welcome to todo list"});
const item2=new Item({name:"Hit + to add the new item"});
const item3=new Item({name:"Hit - button to delete the item"});
const defaultList=[item1,item2,item3];
app.get("/",function(req,res){
  var day="today";

  Item.find(function(err,items){
    if(err){
      console.log(err);
    }
    else{
      if(items.length===0){
        Item.insertMany(defaultList,function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log("inserted default items");
          }
        });
        res.redirect("/");

      }
      else{
      res.render('list',{listTitle:day,list:items});

}
    }

  });


});
app.get("/:customListName",function(req,res){
  let todoname=req.params.customListName;
  List.findOne({name:todoname},function(err,founditems){
    if(!err){
      if(!founditems){
        const list=new List({name:todoname,
          items:defaultList});
          list.save();
          res.redirect("/"+todoname);

      }
      else{
        res.render("list",{listTitle:todoname,list:founditems.items})
      }

    }
  });

});
app.post("/",function(req,res){
  let nitem=req.body.item;
  let listname=req.body.button;
  const item=new Item({name:nitem});
  if(listname==="today")
  {
    item.save()
    res.redirect("/");
  }
  else{
    List.findOne({name:listname},function(err,foundlist){
      foundlist.items.push(item);
      foundlist.save();
      res.redirect("/"+listname)
    });
  }

});
app.post("/delete",function(req,res){
  let trash=req.body.checkbox;
  Item.deleteOne({_id:trash},function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("successfully deleted");
      res.redirect("/");
    }
  });

});
app.get("/about",function(req,res){
  res.render("about");
});

app.listen(3000||process.env.PORT,function(){
  console.log("server started in port"+process.env.PORT);
});
