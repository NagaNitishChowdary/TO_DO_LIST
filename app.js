//jshint eversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy Food","Cook Food","Eat Food"] ;
let workItems = [] ;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true})) ;
app.use(express.static("public")) ;

app.get("/", function(req, res) {
  // res.send("hi the connection is set up correctly") ;
  let today = new Date();
  // var day = "";
  // if (today.getDay() == 0) {
  //   day = "Sunday";
  // } else if (today.getDay() == 1) {
  //   day = "Monday";
  // } else if (today.getDay() == 2) {
  //   day = "Tuesday";
  // } else if (today.getDay() == 3) {
  //   day = "WednesDay";
  // } else if (today.getDay() == 4) {
  //   day = "Thursday";
  // } else if (today.getDay() == 5) {
  //   day = "Friday";
  // } else {
  //   day = "Saturday";
  // }

  let options = {
    weekday : "long" ,
    day : "numeric" ,
    month : "long"
  };

  var day = today.toLocaleDateString("en-US",options) ;

  res.render("list", {listTitle: day , newListItem : items});

});

app.post("/",function(req,res){

  let item = req.body.newItem ;

  if(req.body.list === "Work"){
    workItems.push(item) ;
    res.redirect("/work") ;
  } else {
    items.push(item) ;
    res.redirect("/") ;
  }

});

app.get("/work",function(req,res){
  res.render("list",{listTitle : "Work List",newListItem: workItems}) ;
});

// app.post("/work" , function(req,res){
//   let item = req.body.newItem ;
//   workItems.push(item) ;
//   res.redirect("/work") ;
// }) ;

app.listen(3000, function() {
  console.log("The server is running at port 3000");
});
