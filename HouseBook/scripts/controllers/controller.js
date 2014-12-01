define(function(){
    return (function() {
        function Controller(dataOperator) {
            this.operator = dataOperator;
        }

        Controller.prototype.load = function(selector, object) {
            switch (object) {
                case 'Category':
                    this.operator.category.getAll(loadCategories, errorMessage);
                    break;
                case 'Album':
                    this.operator.album.getAll(loadAlbums, errorMessage);
                    break;
                case 'Photo':
                    this.operator.photo.getAll(loadPhotos, errorMessage);
                    break;
                case 'Comment':
                    this.operator.comment.getAll(loadComments, errorMessage);
                    break;
                default:
                    console.log('Switch error!');
            }

            function loadCategories(data) {
                for (var obj in data.results) {
                    var category = data.results[obj];
                    var name = category.name;
                    $('<div />').text(name).appendTo(selector);
                }
            }
            function loadAlbums(data) {
                // TODO...
            }
            function loadPhotos(data) {
                for (var obj in data.results) {
                    var photo = data.results[obj];
                    var name = photo.name;
                    $('<div />').text(name).appendTo(selector);
                }
            }
            function loadComments(data) {
                // TODO...
            }

            function errorMessage(error) {
                console.log(error);
            }
        };

        Controller.prototype.remove = function() {

        };

        return {
            get: function(dataOperator) {
                return new Controller(dataOperator);
            }
        }
    }());
});

