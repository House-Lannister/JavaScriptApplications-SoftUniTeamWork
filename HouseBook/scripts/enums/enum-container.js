define(function(){
    return (function() {
        var dataObjects = {
            CATEGORY: 'Category',
            ALBUMS: 'Album',
            PHOTO: 'Photo',
            COMMENT: 'Comment',
            USER: 'User'
        };
        var displayPhotos = {
            'TOP_THREE': 'top three',
            'RANDOMLY': 'random',
            'BY_RATING': 'by rating',
            'BY_NAME': 'by name',
            'BY_DATE': 'by date'
        };

        return {
            dataObjects: dataObjects,
            displayPhotos: displayPhotos
        }
    }());
});