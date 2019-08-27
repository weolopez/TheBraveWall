(function () {
    'use strict';

    angular.module('rest-services.orderlist', ['app.constants'])
            .service('OrderService', OrderService);

    OrderService.$inject = ['$http', 'RestConstants'];

    function OrderService($http, RestConstants) {
        var vm = this;
        vm.list = [];


        function init() {
            vm.getList();
        }
        vm.getList = function () {
            $http.get(RestConstants.orderlist).then(function (result) {
                vm.list = result.data;
            });
        }
        init();
    }




})();