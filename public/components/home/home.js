var app = angular.module("budgetApp");

app.controller("homeCtrl", ["$scope", "httpService", function($scope, httpService){
    
    httpService.getCurrentUser().then(function (user) {
        $scope.user = user;
    });

    
//Greeting function
var Dates = new Date();
var hours = Dates.getHours();
var mins = Dates.getMinutes();
var secs = Dates.getSeconds();

function greetings(){
    $scope.greeting = '';
    if(hours < 12 && hours >= 0){
        $scope.greeting = `Good morning`;
    } else if(hours >= 12 && hours < 16){
       $scope.greeting = `Good afternoon`;
    } else{
       $scope.greeting = `Good evening`;
    }
}
greetings();
    
}]);