var app = angular.module("budgetApp");

app.controller("summaryCtrl", ["$scope", "detailService", "httpService", function ($scope, detailService, httpService) {


    //-----------------READ------------------- 
    httpService.getMonthlyBudget().then(function (response) {
        $scope.monthlyBudget = response.data;
    var id;
    var savings;
        for(var i = 0; i < $scope.monthlyBudget.length; i++){
            if($scope.monthlyBudget[i]._id){
               id = $scope.monthlyBudget[i]._id || {};
                savings = $scope.monthlyBudget[i] || {};
            }
        }
        
        if(id && savings){
           savingsUpdate(id, savings); 
        }
        
    })

    function savingsUpdate(id, savings) {
        var income = savings.actualIncome;
        var amountSpent = savings.amountSpent;
        savings.actualSavings = income - amountSpent;
        httpService.editBudget(id, savings);
    }




}]);
