erpConfig.moduleFiles.subContractorMaster = function(context) {
    return {
        callBackList: function() {
            var partNos = [];
            context.commonFact.getData('production.flowMaster').then(function(res) {
                var flowMasterData = res.data;
                for (var i in flowMasterData) {
                    for (var j in flowMasterData[i].mapping) {
                        if (flowMasterData[i].mapping[j].source === 'Sub-Contractor') {
                            partNos.push(flowMasterData[i].partNo);
                        }
                    }
                }
                context.controller.form.mapping.fields['id'].filter = {
                    id: partNos
                };
            });
        }
    };
};