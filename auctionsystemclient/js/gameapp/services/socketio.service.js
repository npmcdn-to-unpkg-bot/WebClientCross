var MultiplayerAuctionGame;
(function (MultiplayerAuctionGame) {
    var SocketIOService = (function () {
        var $rootScope;
        function SocketIOService($rs) {
            $rootScope = $rs;            
        }
        SocketIOService.prototype.on = function (eventName, callback) {
            this.socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(this.socket, args);
                });
            });
        };
        SocketIOService.prototype.emit = function (eventName, data, callback) {
            this.socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(this.socket, args);
                    }
                });
            })
        };
        SocketIOService.prototype.connect = function () {
            this.socket = io.connect();
        }
        SocketIOService.prototype.disconnect = function () {
            this.socket.disconnect();
        }
        SocketIOService.$inject = ['$rootScope'];
        return SocketIOService;
    })();
    angular
        .module('MultiplayerAuctionGame')
        .service('SocketIOService', SocketIOService);
})(MultiplayerAuctionGame || (MultiplayerAuctionGame = {}));
//# sourceMappingURL=shared.service.js.map