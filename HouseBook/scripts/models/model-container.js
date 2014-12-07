define(['ajaxRequester'], function (ajaxRequester) {
    return (function() {
        var HEADERS = {
            'X-Parse-Application-Id': 'bSQ7Oyfo5ODbslHZ1ZKcs7akRHeQZRdqmiUM26Fc',
            'X-Parse-REST-API-Key': 'lKFUeIuEfilTlWGVPjI9wXKLhITgdhbMgIlKKN7k'
        };

        var ROOT_URL = 'https://api.parse.com/1/',
            EXTENDED_ROOT_URL = ROOT_URL + 'classes/',
            URL_SUFFIX = '"}}';


        var Category = (function () {
            function Category() {
                this.serviceUrl = EXTENDED_ROOT_URL + 'Category/';
            }

            Category.prototype.getAll = function () {
                return ajaxRequester.get(HEADERS, this.serviceUrl);
            };

            Category.prototype.add = function (newData) {
                return ajaxRequester.post(HEADERS, this.serviceUrl, newData);
            };

            Category.prototype.put = function (dataChange) {
                return ajaxRequester.put(HEADERS, this.serviceUrl, dataChange);
            };

            Category.prototype.remove = function (categoryId) {
                return ajaxRequester.remove(HEADERS, this.serviceUrl + categoryId);
            };

            return Category;
        }());

        var Album = (function () {
            function Album() {
                this.serviceUrl = EXTENDED_ROOT_URL + 'Album/';
                this.urlByUser = this.serviceUrl +
                    '?where={"user":{"__type":"Pointer","className":"_User","objectId":"';
            }

            Album.prototype.getAll = function() {
                return ajaxRequester.get(HEADERS, this.serviceUrl);
            };

            Album.prototype.add = function(newData) {
                return ajaxRequester.post(HEADERS, this.serviceUrl, newData);
            };

            Album.prototype.put = function(albumId, dataChange) {
                return ajaxRequester.put(HEADERS, this.serviceUrl, dataChange);
            };

            Album.prototype.remove = function(categoryId) {
                return ajaxRequester.remove(HEADERS, this.serviceUrl + categoryId);
            };

            Album.prototype.getByUser = function(userId) {
                return ajaxRequester.get(HEADERS, this.urlByUser + userId + URL_SUFFIX)
            };
            return Album;
        }());

        var Photo = (function(){
            function Photo() {
                this.serviceUrl = EXTENDED_ROOT_URL + 'Photo/';
                this.urlByAlbum = this.serviceUrl +
                '?where={"album":{"__type":"Pointer","className":"Album","objectId":"';
            }

            Photo.prototype.getAll = function() {
                return ajaxRequester.get(HEADERS, this.serviceUrl);
            };

            Photo.prototype.add = function(newData) {
                return ajaxRequester.post(HEADERS, this.serviceUrl, newData);
            };

            Photo.prototype.put = function(dataChange) {
                return ajaxRequester.put(HEADERS, this.serviceUrl, dataChange);
            };

            Photo.prototype.remove = function(categoryId) {
                return ajaxRequester.remove(HEADERS, this.serviceUrl + categoryId);
            };

            Photo.prototype.getByAlbum = function(albumId) {
                return ajaxRequester.get(HEADERS, this.urlByAlbum + albumId + URL_SUFFIX);
            };

            return Photo;
        }());

        var Comment = (function() {
            function Comment() {
                this.serviceUrl = EXTENDED_ROOT_URL + 'Comment/';
            }

            Comment.prototype.getAll = function () {
                return ajaxRequester.get(HEADERS, this.serviceUrl);
            };

            Comment.prototype.add = function (newData) {
                return ajaxRequester.post(HEADERS, this.serviceUrl, newData);
            };

            Comment.prototype.put = function (dataChange) {
                return ajaxRequester.put(HEADERS, this.serviceUrl, dataChange);
            };

            Comment.prototype.remove = function (categoryId) {
                return ajaxRequester.remove(HEADERS, this.serviceUrl + categoryId);
            };

            return Comment;
        }());

        var User = (function(){
            function User() {
                this.serviceUrl = EXTENDED_ROOT_URL + '_User/';
            }

            User.prototype.getAll = function() {
                return ajaxRequester.get(HEADERS, this.serviceUrl);
            };

            User.prototype.add = function(newData) {
                return ajaxRequester.post(HEADERS, this.serviceUrl, newData);
            };

            User.prototype.put = function(dataChange) {
                return ajaxRequester.put(HEADERS, this.serviceUrl, dataChange);
            };

            User.prototype.remove = function(categoryId) {
                return ajaxRequester.remove(HEADERS, this.serviceUrl + categoryId);
            };

            return User;
        }());

        var Register = (function() {
            function Register() {
                this.serviceUrl = ROOT_URL + 'users';
            }

            Register.prototype.registerUser = function(newUserData) {
                return ajaxRequester.post(HEADERS, this.serviceUrl, newUserData);
            };

            return Register;
        }());

        var LogIn = (function() {
            function LogIn() {
                this.serviceUrl = ROOT_URL + 'login/';
            }

            LogIn.prototype.loginUser = function(loginData) {
                return ajaxRequester.login(HEADERS, this.serviceUrl, loginData);
            };

            return LogIn
        }());

        return {
            Category: Category,
            Album: Album,
            Photo: Photo,
            Comment: Comment,
            User: User,
            LogIn: LogIn,
            Register: Register
        }
    }());
});