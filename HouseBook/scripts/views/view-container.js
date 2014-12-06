define(function(){
    return (function() {
        var homeView = $.get('./templates/home.html',function(html){
            return html;
        });

        var albumsView = $.get('./templates/albums.html',function(html){
            return html;
        });

        var uploadView;

        var contactsView;

        var profileView;

        var logInView;

        var listPhoto = {
            html: '<article>' +
            '<div class="photoContainer">' +
            '<img src="{{file.url}}" class="photoImg" />' +
            '<p class="pictureInfo">{{name}}</p>' +
            '<span>Votes:</span>' +
            '<span class="votesNumber">{{votes}}</span>' +
            '</div>' +
            '</article>'
        };

        var albumOwner = {
            html: '<h2>{{username}}\'s albums</h2>'
        };

        var listUserAlbums = {
            html: '<article class="userAlbumContainer">' +
        '<div class="userAlbumDiv">' +
        '<a href="#/user/{{userId}}">' +
        '<img class="lastPicUploaded" src="{{photoUrl}}" />' +
        '</a>' +
        '<p class="albumPicInfo">{{name}}</p>' +
        '</div>' +
        '</article>'
        };

        var photoViewer = {

        };

        return {
            Home: homeView,
            Albums: albumsView,
            Upload: uploadView,
            Contacts: contactsView,
            Profile: profileView,
            Log_In: logInView,
            listPhoto: listPhoto.html,
            listAlbums: listUserAlbums.html,
            albumOwner: albumOwner.html,
            photoViewer: photoViewer
        }
    }());
});