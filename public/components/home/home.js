var app = angular.module("budgetApp");

app.controller("homeCtrl", ["$scope", "httpService", function($scope, httpService){
    
   
    
    httpService.getCurrentUser().then(function (user) {
        $scope.user = user;
    });

    
}])