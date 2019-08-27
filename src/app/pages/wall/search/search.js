/* global angular */
(function () {
    'use strict';

    angular.module('pages.search', [
    ])
            .config(function ($stateProvider) {
                $stateProvider
                        .state('wall.search', {
                            url: '/search',
                            views: {
                                'wallContent': {
                                    templateUrl: 'app/pages/wall/search/search.html',
                                    controller: 'searchCtrl as vm'
                                }
                            }
                        });
            })
            .controller('searchCtrl', searchCtrl);

    searchCtrl.$inject = ['$log', '$state', 'SearchString', '$scope', 'WallService'];
    function searchCtrl($log, $state, SearchString, $scope, WallService) {
        var vm = this;
        WallService.vets = [];
        vm.params = {
            firstname: '',
            lastname: '',
            HOME_RECRD: '',
            county: '',
            HOME_ST_RC: '',
            service: '',
            grade: '',
            PANEL: '',
            SERVICE_NO: '',
            WALL_NAME: ''
        }
        vm.search = function () {
            angular.forEach(vm.params, function(value, key){
                vm.params[key] = value.toUpperCase();
            })
            WallService.getVets(vm.params).then(function() {
                if (WallService.vets.length===1) $state.go('wall.details', {serviceNo: WallService.vets[0].serviceNo});
                if (WallService.vets.length>1) $state.go('wall.browse');
            });
        }

        var handleFileSelect = function (evt) {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function ($scope) {
                    SearchString.myImage = evt.target.result;
                });
                $state.go('wall.visual-search');
            };
            reader.readAsDataURL(file);
        };
        angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);

    }
})();