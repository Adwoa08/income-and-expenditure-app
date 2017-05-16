var app = angular.module("budgetApp");

app.controller("summaryCtrl", ["$scope", "detailService", "httpService", function($scope, detailService, httpService){
    
//    httpService.getExpensesForBudget(detailService.budgetId).then(function (data) {
//        console.log(data);
//            $scope.totalExpenditure = data;
//    })
    
}]);