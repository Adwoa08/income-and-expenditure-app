var app = angular.module("budgetApp");

app.controller("budgetCtrl", ["$scope", "httpService", "detailService", "$location", function ($scope, httpService, detailService, $location) {

    $scope.monthlyBudget = [];

    //-----------------READ------------------- 
    httpService.getMonthlyBudget().then(function (response) {
        $scope.monthlyBudget = response.data;
    })



    //----------------CREATE------------------
    $scope.submitBudget = function (budget) {
        var actualIncome = budget.income;
        budget.actualIncome = actualIncome;
        httpService.postBudget(budget).then(function(response){
            $scope.monthlyBudget.push(response.data);
        })
        $scope.budget = {};
    }

    
    
$scope.savePurchases = function(monthBudget, item){
    monthBudget.itemsBought.push(item);
    httpService.editBudget(monthBudget).then(function(data){
        console.log(data);
    })
    $scope.item = {};
}

$scope.getDetails = function(budgetId){
    detailService.budgetId = budgetId;
    localStorage.budgetId = budgetId;
    $location.path("/expenses");
}



}])
