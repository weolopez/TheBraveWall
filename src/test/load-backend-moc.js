(function () {
    'use strict';

    angular
        .module('test.load-backend-mock', [
            'app.test.constants'
        ])
        .run(LoadBackendMock);

    LoadBackendMock.$inject = ['$httpBackend', '$http', 'TestConstants', '$log'];
    function LoadBackendMock($httpBackend, $http, TestConstants, $log) {
        angular.forEach(TestConstants, function (value, key) {
            $http.get('test/mocks/' + key + '.json').then(function (result) {
                $log.debug('Mocking: '+value);
                $httpBackend
                    .whenGET(value)
                    .respond(result.data);
            });
        });
    }

})();