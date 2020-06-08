erpConfig.moduleFiles.flowMaster = function(context) {
    return {
        updateCostAnalysis: function(mappingData, value, field, fieldMapkey) {
            var machineDetails = context.form.mapping.fields.machineNo.options[mappingData.machineNo];
            var costAnalysis = 0;

            costAnalysis = machineDetails && (machineDetails.machineShiftRate / machineDetails.shiftHrs);
            mappingData.costAnalysis = costAnalysis > 0 && mappingData.palnQtyPerHr > 0 && (costAnalysis / mappingData.palnQtyPerHr) || 0;
            context.methods.updateTotalCost();
        },
        updateTotalCost: function() {
            var totalCost = 0;
            for (var i in context.data.mapping) {
                var mappingData = context.data.mapping[i];
                var otherCost = mappingData.otherCost || 0;
                var costAnalysis = mappingData.costAnalysis || 0;

                totalCost += parseFloat(otherCost) + parseFloat(costAnalysis);
            }
            context.data.totalCost = totalCost;
        }
    }
};