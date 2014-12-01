define(['ajaxRequester'], function (ajaxRequester) {
    return (function () {
        function Album(ROOT_URL) {
            this.serviceUrl = ROOT_URL + 'Album/';
        }

        Album.prototype.getAll = function (success, error) {
            return ajaxRequester.get(this.serviceUrl, success, error);
        };

        Album.prototype.add = function (newData, success, error) {
            return ajaxRequester.push(this.serviceUrl, newData, success, error);
        };

        Album.prototype.put = function (dataChange, success, error) {
            return ajaxRequester.put(this.serviceUrl, dataChange, success, error);
        };

        Album.prototype.remove = function (categoryId, success, error) {
            return ajaxRequester.remove(this.serviceUrl + categoryId, success, error);
        };

        return Album;
    }());
});
