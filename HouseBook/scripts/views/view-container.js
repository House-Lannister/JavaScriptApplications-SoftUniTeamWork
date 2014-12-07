define(function(){
    return (function() {
        var homeView = $.get('./templates/home.html', function(html){
            return html;
        });

        var albumsView = $.get('./templates/albums.html', function(html){
            return html;
        });

        var uploadView;

        var contactsView;

        var profileView = $.get('./templates/profile.html', function(html){
            return html;
        });

        var logInView = $.get('./templates/login.html', function(html){
            return html;
        });

        var listPhoto = $.get('./templates/listPhoto.html', function(html){
            return html;
        });

        var albumOwner = $.get('./templates/albumOwner.html', function(html){
            return html;
        });

        var listUserAlbums = $.get('./templates/listOfAlbums.html', function(html){
            return html;
        });

        var photoViewer = $.get('./templates/photoViewer.html', function(html){
            return html;
        });

        var Photo = $.get('./templates/photo.html', function(html){
            return html;
        });

        return {
            Home: homeView,
            Albums: albumsView,
            Upload: uploadView,
            Contacts: contactsView,
            Profile: profileView,
            Log_In: logInView,
            listPhoto: listPhoto,
            listAlbums: listUserAlbums,
            albumOwner: albumOwner,
            photoViewer: photoViewer,
            Photo: Photo
        }
    }());
});