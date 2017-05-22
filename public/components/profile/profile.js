var app = angular.module("budgetApp");

app.controller("profileController", ["$scope", "Upload", "userService", "httpService", function ($scope, Upload, userService, httpService) {
//    $scope.userService = userService;
    
    $scope.changePassword = function (passwords) {
        if (passwords.newPassword === passwords.newPasswordRepeat) {
            userService.changePassword(passwords.newPassword).then(function (response) {
                $scope.passwords = {};
            })
        } else {
            alert("The two passwords didn't match");
        }
    }
    
    
    httpService.getCurrentUser().then(function (user) {
        $scope.user = user;
    });

    $scope.uploadPic = function (file) {
        upload(file);
    };

    function upload(file) {
        Upload.upload({
            url: "/api/user",
            method: "PUT",
            data: {
                file: file
            }
        }).then(function (response) {
            $scope.user = response.data;
            console.log($scope.user);
            $scope.file = null;
        });
    }


}]);
