var app = angular.module("budgetApp.Auth", []);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/signup", {
            templateUrl: "components/auth/signup/signup.html",
            controller: "signupController"
        })
        .when("/login", {
            templateUrl: "components/auth/login/login.html",
            controller: "loginController"
        })
        .when("/logout", {
            controller: "logoutController",
            template: ""
        })
        .when("/reset/:resetToken", {
            templateUrl: "components/auth/reset/reset.html",
            controller: "passwordResetController"
        })
        .when("/forgot", {
            templateUrl: "auth/forgot/forgot.html",
            controller: "forgotPasswordController"
        })
}]);

app.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.interceptors.push("authInterceptor");
}]);
