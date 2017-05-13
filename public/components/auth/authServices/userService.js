var app = angular.module("budgetApp.Auth");

app.service("userService", ["$http", "$location", "tokenService", function ($http, $location, tokenService) {
    
    var self = this;
    this.currentUser = {};
    
    
//    Signup function
    this.signup = function (user) {
        return $http.post("/auth/signup", user);
    };

    
    
    
//Login function
    this.login = function (user) {
        return $http.post("/auth/login", user).then(function (response) {
            tokenService.setToken(response.data.token);
            self.currentUser = response.data.user;
            return response;
        });
    };

    
    
    
//Logout function
    this.logout = function () {
        tokenService.removeToken();
        $location.path("/");
    };

    
    
//Authenticate function
    this.isAuthenticated = function () {
        return !!tokenService.getToken();
    };

    
//Change password for loggedIn users
    this.changePassword = function (newPassword) {
        console.log(newPassword);
        return $http.post("/auth/change-password", {
            newPassword: newPassword
        }).then(function (response) {
            alert("Password Changed Successfully!");
            return response.data;
        }, function (response) {
            alert("Problem with the server");
        });
    };
    
//Reset password for users who cannot login
    this.forgotPassword = function (email) {  
    console.log("Sending an email to " + email);
    return $http.post("/auth/forgot", {email: email})
};
    
    
//reset password referrence it calls out to /auth/reset/<someResetToken>
this.resetForgottenPassword = function(password, resetToken) {  
    return $http.post("/auth/reset/" + resetToken, {password: password}).then(function (response) {
        return response.data.message;
    });
};
    
}]);
