(function () {
    require.config({
        paths: {
            'jquery': 'libs/jquery-2.0.3.min',
            'ajaxRequester': 'libs/ajax-requester',
            'modelOperator': 'models/data-operator',
            'category': 'models/category',
            'album': 'models/album',
            'photo': 'models/photo',
            'comment': 'models/comment',
            'view': 'views/main',
            'controller': 'controllers/controller'
        }
    });

    require(['jquery', 'modelOperator', 'controller'],
        function ($, dataOperator, controller) {

            var ROOT_URL = 'https://api.parse.com/1/classes/';
            var Objects = {
                CATEGORY: 'Category',
                ALBUMS: 'Album',
                PHOTO: 'Photo',
                COMMENT: 'Comment'
            };

            var categoriesData = dataOperator.get(ROOT_URL, Objects.CATEGORY);
            var categoriesCtrl = controller.get(categoriesData);
            categoriesCtrl.load('body', Objects.CATEGORY);

            var photoData = dataOperator.get(ROOT_URL, Objects.PHOTO);
            var photoCtrl = controller.get(photoData);
            photoCtrl.load('body', Objects.PHOTO);

            $('<div />').text('Hello, World!').appendTo('body');
    });
}());