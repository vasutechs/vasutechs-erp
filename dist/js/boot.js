'use strict'

var erpApp = angular.module('erpApp', ['ngRoute'])
    .directive('myApp', function() {
        return {
            restrict: 'E',
            templateUrl: 'template/app.html'
        };
    })
    .constant('staticConfig', {"appName":"VASUTECHS","appBaseUrl":"/dashboard","dataDownloadUrl":"/api/download","calendarYear":"","finalStageOpp":9,"httpServiceCache":false,"modules":{"databaseUpload":{"id":"databaseUpload","name":"Database Upload","title":"Database Upload","disableMenu":true,"masterData":{"databaseUpload":null},"page":{"link":"databaseUpload","name":"databaseUpload","templateUrl":"template/controllers/databaseUpload.html","controller":"databaseUploadCtrl"},"services":{"list":{"url":"api/upload","method":"POST"}}},"databaseDownload":{"id":"databaseDownload","name":"Database Download","title":"Database Download","disableMenu":true,"page":{"link":"/api/download","name":"databaseUpload"}},"calendarYear":{"id":"calendarYear","name":"Calendar Year","title":"Calendar Year","disableMenu":true,"page":{"link":"calendarYear","name":"calendarYear"}},"dashboard":{"id":"dashboard","name":"Dashboard","title":"Dashboard","icon":"dashboard","disableMenu":true,"page":{"link":"dashboard","name":"dashboard","templateUrl":"template/controllers/dashboard.html","controller":"dashboardCtrl"}},"marketing":{"id":"marketing","name":"Marketing","title":"Marketing","icon":"stack-exchange","partMaster":{"id":"partMaster","title":"Part Master","masterData":{"partNo":null,"partName":null,"rmCode":null,"inputWeight":null,"finishedWeight":null,"hsnCode":null,"uomCode":null,"prodRateHr":null,"rate":null,"gst":null,"sgst":null,"cgst":null,"rolQtyYellowRage":null,"rolQtyRedRage":null},"form":{"name":"partMaster","id":"partMaster","fields":{"partNo":{"name":"Part No","id":"partNo","type":"input","inputType":"text","action":"isCheckExistField","required":true},"partName":{"name":"Part Name","id":"partName","type":"input","inputType":"text","action":"isCheckExistField","required":true},"rmCode":{"name":"Raw material","id":"rmCode","type":"select","options":{},"dataFrom":"purchase.rmMaster","replaceName":"rmName","valuePrefixData":"grade","isSingle":true},"inputWeight":{"name":"Input weight","id":"inputWeight","type":"input","inputType":"number","required":true},"finishedWeight":{"name":"Finished weight","id":"finishedWeight","type":"input","inputType":"number","required":true},"hsnCode":{"name":"HSN Code","id":"hsnCode","type":"input","inputType":"text","required":true},"uomCode":{"name":"UOM","id":"uomCode","type":"select","options":{},"dataFrom":"marketing.uomMaster","replaceName":"uomName","isSingle":true},"prodRateHr":{"name":"Prod Rate/ hr","id":"prodRateHr","type":"input","inputType":"number","required":true},"rate":{"name":"Rate","id":"rate","type":"input","inputType":"number","required":true},"gst":{"name":"GST","id":"gst","type":"input","inputType":"number","required":true},"sgst":{"name":"SGST","id":"sgst","type":"input","inputType":"number","required":true},"cgst":{"name":"CGST","id":"cgst","type":"input","inputType":"number","required":true},"rolQtyYellowRage":{"name":"ROL Qty Yellow Rage","id":"rolQtyYellowRage","type":"input","inputType":"number","required":true},"rolQtyRedRage":{"name":"ROL Qty Red Rage","id":"rolQtyRedRage","type":"input","inputType":"number","required":true}}},"listView":[{"title":"PartNo","id":"partNo","dataFrom":"marketing.partMaster","replaceName":"partNo","type":"select","isFilterBy":true},{"title":"Part Name","id":"partName"}],"page":{"link":"marketing/partMaster/list","name":"list","templateUrl":"template/defaultView.html","controller":"partMasterCtrl"},"services":{"list":{"url":"api/partMaster/data","method":"GET"}}},"customerMaster":{"id":"customerMaster","title":"Customer Master","masterData":{"customerCode":null,"customerName":null,"address":null,"contactNo":null,"gstin":null,"mapping":[{"id":null,"partName":null,"hsnCode":null,"rate":null,"gst":null}]},"form":{"name":"customerMaster","id":"customerMaster","autoGenKey":"customerCode","fields":{"customerCode":{"name":"Customer Code","id":"customerCode","type":"span","valuePrefix":"VT-CUS-"},"customerName":{"name":"Customer Name","id":"customerName","type":"input","inputType":"text","required":true},"address":{"name":"Address","id":"address","type":"input","inputType":"text","required":true},"contactNo":{"name":"Contact No","id":"contactNo","type":"input","inputType":"number","required":true},"gstin":{"name":"GSTIN","id":"gstin","type":"input","inputType":"text","required":true}},"mapping":{"name":"Part Mapping","fields":{"id":{"name":"Part No","id":"id","type":"select","options":{},"action":"changeMapping","dataFrom":"marketing.partMaster","replaceName":"partNo"},"partName":{"name":"Part Name","id":"partName","type":"span"},"rate":{"name":"Rate","id":"rate","type":"input","inputType":"text","required":true},"gst":{"name":"GST %","id":"gst","type":"span"}}}},"listView":[{"title":"Customer Code","id":"customerCode","valuePrefix":"VT-CUS-"},{"title":"Customer Name","id":"customerName"}],"page":{"link":"marketing/customerMaster/list","name":"list","templateUrl":"template/defaultView.html","controller":"customerMasterCtrl"},"services":{"list":{"url":"api/customerMaster/data","method":"GET"}}},"empMaster":{"id":"empMaster","title":"Employee Master","masterData":{"id":null,"employeeCode":null,"employeeName":null,"address":null,"contactNo":null,"mailId":null,"qualification":null,"designation":null,"basicSalary":null,"hra":null,"ca":null,"ot":null,"totalSalary":null,"mapping":[{"id":null,"partName":null,"operationTo":null,"laborCost":null}]},"form":{"name":"empMaster","id":"empMaster","autoGenKey":"employeeCode","fields":{"employeeCode":{"name":"Employee Code","id":"employeeCode","valuePrefix":"VT-EMP-","type":"span"},"employeeName":{"name":"Employee Name","id":"employeeName","type":"input","inputType":"text","action":"isCheckExistField","required":true},"address":{"name":"Address","id":"address","type":"input","inputType":"text","required":true},"contactNo":{"name":"Contact No","id":"contactNo","type":"input","inputType":"number","required":true},"mailId":{"name":"Mail Id","id":"mailId","type":"input","inputType":"email","required":true},"qualification":{"name":"Qualification","id":"qualification","type":"input","inputType":"text","required":true},"designation":{"name":"Designation","id":"designation","type":"input","inputType":"text","required":true},"basicSalary":{"name":"BasicSalary","id":"basicSalary","type":"input","inputType":"number","required":true},"hra":{"name":"HRA","id":"hra","type":"input","inputType":"number","required":true},"ca":{"name":"CA","id":"ca","type":"input","inputType":"number","required":true},"ot":{"name":"OT","id":"ot","type":"input","inputType":"number","required":true},"total":{"name":"Total","id":"total","type":"input","inputType":"number","required":true}},"mapping":{"name":"Part Mapping","fields":{"id":{"name":"Part No","id":"id","type":"select","options":{},"action":"changeMapping","dataFrom":"marketing.partMaster","replaceName":"partNo"},"partName":{"name":"Part Name","id":"partName","type":"span"},"operationTo":{"name":"Stage","id":"operationTo","type":"select","options":{},"required":true,"dataFrom":"production.operationMaster","replaceName":"opName","valuePrefixData":"opCode","isSingle":true},"laborCost":{"name":"Labor Cost","id":"laborCost","type":"input","inputType":"text","required":true}}}},"listView":[{"title":"Employee Name","id":"employeeName"},{"title":"Mail Id","id":"mailId"}],"page":{"link":"marketing/empMaster/list","name":"list","templateUrl":"template/defaultView.html","controller":"empMasterCtrl"},"services":{"list":{"url":"api/empMaster/data","method":"GET"}}},"uomMaster":{"id":"uomMaster","title":"UOM Master","masterData":{"uomCode":null,"uomName":null},"form":{"name":"uomMaster","id":"uomMaster","autoGenKey":"uomCode","fields":{"uomCode":{"name":"UOM Code","id":"uomCode","type":"span","valuePrefix":"VT-UOM-"},"uomName":{"name":"UOM Name","id":"uomName","type":"input","inputType":"text","action":"isCheckExistField","required":true}}},"listView":[{"title":"UOM Code","id":"uomCode","valuePrefix":"VT-UOM-"},{"title":"UOM Name","id":"uomName"}],"page":{"link":"marketing/uomMaster/list","name":"list","templateUrl":"template/defaultView.html","controller":"uomMasterCtrl"},"services":{"list":{"url":"api/uomMaster/data","method":"GET"}}},"invoice":{"id":"invoice","title":"Invoice","masterData":{"invoiceNo":null,"date":null,"customerCode":null,"address":null,"gstin":null,"subTotal":null,"taxRate":null,"cgst":null,"sgst":null,"cgstTotal":null,"sgstTotal":null,"totalBeforTax":null,"total":null,"mapping":[{"id":null,"hsnCode":null,"unit":null,"rate":null,"amount":null}]},"form":{"name":"Invoice","id":"invoice","autoGenKey":"invoiceNo","disableByField":"id","fields":{"invoiceNo":{"name":"Invoice No","id":"invoiceNo","type":"span","valuePrefix":"H-","required":true},"date":{"name":"Date","id":"date","type":"input","inputType":"date","required":true},"customerCode":{"name":"To","id":"customerCode","type":"select","options":{},"action":"changeMapping","updateMapping":true,"updateData":["gstin","address","mapping"],"dataFrom":"marketing.customerMaster","replaceName":"customerName","isEditDisable":true,"isSingle":true},"address":{"name":"Customer Address","id":"address"},"partyGstin":{"name":"Party GSTIN","id":"gstin","type":"input","inputType":"text","required":true},"taxRate":{"name":"Tax Rate","id":"taxRate","type":"input","inputType":"number","required":true},"cgst":{"name":"CGST","id":"cgst","type":"span"},"cgstTotal":{"name":"CGST Total","id":"cgstTotal","type":"span"},"sgst":{"name":"SGST","id":"sgst","type":"input","inputType":"number","required":true},"sgstTotal":{"name":"SGST Total","id":"sgstTotal","type":"input","inputType":"number","required":true},"subTotal":{"name":"Sub Total","id":"subTotal","type":"input","inputType":"number","required":true},"total":{"name":"Total","id":"total","type":"input","inputType":"number","required":true}},"mapping":{"name":"Part Mapping","fields":{"id":{"name":"Part No","id":"id","type":"select","options":{},"dataFrom":"marketing.partMaster","replaceName":"partNo","isDisable":true},"hsnCode":{"name":"HSN Code","id":"hsnCode","type":"span"},"unit":{"name":"Unit","id":"unit","type":"input","inputType":"text","action":"updateTotal","required":true},"rate":{"name":"Rate","id":"rate","type":"span"},"amount":{"name":"Amount","id":"amount","type":"span"}}}},"listView":[{"title":"Invoice No","id":"invoiceNo","valuePrefix":"H-"},{"title":"Customer","id":"customerCode","dataFrom":"marketing.customerMaster","replaceName":"customerName","isFilterBy":true,"type":"select","options":{}},{"title":"Date","id":"date","type":"date"}],"page":{"link":"marketing/invoice/list","name":"list","templateUrl":"template/controllers/marketing/invoice.html","controller":"invoiceCtrl"},"services":{"list":{"url":"api/invoice/data/{{YEAR}}","method":"GET"}}},"cashBill":{"id":"cashBill","name":"cashBill","title":"Cash Bill","parentModule":"marketing.invoice","form":{"autoGenValStart":null,"fields":{"invoiceNo":{"name":"CashBill No","id":"invoiceNo","type":"span","valuePrefix":"","required":true},"preBalance":{"name":"Previous Balance","id":"preBalance","type":"input","inputType":"text","action":"updatePreBalance"}}},"listView":[{"title":"Cash Bill No","id":"invoiceNo","valuePrefix":""}],"page":{"link":"marketing/invoice/list?type=cashBill","name":"list","templateUrl":"template/marketing/invoice.html","controller":"invoiceCtrl"},"services":{"list":{"url":"api/cashBill/data/{{YEAR}}","method":"GET"}}}},"purchase":{"id":"purchase","name":"Purchase","title":"Purchase","icon":"shopping-bag","rmMaster":{"id":"rmMaster","title":"Raw Material Master","masterData":{"rmCode":null,"rmName":null,"grade":null,"type":null,"hsnCode":null,"uomCode":null,"rate":null,"gst":null,"sgst":null,"cgst":null},"form":{"name":"rmMaster","id":"rmMaster","autoGenKey":"rmCode","fields":{"rmCode":{"name":"RM Code","id":"rmCode","valuePrefix":"RM-","type":"span"},"rmName":{"name":"RM Name","id":"rmName","type":"input","inputType":"text","action":"isCheckExistField","required":true},"grade":{"name":"Grade","id":"grade","type":"input","inputType":"text","required":true},"type":{"name":"Type","id":"type","type":"input","inputType":"text","required":true},"hsnCode":{"name":"HSN Code","id":"hsnCode","type":"input","inputType":"text","required":true},"uomCode":{"name":"UOM","id":"uomCode","type":"select","options":{},"dataFrom":"marketing.uomMaster","replaceName":"uomName","isSingle":true},"rate":{"name":"Rate","id":"rate","type":"input","inputType":"number","required":true},"gst":{"name":"GST","id":"gst","type":"input","inputType":"number","required":true},"sgst":{"name":"SGST","id":"sgst","type":"input","inputType":"number","required":true},"cgst":{"name":"CGST","id":"cgst","type":"input","inputType":"number","required":true}}},"listView":[{"title":"RM Code","id":"rmCode","valuePrefix":"RM-"},{"title":"RM Name","id":"rmName"}],"page":{"link":"purchase/rmMaster/list","name":"list","templateUrl":"template/defaultView.html","controller":"rmMasterCtrl"},"services":{"list":{"url":"api/rmMaster/data","method":"GET"}}},"supplierMaster":{"id":"supplierMaster","title":"Supplier Master","masterData":{"supplierCode":null,"supplierName":null,"address":null,"contactNo":null,"gstin":null,"mapping":[{"id":null,"rmCode":null,"rate":null,"gst":null}]},"form":{"name":"supplierMaster","id":"supplierMaster","autoGenKey":"supplierCode","fields":{"supplierCode":{"name":"Supplier Code","id":"supplierCode","type":"span","valuePrefix":"VT-SP-"},"supplierName":{"name":"Supplier Name","id":"supplierName","type":"input","inputType":"text","action":"isCheckExistField","required":true},"address":{"name":"Address","id":"address","type":"input","inputType":"text","required":true},"contactNo":{"name":"Contact No","id":"contactNo","type":"input","inputType":"text","required":true},"gstin":{"name":"GSTIN","id":"gstin","type":"input","inputType":"text","required":true}},"mapping":{"name":"RM Mapping","fields":{"id":{"name":"RM Name","id":"id","type":"select","options":{},"action":"changeMapping","dataFrom":"purchase.rmMaster","replaceName":"rmName","valuePrefixData":"grade"},"rate":{"name":"Rate","id":"rate","type":"input","inputType":"text","required":true},"gst":{"name":"GST %","id":"gst","type":"input","inputType":"text","required":true}}}},"listView":[{"title":"Supplier Code","id":"supplierCode","valuePrefix":"VT-SP-"},{"title":"Supplier Name","id":"supplierName"}],"page":{"link":"purchase/supplierMaster/list","name":"list","templateUrl":"template/defaultView.html","controller":"supplierMasterCtrl"},"services":{"list":{"url":"api/supplierMaster/data","method":"GET"}}},"poSupplier":{"id":"poSupplier","title":"Purchase Order - Supplier","masterData":{"poNo":null,"date":null,"supplierCode":null,"gstin":null,"status":0,"subTotal":null,"extraAmount":null,"gstTotal":null,"total":null,"mapping":[{"id":null,"qty":null,"uomCode":null,"rate":null,"gst":null,"cgst":null,"sgst":null,"amount":null}]},"form":{"name":"poSupplier","id":"poSupplier","autoGenKey":"poNo","fields":{"poNo":{"name":"PO Code","id":"poNo","type":"span","valuePrefix":"VT-SP-PO-"},"date":{"name":"Date","id":"date","type":"input","inputType":"date","required":true},"supplierCode":{"name":"Supplier Code","id":"supplierCode","type":"select","options":{},"action":"changeMapping","updateMapping":true,"updateData":["gstin","mapping"],"dataFrom":"purchase.supplierMaster","replaceName":"supplierName","isSingle":true},"gstin":{"name":"Party Gstin","id":"gstin","type":"span"},"subTotal":{"name":"Sub Total","id":"subTotal","afterMapping":true,"type":"span"},"extraAmount":{"name":"Extra Amount","id":"extraAmount","type":"input","inputType":"number","action":"updatePOTotalAmount","afterMapping":true},"gstTotal":{"name":"GST Total","id":"gstTotal","type":"span","afterMapping":true},"total":{"name":"Total","id":"total","type":"span","afterMapping":true}},"mapping":{"name":"RM Mapping","fields":{"id":{"name":"RM Name","id":"id","type":"select","options":{},"action":"changeMapping","dataFrom":"purchase.rmMaster","replaceName":"rmName","valuePrefixData":"grade","isDisable":true},"qty":{"name":"Qty","id":"qty","type":"input","inputType":"text","action":"updatePORmTotal","required":true},"uomCode":{"name":"UOM","id":"uomCode","type":"select","options":{},"dataFrom":"marketing.uomMaster","replaceName":"uomName","isDisable":true},"rate":{"name":"Rate","id":"rate","type":"input","inputType":"text","action":"updatePORmTotal","required":true},"gst":{"name":"GST %","id":"gst","type":"span"},"total":{"name":"Total","id":"total","type":"span"}},"actions":{"add":false}}},"listView":[{"title":"PO NO","id":"poNo","valuePrefix":"VT-SP-PO-"},{"title":"Supplier Code","id":"supplierCode","dataFrom":"purchase.supplierMaster","replaceName":"supplierName","type":"select","isFilterBy":true},{"title":"Stutus","id":"status"}],"page":{"link":"purchase/poSupplier/list","name":"list","templateUrl":"template/defaultView.html","controller":"poSupplierCtrl"},"services":{"list":{"url":"api/poSupplier/data/{{YEAR}}","method":"GET"}}},"generalSupplierMaster":{"id":"generalSupplierMaster","title":"General Supplier Master","masterData":{"generalSupplierCode":null,"generalSupplierName":null,"address":null,"contactNo":null,"gstin":null,"mapping":[{"id":null,"partName":null,"rate":null,"gst":null}]},"form":{"name":"General Supplier Master","id":"generalSupplierMaster","autoGenKey":"generalSupplierCode","fields":{"generalSupplierCode":{"name":"General Supplier Code","id":"generalSupplierCode","type":"span","valuePrefix":"VT-GSP-"},"supplierName":{"name":"General Supplier Name","id":"generalSupplierName","type":"input","inputType":"text","action":"isCheckExistField","required":true},"address":{"name":"Address","id":"address","type":"input","inputType":"text","required":true},"contactNo":{"name":"Contact No","id":"contactNo","type":"input","inputType":"text","required":true},"gstin":{"name":"GSTIN","id":"gstin","type":"input","inputType":"text","required":true}},"mapping":{"name":"Part Mapping","fields":{"id":{"name":"Part No","id":"id","type":"select","options":{},"action":"changeMapping","dataFrom":"marketing.partMaster","replaceName":"partNo"},"partName":{"name":"Part Name","id":"partName","type":"span"},"rate":{"name":"Rate","id":"rate","type":"input","inputType":"text","required":true},"gst":{"name":"GST %","id":"gst","type":"span"}}}},"listView":[{"title":"General Supplier Code","id":"generalSupplierCode","valuePrefix":"VT-GSP-"},{"title":"General Supplier Name","id":"generalSupplierName"}],"page":{"link":"purchase/generalSupplierMaster/list","name":"list","templateUrl":"template/defaultView.html","controller":"generalSupplierMasterCtrl"},"services":{"list":{"url":"api/generalSupplierMaster/data","method":"GET"}}},"poGeneralSupplier":{"id":"poGeneralSupplier","title":"Purchase Order - General Supplier","masterData":{"poNo":null,"date":null,"generalSupplierCode":null,"gstin":null,"status":0,"subTotal":null,"extraAmount":null,"gstTotal":null,"total":null,"mapping":[{"id":null,"qty":null,"uomCode":null,"rate":null,"gst":null,"cgst":null,"sgst":null,"amount":null}]},"form":{"name":"poGeneralSupplier","id":"poGeneralSupplier","autoGenKey":"poNo","fields":{"poNo":{"name":"PO Code","id":"poNo","type":"span","valuePrefix":"VT-GSP-PO-"},"date":{"name":"Date","id":"date","type":"input","inputType":"date","required":true},"supplierCode":{"name":"GeneralSupplier Code","id":"generalSupplierCode","type":"select","options":{},"action":"changeMapping","updateMapping":true,"updateData":["gstin","mapping"],"dataFrom":"purchase.generalSupplierMaster","replaceName":"generalSupplierName","isSingle":true},"gstin":{"name":"Party Gstin","id":"gstin","type":"span"},"subTotal":{"name":"Sub Total","id":"subTotal","afterMapping":true,"type":"span"},"extraAmount":{"name":"Extra Amount","id":"extraAmount","type":"input","inputType":"number","action":"updatePOTotalAmount","afterMapping":true},"gstTotal":{"name":"GST Total","id":"gstTotal","type":"span","afterMapping":true},"total":{"name":"Total","id":"total","type":"span","afterMapping":true}},"mapping":{"name":"Part Mapping","fields":{"id":{"name":"Part No","id":"id","type":"select","options":{},"action":"changeMapping","dataFrom":"marketing.partMaster","replaceName":"partNo","isDisable":true},"qty":{"name":"Qty","id":"qty","type":"input","inputType":"text","action":"updatePORmTotal","required":true},"uomCode":{"name":"UOM","id":"uomCode","type":"select","options":{},"dataFrom":"marketing.uomMaster","replaceName":"uomName","isDisable":true},"rate":{"name":"Rate","id":"rate","type":"input","inputType":"text","action":"updatePORmTotal","required":true},"gst":{"name":"GST %","id":"gst","type":"span"},"total":{"name":"Total","id":"total","type":"span"}},"actions":{"add":false}}},"listView":[{"title":"PO NO","id":"poNo","valuePrefix":"VT-GSP-PO-"},{"title":"General Supplier Code","id":"generalSupplierCode","dataFrom":"purchase.generalSupplierMaster","replaceName":"generalSupplierName","type":"select","isFilterBy":true},{"title":"Stutus","id":"status"}],"page":{"link":"purchase/poGeneralSupplier/list","name":"list","templateUrl":"template/defaultView.html","controller":"poGeneralSupplierCtrl"},"services":{"list":{"url":"api/poGeneralSupplier/data/{{YEAR}}","method":"GET"}}},"subContractorMaster":{"id":"subContractorMaster","title":"Sub Contractor Master","masterData":{"subContractorCode":null,"subContractorName":null,"address":null,"contactNo":null,"gstin":null,"mapping":[{"id":null,"operationTo":null,"rate":null,"gst":null}]},"form":{"name":"subContractorMaster","id":"subContractorMaster","autoGenKey":"subContractorCode","fields":{"subContractorCode":{"name":"Sub Contractor Code","id":"subContractorCode","type":"span","valuePrefix":"VT-SC-"},"subContractorName":{"name":"Sub Contractor Name","id":"subContractorName","type":"input","inputType":"text","action":"isCheckExistField","required":true},"address":{"name":"Address","id":"address","type":"input","inputType":"text","required":true},"contactNo":{"name":"Contact No","id":"contactNo","type":"input","inputType":"number","required":true},"gstin":{"name":"GSTIN","id":"gstin","type":"input","inputType":"text","required":true}},"mapping":{"name":"Part Mapping","fields":{"id":{"name":"Part No","id":"id","type":"select","options":{},"action":"changeMapping","dataFrom":"marketing.partMaster","replaceName":"partNo","required":true},"operationTo":{"name":"Op Name","id":"operationTo","type":"select","options":{},"dataFrom":"production.operationMaster","replaceName":"opName","filter":{"source":["Sub-Contractor"]},"required":true},"rate":{"name":"Rate","id":"rate","type":"input","inputType":"text","required":true},"gst":{"name":"GST %","id":"gst","type":"span"}}}},"listView":[{"title":"Sub Contractor Code","id":"subContractorCode","valuePrefix":"VT-SC-"},{"title":"Sub Contractor Name","id":"subContractorName"}],"page":{"link":"purchase/subContractorMaster/list","name":"list","templateUrl":"template/defaultView.html","controller":"subContractorMasterCtrl"},"services":{"list":{"url":"api/subContractorMaster/data","method":"GET"}}},"poSubContractor":{"id":"poSubContractor","title":"Purchase Order - Sub Contractor","masterData":{"poNo":null,"date":null,"subContractorCode":null,"gstin":null,"status":0,"mapping":[{"id":null,"operationTo":null,"acceptedQty":null,"uomCode":null,"rate":null,"gst":null,"cgst":null,"sgst":null,"total":null}]},"form":{"name":"poSubContractor","id":"poSubContractor","autoGenKey":"poNo","fields":{"poNo":{"name":"PO Code","id":"poNo","type":"span","valuePrefix":"VT-SC-PO-"},"date":{"name":"Date","id":"date","type":"input","inputType":"date","required":true},"subContractorCode":{"name":"Sub Contractor Code","id":"subContractorCode","type":"select","options":{},"action":"changeMapping","updateMapping":true,"updateData":["gstin","mapping"],"dataFrom":"purchase.subContractorMaster","replaceName":"subContractorName","isSingle":true,"callBack":false},"gstin":{"name":"Party Gstin","id":"gstin","type":"span"}},"mapping":{"name":"Part Mapping","fields":{"id":{"name":"Part No","id":"id","type":"select","options":{},"action":"changeMapping","updateData":["uomCode","cgst","sgst"],"dataFrom":"marketing.partMaster","replaceName":"partNo","isDisable":true},"operationTo":{"name":"Op Name","id":"operationTo","type":"select","options":{},"dataFrom":"production.operationMaster","replaceName":"opName","isDisable":true},"acceptedQty":{"name":"Qty","id":"acceptedQty","type":"input","inputType":"text","action":"updatePartTotal","required":true},"uomCode":{"name":"UOM","id":"uomCode","type":"select","options":{},"dataFrom":"marketing.uomMaster","replaceName":"uomName","isDisable":true},"rate":{"name":"Rate","id":"rate","type":"input","inputType":"text","action":"updateTaxPart","required":true},"gst":{"name":"GST%","id":"gst","type":"input","inputType":"text","action":"updateGstPart","required":true},"cgst":{"name":"CGST%","id":"cgst","type":"span"},"sgst":{"name":"SGST%","id":"sgst","type":"span"},"total":{"name":"total","id":"total","type":"span"}},"actions":{"add":false}}},"listView":[{"title":"PO NO","id":"poNo","valuePrefix":"VT-SC-PO-"},{"title":"SubContractor Code","id":"subContractorCode","dataFrom":"purchase.subContractorMaster","replaceName":"subContractorName","type":"select","isFilterBy":true},{"title":"Stutus","id":"status"}],"page":{"link":"purchase/poSubContractor/list","name":"list","templateUrl":"template/defaultView.html","controller":"poSubContractorCtrl"},"services":{"list":{"url":"api/poSubContractor/data/{{YEAR}}","method":"GET"}}}},"store":{"id":"store","name":"Store","title":"Store","icon":"suitcase","grnSupplier":{"id":"grnSupplier","title":"Good Receipt Note - Supplier","masterData":{"grnNo":null,"date":null,"supplierCode":null,"poNo":null,"supplierInvoiceNo":null,"supplierInvoiceDate":null,"status":0,"subTotal":null,"extraAmount":null,"gstTotal":null,"total":null,"mapping":[{"id":null,"qty":null,"uomCode":null,"receivedQty":null,"acceptedQty":null,"rate":null,"gst":null,"cost":null,"total":null}]},"form":{"name":"grnSupplier","id":"grnSupplier","autoGenKey":"grnNo","disableByField":"id","fields":{"grnNo":{"name":"GRN No","id":"grnNo","type":"span","valuePrefix":"VT-GRN-"},"date":{"name":"Date","id":"date","type":"input","inputType":"date","required":true},"supplierCode":{"name":"Supplier Code","id":"supplierCode","type":"select","options":{},"action":"getPOSupplier","dataFrom":"purchase.supplierMaster","replaceName":"supplierName","isSingle":true},"poNo":{"name":"PO No","id":"poNo","type":"select","options":{},"action":"changeMapping","updateMapping":true,"updateData":["mapping","subTotal","extraAmount","gstTotal","total"],"dataFrom":"purchase.poSupplier","replaceName":"poNo","valuePrefix":"VT-SP-PO-","filter":{"status":0},"isEditDisable":true,"isSingle":true},"supplierInvoiceNo":{"name":"Supplier Invoice No","id":"supplierInvoiceNo","type":"input","inputType":"text","required":true},"supplierInvoiceDate":{"name":"Supplier Invoice Date","id":"supplierInvoiceDate","type":"input","inputType":"date","required":true},"subTotal":{"name":"Sub Total","id":"subTotal","afterMapping":true,"type":"span"},"extraAmount":{"name":"Extra Amount","id":"extraAmount","type":"input","inputType":"number","action":"updatePOTotalAmount","afterMapping":true},"gstTotal":{"name":"GST Total","id":"gstTotal","type":"span","afterMapping":true},"total":{"name":"Total","id":"total","type":"span","afterMapping":true}},"mapping":{"name":"Detail Mapping","fields":{"id":{"name":"RM Name","id":"id","type":"select","options":{},"dataFrom":"purchase.rmMaster","replaceName":"rmName","valuePrefixData":"grade","isDisable":true},"qty":{"name":"PO Qty","id":"qty","type":"span"},"uomCode":{"name":"UOM","id":"uomCode","type":"select","options":{},"dataFrom":"marketing.uomMaster","replaceName":"uomName","isDisable":true},"receivedQty":{"name":"Received Qty","id":"receivedQty","type":"input","inputType":"text","action":"updateRmTotal","required":true},"acceptedQty":{"name":"Accepted Qty","id":"acceptedQty","type":"input","inputType":"text","action":"updateRmTotal","required":true},"rate":{"name":"Rate","id":"rate","type":"span"},"gst":{"name":"GST%","id":"gst","type":"input","inputType":"text","action":"updateGstRM","required":true},"total":{"name":"Total","id":"total","type":"span"}},"actions":{"add":false}}},"listView":[{"title":"GRN NO","id":"grnNo","valuePrefix":"VT-GRN-"},{"title":"Supplier","id":"supplierCode","dataFrom":"purchase.supplierMaster","replaceName":"supplierName"}],"page":{"link":"store/grnSupplier/list","name":"list","templateUrl":"template/defaultView.html","controller":"grnSupplierCtrl"},"services":{"list":{"url":"api/grnSupplier/data/{{YEAR}}","method":"GET"}}},"grnGeneralSupplier":{"id":"grnGeneralSupplier","title":"Good Receipt Note - General Supplier","masterData":{"grnNo":null,"date":null,"generalSupplierCode":null,"poNo":null,"generalSupplierInvoiceNo":null,"generalSupplierInvoiceDate":null,"status":0,"subTotal":null,"extraAmount":null,"gstTotal":null,"total":null,"mapping":[{"id":null,"qty":null,"uomCode":null,"receivedQty":null,"acceptedQty":null,"rate":null,"gst":null,"cost":null,"total":null}]},"form":{"name":"grnSupplier","id":"grnSupplier","autoGenKey":"grnNo","disableByField":"id","fields":{"grnNo":{"name":"GRN No","id":"grnNo","type":"span","valuePrefix":"VT-GRN-"},"date":{"name":"Date","id":"date","type":"input","inputType":"date","required":true},"supplierCode":{"name":"General Supplier Code","id":"generalSupplierCode","type":"select","options":{},"action":"getPOGeneralSupplier","dataFrom":"purchase.generalSupplierMaster","replaceName":"generalSupplierName","isSingle":true,"isEditDisable":true},"poNo":{"name":"PO No","id":"poNo","type":"select","options":{},"action":"changeMapping","updateMapping":true,"updateData":["mapping","subTotal","extraAmount","gstTotal","total"],"dataFrom":"purchase.poGeneralSupplier","replaceName":"poNo","valuePrefix":"VT-GSP-PO-","filter":{"status":0},"isEditDisable":true,"isSingle":true},"supplierInvoiceNo":{"name":"General Supplier Invoice No","id":"generalSupplierInvoiceNo","type":"input","inputType":"text","required":true},"supplierInvoiceDate":{"name":"General Supplier Invoice Date","id":"generalSupplierInvoiceDate","type":"input","inputType":"date","required":true},"subTotal":{"name":"Sub Total","id":"subTotal","afterMapping":true,"type":"span"},"extraAmount":{"name":"Extra Amount","id":"extraAmount","type":"input","inputType":"number","action":"updatePOTotalAmount","afterMapping":true},"gstTotal":{"name":"GST Total","id":"gstTotal","type":"span","afterMapping":true},"total":{"name":"Total","id":"total","type":"span","afterMapping":true}},"mapping":{"name":"Detail Mapping","fields":{"id":{"name":"Part No","id":"id","type":"select","options":{},"dataFrom":"marketing.partMaster","replaceName":"partNo","isDisable":true},"qty":{"name":"PO Qty","id":"qty","type":"span"},"uomCode":{"name":"UOM","id":"uomCode","type":"select","options":{},"dataFrom":"marketing.uomMaster","replaceName":"uomName","isDisable":true},"receivedQty":{"name":"Received Qty","id":"receivedQty","type":"input","inputType":"text","action":"updatePTTotal","required":true},"acceptedQty":{"name":"Accepted Qty","id":"acceptedQty","type":"input","inputType":"text","action":"updatePTTotal","required":true},"rate":{"name":"Rate","id":"rate","type":"span"},"gst":{"name":"GST%","id":"gst","type":"input","inputType":"text","action":"updateGstPart","required":true},"total":{"name":"Total","id":"total","type":"span"}},"actions":{"add":false}}},"listView":[{"title":"GRN NO","id":"grnNo","valuePrefix":"VT-GRN-"},{"title":"General General Supplier","id":"generalSupplierCode","dataFrom":"purchase.generalSupplierMaster","replaceName":"generalSupplierName"}],"page":{"link":"store/grnGeneralSupplier/list","name":"list","templateUrl":"template/defaultView.html","controller":"grnGeneralSupplierCtrl"},"services":{"list":{"url":"api/grnGeneralSupplier/data/{{YEAR}}","method":"GET"}}},"dcSubContractor":{"id":"dcSubContractor","title":"Delivery Chellan - Sub Contractor","masterData":{"dcNo":null,"date":null,"subContractorCode":null,"poNo":null,"status":0,"mapping":[{"id":null,"operationFrom":null,"operationTo":null,"acceptedQty":null,"uomCode":null,"rate":null,"gst":null,"total":null}]},"form":{"name":"dcSubContractor","id":"dcSubContractor","disableByField":"id","autoGenKey":"dcNo","fields":{"dcNo":{"name":"DC No","id":"dcNo","type":"span","valuePrefix":"VT-DC-"},"date":{"name":"Date","id":"date","type":"input","inputType":"date","required":true},"subContractorCode":{"name":"Sub Contractor Code","id":"subContractorCode","type":"select","options":{},"action":"getPOSubContractor","dataFrom":"purchase.subContractorMaster","replaceName":"subContractorName","isSingle":true,"isEditDisable":true},"poNo":{"name":"PO No","id":"poNo","type":"select","options":{},"action":"changeMapping","dataFrom":"purchase.poSubContractor","replaceName":"poNo","valuePrefix":"VT-SC-PO-","updateMapping":true,"updateData":["mapping"],"filter":{"status":0},"isSingle":true,"isEditDisable":true}},"mapping":{"name":"Detail Mapping","fields":{"id":{"name":"Part No","id":"id","type":"select","options":{},"dataFrom":"marketing.partMaster","replaceName":"partNo","isDisable":true},"operationFrom":{"name":"Part From","id":"operationFrom","type":"select","options":{},"required":true,"dataFrom":"production.operationMaster","replaceName":"opName","valuePrefixData":"opCode","isDisable":true},"operationTo":{"name":"For the purpose","id":"operationTo","type":"select","options":{},"dataFrom":"production.operationMaster","replaceName":"opName","valuePrefixData":"opCode","isDisable":true},"acceptedQty":{"name":"Qty","id":"acceptedQty","type":"input","inputType":"text","action":"updatePartTotal","required":true},"uomCode":{"name":"UOM","id":"uomCode","type":"select","options":{},"dataFrom":"marketing.uomMaster","replaceName":"uomName","isDisable":true},"rate":{"name":"Rate","id":"rate","type":"span"},"gst":{"name":"GST%","id":"gst","type":"input","inputType":"text","action":"updateGstPart","required":true},"total":{"name":"total","id":"total","type":"span"}},"actions":{"add":false}}},"listView":[{"title":"DC NO","id":"dcNo","valuePrefix":"VT-DC-"},{"title":"Sub Contractor Code","id":"subContractorCode","dataFrom":"purchase.subContractorMaster","replaceName":"subContractorName"},{"title":"Stutus","id":"status"}],"page":{"link":"store/dcSubContractor/list","name":"list","templateUrl":"template/defaultView.html","controller":"dcSubContractorCtrl"},"services":{"list":{"url":"api/dcSubContractor/data/{{YEAR}}","method":"GET"}}},"grnSubContractor":{"id":"grnSubContractor","title":"Good Receipt Note - Sub Contractor","masterData":{"grnNo":null,"date":null,"subContractorCode":null,"poNo":null,"subContractorDCNo":null,"subContractorDCDate":null,"dcNo":null,"status":0,"mapping":[{"id":null,"operationFrom":null,"operationTo":null,"uomCode":null,"receivedQty":null,"acceptedQty":null,"rate":null,"gst":null,"cost":null,"total":null}]},"form":{"name":"grnSubContractor","id":"grnSubContractor","disableByField":"id","autoGenKey":"grnNo","fields":{"grnNo":{"name":"GRN No","id":"grnNo","type":"span","valuePrefix":"VT-SC-GRN-"},"date":{"name":"Date","id":"date","type":"input","inputType":"date","required":true},"subContractorCode":{"name":"Sub Contractor Code","id":"subContractorCode","type":"select","options":{},"action":"getPOSubContractor","dataFrom":"purchase.subContractorMaster","replaceName":"subContractorName","isSingle":true},"poNo":{"name":"PO No","id":"poNo","type":"select","options":{},"action":"getDCSubContractor","dataFrom":"purchase.poSubContractor","replaceName":"poNo","valuePrefix":"VT-SC-PO-","filter":{"status":0},"isSingle":true,"isEditDisable":true},"dcNo":{"name":"Our DC No","id":"dcNo","type":"select","options":{},"dataFrom":"store.dcSubContractor","action":"changeMapping","replaceName":"dcNo","valuePrefix":"VT-DC-","updateMapping":true,"updateData":["mapping"],"filter":{"status":0},"isSingle":true,"isEditDisable":true,"onLoadActions":true},"subContractorDCCode":{"name":"Sub Contractor DC Code","id":"subContractorDCCode","type":"input","inputType":"number","required":true},"subContractorDCDate":{"name":"Sub Contractor DC Date","id":"subContractorDCDate","type":"input","inputType":"date","required":true}},"mapping":{"name":"Detail Mapping","fields":{"id":{"name":"Part No","id":"id","type":"select","options":{},"dataFrom":"marketing.partMaster","replaceName":"partNo","isDisable":true},"operationFrom":{"name":"Part From","id":"operationFrom","type":"select","options":{},"dataFrom":"production.operationMaster","replaceName":"opName","valuePrefixData":"opCode","isDisable":true},"operationTo":{"name":"Op Name","id":"operationTo","type":"select","options":{},"dataFrom":"production.operationMaster","replaceName":"opName","valuePrefixData":"opCode","isDisable":true},"receivedQty":{"name":"Received Qty","id":"receivedQty","type":"input","inputType":"text","action":"updatePartTotal","required":true},"acceptedQty":{"name":"Accepted Qty","id":"acceptedQty","type":"input","inputType":"text","action":"updatePartTotal","required":true},"uomCode":{"name":"UOM","id":"uomCode","type":"select","options":{},"dataFrom":"marketing.uomMaster","replaceName":"uomName","isDisable":true},"rate":{"name":"Rate","id":"rate","type":"span"},"gst":{"name":"GST%","id":"gst","type":"span"},"cgst":{"name":"CGST%","id":"cgst","type":"span"},"sgst":{"name":"SGST%","id":"sgst","type":"span"},"total":{"name":"total","id":"total","type":"span"}},"actions":{"add":false}}},"listView":[{"title":"GRN NO","id":"grnNo","valuePrefix":"VT-SC-GRN-"},{"title":"Sub Contractor Code","id":"subContractorCode","dataFrom":"purchase.subContractorMaster","replaceName":"subContractorName"}],"page":{"link":"store/grnSubContractor/list","name":"list","templateUrl":"template/defaultView.html","controller":"grnSubContractorCtrl"},"services":{"list":{"url":"api/grnSubContractor/data/{{YEAR}}","method":"GET"}}}},"production":{"id":"production","name":"Production","title":"Production","icon":"cogs","operationMaster":{"id":"operationMaster","title":"Operation Master","masterData":{"opCode":null,"opName":null,"source":null},"form":{"name":"operationMaster","id":"operationMaster","fields":{"opCode":{"name":"Operation","id":"opCode","type":"input","inputType":"text","required":true},"opName":{"name":"Operation Name","id":"opName","type":"input","inputType":"text","action":"isCheckExistField","required":true},"source":{"name":"Source","id":"source","type":"select","options":{"Supplier":{"optionId":"Supplier","optionName":"Supplier"},"In-House":{"optionId":"In-House","optionName":"IN House"},"Sub-Contractor":{"optionId":"Sub-Contractor","optionName":"Sub Contractor"}},"makeFieldOptions":false,"required":true}}},"listView":[{"title":"Operation","id":"opCode"},{"title":"Operation Name","id":"opName"}],"page":{"link":"production/operationMaster/list","name":"list","templateUrl":"template/defaultView.html","controller":"operationMasterCtrl"},"services":{"list":{"url":"api/operationMaster/data","method":"GET"}}},"bom":{"id":"bom","title":"BOM","masterData":{"partNo":null,"partName":null,"rmCode":null,"partNorms":null},"form":{"name":"bom","id":"bom","fields":{"partNo":{"name":"Part No","id":"partNo","type":"select","options":{},"dataFrom":"marketing.partMaster","replaceName":"partNo","updateData":["rmCode","partName"],"action":"changeMapping","existingCheck":true,"isSingle":true},"partName":{"name":"Part Name","id":"partName","type":"span"},"rmCode":{"name":"RM Code","id":"rmCode","type":"select","options":{},"dataFrom":"purchase.rmMaster","replaceName":"rmName","valuePrefixData":"grade","isSingle":true},"partNorms":{"name":"Part Norms","id":"partNorms","type":"input","inputType":"text","required":true}}},"listView":[{"title":"Part No","id":"partNo","dataFrom":"marketing.partMaster","replaceName":"partNo"},{"title":"RM Name","id":"rmCode","dataFrom":"purchase.rmMaster","replaceName":"rmName","valuePrefixData":"grade"}],"page":{"link":"production/bom/list","name":"list","templateUrl":"template/defaultView.html","controller":"bomCtrl"},"services":{"list":{"url":"api/bom/data","method":"GET"}}},"machineMaster":{"id":"machineMaster","title":"Machine Master","masterData":{"machineNo":null,"machineName":null,"make":null,"model":null,"capacity":null,"yop":null,"id":null},"form":{"name":"machineMaster","id":"machineMaster","autoGenKey":"machineNo","fields":{"machineNo":{"name":"Machine No","id":"machineNo","type":"span","valuePrefix":"VT-M/C-"},"machineName":{"name":"Machine Name","id":"machineName","type":"input","inputType":"text","action":"isCheckExistField","required":true},"make":{"name":"Make","id":"make","type":"input","inputType":"text","required":true},"model":{"name":"Model","id":"model","type":"input","inputType":"text","required":true},"capacity":{"name":"Capacity","id":"capacity","type":"input","inputType":"text","required":true},"yop":{"name":"Year of Purchase","id":"yop","type":"input","inputType":"text","required":true},"value":{"name":"Value","id":"value","type":"input","inputType":"text","required":true}}},"listView":[{"title":"Machine No","id":"machineNo","valuePrefix":"VT-M/C-"},{"title":"Machine Name","id":"machineName"}],"page":{"link":"production/machineMaster/list","name":"list","templateUrl":"template/defaultView.html","controller":"machineMasterCtrl"},"services":{"list":{"url":"api/machineMaster/data","method":"GET"}}},"flowMaster":{"id":"flowMaster","title":"Flow Master","masterData":{"partNo":null,"partName":null,"mapping":[{"id":null,"opName":null,"source":null,"toolNo":null,"palnQtyPerHr":null}]},"form":{"name":"flowMaster","id":"flowMaster","fields":{"partNo":{"name":"Part No","id":"partNo","type":"select","options":{},"required":true,"action":"changeMapping","updateData":["partName"],"dataFrom":"marketing.partMaster","replaceName":"partNo","existingCheck":true,"isSingle":true},"partName":{"name":"Part Name","id":"partName","type":"span"}},"mapping":{"name":"OP Mapping","fields":{"id":{"name":"Part op code","id":"id","type":"select","options":{},"action":"changeMapping","dataFrom":"production.operationMaster","replaceName":"opName","valuePrefixData":"opCode","required":true},"opName":{"name":"op Name","id":"opName","type":"span"},"source":{"name":"Source","id":"source","type":"span"},"toolNo":{"name":"Tool Name","id":"toolNo","type":"select","options":{},"dataFrom":"production.toolMaster","replaceName":"toolName"},"palnQtyPerHr":{"name":"Paln Qty Per Hr","id":"palnQtyPerHr","type":"input","inputType":"number","required":true}}}},"listView":[{"title":"Part NO","id":"partNo","dataFrom":"marketing.partMaster","replaceName":"partNo"}],"page":{"link":"store/flowMaster/list","name":"list","templateUrl":"template/defaultView.html","controller":"flowMasterCtrl"},"services":{"list":{"url":"api/flowMaster/data","method":"GET"}}},"toolMaster":{"id":"toolMaster","title":"Tool Master","masterData":{"toolNo":null,"toolName":null,"make":null,"type":null,"toolLife":null,"yop":null,"id":null},"form":{"name":"toolMaster","id":"toolMaster","autoGenKey":"toolNo","fields":{"toolNo":{"name":"Tool No","id":"toolNo","type":"span","valuePrefix":"VT-T-"},"toolName":{"name":"Tool Name","id":"toolName","type":"input","inputType":"text","action":"isCheckExistField","required":true},"make":{"name":"Make","id":"make","type":"input","inputType":"text","required":true},"type":{"name":"Type","id":"type","type":"input","inputType":"text","required":true},"toolLife":{"name":"Tool Life","id":"toolLife","type":"input","inputType":"text","required":true},"yop":{"name":"Year of Purchase","id":"yop","type":"input","inputType":"text","required":true},"value":{"name":"Value","id":"value","type":"input","inputType":"text","required":true}}},"listView":[{"title":"Tool No","id":"toolNo","valuePrefix":"VT-T-"},{"title":"Tool Name","id":"toolName"}],"page":{"link":"production/toolMaster/list","name":"list","templateUrl":"template/defaultView.html","controller":"toolMasterCtrl"},"services":{"list":{"url":"api/toolMaster/data","method":"GET"}}},"materialIssueNote":{"id":"materialIssueNote","title":"Material Issue Note","masterData":{"jobCardNo":null,"date":null,"rmCode":null,"partNo":null,"partNorms":null,"issueQty":null,"qtyCanMake":null,"operationTo":null,"status":0},"form":{"name":"materialIssueNote","id":"materialIssueNote","autoGenKey":"jobCardNo","disableByField":"id","fields":{"jobCardNo":{"name":"Job Card No","id":"jobCardNo","type":"span","valuePrefix":"VT-"},"date":{"name":"Job Card Date","id":"date","type":"input","inputType":"date","required":true},"rmCode":{"name":"RM Code","id":"rmCode","type":"select","options":{},"dataFrom":"purchase.rmMaster","replaceName":"rmName","valuePrefixData":"grade","action":"getPartNo","isEditDisable":true,"isSingle":true},"partNo":{"name":"Part No","id":"partNo","type":"select","options":{},"dataFrom":"marketing.partMaster","replaceName":"partNo","action":"getNorms","isEditDisable":true,"isSingle":true},"partNorms":{"name":"Part Norms","id":"partNorms","type":"input","inputType":"text","required":true,"action":"updateQtyMake"},"issueQty":{"name":"Issue Qty","id":"issueQty","type":"input","inputType":"text","required":true,"action":"updateQtyMake"},"qtyCanMake":{"name":"Qty Can Make","id":"qtyCanMake","type":"input","inputType":"text","isDisable":true,"required":true},"operationTo":{"name":"Issue Stage","id":"operationTo","type":"select","options":{},"required":true,"dataFrom":"production.operationMaster","replaceName":"opName","valuePrefixData":"opCode","isEditDisable":true,"isSingle":true}}},"listView":[{"title":"Job Card No","id":"jobCardNo","valuePrefix":"VT-"},{"title":"PartNo","id":"partNo","dataFrom":"marketing.partMaster","replaceName":"partNo","type":"select","isFilterBy":true},{"title":"Qty Can Make","id":"qtyCanMake"},{"title":"Date","id":"date","type":"date"},{"title":"Status","id":"status"}],"page":{"link":"production/materialIssueNote/list","name":"list","templateUrl":"template/defaultView.html","controller":"materialIssueNoteCtrl"},"services":{"list":{"url":"api/materialIssueNote/data/{{YEAR}}","method":"GET"}}},"productionEntry":{"id":"productionEntry","title":"Production Entry","masterData":{"jobCardNo":null,"partNo":null,"mapping":[{"date":null,"machineNo":null,"operationFrom":null,"operationTo":null,"toolNo":null,"operator":null,"startTime":null,"endTime":null,"planQty":null,"acceptedQty":null,"rejectionQty":null,"rwQty":null}]},"form":{"name":"productionEntry","id":"productionEntry","disableByField":"id","fields":{"jobCardNo":{"name":"Job Card No","id":"jobCardNo","type":"select","options":{},"required":true,"dataFrom":"production.materialIssueNote","replaceName":"jobCardNo","valuePrefix":"VT-","action":"changeMapping","updateData":["partNo"],"filter":{"status":0},"isEditDisable":true,"isSingle":true,"onLoadActions":true},"partNo":{"name":"Part No","id":"partNo","type":"select","options":{},"required":true,"dataFrom":"marketing.partMaster","replaceName":"partNo","isDisable":true,"isEditDisable":true,"isSingle":true}},"mapping":{"name":"Production Mapping","fields":{"date":{"name":"Date","id":"date","type":"input","inputType":"date","required":true},"machineNo":{"name":"M/C No","id":"machineNo","type":"select","options":{},"dataFrom":"production.machineMaster","replaceName":"machineName","required":true},"operationFrom":{"name":"Operation From","id":"operationFrom","type":"select","options":{},"action":"updateOperationTo","dataFrom":"production.operationMaster","replaceName":"opName","valuePrefixData":"opCode","required":true},"operationTo":{"name":"Operation To","id":"operationTo","type":"select","options":{},"required":true,"dataFrom":"production.operationMaster","replaceName":"opName","action":"updateToolNo","valuePrefixData":"opCode"},"toolName":{"name":"Tool Name","id":"toolNo","type":"select","options":{},"dataFrom":"production.toolMaster","replaceName":"toolName"},"operator":{"name":"Operator","id":"operator","type":"select","options":{},"required":true,"dataFrom":"marketing.empMaster","replaceName":"employeeName"},"startTime":{"name":"Start Time: (1-24)","id":"startTime","type":"input","inputType":"number","required":true},"endTime":{"name":"End Time: (1-24)","id":"endTime","type":"input","inputType":"number","required":true,"action":"calculatePlanQty"},"planQty":{"name":"Plan Qty","id":"planQty","type":"input","inputType":"number","required":true},"acceptedQty":{"name":"Accepted Qty","id":"acceptedQty","type":"input","inputType":"number","required":true,"action":"checkAcceptedQty"},"rejectionQty":{"name":"Rejection Qty","id":"rejectionQty","type":"input","inputType":"number","required":true,"action":"checkAcceptedQty"},"rwQty":{"name":"R/w Qty","id":"rwQty","type":"input","inputType":"number","required":true,"action":"checkAcceptedQty"}},"actions":{"add":false,"delete":false}}},"listView":[{"title":"Job Card No","id":"jobCardNo","dataFrom":"production.materialIssueNote","isFilterBy":true,"replaceName":"id","valuePrefix":"VT-","type":"select","options":{}},{"title":"Part No","id":"partNo","dataFrom":"marketing.partMaster","replaceName":"partNo","type":"select","isFilterBy":true,"options":{}}],"page":{"link":"production/productionEntry/list","name":"list","templateUrl":"template/defaultView.html","controller":"productionEntryCtrl"},"services":{"list":{"url":"api/productionEntry/data/{{YEAR}}","method":"GET"}}}},"report":{"id":"report","name":"Report","title":"Report","icon":"tasks","rmStock":{"id":"rmStock","title":"Raw Material Stock","masterData":{"rmName":null,"rmStockQty":null,"uomCode":null},"form":{"name":"RMStock","id":"RMStock","fields":{"rmName":{"name":"RM Name","id":"rmCode","type":"select","options":{},"action":"changeMapping","updateData":["uomCode"],"dataFrom":"purchase.rmMaster","replaceName":"rmName","valuePrefixData":"grade","isSingle":true},"rmStockQty":{"name":"Stock Qty","id":"rmStockQty","type":"input","inputType":"number","required":true},"uomCode":{"name":"UOM","id":"uomCode","type":"select","options":{},"dataFrom":"marketing.uomMaster","replaceName":"uomName","isSingle":true}}},"listView":[{"title":"Raw Material Name","id":"rmCode","dataFrom":"purchase.rmMaster","replaceName":"rmName","valuePrefixData":"grade","isFilterBy":true,"type":"select","options":{}},{"title":"Rm Stock Qty","id":"rmStockQty"},{"title":"UOM","id":"uomCode","dataFrom":"marketing.uomMaster","replaceName":"uomName"},{"title":"Updated","id":"updated","type":"input","inputType":"date"}],"page":{"link":"report/rmStock/list","name":"list","templateUrl":"template/defaultView.html","controller":"rmStockCtrl","actions":{"downloadExcel":true}},"services":{"list":{"url":"api/rmStock/data/{{YEAR}}","method":"GET"}}},"partStock":{"id":"partStock","title":"Part Stock","masterData":{"partNo":null,"partStockQty":null,"operationFrom":null,"operationTo":null},"form":{"name":"PartStock","id":"PartStock","fields":{"partNo":{"name":"Part No","id":"partNo","type":"select","options":{},"dataFrom":"marketing.partMaster","replaceName":"partNo","action":"updateOperationFrom","isSingle":true},"partStockQty":{"name":"Part Qty","id":"partStockQty","type":"input","inputType":"number","required":true},"operationFrom":{"name":"Operation From","id":"operationFrom","type":"select","options":{},"dataFrom":"production.operationMaster","action":"updateOperationTo","replaceName":"opName","isSingle":true},"operationTo":{"name":"Operation To","id":"operationTo","type":"select","options":{},"dataFrom":"production.operationMaster","replaceName":"opName","isSingle":true}}},"listView":[{"title":"Part No","id":"partNo","dataFrom":"marketing.partMaster","replaceName":"partNo","type":"select","isFilterBy":true},{"title":"Part Stock Qty","id":"partStockQty"},{"title":"Operation From","id":"operationFrom","dataFrom":"production.operationMaster","replaceName":"opName","type":"select"},{"title":"Operation To","id":"operationTo","dataFrom":"production.operationMaster","replaceName":"opName","type":"select"},{"title":"Updated","id":"updated","type":"input","inputType":"date"}],"page":{"link":"report/partStock/list","name":"list","templateUrl":"template/defaultView.html","controller":"partStockCtrl","actions":{"downloadExcel":true}},"services":{"list":{"url":"api/partStock/data/{{YEAR}}","method":"GET"}}},"subContractorStock":{"id":"subContractorStock","title":"SubContractor Stock","masterData":{"subContractorCode":null,"partStockQty":null,"operationFrom":null,"operationTo":null},"form":{"name":"subContractorStock","id":"subContractorStock","fields":{"subContractorCode":{"name":"SubContractor Code","id":"subContractorCode","type":"select","options":{},"dataFrom":"purchase.subContractorMaster","replaceName":"subContractorName","action":"getPartNos","isSingle":true},"partNo":{"name":"Part No","id":"partNo","type":"select","options":{},"dataFrom":"marketing.partMaster","replaceName":"partNo","action":"updateOperationFrom","isSingle":true},"partStockQty":{"name":"SubContractor Qty","id":"partStockQty","type":"input","inputType":"number","required":true},"operationFrom":{"name":"Operation From","id":"operationFrom","type":"select","options":{},"dataFrom":"production.operationMaster","action":"updateOperationTo","replaceName":"opName","isSingle":true},"operationTo":{"name":"Operation To","id":"operationTo","type":"select","options":{},"dataFrom":"production.operationMaster","replaceName":"opName","isSingle":true}}},"listView":[{"title":"SubContractor Code","id":"subContractorCode","dataFrom":"purchase.subContractorMaster","replaceName":"subContractorName","type":"select","isFilterBy":true},{"title":"Part No","id":"partNo","dataFrom":"marketing.partMaster","replaceName":"partNo","type":"select"},{"title":"Part Stock Qty","id":"partStockQty"},{"title":"Operation From","id":"operationFrom","dataFrom":"production.operationMaster","replaceName":"opName","type":"select","isFilterBy":true},{"title":"Operation To","id":"operationTo","dataFrom":"production.operationMaster","replaceName":"opName","type":"select","isFilterBy":true},{"title":"Updated","id":"updated","type":"input","inputType":"date"}],"page":{"link":"report/subContractorStock/list","name":"list","templateUrl":"template/defaultView.html","controller":"subContractorStockCtrl","actions":{"downloadExcel":true}},"services":{"list":{"url":"api/subContractorStock/data/{{YEAR}}","method":"GET"}}},"salesAnalysisInvoice":{"id":"salesAnalysisInvoice","title":"Sales Analysis - Invoice","filterView":{"title":"Filter","data":{"customerCode":null,"frmDate":null,"toDate":null},"fields":[{"title":"Customer","id":"customerCode","type":"select","dataFrom":"marketing.customerMaster","replaceName":"customerName"},{"title":"From Date","id":"frmDate","type":"input","inputType":"date"},{"title":"To Date","id":"toDate","type":"input","inputType":"date"}]},"listView":[{"title":"Customer","id":"customerCode","type":"select","dataFrom":"marketing.customerMaster","replaceName":"customerName"},{"title":"Part No","id":"partNo","dataFrom":"marketing.partMaster","replaceName":"partNo","type":"select"},{"title":"Part Qty","id":"unit"},{"title":"Part Price","id":"rate"},{"title":"Sales Value","id":"amount"},{"title":"Dates","id":"dates"},{"title":"Invoice Nos","id":"invoiceNos"}],"page":{"link":"report/salesAnalysisInvoice/list","name":"list","templateUrl":"template/defaultView.html","controller":"salesAnalysisInvoiceCtrl","actions":{"downloadExcel":true,"add":false,"edit":false,"delete":false,"printView":false}},"services":{"list":{"url":"api/invoice/data/{{YEAR}}","method":"GET"}}},"salesAnalysisCashBill":{"id":"salesAnalysisCashBill","name":"salesAnalysisCashBill","title":"Sales Analysis - Cash Bill","parentModule":"report.salesAnalysisInvoice","page":{"link":"report/salesAnalysisInvoice/list?type=cashBill","name":"list","templateUrl":"template/defaultView.html","controller":"salesAnalysisInvoiceCtrl","actions":{"downloadExcel":true,"add":false,"edit":false,"delete":false,"printView":false}},"services":{"list":{"url":"api/cashBill/data/{{YEAR}}","method":"GET"}}},"productionEntryReport":{"id":"productionEntryReport","title":"Production Entry Report","filterView":{"title":"Filter","data":{"frmDate":null,"toDate":null},"fields":[{"title":"From Date","id":"frmDate","type":"input","inputType":"date"},{"title":"To Date","id":"toDate","type":"input","inputType":"date"}]},"listView":[{"title":"Date","id":"date","type":"input","inputType":"date"},{"title":"M/C No","id":"mcNo","type":"select","dataFrom":"production.machineMaster","replaceName":"machineName"},{"title":"Job Card No","id":"jobCardNo","type":"input"},{"title":"Part No","id":"partNo","dataFrom":"marketing.partMaster","replaceName":"partNo","type":"select"},{"title":"Operation","id":"operationTo","dataFrom":"production.operationMaster","replaceName":"opName","valuePrefixData":"opCode","type":"select"},{"title":"Operator","id":"operator","type":"select","dataFrom":"marketing.empMaster","replaceName":"employeeName"},{"title":"Start Time","id":"startTime"},{"title":"End Time","id":"endTime"},{"title":"Plan Qty","id":"planQty"},{"title":"Qty","id":"acceptedQty"},{"title":"Rejection Qty","id":"rejectionQty"},{"title":"RW Qty","id":"rwQty"}],"page":{"link":"report/productionEntryReport/list","name":"list","templateUrl":"template/defaultView.html","controller":"productionEntryReportCtrl","actions":{"downloadExcel":true,"add":false,"edit":false,"delete":false,"printView":false}},"services":{"list":{"url":"api/productionEntry/data/{{YEAR}}","method":"GET"}}},"toolHistoryCard":{"id":"toolHistoryCard","title":"Tool History Card","filterView":{"title":"Filter","data":{"toolNo":null,"partNo":null,"frmDate":null,"toDate":null},"fields":[{"title":"Tool Name","id":"toolNo","type":"select","dataFrom":"production.toolMaster","replaceName":"toolName"},{"title":"Part No","id":"partNo","dataFrom":"marketing.partMaster","replaceName":"partNo","type":"select"},{"title":"From Date","id":"frmDate","type":"input","inputType":"date"},{"title":"To Date","id":"toDate","type":"input","inputType":"date"}]},"listView":[{"title":"Date","id":"date","type":"input","inputType":"date"},{"title":"Tool Name","id":"toolNo","type":"select","dataFrom":"production.toolMaster","replaceName":"toolName"},{"title":"Part No","id":"partNo","dataFrom":"marketing.partMaster","replaceName":"partNo","type":"select"},{"title":"Qty","id":"qty"},{"title":"Cummulative Qty","id":"cummulativeQty"},{"title":"Activity","id":"activity","dataFrom":"production.operationMaster","replaceName":"opName","valuePrefixData":"opCode"}],"page":{"link":"report/productionEntryReport/list?type=toolHistoryCard","name":"list","templateUrl":"template/defaultView.html","controller":"productionEntryReportCtrl","actions":{"downloadExcel":true,"add":false,"edit":false,"delete":false,"printView":false}},"services":{"list":{"url":"api/productionEntry/data","method":"GET"}}},"machineRunningTime":{"id":"machineRunningTime","title":"Machine Running Time","filterView":{"title":"Filter","data":{"machineNo":null,"frmDate":null,"toDate":null},"fields":[{"title":"Machine Name","id":"machineNo","type":"select","dataFrom":"production.machineMaster","replaceName":"machineName"},{"title":"From Date","id":"frmDate","type":"input","inputType":"date"},{"title":"To Date","id":"toDate","type":"input","inputType":"date"}]},"listView":[{"title":"Date","id":"date","type":"input","inputType":"date"},{"title":"Machine No","id":"machineNo","type":"select","dataFrom":"production.machineMaster","replaceName":"machineName"},{"title":"Year","id":"machineNo","type":"select","dataFrom":"production.machineMaster","replaceName":"yop"},{"title":"Time On","id":"startTime"},{"title":"Time Off","id":"endTime"},{"title":"Running Time","id":"runningTime"},{"title":"Cum Running Time","id":"cumRunningTime"}],"page":{"link":"report/productionEntryReport/list?type=machineRunningTime","name":"list","templateUrl":"template/defaultView.html","controller":"productionEntryReportCtrl","actions":{"downloadExcel":true,"add":false,"edit":false,"delete":false,"printView":false}},"services":{"list":{"url":"api/productionEntry/data","method":"GET"}}},"empPerformanceReport":{"id":"empPerformanceReport","title":"Employee Performance Report","filterView":{"title":"Filter","data":{"partNo":null,"frmDate":null,"toDate":null},"fields":[{"title":"Part No","id":"partNo","type":"select","dataFrom":"marketing.partMaster","replaceName":"partName"},{"title":"Employee Name","id":"operator","type":"select","dataFrom":"marketing.empMaster","replaceName":"employeeName"},{"title":"From Date","id":"frmDate","type":"input","inputType":"date"},{"title":"To Date","id":"toDate","type":"input","inputType":"date"}]},"listView":[{"title":"Date","id":"date","type":"input","inputType":"date"},{"title":"Employee Name","id":"operator","type":"select","dataFrom":"marketing.empMaster","replaceName":"employeeName"},{"title":"Part No","id":"partNo","dataFrom":"marketing.partMaster","replaceName":"partNo","type":"select"},{"title":"Operation","id":"operationTo","dataFrom":"production.operationMaster","replaceName":"opName","valuePrefixData":"opCode","type":"select"},{"title":"Start Time","id":"startTime"},{"title":"End Time","id":"endTime"},{"title":"Plan Qty","id":"planQty"},{"title":"Qty","id":"acceptedQty"}],"page":{"link":"report/productionEntryReport/list?type=empPerformanceReport","name":"list","templateUrl":"template/defaultView.html","controller":"productionEntryReportCtrl","actions":{"downloadExcel":true,"add":false,"edit":false,"delete":false,"printView":false}},"services":{"list":{"url":"api/productionEntry/data/{{YEAR}}","method":"GET"}}}},"accounts":{"id":"accounts","name":"Accounts","title":"Accounts","icon":"money","customerPaymentInvoice":{"id":"customerPaymentInvoice","title":"Customer Payment - Invoice","masterData":{"invoiceNo":null,"customerCode":null,"date":null,"total":null,"balanceAmount":0,"mapping":[{"amount":null,"date":null,"remark":null}]},"form":{"name":"Customer Payment","id":"customerPayment","fields":{"invoiceNo":{"name":"Invoice No","id":"invoiceNo","type":"select","options":{},"action":"changeMapping","updateData":["customerCode","total","date"],"dataFrom":"marketing.invoice","replaceName":"invoiceNo","valuePrefix":"H-","required":true,"existingCheck":true,"isSingle":true},"customerCode":{"name":"Customer Code","id":"customerCode","type":"select","options":{},"dataFrom":"marketing.customerMaster","replaceName":"customerName","isSingle":true,"isDisable":true},"date":{"name":"Invoice Date","id":"date","type":"span"},"total":{"name":"Total","id":"total","type":"span"},"balanceAmount":{"name":"Balance Amount","id":"balanceAmount","type":"span"}},"mapping":{"name":"Received instalment","fields":{"amount":{"name":"Amount","id":"amount","type":"input","inputType":"number","action":"updateBalanceAmount","required":true},"date":{"name":"Date","id":"date","type":"input","inputType":"date","required":true},"remark":{"name":"Remark","id":"remark","type":"input","inputType":"text"}}}},"listView":[{"title":"Invoice No","id":"invoiceNo","dataFrom":"marketing.invoice","valuePrefix":"H-","replaceName":"invoiceNo","isFilterBy":true,"type":"select","options":{}},{"title":"Customer","id":"customerCode","dataFrom":"marketing.customerMaster","replaceName":"customerName","isFilterBy":true,"type":"select","options":{}},{"title":"Total Amount","id":"total"},{"title":"Balance Amount","id":"balanceAmount"}],"page":{"link":"accounts/customerPaymentInvoice/list","name":"list","templateUrl":"template/defaultView.html","controller":"customerPaymentInvoiceCtrl","actions":{"downloadExcel":true}},"services":{"list":{"url":"api/customerPaymentInvoice/data/{{YEAR}}","method":"GET"}}},"customerPaymentCashBill":{"id":"customerPaymentCashBill","name":"customerPaymentCashBill","title":"Customer Payment - Cash Bill","parentModule":"accounts.customerPaymentInvoice","form":{"fields":{"invoiceNo":{"name":"CashBill No","id":"invoiceNo","options":{},"action":"changeMapping","updateData":["date","customerCode","total"],"dataFrom":"marketing.cashBill","replaceName":"invoiceNo","valuePrefix":"","required":true,"existingCheck":true,"isSingle":true}}},"listView":[{"title":"Cash Bill No","id":"invoiceNo","valuePrefix":"","dataFrom":"marketing.cashBill","replaceName":"invoiceNo","isFilterBy":true,"type":"select","options":{}}],"page":{"link":"accounts/customerPaymentInvoice/list?type=cashBill","name":"list","templateUrl":"template/defaultView.html","controller":"customerPaymentInvoiceCtrl","actions":{"downloadExcel":true}},"services":{"list":{"url":"api/customerPaymentCashBill/data/{{YEAR}}","method":"GET"}}},"suppilerPayment":{"id":"suppilerPayment","title":"Suppiler Payment","masterData":{"grnNo":null,"supplierCode":null,"supplierInvoiceNo":null,"supplierInvoiceDate":null,"invoiceDate":null,"date":null,"total":null,"balanceAmount":0,"mapping":[{"amount":null,"date":null,"remark":null}]},"form":{"name":"Suppiler Payment","id":"suppilerPayment","fields":{"grnNo":{"name":"GRN No","id":"grnNo","type":"select","options":{},"action":"changeMapping","updateData":["supplierCode","supplierInvoiceNo","supplierInvoiceDate","date"],"dataFrom":"store.grnSupplier","replaceName":"grnNo","valuePrefix":"VT-GRN-","required":true,"existingCheck":true,"isSingle":true},"supplierCode":{"name":"Supplier Name","id":"supplierCode","type":"select","options":{},"dataFrom":"purchase.supplierMaster","replaceName":"supplierName","required":true,"isDisable":true,"isSingle":true},"supplierInvoiceNo":{"name":"Supplier Invoice No","id":"supplierInvoiceNo","type":"span"},"supplierInvoiceDate":{"name":"Supplier Invoice Date","id":"supplierInvoiceDate","type":"span"},"date":{"name":"GRN Date","id":"date","type":"span"},"total":{"name":"Total","id":"total","type":"span"},"balanceAmount":{"name":"Balance Amount","id":"balanceAmount","type":"span"}},"mapping":{"name":"Received instalment","fields":{"amount":{"name":"Amount","id":"amount","type":"input","inputType":"number","action":"updateBalanceAmount","required":true},"date":{"name":"Date","id":"date","type":"input","inputType":"date","required":true},"remark":{"name":"Remark","id":"remark","type":"input","inputType":"text"}}}},"listView":[{"title":"GRN No","id":"grnNo","dataFrom":"store.grnSupplier","replaceName":"grnNo","valuePrefix":"VT-GRN-","isFilterBy":true,"type":"select","options":{}},{"title":"Supplier Name","id":"supplierCode","dataFrom":"purchase.supplierMaster","replaceName":"supplierName","isFilterBy":true,"type":"select","options":{}},{"title":"Supplier InvoiceNo No","id":"supplierInvoiceNo","dataFrom":"store.grnSupplier","replaceName":"supplierInvoiceNo","isFilterBy":true,"type":"select","options":{}},{"title":"Total Amount","id":"total"},{"title":"Balance Amount","id":"balanceAmount"}],"page":{"link":"accounts/suppilerPayment/list","name":"list","templateUrl":"template/defaultView.html","controller":"suppilerPaymentCtrl","actions":{"downloadExcel":true}},"services":{"list":{"url":"api/suppilerPayment/data/{{YEAR}}","method":"GET"}}},"subContractorPayment":{"id":"subContractorPayment","title":"Sub Contractor Payment","masterData":{"grnNo":null,"subContractorCode":null,"subContractorDCCode":null,"subContractorDCDate":null,"date":null,"total":null,"balanceAmount":0,"mapping":[{"amount":null,"date":null,"remark":null}]},"form":{"name":"Sub Contractor Payment","id":"subContractorPayment","fields":{"grnNo":{"name":"GRN No","id":"grnNo","type":"select","options":{},"action":"changeMapping","updateData":["subContractorCode","subContractorDCCode","subContractorDCDate","date"],"dataFrom":"store.grnSubContractor","replaceName":"grnNo","valuePrefix":"VT-SC-GRN","required":true,"existingCheck":true,"isSingle":true},"subContractorCode":{"name":"Sub Contractor Name","id":"subContractorCode","type":"select","options":{},"dataFrom":"purchase.subContractorMaster","replaceName":"subContractorName","required":true,"isDisable":true,"isSingle":true},"subContractorDCCode":{"name":"Sub Contractor Invoice No","id":"subContractorDCCode","type":"span"},"subContractorDCDate":{"name":"Sub Contractor Invoice Date","id":"subContractorDCDate","type":"span"},"date":{"name":"GRN Date","id":"date","type":"span"},"total":{"name":"Total","id":"total","type":"span"},"balanceAmount":{"name":"Balance Amount","id":"balanceAmount","type":"span"}},"mapping":{"name":"Received instalment","fields":{"amount":{"name":"Amount","id":"amount","type":"input","inputType":"number","action":"updateBalanceAmount","required":true},"date":{"name":"Date","id":"date","type":"input","inputType":"date","required":true},"remark":{"name":"Remark","id":"remark","type":"input","inputType":"text"}}}},"listView":[{"title":"GRN No","id":"grnNo","dataFrom":"store.grnSupplier","replaceName":"grnNo","valuePrefix":"VT-GRN-","isFilterBy":true,"type":"select","options":{}},{"title":"Sub Contractor Name","id":"subContractorCode","dataFrom":"purchase.subContractorMaster","replaceName":"subContractorName","isFilterBy":true,"type":"select","options":{}},{"title":"Sub Contractor InvoiceNo No","id":"subContractorDCCode","dataFrom":"store.grnSupplier","replaceName":"subContractorDCCode","isFilterBy":true,"type":"select","options":{}},{"title":"Total Amount","id":"total"},{"title":"Balance Amount","id":"balanceAmount"}],"page":{"link":"accounts/subContractorPayment/list","name":"list","templateUrl":"template/defaultView.html","controller":"subContractorPaymentCtrl","actions":{"downloadExcel":true}},"services":{"list":{"url":"api/subContractorPayment/data/{{YEAR}}","method":"GET"}}},"empPayment":{"id":"empPayment","title":"Employee Labor Payment","masterData":{"employeeCode":null,"frmDate":null,"toDate":null,"total":0,"balanceAmount":0,"mapping":[{"id":null,"operationTo":null,"qty":null,"laborCost":null,"totalCost":null,"date":null,"paidStatus":false}]},"form":{"name":"Employee Payment","id":"employeePayment","disableByField":"id","fields":{"employeeCode":{"name":"Employee Name","id":"employeeCode","type":"select","options":{},"action":"addPartMap","updateMapping":true,"updateData":["mapping"],"required":true,"dataFrom":"marketing.empMaster","replaceName":"employeeName","isEditDisable":true},"frmDate":{"name":"From Date","id":"frmDate","type":"input","action":"addPartMap","inputType":"date","isEditDisable":true},"toDate":{"name":"To Date","id":"toDate","type":"input","action":"addPartMap","inputType":"date","isEditDisable":true},"total":{"name":"Total","id":"total","type":"span"},"balanceAmount":{"name":"Balance Amount","id":"balanceAmount","type":"span"}},"mapping":{"name":"Payment","fields":{"id":{"name":"Part No","id":"id","type":"select","options":{},"dataFrom":"marketing.partMaster","replaceName":"partNo","isDisable":true},"partName":{"name":"Part Name","id":"partName","type":"span"},"operationTo":{"name":"Stage","id":"operationTo","type":"select","options":{},"required":true,"dataFrom":"production.operationMaster","replaceName":"opName","valuePrefixData":"opCode","isSingle":true,"isDisable":true},"qty":{"name":"Qty","id":"qty","type":"span"},"laborCost":{"name":"Labor Cost","id":"laborCost","type":"span"},"totalLaborCost":{"name":"Total Labor Cost","id":"totalLaborCost","type":"span"},"date":{"name":"Date","id":"date","type":"input","inputType":"date"},"paidStatus":{"name":"Paid Status","id":"paidStatus","type":"input","action":"updateBalanceAmount","inputType":"checkbox"}},"actions":{"add":false,"delete":false}}},"listView":[{"title":"Employee Name","id":"employeeCode","dataFrom":"marketing.empMaster","replaceName":"employeeName","isFilterBy":true,"type":"select","options":{}},{"title":"From Date","id":"frmDate","type":"input","inputType":"date"},{"title":"To Date","id":"toDate","type":"input","inputType":"date"},{"title":"Total Amount","id":"total"},{"title":"Balance Amount","id":"balanceAmount"}],"page":{"link":"accounts/empPayment/list","name":"list","templateUrl":"template/defaultView.html","controller":"empPaymentCtrl","actions":{"downloadExcel":true}},"services":{"list":{"url":"api/empPayment/data/{{YEAR}}","method":"GET"}}}},"admin":{"id":"admin","name":"Admin","title":"Admin","icon":"cog","settings":{"id":"settings","title":"Settings","masterData":{"companyName":null,"companyLogoUrl":null,"companyAddress":null,"companyMobile":null,"companyEmail":null,"companyGstin":null,"finalStageOpp":null,"forceLoginSite":null,"httpServiceCache":null,"mapping":[{"module":null,"restrictUser":null,"add":null,"edit":null,"delete":null}]},"form":{"name":"Settings","id":"settings","fields":{"companyName":{"name":"Company Name","id":"companyName","type":"input","inputType":"text","required":true},"companyLogoUrl":{"name":"Company Logo Url","id":"companyLogoUrl","type":"input","inputType":"text","required":true},"companyAddress":{"name":"Company Address","id":"companyAddress","type":"input","inputType":"text","required":true},"companyMobile":{"name":"Company Mobile","id":"companyMobile","type":"input","inputType":"text","required":true},"companyEmail":{"name":"Company Email","id":"companyEmail","type":"input","inputType":"text","required":true},"companyGstin":{"name":"Company GSTIN","id":"companyGstin","type":"input","inputType":"text","required":true},"finalStageOpp":{"name":"Operation Final Stage","id":"finalStageOpp","type":"select","options":{},"required":true,"dataFrom":"production.operationMaster","replaceName":"opName","valuePrefixData":"opCode"},"forceLoginSite":{"name":"Force login to site","id":"forceLoginSite","type":"input","inputType":"checkbox"},"httpServiceCache":{"name":"Enable Service Cache","id":"httpServiceCache","type":"input","inputType":"checkbox"}},"mapping":{"name":"Restrict Mapping","fields":{"module":{"name":"Page name","id":"module","type":"select","options":{},"makeFieldOptions":false},"restrictUser":{"name":"Restrict Type","id":"restrictUser","type":"select","options":{},"required":true,"dataFrom":"admin.userTypes","replaceName":"userType"},"add":{"name":"Show Add action","id":"add","type":"input","inputType":"checkbox"},"edit":{"name":"Show Edit action","id":"edit","type":"input","inputType":"checkbox"},"delete":{"name":"Show Delete action","id":"delete","type":"input","inputType":"checkbox"}}}},"listView":[{"title":"Company Name","id":"companyName"}],"page":{"link":"admin/settings/list","name":"list","templateUrl":"template/defaultView.html","controller":"settingsCtrl","actions":{"edit":true}},"services":{"list":{"url":"api/settings/data","method":"GET"}}},"users":{"id":"users","title":"Users","masterData":{"userName":null,"password":null,"userType":null},"form":{"name":"Users","id":"users","fields":{"userName":{"name":"User Name","id":"userName","type":"input","inputType":"text","required":true},"password":{"name":"Password","id":"password","type":"input","inputType":"password","required":true},"userType":{"name":"User Type","id":"userType","type":"select","options":{},"required":true,"dataFrom":"admin.userTypes","replaceName":"userType"}}},"listView":[{"title":"User Name","id":"userName"}],"page":{"link":"admin/users/list","name":"list","templateUrl":"template/defaultView.html","controller":"usersCtrl"},"services":{"list":{"url":"api/users/data","method":"GET"}}},"userTypes":{"id":"userTypes","title":"User Types","masterData":{"userType":null,"desc":null},"form":{"name":"User Types","id":"userTypes","fields":{"userType":{"name":"User Type","id":"userType","type":"input","inputType":"text","required":true},"desc":{"name":"Description","id":"desc","type":"input","inputType":"text","required":true}}},"listView":[{"title":"User Name","id":"userType"}],"page":{"link":"admin/userTypes/list","name":"list","templateUrl":"template/defaultView.html","controller":"userTypesCtrl"},"services":{"list":{"url":"api/userTypes/data","method":"GET"}}},"login":{"id":"login","title":"Login","disableMenu":true,"masterData":{"userName":null,"password":null},"form":{"name":"Login","id":"login","title":"Login","fields":{"userName":{"name":"User Name","id":"userName","type":"input","inputType":"text","required":true},"password":{"name":"Password","id":"password","type":"input","inputType":"password","required":true}},"actions":{"cancel":false}},"page":{"link":"admin/login","name":"add","templateUrl":"template/defaultView.html","controller":"loginCtrl","actions":false}}}}})
    .config(['$routeProvider', 'staticConfig', function($routeProvider, staticConfig) {
        var buildRoute = function(modules) {
            var module,
                buildPage = function(page) {
                    if (page.link) {
                        if (page.controller && page.templateUrl) {
                            $routeProvider.when('/' + page.link, {
                                templateUrl: page.templateUrl,
                                controller: page.controller
                            });
                        }

                    } else {
                        for (var i in page) {
                            buildPage(page[i]);
                        }
                    }
                };
            for (var i in modules) {
                module = modules[i];
                if (module.page) {
                    buildPage(module.page);
                } else if (typeof(module) === 'object') {
                    buildRoute(module);
                }
            }
        };
        $routeProvider
            .otherwise({
                redirectTo: staticConfig.appBaseUrl
            });
        buildRoute(staticConfig.modules);
    }]);
