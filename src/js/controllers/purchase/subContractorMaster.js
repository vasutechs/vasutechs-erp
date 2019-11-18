erpApp.controller('subContractorMasterCtrl', ['$scope', 'commonFact', 'serviceApi', function($scope, commonFact, serviceApi) {
    var actions = {
        callBackList: function(context) {
            var partNos = [];
            context.actions.getData(context.module).then(function(res) {
                var flowMasterData = res.data;
                for (var i in flowMasterData) {
                    for (var j in flowMasterData[i].mapping) {
                        if (flowMasterData[i].mapping[j].source === 'Sub-Contractor') {
                            partNos.push(flowMasterData[i].partNo);
                        }
                    }
                }
                context.form.mapping.fields['id'].filter = {
                    id: partNos
                };
            });
        }
    };

    commonFact.initCtrl($scope, 'purchase.subContractorMaster', actions);

}]);