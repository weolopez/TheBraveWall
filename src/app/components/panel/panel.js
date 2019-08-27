(function () {
    'use strict';

    angular.module('components.panel', [])
            .directive('panel', panel);
    panel.$inject = ['$log', 'WallService', '$ionicGesture', '$ionicScrollDelegate', '$timeout'];
    function panel($log, WallService, $ionicGesture, $ionicScrollDelegate, $timeout) {
        return {
            restrict: 'E',
            scope: {
                panelid: '=',
                renderid: '='
            },
            controller: PanelCtrl,
            templateUrl: 'app/components/panel/panel.html',
            link: function (scope, element, attrs) {
                scope.clientHeight = window.screen.height;
                scope.clientWidth = window.screen.width;
            }
        }
    }

    PanelCtrl.$inject = ['$log', 'WallService', '$timeout', '$ionicScrollDelegate', '$scope', '$sce'];
    function PanelCtrl($log, WallService, $timeout, $ionicScrollDelegate, $scope, $sce) {
        var vm = $scope;
        vm.vet = WallService.vets[0];
        $scope.$watch('renderid', function (newValue) {
            if (vm.panelid === undefined)
                return false;
            if (vm.renderid === undefined)
                return false;
            $scope.show();
        })

        function init() {
            if (vm.panelDirection === undefined) {
                vm.panelDirection = vm.panelid.charAt(vm.panelid.length - 1);
                vm.justification = (vm.panelDirection === "W" ? true : false);
                vm.panelcharcount = 0;
            }
        }

        $scope.show = function () {
            if (vm.renderid === vm.panelid) {
                $log.debug('vm.panelid: ' + vm.panelid + ' vm.renderid: ' + vm.renderid);
                if (vm.rows === undefined) {
                    WallService.getPanel(vm.panelid).then(function (result) {
                        vm.rows = [];
                        angular.forEach(result.data, function (value, key) {
                            if (vm.rows[value.rowNumber] === undefined)
                                vm.rows[value.rowNumber] = [];
                            vm.rows[value.rowNumber].push(value);
                        });
                        vm.isShowing = true;
                        init();
                        $timeout(function () {
                            vm.panelcharcount = vm.panelcharcount * 8.95;
                            $ionicScrollDelegate.$getByHandle(vm.panelid).resize();


                            $timeout(function () {
                                if (vm.vet !== undefined) {
                                    var elem = document.querySelector('.v' + vm.vet.serviceNo);
                                    var text = elem.innerHTML.length;
                                    var textlength = (text + 4) * 12;
                                    elem.setAttribute('class', 'selected-name');
                                    var pos = elem.getBoundingClientRect();
                                    var scrollWidth = pos.left - ($scope.clientWidth / 2) + textlength;
                                    $ionicScrollDelegate.$getByHandle(vm.panelid).scrollTo(scrollWidth, pos.top - ($scope.clientHeight / 2), true)
                                } else {
                                    $ionicScrollDelegate.$getByHandle(vm.panelid).zoomBy(.1, true)
                                    $timeout(function () {
                                        if (vm.panelDirection === 'E') var width = 0;
                                        else var width = document.querySelector('.wall-panel').offsetWidth / 2;
                                        $ionicScrollDelegate.$getByHandle(vm.panelid).scrollTo(width, 0, true);
                                    }, 500);
                                }
                            }, 200)
                        }, 500);
                    });
                }
                return true;
            }
            return false;
        }

        vm.getRow = function (row) {

            if (row == undefined)
                return;
            var returnString = '';
            var charcount = 0;
            if (vm.panelDirection === 'W')
                returnString = '\u2219';

            angular.forEach(row, function (value, key) {
                charcount = charcount + value.wallName.length + 3;
                returnString = returnString + '<a class="v' + value.serviceNo + '" href="#/wall/details/' + value.serviceNo + '">' + value.wallName + '</a>' + ' \u2219 ';
            });

            if (vm.panelDirection === 'W')
                returnString = returnString.substring(0, returnString.length - 2);

            if (Number(charcount) > Number(vm.panelcharcount))
                vm.panelcharcount = Number(charcount);
            // returnString = $interpolate(returnString)($scope);
            return returnString;
        }
    }
})();




