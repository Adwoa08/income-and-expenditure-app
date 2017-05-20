var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var budgetRouter = require("./routes/budget-route");
var itemsRouter = require("./routes/items-route");
var path = require("path");
var app = express();
var config = require("./config");
var port = 8000;
var expressJwt = require("express-jwt");
var morgan = require("morgan");
var userRouter = require("./routes/userRoute");


var twilio = require("twilio");
var accountSid = config.smsKey; // Your Account SID from www.twilio.com/console
var authToken = config.auth_token;   // Your Auth Token from www.twilio.com/console
var client = new twilio(accountSid, authToken);



app.get("/budget/message", function(req, res){
    client.messages.create({
    body: "I love to code all the time",
    to: "+18082826434",  // Text this number
    from: '+12345678901' // From a valid Twilio number
})
.then((message) => console.log(message.sid));
})





app.use(bodyParser.json());
app.use(morgan("dev"));


app.use("/auth/change-password", expressJwt({secret: config.secret}));
app.use("/auth", require("./routes/authRoutes"));

app.use("/api", expressJwt({secret: config.secret}));
app.use("/api/budget", budgetRouter);
app.use("/api/budget", itemsRouter);
app.use("/api/user", userRouter);


app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads", "images")));



mongoose.connect(config.database, function(err){
    console.log("I am connected to mongodb");
});


app.listen(port, function(){
    console.log("App is listening on port " + port);
});