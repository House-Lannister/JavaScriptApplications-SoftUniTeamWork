(function () {
    require.config({
        paths: {
            'jquery': 'libs/jquery-2.0.3.min',
            'underscore': 'libs/underscore',
            'ajaxRequester': 'libs/ajax-requester',
            'sammy': 'libs/sammy.min',
            'mustache': 'libs/mustache',
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
                    mainCtrl.logIn();
                }

                return {
                    'sortAllPhotos': sortAllPhotos,
                    'registerUser': registerUser,
                    'loginUser': loginUser
                }
            }());

            var databaseOperator = dataOperator.get();
            var mainCtrl = controller.get(databaseOperator);

            mainCtrl.displayAlbums('#listOfAlbums');

            //$('#register').on('click', appFunctions.registerUser);
            //$('#logInButton').on('click', appFunctions.loginUser);

            var app = Sammy('#main', function() {
                this.get('#/', function() {
                    $('#main').html(Mustache.render(View.Home.responseText));
                    $('#filter').on('change', appFunctions.sortAllPhotos);
                    mainCtrl.displayPhotos('#allImages', Enum.displayPhotos.RANDOMLY);
                    mainCtrl.displayPhotos('#topImages', Enum.displayPhotos.TOP_THREE);
                });

                this.get('#/albums', function() {
                    $('#main').html(Mustache.render(View.Albums.responseText));
                });

                //this.get('#/upload', function() {
                //    $('#main').html(Mustache.render(View.Upload));
                //});
                //this.get('#/contacts', function() {
                //    $('#main').html(Mustache.render(View.Contacts));
                //});
                //this.get('#/login', function() {
                //    $('#main').html(Mustache.render(View.Log_In));
                //});
                //this.get('#/profile', function() {
                //
                //});
                //this.get('#user/:id/album/:name/photo/:id', function() {
                //
                //})
            });
            app.run('#/');
    });
}());