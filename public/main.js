var app = angular.module("budgetApp", ["ngRoute", "budgetApp.Auth", "ngFileUpload", "ngStorage"]);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl:"/components/welcome/welcome.html"
        })
        .when("/home", {
            templateUrl: "/components/home/home.html",
            controller: "homeCtrl"
        })
        .when("/budget", {
            templateUrl: "/components/budget/budget.html",
            controller: "budgetCtrl"
        })
        .when("/expenses", {
            templateUrl: "/components/expenses/expenses.html",
            controller: "expensesCtrl"
        })
        .when("/summary", {
            templateUrl: "/components/summary/summary.html",
            controller: "summaryCtrl"
        })
        .when("/profile", {
            templateUrl: "components/profile/profile.html",
            controller: "profileController"
        })
        .when("/forgot", {
            templateUrl: "components/auth/forgot/forgot.html",
            controller: "forgotPasswordController"
        })

        .otherwise({
            redirectTo: "/"
        })
}]);


app.service("detailService", function () {
    if (!localStorage.budgetId) {
        this.budgetId = "";
    } else {
        this.budgetId = localStorage.budgetId;
    }


})
