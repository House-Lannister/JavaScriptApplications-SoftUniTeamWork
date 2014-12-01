define(function(){
    return (function() {
        function Controller(dataOperator) {
            this.operator = dataOperator;
        }

        Controller.prototype.load = function(selector) {
            this.operator.category.getAll(
                function(data) {
                    console.log(data);
                },
                function(error) {
                    console.log(error);
                }
            );
        };

        return {
            get: function(dataOperator) {
                return new Controller(dataOperator);
            }
        }
    }());
});

