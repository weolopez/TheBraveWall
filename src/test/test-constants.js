(function () {
    'use strict';

    angular.module('app.test.constants', [])
            .constant('TestConstants',
                    {
                        /**
                         * Mocked out URLs 
                         */
                        'reggae': '/rest/playlist&name=reggae',
                        'vvmw_50W': '/rest/vvmw&panel=50W',
                        'vvmw_51W': '/rest/vvmw&panel=51W',
                        'vvmw_52W': '/rest/vvmw&panel=52W',
                        'vvmw_53W': '/rest/vvmw&panel=53W',
                        'vvmw_54W': '/rest/vvmw&panel=54W'
                    });
})();
