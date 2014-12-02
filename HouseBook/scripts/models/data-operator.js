define(['category', 'album', 'photo', 'comment'], function(Category, Album, Photo, Comment){
    return (function() {
        function Operator(ROOT_URL, object) {
            switch (object) {
                case 'Category':
                    this.category = new Category(ROOT_URL);
                    break;
                case 'Album':
                    this.album = new Album(ROOT_URL);
                    break;
                case 'Photo':
                    this.photo = new Photo(ROOT_URL);
                    break;
                case 'Comment':
                    this.comment = new Comment(ROOT_URL);
                    break;
                default:
                    console.log('Switch model error!');
            }
        }

        return {
            get: function(ROOT_URL, object) {
                return new Operator(ROOT_URL, object);
            }
        }
    }());
});
