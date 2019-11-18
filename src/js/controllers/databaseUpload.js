erpApp.controller('databaseUploadCtrl', ['$scope', 'commonFact', 'serviceApi', function($scope, commonFact, serviceApi) {
    var actions = {
        uploadDatabase: function(context) {
            if (context.data && context.data.databaseUpload && context.data.databaseUpload.tables) {
                context.actions.updateData(context.module, context.data.databaseUpload.tables).then(function() {
                    context.message = 'Successfully uploded...';
                    context.alertMessage = undefined;
                    context.actions.goToPage(context.appConfig.modules.dashboard.page.link, true);
                });
            } else {
                context.alertMessage = 'Failed uploded...';
                context.message = undefined;
            }

        }
    };
    commonFact.initCtrl($scope, 'databaseUpload', actions);
}]);