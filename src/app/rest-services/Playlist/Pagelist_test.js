/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 'http://localhost:8080/oceui/dev/stub/roles.json'
 * 
 */
describe('rest-services.playlists', function () {
    var $httpBackend;
    beforeEach(module('rest-services.playlists'));

    describe('Playlist getList()', function () {

        it('should return list of playlist', inject(function (Playlists) {
            Playlists.getList(); 
            expect(Playlists.list).toBeDefined();
        }));

        it('Playlists.list[0].title) should equal "Reggae"', inject(function (Playlists, $httpBackend) {
            var playlist = [
                { title: 'Reggae', id: 1 },
                { title: 'Chill', id: 2 },
                { title: 'Dubstep', id: 3 },
                { title: 'Indie', id: 4 },
                { title: 'Rap', id: 5 },
                { title: 'New Wave', id: 6 }
            ];
            $httpBackend
                .whenGET('/rest/playlist')
                .respond(playlist);

            Playlists.getList();
            console.log('I am here');
            
            $httpBackend.flush();

            expect(Playlists.list[0].title).toEqual("Reggae");
                
        }));
    });
});