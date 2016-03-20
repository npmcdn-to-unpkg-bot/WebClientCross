var MultiplayerAuctionGame;
(function (MultiplayerAuctionGame) {
    'use strict';
    var AuctionModalController = (function () {
        function AuctionModalController($modalInstance, maxQuantity, item, toastr) {
            this.$modalInstance = $modalInstance;
            this.maxQuantity = maxQuantity;
            this.item = item;
            this.toastr = toastr;
        }
        AuctionModalController.prototype.startAuction = function (quantity, minBidValue) {
            if (typeof quantity == 'undefined' || quantity <= 0) {
                this.toastr.error('Quantity should be positive number.', 'Error');
            }
            else if (quantity > this.maxQuantity) {
                this.toastr.error('You dont have that much quantity to bid.', 'Error');
            }
            else if (typeof minBidValue == 'undefined' || minBidValue <= 0) {
                this.toastr.error('Min bid value should be positive number.', 'Error');
            }
            else {
                this.$modalInstance.close({ quantity: this.quantity, minBidValue: this.minBidValue });
            }
        };
        AuctionModalController.prototype.cancel = function () {
            this.$modalInstance.dismiss('cancel');
        };
        AuctionModalController.$inject = ['$uibModalInstance', 'quantity', 'item', 'toastr'];
        return AuctionModalController;
    })();
    MultiplayerAuctionGame.AuctionModalController = AuctionModalController;
    angular
        .module('MultiplayerAuctionGame')
        .controller('AuctionModalController', AuctionModalController);
})(MultiplayerAuctionGame || (MultiplayerAuctionGame = {}));
//# sourceMappingURL=auctionmodal.controlls.js.map