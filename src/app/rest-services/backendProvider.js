(function () {
    'use strict';

    angular.module('rest-services.general-rest-handler', [
        'ngToast'
    ])
        .factory('generalRestHandler', generalRestHandler)
        .config(backendProvider);

    generalRestHandler.$inject = ['$log', '$timeout', 'ngToast'];
    function generalRestHandler($log, $timeout, ngToast) {
        return {
            request: genericRequestHandler,
            response: genericResponseHandler
        };

        function genericRequestHandler(config) {
            if ((config.url === undefined) ||
                (config.url.indexOf('.html') > -1) ||
                (config.url.indexOf('.json') > -1)) {
                return config;
            }
            
     /*       config.toast = ngToast.info({
                content: 'Calling: ' + config.url,
                dismissOnClick: true,
                dismissOnTimeout: false,
                animation: 'slide',
                verticalPosition: 'bottom',
                maxNumber: 5
            });
*/
            $timeout(function () {
                var id = config.toast;
                var messages = ngToast.messages;
                for (var i = messages.length - 1; i >= 0; i--) {
                    if (messages[i].id === id) {
                        ngToast.dismiss(config.toast);
                        ngToast.create({
                            className: 'danger',
                            content: config.url + ': call timed out!!!',
                            dismissOnClick: true,
                            dismissOnTimeout: false,
                            animation: 'slide',
                        });
                        return;
                    }
                }
            }, 5000);

            $log.debug('ENTER general request code for ' + config.url + ' in backendProvider.js');
            return config;
        }

        function genericResponseHandler(config) {
            if ((config.config.url === undefined) ||
                (config.config.url.indexOf('.html') > -1) ||
                (config.config.url.indexOf('.json') > -1)) {
                return config;
            }
            
            ngToast.dismiss(config.config.toast);
            $log.debug('ENTER general response code ' + config.config.url + ' in backendProvider.js, Status code is: ' + config.status);

            if (config.status !== 200) {
                ngToast.create({
                    className: 'danger',
                    content: config.config.url + ': failed with status code of ' + config.status,
                    dismissOnClick: true,
                    dismissOnTimeout: false,
                    animation: 'slide',
                });
            }
            return config;
        }
    }

    backendProvider.$inject = ['$httpProvider'];
    function backendProvider($httpProvider) {
        $httpProvider.interceptors.push('generalRestHandler');
    }

})();
