erpApp.controller('databaseUploadCtrl', ['erpAppConfig', '$scope', 'commonFact', 'serviceApi', function(erpAppConfig, $scope, commonFact, serviceApi) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
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
    });
    $scope.context = erpAppConfig.modules.databaseUpload;
    $scope.context.data = angular.copy($scope.context.masterData);
    $scope.context.actions = actions;
}]);