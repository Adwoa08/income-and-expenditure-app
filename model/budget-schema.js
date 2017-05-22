var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var budgetSchema = new Schema({

    month: String,

    income: {
        type: Number,
        default: 0 
    },
    
    actualIncome: {
        type: Number,
        default: 0 
    },

    expenseBudget: {
        type: Number,
        default: 0 
    },

    amountSpent: {
        type: Number,
        default: 0
    },
    actualSavings: {
        type: Number,
        default: 0
    },

    savings: {
        type: Number,
        default: 0
    },
    
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});



var Budget = mongoose.model("Budget", budgetSchema);


module.exports = Budget;
