erpConfig.moduleFiles.users = function() {
    return {
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
};