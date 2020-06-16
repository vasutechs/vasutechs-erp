erpConfig.moduleFiles.databaseUpload = function(context) {
    return {
        uploadDatabase: function() {
            if (context.controller.data && context.controller.data.databaseUpload && context.controller.data.databaseUpload) {
                context.commonFact.updateData(context.controller, context.controller.data.databaseUpload).then(function() {
                    context.controller.message = 'Successfully uploded...';
                    context.controller.alertMessage = undefined;
                    context.commonFact.goToPage(context.erpAppConfig.modules.controllers.dashboard.page.link, true);
                });
            } else {
                context.controller.alertMessage = 'Failed uploded...';
                context.controller.message = undefined;
            }

        },
        onLoad: function() {
            context.controller.data = context.controller.masterData;
        }
    };
};