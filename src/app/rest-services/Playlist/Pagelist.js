(function () {
    'use strict';

    angular.module('rest-services.playlists', ['app.constants'])
        .service('Playlists', Playlists);

    Playlists.$inject = ['$log', '$http', 'RestConstants'];

    function Playlists($log, $http, RestConstants) {
        var vm = this;
        vm.list = [];

        function init() {
            vm.getList();
        }
        
        vm.getList = function () {
            $http.get(RestConstants.playlist).then(function (result) {
                vm.list = result.data;
            });
        }
        init();
    }
})();




