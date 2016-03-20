var MultiplayerAuctionGame;
(function (MultiplayerAuctionGame) {
    'use strict';
    function routes($routeProvider, toastrConfig) {
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
})(MultiplayerAuctionGame || (MultiplayerAuctionGame = {}));
//# sourceMappingURL=app.routes.js.map