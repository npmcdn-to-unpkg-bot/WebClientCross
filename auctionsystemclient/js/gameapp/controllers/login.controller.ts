module MultiplayerAuctionGame {
    'use strict';

    export class LoginController {

        static $inject = ['$location', 'SharedService', 'toastr'];

        private username: string = "";

        constructor(private $location: ng.ILocationService, private sharedService: ISharedService, private toastr: any) {
        }

        signIn() {

            var usernameRegex = /^[a-zA-Z0-9]+$/;

            var validfirstUsername = this.username.match(usernameRegex);

            if (validfirstUsername == null) {

                this.toastr.error('Username not valid ! Only characters A-Z, a-z and - are acceptable.', 'Error');

                return false;
            }

            this.sharedService.signIn(this.username)
                .then((result: ng.IHttpPromiseCallbackArg<any>) => {

                    if (result.data.loggedIn == true) {

                        if (result.data.userstatus == 'New') {

                            this.toastr.info('Welcome to the Auction Game!', 'Information');
                        }
                        else if (result.data.userstatus == 'Existing') {

                            this.toastr.info('Welcome back! Nice to see you again!', 'Information');
                        }

                        this.$location.path("/dashboard");
                    }
                });
        }
    }

    angular
        .module('MultiplayerAuctionGame')
        .controller('LoginController', LoginController);
}