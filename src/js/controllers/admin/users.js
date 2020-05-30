erpApp.controller('usersCtrl', ['$scope', 'commonFact', function($scope, commonFact) {
    var actions = {
        callBackList: function(context) {
            var adminOption = {
                userType: 'ADMIN',
                desc: 'ADMIN',
                optionName: 'ADMIN',
                optionId: 'ADMIN'
            };
            context.form.fields['userType'].options['ADMIN'] = adminOption;
        }
    };
    commonFact.initCtrl($scope, 'admin.users', actions);
}]);