var MultiplayerAuctionGame;
(function (MultiplayerAuctionGame) {
    var SharedService = (function () {
        function SharedService($http) {
            this.$http = $http;
        }
        SharedService.prototype.signIn = function (username) {
            return this.$http.post('/authenticate', "username=" + username, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        };
        SharedService.prototype.signOut = function () {
            return this.$http.get('/signout');
        };
        SharedService.prototype.getPlayerStats = function () {
            return this.$http.get('/playerstats');
        };
        SharedService.prototype.getPlayerInventory = function () {
            return this.$http.get('/playerinventory');
        };
        SharedService.prototype.createAuction = function (item, quantity, minBidValue) {
            return this.$http.post('/createauction', "item=" + item + "&quantity=" + quantity + "&minBidValue=" + minBidValue, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        };
        SharedService.prototype.bidInAuction = function (auctionId, biddingAmount) {
            return this.$http.post('/bidinauction', "auctionId=" + auctionId + "&biddingAmount=" + biddingAmount, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        };
        SharedService.$inject = ['$http'];
        return SharedService;
    })();
    angular
        .module('MultiplayerAuctionGame')
        .service('SharedService', SharedService);
})(MultiplayerAuctionGame || (MultiplayerAuctionGame = {}));
//# sourceMappingURL=shared.service.js.map