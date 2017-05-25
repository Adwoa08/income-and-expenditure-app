var app = angular.module("budgetApp");

app.service("httpService", ["$http", function ($http) {

    var self = this;

    //-----------------READ-------------------
    this.getMonthlyBudget = function () {
        return $http.get("/api/budget").then(function (response) {
            return response;
        });
    }
    
    this.getABudget = function(budget){
        return $http.get("/api/budget/" + budget).then(function(response){
            return response;
        });
    }
    
    

    //----------------CREATE------------------
    this.postBudget = function (budget) {
        return $http.post("/api/budget", budget).then(function (response) {
            return self.addedBudget = response;
        })
    }

    //--------------EDIT-------------------------

    this.editBudget = function (budgetId, budget) {
        return $http.put("/api/budget/" + budgetId, budget).then(function (response) {
            return response;
        });

    }


        //--------------DELETE-------------------------
    this.deleteBudget = function(budgetId){
        return $http.delete("/api/budget/" + budgetId)
    }


    
    
    


    //----------EXPENSES FOR A BUDGET-------------------------
    this.getBudgetExpenses = function (budgetId) {
        return $http.get("/api/budget/" + budgetId + "/items").then(function (response) {
            return response;
        });
    }


    //----------------------EXPENSES SECTION---------
    this.getBudgetExpense = function (budgetId, itemId) {
        return $http.get("/api/budget/" + budgetId + "/items/" + itemId).then(function (response) {
            return response;
        })
    }
    
    

    //----------------------EXPENSES SECTION---------
    this.savePurchase = function (budgetId, item) {
        return $http.post("/api/budget/" + budgetId + "/items", item).then(function (response) {
            return response;
        });
    }

    this.deleteExpense = function (budgetId, itemId) {
        return $http.delete("/api/budget/" + budgetId + "/items/" + itemId).then(function (response) {
            return response.data;
        })
    }

    this.editExpenses = function (budgetId, itemId, expense) {
        return $http.put("/api/budget/" + budgetId + "/items/" + itemId, expense).then(function (response) {
            return response;
        })
    }


    
    
  
        this.getCurrentUser = function(){
            return $http.get('/api/user/profile').then(function(response){
                return response.data;
            });
        }
        
        
        
        this.editUser = function(user){
            return $http.put('/users/' + user._id, user).then(function(response){
                return response.data
            })
        }
        this.deleteUser = function(user){
            return $http.delete('/users/' + user._id).then(function(response){
                return "User Deleted!"
            })
        }  
    
}])
