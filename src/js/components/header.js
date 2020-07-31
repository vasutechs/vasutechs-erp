erpConfig.moduleFiles.header = function(appFact) {
    var context = appFact.context || null;
    context.erpAppConfig.calendarYear = new Date().getMonth() >= context.erpAppConfig.yearChangeMonth ? new Date().getFullYear() : new Date().getFullYear() - 1;

    context.calendarYearList = [];
    for (var i = 10; i >= 0; i--) {
        var nextYear = parseInt(context.erpAppConfig.calendarYear - i + 1);

        context.calendarYearList.push({
            optionId: context.erpAppConfig.calendarYear - i,
            optionName: context.erpAppConfig.calendarYear - i + '-' + ('' + nextYear).substring(2)
        });
    }
    return {
        link: function(scope) {
            scope.context = context;
        }
    };
};