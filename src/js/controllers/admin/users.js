erpConfig.moduleFiles.users = function(context) {
    return {
        callBackAdd: function() {
            var adminOption = {
                userType: 'ADMIN',
                desc: 'ADMIN',
                optionName: 'ADMIN',
                optionId: 'ADMIN'
            };
            context.controller.form.fields['userType'].options['ADMIN'] = adminOption;
        },
        callBackEdit: function() {
            context.controller.methods.callBackAdd();
        }
    };
};