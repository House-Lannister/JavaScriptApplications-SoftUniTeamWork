(function () {
    require.config({
        paths: {
            'jquery': 'libs/jquery-2.0.3.min',
            'ajaxRequester': 'libs/ajax-requester',
            'modelOperator': 'models/data-operator',
            'category': 'models/category',
            'view': 'views/main',
            'controller': 'controllers/controller'
        }
    });

    require(['jquery', 'modelOperator', 'controller'],
        function ($, dataOperator, controller) {
            var ROOT_URL = 'http://api.parse.com/1/classes/';
            console.log(dataOperator);
            var data = dataOperator.get(ROOT_URL);
            var ctrl = controller.get(data);
            ctrl.load('body');
        $('<div />').text('Hello, World!').appendTo('body');
    });
}());