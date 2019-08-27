(function () {
    'use strict';

    angular.module('rest-services.wall-service', ['app.constants'])
            .service('WallService', WallService);

    WallService.$inject = ['$log', '$http', 'RestConstants', '$timeout', '$tm'];

    function WallService($log, $http, RestConstants, $timeout, $tm) {
        var self = this;
        self.vets = [];
        self.getPanel = getPanel;
        self.getVets = getVets;

        function getPanel(panelID) {
            var url = RestConstants.vvmw.supplant({panel: panelID});
            $log.debug('URL IS: ' + url);

            return $http.get(url);
        }

        function getVets(txparam) {
            var o = {
                trx: 'TBH_VVMW_SEARCH_VET',
                param: txparam
            };
            return $http.get($tm.ext.transaction(o)).then(successLastNameSearch, failedLastNameSearch);
        }
        function successLastNameSearch(response, textStatus, jqXHR) {
            self.vets=response.data.tngMessage.data.results.vetInfo;
        }
        function failedLastNameSearch(jqXHR, textStatus, errorThrown) {
            $log.debug("Error Retrieving Callback: " + JSON.stringify(jqXHR) + " " + textStatus, "ERROR");
        }

    }
})();




