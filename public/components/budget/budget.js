var app = angular.module("budgetApp");

app.controller("budgetCtrl", ["$scope", "httpService", "detailService", "$location", function ($scope, httpService, detailService, $location) {

    $scope.weeklyPost = [];

    //-----------------READ------------------- 
    httpService.getWeeklyBudget().then(function (response) {
        console.log(response.data);
        $scope.weeklyPost = response.data;
    })



    //----------------CREATE------------------
    $scope.submitBudget = function (budget) {
        httpService.postBudget(budget).then(function(response){
            $scope.weeklyPost.push(response.data);
            console.log($scope.weeklyPost);
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
