define(['ajaxRequester'], function(ajaxRequester){
    return (function(){
        function Category(ROOT_URL) {
            this.serviceUrl = ROOT_URL + 'Category/';
        }

        Category.prototype.getAll = function(success, error) {
            return ajaxRequester.get(this.serviceUrl, success, error);
        };

        Category.prototype.add = function(newCategory, success, error) {
            return ajaxRequester.push(this.serviceUrl, newCategory, success, error);
        };

        Category.prototype.remove = function(categoryId, success, error) {
            return ajaxRequester.remove(this.serviceUrl + categoryId, success, error);
        };

        return Category;
    }());
});