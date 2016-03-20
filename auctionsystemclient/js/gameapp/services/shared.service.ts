module MultiplayerAuctionGame {
    export interface ISharedService {
        signIn(username: string): ng.IPromise<{}>;

        signOut(): ng.IPromise<{}>;

        getPlayerStats(): ng.IPromise<{}>;

        getPlayerInventory(): ng.IPromise<{}>;

        createAuction(item: String, quantity: number, minBidValue: number): ng.IPromise<{}>;

        bidInAuction(auctionId: number, biddingAmount: number): ng.IPromise<{}>;
    }

    class SharedService implements ISharedService {
        static $inject = ['$http'];

        constructor(private $http: ng.IHttpService) {

        }

        signIn(username: string): ng.IPromise<{}> {
            return this.$http.post('/authenticate', "username=" + username, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        }

        signOut(): ng.IPromise<{}> {
            return this.$http.get('/signout');
        }

        getPlayerStats(): ng.IPromise<{}> {
            return this.$http.get('/playerstats');
        }

        getPlayerInventory(): ng.IPromise<{}> {
            return this.$http.get('/playerinventory');
        }

        createAuction(item: String, quantity: number, minBidValue: number): ng.IPromise<{}> {
            return this.$http.post('/createauction', "item=" + item + "&quantity=" + quantity + "&minBidValue=" + minBidValue, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        }

        bidInAuction(auctionId: number, biddingAmount: number): ng.IPromise<{}> {
            return this.$http.post('/bidinauction', "auctionId=" + auctionId + "&biddingAmount=" + biddingAmount, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        }
    }

    angular
        .module('MultiplayerAuctionGame')
        .service('SharedService', SharedService);
}