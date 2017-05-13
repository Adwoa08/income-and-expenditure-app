var app = angular.module("budgetApp.Auth");

app.controller("forgotPasswordController", ["$scope", "userService", function ($scope, userService) {
    $scope.forgotPassword = function(email) {
        userService.forgotPassword(email).then(function(response) {
            alert(response.data.message);
        }, function (response) {
            alert(response.data.message);
        });
    };
}]);