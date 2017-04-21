var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var itemsboughtSchema = new Schema({
    name: String,
    price: Number,
}, {timestamps: true});

var ItemBought = mongoose.model("ItemBought", itemsboughtSchema);

module.exports = ItemBought;