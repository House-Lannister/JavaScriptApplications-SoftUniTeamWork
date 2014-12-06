define(['modelContainer'],
    function(Model){

    return (function() {
        function Operator() {
            this.category = new Model.Category();
            this.album = new Model.Album();
            this.photo = new Model.Photo();
            this.comment = new Model.Comment();
            this.user = new Model.User();
            this.login = new Model.LogIn();
            this.register = new Model.Register();
        }

        return {
            get: function() {
                return new Operator();
            }
        }
    }());
});
