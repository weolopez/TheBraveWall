(function () {
    'use strict';

    angular.module('app.constants', [
    ])
            .value('version', '0.1')
            .constant('RestConstants',
                    {
                        'playlist': '/rest/playlist',
                        'orderlist': '/rest/orderlist',
                        'playlists': '/rest/playlist&name={listname}',                        
                        'vvmw': 'test/mocks/vvmw_{panel}.json'
                    });
})();
