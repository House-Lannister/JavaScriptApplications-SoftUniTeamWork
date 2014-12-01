define(['ajaxRequester'], function(ajaxRequester){
    return (function(){
        function Photo(ROOT_URL) {
            this.serviceUrl = ROOT_URL + 'Photo/';
        }

        Photo.prototype.getAll = function(success, error) {
            return ajaxRequester.get(this.serviceUrl, success, error);
        };

        Photo.prototype.add = function(newData, success, error) {
            return ajaxRequester.push(this.serviceUrl, newData, success, error);
        };

        Photo.prototype.put = function(dataChange, success, error) {
            return ajaxRequester.put(this.serviceUrl, dataChange, success, error);
        };

        Photo.prototype.remove = function(categoryId, success, error) {
            return ajaxRequester.remove(this.serviceUrl + categoryId, success, error);
        };

        return Photo;
    }());
});