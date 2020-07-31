erpConfig.moduleFiles.purchaseDetailsTax = function(context) {
    return {
        callBackList: function() {
            var listViewData = context.controller.listViewData;
            context.controller.listViewData = [];

            context.commonFact.getData({ id: 'supplierMaster' }).then(function(res) {
                var supplier = res.data;
                var details;
                for (var x in listViewData) {
                    details = {
                        supplierCode: supplier[listViewData[x].supplierCode].supplierName,
                        supplierInvoiceNo: listViewData[x].supplierInvoiceNo,
                        date: listViewData[x].supplierInvoiceDate,
                        subTotal: listViewData[x].subTotal,
                        gstTotal: listViewData[x].gstTotal,
                        total: listViewData[x].total,
                        gstin: supplier[listViewData[x].supplierCode].gstin
                    };

                    context.controller.listViewData.push(details);
                }

            });
            context.controller.methods.updateGeneralSupplierReport();
            context.controller.methods.updateSubContractorReport();
        },
        updateGeneralSupplierReport: function() {
            var grnGeneralSupplier = {
                id: 'grnGeneralSupplier',
                params: {
                    year: true
                }
            };
            context.commonFact.getData(grnGeneralSupplier).then(function(res) {
                var listViewData = res.data;
                context.commonFact.getData({ id: 'generalSupplierMaster' }).then(function(res1) {
                    var generalSupplier = res1.data;
                    var details;
                    for (var x in listViewData) {
                        details = {
                            supplierCode: generalSupplier[listViewData[x].generalSupplierCode].generalSupplierName,
                            supplierInvoiceNo: listViewData[x].generalSupplierInvoiceNo,
                            date: listViewData[x].generalSupplierInvoiceDate,
                            subTotal: listViewData[x].subTotal,
                            gstTotal: listViewData[x].gstTotal,
                            total: listViewData[x].total,
                            gstin: generalSupplier[listViewData[x].generalSupplierCode].gstin
                        };

                        context.controller.listViewData.push(details);
                    }
                });
            });

        },
        updateSubContractorReport: function() {
            var grnSubContractor = {
                id: 'grnSubContractor',
                params: {
                    year: true
                }
            };
            context.commonFact.getData(grnSubContractor).then(function(res) {
                var listViewData = res.data;
                context.commonFact.getData({ id: 'subContractorMaster' }).then(function(res1) {
                    var subContractorMaster = res1.data;
                    var details;
                    for (var x in listViewData) {
                        details = {
                            supplierCode: subContractorMaster[listViewData[x].subContractorCode].subContractorName,
                            supplierInvoiceNo: listViewData[x].subContractorDCCode,
                            date: listViewData[x].subContractorDCDate,
                            subTotal: listViewData[x].subTotal,
                            gstTotal: listViewData[x].gstTotal,
                            total: listViewData[x].total,
                            gstin: subContractorMaster[listViewData[x].subContractorCode].gstin
                        };

                        context.controller.listViewData.push(details);
                    }

                });
            });
        }
    };
};