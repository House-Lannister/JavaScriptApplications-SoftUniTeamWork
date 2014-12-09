(function () {
    require.config({
        paths: {
            'jquery': 'libs/jquery-2.0.3.min',
            'underscore': 'libs/underscore',
            'ajaxRequester': 'libs/ajax-requester',
            'sammy': 'libs/sammy.min',
            'mustache': 'libs/mustache',
            'q': 'libs/q',
            'modelOperator': 'models/data-operator',
            'modelContainer': 'models/model-container',
            'viewContainer': 'views/view-container',
            'controller': 'controllers/controller',
            'enumContainer': 'enums/enum-container'
        }
    });

    require(['jquery', 'modelOperator', 'controller', 'sammy', 'enumContainer', 'mustache', 'viewContainer'],
        function ($, dataOperator, controller, Sammy, Enum, Mustache, View) {
            var appFunctions = (function(){
                function sortAllPhotos() {
                    $('#allImages').empty();
                    $('#topImages').empty();
                    var sortMethod = $('#filter').val();
                    switch (sortMethod) {
                        case 'rating':
                            mainCtrl.displayPhotos('#allImages', Enum.displayPhotos.BY_RATING);
                            break;
                        case 'name':
                            mainCtrl.displayPhotos('#allImages', Enum.displayPhotos.BY_NAME);
                            break;
                        case 'date':
                            mainCtrl.displayPhotos('#allImages', Enum.displayPhotos.BY_DATE);
                    }
                }

                function displayAlbumPhotoViewer() {

                }

                function registerUser() {
                    mainCtrl.registerUser();
                }
                function loginUser() {
                    mainCtrl.userLogin();
                }

                return {
                    'sortAllPhotos': sortAllPhotos,
                    'registerUser': registerUser,
                    'loginUser': loginUser
                }
            }());

            var databaseOperator = dataOperator.get();
            var mainCtrl = controller.get(databaseOperator);

            if(localStorage.user) {
                var user = JSON.parse(localStorage['user']);
                $('#user').text(user.username);
                $('#userTab').show();
                $('#logInTab').hide();
            } else {
                $('#userTab').hide();
                $('#logInTab').show();
            }

            var app = Sammy('#main', function() {
                this.get('#/', function() {
                    $('#main').html(Mustache.render(View.Home.responseText));
                    $('#filter').on('change', appFunctions.sortAllPhotos);
                    mainCtrl.displayPhotos('#allImages', Enum.displayPhotos.RANDOMLY);
                    mainCtrl.displayPhotos('#topImages', Enum.displayPhotos.TOP_THREE);
                });

                this.get('#/albums', function() {
                    $('#main').html(Mustache.render(View.Albums.responseText));
                    mainCtrl.displayAlbums('#listOfAlbums');
                });

                this.get('#/photos', function() {
                    $('#main').html(Mustache.render(View.photoViewer.responseText));
                    mainCtrl.displayAlbumPhotoViewer('#photoViewer', 'x9qBGMX7mB');
                    $('#rightButton').on('click', function() {
                        mainCtrl.displayAlbumPhotoViewer('#photoViewer')
                    });
                });
                //this.get('#/contacts', function() {
                //    $('#main').html(Mustache.render(View.Contacts));
                //});
                this.get('#/login', function() {
                    localStorage.removeItem(['user']);
                    $('#userTab').hide();
                    $('#logInTab').show();
                    $('#main').html(Mustache.render(View.Log_In.responseText));
                    $('#register').on('click', appFunctions.registerUser);
                    $('#login').on('click', appFunctions.loginUser);
                });
                this.get('#/profile', function() {
                    $('#main').html(Mustache.render(View.Profile.responseText));
                    var user = JSON.parse(localStorage['user']);
                    $('#user').text(user.username);
                    $('#userTab').show();
                    $('#logInTab').hide();
                    $('#submit-img-button').on('change', function(e) {
                        var files = e.target.files || e.dataTransfer.files;
                        // Our file var now holds the selected file
                        var file = files[0];
                        mainCtrl.uploadPhoto(file);
                    });
                });
                //this.get('#user/:id/album/:name/photo/:id', function() {
                //
                //})
            });
            app.run('#/');
    });
}());