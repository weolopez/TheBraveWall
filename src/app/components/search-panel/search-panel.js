(function () {
    'use strict';

    angular.module('components.search-panel', [])
        .service('SearchString', SearchString)
        .directive('searchPanel', searchPanel);

    SearchString.$inject = ['$log'];
    function SearchString($log) {
        var self = this;
        self.searchString='';
    }
    searchPanel.$inject = ['$log'];
    function searchPanel($log) {
        return {
            restrict: 'E',
            controller: SearchPanelCtrl,
            templateUrl: 'app/components/search-panel/search-panel.html'
        }
    }

    SearchPanelCtrl.$inject = ['$scope', 'SearchString', '$state', 'WallService'];
    function SearchPanelCtrl($scope, SearchString, $state, WallService) {
        var vm = $scope;
        vm.state=$state;
        vm.SearchString = SearchString
        vm.search=function () {
            vm.SearchString.isSearching = !vm.SearchString.isSearching;
            vm.params.WALL_NAME=vm.SearchString.searchValue;
            WallService.getVets(vm.params).then(function() {
                if (WallService.vets.length===1) $state.go('wall.details', {serviceNo: WallService.vets[0].serviceNo});
                if (WallService.vets.length>1) $state.go('wall.browse');
            });
        };
        vm.advancedSearch=function () {
            vm.SearchString.isSearching = !vm.SearchString.isSearching;
            $state.go('wall.search');
        };
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
        
        
    }

})();




