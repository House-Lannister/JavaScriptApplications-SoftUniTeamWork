(function () {
    require.config({
        paths: {
            'jquery': 'libs/jquery-2.0.3.min',
            'underscore': 'libs/underscore',
            'ajaxRequester': 'libs/ajax-requester',
            'modelOperator': 'models/data-operator',
            'category': 'models/category',
            'album': 'models/album',
            'photo': 'models/photo',
            'comment': 'models/comment',
            'user': 'models/user',
            'controller': 'controllers/controller'
        }
    });

    require(['jquery', 'modelOperator', 'controller'],
        function ($, dataOperator, controller) {
            var domManipulations = (function() {
                function hideTabs(hideOne, hideTwo, hideThree, hideFour, hideFive, showTab) {
                    $(hideOne).hide();
                    $(hideTwo).hide();
                    $(hideThree).hide();
                    $(hideFour).hide();
                    $(hideFive).hide();
                    $(showTab).show();
                }

                function hideLogin(isLogged) {
                    var logInTab = $('#logInTab'),
                        userTab = $('#userTab');
                    if(isLogged) {
                        logInTab.hide();
                        userTab.show();
                    } else {
                        logInTab.show();
                        userTab.hide();
                    }
                }
                return {
                    'hideTabs': hideTabs
                }
            }());
            domManipulations.hideTabs('#albums', '#upload', '#logIn', '#contacts', '#home');

            (function(){
                if (!localStorage.user) {
                    $('#logInTab').show();
                    $('#userTab').hide();
                } else {
                    $('#user').text(localStorage.getItem('user'));
                    $('#logInTab').hide();
                    $('#userTab').show();
                }

                $('#homeTab').on('click', function() {
                    domManipulations.hideTabs('#albums', '#upload', '#logIn', '#contacts', '#userAlbums', '#home');
                });
                $('#albumsTab').on('click', function() {
                    domManipulations.hideTabs('#home', '#upload', '#logIn', '#contacts', '#userAlbums', '#albums');
                });
                $('#uploadTab').on('click', function() {
                    domManipulations.hideTabs('#albums', '#home', '#logIn', '#contacts', '#userAlbums', '#upload');
                });
                $('#contactsTab').on('click', function() {
                    domManipulations.hideTabs('#albums', '#upload', '#logIn', '#home', '#userAlbums', '#contacts');
                });
                $('#logInTab').on('click', function() {
                    domManipulations.hideTabs('#albums', '#upload', '#home', '#contacts', '#userAlbums', '#logIn');
                });
                $('#userTab').on('click', function() {
                    domManipulations.hideTabs('#albums', '#upload', '#home', '#contacts', '#logInTab', '#userAlbums');
                });
            }());

            var ROOT_URL = 'https://api.parse.com/1/classes/';

            var dataObjects = {
                CATEGORY: 'Category',
                ALBUMS: 'Album',
                PHOTO: 'Photo',
                COMMENT: 'Comment',
                USER: 'User'
            };
            var displayPhotos = {
                'TOP_THREE': 'top three',
                'RANDOMLY': 'random',
                'BY_RATING': 'by rating',
                'BY_NAME': 'by name',
                'BY_DATE': 'by date'
            };

            var userData = dataOperator.get(ROOT_URL, dataObjects.USER);
            var userCtrl = controller.get(userData);


            var photoData = dataOperator.get(ROOT_URL, dataObjects.PHOTO);
            var photoCtrl = controller.get(photoData);

            var appFunctions = (function(){
                function sortAllPhotos() {
                    $('#allImages').empty();
                    $('#topImages').empty();
                    var sortMethod = $('#filter').val();
                    switch (sortMethod) {
                        case 'rating':
                            photoCtrl.displayPhotos('#allImages', displayPhotos.BY_RATING);
                            break;
                        case 'name':
                            photoCtrl.displayPhotos('#allImages', displayPhotos.BY_NAME);
                            break;
                        case 'date':
                            photoCtrl.displayPhotos('#allImages', displayPhotos.BY_DATE);
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

            $('#filter').on('change', appFunctions.sortAllPhotos);

            photoCtrl.displayPhotos('#allImages', displayPhotos.RANDOMLY);
            photoCtrl.displayPhotos('#topImages', displayPhotos.TOP_THREE);


            $('#register').on('click', appFunctions.registerUser);
            $('#logInButton').on('click', appFunctions.loginUser);
    });
}());