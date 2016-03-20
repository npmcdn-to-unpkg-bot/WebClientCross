module MultiplayerAuctionGame {
    'use strict';

    export class DashboardController {

        private playerName: string;

        private coins: number;

        private inventories: any[];

        private message: any;

        static $inject = ['$location', '$uibModal', 'SharedService', 'toastr', 'SocketIOService'];

        constructor(private $location: ng.ILocationService, private $modal: ng.ui.bootstrap.IModalService, private sharedService: ISharedService, private toastr: any, private socketService: any, public username: string) {
            sharedService.getPlayerStats()
                .then((result: ng.IHttpPromiseCallbackArg<any>) => {
                    this.playerName = result.data.Username;

                    this.coins = result.data.Coins;
                });

            this.sharedService.getPlayerInventory()
                .then((result: ng.IHttpPromiseCallbackArg<any>) => {
                    this.inventories = result.data;
                });

            this.socketService.connect();

            var that = this;

            this.socketService.on('send:auctiondata', function (message) {
                that.message = message;
            });

            this.socketService.on('send:logout', function (message) {
                that.signOut;
            });
        }

        signOut() {
            this.sharedService.signOut().then((result: ng.IHttpPromiseCallbackArg<any>) => {

                this.socketService.disconnect();

                this.toastr.success('See you later!', 'Success');

                this.$location.path("/");
            });
        };

        auction(item: string, quantity: number) {
            if (quantity <= 0) {
                this.toastr.error('You dont have enough quantity to bid!', 'Error');

                return;
            }

            var options: ng.ui.bootstrap.IModalSettings = {
                templateUrl: 'views/auctionmodal.html',
                controller: 'AuctionModalController as modal',
                resolve: {
                    quantity: function () { return quantity },
                    item: function () { return item }
                }
            };

            this.$modal.open(options).result
                .then(x => this.sharedService.createAuction(item, x.quantity, x.minBidValue)
                    .then((result: ng.IHttpPromiseCallbackArg<any>) => {
                        this.toastr.success('Auction queued!', 'Success');
                    }));
        };

        bid(biddingAmount: number) {
            if (this.playerName == this.message.Username) {
                this.toastr.error('You cant bid in your own auction.', 'Error');
            } else if (biddingAmount <= this.message.WinningBid) {
                this.toastr.error('Bid should be greater than winning bid.', 'Error');
            } else {
                this.sharedService.bidInAuction(this.message.AuctionId, biddingAmount).then((result: ng.IHttpPromiseCallbackArg<any>) => {
                    this.toastr.success('Bid has been placed', 'Success');
                });
            }
        }
    }

    angular
        .module('MultiplayerAuctionGame')
        .controller('DashboardController', DashboardController);
}