erpConfig.moduleFiles.fileModel = function() {
    return {
        link: function(scope, element, attrs) {

            element.bind('change', function(changeEvent) {
                var reader = new FileReader();
                reader.onload = function(loadEvent) {
                    scope.$apply(function() {
                        try {
                            scope.context.controller.data.databaseUpload = JSON.parse(loadEvent.target.result);
                        } catch (err) {
                            scope.context.controller.data.databaseUpload = {};
                        }

                    });
                }
                reader.readAsText(changeEvent.target.files[0]);

            });
        }
    };
};