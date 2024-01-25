erpConfig.moduleFiles.partMaster = function(context) {
    return {
        callBackList: function() {
            if(context.erpAppConfig.isSale){
                context.controller.listView.length===2 && context.controller.listView.splice(-1,1);
            }
        }
    };
};