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
                            photoCtrl.displayPhotos('#allImages', Enum.displayPhotos.BY_RATING);
                            break;
                        case 'name':
                            photoCtrl.displayPhotos('#allImages', Enum.displayPhotos.BY_NAME);
                            break;
                        case 'date':
                            photoCtrl.displayPhotos('#allImages', Enum.displayPhotos.BY_DATE);
                    }
                }
                function registerUser() {
                    userCtrl.registerUser();
                }
                function loginUser() {
                    userCtrl.logIn();
                }

                return {
                    'sortAllPhotos': sortAllPhotos,
                    'registerUser': registerUser,
                    'loginUser': loginUser
                }
            }());

            // Data operators for all models in the data base
            var categoryData = dataOperator.get(Enum.dataObjects.CATEGORY);
            var albumData = dataOperator.get(Enum.dataObjects.ALBUMS);
            var photoData = dataOperator.get(Enum.dataObjects.PHOTO);
            var commentData = dataOperator.get(Enum.dataObjects.COMMENT);
            var userData = dataOperator.get(Enum.dataObjects.USER);

            // Controllers for all models in the data base
            var categoryCtrl = controller.get(categoryData);
            var albumCtrl = controller.get(albumData);
            var photoCtrl = controller.get(photoData);
            var commentCtrl = controller.get(commentData);
            var userCtrl = controller.get(userData);

            //$('#register').on('click', appFunctions.registerUser);
            //$('#logInButton').on('click', appFunctions.loginUser);

            var app = Sammy('#main', function() {
                this.get('#/', function() {
                    $('#main').html(Mustache.render(View.Home));
                    $('#filter').on('change', appFunctions.sortAllPhotos);
                    photoCtrl.displayPhotos('#allImages', Enum.displayPhotos.RANDOMLY);
                    photoCtrl.displayPhotos('#topImages', Enum.displayPhotos.TOP_THREE);
                });
                //this.get('#/albums', function() {
                //    $('#main').html(Mustache.render(View.Albums));
                //});
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
            });
            app.run('#/');
    });
}());