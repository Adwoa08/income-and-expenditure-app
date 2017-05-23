var express = require("express");
var BudgetRouter = express.Router();
var Budget = require("../model/budget-schema");
var Items = require("../model/itemsbought-schema");
var bodyParser = require("body-parser");
//BudgetRouter.use(bodyParser.json());


//Buget routes
BudgetRouter.route("/")
      .get(function (req, res) {
        Budget.find({user: req.user._id},function (err, savedBudget) {
            res.send(savedBudget);
        });
    })
    .post(function(req, res){
        var newBudget = new Budget(req.body);
        newBudget.user = req.user;
        newBudget.save(function(err, budget){
            if(err) res.status(500).send(err);
            res.status(201).send(budget);
        });
});


BudgetRouter.route("/:budgetId")
    .get(function (req, res) {
        Budget.findOne({_id: req.params.budgetId, user: req.user._id}, function (err, oneBudget) {
            if(err) res.status(500).send(err);
            res.send(oneBudget);
        })
    })
    .delete(function (req, res) {
        Items.remove({budget: req.params.budgetId}, function(err, items){
          Budget.findOneAndRemove({_id: req.params.budgetId, user: req.user._id}, function (err, deletedBudget) {
            if(err) res.status(500).send(err);
            return res.send(deletedBudget);
            })  
        })
    })
    .put(function (req, res) {
        Budget.findOneAndUpdate({_id: req.params.budgetId, user: req.user._id}, req.body, {new: true}, function (err, budgetUpdate) {
            if(err) res.status(500).send(err);
            return res.send(budgetUpdate);
        });
    });



module.exports = BudgetRouter;