erpApp.directive('alertRol', ['commonFact', 'authFact', function(commonFact, authFact) {
    var appConfig = commonFact.getErpAppConfig();
    var showROL = true;
    var showAlertRol = function($scope) {
        var userType = authFact.isLogin();
        $scope.hideROL = function() {
            showROL = false;
        }
        if (userType) {
            commonFact.defaultActions.getData('marketing.partMaster').then(function(res) {
                var partMaster = res.data;
                commonFact.defaultActions.getData('report.partStock').then(function(res1) {
                    var partStockData = res1.data,
                        partStock = {};
                    for (var i in partStockData) {
                        partStock[partStockData[i].partNo + '-' + partStockData[i].operationTo] = partStockData[i] && partStockData[i] || undefined;
                    }
                    for (var j in partMaster) {
                        var yellowAlert = partMaster[j].rolQtyYellowRage;
                        var redAlert = partMaster[j].rolQtyRedRage;
                        var checkPartStock = partStock[partMaster[j].id + '-' + appConfig.finalStageOpp];

                        if (checkPartStock) {
                            checkPartStock.partName = partMaster[j].partName;
                            if (redAlert >= checkPartStock.partStockQty) {
                                $scope.alertRolContext.partRolRed.push(checkPartStock);
                            } else if (yellowAlert >= checkPartStock.partStockQty) {
                                $scope.alertRolContext.partRolYellow.push(checkPartStock);
                            }
                        }

                    }
                    if (($scope.alertRolContext.partRolRed.length > 0 || $scope.alertRolContext.partRolYellow.length > 0) && showROL) {
                        angular.element('#myModal').modal('show');
                    }
                });
            });
        }
    }
    var alertRolComp = function($scope, element, attrs) {

        $scope.alertRolContext = {};
        $scope.alertRolContext.partRolYellow = [];
        $scope.alertRolContext.partRolRed = [];
        $scope.$on('showAlertRol', function() {
            showAlertRol($scope);
        });
    };
    return {
        restrict: 'E',
        templateUrl: 'template/components/alertRol.html',
        link: alertRolComp
    };
}]);
erpApp.directive('customForm', [function() {
    return {
        restrict: 'E',
        templateUrl: 'template/components/customForm.html'
    };
}]);
erpApp.directive('fileModel', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(changeEvent) {
                var reader = new FileReader();
                reader.onload = function(loadEvent) {
                    scope.$apply(function() {
                        try{
                           modelSetter(scope, JSON.parse(loadEvent.target.result));
                        }
                        catch(err){
                           modelSetter(scope, {});
                        }
                        
                    });
                }
                reader.readAsText(changeEvent.target.files[0]);

            });
        }
    };
}]);
erpApp.directive('filterView', [function() {
    return {
        restrict: 'E',
        templateUrl: 'template/components/filterView.html'
    };
}]);
erpApp.directive('header', ['commonFact', '$location', 'authFact', function(commonFact, $location, authFact) {
    var headerComp = function($scope, element, attrs) {
        var appConfig = commonFact.getErpAppConfig();
        var headerContext = {};
        appConfig.calendarYear = new Date().getMonth() >= 3 ? new Date().getFullYear() : new Date().getFullYear() - 1;
        headerContext.appName = appConfig.appName;
        headerContext.appNavMenus = appConfig.appNavMenus;
        headerContext.modules = appConfig.modules;
        headerContext.dataDownloadUrl = appConfig.dataDownloadUrl;
        headerContext.calendarYear = appConfig.calendarYear;
        headerContext.calendarYearList = [];
        headerContext.isLogin = authFact.isLogin();
        for (var i = 10; i >= 0; i--) {
            var nextYear = parseInt(headerContext.calendarYear - i + 1);

            headerContext.calendarYearList.push({
                optionId: headerContext.calendarYear - i,
                optionName: headerContext.calendarYear - i + '-' + ('' + nextYear).substring(2)
            });
        }
        headerContext.actions = {
            showSubModule: commonFact.defaultActions.showSubModule,
            changeCalendarYear: function(context) {
                appConfig.calendarYear = context.calendarYear;
                $location.path(appConfig.modules.dashboard.page.link);
            }
        };
        $scope.headerContext = headerContext;

    };
    return {
        restrict: 'E',
        templateUrl: 'template/components/header.html',
        link: headerComp
    };
}]);
erpApp.directive('entryInvoice', function() {
    return {
        restrict: 'E',
        templateUrl: 'template/components/entryInvoice.html'
    };
})
erpApp.directive('listView', [function() {
    return {
        restrict: 'E',
        templateUrl: 'template/components/listView.html'
    };
}]);

