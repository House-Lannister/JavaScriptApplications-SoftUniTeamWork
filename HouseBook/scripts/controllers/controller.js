define(['underscore'], function(_){
    return (function() {
        var NUMBER_OF_RANDOM_PHOTOS = 3;

        function Controller(dataOperator) {
            this.operator = dataOperator;
        }

        Controller.prototype.registerUser = function() {
            var newUser = (function() {
                var username = $('#account').val();
                var password = $('#pass').val();
                var confirmPass = $('#pass-confirm').val();
                var email = $('#email').val();

                if (password === confirmPass) {
                    return {
                        'username': username,
                        'password': password,
                        'email': email
                    };
                }
            }());

            var success = (function() {
                return {
                    'massage' : console.log('successful registration')
                }
            }());

            this.operator.user.add(newUser, success.massage, errorFunctions.errorMessage);
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
                        var photo = extractedData[obj];
                        var photoName = photo.name;
                        var photoUrl = photo.file.url;
                        var photoId = photo.objectId;
                        var photoVotes = photo.votes;

                        var article = $('<article />');
                        var photoContainer = $('<div />')
                            .addClass('photoContainer');
                        var imgFile = $('<img src="' + photoUrl + '" />')
                            .addClass('photoImg');
                        var photoInfo = $('<p />')
                            .addClass('pictureInfo')
                            .text(photoName);
                        var photoVoteSpan = $('<span />')
                            .text('Vote:');
                        var votesNumber = $('<span />')
                            .addClass('votesNumber')
                            .text(photoVotes);

                        article.appendTo(selector);
                        photoContainer.appendTo(article);
                        imgFile.appendTo(photoContainer);
                        photoInfo.appendTo(photoContainer);
                        photoVoteSpan.appendTo(photoContainer);
                        votesNumber.appendTo(photoContainer)
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

        Controller.prototype.load = function(selector, object) {
            var successFunctions = (function(){
                function loadCategories(data) {
                    for (var obj in data.results) {
                        var category = data.results[obj];
                        var name = category.name;
                        $('<div />').text(name).appendTo(selector);
                    }
                }
                function loadAlbums(data) {
                    // TODO...
                }
                function loadPhotos(data) {
                    for (var obj in data.results) {
                        var photo = data.results[obj];
                        var name = photo.name;
                        $('<div />').text(name).appendTo(selector);
                    }
                }
                function loadComments(data) {
                    // TODO...
                }
                function loadUsers(data) {

                }

                return {
                    'loadCategories': loadCategories,
                    'loadAlbums': loadAlbums,
                    'loadPhotos': loadPhotos,
                    'loadComments': loadComments,
                    'loadUsers': loadUsers
                }
            }());
            switch (object) {
                case 'Category':
                    this.operator.category.getAll(
                        successFunctions.loadCategories, errorFunctions.errorMessage);
                    break;
                case 'Album':
                        this.operator.album.getAll(
                            successFunctions.loadAlbums, errorFunctions.errorMessage);
                    break;
                case 'Photo':
                    this.operator.photo.getAll(
                        successFunctions.loadPhotos, errorFunctions.errorMessage);
                    break;
                case 'Comment':
                    this.operator.comment.getAll(
                        successFunctions.loadComments, errorFunctions.errorMessage);
                    break;
                case 'User':
                    this.operator.user.getAll(
                        successFunctions.loadUsers, errorFunctions.errorMessage);
                    break;
                default:
                    console.log('Switch controller error!');
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

        Controller.prototype.remove = function() {

        };

        return {
            get: function(dataOperator) {
                return new Controller(dataOperator);
            }
        }
    }());
});

