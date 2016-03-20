module MultiplayerAuctionGame {
    'use strict';

    function routes($routeProvider: ng.route.IRouteProvider, toastrConfig: any): void {
        $routeProvider
            .when("/", {
                templateUrl: "views/login.html",
                controller: "LoginController",
                controllerAs: "lc"
            })
            .when("/dashboard", {
                templateUrl: "views/dashboard.html",
                controller: "DashboardController",
                controllerAs: "dc"
            })
            .otherwise({
                redirectTo: "/"
            });
    }

    routes.$inject = ["$routeProvider"];

    angular
        .module("MultiplayerAuctionGame")
        .config(routes);
}
