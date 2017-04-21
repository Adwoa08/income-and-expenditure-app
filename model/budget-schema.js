var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var budgetSchema = new Schema({
    
    date: String,
    
    income: Number,

    expenseBudget: Number,
    
    itemsBought: [{
        type: Schema.Types.ObjectId,
        ref: "ItemBought"
    }],

    amountSpent: {
        type: Number,
        default: 0
    },
    amountRemaining: Number,

    savingsBudget: Number
});



var Itembudget = mongoose.model("Itembudget", budgetSchema);


module.exports = Itembudget;
