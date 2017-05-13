var app = angular.module("budgetApp");

app.controller("budgetCtrl", ["$scope", "httpService", "detailService", "$location", function ($scope, httpService, detailService, $location) {

    $scope.weeklyPost = [];

    //-----------------READ------------------- 
    httpService.getWeeklyBudget().then(function (data) {
        $scope.weeklyPost = data;
    })



    //----------------CREATE------------------
    $scope.submitBudget = function (budget) {
        httpService.postBudget(budget).then(function(addedBudget){
            $scope.weeklyPost.push(addedBudget);
            console.log($scope.weeklyPost);
            console.log($scope.addedBudget);
        })

        $scope.budget = {};

    }

    
$scope.savePurchases = function(weeksBudget, item){
    weeksBudget.itemsBought.push(item);
    httpService.editBudget(weeksBudget).then(function(data){
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
