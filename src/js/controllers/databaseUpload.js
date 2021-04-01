erpConfig.moduleFiles.databaseUpload = function (context) {
    return {
        uploadDatabase: function () {
            if (context.controller.data && context.controller.data.databaseUpload && context.controller.data.databaseUpload) {
                if (context.controller.data.databaseUpload.uploadType === 'tables') {
                    
                    context.controller.data.databaseUpload = angular.extend(context.controller.data.databaseUpload, {
                        'type': 'yearly-' + context.erpAppConfig.calendarYear,
                        'year': context.erpAppConfig.calendarYear,
                        'appCustomer': context.erpAppConfig.appCustomer
                    });
                }
                context.commonFact.updateData(context.controller, context.controller.data.databaseUpload).then(function () {
                    context.controller.message = 'Successfully uploded...';
                    context.controller.alertMessage = undefined;
                    context.commonFact.goToPage(context.erpAppConfig.modules.controllers.dashboard.page.link, true);
                });

            } else {
                context.controller.alertMessage = 'Failed uploded...';
                context.controller.message = undefined;
            }

        },
        onLoad: function () {
            context.controller.data = context.controller.masterData;
        }
    };
};
