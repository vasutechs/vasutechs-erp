erpConfig.moduleFiles.poSupplier = function(context) {
    var orgPartRm = {};
    return {
        callBackList: function(){
            context.commonFact.getData('marketing.partMaster').then(function (res) {
                var partData = res.data;
                for (var mapKey in partData) {
                    orgPartRm[partData[mapKey]['rmCode']] = partData[mapKey]['id'];
                }
            });
        },
        updateRMDetails: function(mapping) {
            context.commonFact.getData('purchase.rmMaster', mapping.id).then(function(res) {
                var rmData = res.data;
                for (var mapKey in rmData) {
                    if (mapping[mapKey] === null || mapping[mapKey] === '') {
                        mapping[mapKey] = rmData[mapKey];
                    }
                }
            });
        },
        callBackChangeMapping: function(data, key, field) {
            for (var key in data.mapping) {
                this.updateRMDetails(data.mapping[key]);
                if(!data.mapping[key]['needMaterialIssue'] || data.mapping[key]['needMaterialIssue'] === undefined){
                    data.mapping[key]['partNo'] = orgPartRm[data.mapping[key]['id']];
                }
            }
        }
    };
};