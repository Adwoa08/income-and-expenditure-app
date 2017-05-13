var app = angular.module("budgetApp");

app.controller("profileController", ["$scope", "userService", function ($scope, userService) {  
    $scope.userService = userService;
    $scope.changePassword = function (passwords) {
        if (passwords.newPassword === passwords.newPasswordRepeat) {
            userService.changePassword(passwords.newPassword).then(function(response) {
                $scope.passwords = {};
            })
        } else {
            alert("The two passwords didn't match");
        }
    }
}]);