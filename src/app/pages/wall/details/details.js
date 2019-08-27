/* global angular */
(function () {
    'use strict';

    angular.module('pages.details', [
    ])
            .config(function ($stateProvider) {
                $stateProvider
                        .state('wall.details', {
                            url: '/details/:serviceNo',
                            views: {
                                'wallContent': {
                                    templateUrl: 'app/pages/wall/details/details.html',
                                    controller: 'detailsCtrl as vm'
                                }
                            }
                        });
            })
            .controller('detailsCtrl', detailsCtrl);

    detailsCtrl.$inject = ['$log', '$stateParams', '$state', 'WallService'];
    function detailsCtrl($log, $stateParams, $state, WallService) {
        var vm = this;
        vm.state = $state;
        vm.serviceNo = $stateParams.serviceNo;
        if (vm.serviceNo.length < 1)
            $state.go('wall.search');
        vm.params = {
            firstname: "",
            lastname: "",
            HOME_RECRD: "",
            county: "",
            HOME_ST_RC: "",
            service: "",
            grade: "",
            PANEL: "",
            SERVICE_NO: vm.serviceNo
        };
        WallService.getVets(vm.params).then(function () {
            if (WallService.vets.length !== 1)
                $state.go('wall.search');
            else
                vm.vet = WallService.vets[0];
        });

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
    }
})();