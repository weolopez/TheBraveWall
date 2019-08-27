/* global angular */
(function () {
    'use strict';

    angular.module('pages.visual-search', [
        'ngImgCrop'
    ])
            .config(function ($stateProvider) {
                $stateProvider
                        .state('wall.visual-search', {
                            url: '/visual-search',
                            views: {
                                'wallContent': {
                                    templateUrl: 'app/pages/wall/visual-search/visual-search.html',
                                    controller: 'VisualSearchCtrl as vm'
                                }
                            }
                        });
            })
            .controller('VisualSearchCtrl', VisualSearchCtrl);

    VisualSearchCtrl.$inject = ['$log', '$stateParams', '$interval', '$document', '$scope', 'SearchString'];
    function VisualSearchCtrl($log, $stateParams, $interval, $document, $scope, SearchString) {
        var vm = this;
        vm.SearchString = SearchString;
        $scope.myImage = '';
        $scope.myCroppedImage = '';


        vm.search = function () {            
            vm.SearchString.searchValue = OCRAD(window.temp_ctx);
            vm.SearchString.isSearching = true;
        };
        
    }


})();