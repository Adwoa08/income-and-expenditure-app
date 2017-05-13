var app = angular.module("budgetApp");

app.controller("learnCtrl", ["$scope", "detailService", function($scope, detailService){
    
    httpService.getExpensesForBudget(detailService.budgetId).then(function (data) {
        console.log(data);
            $scope.totalExpenditure = data;
    })
    
}])