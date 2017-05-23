var express = require("express");
var ItemRouter = express.Router();
var Budget = require("../model/budget-schema");
var Items = require("../model/itemsbought-schema");





//Items route
ItemRouter.route("/:budgetId/items")
    .get(function(req, res){
    Items.find({budget: req.params.budgetId}, function(err, items){
        res.send(items);
    })
})
    .post(function (req, res) {
        var newItem = new Items(req.body);
        newItem.budget = req.params.budgetId;
        newItem.save(function(err, item){
            Budget.findById(req.params.budgetId, function(err, budget){
                budget.amountSpent += newItem.price;
                budget.save(function(err){
                   res.send(item);
                })
            })          
        });
    })

ItemRouter.route("/:budgetId/items/:itemId")
    .get(function(req, res){
    Items.findOne({budget: req.params.budgetId, _id: req.params.itemId}, function(err, oneItem){
        res.send(oneItem);
    })
})
    .delete(function(req, res){
    Items.findOneAndRemove({budget: req.params.budgetId, _id: req.params.itemId}, function(err, deletedItem){
        Budget.findById(req.params.budgetId, function(err, budget){
            budget.amountSpent -= deletedItem.price;
            budget.actualSavings += deletedItem.price;
            budget.save(function(err){
              res.send(deletedItem);
            });
        });     
    })
})
.put(function(req, res){
    Items.findOneAndUpdate({budget: req.params.budgetId, _id: req.params.itemId}, req.body, {new: false}, function(err, item){
        Budget.findById(req.params.budgetId, function(err, budget){
            budget.amountSpent -= item.price; 
            budget.amountSpent += req.body.price;
            budget.save(function(err){
                res.send(req.body);
            })
        })
    })
})
module.exports = ItemRouter;