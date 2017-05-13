var app = angular.module("budgetApp");

app.controller("expensesCtrl", ["$scope", "httpService","detailService", function ($scope, httpService, detailService) {

    
    
    
    //-----------------READ------------------- 
    httpService.getExpensesForBudget(detailService.budgetId).then(function (data) {
        $scope.weeklyPost = data;
//        $scope.totalExpenditure = 0;
//        for(var i = 0; i < data.length; i++){
//            $scope.totalExpenditure += data[i].price;
//        }

    })

    
    
    
    
    
    
//    EXPENSES CRUD
    $scope.savePurchases = function (itemsBought) {
        httpService.savePurchases(itemsBought, detailService.budgetId).then(function (response) {
            $scope.weeklyPost.push(response);
            console.log(response);
        })
    }
    
    $scope.copyExpense = function(expense){
        $scope.editedExpense = angular.copy(expense);
    }
    
  $scope.deleteExpense = function(index, id){
      httpService.deleteExpense(id).then(function(response){
          $scope.weeklyPost.splice(index, 1);          
      })
  }
    

  $scope.editExpense = function(editedExpense, index){
      httpService.editExpenses(editedExpense).then(function(response){
          $scope.weeklyPost[index] = response;
      })
  }
}])
