var app = angular.module("budgetApp");

app.service("httpService", ["$http", function($http){
  
    var self = this;
    
    //-----------------READ-------------------
    this.getWeeklyBudget = function(){
        
        return $http.get("/budget").then(function(response){
            return response.data;
        })
        
    }
    
//    EXPENSES FOR A BUDGET
    this.getExpensesForBudget = function(id){
        
        return $http.get("/budget/" + id + "/items").then(function(response){
            return response.data;
        })
        
    }
    
    //----------------CREATE------------------
    this.postBudget = function(budget){
        
        return $http.post("/budget", budget).then(function(response){
            return self.addedBudget = response.data;
        })
        
    }
    
    //--------------EDIT-------------------------
    
    this.editBudget = function(budget){
        return $http.put("/budget/" + budget._id, budget).then(function(response){
            return response.data;
        });
        
    }
    
    
    //----------------------EXPENSES SECTION---------
    this.getAllExpenses = function(budget){
        return $http.get("/budget/allitems").then(function(response){
            console.log(response.data);
            return response.data;
        })
    }
    
    
    this.savePurchases = function(itemsBought, budget){
                return $http.post("/budget/" + budget + "/items", itemsBought).then(function(response){
            return response.data;
        });
    }
    
    this.deleteExpense = function(id){
        return $http.delete("/budget/items/" + id).then(function(response){
            return response.data;
        })
    }
    
    this.editExpenses = function(expense){
        return $http.put("/budget/items/" + expense._id, expense).then(function(response){
            return response.data;
        })
    }
    

//    SUMMARY SECTION
    this.getExpensesForBudget = function(id){
        
        return $http.get("/budget/" + id + "/items?key=price").then(function(response){
            return response.data;
            console.log(response.data);
        })
        
    }
}])