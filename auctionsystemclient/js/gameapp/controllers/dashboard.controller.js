var MultiplayerAuctionGame;
(function (MultiplayerAuctionGame) {
    'use strict';
    var DashboardController = (function () {
        function DashboardController($location, $modal, sharedService, toastr, socketService, username) {
            var _this = this;
            this.$location = $location;
            this.$modal = $modal;
            this.sharedService = sharedService;
            this.toastr = toastr;
            this.socketService = socketService;
            this.username = username;
            sharedService.getPlayerStats()
                .then(function (result) {
                _this.playerName = result.data.Username;
                _this.coins = result.data.Coins;
            });
            this.sharedService.getPlayerInventory()
                .then(function (result) {
                _this.inventories = result.data;
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
        DashboardController.prototype.signOut = function () {
            var _this = this;
            this.sharedService.signOut().then(function (result) {
                _this.socketService.disconnect();
                _this.toastr.success('See you later!', 'Success');
                _this.$location.path("/");
            });
        };
        ;
        DashboardController.prototype.auction = function (item, quantity) {
            var _this = this;
            if (quantity <= 0) {
                this.toastr.error('You dont have enough quantity to bid!', 'Error');
                return;
            }
            var options = {
                templateUrl: 'views/auctionmodal.html',
                controller: 'AuctionModalController as modal',
                resolve: {
                    quantity: function () { return quantity; },
                    item: function () { return item; }
                }
            };
            this.$modal.open(options).result
                .then(function (x) { return _this.sharedService.createAuction(item, x.quantity, x.minBidValue)
                .then(function (result) {
                _this.toastr.success('Auction queued!', 'Success');
            }); });
        };
        ;
        DashboardController.prototype.bid = function (biddingAmount) {
            var _this = this;
            if (this.playerName == this.message.Username) {
                this.toastr.error('You cant bid in your own auction.', 'Error');
            }
            else if (biddingAmount <= this.message.WinningBid) {
                this.toastr.error('Bid should be greater than winning bid.', 'Error');
            }
            else {
                this.sharedService.bidInAuction(this.message.AuctionId, biddingAmount).then(function (result) {
                    _this.toastr.success('Bid has been placed', 'Success');
                });
            }
        };
        DashboardController.$inject = ['$location', '$uibModal', 'SharedService', 'toastr', 'SocketIOService'];
        return DashboardController;
    })();
    MultiplayerAuctionGame.DashboardController = DashboardController;
    angular
        .module('MultiplayerAuctionGame')
        .controller('DashboardController', DashboardController);
})(MultiplayerAuctionGame || (MultiplayerAuctionGame = {}));
//# sourceMappingURL=dashboard.controller.js.map