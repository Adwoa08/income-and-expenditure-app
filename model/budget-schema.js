var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var budgetSchema = new Schema({

    month: String,

    income: Number,

    expenseBudget: Number,

    amountSpent: {
        type: Number,
        default: 0
    },
    actualSavings: Number,

    savings: Number,
    
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});



var Budget = mongoose.model("Budget", budgetSchema);


module.exports = Budget;
