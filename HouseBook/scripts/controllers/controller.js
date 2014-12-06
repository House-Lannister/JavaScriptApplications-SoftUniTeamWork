define(['underscore', 'mustache', 'viewContainer'], function(_, Mustache, View) {
    return (function() {
        var NUMBER_OF_RANDOM_PHOTOS = 3;

        function Controller(dataOperator) {
            this.operator = dataOperator;
        }

        Controller.prototype.userLogin = function() {
            var loginData = {
                username: $('#logInName').val(),
                password: $('#logInPass').val()
            };

            this.operator.login.loginUser(loginData)
                .then(
                function(data) {
                    localStorage['user'] = JSON.stringify(data);
                }
            );
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
                    console.log('Registration successful!')
                },
                function(error) {
                    errorFunctions.errorMessage(error);
                }
            )
        };

        Controller.prototype.displayAlbums = function(selector) {
            var _this = this;
            this.operator.user.getAll()
                .then(
                function(data) {
                    var userData = data.results;
                    for (var user in userData) {
                        $(selector).append(Mustache.render(View.albumOwner.responseText, userData[user]));
                        _this.operator.album.getByUser(userData[user].objectId)
                            .then(
                            function(data) {
                                var albums = data.results;

                                for (var album in albums) {
                                    var albumId = albums[album].objectId;

                                    _this.operator.photo.getByAlbum(albumId)
                                        .then(
                                        function(dataPhoto) {
                                            var photo = dataPhoto.results[0];
                                                return {
                                                    url: photo.file.url,
                                                    objectId: photo.album.objectId
                                            }
                                        },
                                        function(error) {
                                            errorFunctions.errorMessage(error);
                                        }
                                    ).then(
                                        function(result) {
                                            var url = result.url;
                                            var newData = {
                                                photoUrl: url
                                            };
                                            _this.operator.album.put(result.objectId, newData);
                                        },
                                        function(error) {
                                            errorFunctions.errorMessage(error);
                                        }
                                    );
                                    $(selector).append(Mustache.render(View.listAlbums.responseText, albums[album]));
                                }
                            },
                            function(error) {
                                errorFunctions.errorMessage(error);
                            }
                        )
                    }

                },
                function(error) {
                    errorFunctions.errorMessage(error);
                })

        };

        Controller.prototype.displayAlbumPhotoViewer = function(selector) {
            var _this = this;
            var id = '';
            this.operator.photo.getByAlbum(id)
                .then(
                function(data) {
                    var photos = data.results;
                    for (var photo in photos) {
                        $(selector).append(Mustache.render(View.photoViewer, photos[photo]))
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

