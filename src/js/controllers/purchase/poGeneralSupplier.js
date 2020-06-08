erpConfig.moduleFiles.poGeneralSupplier = function(context) {
    return {
        updatePartDetails: function(mapping) {
            context.commonFact.getData('marketing.partMaster', mapping.id).then(function(res) {
                var partData = res.data;
                for (var mapKey in rmData) {
                    if (mapping[mapKey] === null || mapping[mapKey] === '') {
                        mapping[mapKey] = partData[mapKey];
                    }
                }
            });
        },
        callBackChangeMapping: function(data, key, field) {
            for (var key in data.mapping) {
                this.updatePartDetails(data.mapping[key]);
            }
        }
    };
};