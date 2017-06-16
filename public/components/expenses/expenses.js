var app = angular.module("budgetApp");

app.controller("expensesCtrl", ["$scope", "httpService", "detailService", function ($scope, httpService, detailService) {




    //-----------------READ------------------- 
    httpService.getBudgetExpenses(detailService.budgetId).then(function (response) {
        $scope.dailyPurchases = response.data;

        $scope.totalExpenditure = 0;
        for (var i = 0; i < $scope.dailyPurchases.length; i++) {
            $scope.totalExpenditure += $scope.dailyPurchases[i].price;
        }
    })







    //    EXPENSES CRUD
    $scope.dailyPurchases = [];
    $scope.savePurchases = function (item) {
        httpService.savePurchase(detailService.budgetId, item).then(function (response) {
            $scope.dailyPurchases.push(response.data);
            var expensePrice = response.data.price;
        })

        $scope.item = {};
    }


    $scope.copyExpense = function (expense) {
        $scope.editedExpense = angular.copy(expense);
    }


    $scope.deleteExpense = function (index, itemId) {
        swal({
                title: "Are you sure?",
                text: "You will not be able to recover this item!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            },
            function () {
                httpService.deleteExpense(detailService.budgetId, itemId).then(function (response) {
                    $scope.dailyPurchases.splice(index, 1);
                });
                swal("Deleted!", "Your item has been deleted.", "success");
            });



    }


    $scope.editExpense = function (itemId, expense, index) {
        httpService.editExpenses(detailService.budgetId, itemId, expense).then(function (response) {
            swal("Saved!", "Your changes have been saved!", "success");
            $scope.dailyPurchases[index] = response.data;
        })
    }
}])