erpApp.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
erpApp.directive('mappingForm', [function() {
    return {
        restrict: 'E',
        templateUrl: 'template/components/mappingForm.html'
    };
}]);
erpApp.factory('authFact', ['serviceApi', '$window', function(serviceApi, $window) {
    var login = function(context) {
        var usersService = angular.copy(context.appConfig.modules.admin.users.services.list);
        return serviceApi.callServiceApi(usersService).then(function(res) {
            var data = res.data;
            var userDetail;
            for (var i in data) {
                if (data[i].userName === context.data.userName && data[i].password === context.data.password) {
                    userDetail = {
                        userName: data[i].userName,
                        userType: data[i].userType
                    };
                }
            }
            setUserDetail(userDetail);
            return userDetail;
        });
    };
    var setUserDetail = function(userDetail) {
        $window.sessionStorage.setItem('erpUserDetail', JSON.stringify(userDetail));
        return userDetail;
    };
    var getUserDetail = function(context) {
        var userDetail = $window.sessionStorage.getItem('erpUserDetail');
        if (userDetail !== 'undefined') {
            userDetail = JSON.parse(userDetail);
        }
        return userDetail;
    };
    var isLogin = function(context) {
        var userDetail = getUserDetail();
        if (userDetail) {
            return userDetail.userType;
        }
        return false;
    };

    return {
        login: login,
        setUserDetail: setUserDetail,
        getUserDetail: getUserDetail,
        isLogin: isLogin
    };
}]);
erpApp.factory('commonFact', ['staticConfig', 'serviceApi', '$filter', '$location', 'authFact', '$injector', function(staticConfig, serviceApi, $filter, $location, authFact, $injector) {
    var erpAppConfig = staticConfig;
    var erpLoadPrsRes;
    var erpLoadPrs = new Promise(function(resolve, reject) {
        erpLoadPrsRes = resolve;
    });
    var loadErpAppConfig = (function() {
        var userType = authFact.isLogin();
        var settingsService = angular.copy(erpAppConfig.modules.admin.settings.services.list);
        settingsService.url = settingsService.url + '/1';
        return serviceApi.callServiceApi(settingsService).then(function(res) {
            erpAppConfig = angular.extend(erpAppConfig, res.data);
            defaultActions.moduleAccess(erpAppConfig);
            erpLoadPrsRes();
            return erpAppConfig;
        });
    })();

    var initCtrl = function(scope, module, actions) {
        return erpLoadPrs.then(function() {
            var appConfig = getErpAppConfig();
            var context = angular.copy(eval('appConfig.modules.' + module));
            var parentModule;
            var returnPage;
            var returnPromise = [];
            var userType = authFact.isLogin();
            var formPromise;
            var filterViewPromise;
            var mappingPromise;
            var listViewPromise;
            var formPromise;
            if (context.parentModule) {
                parentModule = angular.copy(eval('appConfig.modules.' + context.parentModule));
                context = angular.merge({}, angular.copy(parentModule), context);
            }
            if (!userType && appConfig.forceLoginSite) {
                window.location.hash = '#!/' + appConfig.modules.admin.login.page.link;
                return;
            }
            if (context.disable) {
                window.location.hash = '#!/' + appConfig.modules.dashboard.page.link;
            }
            context.appConfig = appConfig;
            context.actions = angular.extend(angular.copy(defaultActions), actions || {});
            formPromise = context.form && context.actions.updateFields(context, context.form.fields);
            if (formPromise) {
                formPromise && returnPromise.push(formPromise);
                formPromise.then(function() {
                    context.filterView && returnPromise.push(context.actions.updateFields(context, context.filterView.fields));
                    if (context.form && context.form.mapping) {
                        returnPromise.push(context.actions.updateFields(context, context.form.mapping.fields));
                    }
                    returnPromise.push(context.actions.updateFields(context, context.listView));
                });
            } else {
                returnPromise.push(context.actions.updateFields(context, context.listView));
                context.filterView && returnPromise.push(context.actions.updateFields(context, context.filterView.fields));
            }
            scope.$broadcast('showAlertRol');
            return Promise.all(returnPromise).then(function() {
                returnPage = context.actions[context.page.name] && context.actions[context.page.name](context) || true;
                scope.context = context;
                return returnPage;
            });
        });
    };
    var getErpAppConfig = function() {
        return erpAppConfig;
    };
    var defaultActions = {
        add: function(context) {
            context.page.name = 'add';
            context.data = angular.copy(context.masterData);
            if (context.form.autoGenKey) {
                context.actions.setAutoGenKey(context);
            }
            if (context.data.date === null) {
                context.data.date = new Date();
            }
            context.page.editKey = undefined;
            context.page.printView = undefined;
            context.actions.callBackAdd && context.actions.callBackAdd(context);
            return true;
        },
        edit: function(context, key, printView) {
            var serviceconf = this.getServiceConfig(context.services.list, 'GET', key);
            context.page.name = 'edit';
            context.page.printView = printView;
            context.page.editKey = key;

            return serviceApi.callServiceApi(serviceconf).then(function(res) {
                context.data = res.data;
                context.printData = angular.copy(context.data);
                if (context.data['date']) {
                    context.data['date'] = new Date(context.data['date']);
                }
                if (context.data['frmDate']) {
                    context.data['frmDate'] = new Date(context.data['frmDate']);
                }
                if (context.data['toDate']) {
                    context.data['toDate'] = new Date(context.data['toDate']);
                }
                context.actions.callBackEdit && context.actions.callBackEdit(context, key);
                return context;
            });

        },
        printView: function(context, key, printView) {
            this.edit(context, key, printView);
        },
        disable: function(context, id, item) {
            var serviceconf = this.getServiceConfig(context.services.list, 'POST');
            context.actions.callBeforeDelete && context.actions.callBeforeDelete(context, item);
            context.listViewDataMaster[id]['disabled'] = true;
            serviceApi.callServiceApi(serviceconf, context.listViewData[id]);
            context.actions.list(context);
            context.actions.callBackDelete && context.actions.callBackDelete(context, id, item);
        },
        delete: function(context, id, item) {
            var serviceconf = this.getServiceConfig(context.services.list, 'POST');
            context.actions.callBeforeDelete && context.actions.callBeforeDelete(context, id, item);
            serviceApi.callServiceApi(serviceconf, { key: id, delete: 'yes' });
            context.actions.list(context);
            context.actions.callBackDelete && context.actions.callBackDelete(context, id, item);
        },
        list: function(context) {
            var serviceconf = this.getServiceConfig(context.services.list);
            context.page.name = 'list';
            context.currentPage = 0;
            context.pageSize = 10;
            context.filterBy = {};
            context.listViewData = [];
            context.orderByProperty = 'updated';
            return serviceApi.callServiceApi(serviceconf).then(function(res) {
                var listViewData = res.data;
                for (var x in listViewData) {
                    listViewData.hasOwnProperty(x) && !listViewData[x].disabled && context.listViewData.push(listViewData[x])
                }
                context.listViewDataMaster = angular.copy(context.listViewData);
                context.lastData = angular.copy(context.listViewData[context.listViewData.length - 1]);
                context.actions.callBackList && context.actions.callBackList(context);
                return context;
            });
        },
        getPageData: function(context) {
            return $filter('filter')(context.listViewData, context.filterBy, true) || [];
        },
        numberOfPages: function(context) {
            return Math.ceil(context.actions.getPageData(context).length / context.pageSize);
        },
        submit: function(context) {
            var serviceconf = this.getServiceConfig(context.services.list, 'POST');

            return serviceApi.callServiceApi(serviceconf, context.data).then(function() {
                context.actions.list(context);
                context.actions.callBackSubmit && context.actions.callBackSubmit(context);
                return context;
            });

        },
        cancel: function(context) {
            context.actions.list(context);
        },
        getData: function(module, id) {
            var list,
                serviceConf = this.getServiceConfig(module, 'GET', id);
            //Get Part master data
            return serviceApi.callServiceApi(serviceConf);
        },
        updateData: function(module, data, id) {
            var list,
                serviceConf = this.getServiceConfig(module, 'POST', id);
            //Get Part master data
            return serviceApi.callServiceApi(serviceConf, data);
        },
        replaceFieldVal: function(viewData, field) {
            var list,
                serviceConf,
                self = this,
                orgViewDataFieldId = viewData,
                updateField = function(field, fieldData, list) {
                    fieldData = (fieldData && list && list[orgViewDataFieldId] && field.replaceName) ? list[orgViewDataFieldId][field.replaceName] : fieldData;
                    fieldData = field.valuePrefix ? field.valuePrefix + fieldData : fieldData;
                    fieldData = field.valuePrefixData ? list[orgViewDataFieldId][field.valuePrefixData] + ' - ' + fieldData : fieldData;
                    if (self.isFloat(fieldData)) {
                        fieldData = parseFloat(fieldData).toFixed(2);
                    }
                    return fieldData;
                };
            //Get Part master data
            if (field.type === 'select' || field.dataFrom) {
                viewData = field.options && field.options[viewData] && field.options[viewData].optionName || (field.allOptions && field.allOptions[viewData]) && field.allOptions[viewData].optionName || viewData;
            } else if (field.type === 'date' || field.inputType === 'date') {
                viewData = viewData && self.dateFormatChange(viewData) || '';
            } else if (field.inputType === 'password') {
                viewData = 'XXX';
            } else {
                viewData = updateField(field, viewData);
            }
            return viewData;
        },
        matchFilter: function(field, list, context) {
            var returnFlag = false;
            if (context && context.page.name === 'edit') {
                return true;
            }
            for (var i in field.filter) {
                if (typeof(field.filter[i]) === 'object' && field.filter[i].indexOf(list[i]) < 0) {
                    return false;
                } else if (typeof(field.filter[i]) !== 'object' && field.filter[i] != list[i]) {
                    return false;
                } else {
                    returnFlag = true;
                }
            }
            return returnFlag;
        },
        makeOptionsFields: function(context, field) {
            var self = this,
                list;

            field.options = {};
            field.allOptions = {};

            return context.actions.getData(field.dataFrom).then(function(res) {
                list = res.data;
                for (var i in list) {
                    var optionVal = field.optionId && list[i][field.optionId] || list[i]['id'];
                    var optionIdVal = field.optionId && list[i][field.optionId] || list[i]['id'];
                    var optionNameVal = field.valuePrefix && field.valuePrefix || '';
                    optionNameVal += field.valuePrefixData && list[i][field.valuePrefixData] + ' - ' || '';
                    optionNameVal += list[i][field.replaceName] || '';
                    var isCheckExistVal = field.existingCheck && context.listViewDataMaster && context.actions.findObjectByKey(context.listViewDataMaster, field.id, optionIdVal) || false;
                    field.allOptions[optionVal] = list[i];
                    field.allOptions[optionVal]['optionName'] = optionNameVal;
                    field.allOptions[optionVal]['optionId'] = optionIdVal;
                    if ((field.filter === undefined || self.matchFilter(field, list[i], context) === true) &&
                        (!isCheckExistVal || optionIdVal === context.data[field.id])) {
                        field.options[optionVal] = field.allOptions[optionVal];
                    }
                }
                return field;
            });
        },
        addMapping: function(mapping) {
            var newMapping = angular.extend({}, mapping[0]);
            for (var mapKey in newMapping) {
                newMapping[mapKey] = null;
            }
            mapping.push(newMapping);
        },
        removeMapping: function(context, data, key) {
            delete data.splice(key, 1);
            context.actions.callBackRemoveMapping && context.actions.callBackRemoveMapping(context, data, key);
        },
        changeMapping: function(context, data, key, field, fieldMapKey) {
            for (var dataKey in data) {
                if ((field.updateData && field.updateData.indexOf(dataKey) >= 0) || field.updateData === undefined) {
                    if (key === null) {
                        data[dataKey] = context.masterData[dataKey];
                    } else if (key !== undefined && field.options[key][dataKey]) {
                        if (typeof(field.options[key][dataKey]) !== 'object') {
                            data[dataKey] = field.options[key][dataKey];
                        } else if (field.updateMapping) {
                            data[dataKey] = angular.copy(context.masterData[dataKey]);
                            for (var mapKey in field.options[key][dataKey]) {
                                var copyDataMapKey = angular.copy(context.masterData[dataKey][0]);
                                if (field.options[key][dataKey][mapKey] !== null || field.options[key][dataKey][mapKey] !== '') {
                                    data[dataKey][mapKey] = angular.extend(copyDataMapKey, field.options[key][dataKey][mapKey]);
                                    for (var mapFieldKey in context.form.mapping.fields) {
                                        var mapfield = context.form.mapping.fields[mapFieldKey];
                                        if (mapfield.action && context.actions[mapfield.action]) {
                                            if (mapfield.type === 'select') {
                                                context.actions[mapfield.action](context, data[dataKey][mapKey], data[dataKey][mapKey][mapfield.id], mapfield, mapKey);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            field.callBack !== false && context.actions.callBackChangeMapping && context.actions.callBackChangeMapping(context, data, key, field, fieldMapKey);
        },
        setAutoGenKey: function(context) {
            var lastDataKey = context.lastData ? context.lastData[context.form.autoGenKey] : undefined;
            lastDataKey = lastDataKey ? parseInt(lastDataKey) + 1 : context.form.autoGenValStart ? context.form.autoGenValStart : 1;
            context.data[context.form.autoGenKey] = lastDataKey;
            context.actions.callBackSetAutoGenKey && context.actions.callBackSetAutoGenKey(context);
        },
        dateFormatChange: function(dateValue) {
            dateValue = new Date(dateValue);
            return dateValue.getDate() + '-' + (dateValue.getMonth() + 1) + '-' + dateValue.getFullYear();
        },
        timeFormatChange: function(value) {
            value = new Date(value);
            return value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
        },
        getOperationFromFlow: function(context, field, restriction) {
            var self = this,
                partNo = restriction.partNo || context.data.partNo,
                limit = 0;
            var returnPromise = [];
            var partStockPromise;
            if (partNo) {
                context.actions.makeOptionsFields(context, field);
                var localOptions = field.options;
                partStockPromise = context.actions.getData('production.flowMaster').then(function(res) {
                    var flowMasterData = res.data,
                        flowMasterVal;
                    field.options = {};
                    for (var i in flowMasterData) {
                        if (flowMasterData[i].partNo === partNo) {
                            var flowMapPromise = context.actions.mergeOprFlowMap(context, flowMasterData[i].mapping).then(function(flowMasterMap) {
                                var startWith = context.actions.findObjectByKey(flowMasterMap, 'id', restriction.startWith);
                                flowMasterMap = context.actions.objectSort(flowMasterMap, 'opCode');
                                for (var j in flowMasterMap) {
                                    flowMasterVal = flowMasterMap[j];
                                    if ((!restriction.limit || limit < restriction.limit) &&
                                        (!restriction.startWith || (startWith.opCode < flowMasterVal.opCode)) &&
                                        (restriction.filter === undefined || self.matchFilter(restriction, flowMasterVal) === true)) {
                                        limit++;
                                        field.options[' ' + flowMasterVal.id] = localOptions[flowMasterVal.id];
                                    }
                                }
                            });
                            returnPromise.push(flowMapPromise);
                        }
                    }
                });
            }
            returnPromise.push(partStockPromise);

            return Promise.all(returnPromise);
        },
        updatePartStock: function(context) {
            var self = this;
            var serviceconf = self.getServiceConfig('report.partStock');
            var returnPromise = [];
            var partStockPromise = serviceApi.callServiceApi(serviceconf).then(function(res) {
                var partStockData = res.data,
                    partStock = {};
                for (var i in partStockData) {
                    partStock[partStockData[i].partNo + '-' + partStockData[i].operationFrom + '-' + partStockData[i].operationTo] = partStockData[i] && partStockData[i] || undefined;
                    partStock[partStockData[i].partNo + '-' + partStockData[i].operationTo] = partStockData[i] && partStockData[i] || undefined;
                }
                var existingStock = partStock[context.data.partNo + '-' + context.data.operationFrom + '-' + context.data.operationTo];
                var partStockQty = existingStock ? parseInt(existingStock.partStockQty) + parseInt(context.data.acceptedQty) : parseInt(context.data.acceptedQty);
                if (context.updateCurStock === undefined || context.updateCurStock) {
                    var data = {
                        id: existingStock && existingStock.id || undefined,
                        partNo: context.data.partNo,
                        partStockQty: partStockQty,
                        operationFrom: context.data.operationFrom,
                        operationTo: context.data.operationTo
                    }
                    serviceconf = serviceconf = existingStock && self.getServiceConfig('report.partStock', 'POST') || self.getServiceConfig('report.partStock', 'POST');
                    returnPromise.push(serviceApi.callServiceApi(serviceconf, data).then(function() {
                        context.actions.getPartStock(context);
                    }));
                }

                var existingPrevStock = partStock[context.data.partNo + '-' + context.data.operationFrom];
                if (existingPrevStock && (context.updatePrevStock === undefined || context.updatePrevStock)) {
                    var existPartStockQty = parseInt(context.data.acceptedQty);
                    existPartStockQty += parseInt(context.data.rejectionQty) || 0;
                    existPartStockQty += parseInt(context.data.rwQty) || 0;
                    existPartStockQty = parseInt(existingPrevStock.partStockQty) - parseInt(existPartStockQty);
                    data = {
                        id: existingPrevStock.id,
                        partNo: context.data.partNo,
                        partStockQty: existPartStockQty,
                        operationFrom: existingPrevStock.operationFrom,
                        operationTo: existingPrevStock.operationTo
                    }
                    serviceconf = self.getServiceConfig('report.partStock', 'POST');
                    returnPromise.push(serviceApi.callServiceApi(serviceconf, data).then(function() {
                        context.actions.getPartStock(context);
                    }));
                }
            });
            returnPromise.push(partStockPromise);

            return Promise.all(returnPromise);
        },
        updateSCStock: function(context) {
            var self = this;
            var serviceconf = self.getServiceConfig('report.subContractorStock');
            var returnPromise = [];
            var partStockPromise = serviceApi.callServiceApi(serviceconf).then(function(res) {
                var scStockData = res.data,
                    scStock = {};
                for (var i in scStockData) {
                    scStock[scStockData[i].partNo + '-' + scStockData[i].operationFrom + '-' + scStockData[i].operationTo] = scStockData[i] && scStockData[i] || undefined;
                    scStock[scStockData[i].partNo + '-' + scStockData[i].operationTo] = scStockData[i] && scStockData[i] || undefined;
                }
                var existingStock = scStock[context.data.partNo + '-' + context.data.operationFrom + '-' + context.data.operationTo];
                var partStockQty = existingStock ? parseInt(existingStock.partStockQty) + parseInt(context.data.acceptedQty) : parseInt(context.data.acceptedQty);
                var data = {
                    id: existingStock && existingStock.id || undefined,
                    partNo: context.data.partNo,
                    subContractorCode: context.data.subContractorCode,
                    partStockQty: partStockQty,
                    operationFrom: context.data.operationFrom,
                    operationTo: context.data.operationTo
                }
                serviceconf = self.getServiceConfig('report.subContractorStock', 'POST');
                returnPromise.push(serviceApi.callServiceApi(serviceconf, data));
            });

            returnPromise.push(partStockPromise);

            return Promise.all(returnPromise);
        },
        updatePartTotal: function(context, data, newValue, field, fieldMapKey) {
            var total = 0,
                totalBeforTax = 0,
                qty = newValue,
                operation = data.operationFrom;
            if (data.id &&
                operation &&
                (context.partStock === undefined ||
                    context.partStock[data.id + '-' + operation] === undefined ||
                    context.partStock[data.id + '-' + operation].partStockQty < qty)) {
                data[field.id] = qty = null;
            }
            totalBeforTax = qty * data.rate;
            total = totalBeforTax + (totalBeforTax * (data.gst / 100));
            data.total = parseFloat(total).toFixed(2);
            context.actions.callBackUpdatePartTotal && context.actions.callBackUpdatePartTotal(context, data, newValue, field, fieldMapKey);

        },
        getServiceConfig: function(module, replaceMethod, appendValue) {
            var appConfig = getErpAppConfig();
            var currentYear = new Date().getMonth() >= 3 ? new Date().getFullYear() : new Date().getFullYear() - 1;
            var serviceConfig = angular.copy(typeof(module) !== 'object' ? eval('appConfig.modules.' + module + '.services.list') : module);
            serviceConfig.url = serviceConfig.url.replace('{{YEAR}}', appConfig.calendarYear || currentYear);
            serviceConfig.url = appendValue ? serviceConfig.url + '/' + appendValue : serviceConfig.url;
            serviceConfig.method = replaceMethod ? replaceMethod : serviceConfig.method;
            serviceConfig.cache = appConfig.httpServiceCache || false;
            return serviceConfig;
        },
        getPartStock: function(context) {
            var serviceconf = context.actions.getServiceConfig('report.partStock');
            serviceApi.callServiceApi(serviceconf).then(function(res) {
                var partStockData = res.data,
                    partStock = {};
                for (var i in partStockData) {
                    partStock[partStockData[i].partNo + '-' + partStockData[i].operationTo] = partStockData[i] && partStockData[i] || undefined;
                }
                context.partStock = partStock;
            });
        },
        getSCStock: function(context) {
            var serviceconf = context.actions.getServiceConfig('report.subContractorStock');
            return serviceApi.callServiceApi(serviceconf).then(function(res) {
                var scStockData = res.data,
                    scStock = {};
                for (var i in scStockData) {
                    scStock[scStockData[i].partNo + '-' + scStockData[i].operationFrom] = scStockData[i] && scStockData[i] || undefined;
                }
                context.partStock = scStock;
                return scStock;
            });
        },
        objectSort: function(obj, sortBy) {
            function compare(a, b) {
                if (a[sortBy] < b[sortBy])
                    return -1;
                if (a[sortBy] > b[sortBy])
                    return 1;
                return 0;
            }

            return obj.sort(compare);
        },
        viewFilterBy: function(context, list) {
            var self = this;
            if (!list.selectedFilterBy) {
                delete context.filterBy[list.id];
            } else {
                if (list.type === 'date' || list.inputType === 'date') {
                    context.filterBy[list.id] = new Date(list.selectedFilterBy).toISOString();
                } else {
                    context.filterBy[list.id] = list.selectedFilterBy;
                }
            }
        },
        getFlowMaster: function(context) {
            var serviceconf = this.getServiceConfig('production.flowMaster');
            context.flowMasterData = {};
            context.flowMasterByPart = {};

            serviceApi.callServiceApi(serviceconf).then(function(res) {
                var flowMasterData = res.data,
                    prevOpp;

                context.flowMasterData = flowMasterData;
                for (var i in flowMasterData) {
                    for (var j in flowMasterData[i].mapping) {
                        context.flowMasterByPart[flowMasterData[i].partNo + '-' + flowMasterData[i].mapping[j].id] = flowMasterData[i].mapping[j];
                    }
                }
            });

        },
        mergeOprFlowMap: function(context, flowMap) {
            var optionsPromiseResolve, optionsPromise = new Promise(function(resolve, reject) {
                optionsPromiseResolve = resolve;
            });

            context.actions.getData('production.operationMaster').then(function(res) {
                for (var i in flowMap) {
                    flowMap[i] = res.data[flowMap[i].id];
                    flowMap[i].opCode = parseInt(res.data[flowMap[i].id].opCode);
                }
                optionsPromiseResolve(flowMap);
            });
            return optionsPromise;
        },
        getOperations: function(context) {
            var serviceconf = this.getServiceConfig('production.operationMaster');
            context.operationsData = {};

            serviceApi.callServiceApi(serviceconf).then(function(res) {
                context.operationsData = res.data;
            });

        },
        isCheckExistField: function(context, data, value, field) {
            if (context.listViewData && context.actions.findObjectByKey(context.listViewData, field.id, value)) {
                data[field.id] = null;
            }
        },
        findObjectByKey: function(array, key, value) {
            var isExist = false;
            for (var i = 0; i < array.length; i++) {
                if (typeof(key) === 'object') {
                    for (var j in key) {
                        if ((!isExist || typeof(isExist) === 'object') && array[i][j] === key[j]) {
                            isExist = array[i];
                        }
                    }
                } else if (array[i][key] === value) {
                    isExist = array[i];
                }
            }
            return isExist;
        },
        updateGstPart: function(context, data, newValue, field, fieldMapKey) {
            var acceptedQtyField = context.form.mapping.fields['acceptedQty'];
            var cgstField = context.form.mapping.fields['cgst'];
            var sgstField = context.form.mapping.fields['sgst'];
            if (cgstField && sgstField) {
                if (newValue > 0) {
                    data[cgstField.id] = parseInt(newValue) / 2;
                    data[sgstField.id] = parseInt(newValue) / 2;
                } else {
                    data[cgstField.id] = 0;
                    data[sgstField.id] = 0;
                }
            }
            context.actions.updatePartTotal(context, data, data[acceptedQtyField.id], acceptedQtyField, fieldMapKey);
        },
        updateGstRM: function(context, data, newValue, field, fieldMapKey) {
            var acceptedQtyField = context.form.mapping.fields['acceptedQty'];
            var cgstField = context.form.mapping.fields['gst'];
            var sgstField = context.form.mapping.fields['sgst'];
            if (cgstField && sgstField) {
                if (newValue > 0) {
                    data[cgstField.id] = parseInt(newValue) / 2;
                    data[sgstField.id] = parseInt(newValue) / 2;
                } else {
                    data[cgstField.id] = 0;
                    data[sgstField.id] = 0;
                }
            }
            context.actions.updateRmTotal(context, data, data[acceptedQtyField.id], acceptedQtyField, fieldMapKey);
        },
        updateFields: function(context, fields) {
            var fields = fields;
            var returnPromise = [];
            for (var i in fields) {
                if (fields[i].dataFrom && (fields[i].makeFieldOptions === undefined || fields[i].makeFieldOptions)) {
                    returnPromise.push(context.actions.makeOptionsFields(context, fields[i]));
                }
            }
            return Promise.all(returnPromise);
        },
        showSubModule: function(module) {
            var subModules = {};

            for (var i in module) {
                if (i !== 'name' && i !== 'title' && i !== 'icon' && i !== 'page' && i !== 'id') {
                    subModules[i] = module[i];
                }
            }
            return subModules;
        },
        moduleAccess: function(erpAppConfig) {
            var userType = authFact.isLogin();
            if (userType !== 'ADMIN') {
                for (var i in erpAppConfig.mapping) {
                    var map = erpAppConfig.mapping[i];
                    var module = eval('erpAppConfig.modules.' + map.module) || {};
                    if (!userType || (userType && map.restrictUser !== userType)) {
                        module.disable = map.restrictUser && true;
                    }
                    if (module.page) {
                        module.page.actions = {
                            print: true
                        };
                        module.page.actions.add = map.restrictUser === userType && map['add'] || false;
                        module.page.actions.edit = map.restrictUser === userType && map['edit'] || false;
                        module.page.actions.delete = map.restrictUser === userType && map['delete'] || false;
                    }
                }
            }
        },
        isActionAccess: function(module, action) {
            var erpAppConfig = getErpAppConfig();
            var userType = authFact.isLogin();
            if (!userType !== 'ADMIN' && erpAppConfig.pageAccess && erpAppConfig.pageAccess[module]) {
                if (!userType || (userType && (erpAppConfig.pageAccess[module].restrictUser !== userType || !erpAppConfig.pageAccess[module][action]))) {
                    return false;
                }
            }
            return true;
        },
        isFloat: function(n) {
            return Number(n) === n && n % 1 !== 0;
        },
        downloadExcel: function(context, table) {
            context.filterBy = [];
            var uri = 'data:application/vnd.ms-excel;base64,',
                template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
                base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
                format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) };
            if (!table.nodeType) table = document.getElementById(table);
            var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
            var downloadLink = document.createElement("a");
            downloadLink.href = uri + base64(format(template, ctx));
            downloadLink.download = "downloadExcel.xls";

            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        },
        updatePORmTotal: function(context, data) {
            var total = 0;
            var qty = data['qty'] || 0;
            total = qty * data.rate;
            data.total = parseFloat(total).toFixed(2);
            context.actions.updatePOTotalAmount(context);

        },
        updatePOTotalAmount: function(context) {
            var gst = 0,
                gstTotal = 0,
                total = 0,
                subTotal = 0,
                mapping = context.data.mapping,
                extraAmount = context.data.extraAmount || 0;

            for (var i in mapping) {
                gst += parseFloat(mapping[i].gst / 100);
                gstTotal += (parseFloat(mapping[i].total) * parseFloat(mapping[i].gst / 100));
                subTotal += parseFloat(mapping[i].total);
            }
            gstTotal += (parseFloat(extraAmount * parseFloat(gst / mapping.length)));
            total = subTotal + gstTotal + extraAmount;
            context.data.gstTotal = parseFloat(gstTotal).toFixed(2);

            context.data.subTotal = parseFloat(subTotal).toFixed(2);
            context.data.total = parseInt(total);
        }
    };
    return {
        defaultActions: defaultActions,
        initCtrl: initCtrl,
        getErpAppConfig: getErpAppConfig
    };
}]);
erpApp.service('serviceApi', ['$http', '$cacheFactory', function($http, $cacheFactory) {
    this.callServiceApi = function(serviceConf, inputData) {
        var servicePromise,
        httpCache = $cacheFactory.get('$http');
        if(inputData){
        	serviceConf['data'] = inputData;
        }
        if(serviceConf.method==='POST'){
            httpCache.remove(serviceConf.url);
            if(inputData.id!==undefined){
                httpCache.remove(serviceConf.url + '/' + inputData.id);
            }
        }
        servicePromise = $http(serviceConf);
        return servicePromise;
    };
}]);
erpApp.controller('dashboardCtrl', ['$scope', 'commonFact', function($scope, commonFact) {
    commonFact.initCtrl($scope, 'dashboard');
}]);
erpApp.controller('databaseUploadCtrl', ['$scope', 'commonFact', 'serviceApi', function($scope, commonFact, serviceApi) {
    var actions = {
        uploadDatabase: function(context) {
            var serviceconf = this.getServiceConfig(context.services.list);
            if(context.data && context.data.databaseUpload && context.data.databaseUpload.tables){
                serviceApi.callServiceApi(serviceconf, context.data.databaseUpload.tables).then(function(){
                    context.message = 'Successfully uploded...';
                    context.alertMessage = undefined;
                });
            }
            else{
                context.alertMessage = 'Failed uploded...';
                context.message = undefined;
            }
            
        }
    };
    commonFact.initCtrl($scope, 'databaseUpload', actions);
}]);
erpApp.controller('loginCtrl', ['$scope', 'commonFact', 'authFact', '$location', function($scope, commonFact, authFact, location) {
    var actions = {
        submit: function(context) {
            authFact.login(context).then(function(userDetail) {
                if (!userDetail || !userDetail.userType) {
                    context.alertMessage = 'Invalid User!!!';
                }
                else{
                	location.path(appConfig.modules.dashboard.page.link);
                	setTimeout(function(){ window.location.reload()}, 500);
                }
            });
        }
    };

    var appConfig = commonFact.getErpAppConfig();
    var context = angular.copy(eval('appConfig.modules.admin.login'));

    if (location.search() && location.search()['type'] === 'logout') {
    	authFact.setUserDetail(undefined);
    	location.search('');
    	location.path(appConfig.modules.dashboard.page.link);
    	setTimeout(function(){ window.location.reload()}, 500);
    }

    context.appConfig = appConfig;
    context.actions = angular.extend(angular.copy(commonFact.defaultActions), actions || {});
    context.actions[context.page.name](context);
    $scope.context = context;
}]);
erpApp.controller('settingsCtrl', ['$scope', 'commonFact', function($scope, commonFact) {
    var actions = {
        callBackList: function(context) {
            var moduleField = context.form.mapping.fields['module'];
            moduleField.options = {};
            moduleField.allOptions = {};
            context.actions.makeModuleOptions(context, context.appConfig.modules, moduleField);
            var adminOption = {
                userType: 'ADMIN',
                desc: 'ADMIN',
                optionName: 'ADMIN',
                optionId: 'ADMIN'
            };
            context.form.mapping.fields['restrictUser'].options['ADMIN'] = adminOption;
        },
        makeModuleOptions: function(context, modules, field, parentModule) {
            for (var i in modules) {
                var optionVal = angular.copy(modules[i]);
                var optionIdVal = parentModule && parentModule.id + '.' + optionVal.id || optionVal.id;
                var optionNameVal = parentModule && '-- ' + optionVal.title || optionVal.title;
                if (i !== 'disable') {
                    field.allOptions[optionIdVal] = optionVal;
                    field.allOptions[optionIdVal]['optionName'] = optionNameVal;
                    field.allOptions[optionIdVal]['optionId'] = optionIdVal;
                    field.options[optionIdVal] = field.allOptions[optionIdVal];

                    if (!optionVal.page) {
                        context.actions.makeModuleOptions(context, context.actions.showSubModule(modules[i]), field, modules[i]);
                    }
                }
            }
        }
    }
    commonFact.initCtrl($scope, 'admin.settings', actions).then(function() {
        if ($scope.context.lastData === undefined) {
            $scope.context.actions.add($scope.context);
        } else {
            $scope.context.actions.edit($scope.context, $scope.context.lastData.id);
        }
    });

}]);
erpApp.controller('usersCtrl', ['$scope', 'commonFact', function($scope, commonFact) {
    var actions = {
        callBackList: function(context) {
            var adminOption = {
                userType: 'ADMIN',
                desc: 'ADMIN',
                optionName: 'ADMIN',
                optionId: 'ADMIN'
            };
            context.form.fields['userType'].options['ADMIN'] = adminOption;
        }
    };
    commonFact.initCtrl($scope, 'admin.users', actions);
}]);
erpApp.controller('userTypesCtrl', ['$scope', 'commonFact', function($scope, commonFact) {
    commonFact.initCtrl($scope, 'admin.userTypes');
}]);
erpApp.controller('customerPaymentInvoiceCtrl', ['$scope', 'commonFact', '$location', function($scope, commonFact, $location) {
    var actions = {
        callBackList: function(context) {
            context.form.mapping.actions = {};
        },
        callBackAdd: function(context) {
            context.actions.makeOptionsFields(context, context.form.fields['invoiceNo']);
            context.data['date'] = null;
        },
        callBackEdit: function(context) {
            for (var i in context.data.mapping) {
                context.data.mapping[i].date = new Date(context.data.mapping[i].date);
            }
            if (context.data.balanceAmount <= 0) {
                context.form.mapping.actions.add = false;
            }
        },
        callBackChangeMapping: function(context, data, key, field) {
            context.data.balanceAmount = context.data.total;
            context.data['date'] = context.actions.dateFormatChange(context.data['date']);
        },
        updateBalanceAmount: function(context, data, key, field) {
            var amount = 0;
            for (var i in context.data.mapping) {
                amount += parseFloat(context.data.mapping[i].amount);
            }
            context.data.balanceAmount = parseFloat(context.data.total) - parseFloat(amount);
            if (context.data.balanceAmount <= 0) {
                context.form.mapping.actions.add = false;
            }
            if (context.data.balanceAmount < 0) {
                context.data.balanceAmount = 0;
                //data.amount = null;
            }
        }
    };

    if ($location.search() && $location.search()['type'] === 'cashBill') {
        commonFact.initCtrl($scope, 'accounts.customerPaymentCashBill', actions);
    } else {
        commonFact.initCtrl($scope, 'accounts.customerPaymentInvoice', actions);
    }


}]);
erpApp.controller('empPaymentCtrl', ['$scope', 'commonFact', '$location', function($scope, commonFact, $location) {
    var actions = {
        callBackAdd: function(context) {
            context.data['toDate'] = new Date();
        },
        getProductionEntry: function(context) {
            var frmDate = context.data.frmDate;
            var toDate = context.data.toDate;
            var filterOperator = context.data.employeeCode;
            var empPaidLast = context.actions.getEmpPaymentLastPaid(context);
            frmDate = (!frmDate || (empPaidLast > frmDate)) ? empPaidLast : frmDate;
            console.log(frmDate);
            return context.actions.getData('report.productionEntryReport').then(function(res) {
                var productionEntry = res.data;
                var productionEntryList = {};
                for (var i in productionEntry) {
                    for (var j in productionEntry[i].mapping) {
                        var date = new Date(productionEntry[i].mapping[j].date);
                        var operator = productionEntry[i].mapping[j].operator;

                        if ((!filterOperator || (operator === filterOperator)) && (!frmDate || (frmDate && new Date(frmDate) <= date)) && (!toDate || toDate && new Date(toDate) >= date)) {
                            var objKey = productionEntry[i].mapping[j].operator + '-' + productionEntry[i].partNo + '-' + productionEntry[i].mapping[j].operationTo;
                            var qty = parseInt(productionEntry[i].mapping[j].acceptedQty) || 0;
                            if (productionEntryList[objKey]) {
                                qty += productionEntryList[objKey].qty;
                            }

                            var details = {
                                partNo: productionEntry[i].partNo,
                                operationTo: productionEntry[i].mapping[j].operationTo,
                                operator: productionEntry[i].mapping[j].operator,
                                qty: qty,
                                date: productionEntry[i].mapping[j].date
                            };
                            productionEntryList[objKey] = details;

                        }
                    }
                }
                return productionEntryList;
            });

        },
        getEmpPaymentLastPaid: function(context) {
            var listViewData = angular.copy(context.listViewDataMaster);
            var filterFrmDate = null;
            var filterOperator = context.data.employeeCode;

            for (var i in listViewData) {
                var operator = listViewData[i].employeeCode;
                var toDate = listViewData[i].toDate;
                if (!filterOperator || (operator === filterOperator) && (!filterFrmDate || (filterFrmDate <= new Date(toDate)))) {
                    filterFrmDate = new Date(toDate);
                }
            }
            filterFrmDate && filterFrmDate.setDate(filterFrmDate.getDate() + 1);
            return filterFrmDate;
        },
        callBackEdit: function(context) {
            for (var i in context.data.mapping) {
                context.data.mapping[i].date = new Date(context.data.mapping[i].date);
            }
            if (context.data.balanceAmount <= 0) {
                context.form.mapping.actions.add = false;
            }
        },
        addPartMap: function(context, data) {
            context.actions.changeMapping(context, data, data.employeeCode, context.form.fields['employeeCode']);
        },
        callBackChangeMapping: function(context, data, key, field, fieldMapKey) {
            context.actions.updatePartMap(context, data, key, field, fieldMapKey);
        },
        updatePartMap: function(context, data, key, field, fieldMapKey) {

            context.actions.getProductionEntry(context).then(function(productionEntryList) {
                var total = 0;
                var employeeCode = context.data.employeeCode;
                var newMapData = [];
                newMapData = context.data.mapping.filter(function(data) {
                    var mapFindKey = employeeCode + '-' + data.id + '-' + data.operationTo;
                    if (productionEntryList[mapFindKey] && productionEntryList[mapFindKey].qty > 0) {
                        data.totalLaborCost = parseInt(productionEntryList[mapFindKey].qty * data.laborCost);
                        data.qty = productionEntryList[mapFindKey].qty;
                        total += data.totalLaborCost;
                        return true;
                    }
                });
                context.data.mapping = newMapData;
                context.data.total = total;
                context.data.balanceAmount = context.data.total;
            });

        },
        updateBalanceAmount: function(context, data, key, field) {
            var amount = context.data.balanceAmount;
            if (data.paidStatus) {
                amount -= parseInt(data.totalLaborCost);
            } else {
                amount += parseInt(data.totalLaborCost);
            }
            data.date = new Date();
            context.data.balanceAmount = amount;
        }
    };

    commonFact.initCtrl($scope, 'accounts.empPayment', actions);

}]);
erpApp.controller('subContractorPaymentCtrl', ['$scope', 'commonFact', '$location', function($scope, commonFact, $location) {
    var actions = {
        callBackList: function(context){
            context.form.mapping.actions = {};
        },
        callBackAdd: function(context) {
            context.actions.makeOptionsFields(context, context.form.fields['grnNo']);
        },
        callBackEdit: function(context) {
            for (var i in context.data.mapping) {
                context.data.mapping[i].date = new Date(context.data.mapping[i].date);
            }
            if(context.data.balanceAmount <= 0){
                context.form.mapping.actions.add = false;
            }
        },
        callBackChangeMapping: function(context, data, key, field) {
            var total = 0;
            var grnMap = field.options[context.data.grnNo];
            for(var i in grnMap.mapping){
                total += parseFloat(grnMap.mapping[i].total);
            }
            context.data.total = total;
            context.data.subContractorDCDate = context.actions.dateFormatChange(context.data.subContractorDCDate);
            context.data.balanceAmount = context.data.total;
        },
        updateBalanceAmount: function(context, data, key, field) {
            var amount = 0;
            for (var i in context.data.mapping) {
                amount += parseFloat(context.data.mapping[i].amount);
            }
            context.data.balanceAmount = parseFloat(context.data.total) - parseFloat(amount);
            if(context.data.balanceAmount <= 0){
                context.form.mapping.actions.add = false;
            }
            if(context.data.balanceAmount < 0){
                context.data.balanceAmount = 0;
            }
        }
    };

    commonFact.initCtrl($scope, 'accounts.subContractorPayment', actions);

}]);
erpApp.controller('suppilerPaymentCtrl', ['$scope', 'commonFact', '$location', function($scope, commonFact, $location) {
    var actions = {
        callBackList: function(context) {
            context.form.mapping.actions = {};
        },
        callBackAdd: function(context) {
            context.actions.makeOptionsFields(context, context.form.fields['grnNo']);
        },
        callBackEdit: function(context) {
            for (var i in context.data.mapping) {
                context.data.mapping[i].date = new Date(context.data.mapping[i].date);
            }
            if (context.data.balanceAmount <= 0) {
                context.form.mapping.actions.add = false;
            }
        },
        callBackChangeMapping: function(context, data, key, field) {
            var total = 0;
            var grnMap = field.options[context.data.grnNo];
            context.data.total = grnMap.total;
            context.data.supplierInvoiceDate = context.actions.dateFormatChange(context.data.supplierInvoiceDate);
            context.data.balanceAmount = context.data.total;
        },
        updateBalanceAmount: function(context, data, key, field) {
            var amount = 0;
            for (var i in context.data.mapping) {
                amount += parseFloat(context.data.mapping[i].amount);
            }
            context.data.balanceAmount = parseFloat(context.data.total) - parseFloat(amount);
            if (context.data.balanceAmount <= 0) {
                context.form.mapping.actions.add = false;
            }
            if (context.data.balanceAmount < 0) {
                context.data.balanceAmount = 0;
            }
        }
    };

    commonFact.initCtrl($scope, 'accounts.suppilerPayment', actions);

}]);
erpApp.controller('customerMasterCtrl', ['$scope', 'commonFact', function($scope, commonFact) {
    commonFact.initCtrl($scope, 'marketing.customerMaster');
}]);
erpApp.controller('empMasterCtrl', ['$scope', 'commonFact', function($scope, commonFact) {
    var actions = {
        callBackChangeMapping: function(context, mappingData, key, field, fieldMapKey) {

        },
        updateStage: function(context, mappingData, key, field, _this) {
            var restriction = {
                partNo: mappingData.id
            };
            field.options = {};
            context.actions.getOperationFromFlow(context, field, restriction);
        },
        callBackEdit: function(context) {
            context.data.mapping = !context.data.mapping && context.masterData.mapping || context.data.mapping;
        }
    };
    commonFact.initCtrl($scope, 'marketing.empMaster', actions);
}]);
erpApp.controller('invoiceCtrl', ['$scope', 'commonFact', '$location', function($scope, commonFact, $location) {
    var orgItemVal = null,
        delMapItemVal = [],
        actions = {
            callBackList: function(context) {
                context.actions.getPartStock(context);
                orgItemVal = null;
                delMapItemVal = [];
            },
            callBackSetAutoGenKey: function(context) {
                var year = context.appConfig.calendarYear;
                context.data[context.form.autoGenKey] = context.data[context.form.autoGenKey] + '/' + year + '-' + ('' + parseInt(year + 1)).substring(2);
            },
            callBackChangeMapping: function(context, data, key, field) {
                context.actions.getPartStockDetail(context, data, key, field);
                orgItemVal.mapping = angular.copy(context.data.mapping);
            },
            callBackRemoveMapping: function(context, data, key) {
                if (context.page.name === 'edit') {
                    delMapItemVal.push(orgItemVal.mapping[key]);
                }
                delete orgItemVal.mapping.splice(key, 1);
            },
            callBackAdd: function(context) {
                orgItemVal = angular.copy(context.data);
                delMapItemVal = [];
            },
            callBackEdit: function(context) {
                orgItemVal = angular.copy(context.data);
                delMapItemVal = [];
            },
            getPartStockDetail: function(context, data, key, field) {
                var newMapData = [];
                newMapData = context.data.mapping.filter(function(data) {
                    if (context.partStock[data.id + '-' + context.appConfig.finalStageOpp]) {
                        data.operationFrom = context.partStock[data.id + '-' + context.appConfig.finalStageOpp].operationFrom;
                        data.operationTo = context.partStock[data.id + '-' + context.appConfig.finalStageOpp].operationTo;
                    }

                    return (context.partStock && context.partStock[data.id + '-' + context.appConfig.finalStageOpp] && parseInt(context.partStock[data.id + '-' + context.appConfig.finalStageOpp].partStockQty) > 0);
                });
                context.data.mapping = newMapData;
            },
            updateTotal: function(context, data, updateValue, field, fieldKey) {
                var partDetail = context.form.mapping.fields['id'].options[data.id],
                    taxRate = 0,
                    cgst = 0,
                    sgst = 0,
                    totalBeforTax = 0,
                    partStock = 0;

                if (context.partStock[data.id + '-' + context.appConfig.finalStageOpp]) {
                    partStock = parseInt(context.partStock[data.id + '-' + context.appConfig.finalStageOpp].partStockQty);
                    if (context.page.name === 'edit') {
                        partStock += parseInt(orgItemVal.mapping[fieldKey].unit);
                    }
                    data.unit = partStock < data.unit ? null : data.unit;
                }

                totalBeforTax = data.unit * data.rate;

                data.amount = parseFloat(totalBeforTax).toFixed(2);
                data.cgst = partDetail.cgst;
                data.sgst = partDetail.sgst;
                data.taxRate = partDetail.gst;

                context.actions.updateTotalAmount(context);

            },
            updateTotalAmount: function(context) {
                var taxRate = 0,
                    cgst = 0,
                    sgst = 0,
                    taxRateTotal = 0,
                    cgstTotal = 0,
                    sgstTotal = 0,
                    total = 0,
                    subTotal = 0,
                    mapping = context.data.mapping;

                for (var i in mapping) {
                    cgst += mapping[i].cgst;
                    sgst += mapping[i].sgst;
                    taxRate += mapping[i].taxRate;

                    cgstTotal += (parseFloat(mapping[i].amount) * parseFloat(mapping[i].cgst / 100));
                    sgstTotal += (parseFloat(mapping[i].amount) * parseFloat(mapping[i].sgst / 100));
                    taxRateTotal += (parseFloat(mapping[i].amount) * parseFloat(mapping[i].taxRate / 100));
                    subTotal += parseFloat(mapping[i].amount);
                }

                if (context.cashBill === false) {
                    total = subTotal + cgstTotal + sgstTotal;
                    context.data.taxRate = parseInt(taxRate) / mapping.length;
                    context.data.cgst = parseInt(cgst) / mapping.length;
                    context.data.sgst = parseInt(sgst) / mapping.length;
                    context.data.cgstTotal = parseFloat(cgstTotal).toFixed(2);
                    context.data.sgstTotal = parseFloat(sgstTotal).toFixed(2);
                } else {
                    total = subTotal;
                }

                context.data.subTotal = parseFloat(subTotal).toFixed(2);
                context.data.total = Math.round(total);
                if (context.cashBill) {
                    context.actions.updatePreBalance(context);
                }
            },
            updatePreBalance: function(context) {
                var total = parseFloat(context.data.subTotal);
                if (context.data.preBalance) {
                    total = total + parseFloat(context.data.preBalance);
                }
                context.data.total = Math.round(total);
            },
            updateInvocePartStock: function(context) {
                var mapStockUpdate = function(map, key, del) {
                    var data = angular.copy(map);
                    var newContext = angular.copy(context);
                    data.partNo = data.id;
                    if (!del && orgItemVal && orgItemVal.mapping && orgItemVal.mapping[key]) {
                        if (orgItemVal.id) {
                            data.acceptedQty = parseInt(orgItemVal.mapping[key].unit) - parseInt(map.unit);
                        } else {
                            data.acceptedQty = 0 - parseInt(map.unit);
                        }
                    } else {
                        data.acceptedQty = parseInt(map.unit);
                    }
                    newContext.data = data;
                    newContext.updatePrevStock = false;
                    context.actions.updatePartStock(newContext);
                };
                for (var i in context.data.mapping) {
                    mapStockUpdate(context.data.mapping[i], i, false);
                }
                for (var j in delMapItemVal) {
                    mapStockUpdate(delMapItemVal[j], j, true);
                }

            },
            callBackSubmit: function(context) {
                context.actions.updateInvocePartStock(context);
            },
            callBeforeDelete: function(context, id, item) {
                context.data = item;
                context.actions.updateInvocePartStock(context);
            }
        };
    if ($location.search() && $location.search()['type'] === 'cashBill') {
        commonFact.initCtrl($scope, 'marketing.cashBill', actions).then(function() {
            $scope.context.cashBill = true;
        });
    } else {
        commonFact.initCtrl($scope, 'marketing.invoice', actions).then(function() {
            $scope.context.cashBill = false;
        });
    }
}]);
erpApp.controller('partMasterCtrl', ['$scope', 'commonFact', function($scope, commonFact) {
    commonFact.initCtrl($scope, 'marketing.partMaster');
}]);
erpApp.controller('uomMasterCtrl', ['$scope', 'commonFact', function($scope, commonFact) {
    commonFact.initCtrl($scope, 'marketing.uomMaster');
}]);
erpApp.controller('bomCtrl', ['$scope', 'commonFact', function($scope, commonFact) {
	var actions = {
		callBackAdd: function(context){
			context.actions.makeOptionsFields(context, context.form.fields['partNo']);
		},
		callBackEdit: function(context){
			context.actions.callBackAdd(context);
		}
	};
    commonFact.initCtrl($scope, 'production.bom', actions);
}]);
erpApp.controller('flowMasterCtrl', ['$scope', 'commonFact', function($scope, commonFact) {
	var actions = {
		callBackAdd: function(context){
			context.actions.makeOptionsFields(context, context.form.fields['partNo']);
		},
		callBackEdit: function(context){
			context.actions.callBackAdd(context);
		}
	};
    commonFact.initCtrl($scope, 'production.flowMaster', actions);
}]);
erpApp.controller('machineMasterCtrl', ['$scope', 'commonFact', function($scope, commonFact) {

    commonFact.initCtrl($scope, 'production.machineMaster');

}]);
erpApp.controller('materialIssueNoteCtrl', ['$scope', 'commonFact', 'serviceApi', function($scope, commonFact, serviceApi) {
    var orgItemVal = null,
        actions = {
            callBackEdit: function(context) {
                context.actions.callBackAdd(context);
                orgItemVal = angular.copy(context.data);
            },
            callBackAdd: function(context) {
                orgItemVal = null;
                context.actions.getData('report.rmStock').then(function(res) {
                    var rmStockData = res.data,
                        rmStock = [];
                    for (var i in rmStockData) {
                        rmStock.push(rmStockData[i] && rmStockData[i].rmCode || undefined);
                    }
                    context.form.fields['rmCode'] = angular.extend(context.form.fields['rmCode'], {
                        filter: {
                            id: rmStock
                        }
                    });
                    context.actions.makeOptionsFields(context, context.form.fields['rmCode']);
                });

            },
            getPartNo: function(context) {
                if (context.data.rmCode) {
                    context.form.fields['partNo'].filter = {
                        rmCode: context.data.rmCode
                    };
                    context.actions.makeOptionsFields(context, context.form.fields['partNo']);
                }
            },
            getNorms: function(context) {
                var restriction = {
                    partNo: context.data.partNo,
                    filter: {
                        source: ['Supplier']
                    }
                };
                if (context.data.rmCode && context.data.partNo) {
                    context.data.partNorms = null;
                    var serviceconf = context.actions.getServiceConfig('production.bom');
                    context.data.qtyCanMake = null;
                    context.data.issueQty = null;
                    serviceApi.callServiceApi(serviceconf).then(function(res) {
                        var bomData = res.data;
                        for (var i in bomData) {
                            if (bomData[i].partNo === context.data.partNo && bomData[i].rmCode === context.data.rmCode) {
                                context.data.partNorms = bomData[i].partNorms;
                            }
                        }
                    });
                    context.actions.getOperationFromFlow(context, context.form.fields['operationTo'], restriction);
                }
            },
            updateQtyMake: function(context) {
                if (context.data.rmCode) {
                    context.actions.getData('report.rmStock').then(function(res) {
                        var rmStockData = res.data,
                            rmStock = {};
                        for (var i in rmStockData) {
                            rmStock[rmStockData[i].rmCode] = rmStockData[i] && rmStockData[i] || undefined;
                        }
                        if (orgItemVal && orgItemVal.issueQty) {
                            context.form.fields['issueQty'].max = parseInt(orgItemVal.issueQty) + parseInt(rmStock[context.data.rmCode].rmStockQty);
                        } else {
                            context.form.fields['issueQty'].max = rmStock[context.data.rmCode].rmStockQty;
                        }

                        if (context.data.partNorms && context.data.issueQty && context.form.fields['issueQty'].max >= context.data.issueQty) {
                            context.data.qtyCanMake = context.data.issueQty / context.data.partNorms;
                        } else {
                            context.data.qtyCanMake = null;
                        }
                    });
                }
            },
            removeRMStockQty: function(context, del) {
                context.actions.getData('report.rmStock').then(function(res) {
                    var rmStockData = res.data,
                        rmStock = {},
                        rmCode = context.data.rmCode,
                        existingStock = null,
                        removeQty = context.data.issueQty;
                    for (var i in rmStockData) {
                        rmStock[rmStockData[i].rmCode] = rmStockData[i] && rmStockData[i] || undefined;
                    }
                    existingStock = rmStock[rmCode];
                    if (existingStock) {
                        var rmStockQty;
                        if (!del && orgItemVal && orgItemVal.issueQty) {
                            removeQty = parseInt(orgItemVal.issueQty) - parseInt(removeQty);
                            rmStockQty = parseInt(existingStock.rmStockQty) + removeQty;
                        } else if (del) {
                            rmStockQty = parseInt(existingStock.rmStockQty) + parseInt(removeQty);
                        } else {
                            rmStockQty = parseInt(existingStock.rmStockQty) - parseInt(removeQty);
                        }
                        var data = {
                                id: existingStock.id,
                                rmCode: rmCode,
                                rmStockQty: rmStockQty,
                                uomCode: existingStock.uomCode
                            },
                            serviceconf = context.actions.getServiceConfig('report.rmStock', 'POST');
                        serviceApi.callServiceApi(serviceconf, data);
                    }

                })
            },
            callBackSubmit: function(context) {
                var qtyCanMake;
                context.actions.removeRMStockQty(context);

                if (orgItemVal && orgItemVal.issueQty) {
                    qtyCanMake = parseInt(context.data.qtyCanMake) - parseInt(orgItemVal.qtyCanMake);
                    context.data.acceptedQty = qtyCanMake;
                } else {
                    context.data.acceptedQty = context.data.qtyCanMake;
                }
                context.actions.updatePartStock(context);
            },
            callBeforeDelete: function(context, id, item) {
                var qtyCanMake;
                context.data = item;
                context.actions.removeRMStockQty(context, true);
                context.data.acceptedQty = 0 - parseInt(context.data.qtyCanMake);
                context.actions.updatePartStock(context);
            }
        };

    commonFact.initCtrl($scope, 'production.materialIssueNote', actions);
}]);
erpApp.controller('operationMasterCtrl', ['$scope', 'commonFact', function($scope, commonFact) {

    commonFact.initCtrl($scope, 'production.operationMaster');

}]);
erpApp.controller('productionEntryCtrl', ['$scope', 'commonFact', 'serviceApi', function($scope, commonFact, serviceApi) {
    var actions = {
        callBackAdd: function(context) {
            context.page.printViewMapping = false;
            context.finalMapping = 0;
        },
        callBackEdit: function(context) {
            var jobCardField = context.form.fields['jobCardNo'];
            if (!context.page.printView) {
                context.page.printViewMapping = true;
                context.actions.addMapping(context.data.mapping);
                context.finalMapping = context.data.mapping.length - 1;
                jobCardField.filter = {};
                context.actions.makeOptionsFields(context, jobCardField).then(function() {
                    context.actions[jobCardField.action](context, context.data, context.data[jobCardField.id], jobCardField)
                });
            }
        },
        callBackList: function(context) {
            context.actions.getPartStock(context);
            context.actions.getPRQty(context);
            context.actions.getFlowMaster(context);
            context.actions.getOperations(context);
        },
        checkAcceptedQty: function(context, mappingData, value, field, fieldMapkey) {
            var qtyCanMake = 0,
                rejectionQty = mappingData.rejectionQty || 0,
                rwQty = mappingData.rwQty || 0,
                acceptedQty = mappingData.acceptedQty || 0,
                qty = acceptedQty + rejectionQty + rwQty;
            var fullQty;
            var prFrmQtyMap;
            var prFrmToQtyMap;
            var prToQtyMap;
            var stockQty;

            prFrmQtyMap = context.data.jobCardNo + '-' + context.data.partNo + '-' + mappingData.operationFrom + '-frm';
            prToQtyMap = context.data.jobCardNo + '-' + context.data.partNo + '-' + mappingData.operationTo + '-to';
            prFrmToQtyMap = context.data.jobCardNo + '-' + context.data.partNo + '-' + mappingData.operationFrom + '-to';

            if (context.data.partNo && mappingData.operationFrom) {
                if (context.operationsData[mappingData.operationFrom].source === 'Supplier') {
                    qtyCanMake = context.form.fields['jobCardNo'].options[context.data.jobCardNo].qtyCanMake;
                } else if (context.operationsData[mappingData.operationFrom].source === 'Sub-Contractor') {
                    qtyCanMake = context.prQty[context.data.jobCardNo + '-' + context.data.partNo + '-' + context.partStock[context.data.partNo + '-' + mappingData.operationFrom].operationFrom + '-to'].prAcpQty || 0;
                } else {
                    qtyCanMake = context.prQty[prFrmToQtyMap] && context.prQty[prFrmToQtyMap].prAcpQty || 0;
                }
                stockQty = context.partStock[context.data.partNo + '-' + mappingData.operationFrom] && context.partStock[context.data.partNo + '-' + mappingData.operationFrom].partStockQty || 0;
                fullQty = context.prQty[prFrmQtyMap] && parseInt(context.prQty[prFrmQtyMap].prQty) + parseInt(qty) || qty;
            }

            if (qty > stockQty || fullQty > qtyCanMake || (context.prQty[prFrmToQtyMap] && context.prQty[prFrmToQtyMap].prAcpQty < qty)) {
                mappingData[field.id] = null
            }
        },
        callBackChangeMapping: function(context, data, key, field) {
            context.actions.updateOperationFrom(context, data, key, field);
            context.actions.updateOperationTo(context, data, key, field);
        },
        updateOperationFrom: function(context, data, key, field) {
            var prQtyFrmMap;
            var prQtyPrevMap;
            var prQtyToMap;
            var flwMap;
            var jobCard = context.form.fields['jobCardNo'].options[context.data.jobCardNo];
            var jobCardQty = jobCard && jobCard.qtyCanMake;

            if (context.data.jobCardNo) {
                var restriction = {
                        partNo: context.data.partNo
                    },
                    operation = [];
                for (var i in context.partStock) {
                    if (context.partStock[i].partStockQty > 0 && context.data.partNo === context.partStock[i].partNo) {
                        prQtyPrevMap = context.data.jobCardNo + '-' + context.partStock[i].partNo + '-' + context.partStock[i].operationFrom + '-frm';
                        prQtyFrmMap = context.data.jobCardNo + '-' + context.partStock[i].partNo + '-' + context.partStock[i].operationTo + '-frm';
                        prQtyToMap = context.data.jobCardNo + '-' + context.partStock[i].partNo + '-' + context.partStock[i].operationFrom + '-to';
                        flwMap = context.partStock[i].partNo + '-' + context.partStock[i].operationTo;

                        if ((!context.prQty[prQtyFrmMap] &&
                                (!context.partStock[i].operationFrom ||
                                    (context.prQty[prQtyPrevMap] && context.prQty[prQtyPrevMap].prQty > 0))) ||
                            (context.prQty[prQtyFrmMap] && context.prQty[prQtyFrmMap].prQty < jobCardQty) ||
                            (context.flowMasterByPart[flwMap] && context.flowMasterByPart[flwMap].source === "Sub-Contractor" && context.prQty[prQtyToMap])) {
                            operation.push(context.partStock[i].operationTo);
                        }
                    }
                }
                restriction.filter = {
                    id: operation
                }
                context.actions.getOperationFromFlow(context, context.form.mapping.fields['operationFrom'], restriction);
            }
        },
        updateOperationTo: function(context, mappingData, key, field) {
            if (context.data.jobCardNo) {
                var partNo = context.data.partNo,
                    restriction = {
                        partNo: partNo
                    },
                    operation = [];
                var jobCard = context.form.fields['jobCardNo'].options[context.data.jobCardNo];
                var jobCardQty = jobCard && jobCard.qtyCanMake;

                if (mappingData.operationFrom) {
                    restriction = angular.extend(restriction, {
                        limit: 1,
                        startWith: mappingData.operationFrom
                    });
                }

                context.actions.getOperationFromFlow(context, context.form.mapping.fields['operationTo'], restriction).then(function() {
                    var options = context.form.mapping.fields['operationTo'].options;
                    var firstOption = options[Object.keys(options)[0]];
                    if (firstOption && firstOption.source === 'Sub-Contractor') {
                        context.form.mapping.fields['operationTo'].options = {};
                    }
                });
            }
        },
        updateToolNo: function(context, mappingData) {
            mappingData.toolNo = context.data.partNo && mappingData.operationTo && context.flowMasterByPart[context.data.partNo + '-' + mappingData.operationTo].toolNo || null;
        },
        calculatePlanQty: function(context, mappingData) {
            var startDate = mappingData.startTime;
            var endDate = mappingData.endTime;
            var timeDiff = endDate - startDate;
            var palnQtyPerHr = context.data.partNo && mappingData.operationTo && context.flowMasterByPart[context.data.partNo + '-' + mappingData.operationTo].palnQtyPerHr || 1;
            mappingData.planQty = timeDiff * palnQtyPerHr;
        },
        updateMaterialIssue: function(context, replaceData, key) {
            var jobCard = context.form.fields['jobCardNo'].options[context.data.jobCardNo];
            var jobCardQty = jobCard && jobCard.qtyCanMake;
            jobCard.status = 1;
            context.actions.updateData('production.materialIssueNote', jobCard);
        },
        getPRQty: function(context) {
            context.prQty = {};
            return context.actions.getData('production.productionEntry').then(function(res) {
                var listViewData = res.data;
                for (var i in listViewData) {
                    for (var j in listViewData[i].mapping) {
                        var prFrmQty = 0;
                        var prToQty = 0;
                        var prQty = 0;
                        var prFrmAcpQty = 0;
                        var prToAcpQty = 0;
                        var prFrmQtyMap;
                        var prToQtyMap;
                        prFrmQtyMap = listViewData[i].jobCardNo + '-' + listViewData[i].partNo + '-' + listViewData[i].mapping[j].operationFrom + '-frm';
                        prToQtyMap = listViewData[i].jobCardNo + '-' + listViewData[i].partNo + '-' + listViewData[i].mapping[j].operationTo + '-to';
                        prQty = parseInt(listViewData[i].mapping[j].acceptedQty) + parseInt(listViewData[i].mapping[j].rejectionQty) + parseInt(listViewData[i].mapping[j].rwQty);
                        prFrmAcpQty = context.prQty[prFrmQtyMap] ? parseInt(context.prQty[prFrmQtyMap].prAcpQty) + parseInt(listViewData[i].mapping[j].acceptedQty) : parseInt(listViewData[i].mapping[j].acceptedQty);
                        prFrmQty = context.prQty[prFrmQtyMap] ? parseInt(context.prQty[prFrmQtyMap].prQty) + parseInt(prQty) : parseInt(prQty);
                        prToQty = context.prQty[prToQtyMap] ? parseInt(context.prQty[prToQtyMap].prQty) + parseInt(prQty) : parseInt(prQty);
                        prToAcpQty = context.prQty[prToQtyMap] ? parseInt(context.prQty[prToQtyMap].prAcpQty) + parseInt(listViewData[i].mapping[j].acceptedQty) : parseInt(listViewData[i].mapping[j].acceptedQty);

                        context.prQty[prFrmQtyMap] = listViewData[i].mapping[j];
                        context.prQty[prFrmQtyMap].prQty = prFrmQty;
                        context.prQty[prFrmQtyMap].prAcpQty = prFrmAcpQty;
                        context.prQty[prToQtyMap] = listViewData[i].mapping[j];
                        context.prQty[prToQtyMap].prQty = prToQty;
                        context.prQty[prToQtyMap].prAcpQty = prToAcpQty;
                    }
                };
                return context.prQty;
            });
        },
        callBackSubmit: function(context) {
            var newQty;
            var data = angular.copy(context.data.mapping[context.finalMapping]);
            var newContext = angular.copy(context);
            data.partNo = context.data.partNo;
            newContext.data = data;
            context.actions.updatePartStock(newContext);
            context.actions.updateMaterialIssue(context);
        }
    };

    commonFact.initCtrl($scope, 'production.productionEntry', actions);

}]);
erpApp.controller('toolMasterCtrl', ['$scope', 'commonFact', function($scope, commonFact) {
	
    commonFact.initCtrl($scope, 'production.toolMaster');

}]);
erpApp.controller('generalSupplierMasterCtrl', ['$scope', 'commonFact', function($scope, commonFact) {

    commonFact.initCtrl($scope, 'purchase.generalSupplierMaster');

}]);
erpApp.controller('poGeneralSupplierCtrl', ['$scope', 'commonFact', 'serviceApi', function($scope, commonFact, serviceApi) {
    var actions = {
        updatePartDetails: function(mapping) {
            context.actions.getData('marketing.partMaster', mapping.id).then(function(res) {
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

    commonFact.initCtrl($scope, 'purchase.poGeneralSupplier', actions);

}]);
erpApp.controller('poSubContractorCtrl', ['$scope', 'commonFact', 'serviceApi', function($scope, commonFact, serviceApi) {
    var actions = {
        updateTaxPart: function(context, data, newValue, field, fieldMapKey) {
            var acceptedQtyField = context.form.mapping.fields['acceptedQty'];
            context.actions.updatePartTotal(context, data, data[acceptedQtyField.id], acceptedQtyField, fieldMapKey);
        }
    };
    commonFact.initCtrl($scope, 'purchase.poSubContractor', actions);

}]);
erpApp.controller('poSupplierCtrl', ['$scope', 'commonFact', 'serviceApi', function($scope, commonFact, serviceApi) {
    var actions = {
        updateRMDetails: function(mapping) {
            context.actions.getData('purchase.rmMaster', mapping.id).then(function(res) {
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

    commonFact.initCtrl($scope, 'purchase.poSupplier', actions);

}]);
erpApp.controller('rmMasterCtrl', ['$scope', 'commonFact', function($scope, commonFact) {
	
    commonFact.initCtrl($scope, 'purchase.rmMaster');

}]);
erpApp.controller('subContractorMasterCtrl', ['$scope', 'commonFact', 'serviceApi', function($scope, commonFact, serviceApi) {
    var actions = {
        callBackList: function(context) {
            var serviceconf = this.getServiceConfig('production.flowMaster'),
                partNos = [];
            serviceApi.callServiceApi(serviceconf).then(function(res) {
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
erpApp.controller('supplierMasterCtrl', ['$scope', 'commonFact', function($scope, commonFact) {

    commonFact.initCtrl($scope, 'purchase.supplierMaster');

}]);
erpApp.controller('partStockCtrl', ['$scope', 'commonFact', '$location', 'serviceApi', function($scope, commonFact, $location, serviceApi) {
    var actions = {
        callBackList: function(context) {
            var newList = angular.copy(context.listViewData);
            if ($location.search() && $location.search()['showall'] === 'no') {
                newList = context.listViewData.filter(function(data) {
                    return data.partStockQty > 0;
                });
                context.listViewData = newList
            }
        },
        updateOperationFrom: function(context, data, key, field) {
            if (context.data.partNo) {
                var restriction = {
                        partNo: context.data.partNo
                    };
                context.actions.getOperationFromFlow(context, context.form.fields['operationFrom'], restriction);
            }
        },
        updateOperationTo: function(context, data, key, field) {
            if (context.data.partNo) {
                var partNo = context.data.partNo,
                    restriction = {
                        partNo: partNo
                    };

                if (data.operationFrom) {
                    restriction = angular.extend(restriction, {
                        limit: 1,
                        startWith: data.operationFrom
                    });
                }

                context.actions.getOperationFromFlow(context, context.form.fields['operationTo'], restriction);
            }
        },
        submit: function(context) {
            var submitService;
            var serviceconf = this.getServiceConfig(context.services.list, 'POST');
            if (context.data.id) {
                submitService = serviceApi.callServiceApi(serviceconf, context.data)
            } else {
                context.updatePrevStock = false;
                context.data.acceptedQty = context.data.partStockQty;
                submitService = context.actions.updatePartStock(context);
            }

            submitService.then(function(){
                context.page.name = 'list';
                context.actions.list(context);
            });
        }
    };

    commonFact.initCtrl($scope, 'report.partStock', actions);

}]);
erpApp.controller('productionEntryReportCtrl', ['$scope', 'commonFact', 'serviceApi', '$location', function($scope, commonFact, serviceApi, $location) {
    var actions = {
        callBackList: function(context) {
            if ($location.search() && $location.search()['type']) {
                context.actions[$location.search()['type']](context);
            } else {
                context.actions.productionEntryReport(context);
            }
        },
        toolHistoryCard: function(context) {
            var list = [];
            var listViewYearData = angular.copy(context.listViewDataMaster);
            for(var x in listViewYearData){
                var listViewData = listViewYearData[x];
                for (var i in listViewData) {
                    var frmDate = context.filterView.data['frmDate'];
                    var toDate = context.filterView.data['toDate'];
                    var filterToolNo = context.filterView.data['toolNo'];
                    var filterPartNo = context.filterView.data['partNo'];
                    var partNo = listViewData[i]['partNo'];

                    for (var j in listViewData[i].mapping) {
                        var toolNo = listViewData[i].mapping[j].toolNo;
                        var date = new Date(listViewData[i].mapping[j].date);
                        if ((!filterToolNo || (toolNo === filterToolNo)) && (!filterPartNo || (partNo === filterPartNo)) && (!frmDate || (frmDate && new Date(frmDate) <= date)) && (!toDate || toDate && new Date(toDate) >= date)) {
                            var details = {
                                partNo: partNo,
                                toolNo: toolNo,
                                qty: listViewData[i].mapping[j].acceptedQty,
                                activity: listViewData[i].mapping[j].operationTo,
                                date: listViewData[i].mapping[j].date,
                                cummulativeQty: parseInt(listViewData[i].mapping[j].acceptedQty)
                            };

                            var isPartExist = context.actions.findObjectByKey(list, { toolNo: details.toolNo, partNo: details.partNo });
                            if (isPartExist) {
                                details.cummulativeQty += parseInt(isPartExist.cummulativeQty);
                            }
                            list.push(details);
                        }
                    }
                }
            }
            
            context.listViewData = list;
        },
        machineRunningTime: function(context) {
            var list = [];
            var listViewYearData = angular.copy(context.listViewDataMaster);
            for(var x in listViewYearData){
                var listViewData = listViewYearData[x];
                for (var i in listViewData) {
                    var frmDate = context.filterView.data['frmDate'];
                    var toDate = context.filterView.data['toDate'];
                    var filterMachineNo = context.filterView.data['machineNo'];

                    for (var j in listViewData[i].mapping) {
                        var date = new Date(listViewData[i].mapping[j].date);
                        var machineNo = listViewData[i].mapping[j]['machineNo'];
                        if ((!filterMachineNo || (machineNo === filterMachineNo)) && (!frmDate || (frmDate && new Date(frmDate) <= date)) && (!toDate || toDate && new Date(toDate) >= date)) {
                            var details = {
                                machineNo: machineNo,
                                date: listViewData[i].mapping[j].date,
                                startTime: listViewData[i].mapping[j].startTime,
                                endTime: listViewData[i].mapping[j].endTime
                            };

                            details.runningTime = details.cumRunningTime = parseFloat(details.endTime) - parseFloat(details.startTime);
                            var isExist = context.actions.findObjectByKey(list, { machineNo: details.machineNo});
                            if (isExist) {
                                details.cumRunningTime += parseFloat(isExist.cumRunningTime);
                            }
                            list.push(details);
                        }
                    }
                }
            }
            context.listViewData = list;
        },
        empPerformanceReport: function(context) {
            var list = [];
            var listViewData = angular.copy(context.listViewDataMaster);
            for (var i in listViewData) {
                var frmDate = context.filterView.data['frmDate'];
                var toDate = context.filterView.data['toDate'];
                var filterPartNo = context.filterView.data['partNo'];
                var partNo = listViewData[i]['partNo'];
                var filterOperator = context.filterView.data['operator'];

                for (var j in listViewData[i].mapping) {
                    var date = new Date(listViewData[i].mapping[j].date);
                    var operator = listViewData[i].mapping[j].operator;
                    if ((!filterPartNo || (partNo === filterPartNo)) && (!filterOperator || (operator === filterOperator)) && (!frmDate || (frmDate && new Date(frmDate) <= date)) && (!toDate || toDate && new Date(toDate) >= date)) {
                        var details = {
                            partNo: partNo,
                            date: listViewData[i].mapping[j].date,
                            startTime: listViewData[i].mapping[j].startTime,
                            endTime: listViewData[i].mapping[j].endTime,
                            operator: operator,
                            operationTo: listViewData[i].mapping[j].operationTo,
                            planQty: listViewData[i].mapping[j].planQty,
                            acceptedQty: listViewData[i].mapping[j].acceptedQty
                        };
                        list.push(details);
                    }
                }
            }
            context.listViewData = list;
        },
        productionEntryReport: function(context) {
            var list = [];
            var listViewData = angular.copy(context.listViewDataMaster);
            for (var i in listViewData) {
                var frmDate = context.filterView.data['frmDate'];
                var toDate = context.filterView.data['toDate'];

                for (var j in listViewData[i].mapping) {
                    var date = new Date(listViewData[i].mapping[j].date);
                    if ((!frmDate || (frmDate && new Date(frmDate) <= date)) && (!toDate || toDate && new Date(toDate) >= date)) {
                        var details = {
                            machineNo: listViewData[i].machineNo,
                            jobCardNo: listViewData[i].jobCardNo,
                            partNo: listViewData[i].partNo,
                            operationFrom: listViewData[i].mapping[j].operationFrom,
                            operationTo: listViewData[i].mapping[j].operationTo,
                            toolNo: listViewData[i].mapping[j].toolNo,
                            operator: listViewData[i].mapping[j].operator,
                            startTime: listViewData[i].mapping[j].startTime,
                            endTime: listViewData[i].mapping[j].endTime,
                            planQty: listViewData[i].mapping[j].planQty,
                            acceptedQty: listViewData[i].mapping[j].acceptedQty,
                            rejectionQty: listViewData[i].mapping[j].rejectionQty,
                            rwQty: listViewData[i].mapping[j].rwQty,
                            date: listViewData[i].mapping[j].date
                        };
                        list.push(details);
                    }
                }
            }
            context.listViewData = list;
        }
    };
    if ($location.search() && $location.search()['type']) {
        commonFact.initCtrl($scope, 'report.' + $location.search()['type'], actions);
    } else {
        commonFact.initCtrl($scope, 'report.productionEntryReport', actions);
    }

}]);
erpApp.controller('rmStockCtrl', ['$scope', 'commonFact', '$location', function($scope, commonFact, $location) {
    var actions = {
        callBackList: function(context) {
            var newList = angular.copy(context.listViewData);
            if ($location.search() && $location.search()['showall'] === 'no') {
                newList = context.listViewData.filter(function(data) {
                    return data.partStockQty > 0;
                });
                context.listViewData = newList
            }
        },
        submit: function(context) {
            var stockData;
            context.actions.getData('report.rmStock').then(function(res) {
                stockData = res.data;
                for (var i in stockData) {
                    if (!context.data.id && stockData[i].rmCode === context.data.rmCode) {
                        context.data.id = stockData[i].id;
                        context.data.rmStockQty = parseInt(context.data.rmStockQty) + parseInt(stockData[i].rmStockQty);
                    }
                }
                commonFact.defaultActions.submit(context);
            });

        }
    };

    commonFact.initCtrl($scope, 'report.rmStock', actions);

}]);
erpApp.controller('salesAnalysisInvoiceCtrl', ['$scope', 'commonFact', 'serviceApi', '$location', function($scope, commonFact, serviceApi, $location) {
    var cashBill = false,
        actions = {
            callBackList: function(context) {
                var partDetailList = [];
                var listViewData = angular.copy(context.listViewDataMaster);
                for (var i in listViewData) {
                    var frmDate = context.filterView.data['frmDate'];
                    var toDate = context.filterView.data['toDate'];
                    var filterCustomerCode = context.filterView.data['customerCode'];
                    var customerCode = listViewData[i]['customerCode'];
                    var date = new Date(listViewData[i]['date']);
                    if ((!filterCustomerCode || (customerCode === filterCustomerCode)) && (!frmDate || (frmDate && new Date(frmDate) <= date)) && (!toDate || toDate && new Date(toDate) >= date)) {
                        for (var j in listViewData[i].mapping) {
                            var partDetail = {
                                partNo: listViewData[i].mapping[j].id,
                                amount: listViewData[i].mapping[j].amount,
                                rate: listViewData[i].mapping[j].rate,
                                taxRate: listViewData[i].mapping[j].taxRate,
                                unit: listViewData[i].mapping[j].unit,
                                customerCode: listViewData[i]['customerCode'],
                                dates: context.actions.dateFormatChange(date),
                                invoiceNos: !cashBill ? 'H-' + listViewData[i]['invoiceNo'] : listViewData[i]['invoiceNo']
                            };

                            if (!cashBill) {
                                partDetail.amount = parseFloat(partDetail.amount) + (parseFloat(partDetail.amount) * parseFloat(partDetail.taxRate / 100));
                            }
                            var isPartExist = context.actions.findObjectByKey(partDetailList, 'partNo', partDetail['partNo']);
                            if (isPartExist && isPartExist.customerCode === partDetail.customerCode) {
                                isPartExist.amount = parseFloat(isPartExist.amount) + parseFloat(partDetail.amount);
                                isPartExist.unit = parseFloat(isPartExist.unit) + parseFloat(partDetail.unit);
                                isPartExist.dates = isPartExist.dates + ', ' + partDetail.dates;
                                isPartExist.invoiceNos = isPartExist.invoiceNos + ', ' + partDetail.invoiceNos; 

                            } else {
                                partDetailList.push(partDetail);
                            }
                        }
                    }
                }
                context.listViewData = partDetailList;
            }
        };

    if ($location.search() && $location.search()['type'] === 'cashBill') {
        cashBill = true;
        commonFact.initCtrl($scope, 'report.salesAnalysisCashBill', actions);
    } else {
        commonFact.initCtrl($scope, 'report.salesAnalysisInvoice', actions);
    }
}]);
erpApp.controller('subContractorStockCtrl', ['$scope', 'commonFact', '$location', 'serviceApi', function($scope, commonFact, $location, serviceApi) {
    var actions = {
        callBackList: function(context) {
            var newList = angular.copy(context.listViewData);
            if ($location.search() && $location.search()['showall'] === 'no') {
                newList = context.listViewData.filter(function(data) {
                    return data.partStockQty > 0;
                });
                context.listViewData = newList
            }
            context.actions.getFlowMaster(context);
        },
        callBackEdit: function(context) {
            setTimeout(function() {
                context.actions.updateOperationFrom(context);
                context.actions.updateOperationTo(context);
            }, 1000);
        },
        getPartNos: function(context) {
            var partNos = [];
            if (context.data.subContractorCode) {
                context.actions.getData('purchase.subContractorMaster', context.data.subContractorCode).then(function(res) {
                    var data = res.data;
                    for (var i in data.mapping) {
                        partNos.push(data.mapping[i].id);
                    }
                    context.form.fields['partNo'].filter = {
                        id: partNos
                    };
                    context.actions.makeOptionsFields(context, context.form.fields['partNo']);
                });
            }
        },
        updateOperationFrom: function(context, data, key, field) {
            var prevOpp;
            var operationFrom;
            if (context.data && context.data.partNo) {
                var restriction = {
                    partNo: context.data.partNo
                };
                for (var j in context.flowMasterData) {
                    if (context.flowMasterData[j].partNo === context.data.partNo) {
                        for (var k in context.flowMasterData[j].mapping) {
                            prevOpp = context.flowMasterData[j].mapping[k - 1];
                            if (prevOpp && context.flowMasterData[j].mapping[k].source === 'Sub-Contractor') {
                                operationFrom = prevOpp.id;
                            }
                        }
                    }
                }
                restriction.filter = {
                    id: operationFrom
                }
                context.actions.getOperationFromFlow(context, context.form.fields['operationFrom'], restriction);
            }
        },
        updateOperationTo: function(context, data, key, field) {
            if (context.data && context.data.partNo) {
                var partNo = context.data.partNo,
                    restriction = {
                        partNo: partNo
                    };

                if (context.data.operationFrom) {
                    restriction = angular.extend(restriction, {
                        limit: 1,
                        startWith: context.data.operationFrom
                    });
                }

                context.actions.getOperationFromFlow(context, context.form.fields['operationTo'], restriction);
            }
        },
        submit: function(context) {
            var submitService;
            var serviceconf = this.getServiceConfig(context.services.list, 'POST');
            if (context.data.id) {
                submitService = serviceApi.callServiceApi(serviceconf, context.data)
            } else {
                context.data.acceptedQty = context.data.partStockQty;
                submitService = context.actions.updateSCStock(context);
            }

            submitService.then(function() {
                context.page.name = 'list';
                context.actions.list(context);
            });
        }
    };

    commonFact.initCtrl($scope, 'report.subContractorStock', actions);

}]);
erpApp.controller('dcSubContractorCtrl', ['$scope', 'commonFact', 'serviceApi', function($scope, commonFact, serviceApi) {
    var orgItemVal = null,
        actions = {
            callBackList: function(context) {
                context.actions.getPartStock(context);
            },
            callBackEdit: function(context) {
                var poNoField = context.form.fields['poNo'];
                context.form.mapping.actions.delete = false;
                orgItemVal = angular.copy(context.data);
                poNoField.filter = {};
                context.actions.makeOptionsFields(context, poNoField).then(function() {
                    //context.actions.callBackChangeMapping(context);
                });

            },
            getPOSubContractor: function(context, data, key, field) {
                context.form.fields['poNo'] = angular.extend(context.form.fields['poNo'], {
                    filter: {
                        subContractorCode: key,
                        status: 0
                    }
                });
                context.actions.makeOptionsFields(context, context.form.fields['poNo']);
            },
            callBackChangeMapping: function(context) {
                context.actions.checkAcceptedQty(context);
                context.actions.getDCQty(context);
            },
            checkAcceptedQty: function(context) {
                var serviceconf = this.getServiceConfig('production.flowMaster'),
                    partNo,
                    operationFrom;
                serviceApi.callServiceApi(serviceconf).then(function(res) {
                    var flowMasterData = res.data,
                        prevOpp,
                        qty;
                    for (var i in context.data.mapping) {
                        partNo = context.data.mapping[i].id;
                        qty = context.data.mapping[i].acceptedQty;
                        for (var j in flowMasterData) {
                            if (flowMasterData[j].partNo === partNo) {
                                for (var k in flowMasterData[j].mapping) {
                                    prevOpp = flowMasterData[j].mapping[k - 1];
                                    if (prevOpp && flowMasterData[j].mapping[k].source === 'Sub-Contractor') {
                                        operationFrom = prevOpp.id;
                                    }

                                    if (prevOpp && (context.partStock[partNo + '-' + prevOpp.id] === undefined || context.partStock[partNo + '-' + prevOpp.id].partStockQty < qty)) {
                                        context.data.mapping[i].acceptedQty = qty = null;
                                    }
                                }
                            }
                        }
                        context.data.mapping[i].operationFrom = operationFrom;
                    }
                });
            },
            callBackUpdatePartTotal: function(context, data) {
                var qty = parseInt(data.acceptedQty),
                    poQty = parseInt(context.actions.getPOQty(context, data)),
                    dcQty = context.dcQty && context.dcQty[context.data['poNo'] + '-' + data.id] || 0;

                qty += parseInt(dcQty);
                if (poQty < qty) {
                    data.acceptedQty = null;
                }
            },
            getPOQty: function(context, data) {
                var poSubContractor = context.form.fields['poNo'].options[context.data.poNo];
                var poQty = 0;
                var poNo = context.data.poNo;

                for (var i in poSubContractor.mapping) {
                    if (data && data.id) {
                        if (poSubContractor.mapping[i].id === data.id) {
                            poQty += parseInt(poSubContractor.mapping[i].acceptedQty);
                        }
                    } else {
                        poQty += parseInt(poSubContractor.mapping[i].acceptedQty);
                    }
                }
                return poQty;
            },
            updatePoSubContractor: function(context) {
                var poSubContractor = context.form.fields['poNo'].options[context.data.poNo];
                var poQty = 0;
                var dcQty = 0;
                var qty = 0;
                var updatePO = true;
                poSubContractor.status = 1;
                for (var i in context.data.mapping) {
                    poQty = context.actions.getPOQty(context, context.data.mapping[i]);
                    dcQty = parseInt(context.dcQty[context.data['poNo'] + '-' + context.data.mapping[i].id]) || 0;
                    qty = parseInt(context.data.mapping[i].acceptedQty) + dcQty;
                    if (parseInt(poQty) > parseInt(qty)) {
                        updatePO = false;
                    }
                }
                if (updatePO) {
                    context.actions.updateData('purchase.poSubContractor', poSubContractor);
                }
            },
            getDCQty: function(context, partNo) {
                var dcQtyTag;
                var dcQty;
                context.dcQty = [];
                return context.actions.getData('store.dcSubContractor').then(function(res) {
                    var listViewData = res.data;
                    for (var i in listViewData) {
                        if (context.data.poNo === listViewData[i].poNo) {
                            for (var j in listViewData[i].mapping) {
                                dcQtyTag = listViewData[i].poNo + '-' + listViewData[i].mapping[j].id;
                                if (partNo === undefined || listViewData[i].mapping[j].id === partNo) {
                                    dcQty = parseInt(listViewData[i].mapping[j].acceptedQty);
                                }
                                context.dcQty[dcQtyTag] = context.dcQty[dcQtyTag] === undefined ? dcQty : parseInt(context.dcQty[dcQtyTag]) + dcQty;
                            }
                        }
                    }
                    return dcQty;
                });
            },
            callBackSubmit: function(context) {
                for (var i in context.data.mapping) {
                    var data = angular.copy(context.data.mapping[i]);
                    var newContext = angular.copy(context);
                    data.partNo = data.id;
                    data.subContractorCode = context.data.subContractorCode;
                    newContext.data = data;
                    context.actions.updateSCStock(newContext);
                    newContext.updateCurStock = false;
                    context.actions.updatePartStock(newContext);
                }
                context.actions.updatePoSubContractor(context);
            }
        };

    commonFact.initCtrl($scope, 'store.dcSubContractor', actions);

}]);
erpApp.controller('grnGeneralSupplierCtrl', ['$scope', 'commonFact', 'serviceApi', function($scope, commonFact, serviceApi) {
    var orgItemVal = null,
        actions = {
            getPOGeneralSupplier: function(context, data, key, field) {
                context.form.fields['poNo'] = angular.extend(context.form.fields['poNo'], {
                    dataFrom: 'purchase.poGeneralSupplier',
                    replaceName: 'poNo',
                    filter: {
                        generalSupplierCode: key,
                        status: 0
                    }
                });
                context.actions.makeOptionsFields(context, context.form.fields['poNo']);
            },
            updatePTTotal: function(context, data, updateValue) {
                var total = 0;
                var qty = updateValue || 0;
                total = qty * data.rate;
                data.total = parseFloat(total).toFixed(2);
                context.actions.updatePOTotalAmount(context);
            },
            callBackAdd: function(context) {
                orgItemVal = null;
            },
            callBackEdit: function(context, key) {
                var poNoField = context.form.fields['poNo'];
                context.form.mapping.actions.delete = false;
                orgItemVal = angular.copy(context.data);
                poNoField.filter = {};
                context.actions.makeOptionsFields(context, poNoField);
                context.data['generalSupplierInvoiceDate'] = new Date(context.data['generalSupplierInvoiceDate']);
            },
            updatePoGeneralSupplier: function(context) {
                context.actions.getData('purchase.poGeneralSupplier', context.data.poNo).then(function(res) {
                    var poGeneralSupplierData = res.data;
                    poGeneralSupplierData.status = 1;
                    poGeneralSupplierData.id = context.data.poNo;
                    context.actions.updateData('purchase.poGeneralSupplier', poGeneralSupplierData);
                });
            },
            callBackSubmit: function(context) {
                var newQty;
                var acceptedQty;
                for (var i in context.data.mapping) {
                    var data = angular.copy(context.data.mapping[i]);
                    var newContext = angular.copy(context);
                    data.partNo = data.id;
                    data.operationTo = context.appConfig.finalStageOpp;
                    newContext.data = data;
                    newContext.updatePrevStock = false;
                    if (orgItemVal && orgItemVal.mapping[i].acceptedQty) {
                        acceptedQty = parseInt(newContext.data.acceptedQty) - parseInt(orgItemVal.mapping[i].acceptedQty);
                        newContext.data.acceptedQty = acceptedQty;
                    }
                    context.actions.updatePartStock(newContext);

                }
                context.actions.updatePoGeneralSupplier(context);
            }
        };

    commonFact.initCtrl($scope, 'store.grnGeneralSupplier', actions);

}]);
erpApp.controller('grnSubContractorCtrl', ['$scope', 'commonFact', 'serviceApi', function($scope, commonFact, serviceApi) {
    var orgItemVal = null,
        actions = {
            callBackAdd: function(context) {
                orgItemVal = null;
            },
            callBackEdit: function(context) {
                var poNoField = context.form.fields['poNo'];
                var dcNoField = context.form.fields['dcNo'];
                context.form.mapping.actions.delete = false;
                orgItemVal = angular.copy(context.data);
                context.data['subContractorDCDate'] = new Date(context.data['subContractorDCDate']);
                poNoField.filter = {};
                dcNoField.filter = {};
                context.actions.makeOptionsFields(context, poNoField).then(function() {
                    context.actions.makeOptionsFields(context, dcNoField).then(function() {
                        context.actions.callBackChangeMapping(context);
                    });
                });

            },
            callBackList: function(context) {
                context.grnSC = true;
            },
            getDCSubContractor: function(context, data, key, field) {
                context.form.fields['dcNo'] = angular.extend(context.form.fields['dcNo'], {
                    filter: {
                        poNo: key,
                        status: 0
                    }
                });
                context.actions.makeOptionsFields(context, context.form.fields['dcNo']);
            },
            getPOSubContractor: function(context, data, key, field) {
                context.form.fields['poNo'] = angular.extend(context.form.fields['poNo'], {
                    filter: {
                        subContractorCode: key
                    }
                });
                context.actions.makeOptionsFields(context, context.form.fields['poNo']);
            },
            updateDCSubContractor: function(context) {
                var dcSubContractor = context.form.fields['dcNo'].options[context.data.dcNo];
                var grnQty = 0;
                var dcQty = 0;
                var qty = 0;
                var updateDC = true;
                dcSubContractor.status = 1;
                for (var i in context.data.mapping) {
                    dcQty = context.actions.getDCQty(context, context.data.mapping[i]);
                    grnQty = parseInt(context.grnQty[context.data['dcNo'] + '-' + context.data.mapping[i].id]) || 0;
                    qty = parseInt(context.data.mapping[i].acceptedQty) + grnQty;
                    if (parseInt(dcQty) > parseInt(qty)) {
                        updateDC = false;
                    }
                }
                if (updateDC) {
                    context.actions.updateData('store.dcSubContractor', dcSubContractor);
                }

            },
            callBackChangeMapping: function(context) {
                context.actions.getSCStock(context).then(function() {
                    if (orgItemVal) {
                        for (var i in orgItemVal.mapping) {
                            var scStockMap = orgItemVal.mapping[i].id + '-' + orgItemVal.mapping[i].operationFrom;
                            if (context.partStock[scStockMap]) {
                                context.partStock[scStockMap].partStockQty = parseInt(context.partStock[scStockMap].partStockQty) + parseInt(orgItemVal.mapping[i].acceptedQty);
                            }
                        }
                    }
                });
                context.actions.getGrnQty(context);
            },
            callBackUpdatePartTotal: function(context, data, newValue, field, fieldMapKey) {
                var qty = parseInt(data.acceptedQty),
                    dcQty = parseInt(context.actions.getDCQty(context, data)),
                    grnQty = context.grnQty[context.data['dcNo'] + '-' + data.id] || 0;

                qty += parseInt(grnQty);
                if (dcQty < qty) {
                    data.acceptedQty = null;
                }
            },
            getDCQty: function(context, data) {
                var dcSubContractor = context.form.fields['dcNo'].options[context.data.dcNo];
                var dcQty = 0;
                var poNo = context.data.poNo;

                for (var i in dcSubContractor.mapping) {
                    if (data && data.id) {
                        if (dcSubContractor.mapping[i].id === data.id) {
                            dcQty += parseInt(dcSubContractor.mapping[i].acceptedQty);
                        }
                    } else {
                        dcQty += parseInt(dcSubContractor.mapping[i].acceptedQty);
                    }
                }
                return dcQty;
            },
            getGrnQty: function(context, partNo) {
                var grnQtyTag;
                var grnQty;
                context.grnQty = [];

                return context.actions.getData('store.grnSubContractor').then(function(res) {
                    var listViewData = res.data;
                    for (var i in listViewData) {
                        if (context.data.dcNo === listViewData[i].dcNo) {
                            for (var j in listViewData[i].mapping) {
                                if (listViewData[i].mapping[j].id !== orgItemVal.mapping[j].id) {
                                    grnQtyTag = listViewData[i].dcNo + '-' + listViewData[i].mapping[j].id;
                                    if (partNo === undefined || listViewData[i].mapping[j].id === partNo) {
                                        grnQty = parseInt(listViewData[i].mapping[j].acceptedQty);
                                    }
                                    context.grnQty[grnQtyTag] = context.grnQty[grnQtyTag] === undefined ? grnQty : parseInt(context.grnQty[grnQtyTag]) + grnQty;
                                }
                            }
                        }
                    }
                    return grnQty;
                });
            },
            callBackSubmit: function(context) {
                var newQty;
                var acceptedQty;
                for (var i in context.data.mapping) {
                    var data = angular.copy(context.data.mapping[i]);
                    var newContext = angular.copy(context);
                    data.partNo = data.id;
                    newContext.data = data;
                    newContext.updatePrevStock = false;
                    if (orgItemVal && orgItemVal.mapping[i].acceptedQty) {
                        acceptedQty = parseInt(newContext.data.acceptedQty) - parseInt(orgItemVal.mapping[i].acceptedQty);
                        newContext.data.acceptedQty = acceptedQty;
                    }
                    context.actions.updatePartStock(newContext);
                    var scData = angular.copy(data);
                    scData.subContractorCode = context.data.subContractorCode;
                    scData.acceptedQty = 0 - scData.acceptedQty;
                    context.actions.updateSCStock({
                        data: scData
                    });
                }
                context.actions.updateDCSubContractor(context);
            }
        };

    commonFact.initCtrl($scope, 'store.grnSubContractor', actions);

}]);
erpApp.controller('grnSupplierCtrl', ['$scope', 'commonFact', 'serviceApi', function($scope, commonFact, serviceApi) {
    var orgItemVal = null,
        actions = {
            getPOSupplier: function(context, data, key, field) {
                context.form.fields['poNo'] = angular.extend(context.form.fields['poNo'], {
                    dataFrom: 'purchase.poSupplier',
                    replaceName: 'poNo',
                    filter: {
                        supplierCode: key,
                        status: 0
                    }
                });
                context.actions.makeOptionsFields(context, context.form.fields['poNo']);
            },
            updateRmTotal: function(context, data, updateValue) {
                var total = 0;
                var qty = updateValue || 0;
                total = qty * data.rate;
                data.total = parseFloat(total).toFixed(2);
                context.actions.updatePOTotalAmount(context);
            },
            callBackAdd: function(context) {
                orgItemVal = null;
            },
            callBackEdit: function(context, key) {
                var poNoField = context.form.fields['poNo'];
                context.form.mapping.actions.delete = false;
                orgItemVal = angular.copy(context.data);
                poNoField.filter = {};
                context.actions.makeOptionsFields(context, poNoField);
                context.data['supplierInvoiceDate'] = new Date(context.data['supplierInvoiceDate']);
            },
            updateRMStockQty: function(context) {
                var serviceconf = context.actions.getServiceConfig('report.rmStock');
                serviceApi.callServiceApi(serviceconf).then(function(res) {
                    var rmStockData = res.data,
                        rmStock = {};
                    var existingStock;
                    var qty;
                    var oldQty;
                    var rmStockQty;
                    var data;
                    for (var i in rmStockData) {
                        rmStock[rmStockData[i].rmCode] = rmStockData[i] && rmStockData[i] || undefined;
                    }

                    for (var i in context.data.mapping) {
                        existingStock = rmStock[context.data.mapping[i].id];
                        qty = context.data.mapping[i].acceptedQty || context.data.mapping[i].receivedQty;
                        if (orgItemVal && orgItemVal.mapping[i].acceptedQty) {
                            oldQty = orgItemVal.mapping[i].acceptedQty || orgItemVal.mapping[i].receivedQty;
                            qty = parseInt(qty) - parseInt(oldQty);
                        }
                        rmStockQty = existingStock && parseInt(existingStock.rmStockQty) + parseInt(qty) || parseInt(qty);
                        data = {
                            id: existingStock && existingStock.id || undefined,
                            rmCode: context.data.mapping[i].id,
                            rmStockQty: rmStockQty,
                            uomCode: context.data.mapping[i].uomCode
                        }
                        serviceconf = existingStock && context.actions.getServiceConfig('report.rmStock', 'POST') || context.actions.getServiceConfig('report.rmStock', 'POST');
                        serviceApi.callServiceApi(serviceconf, data);
                    }
                });
            },
            updatePoSupplier: function(context) {
                context.actions.getData('purchase.poSupplier', context.data.poNo).then(function(res) {
                    var poSupplierData = res.data;
                    poSupplierData.status = 1;
                    poSupplierData.id = context.data.poNo;
                    context.actions.updateData('purchase.poSupplier', poSupplierData);
                });
            },
            callBackSubmit: function(context) {
                context.actions.updateRMStockQty(context);
                context.actions.updatePoSupplier(context);
            }
        };

    commonFact.initCtrl($scope, 'store.grnSupplier', actions);

}]);
(function(module) {
try {
  module = angular.module('erpApp');
} catch (e) {
  module = angular.module('erpApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/app.html',
    '<div class="content-wrapper">\n' +
    '    <header class="hide-print"></header>\n' +
    '    <div ng-view></div>\n' +
    '    <!-- /.content-wrapper-->\n' +
    '    <footer class="sticky-footer hide-print">\n' +
    '        <div class="container">\n' +
    '            <div class="text-center">\n' +
    '                <small>Copyright © VasuTechs</small>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </footer>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('erpApp');
} catch (e) {
  module = angular.module('erpApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/defaultView.html',
    '<div class="container-fluid">\n' +
    '    <h1 class="align-center show-print logo-title">{{appName}}</h1>\n' +
    '    <!-- Breadcrumbs-->\n' +
    '    <ol class="breadcrumb hide-print">\n' +
    '        <li class="breadcrumb-item">\n' +
    '            <a href="#/">Dashboard</a>\n' +
    '        </li>\n' +
    '        <li class="breadcrumb-item active">{{context.title}}</li>\n' +
    '    </ol>\n' +
    '    <alert-rol></alert-rol>\n' +
    '    <div class="mb-3">\n' +
    '        <h3>{{context.title}}</h3>\n' +
    '        <div ng-if="context.page.name==\'add\' || context.page.name==\'edit\'">\n' +
    '            <div class="card">\n' +
    '                <div class="card-header hide-print">\n' +
    '                    <b ng-if="!context.page.printView">{{context.form.title||\'Add/Edit\'}}</b>\n' +
    '                    <a ng-if="context.page.printView" class="fa fa-print" href=\'javascript: void();\' onclick="window.print()"><b>Print View</b></a>\n' +
    '                    <button type="button" class="close float-right" aria-label="Close" ng-click="context.actions.cancel(context)">\n' +
    '                        <span aria-hidden="true">&times;</span>\n' +
    '                    </button>\n' +
    '                </div>\n' +
    '                <div class="card-body">\n' +
    '                    <custom-form></custom-form>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div ng-if="context.page.name==\'list\'">\n' +
    '            <filter-view></filter-view>\n' +
    '            <list-view></list-view>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('erpApp');
} catch (e) {
  module = angular.module('erpApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/components/alertRol.html',
    '<div>\n' +
    '    <div class="modal fade" id="myModal" role="dialog">\n' +
    '        <div class="modal-dialog modal-lg">\n' +
    '            <div class="modal-content">\n' +
    '                <div class="modal-header">\n' +
    '                    <h4>Re-Order Level</h4>\n' +
    '                    <button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
    '                </div>\n' +
    '                <div class="modal-body modal-Scroll">\n' +
    '\n' +
    '                    <div class="row">\n' +
    '\n' +
    '                        <div class="col-6">\n' +
    '                            <p><b>Red alert:</b></p>\n' +
    '                            <div ng-repeat="rolRed in alertRolContext.partRolRed | orderBy:\'partStockQty\'">\n' +
    '                                <div class="alert alert-danger" role="alert">\n' +
    '                                    <b>Part name:</b> {{rolRed.partName}} - <b>Qty:</b> {{rolRed.partStockQty}}\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="col-6">\n' +
    '                            <p><b>Yellow alert:</b></p>\n' +
    '                            <div ng-repeat="rolYellow in alertRolContext.partRolYellow | orderBy:\'partStockQty\'">\n' +
    '                                <div class="alert alert-warning" role="alert">\n' +
    '                                    <b>Part name:</b> {{rolYellow.partName}} - <b>Qty:</b> {{rolYellow.partStockQty}}\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="modal-footer">\n' +
    '                    <button type="button" class="btn btn-default" ng-click="hideROL()" data-dismiss="modal">OK</button>\n' +
    '                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('erpApp');
} catch (e) {
  module = angular.module('erpApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/components/customForm.html',
    '<div>\n' +
    '    <div ng-if="context.alertMessage!==undefined" class="alert alert-danger" role="alert">\n' +
    '        {{context.alertMessage}}\n' +
    '    </div>\n' +
    '    <form id="{{context.form.id}}" name="customForm">\n' +
    '        <div class="form-group row" ng-switch="field.type" ng-repeat="field in context.form.fields" ng-if="!context.page.printView && !field.afterMapping">\n' +
    '            <label ng-switch-when="span" for="{{field.id}}" class="col-2 col-form-label"><b>{{field.name}}:</b></label>\n' +
    '            <div ng-switch-when="span" class="col-10">\n' +
    '                <span id="{{field.id}}">{{field.valuePrefix}}{{context.data[field.id]}}</span>\n' +
    '            </div>\n' +
    '            <label ng-switch-when="input" for="{{field.id}}" class="col-2 col-form-label"><b>{{field.name}}:</b></label>\n' +
    '            <div ng-switch-when="input" class="col-6">\n' +
    '                <input type="{{field.inputType}}" id="{{field.id}}" name="{{field.id}}" class="form-control" ng-model="context.data[field.id]" ng-required="{{field.required}}" ng-change="field.action && context.actions[field.action] && context.actions[field.action](context, context.data, context.data[field.id], field)"\n' +
    '                    max="{{field.max}}" ng-disabled="field.isDisable || (field.isEditDisable && context.data[context.form.disableByField])" />\n' +
    '            </div>\n' +
    '            <label ng-switch-when="select" for="{{field.id}}" class="col-2 col-form-label"><b>{{field.name}}:</b></label>\n' +
    '            <div ng-switch-when="select" class="col-6">\n' +
    '                <select id="{{field.id}}" class="form-control" ng-model="context.data[field.id]" ng-required="{{field.required}}" ng-change="field.action && context.actions[field.action] && context.actions[field.action](context, context.data, context.data[field.id], field)"\n' +
    '                    ng-options="option.optionId as option.optionName for option in field.options" ng-disabled="field.isDisable || (field.isEditDisable && context.data[context.form.disableByField])">\n' +
    '                    <option value="">--Select--</option>\n' +
    '                </select>\n' +
    '            </div>\n' +
    '            <div class="col-2">\n' +
    '                <span style="color:red" ng-show="customForm[field.id].$invalid">*Invalid input!</span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="form-group row" ng-repeat="field in context.form.fields" ng-if="context.page.printView && !field.afterMapping">\n' +
    '            <label for="{{field.id}}" class="col-2 col-form-label"><b>{{field.name}}:</b></label>\n' +
    '            <div class="col-10">\n' +
    '                <span id="{{field.id}}" ng-bind="context.actions.replaceFieldVal(context.printData[field.id], field)"></span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="form-group row" ng-if="context.form.mapping">\n' +
    '            <div class="col-12">\n' +
    '                <mapping-form></mapping-form>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="form-group row" ng-switch="field.type" ng-repeat="field in context.form.fields" ng-if="!context.page.printView && field.afterMapping">\n' +
    '            <label ng-switch-when="span" for="{{field.id}}" class="col-2 col-form-label"><b>{{field.name}}:</b></label>\n' +
    '            <div ng-switch-when="span" class="col-10">\n' +
    '                <span id="{{field.id}}">{{field.valuePrefix}}{{context.data[field.id]}}</span>\n' +
    '            </div>\n' +
    '            <label ng-switch-when="input" for="{{field.id}}" class="col-2 col-form-label"><b>{{field.name}}:</b></label>\n' +
    '            <div ng-switch-when="input" class="col-6">\n' +
    '                <input type="{{field.inputType}}" id="{{field.id}}" name="{{field.id}}" class="form-control" ng-model="context.data[field.id]" ng-required="{{field.required}}" ng-change="field.action && context.actions[field.action] && context.actions[field.action](context, context.data, context.data[field.id], field)"\n' +
    '                    max="{{field.max}}" ng-disabled="field.isDisable || (field.isEditDisable && context.data[context.form.disableByField])" />\n' +
    '            </div>\n' +
    '            <label ng-switch-when="select" for="{{field.id}}" class="col-2 col-form-label"><b>{{field.name}}:</b></label>\n' +
    '            <div ng-switch-when="select" class="col-6">\n' +
    '                <select id="{{field.id}}" class="form-control" ng-model="context.data[field.id]" ng-required="{{field.required}}" ng-change="field.action && context.actions[field.action] && context.actions[field.action](context, context.data, context.data[field.id], field)"\n' +
    '                    ng-options="option.optionId as option.optionName for option in field.options" ng-disabled="field.isDisable || (field.isEditDisable && context.data[context.form.disableByField])">\n' +
    '                    <option value="">--Select--</option>\n' +
    '                </select>\n' +
    '            </div>\n' +
    '            <div class="col-2">\n' +
    '                <span style="color:red" ng-show="customForm[field.id].$invalid">*Invalid input!</span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="form-group row" ng-repeat="field in context.form.fields" ng-if="context.page.printView && field.afterMapping">\n' +
    '            <label for="{{field.id}}" class="col-2 col-form-label"><b>{{field.name}}:</b></label>\n' +
    '            <div class="col-10">\n' +
    '                <span id="{{field.id}}" ng-bind="context.actions.replaceFieldVal(context.printData[field.id], field)"></span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="form-group row" ng-if="!context.page.printView">\n' +
    '            <div class="col-2">\n' +
    '            </div>\n' +
    '            <div class="col-10">\n' +
    '                <button ng-if="context.form.actions.submit === undefined || context.form.actions.submit" type="button" class="btn btn-primary" id="submit" ng-click="context.form.action.customSubmit && context.form.actions.customSubmit() || context.actions.submit(context)"\n' +
    '                    ng-disabled="customForm.$invalid">Submit</button>\n' +
    '                <button ng-if="context.form.actions.cancel === undefined || context.form.actions.cancel" type="button" class="btn btn-primary" id="cancel" ng-click="context.actions.cancel(context)">Cancel</button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </form>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('erpApp');
} catch (e) {
  module = angular.module('erpApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/components/entryInvoice.html',
    '<div>\n' +
    '    <form id="{{context.form.id}}" name="entryInvoice">\n' +
    '        <table class="table table-bordered">\n' +
    '            <tbody>\n' +
    '                <tr>\n' +
    '                    <td><b>{{context.form.fields.invoiceNo.name}}</b></td>\n' +
    '                    <td colspan="2">\n' +
    '                        <span id="{{context.form.fields.invoiceNo.id}}"><b>{{context.form.fields.invoiceNo.valuePrefix}}{{context.data[context.form.fields.invoiceNo.id]}}</b></span>\n' +
    '                    </td>\n' +
    '                    <td align="right"><b>{{context.form.fields.date.name}}</b></td>\n' +
    '                    <td colspan="2">\n' +
    '                        <input ng-if="!context.page.printView" type="date" id="{{context.form.fields.date.id}}" class="form-control" ng-model="context.data[context.form.fields.date.id]" ng-required="{{context.form.fields.date.required}}" />\n' +
    '                        <span ng-if="context.page.printView" id="{{context.form.fields.date.id}}" ng-bind="context.actions.replaceFieldVal(context.data[context.form.fields.date.id], context.form.fields.date)">{{context.data[context.form.fields.date.id]}}</span>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td><b>{{context.form.fields.customerCode.name}}</b></td>\n' +
    '                    <td colspan="6">\n' +
    '                        <select ng-if="!context.page.printView" id="{{context.form.fields.customerCode.id}}" class="form-control" ng-model="context.data[context.form.fields.customerCode.id]" ng-required="{{context.form.fields.customerCode.required}}" ng-change="context.form.fields.customerCode.action && context.actions[context.form.fields.customerCode.action] && context.actions[context.form.fields.customerCode.action](context, context.data, context.data[context.form.fields.customerCode.id], context.form.fields.customerCode)"\n' +
    '                            ng-options="option.optionId as option.optionName for option in context.form.fields.customerCode.options" ng-disabled="context.form.fields.customerCode.isDisable || (context.form.fields.customerCode.isEditDisable && context.data[context.form.disableByField])"\n' +
    '                            ng-required="{{context.form.fields.customerCode.required}}">\n' +
    '                            <option value="">--Select--</option>\n' +
    '                        </select>\n' +
    '                        <span ng-if="context.page.printView" id="{{context.form.fields.customerCode.id}}" ng-bind="context.actions.replaceFieldVal(context.data[context.form.fields.customerCode.id], context.form.fields.customerCode)"></span>\n' +
    '\n' +
    '                        <span id="{{context.form.fields.address.id}}">, {{context.data[context.form.fields.address.id]}}</span>\n' +
    '\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '                <tr ng-if="!context.cashBill">\n' +
    '                    <td><b>{{context.form.fields.partyGstin.name}}</b></td>\n' +
    '                    <td colspan="2">\n' +
    '                        <input ng-if="!context.page.printView" type="text" id="{{context.form.fields.partyGstin.id}}" class="form-control" ng-model="context.data[context.form.fields.partyGstin.id]" ng-required="{{context.form.fields.required}}" />\n' +
    '                        <span ng-if="context.page.printView" id="{{context.form.fields.partyGstin.id}}">{{context.form.fields.partyGstin.valuePrefix}}{{context.data[context.form.fields.partyGstin.id]}}</span>\n' +
    '                    </td>\n' +
    '                    <td colspan="4"></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td ng-repeat="mappingFieldKey in context.form.mapping.fields"><b>{{mappingFieldKey.name}}</b></td>\n' +
    '                    <td ng-if="!context.page.printView">\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '                <tr ng-repeat="(key, map) in context.data.mapping" ng-if="!context.page.printView">\n' +
    '                    <td ng-switch="field.type" ng-repeat="field in context.form.mapping.fields">\n' +
    '                        <span ng-switch-when="span" id="{{field.id}}-{{key}}" ng-bind="map[field.id]"></span>\n' +
    '                        <input ng-switch-when="input" type="{{field.inputType}}" id="{{field.id}}-{{key}}" class="form-control" ng-model="map[field.id]" ng-change="field.action && context.actions[field.action] && context.actions[field.action](context, map, map[field.id], field, key)"\n' +
    '                            ng-required="{{field.required}}" />\n' +
    '                        <select class="form-control" ng-switch-when="select" id="{{field.id}}-{{key}}" ng-change="field.action && context.actions[field.action] && context.actions[field.action](context, map, map[field.id], field, key)" ng-model="map[field.id]" ng-options="option.optionId as option.optionName for option in field.options"\n' +
    '                            ng-required="{{field.required}}" ng-disabled="field.isDisable">\n' +
    '                            <option value="">--Select--</option>\n' +
    '                        </select>\n' +
    '                    </td>\n' +
    '                    <td>\n' +
    '                        <a ng-if="context.form.mapping.actions.delete || context.form.mapping.actions.delete===undefined" class="fa fa-fw fa-times" href="javascript: void(0);" ng-click="context.actions.removeMapping(context, context.data.mapping, key)"> </a>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '                <tr ng-repeat="(key, map) in context.data.mapping" ng-if="context.page.printView">\n' +
    '                    <td ng-repeat="field in context.form.mapping.fields">\n' +
    '                        <span id="{{field.id}}-{{key}}" ng-bind="context.actions.replaceFieldVal(map[field.id], field)"></span>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '\n' +
    '                <tr>\n' +
    '                    <td colspan="4" align="right"><b>Sub Total:</b></td>\n' +
    '                    <td colspan="2"><span id="{{context.form.fields.subTotal.id}}" ng-bind="context.data[context.form.fields.subTotal.id]"></span></td>\n' +
    '                </tr>\n' +
    '                <tr ng-if="context.cashBill">\n' +
    '                    <td colspan="4" align="right"><b>Previous Balance:</b></td>\n' +
    '                    <td colspan="2"><input ng-if="!context.page.printView" type="text" id="{{context.form.fields.preBalance.id}}" class="form-control" ng-model="context.data[context.form.fields.preBalance.id]" ng-change="context.form.fields.preBalance.action && context.actions[context.form.fields.preBalance.action] && context.actions[context.form.fields.preBalance.action](context, map, map[context.form.fields.preBalance.id], field)"\n' +
    '                        />\n' +
    '                        <span ng-if="context.page.printView" id="{{context.form.fields.preBalance.id}}">{{context.data[context.form.fields.preBalance.id]}}</span></td>\n' +
    '                </tr>\n' +
    '                <tr ng-if="!context.cashBill">\n' +
    '                    <td rowspan="2" align="right"><b>{{context.form.fields.taxRate.name}}</b></td>\n' +
    '                    <td rowspan="2"><span id="{{context.form.fields.taxRate.id}}" ng-bind="context.data[context.form.fields.taxRate.id]"></span>%</td>\n' +
    '                    <td align="right"><b>{{context.form.fields.cgst.name}}</b></td>\n' +
    '                    <td><span id="{{context.form.fields.cgst.id}}" ng-bind="context.data[context.form.fields.cgst.id]"></span>%</td>\n' +
    '                    <td colspan="2"><span id="{{context.form.fields.cgstTotal.id}}" ng-bind="context.data[context.form.fields.cgstTotal.id]"></span></td>\n' +
    '                </tr>\n' +
    '                <tr ng-if="!context.cashBill">\n' +
    '                    <td align="right"><b>{{context.form.fields.sgst.name}}</b></td>\n' +
    '                    <td><span id="{{context.form.fields.sgst.id}}" ng-bind="context.data[context.form.fields.sgst.id]"></span>%</td>\n' +
    '                    <td colspan="2"><span id="{{context.form.fields.sgstTotal.id}}" ng-bind="context.data[context.form.fields.sgstTotal.id]"></span></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td colspan="4" align="right"><b>{{context.form.fields.total.name}}:</b></td>\n' +
    '                    <td colspan="2"><b><span id="{{context.form.fields.total.id}}" ng-bind="context.data[context.form.fields.total.id]"></span></b></td>\n' +
    '                </tr>\n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '        <div class="form-group row" ng-if="!context.page.printView">\n' +
    '            <div class="col-2">\n' +
    '            </div>\n' +
    '            <div class="col-10">\n' +
    '                <button type="button" class="btn btn-primary" id="submit" ng-click="context.actions.submit(context)" ng-disabled="entryInvoice.$invalid">Submit</button>\n' +
    '                <button type="button" class="btn btn-primary" id="cancel" ng-click="context.actions.cancel(context)">Cancel</button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </form>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('erpApp');
} catch (e) {
  module = angular.module('erpApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/components/filterView.html',
    '<div>\n' +
    '	<h3>{{context.filterView.title}} <div ng-if="context.page.actions.downloadExcel" class="pull-right"><a href="javascript: void(0);" ng-click="context.actions.downloadExcel(context, \'listView\')" title="Download Excel" class="fa fa-fw fa-file-excel-o"></a></div></h3>\n' +
    '    <table class="table table-bordered">\n' +
    '        <thead>\n' +
    '            <tr>\n' +
    '                <th ng-repeat="(key, list) in context.filterView.fields">\n' +
    '					{{list.title}}:<select ng-if="list.type===\'select\'" id="{{list.id}}" class="form-control font-weight-bold" ng-model="context.filterView.data[list.id]" ng-change="context.actions[list.action] && context.actions[list.action](context, list) || context.actions[\'list\'](context)" ng-options="option.optionId as option.optionName for option in list.options">\n' +
    '                        <option value="">--Select--</option>\n' +
    '                    </select> <input ng-if="list.type===\'input\'" type="{{list.inputType}}" class="form-control font-weight-bold" ng-model="context.filterView.data[list.id]" ng-change="context.actions[list.action] && context.actions[list.action](context, list) || context.actions[\'list\'](context)" />\n' +
    '                </th>\n' +
    '            </tr>\n' +
    '        </thead>\n' +
    '    </table>\n' +
    '    <table class="table table-bordered" id="listView" style="display: none;">\n' +
    '        <thead>\n' +
    '            <tr>\n' +
    '                <th ng-repeat="(key, list) in context.listView">\n' +
    '                    <div>{{list.title}}</div>\n' +
    '                </th>\n' +
    '            </tr>\n' +
    '        </thead>\n' +
    '        <tbody>\n' +
    '            <tr ng-repeat="dataList in context.listViewData">\n' +
    '                <td ng-repeat="(key, list) in context.listView">\n' +
    '                    <div ng-if="!list.actions" ng-bind="context.actions.replaceFieldVal(dataList[list.id], list)"></div>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '        </tbody>\n' +
    '    </table>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('erpApp');
} catch (e) {
  module = angular.module('erpApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/components/header.html',
    '<div>\n' +
    '    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top  hide-print" id="mainNav">\n' +
    '        <a class="navbar-brand" href="#/">{{headerContext.appName}}</a>\n' +
    '        <div class="collapse navbar-collapse" id="navbarSupportedContent">\n' +
    '            <ul class="navbar-nav mr-auto">\n' +
    '                <li ng-if="!module.disableMenu && !module.disable" class="nav-item dropdown" ng-repeat="(key, module) in headerContext.modules">\n' +
    '                    <a ng-if="module.page" class="nav-link" href="#!{{module.page.link}}">\n' +
    '                        <i class="fa fa-fw fa-{{module.icon}}"></i>\n' +
    '                        <span class="nav-link-text">{{module.title}}</span>\n' +
    '                    </a>\n' +
    '                    <a ng-if="!module.page" class="nav-link dropdown-toggle" href="javascript: void(0);" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n' +
    '                        <i class="fa fa-fw fa-{{module.icon}}"></i>\n' +
    '                        <span class="nav-link-text">{{module.title}}</span>\n' +
    '                    </a>\n' +
    '                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">\n' +
    '                        <div ng-repeat="(subKey, subModule) in headerContext.actions.showSubModule(module)">\n' +
    '                            <a ng-if="!subModule.disableMenu && !subModule.disable" class="dropdown-item" href="#!{{subModule.page.link}}">{{subModule.title}}</a>\n' +
    '                            <div ng-if="!subModule.disableMenu && !subModule.disable" class="dropdown-divider"></div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '            <ul class="navbar-nav ml-auto">\n' +
    '                <li class="nav-item dropdown">\n' +
    '                </li>\n' +
    '                <li ng-if="!headerContext.modules[\'calendarYear\'].disable" class="nav-item">\n' +
    '                    <select class="form-control" id="calendarYear" ng-change="headerContext.actions.changeCalendarYear(headerContext)" ng-model="headerContext.calendarYear" ng-options="option.optionId as option.optionName for option in headerContext.calendarYearList">\n' +
    '                        <option value="">--Select--</option>\n' +
    '                    </select>\n' +
    '                </li>\n' +
    '                <li ng-if="!headerContext.modules[\'databaseUpload\'].disable" class="nav-item">\n' +
    '                    <a class="nav-link" title="Import data" href="#!{{headerContext.modules[\'databaseUpload\'].page.link}}">\n' +
    '                        <i class="fa fa-fw fa-upload"></i> \n' +
    '                    </a>\n' +
    '                </li>\n' +
    '                <li ng-if="!headerContext.modules[\'databaseDownload\'].disable" class="nav-item">\n' +
    '                    <a class="nav-link" title="Download data" href="{{headerContext.modules[\'databaseDownload\'].page.link}}" download="database.json">\n' +
    '                        <i class="fa fa-fw fa-download"></i> \n' +
    '                    </a>\n' +
    '                </li>\n' +
    '                <li class="nav-item">\n' +
    '                    <a ng-if="headerContext.isLogin" class="nav-link" href="#!{{headerContext.modules[\'admin\'][\'login\'].page.link}}?type=logout">\n' +
    '                        Logout \n' +
    '                    </a>\n' +
    '                    <a ng-if="!headerContext.isLogin" class="nav-link" href="#!{{headerContext.modules[\'admin\'][\'login\'].page.link}}">\n' +
    '                        Login \n' +
    '                    </a>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '        </div>\n' +
    '    </nav>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('erpApp');
} catch (e) {
  module = angular.module('erpApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/components/listView.html',
    '<div>\n' +
    '    <table class="table table-bordered">\n' +
    '        <thead>\n' +
    '            <tr>\n' +
    '                <th ng-repeat="(key, list) in context.listView">\n' +
    '                    <div ng-if="!list.action && list.isFilterBy===undefined">{{list.title}}</div>\n' +
    '                    <div ng-if="list.isFilterBy">\n' +
    '                        <select ng-if="list.type===\'select\'" id="{{list.id}}" class="form-control font-weight-bold" ng-model="list.selectedFilterBy" ng-change="context.actions.viewFilterBy(context, list)" ng-options="option.optionId as option.optionName for option in list.options">\n' +
    '                            <option value="">{{list.title}}</option>\n' +
    '                        </select>\n' +
    '                        <input ng-if="list.type===\'input\'" type="{{list.inputType}}" class="form-control font-weight-bold" ng-model="list.selectedFilterBy" ng-change="context.actions.viewFilterBy(context, list)" />\n' +
    '                    </div>\n' +
    '                </th>\n' +
    '                <th>\n' +
    '                    <div ng-if="context.page.actions === undefined  || context.page.actions.add === undefined || context.page.actions.add" class="pull-right"><a href="javascript: void(0);" ng-click="context.actions.add(context)" class="fa fa-fw fa-plus-square-o">Add</a></div>\n' +
    '                </th>\n' +
    '            </tr>\n' +
    '        </thead>\n' +
    '        <tbody>\n' +
    '            <tr ng-repeat="(dataKey, dataList) in context.listViewData | orderBy:context.orderByProperty: true  | filter:context.filterBy:true | startFrom:context.currentPage*context.pageSize | limitTo:context.pageSize">\n' +
    '                <td ng-repeat="(key, list) in context.listView">\n' +
    '                    <div ng-if="!list.actions" ng-bind="context.actions.replaceFieldVal(dataList[list.id], list)"></div>\n' +
    '                </td>\n' +
    '                <td>\n' +
    '                    <div class="row">\n' +
    '                        <div class="col">\n' +
    '                            <a ng-if="context.page.actions === undefined || context.page.actions.printView === undefined || context.page.actions.print" href="javascript: void(0);" ng-click="context.actions.printView(context, dataList.id, true)" title="Print View" class="fa fa-fw fa-print">\n' +
    '                            </a>\n' +
    '                        </div>\n' +
    '                        <div class="col" ng-if="context.page.actions === undefined || context.page.actions.edit === undefined || context.page.actions.edit">\n' +
    '                            <a href="javascript: void(0);" ng-click="context.actions.edit(context, dataList.id)" title="Edit" class="fa fa-fw fa-edit"> </a>\n' +
    '                        </div>\n' +
    '                        <div class="col" ng-if="context.page.actions === undefined || context.page.actions.delete === undefined || context.page.actions.delete">\n' +
    '                            <a href="javascript: void(0);" title="Delete" ng-click="context.actions.delete(context, dataList.id, dataList)" class="fa fa-fw fa-times"> </a>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr ng-if="context.listViewData.length > 0 && context.listViewData.length >= context.pageSize">\n' +
    '                <td colspan="{{context.listView.length}}" align="center">\n' +
    '                    <button ng-disabled="context.currentPage == 0" class="btn btn-primary" ng-click="context.currentPage=context.currentPage-1">\n' +
    '                        Previous\n' +
    '                    </button> {{context.currentPage+1}}/{{context.actions.numberOfPages(context)}}\n' +
    '                    <button ng-disabled="context.currentPage >= context.actions.getPageData(context).length/context.pageSize - 1" ng-click="context.currentPage=context.currentPage+1" class="btn btn-primary">\n' +
    '                        Next\n' +
    '                    </button>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr ng-if="!context.listViewData || context.listViewData.length===0">\n' +
    '                <td colspan="{{context.listView.length}}">No recodes...</td>\n' +
    '                <td></td>\n' +
    '            </tr>\n' +
    '        </tbody>\n' +
    '    </table>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('erpApp');
} catch (e) {
  module = angular.module('erpApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/components/mappingForm.html',
    '<div class="card">\n' +
    '    <div class="card-header" ng-if="!context.form.mapping.disableTitle"><b>{{context.form.mapping.name}}</b></div>\n' +
    '    <div class="card-body">\n' +
    '        <table class="table table-bordered">\n' +
    '            <thead>\n' +
    '                <tr>\n' +
    '                    <th ng-repeat="mappingFieldKey in context.form.mapping.fields">\n' +
    '                        <div>{{mappingFieldKey.name}}</div>\n' +
    '                    </th>\n' +
    '                    <th ng-if="!context.page.printView && !context.page.printViewMapping && (context.form.mapping.actions.delete || context.form.mapping.actions.delete===undefined)">\n' +
    '                    </th>\n' +
    '                </tr>\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '                <tr ng-repeat="(key, map) in context.printData.mapping" ng-if="context.page.printView || context.page.printViewMapping">\n' +
    '                    <td ng-repeat="field in context.form.mapping.fields">\n' +
    '                        <span id="{{field.id}}-{{key}}" ng-bind="context.actions.replaceFieldVal(map[field.id], field)">{{map[field.id]}}</span>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '                <tr ng-repeat="(key, map) in context.data.mapping" ng-if="(!context.page.printView && (!context.page.printViewMapping || (context.page.printViewMapping && ((context.data.mapping.length-1)===key))))">\n' +
    '                    <td ng-switch="field.type" ng-repeat="field in context.form.mapping.fields">\n' +
    '                        <span ng-switch-when="span" id="{{field.id}}-{{key}}" ng-bind="map[field.id]"></span>\n' +
    '                        <input ng-switch-when="input" type="{{field.inputType}}" id="{{field.id}}-{{key}}" class="form-control" ng-model="map[field.id]" ng-change="field.action && context.actions[field.action] && context.actions[field.action](context, map, map[field.id], field, key)"\n' +
    '                            ng-required="{{field.required}}" max="{{field.max}}" />\n' +
    '                        <select class="form-control" ng-switch-when="select" id="{{field.id}}-{{key}}" ng-focus="field.focusAction && context.actions[field.focusAction] && context.actions[field.focusAction](context, map, map[field.id], field, key)" ng-change="field.action && context.actions[field.action] && context.actions[field.action](context, map, map[field.id], field, key)"\n' +
    '                            ng-model="map[field.id]" ng-options="option.optionId as option.optionName for option in field.options" ng-required="{{field.required}}" ng-disabled="field.isDisable">\n' +
    '                            <option value="">--Select--</option>\n' +
    '                        </select>\n' +
    '                    </td>\n' +
    '                    <td ng-if="context.form.mapping.actions.delete || context.form.mapping.actions.delete===undefined">\n' +
    '                        <a class="fa fa-fw fa-times" href="javascript: void(0);" ng-click="context.actions.removeMapping(context, context.data.mapping, key)"> </a>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '        <div class="row" ng-if="!context.page.printView && (context.form.mapping.actions.add || context.form.mapping.actions.add==undefined)">\n' +
    '            <div class="col">\n' +
    '                <a class="fa fa-fw fa-plus-square-o" href="javascript: void(0);" ng-click="context.actions.addMapping(context.data.mapping)"> </a>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('erpApp');
} catch (e) {
  module = angular.module('erpApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/controllers/dashboard.html',
    '<div class="container-fluid">\n' +
    '    <!-- Breadcrumbs-->\n' +
    '    <ol class="breadcrumb">\n' +
    '        <li class="breadcrumb-item">\n' +
    '            <a href="#/">Dashboard</a>\n' +
    '        </li>\n' +
    '        <li class="breadcrumb-item active">My Dashboard</li>\n' +
    '    </ol>\n' +
    '    <alert-rol></alert-rol>\n' +
    '    <div class="mb-3">\n' +
    '        <h3>{{context.title}}</h3>\n' +
    '        <ul class="navbar-nav">\n' +
    '            <li ng-if="!module.disableMenu && !module.disable" ng-repeat="(key, module) in headerContext.modules">\n' +
    '                <a ng-if="module.page" class="nav-link" href="#!{{module.page.link}}">\n' +
    '                    <i class="fa fa-fw fa-{{module.icon}}"></i>\n' +
    '                    <span class="nav-link-text">{{module.title}}</span>\n' +
    '                </a>\n' +
    '                <a ng-if="!module.page" class="nav-link">\n' +
    '                    <i class="fa fa-fw fa-{{module.icon}}"></i>\n' +
    '                    <span class="nav-link-text">{{module.title}}</span>\n' +
    '                </a>\n' +
    '                <ul>\n' +
    '                    <li ng-if="!subModule.disableMenu && !subModule.disable" ng-repeat="subModule in headerContext.actions.showSubModule(module)">\n' +
    '                        <a href="#!{{subModule.page.link}}">{{subModule.title}}</a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '            </li>\n' +
    '        </ul>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('erpApp');
} catch (e) {
  module = angular.module('erpApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/controllers/databaseUpload.html',
    '<div class="container-fluid">\n' +
    '    <!-- Breadcrumbs-->\n' +
    '    <ol class="breadcrumb">\n' +
    '        <li class="breadcrumb-item">\n' +
    '            <a href="#/">Dashboard</a>\n' +
    '        </li>\n' +
    '        <li class="breadcrumb-item active">My Dashboard</li>\n' +
    '    </ol>\n' +
    '    <!-- Example DataTables Card-->\n' +
    '    <div class="mb-3">\n' +
    '        <h3>{{context.title}}</h3>\n' +
    '        <div>\n' +
    '            <div class="card">\n' +
    '                <div class="card-body">\n' +
    '                    <div ng-if="context.alertMessage!==undefined" class="alert alert-danger" role="alert">\n' +
    '                      {{context.alertMessage}}\n' +
    '                    </div>\n' +
    '                    <div ng-if="context.message!==undefined" class="alert alert-success" role="alert">\n' +
    '                      {{context.message}}\n' +
    '                    </div>\n' +
    '                    <h5 style="color:green;">{{context.data.uploadSuccess}}</h5>\n' +
    '                    <form name="customForm">\n' +
    '                        <input type="file" file-model="context.data.databaseUpload" class="form-control" />\n' +
    '\n' +
    '                        <button ng-click="context.actions.uploadDatabase(context)" class="btn btn-primary">Submit</button>\n' +
    '                    </form>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('erpApp');
} catch (e) {
  module = angular.module('erpApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/controllers/marketing/invoice.html',
    '<div class="container-fluid">\n' +
    '    <!-- Breadcrumbs-->\n' +
    '    <ol class="breadcrumb hide-print">\n' +
    '        <li class="breadcrumb-item">\n' +
    '            <a href="#/">Dashboard</a>\n' +
    '        </li>\n' +
    '        <li class="breadcrumb-item active">{{context.title}}</li>\n' +
    '    </ol>\n' +
    '    <!-- Example DataTables Card-->\n' +
    '    <div class="mb-3">\n' +
    '        <h3 class="print-title">{{context.title}}</h3>\n' +
    '        <div ng-if="context.page.name==\'add\' || context.page.name==\'edit\'">\n' +
    '            <div class="card">\n' +
    '                <div class="card-header hide-print">\n' +
    '                    <b ng-if="!context.page.printView">Add/Edit</b>\n' +
    '                    <a ng-if="context.page.printView" class="fa fa-print" href=\'javascript: void();\' onclick="window.print()"><b>Print View</b></a>\n' +
    '                    <button type="button" class="close float-right" aria-label="Close" ng-click="context.actions.cancel(context)">\n' +
    '                        <span aria-hidden="true">&times;</span>\n' +
    '                    </button>\n' +
    '                </div>\n' +
    '                <div ng-if="context.page.printView" class="row">\n' +
    '                    <div class="col-4">\n' +
    '                        <img ng-if="context.appConfig.companyLogoUrl" class="logo" src="{{context.appConfig.companyLogoUrl}}" title="{{context.appConfig.companyName}}" />\n' +
    '                        <h1 ng-if="!context.appConfig.companyLogoUrl" class="logo">{{context.appConfig.companyName}}</h1>\n' +
    '                    </div>\n' +
    '                    <div class="col-6">\n' +
    '\n' +
    '                        <p class="font-italic"><b>{{context.appConfig.companyAddress}}</b></p>\n' +
    '                        <p class="font-italic"><b>Mobile:</b> {{context.appConfig.companyMobile}} <b>Email:</b> {{context.appConfig.companyEmail}}</p>\n' +
    '                        <p class="font-italic" ng-if="!context.cashBill"><b>GSTIN:</b> {{context.appConfig.companyGstin}}</p>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="card-body">\n' +
    '                    <entry-invoice></entry-invoice>\n' +
    '                </div>\n' +
    '                <div ng-if="context.page.printView" class="row">\n' +
    '                    <div class="col-7"></div>\n' +
    '                    <div class="col-3">\n' +
    '                        <p class="text-center font-italic"><b>For {{context.companyDetail.name}}</b></p>\n' +
    '                        <br/>\n' +
    '                        <p class="text-center font-italic"><b>Authorised Signatory</b></p>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div ng-if="context.page.name==\'list\'">\n' +
    '            <list-view></list-view>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();
