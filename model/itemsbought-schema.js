var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var itemSchema = new Schema({
    name: String,
    price: Number,
    budget: {
        type: Schema.Types.ObjectId,
        ref: "Budget"
    }
}, {timestamps: true});

var ItemBought = mongoose.model("ItemBought", itemSchema);

module.exports = ItemBought;