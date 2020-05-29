erpApp.controller('usersCtrl', ['$scope', 'commonFact', function($scope, commonFact) {
    var actions = {
        callBackList: function(context) {
            var adminOption = {
                userType: 'SUPERADMIN',
                desc: 'SUPERADMIN',
                optionName: 'SUPERADMIN',
                optionId: 'SUPERADMIN'
            };
            context.form.fields['userType'].options['ADMIN'] = adminOption;
        }
    };
    commonFact.initCtrl($scope, 'admin.users', actions);
}]);