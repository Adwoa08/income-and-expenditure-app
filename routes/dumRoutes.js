var express = require("express");
var itemRouter = express.Router();
var ItemBudget = require("../model/budget-schema");
var ItemBought = require("../model/itemsbought-schema");
var bodyParser = require("body-parser");
itemRouter.use(bodyParser.json());


itemRouter.route("/:budgetId/items")
    .get(function (req, res) {
        ItemBudget.findById({_id: req.params.budgetId, user: req.user._id})
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
        newItemBought.user = req.user;
        newItemBought.save(function (err) {
            ItemBudget.findById({_id: req.params.budgetId, user: req.user._id}, function (err, oneBudget) {
                oneBudget.itemsBought.push(newItemBought._id);
                oneBudget.amountSpent += newItemBought.price;
                oneBudget.save(function (err) {
                    res.send(newItemBought);
                });
            });
        });
    })

itemRouter.route("/:budgetId/items/:itemId")
    .delete(function (req, res) {
        ItemBought.findOneAndRemove({_id: req.params.itemId, user: req.user._id}, function (err, item) {
            ItemBudget.
            res.send(item);
//           budget.itemsBought.splice(req.params.itemId, 1);
//            budget.save(function(err){
//                if(err) res.status(500).send(err);
//                return res.send(budget);
//            })
        });
    })
    .put(function(req, res){
    ItemBudget.findById({_id: req.params.budgetId, user: req.user._id}, function(err, budget){
        budget.itemsBought.findOneAndUpdate({_id: req.params.itemId, user: req.user._id}, req.body, {new: true}, function(err){
            res.send(budget.itemsBought);
        })
    })
})




//itemRouter.delete("/items/:itemId", function(req, res){
//    ItemBudget.findById(req.params.itemId, function(err, budget){
//        budget.itemsBought.splice(req.params.itemId, 1);
//        budget.save(function(err) {
//            res.send(budget);
//        })
//    })
//})





//itemRouter.route("/items/:itemId")
//    .delete(function (req, res) {
//        ItemBought.findByIdAndRemove(req.params.itemId, function (err, deletedItem) {
//           ItemBudget.itemsBought.splice(req.params.itemId, 1);
//            ItemBudget.save(function(err){
//                 if (err) res.status(500).send(err);
//                res.send(deletedItem);
//            })
//
//        });
//    })
//    .put(function (req, res) {
//        ItemBought.findByIdAndUpdate(req.params.itemId, req.body, {new: true}, function (err, updatedItem) {
//                if (err) console.log(err);
//                res.send(updatedItem);
//            })
//    })

//itemRouter.route("/items/:id")
//    .delete(function (req, res) {
//       ItemBought.findOneAndRemove({_id: req.params.id},function(err, item){
//           
//           ItemBudget.itemsBought.splice(req.params.id, 1);
//           console.log(itemsBought);
//           ItemBudget.save(function(err){
//               res.send(item);
//           })
//       })
//    })
//
//itemRouter.route("/:budgetId/items/:id")
//    .delete(function (req, res) {
//        ItemBudget.findById({_id: req.params.budgetId, user: req.user._id}, function(err, budget){
//            budget.itemsBought.splice(req.params.id, 1);
//            budget.save(function(err){
//                res.send(budget);
//            })
//        })
//    })
//    .put(function (req, res) {
//        ItemBudget.findOne({_id: req.params.budgetId, user: req.user._id}, function(err, budget){
//            budget.itemsBought.findOneAndUpdate(req.params.id, re.body, {new: true}, function(err){
////                     if(err) res.status(500).send(err);
//                    return res.send(budget.itemsBought);
//            })
//           
//        })
//    })
module.exports = itemRouter;











var express = require("express");
var budgetRouter = express.Router();
var ItemBudget = require("../model/budget-schema");
var ItemBought = require("../model/itemsbought-schema");
var bodyParser = require("body-parser");
budgetRouter.use(bodyParser.json());



budgetRouter.route("/")
    .get(function (req, res) {
        ItemBudget.find({user: req.user._id},function (err, savedBudget) {
            res.send(savedBudget);
        });
    })
    .post(function (req, res) {
        var newBudget = new ItemBudget(req.body);
        newBudget.user = req.user;
        newBudget.save(function (err, budget) {
            if(err) res.status(500).send(err);
            return res.status(401).send(budget);
        });
    })



budgetRouter.route("/:budgetId")
    .get(function (req, res) {
        ItemBudget.findOne({_id: req.params.budgetId, user: req.user._id}, function (err, oneBudget) {
            if(err) res.status(500).send(err);
            res.send(oneBudget)
        })
    })
    .delete(function (req, res) {
        ItemBudget.findByIdAndRemove({_id: req.params.budgetId, user: req.user._id}, function (err, deletedBudget) {
            if(err) res.status(500).send(err);
            return res.send(deletedBudget);
//            budgetItemToBeDeleted.remove(function (err) {
//                res.send("Your item has been removed.");
//            })
        })
    })
    .put(function (req, res) {
        ItemBudget.findByIdAndUpdate({_id: req.params.budgetId, user: req.user._id}, req.body, {new: true}, function (err, budgetUpdate) {
            if(err) res.status(500).send(err);
            return res.send(budgetUpdate);
        });
    });






module.exports = budgetRouter;
