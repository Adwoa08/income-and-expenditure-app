var app = angular.module("budgetApp.Auth");

app.controller("loginController", ["$scope", "$location", "userService", function ($scope, $location, userService) {

    $scope.login = function (user) {
        userService.login(user).then(function (response) {
            $location.path("/home");
        }, function (response) {
            swal({
                title: "Unauthorized!",
                text: response.data.message,
                type: "error",
                confirmButtonText: "Cool"
            });
        });
    }
}]);