var app = angular.module("budgetApp");

app.directive("navbar", ["userService", function(userService) {
    return {
        templateUrl: "components/directives/navbar/navbar.html",
        link: function(scope){
            scope.userService = userService;
        }
    }
}]);

$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
        $(this).collapse('hide');
    }
});
