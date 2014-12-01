define(['ajaxRequester'], function (ajaxRequester) {
    return (function () {
        function Comment(ROOT_URL) {
            this.serviceUrl = ROOT_URL + 'Comment/';
        }

        Comment.prototype.getAll = function (success, error) {
            return ajaxRequester.get(this.serviceUrl, success, error);
        };

        Comment.prototype.add = function (newData, success, error) {
            return ajaxRequester.push(this.serviceUrl, newData, success, error);
        };

        Comment.prototype.put = function (dataChange, success, error) {
            return ajaxRequester.put(this.serviceUrl, dataChange, success, error);
        };

        Comment.prototype.remove = function (categoryId, success, error) {
            return ajaxRequester.remove(this.serviceUrl + categoryId, success, error);
        };

        return Comment;
    }());
});
