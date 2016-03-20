var MultiplayerAuctionGame;
(function (MultiplayerAuctionGame) {
    'use strict';
    var LoginController = (function () {
        function LoginController($location, sharedService, toastr) {
            this.$location = $location;
            this.sharedService = sharedService;
            this.toastr = toastr;
            this.username = "";
        }
        LoginController.prototype.signIn = function () {
            var _this = this;
            var usernameRegex = /^[a-zA-Z0-9]+$/;
            var validfirstUsername = this.username.match(usernameRegex);
            if (validfirstUsername == null) {
                this.toastr.error('Username not valid ! Only characters A-Z, a-z and - are acceptable.', 'Error');
                return false;
            }
            this.sharedService.signIn(this.username)
                .then(function (result) {
                if (result.data.loggedIn == true) {
                    if (result.data.userstatus == 'New') {
                        _this.toastr.info('Welcome to the Auction Game!', 'Information');
                    }
                    else if (result.data.userstatus == 'Existing') {
                        _this.toastr.info('Welcome back! Nice to see you again!', 'Information');
                    }
                    _this.$location.path("/dashboard");
                }
            });
        };
        LoginController.$inject = ['$location', 'SharedService', 'toastr'];
        return LoginController;
    })();
    MultiplayerAuctionGame.LoginController = LoginController;
    angular
        .module('MultiplayerAuctionGame')
        .controller('LoginController', LoginController);
})(MultiplayerAuctionGame || (MultiplayerAuctionGame = {}));
//# sourceMappingURL=login.controller.js.map