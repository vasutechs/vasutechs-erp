erpConfig.moduleFiles.databaseUpload = function(context) {
    return {
        uploadDatabase: function() {
            if (context.data && context.data.databaseUpload && context.data.databaseUpload) {
                context.methods.updateData(context, context.data.databaseUpload).then(function() {
                    context.message = 'Successfully uploded...';
                    context.alertMessage = undefined;
                    context.methods.goToPage(context.erpAppConfig.modules.controllers.dashboard.page.link, true);
                });
            } else {
                context.alertMessage = 'Failed uploded...';
                context.message = undefined;
            }

        }
    };
};