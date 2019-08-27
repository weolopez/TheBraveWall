(function () {
  'use strict';

  angular
    .module('app', [
      'test',
      'app.routes',
      'app.constants',
      'app.exceptions',
      'rest-services',
      'components',
      'pages'
    ])
    .config(function () { });

})();
