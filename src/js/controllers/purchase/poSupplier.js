erpConfig.moduleFiles.poSupplier = function() {
    return {
        updateRMDetails: function(mapping) {
            context.methods.getData('purchase.rmMaster', mapping.id).then(function(res) {
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
            }
        }
    };
};