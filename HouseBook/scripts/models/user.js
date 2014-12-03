define(['ajaxRequester'], function(ajaxRequester){
    return (function(){
        function User(ROOT_URL) {
            this.serviceUrl = ROOT_URL + '_User/';
        }

        User.prototype.getAll = function(success, error) {
            return ajaxRequester.get(this.serviceUrl, success, error);
        };

        User.prototype.add = function(newData, success, error) {
            return ajaxRequester.post(this.serviceUrl, newData, success, error);
        };

        User.prototype.put = function(dataChange, success, error) {
            return ajaxRequester.put(this.serviceUrl, dataChange, success, error);
        };

        User.prototype.remove = function(categoryId, success, error) {
            return ajaxRequester.remove(this.serviceUrl + categoryId, success, error);
        };

        return User;
    }());
});