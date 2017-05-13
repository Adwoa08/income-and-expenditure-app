var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var budgetRouter = require("./routes/budget-route");
var path = require("path");
var app = express();
var config = require("./config");
var port = 8000;


app.use(bodyParser.json());



app.use("/budget", budgetRouter);


app.use(express.static(path.join(__dirname, "public")));



mongoose.connect(config.database, function(err){
    console.log("I am connected to mongodb");
});


app.listen(port, function(){
    console.log("App is listening on port " + port);
});