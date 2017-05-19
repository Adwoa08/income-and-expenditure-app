var app = angular.module("budgetApp");

app.directive("navbar", ["userService", function (userService) {
    return {
        templateUrl: "components/directives/navbar/navbar.html",
        link: function (scope) {
            scope.userService = userService;
        }
    }

}]);



//This closes the navbar whenever the navbar "a" is clicked
$(document).on('click', '.navbar-collapse.in', function (e) {
    if ($(e.target).is('a')) {
        $(this).collapse('hide');
    }
});


//This closes the navbar whenever the document is clicked.
$(document).click(function () {
    if ($(".navbar-collapse.in")) {
        $(".navbar-collapse.in").collapse("hide");
    }
});
