erpApp.directive('fileModel', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(changeEvent) {
                var reader = new FileReader();
                reader.onload = function(loadEvent) {
                    scope.$apply(function() {
                        try{
                           modelSetter(scope, JSON.parse(loadEvent.target.result));
                        }
                        catch{
                           modelSetter(scope, {});
                        }
                        
                    });
                }
                reader.readAsText(changeEvent.target.files[0]);

            });
        }
    };
}]);