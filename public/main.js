var app = angular.module("budgetApp", ["ngRoute"]);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "/home/home.html",
            controller: "homeCtrl"
        })
        .when("/budget", {
            templateUrl: "/budgets/budget.html",
            controller: "budgetCtrl"
        })
        .when("/expenses", {
            templateUrl: "/expenses/expenses.html",
            controller: "expensesCtrl"
        })
        .when("/summary", {
            templateUrl: "/summary/summary.html",
            controller: "summaryCtrl"
        })

        .otherwise({
            redirectTo: "/home"
        })
}]);

app.service("detailService", function () {

    if (!localStorage.budgetId){
        this.budgetId = "";
    } else {
        this.budgetId = localStorage.budgetId;
    }


})
