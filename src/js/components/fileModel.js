erpConfig.moduleFiles.fileModel = function() {
    return function(scope, element, attrs) {
        var model = JSON.parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(changeEvent) {
            var reader = new FileReader();
            reader.onload = function(loadEvent) {
                scope.$apply(function() {
                    try {
                        modelSetter(scope, JSON.parse(loadEvent.target.result));
                    } catch (err) {
                        modelSetter(scope, {});
                    }

                });
            }
            reader.readAsText(changeEvent.target.files[0]);

        });
    };
};