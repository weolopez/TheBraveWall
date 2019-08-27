/* global angular */
(function () {
    'use strict';

    angular.module('pages.panels', [
        'components.panel'
    ])
        .config(function ($stateProvider) {
        $stateProvider
            .state('wall.panels', {
            url: '/panels/:panel',
            views: {
                'wallContent': {
                    templateUrl: 'app/pages/wall/panels/panels.html',
                    controller: 'panelsCtrl as vm'
                }
            }
        });
    })
        .controller('panelsCtrl', panelsCtrl);

    panelsCtrl.$inject = ['$log', '$scope', '$ionicSlideBoxDelegate', '$timeout', '$stateParams'];
    function panelsCtrl($log, $scope, $ionicSlideBoxDelegate, $timeout, $stateParams) {
        var vm = this;
        vm.panel = $stateParams.panel;
        vm.panelDirection = vm.panel.charAt(vm.panel.length - 1);
        
        vm.slideDelegate=$ionicSlideBoxDelegate.$getByHandle('panelbox');
        vm.panelList = [];

        function init() {
            for (var i = 1; i < 141; i++) {
                vm.panelList[i] = (i > 70 ? i - 70 + "E" : 71-i + "W");
            }
            //  vm.slideHasChanged(120);
        }

        vm.slideHasChanged = function (index) {
            $log.debug('Slide changed to: ' + index);
            vm.currentPanel = vm.panelList[index];
            vm.currentPanelScroll = index;
        };
        
        vm.changePage = function () {
            $log.debug('trying to changed to: '+vm.currentPanelScroll);
            vm.slideDelegate.slide(vm.currentPanelScroll);
        };
        init();
        
            $timeout(function () {
                var currentPanel=Number(vm.panel.substring(0,vm.panel.length - 1));
                        
                if (vm.panelDirection==='W') currentPanel= 71-currentPanel;
                else currentPanel=currentPanel=currentPanel+70;
                    
                vm.slideDelegate.update();
                vm.slideDelegate.enableSlide = false;
                vm.slideDelegate.slide(currentPanel);
            }, 1000);
    }

})();