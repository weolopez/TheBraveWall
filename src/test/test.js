(function () {
  'use strict';

  angular
    .module('testold', [
      'ngMockE2E',
      'test.load-backend-mock'
    ])
    .run(Test);

  Test.$inject = ['$httpBackend', '$log'];
  function Test($httpBackend, $log) {
    $httpBackend.whenGET(function (url) {
      if (url.indexOf(".html") > -1) return true;
      if (url.indexOf(".json") > -1) return true;
      $log.debug("test.js Debug Redirecting: "+url);
      return false;
    }).passThrough();
  }

})();
