var express = require("express");
var budgetRouter = express.Router();
var ItemBudget = require("../model/budget-schema");
var ItemBought = require("../model/itemsbought-schema");
var bodyParser = require("body-parser");
budgetRouter.use(bodyParser.json());

budgetRouter.route("/allitems")
    .get(function (req, res) {
        ItemBought.find(function (err, savedBudget) {
            console.log(savedBudget);
            res.send(savedBudget);
        })
    })


budgetRouter.route("/")
    .get(function (req, res) {
        ItemBudget.find(function (err, savedBudget) {
            res.send(savedBudget);
        })
    })
    .post(function (req, res) {
        var budgetedItemToBeSaved = new ItemBudget(req.body);
        budgetedItemToBeSaved.save(function (err, budgetItemToBeSaved) {
            res.send(budgetItemToBeSaved);
        })
    })



budgetRouter.route("/:budgetId")
    .get(function (req, res) {
        ItemBudget.findOne({
            _id: req.params.budgetId
        }, function (err, oneBudget) {
            res.send(oneBudget)
        })
    })
    .delete(function (req, res) {
        ItemBudget.findByIdAndRemove(req.params.budgetId, function (err, budgetItemToBeDeleted) {
            budgetItemToBeDeleted.remove(function (err) {
                res.send("Your item has been removed.");
            })
        })
    })
    .put(function (req, res) {
        ItemBudget.findByIdAndUpdate(req.params.budgetId, req.body, {
            new: true
        }, function (err, budgetUpdate) {
            res.send(budgetUpdate);
        });
    });



budgetRouter.route("/:budgetId/items")
    .get(function (req, res) {
        ItemBudget.findById(req.params.budgetId)
            .populate("itemsBought")
            .exec(function (err, budget) {
                if (req.query.price) {
                    var filtered = budget.itemsBought.filter(function (item, index) {
                        return item.price === parseInt(req.query.price);
                    });
                    return res.send(filtered);
                }
                res.send(budget.itemsBought);
            });
    })
    .post(function (req, res) {
        var newItemBought = new ItemBought(req.body);
        newItemBought.save(function (err) {
            ItemBudget.findById(req.params.budgetId, function (err, oneBudget) {
                oneBudget.itemsBought.push(newItemBought._id);
                oneBudget.amountSpent += newItemBought.price;
                oneBudget.save(function (err) {
                    res.send(newItemBought);
                });
            });
        });
    })


budgetRouter.route("/items/:itemId")
    .delete(function (req, res) {
        ItemBought.findByIdAndRemove(req.params.itemId, function (err, deletedItem) {
            if (err) console.log(err)
            res.send(deletedItem);

        });
    })
    .put(function (req, res) {
        ItemBought.findByIdAndUpdate(req.params.itemId, req.body, {new: true}, function (err, updatedItem) {
                if (err) console.log(err);
                res.send(updatedItem);
            })
    })


module.exports = budgetRouter;
