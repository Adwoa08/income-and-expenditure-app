var app = angular.module("budgetApp");

app.controller("summaryCtrl", ["$scope", "detailService", "httpService", function ($scope, detailService, httpService) {


    $scope.monthlyBudget = [];

    //-----------------READ------------------- 
    httpService.getMonthlyBudget().then(function (response) {
        $scope.monthlyBudget = response.data;
    })






}]);
