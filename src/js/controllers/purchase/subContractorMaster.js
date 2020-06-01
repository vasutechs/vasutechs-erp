erpConfig.moduleFiles.subContractorMaster = function() {
    return {
        callBackList: function(context) {
            var partNos = [];
            context.methods.getData(context).then(function(res) {
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
};