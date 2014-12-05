define(['ajaxRequester'], function (ajaxRequester) {
    return (function() {
        var HEADERS = {
            'X-Parse-Application-Id': 'bSQ7Oyfo5ODbslHZ1ZKcs7akRHeQZRdqmiUM26Fc',
            'X-Parse-REST-API-Key': 'lKFUeIuEfilTlWGVPjI9wXKLhITgdhbMgIlKKN7k'
        };

        var ROOT_URL = 'https://api.parse.com/1/',
            EXTENDED_ROOT_URL = ROOT_URL + 'classes/';


        var Category = (function () {
            function Category() {
                this.serviceUrl = EXTENDED_ROOT_URL + 'Category/';
            }

            Category.prototype.getAll = function (success, error) {
                return ajaxRequester.get(HEADERS, this.serviceUrl, success, error);
            };

            Category.prototype.add = function (newData, success, error) {
                return ajaxRequester.push(HEADERS, this.serviceUrl, newData, success, error);
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
            }

            Album.prototype.getAll = function (success, error) {
                return ajaxRequester.get(HEADERS, this.serviceUrl, success, error);
            };

            Album.prototype.add = function (newData, success, error) {
                return ajaxRequester.push(HEADERS, this.serviceUrl, newData, success, error);
            };

            Album.prototype.put = function (dataChange, success, error) {
                return ajaxRequester.put(HEADERS, this.serviceUrl, dataChange, success, error);
            };

            Album.prototype.remove = function (categoryId, success, error) {
                return ajaxRequester.remove(HEADERS, this.serviceUrl + categoryId, success, error);
            };
            return Album;
        }());

        var Photo = (function(){
            function Photo() {
                this.serviceUrl = EXTENDED_ROOT_URL + 'Photo/';
            }

            Photo.prototype.getAll = function(success, error) {
                return ajaxRequester.get(HEADERS, this.serviceUrl, success, error);
            };

            Photo.prototype.add = function(newData, success, error) {
                return ajaxRequester.push(HEADERS, this.serviceUrl, newData, success, error);
            };

            Photo.prototype.put = function(dataChange, success, error) {
                return ajaxRequester.put(HEADERS, this.serviceUrl, dataChange, success, error);
            };

            Photo.prototype.remove = function(categoryId, success, error) {
                return ajaxRequester.remove(HEADERS, this.serviceUrl + categoryId, success, error);
            };

            return Photo;
        }());

        var Comment = (function () {
            function Comment() {
                this.serviceUrl = EXTENDED_ROOT_URL + 'Comment/';
            }

            Comment.prototype.getAll = function (success, error) {
                return ajaxRequester.get(HEADERS, this.serviceUrl, success, error);
            };

            Comment.prototype.add = function (newData, success, error) {
                return ajaxRequester.push(HEADERS, this.serviceUrl, newData, success, error);
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

        return {
            Category: Category,
            Album: Album,
            Photo: Photo,
            Comment: Comment,
            User: User
        }
    }());
});