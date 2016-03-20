module MultiplayerAuctionGame {
    'use strict';

    export class AuctionModalController {

        static $inject = ['$uibModalInstance', 'quantity', 'item', 'toastr'];

        private minBidValue: number;

        private quantity: number;

        constructor(private $modalInstance: ng.ui.bootstrap.IModalServiceInstance, private maxQuantity: number, private item: string, private toastr: any) {
        }

        startAuction(quantity: number, minBidValue: number) {
            if (typeof quantity == 'undefined' || quantity <= 0) {
                this.toastr.error('Quantity should be positive number.', 'Error');
            } else if (quantity > this.maxQuantity) {
                this.toastr.error('You dont have that much quantity to bid.', 'Error');
            } else if (typeof minBidValue == 'undefined' || minBidValue <= 0) {
                this.toastr.error('Min bid value should be positive number.', 'Error');
            } else {
                this.$modalInstance.close({ quantity: this.quantity, minBidValue: this.minBidValue });
            }
        }

        cancel() {
            this.$modalInstance.dismiss('cancel');
        }
    }

    angular
        .module('MultiplayerAuctionGame')
        .controller('AuctionModalController', AuctionModalController);
}