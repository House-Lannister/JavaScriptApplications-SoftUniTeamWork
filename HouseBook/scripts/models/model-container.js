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

            Category.prototype.getAll = function (success, error) {
                return ajaxRequester.get(HEADERS, this.serviceUrl, success, error);
            };

            Category.prototype.add = function (newData, success, error) {
                return ajaxRequester.post(HEADERS, this.serviceUrl, newData, success, error);
            };

            Category.prototype.put = function (dataChange, success, error) {
                return ajaxRequester.put(HEADERS, this.serviceUrl, dataChange, success, error);
            };

            Category.prototype.remove = function (categoryId, success, error) {
                return ajaxRequester.remove(HEADERS, this.serviceUrl + categoryId, success, error);
            };

            return Category;
        }());

        var Album = (function () {
            function Album() {
                this.serviceUrl = EXTENDED_ROOT_URL + 'Album/';
                this.urlByUser = this.serviceUrl +
                    '?where={"user":{"__type":"Pointer","className":"_User","objectId":"';
            }

            Album.prototype.getAll = function(success, error) {
                return ajaxRequester.get(HEADERS, this.serviceUrl, success, error);
            };

            Album.prototype.add = function(newData, success, error) {
                return ajaxRequester.post(HEADERS, this.serviceUrl, newData, success, error);
            };

            Album.prototype.put = function(albumId, dataChange, success, error) {
                return ajaxRequester.put(HEADERS, this.serviceUrl, dataChange, success, error);
            };

            Album.prototype.remove = function(categoryId, success, error) {
                return ajaxRequester.remove(HEADERS, this.serviceUrl + categoryId, success, error);
            };

            Album.prototype.getByUser = function(userId, success, error) {
                return ajaxRequester.get(HEADERS, this.urlByUser + userId + URL_SUFFIX, success, error)
            };
            return Album;
        }());

        var Photo = (function(){
            function Photo() {
                this.serviceUrl = EXTENDED_ROOT_URL + 'Photo/';
                this.urlByAlbum = this.serviceUrl +
                '?where={"album":{"__type":"Pointer","className":"Album","objectId":"';
            }

            Photo.prototype.getAll = function(success, error) {
                return ajaxRequester.get(HEADERS, this.serviceUrl, success, error);
            };

            Photo.prototype.add = function(newData, success, error) {
                return ajaxRequester.post(HEADERS, this.serviceUrl, newData, success, error);
            };

            Photo.prototype.put = function(dataChange, success, error) {
                return ajaxRequester.put(HEADERS, this.serviceUrl, dataChange, success, error);
            };

            Photo.prototype.remove = function(categoryId, success, error) {
                return ajaxRequester.remove(HEADERS, this.serviceUrl + categoryId, success, error);
            };

            Photo.prototype.getByAlbum = function(albumId, success, error) {
                return ajaxRequester.get(HEADERS, this.urlByAlbum + albumId + URL_SUFFIX, success, error);
            };

            return Photo;
        }());

        var Comment = (function() {
            function Comment() {
                this.serviceUrl = EXTENDED_ROOT_URL + 'Comment/';
            }

            Comment.prototype.getAll = function (success, error) {
                return ajaxRequester.get(HEADERS, this.serviceUrl, success, error);
            };

            Comment.prototype.add = function (newData, success, error) {
                return ajaxRequester.post(HEADERS, this.serviceUrl, newData, success, error);
            };

            Comment.prototype.put = function (dataChange, success, error) {
                return ajaxRequester.put(HEADERS, this.serviceUrl, dataChange, success, error);
            };

            Comment.prototype.remove = function (categoryId, success, error) {
                return ajaxRequester.remove(HEADERS, this.serviceUrl + categoryId, success, error);
            };

            return Comment;
        }());

        var User = (function(){
            function User() {
                this.serviceUrl = EXTENDED_ROOT_URL + '_User/';
            }

            User.prototype.getAll = function(success, error) {
                return ajaxRequester.get(HEADERS, this.serviceUrl, success, error);
            };

            User.prototype.add = function(newData, success, error) {
                return ajaxRequester.post(HEADERS, this.serviceUrl, newData, success, error);
            };

            User.prototype.put = function(dataChange, success, error) {
                return ajaxRequester.put(HEADERS, this.serviceUrl, dataChange, success, error);
            };

            User.prototype.remove = function(categoryId, success, error) {
                return ajaxRequester.remove(HEADERS, this.serviceUrl + categoryId, success, error);
            };

            return User;
        }());

        var Register = (function() {
            function Register() {
                this.serviceUrl = ROOT_URL + 'users/';
            }

            Register.prototype.registerUser = function(newUserData, succes, error) {
                ajaxRequester.post(HEADERS, this.serviceUrl, newUserData, succes, error);
            };

            return Register;
        }());

        var LogIn = (function() {
            function LogIn() {
                this.serviceUrl = ROOT_URL + 'login/';
            }

            LogIn.prototype.loginUser = function(loginData, success, error) {
                return ajaxRequester.login(HEADERS, this.serviceUrl, loginData, success, error);
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