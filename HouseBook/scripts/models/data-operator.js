define(['modelContainer'],
    function(Model){

    return (function() {
        function Operator(object) {
            switch (object) {
                case 'Category':
                    this.category = new Model.Category();
                    break;
                case 'Album':
                    this.album = new Model.Album();
                    break;
                case 'Photo':
                    this.photo = new Model.Photo();
                    break;
                case 'Comment':
                    this.comment = new Model.Comment();
                    break;
                case 'User':
                    this.user = new Model.User();
                    break;
                default:
                    console.log('Switch model error!');
            }
        }

        return {
            get: function(object) {
                return new Operator(object);
            }
        }
    }());
});
