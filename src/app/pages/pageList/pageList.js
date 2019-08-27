(function () {
    'use strict';

    angular.module('pages.pagelist', ['app'])
        .config(function ($stateProvider) {
            $stateProvider
                .state('pageList', {
                    url: '/pagelist',
                    templateUrl: 'app/pages/pageList/pageList.html',
                    controller: 'PageListCtrl as vm'
                });
        })
        .controller('PageListCtrl', PageListCtrl);

    PageListCtrl.$inject = ['$log'];

    function PageListCtrl($log) {
        var vm = this;
        vm.modules=angular.module('pages');        
        vm.app=angular.module('app');
        vm.getModules=function(m){
            var module = angular.module(m);
            return module.requires;
        };
        
        vm.getDetails=function(m){
            var module = angular.module(m);
            if ('pages'===m)
                console.dir(module);
            return module.requires;
        };
    }
})();




