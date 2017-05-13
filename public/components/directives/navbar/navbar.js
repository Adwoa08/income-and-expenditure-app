var app = angular.module("budgetApp");

app.directive("navbar", ["userService", function(userService) {
    return {
        templateUrl: "components/directives/navbar/navbar.html",
        link: function(scope){
            scope.userService = userService;
        }
    }
}]);
