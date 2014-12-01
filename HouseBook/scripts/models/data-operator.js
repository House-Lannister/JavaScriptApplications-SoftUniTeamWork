define(['category'], function(Category){
    return (function() {
        function Operator(ROOT_URL) {
            this.rootUrl = ROOT_URL;
            this.category = new Category(ROOT_URL); // depends form server data
        }

        return {
            get: function(ROOT_URL) {
                return new Operator(ROOT_URL);
            }
        }
    }());
});
