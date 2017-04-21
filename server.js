var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var budgetRouter = require("./routes/budget-route");
var path = require("path");
var app = express();

var port = 8000;


app.use(bodyParser.json());


mongoose.connect("mongodb://localhost/income-expense-app", function(err){
    console.log("I am connected to mongodb");
});



app.use("/budget", budgetRouter);


app.use(express.static(path.join(__dirname, "public")));


app.listen(port, function(){
    console.log("App is listening on port " + port);
});