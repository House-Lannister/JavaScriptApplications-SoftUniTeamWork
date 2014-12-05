define(function(){
    return (function() {
        var homeView = {
            home: '<section id="home">' +
        '<nav class="filter">' +
        '<div class="sort-order">' +
        '<span>Filter by: </span>' +
        '<select id="filter">' +
        '<option disabled="disabled" selected="selected" hidden="hidden">-sort method-</option>' +
        '<option value="rating">Rating</option>' +
        '<option value="name">Name</option>' +
        '<option value="date">Date</option>' +
        '</select>' +
        '</div>' +
        '</nav>' +
        '<section class="top-3-imgs">' +
        '<h2>Top Photos:</h2>' +
        '<div class="images-container" id="topImages">' +
        '</div>' +
        '</section>' +
        '<section class="random-imgs">' +
        '<div class="images-container" id="allImages">' +
        '<h2>Lucky Proposals:</h2>' +
        '</div>' +
        '</section>' +
        '</section>'
        };

        var albumsView;

        var uploadView;

        var contactsView;

        var profileView;

        var logInView;

        var listPhoto = {
            list: '<article>' +
            '<div class="photoContainer">' +
            '<img src="{{file.url}}" class="photoImg" />' +
            '<p class="pictureInfo">{{name}}</p>' +
            '<span>Votes:</span>' +
            '<span class="votesNumber">{{votes}}</span>' +
            '</div>' +
            '</article>'
        };

        return {
            Home: homeView.home,
            Albums: albumsView,
            Upload: uploadView,
            Contacts: contactsView,
            Profile: profileView,
            Log_In: logInView,
            listPhoto: listPhoto.list
        }
    }());
});