var app = angular.module("applogin", ["ui.router"])


app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state("login", {
            url: "/login",
            templateUrl: "templates/login.html",
            controller: "login-ct",
            resolve: {
                'title': ['$rootScope', function ($rootScope) {
                    $rootScope.title = "Login";
                }],
            }
        })

    $urlRouterProvider.otherwise("/login");

});

app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);