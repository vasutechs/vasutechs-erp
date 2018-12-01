erpApp.controller('databaseUploadCtrl', ['erpAppConfig', '$scope', 'commonFact', 'serviceApi', function(erpAppConfig, $scope, commonFact, serviceApi) {
    var actions = {
        uploadDatabase: function(context) {
            var serviceconf = this.getServiceConfig(context.services.list);
            if(context.data.databaseUpload && context.data.databaseUpload.tables){
                serviceApi.callServiceApi(serviceconf, context.data.databaseUpload.tables).then(function(){
                    context.data.uploadSuccess = "Successfully uploded...";
                    context.data.databaseUpload = '';
                });
            }
            else{
                context.data.uploadSuccess = "Failed uploded...";
            }
            
        }
    };
    commonFact.initCtrl($scope, 'purchase.supplierMaster', actions);
}]);