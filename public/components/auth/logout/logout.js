
var app = angular.module("budgetApp.Auth");

app.controller("logoutController", ["userService", function (userService) {  
    userService.logout();
}]);