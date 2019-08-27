/* global angular */
(function () {
    'use strict';

    angular.module('pages.browse', [
    ])
            .config(function ($stateProvider) {
                $stateProvider
                        .state('wall.browse', {
                            url: '/browse',
                            views: {
                                'wallContent': {
                                    templateUrl: 'app/pages/wall/browse/browse.html',
                                    controller: 'browseCtrl as vm'
                                }
                            }
                        });
            })
            .controller('browseCtrl', browseCtrl);

    browseCtrl.$inject = ['$log', '$state', 'WallService'];
    function browseCtrl($log, $state, WallService) {
        var vm = this;
        vm.WallService = WallService;
        vm.getUrl = function (service) {
            if (service === 'NAVY')
                return 'assets/images/navy/15.png';
            if (service === 'ARMY')
                return 'assets/images/army/180px.png';
            if (service === 'AIR FORCE')
                return 'assets/images/airforce/airforce-logo.png';
            if (service === 'MARINE CORPS')
                return 'assets/images/marine-corps/Marine-Corps-Logo.jpg';
        };
        if (WallService.vets.length === 1)
            $state.go('wall.details');
        if (WallService.vets.length === 0)
            $state.go('wall.search');
    }
})();