define(['underscore', 'mustache', 'viewContainer'], function(_, Mustache, View) {
    return (function() {
        var NUMBER_OF_RANDOM_PHOTOS = 3;

        function Controller(dataOperator) {
            this.operator = dataOperator;
        }

        Controller.prototype.userLogin = function() {
            var loginData = {
                username: $('#username').val(),
                password: $('#password').val()
            };

            this.operator.login.loginUser(loginData)
                .then(
                function(data) {
                    localStorage['user'] = JSON.stringify(data);
                    $('#user').text(loginData.username);
                    $('#userTab').show();
                },
                function(error) {
                    $('#main').text('Invalid username or password.');
                    console.log(error);
                }
            ).then(
                function() {

                    $('#logInTab').hide();
                }
            )
        };

        Controller.prototype.registerUser = function() {
            var newUserData = {
                username: $('#usernameChoice').val(),
                password: $('#passwordChoice').val(),
                email: $('#emailChoice').val()
            };

            this.operator.register.registerUser(newUserData)
                .then(
                function () {
                    $('#main').html('Successful registration! Please log in now to create your albums!')
                },
                function(error) {
                    errorFunctions.errorMessage(error);
                }
            )
        };

        Controller.prototype.displayAlbums = function(selector) {
            var _this = this;

            function setAlbumCoverPhoto(resultUrl, resultId) {
                _this.operator.album.put(resultUrl, resultId);
            }
            function getAlbum(albumId) {
                _this.operator.photo.getByAlbum(albumId)
                    .then(
                    function (dataPhoto) {
                        var photo = dataPhoto.results[0];
                        var result = {
                            url: photo.file.url,
                            objectId: photo.album.objectId
                        };
                        setAlbumCoverPhoto(result.url, result.objectId);
                    },
                    function (error) {
                        errorFunctions.errorMessage(error);
                    }
                )
            }
            function printUserAlbums(userId) {
                _this.operator.album.getByUser(userId)
                    .then(
                    function (newData) {
                        var albums = newData.results;
                        for (var album = 0; album < albums.length; album++) {
                            var albumId = albums[album].objectId;
                            getAlbum(albumId);
                            $('#' + userId).append(Mustache.render(View.listAlbums.responseText, albums[album]));
                        }
                    },
                    function (error) {
                        errorFunctions.errorMessage(error);
                    }
                )
            }

            this.operator.user.getAll()
                .then(
                function(data) {
                    var userData = data.results;
                    for (var user = 0; user < userData.length; user++) {
                        var check = userData[user].hasAlbums;
                        if(check) {
                            $(selector).append(Mustache.render(View.albumOwner.responseText, userData[user]));
                        }
                    }
                },
                function(error) {
                    errorFunctions.errorMessage(error);
                })
                .then(
                function() {
                    var articles = $('article').get();
                    for (var i = 0; i < articles.length; i++) {
                        var userId = $(articles[i]).attr('id');
                        printUserAlbums(userId);
                    }
                },
                function(error) {
                    errorFunctions.errorMessage(error);
                }
            ).done();
        };

        Controller.prototype.displayAlbumPhotoViewer = function(selector) {
            var _this = this;

            this.operator.photo.getAll()
                .then(
                function(data) {
                    var photos = data.results;
                    for (var photo in photos) {
                        $(selector).append(Mustache.render(View.Photo.responseText, photos[photo]));
                    }
                }
            );
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
                        $(selector).append(Mustache.render(View.listPhoto.responseText, extractedData[obj]));
                    }
                }
            }());

            switch (displayingMethod) {
                case 'top three':
                    this.operator.photo.getAll()
                        .then(function(data) {
                            successFunctions.displayTopImages(data)
                        },
                        function(error) {
                            errorFunctions.errorMessage(error);
                        }
                );
                    break;
                case 'random':
                    this.operator.photo.getAll()
                        .then(
                        function(data) {
                            successFunctions.displayRandomImages(data);
                        },
                        function(error) {
                            errorFunctions.errorMessage(error);
                        }
                    );
                    break;
                case 'by rating':
                    this.operator.photo.getAll()
                        .then(
                        function(data) {
                            successFunctions.displayPhotosByRating(data);
                        },
                        function(error) {
                            errorFunctions.errorMessage(error);
                        }
                    );
                    break;
                case 'by name':
                    this.operator.photo.getAll()
                        .then(
                        function(data) {
                            successFunctions.displayPhotosByName(data);
                        },
                        function(error) {
                            errorFunctions.errorMessage(error);
                        }
                    );
                    break;
                case 'by date':
                    this.operator.photo.getAll()
                        .then(
                        function(data) {
                            successFunctions.displayPhotosByDate(data);
                        },
                        function(error) {
                            errorFunctions.errorMessage(error);
                        }
                    );
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

