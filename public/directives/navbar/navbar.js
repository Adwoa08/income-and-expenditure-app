var app = angular.module("budgetApp");

app.directive("navbar", function(){
    return {
        restrict: "E",
        templateUrl: "directives/navbar/navbar.html"
    }
})
