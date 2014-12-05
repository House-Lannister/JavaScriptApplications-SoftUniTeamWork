define(['underscore', 'mustache', 'viewContainer'], function(_, Mustache, View) {
    return (function() {
        var NUMBER_OF_RANDOM_PHOTOS = 3;

        function Controller(dataOperator) {
            this.operator = dataOperator;
        }

        Controller.prototype.logIn = function() {
            var logInName = $('#logInName').val();
            var logInPass = $('#logInPass').val();

            function checkForUser(data) {
                for (var obj in data.results) {
                    var user = data.results[obj];
                    var username = user.username;
                    var pass = user.password;

                    if (username === logInName) {
                        if (!localStorage.user) {
                            localStorage.setItem('user', username);
                            $('#logInTab').hide();
                            $('#userTab').show();
                        }
                        $('#user').text(username);
                        $('#logIn').hide();
                        $('#userAlbums').show();
                    }
                }
            }

            this.operator.user.getAll(checkForUser, errorFunctions.errorMessage);
        };

        Controller.prototype.registerUser = function() {
            var newUser = (function() {
                var username = $('#username').val();
                var password = $('#password').val();
                var confirmPass = $('#pass-confirm').val();
                var email = $('#email').val();

                if (password === confirmPass) {
                    return {
                        username: username,
                        password: password,
                        email: email
                    };
                }
            }());
            function successMessage() {
                console.log('successful registration')
            }


            this.operator.user.add(newUser, successMessage, errorFunctions.errorMessage);
        };

        Controller.prototype.displayPhotos = function(selector, displayingMethod) {
            var successFunctions = (function () {
                function displayTopImages(data) {
                    var sortedPhotos = _.sortBy(data.results, 'votes').reverse();
                    var topThreePhotos = _.first(sortedPhotos, 3);
                    displayPhotos(topThreePhotos);
                }
                function displayRandomImages(data) {
                    var allPhotos = data.results,
                        randomPhotosArr = [],
                        index;

                    for (index = 0; index < NUMBER_OF_RANDOM_PHOTOS; index++) {
                        var randomPhoto = allPhotos[_.random(allPhotos.length - 1)];
                        randomPhotosArr.push(randomPhoto);
                        var indexOfRandomPhoto = allPhotos.indexOf(randomPhoto);
                        allPhotos.splice(indexOfRandomPhoto, 1);
                    }
                    displayPhotos(randomPhotosArr);
                }
                function displayPhotosByRating(data) {
                    var sortedPhotos = _.sortBy(data.results, 'votes').reverse();
                    displayPhotos(sortedPhotos);
                }
                function displayPhotosByName(data) {
                    var sortedPhotos = _.sortBy(data.results, 'name');
                    displayPhotos(sortedPhotos);
                }
                function displayPhotosByDate(data) {
                    var sortedPhotos = _.sortBy(data.results, 'createdAt');
                    displayPhotos(sortedPhotos);
                }

                return {
                    'displayPhotosByRating': displayPhotosByRating,
                    'displayPhotosByName': displayPhotosByName,
                    'displayPhotosByDate': displayPhotosByDate,
                    'displayTopImages': displayTopImages,
                    'displayRandomImages': displayRandomImages
                };

                function displayPhotos(extractedData) {
                    for (var obj in extractedData) {
                        $(selector).append(Mustache.render(View.listPhoto, extractedData[obj]));
                    }
                }
            }());

            switch (displayingMethod) {
                case 'top three':
                    this.operator.photo.getAll(
                        successFunctions.displayTopImages, errorFunctions.errorMessage);
                    break;
                case 'random':
                    this.operator.photo.getAll(
                        successFunctions.displayRandomImages, errorFunctions.errorMessage);
                    break;
                case 'by rating':
                    this.operator.photo.getAll(
                        successFunctions.displayPhotosByRating, errorFunctions.errorMessage);
                    break;
                case 'by name':
                    this.operator.photo.getAll(
                        successFunctions.displayPhotosByName, errorFunctions.errorMessage);
                    break;
                case 'by date':
                    this.operator.photo.getAll(
                        successFunctions.displayPhotosByDate, errorFunctions.errorMessage);
                    break;
                default:
                    console.log('Switch controller error! /displaying photos/');
            }
        };

        var errorFunctions = (function(){
            function errorMessage(error) {
                console.log(error);
            }

            return {
                'errorMessage': errorMessage
            }
        }());

        return {
            get: function(dataOperator) {
                return new Controller(dataOperator);
            }
        }
    }());
});

