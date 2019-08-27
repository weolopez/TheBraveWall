(function () {
    'use strict';

    angular.module('pages.wall', [
        'pages.search',
        'pages.panels',
        'pages.visual-search',
        'pages.details',
        'pages.browse',
        'ngToast',
        'ngCookies'
    ])
        .config(function ($stateProvider, $urlRouterProvider) {
            /** Default route for page */
            $urlRouterProvider.when('/wall', '/wall/splash');
            $stateProvider
                .state('wall', {
                    url: '/wall',
                    abstract: 'true',
                    templateUrl: 'app/pages/wall/wall.html',
                    controller: 'wallCtrl as vm'
                })
                .state('wall.splash', {
                    url: '/splash',
                    views: {
                        'wallContent': {
                            templateUrl: 'app/pages/wall/templates/splash.html'
                        }
                    }
                })

                .state('wall.education-center', {
                    url: '/education-center',
                    views: {
                        'wallContent': {
                            templateUrl: 'app/pages/wall/templates/education-center.html'
                        }
                    }
                })
                .state('wall.donate', {
                    url: '/donate',
                    views: {
                        'wallContent': {
                            templateUrl: 'app/pages/wall/templates/donate.html'
                        }
                    }
                })

                .state('wall.walldetails', {
                    url: '/walldetails',
                    views: {
                        'wallContent': {
                            templateUrl: 'app/pages/wall/templates/about.html'
                        }
                    }
                });
        })
        .controller('wallCtrl', wallCtrl);

    wallCtrl.$inject = ['$log', '$ionicSideMenuDelegate', 'ngToast', 'SearchString', '$tm', '$cookies'];

    function wallCtrl($log, $ionicSideMenuDelegate, ngToast, SearchString, $tm, $cookies) {
        var vm = this;

        function init() {

            try {
                vm.appname = $tm.currentApp;
                vm.tm = $tm;
                vm.selectedRecord = { attuid: $tm.ext.session.user.toLocaleLowerCase() };
                vm.selectedGroup = $cookies.selectedGroup;
            }
            catch (err) {
                vm.error = err.name + ': "' + err.message + '" occurred when assigning x.';
            }

        }
        vm.SearchString = SearchString;
        vm.search = function () {
            vm.isSearching = !vm.SearchString.isSearching;

            ngToast.create({
                className: 'danger',
                content: 'Searching for: ' + vm.SearchString.searchValue
            });
        }
        init();
    }
})();




