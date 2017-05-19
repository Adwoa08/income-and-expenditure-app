var app = angular.module("budgetApp");

app.controller("expensesCtrl", ["$scope", "httpService","detailService", function ($scope, httpService, detailService) {

    
    
    
    //-----------------READ------------------- 
    httpService.getBudgetExpenses(detailService.budgetId).then(function (response) {
        $scope.weeklyPost = response.data;
//        $scope.totalExpenditure = 0;
//        for(var i = 0; i < data.length; i++){
//            $scope.totalExpenditure += data[i].price;
//        }

    })

    
    
    
    
    
    
//    EXPENSES CRUD
     $scope.weeklyPost = [];
    $scope.savePurchases = function (item) {
        httpService.savePurchase(detailService.budgetId, item).then(function (response) {
            $scope.weeklyPost.push(response.data);
            console.log(response.data);
        })
        
        $scope.item = {};
    }
    
    
    $scope.copyExpense = function(expense){
        $scope.editedExpense = angular.copy(expense);
    }
    
    
  $scope.deleteExpense = function(index, itemId){
      httpService.deleteExpense(detailService.budgetId, itemId).then(function(response){
          $scope.weeklyPost.splice(index, 1);          
      })
  }
    

  $scope.editExpense = function(itemId, expense, index){
      console.log(itemId);
      console.log(expense);
      console.log(index);
      httpService.editExpenses(detailService.budgetId, itemId, expense).then(function(response){
          $scope.weeklyPost[index] = response.data;
      })
  }
}])
