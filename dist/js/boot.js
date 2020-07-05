'use strict'
var erpConfig = {"appName":"VASUTECHS","appBaseUrl":"/dashboard","calendarYear":"","finalStageOpp":9,"yearChangeMonth":3,"httpCache":true,"serverApiUri":"api","serverDataUri":"data","serverAuth":"auth","modules":{"controllers":{"login":{"id":"login","title":"Login","disableMenu":true,"defaultRelease":true,"masterData":{"userName":null,"password":null},"form":{"name":"Login","id":"login","title":"Login","fields":{"userName":{"name":"User Name","id":"userName","type":"input","inputType":"text","required":true},"password":{"name":"Password","id":"password","type":"input","inputType":"password","required":true},"appCustomer":{"name":"App Customers","id":"appCustomer","type":"select","options":{},"dataFrom":{"dataUri":"getAppCustomer"},"replaceName":"companyName"}},"actions":{"cancel":false,"customSubmit":"loginSubmit"}},"page":{"link":"login","name":"add","actions":false},"services":{"list":{"notDataUri":true,"cache":false}}},"databaseUpload":{"id":"databaseUpload","name":"Database Upload","title":"Database Upload","disableMenu":true,"defaultRelease":true,"masterData":{"databaseUpload":null},"page":{"link":"databaseUpload","name":"databaseUpload","templateUrl":"template/controllers/databaseUpload.html"}},"databaseDownload":{"id":"databaseDownload","name":"Database Download","title":"Database Download","disableMenu":true,"defaultRelease":true},"calendarYear":{"id":"calendarYear","name":"Calendar Year","title":"Calendar Year","disableMenu":true,"defaultRelease":true,"page":{"link":"calendarYear","name":"calendarYear"},"services":{"list":{"params":{"year":true}}}},"dashboard":{"id":"dashboard","name":"Dashboard","title":"Dashboard","icon":"dashboard","disableMenu":true,"defaultRelease":true,"page":{"link":"dashboard","name":"dashboard","templateUrl":"template/controllers/dashboard.html"}},"marketing":{"id":"marketing","name":"Marketing","title":"Marketing","icon":"stack-exchange","partMaster":{"id":"partMaster","title":"Part Master","masterData":{"partNo":null,"partName":null,"rmCode":null,"inputWeight":null,"finishedWeight":null,"hsnCode":null,"uomCode":null,"prodRateHr":null,"rate":null,"rolQtyYellowRage":null,"rolQtyRedRage":null,"rejection":null,"icc":null,"toolMaintenance":null,"profit":null,"transportCostKg":null},"form":{"name":"partMaster","id":"partMaster","fields":{"partNo":{"name":"Part No","id":"partNo","type":"input","inputType":"text","action":"isCheckExistField","required":true},"partName":{"name":"Part Name","id":"partName","type":"input","inputType":"text","action":"isCheckExistField","required":true},"rmCode":{"name":"Raw material","id":"rmCode","type":"select","options":{},"dataFrom":"purchase.rmMaster","replaceName":"rmName","valuePrefixData":"grade","isSingle":true},"inputWeight":{"name":"Input weight","id":"inputWeight","type":"input","inputType":"number","required":true},"finishedWeight":{"name":"Finished weight","id":"finishedWeight","type":"input","inputType":"number","required":true},"hsnCode":{"name":"HSN Code","id":"hsnCode","type":"input","inputType":"text","required":true},"uomCode":{"name":"UOM","id":"uomCode","type":"select","options":{},"dataFrom":"marketing.uomMaster","replaceName":"uomName","isSingle":true},"prodRateHr":{"name":"Prod Rate/ hr","id":"prodRateHr","type":"input","inputType":"number","required":true},"rate":{"name":"Rate","id":"rate","type":"input","inputType":"number","required":true},"rolQtyYellowRage":{"name":"ROL Qty Yellow Rage","id":"rolQtyYellowRage","type":"input","inputType":"number","required":true},"rolQtyRedRage":{"name":"ROL Qty Red Rage","id":"rolQtyRedRage","type":"input","inputType":"number","required":true},"rejection":{"name":"Rejection %","id":"rejection","type":"input","inputType":"number","required":true},"icc":{"name":"ICC %","id":"icc","type":"input","inputType":"number","required":true},"toolMaintenance":{"name":"Tool Maintenance %","id":"toolMaintenance","type":"input","inputType":"number","required":true},"profit":{"name":"Profit %","id":"profit","type":"input","inputType":"number","required":true},"transportCostKg":{"name":"Transport cost per kg","id":"transportCostKg","type":"input","inputType":"number","required":true},"isAssemblePart":{"name":"Is Assemble Part","id":"isAssemblePart","type":"input","inputType":"checkbox"}}},"listView":[{"title":"PartNo","id":"id","dataFrom":"marketing.partMaster","replaceName":"partNo","type":"select","isFilterBy":true},{"title":"Part Name","id":"partName"}],"page":{"link":"marketing/partMaster","name":"list"}},"customerMaster":{"id":"customerMaster","title":"Customer Master","masterData":{"customerCode":null,"customerName":null,"address":null,"contactNo":null,"gstin":null,"gst":null,"cgst":null,"sgst":null,"igst":null,"mapping":[{"id":null,"partName":null,"hsnCode":null,"rate":null}]},"form":{"name":"customerMaster","id":"customerMaster","autoGenKey":"customerCode","fields":{"customerCode":{"name":"Customer Code","id":"customerCode","type":"span","valuePrefix":"VT-CUS-"},"customerName":{"name":"Customer Name","id":"customerName","type":"input","inputType":"text","required":true},"address":{"name":"Address","id":"address","type":"input","inputType":"text","required":true},"contactNo":{"name":"Contact No","id":"contactNo","type":"input","inputType":"number","required":true},"gstin":{"name":"GSTIN","id":"gstin","type":"input","inputType":"text","required":true},"gst":{"name":"GST %","id":"gst","type":"input","inputType":"text"},"cgst":{"name":"CGST %","id":"cgst","type":"input","inputType":"text"},"sgst":{"name":"SGST %","id":"sgst","type":"input","inputType":"text"},"igst":{"name":"IGST %","id":"igst","type":"input","inputType":"text"}},"mapping":{"name":"Part Mapping","fields":{"id":{"name":"Part No","id":"id","type":"select","options":{},"action":"changeMapping","dataFrom":"marketing.partMaster","replaceName":"partNo"},"partName":{"name":"Part Name","id":"partName","type":"span"},"rate":{"name":"Rate","id":"rate","type":"input","inputType":"text","required":true}}}},"listView":[{"title":"Customer Code","id":"customerCode","valuePrefix":"VT-CUS-"},{"title":"Customer","id":"customerCode","dataFrom":"marketing.customerMaster","replaceName":"customerName","isFilterBy":true,"type":"select","options":{}}],"page":{"link":"marketing/customerMaster","name":"list"}},"empMaster":{"id":"empMaster","title":"Employee Master","masterData":{"id":null,"employeeCode":null,"employeeName":null,"address":null,"contactNo":null,"mailId":null,"qualification":null,"designation":null,"basicSalary":null,"hra":null,"ca":null,"ot":null,"totalSalary":null,"mapping":[{"id":null,"partName":null,"operationTo":null,"laborCost":null}]},"form":{"name":"empMaster","id":"empMaster","autoGenKey":"employeeCode","fields":{"employeeCode":{"name":"Employee Code","id":"employeeCode","valuePrefix":"VT-EMP-","type":"span"},"employeeName":{"name":"Employee Name","id":"employeeName","type":"input","inputType":"text","action":"isCheckExistField","required":true},"address":{"name":"Address","id":"address","type":"input","inputType":"text","required":true},"contactNo":{"name":"Contact No","id":"contactNo","type":"input","inputType":"number","required":true},"mailId":{"name":"Mail Id","id":"mailId","type":"input","inputType":"email","required":true},"qualification":{"name":"Qualification","id":"qualification","type":"input","inputType":"text","required":true},"designation":{"name":"Designation","id":"designation","type":"input","inputType":"text","required":true},"basicSalary":{"name":"BasicSalary","id":"basicSalary","type":"input","inputType":"number","required":true},"hra":{"name":"HRA","id":"hra","type":"input","inputType":"number","required":true},"ca":{"name":"CA","id":"ca","type":"input","inputType":"number","required":true},"ot":{"name":"OT","id":"ot","type":"input","inputType":"number","required":true},"total":{"name":"Total","id":"total","type":"input","inputType":"number","required":true}},"mapping":{"name":"Part Mapping","fields":{"id":{"name":"Part No","id":"id","type":"select","options":{},"action":"changeMapping","dataFrom":"marketing.partMaster","replaceName":"partNo"},"partName":{"name":"Part Name","id":"partName","type":"span"},"operationTo":{"name":"Stage","id":"operationTo","type":"select","options":{},"required":true,"dataFrom":"production.operationMaster","replaceName":"opName","valuePrefixData":"opCode","isSingle":true},"laborCost":{"name":"Labor Cost","id":"laborCost","type":"input","inputType":"text","required":true}}}},"listView":[{"title":"Employee Name","id":"employeeName"},{"title":"Mail Id","id":"mailId"}],"page":{"link":"marketing/empMaster","name":"list"}},"uomMaster":{"id":"uomMaster","title":"UOM Master","masterData":{"uomCode":null,"uomName":null},"form":{"name":"uomMaster","id":"uomMaster","autoGenKey":"uomCode","fields":{"uomCode":{"name":"UOM Code","id":"uomCode","type":"span","valuePrefix":"VT-UOM-"},"uomName":{"name":"UOM Name","id":"uomName","type":"input","inputType":"text","action":"isCheckExistField","required":true}}},"listView":[{"title":"UOM Code","id":"uomCode","valuePrefix":"VT-UOM-"},{"title":"UOM Name","id":"uomName"}],"page":{"link":"marketing/uomMaster","name":"list"}},"invoice":{"id":"invoice","title":"Invoice","cashBill":false,"masterData":{"invoiceNo":null,"date":null,"customerCode":null,"address":null,"gstin":null,"subTotal":null,"taxRate":null,"cgst":null,"sgst":null,"gst":null,"igst":null,"cgstTotal":null,"sgstTotal":null,"igstTotal":null,"totalBeforTax":null,"total":null,"mapping":[{"id":null,"partName":null,"hsnCode":null,"unit":null,"rate":null,"amount":null}]},"form":{"name":"Invoice","id":"invoice","autoGenKey":"invoiceNo","disableByField":"id","fields":{"invoiceNo":{"name":"Invoice No","id":"invoiceNo","type":"span","valuePrefix":"VT-","required":true},"date":{"name":"Date","id":"date","type":"input","inputType":"date","required":true},"customerCode":{"name":"To","id":"customerCode","type":"select","options":{},"action":"changeMapping","updateMapping":true,"updateData":["gstin","gst","igst","sgst","cgst","address","mapping"],"dataFrom":"marketing.customerMaster","replaceName":"customerName","isEditDisable":true,"isSingle":true},"address":{"name":"Customer Address","id":"address"},"partyGstin":{"name":"Party GSTIN","id":"gstin","type":"input","inputType":"text","required":true},"taxRate":{"name":"Tax Rate","id":"taxRate","type":"input","inputType":"number","required":true},"cgst":{"name":"CGST","id":"cgst","type":"span"},"cgstTotal":{"name":"CGST Total","id":"cgstTotal","type":"span"},"sgst":{"name":"SGST","id":"sgst","type":"span"},"sgstTotal":{"name":"SGST Total","id":"sgstTotal","type":"span"},"igst":{"name":"IGST","id":"igst","type":"span"},"igstTotal":{"name":"IGST Total","id":"igstTotal","type":"span"},"subTotal":{"name":"Sub Total","id":"subTotal","type":"input","inputType":"number","required":true},"total":{"name":"Total","id":"total","type":"input","inputType":"number","required":true}},"mapping":{"name":"Part Mapping","fields":{"id":{"name":"Part No","id":"id","type":"select","options":{},"dataFrom":"marketing.partMaster","replaceName":"partNo","isDisable":true},"partName":{"name":"Part Name","id":"partName","type":"span"},"hsnCode":{"name":"HSN Code","id":"hsnCode","type":"span"},"unit":{"name":"Unit","id":"unit","type":"input","inputType":"text","action":"updateTotal","required":true},"rate":{"name":"Rate","id":"rate","type":"span"},"amount":{"name":"Amount","id":"amount","type":"span"}}}},"listView":[{"title":"Invoice No","id":"invoiceNo","valuePrefix":"VT-"},{"title":"Customer","id":"customerCode","dataFrom":"marketing.customerMaster","replaceName":"customerName","isFilterBy":true,"type":"select","options":{}},{"title":"Date","id":"date","type":"date"}],"page":{"link":"marketing/invoice","name":"list","templateUrl":"template/controllers/marketing/invoice.html"},"services":{"list":{"params":{"year":true}}}},"cashBill":{"id":"cashBill","name":"cashBill","title":"Cash Bill","cashBill":true,"parentModule":"marketing.invoice","form":{"autoGenValStart":null,"fields":{"invoiceNo":{"name":"CashBill No","id":"invoiceNo","type":"span","valuePrefix":"","required":true},"preBalance":{"name":"Previous Balance","id":"preBalance","type":"input","inputType":"text","action":"updatePreBalance"}}},"listView":[{"title":"Cash Bill No","id":"invoiceNo","valuePrefix":""}],"page":{"link":"marketing/cashBill","name":"list","templateUrl":"template/controllers/marketing/invoice.html"},"services":{"list":{"params":{"year":true}}}}},"purchase":{"id":"purchase","name":"Purchase","title":"Purchase","icon":"shopping-bag","rmMaster":{"id":"rmMaster","title":"Raw Material Master","masterData":{"rmCode":null,"rmName":null,"grade":null,"type":null,"hsnCode":null,"uomCode":null,"rate":null,"transportCostKg":null,"scrapRate":null},"form":{"name":"rmMaster","id":"rmMaster","autoGenKey":"rmCode","fields":{"rmCode":{"name":"RM Code","id":"rmCode","valuePrefix":"RM-","type":"span"},"rmName":{"name":"RM Name","id":"rmName","type":"input","inputType":"text","action":"isCheckExistField","required":true},"grade":{"name":"Grade","id":"grade","type":"input","inputType":"text","required":true},"type":{"name":"Type","id":"type","type":"input","inputType":"text","required":true},"hsnCode":{"name":"HSN Code","id":"hsnCode","type":"input","inputType":"text","required":true},"uomCode":{"name":"UOM","id":"uomCode","type":"select","options":{},"dataFrom":"marketing.uomMaster","replaceName":"uomName","isSingle":true},"rate":{"name":"Rate","id":"rate","type":"input","inputType":"number","required":true},"transportCostKg":{"name":"Transport cost / kg","id":"transportCostKg","type":"input","inputType":"number","required":true},"scrapRate":{"name":"Scrap rate","id":"scrapRate","type":"input","inputType":"number","required":true}}},"listView":[{"title":"RM Code","id":"rmCode","valuePrefix":"RM-"},{"title":"Raw Material Name","id":"rmCode","dataFrom":"purchase.rmMaster","replaceName":"rmName","valuePrefixData":"grade","isFilterBy":true,"type":"select","options":{}}],"page":{"link":"purchase/rmMaster","name":"list","templateUrl":"template/defaultView.html"}},"supplierMaster":{"id":"supplierMaster","title":"Supplier Master","masterData":{"supplierCode":null,"supplierName":null,"address":null,"contactNo":null,"gstin":null,"gst":null,"sgst":null,"cgst":null,"igst":null,"mapping":[{"id":null,"rmCode":null,"rate":null}]},"form":{"name":"supplierMaster","id":"supplierMaster","autoGenKey":"supplierCode","fields":{"supplierCode":{"name":"Supplier Code","id":"supplierCode","type":"span","valuePrefix":"VT-SP-"},"supplierName":{"name":"Supplier Name","id":"supplierName","type":"input","inputType":"text","action":"isCheckExistField","required":true},"address":{"name":"Address","id":"address","type":"input","inputType":"text","required":true},"contactNo":{"name":"Contact No","id":"contactNo","type":"input","inputType":"text","required":true},"gstin":{"name":"GSTIN","id":"gstin","type":"input","inputType":"text","required":true},"gst":{"name":"GST %","id":"gst","type":"input","inputType":"number"},"sgst":{"name":"SGST %","id":"sgst","type":"input","inputType":"number"},"cgst":{"name":"CGST %","id":"cgst","type":"input","inputType":"number"},"igst":{"name":"IGST %","id":"igst","type":"input","inputType":"number"}},"mapping":{"name":"RM Mapping","fields":{"id":{"name":"RM Name","id":"id","type":"select","options":{},"action":"changeMapping","dataFrom":"purchase.rmMaster","replaceName":"rmName","valuePrefixData":"grade"},"rate":{"name":"Rate","id":"rate","type":"input","inputType":"text","required":true}}}},"listView":[{"title":"Supplier Code","id":"supplierCode","valuePrefix":"VT-SP-"},{"title":"Supplier Name","id":"supplierCode","dataFrom":"purchase.supplierMaster","replaceName":"supplierName","type":"select","isFilterBy":true}],"page":{"link":"purchase/supplierMaster","name":"list"}},"poSupplier":{"id":"poSupplier","title":"Purchase Order - Supplier","masterData":{"poNo":null,"date":null,"supplierCode":null,"gstin":null,"status":0,"subTotal":null,"extraAmount":null,"gstTotal":null,"total":null,"gst":null,"sgst":null,"cgst":null,"igst":null,"mapping":[{"id":null,"qty":null,"uomCode":null,"rate":null,"amount":null}]},"form":{"name":"poSupplier","id":"poSupplier","autoGenKey":"poNo","fields":{"poNo":{"name":"PO Code","id":"poNo","type":"span","valuePrefix":"VT-SP-PO-"},"date":{"name":"Date","id":"date","type":"input","inputType":"date","required":true},"supplierCode":{"name":"Supplier Code","id":"supplierCode","type":"select","options":{},"action":"changeMapping","updateMapping":true,"updateData":["gstin","gst","sgst","cgst","igst","mapping"],"dataFrom":"purchase.supplierMaster","replaceName":"supplierName","isSingle":true},"gstin":{"name":"Party Gstin","id":"gstin","type":"span"},"subTotal":{"name":"Sub Total","id":"subTotal","afterMapping":true,"type":"span"},"extraAmount":{"name":"Extra Amount","id":"extraAmount","type":"input","inputType":"number","action":"updatePOTotalAmount","afterMapping":true},"gstTotal":{"name":"Tax Total","id":"gstTotal","type":"span","afterMapping":true},"total":{"name":"Total","id":"total","type":"span","afterMapping":true}},"mapping":{"name":"RM Mapping","fields":{"id":{"name":"RM Name","id":"id","type":"select","options":{},"action":"changeMapping","updateData":["uomCode"],"dataFrom":"purchase.rmMaster","replaceName":"rmName","valuePrefixData":"grade","isDisable":true},"qty":{"name":"Qty","id":"qty","type":"input","inputType":"text","action":"updatePORmTotal","required":true},"uomCode":{"name":"UOM","id":"uomCode","type":"select","options":{},"dataFrom":"marketing.uomMaster","replaceName":"uomName","isDisable":true},"rate":{"name":"Rate","id":"rate","type":"input","inputType":"text","action":"updatePORmTotal","required":true},"total":{"name":"Total","id":"total","type":"span"}},"actions":{"add":false}}},"listView":[{"title":"PO NO","id":"poNo","valuePrefix":"VT-SP-PO-"},{"title":"Supplier Code","id":"supplierCode","dataFrom":"purchase.supplierMaster","replaceName":"supplierName","type":"select","isFilterBy":true},{"title":"Stutus","id":"status"}],"page":{"link":"purchase/poSupplier","name":"list"},"services":{"list":{"params":{"year":true}}}},"generalSupplierMaster":{"id":"generalSupplierMaster","title":"General Supplier Master","masterData":{"generalSupplierCode":null,"generalSupplierName":null,"address":null,"contactNo":null,"gstin":null,"gst":null,"sgst":null,"cgst":null,"igst":null,"mapping":[{"id":null,"partName":null,"rate":null}]},"form":{"name":"General Supplier Master","id":"generalSupplierMaster","autoGenKey":"generalSupplierCode","fields":{"generalSupplierCode":{"name":"General Supplier Code","id":"generalSupplierCode","type":"span","valuePrefix":"VT-GSP-"},"supplierName":{"name":"General Supplier Name","id":"generalSupplierName","type":"input","inputType":"text","action":"isCheckExistField","required":true},"address":{"name":"Address","id":"address","type":"input","inputType":"text","required":true},"contactNo":{"name":"Contact No","id":"contactNo","type":"input","inputType":"text","required":true},"gstin":{"name":"GSTIN","id":"gstin","type":"input","inputType":"text","required":true},"gst":{"name":"GST %","id":"gst","type":"input","inputType":"number"},"sgst":{"name":"SGST %","id":"sgst","type":"input","inputType":"number"},"cgst":{"name":"CGST %","id":"cgst","type":"input","inputType":"number"},"igst":{"name":"IGST %","id":"igst","type":"input","inputType":"number"}},"mapping":{"name":"Part Mapping","fields":{"id":{"name":"Part No","id":"id","type":"select","options":{},"action":"changeMapping","dataFrom":"marketing.partMaster","replaceName":"partNo"},"partName":{"name":"Part Name","id":"partName","type":"span"},"rate":{"name":"Rate","id":"rate","type":"input","inputType":"text","required":true}}}},"listView":[{"title":"General Supplier Code","id":"generalSupplierCode","valuePrefix":"VT-GSP-"},{"title":"General Supplier Name","id":"generalSupplierCode","dataFrom":"purchase.generalSupplierMaster","replaceName":"generalSupplierName","type":"select","isFilterBy":true}],"page":{"link":"purchase/generalSupplierMaster","name":"list"}},"poGeneralSupplier":{"id":"poGeneralSupplier","title":"Purchase Order - General Supplier","masterData":{"poNo":null,"date":null,"generalSupplierCode":null,"gstin":null,"status":0,"subTotal":null,"extraAmount":null,"gst":null,"sgst":null,"cgst":null,"igst":null,"gstTotal":null,"total":null,"mapping":[{"id":null,"qty":null,"uomCode":null,"rate":null,"amount":null}]},"form":{"name":"poGeneralSupplier","id":"poGeneralSupplier","autoGenKey":"poNo","fields":{"poNo":{"name":"PO Code","id":"poNo","type":"span","valuePrefix":"VT-GSP-PO-"},"date":{"name":"Date","id":"date","type":"input","inputType":"date","required":true},"supplierCode":{"name":"GeneralSupplier Code","id":"generalSupplierCode","type":"select","options":{},"action":"changeMapping","updateMapping":true,"updateData":["gstin","gst","sgst","cgst","igst","mapping"],"dataFrom":"purchase.generalSupplierMaster","replaceName":"generalSupplierName","isSingle":true},"gstin":{"name":"Party Gstin","id":"gstin","type":"span"},"subTotal":{"name":"Sub Total","id":"subTotal","afterMapping":true,"type":"span"},"extraAmount":{"name":"Extra Amount","id":"extraAmount","type":"input","inputType":"number","action":"updatePOTotalAmount","afterMapping":true},"gstTotal":{"name":"Tax Total","id":"gstTotal","type":"span","afterMapping":true},"total":{"name":"Total","id":"total","type":"span","afterMapping":true}},"mapping":{"name":"Part Mapping","fields":{"id":{"name":"Part No","id":"id","type":"select","options":{},"action":"changeMapping","updateData":["uomCode"],"dataFrom":"marketing.partMaster","replaceName":"partNo","isDisable":true},"qty":{"name":"Qty","id":"qty","type":"input","inputType":"text","action":"updatePORmTotal","required":true},"uomCode":{"name":"UOM","id":"uomCode","type":"select","options":{},"dataFrom":"marketing.uomMaster","replaceName":"uomName","isDisable":true},"rate":{"name":"Rate","id":"rate","type":"input","inputType":"text","action":"updatePORmTotal","required":true},"total":{"name":"Total","id":"total","type":"span"}},"actions":{"add":false}}},"listView":[{"title":"PO NO","id":"poNo","valuePrefix":"VT-GSP-PO-"},{"title":"General Supplier Code","id":"generalSupplierCode","dataFrom":"purchase.generalSupplierMaster","replaceName":"generalSupplierName","type":"select","isFilterBy":true},{"title":"Stutus","id":"status"}],"page":{"link":"purchase/poGeneralSupplier","name":"list"},"services":{"list":{"params":{"year":true}}}},"subContractorMaster":{"id":"subContractorMaster","title":"Sub Contractor Master","masterData":{"subContractorCode":null,"subContractorName":null,"address":null,"contactNo":null,"gstin":null,"gst":null,"sgst":null,"cgst":null,"igst":null,"mapping":[{"id":null,"operationTo":null,"rate":null}]},"form":{"name":"subContractorMaster","id":"subContractorMaster","autoGenKey":"subContractorCode","fields":{"subContractorCode":{"name":"Sub Contractor Code","id":"subContractorCode","type":"span","valuePrefix":"VT-SC-"},"subContractorName":{"name":"Sub Contractor Name","id":"subContractorName","type":"input","inputType":"text","action":"isCheckExistField","required":true},"address":{"name":"Address","id":"address","type":"input","inputType":"text","required":true},"contactNo":{"name":"Contact No","id":"contactNo","type":"input","inputType":"number","required":true},"gstin":{"name":"GSTIN","id":"gstin","type":"input","inputType":"text","required":true},"gst":{"name":"GST %","id":"gst","type":"input","inputType":"number"},"sgst":{"name":"SGST %","id":"sgst","type":"input","inputType":"number"},"cgst":{"name":"CGST %","id":"cgst","type":"input","inputType":"number"},"igst":{"name":"IGST %","id":"igst","type":"input","inputType":"number"}},"mapping":{"name":"Part Mapping","fields":{"id":{"name":"Part No","id":"id","type":"select","options":{},"action":"changeMapping","dataFrom":"marketing.partMaster","replaceName":"partNo","required":true},"operationTo":{"name":"Op Name","id":"operationTo","type":"select","options":{},"dataFrom":"production.operationMaster","replaceName":"opName","filter":{"source":["Sub-Contractor"]},"required":true},"rate":{"name":"Rate","id":"rate","type":"input","inputType":"text","required":true}}}},"listView":[{"title":"Sub Contractor Code","id":"subContractorCode","valuePrefix":"VT-SC-"},{"title":"Sub Contractor Name","id":"subContractorCode","dataFrom":"purchase.subContractorMaster","replaceName":"subContractorName","type":"select","isFilterBy":true}],"page":{"link":"purchase/subContractorMaster","name":"list"}},"poSubContractor":{"id":"poSubContractor","title":"Purchase Order - Sub Contractor","masterData":{"poNo":null,"date":null,"subContractorCode":null,"gstin":null,"status":0,"gst":null,"sgst":null,"cgst":null,"igst":null,"gstTotal":null,"total":null,"mapping":[{"id":null,"operationTo":null,"qty":null,"uomCode":null,"rate":null,"total":null}]},"form":{"name":"poSubContractor","id":"poSubContractor","autoGenKey":"poNo","fields":{"poNo":{"name":"PO Code","id":"poNo","type":"span","valuePrefix":"VT-SC-PO-"},"date":{"name":"Date","id":"date","type":"input","inputType":"date","required":true},"subContractorCode":{"name":"Sub Contractor Code","id":"subContractorCode","type":"select","options":{},"action":"changeMapping","updateMapping":true,"updateData":["gstin","gst","sgst","cgst","igst","mapping"],"dataFrom":"purchase.subContractorMaster","replaceName":"subContractorName","isSingle":true,"callBack":false},"extraAmount":{"name":"Extra Amount","id":"extraAmount","type":"input","inputType":"number","action":"updatePOTotalAmount","afterMapping":true},"gstTotal":{"name":"Tax Total","id":"gstTotal","type":"span","afterMapping":true},"total":{"name":"Total","id":"total","type":"span","afterMapping":true}},"mapping":{"name":"Part Mapping","fields":{"id":{"name":"Part No","id":"id","type":"select","options":{},"action":"changeMapping","updateData":["uomCode"],"dataFrom":"marketing.partMaster","replaceName":"partNo","isDisable":true},"operationTo":{"name":"Op Name","id":"operationTo","type":"select","options":{},"dataFrom":"production.operationMaster","replaceName":"opName","isDisable":true},"acceptedQty":{"name":"Qty","id":"acceptedQty","type":"input","inputType":"text","action":"updatePORmTotal","required":true},"uomCode":{"name":"UOM","id":"uomCode","type":"select","options":{},"dataFrom":"marketing.uomMaster","replaceName":"uomName","isDisable":true},"rate":{"name":"Rate","id":"rate","type":"input","inputType":"text","action":"updatePORmTotal","required":true},"total":{"name":"total","id":"total","type":"span"}},"actions":{"add":false}}},"listView":[{"title":"PO NO","id":"poNo","valuePrefix":"VT-SC-PO-"},{"title":"SubContractor Code","id":"subContractorCode","dataFrom":"purchase.subContractorMaster","replaceName":"subContractorName","type":"select","isFilterBy":true},{"title":"Stutus","id":"status"}],"page":{"link":"purchase/poSubContractor","name":"list"},"services":{"list":{"params":{"year":true}}}}},"store":{"id":"store","name":"Store","title":"Store","icon":"suitcase","grnSupplier":{"id":"grnSupplier","title":"Good Receipt Note - Supplier","masterData":{"grnNo":null,"date":null,"supplierCode":null,"poNo":null,"supplierInvoiceNo":null,"supplierInvoiceDate":null,"status":0,"subTotal":null,"extraAmount":null,"gst":null,"sgst":null,"cgst":null,"igst":null,"gstTotal":null,"total":null,"mapping":[{"id":null,"qty":null,"uomCode":null,"receivedQty":null,"acceptedQty":null,"rate":null,"cost":null,"total":null}]},"form":{"name":"grnSupplier","id":"grnSupplier","autoGenKey":"grnNo","disableByField":"id","fields":{"grnNo":{"name":"GRN No","id":"grnNo","type":"span","valuePrefix":"VT-GRN-"},"date":{"name":"Date","id":"date","type":"input","inputType":"date","required":true},"supplierCode":{"name":"Supplier Code","id":"supplierCode","type":"select","options":{},"action":"getPOSupplier","dataFrom":"purchase.supplierMaster","replaceName":"supplierName","isSingle":true},"poNo":{"name":"PO No","id":"poNo","type":"select","options":{},"action":"changeMapping","updateMapping":true,"updateData":["mapping","subTotal","extraAmount","gst","sgst","cgst","igst","gstTotal","total"],"dataFrom":"purchase.poSupplier","replaceName":"poNo","valuePrefix":"VT-SP-PO-","filter":{"status":0},"isEditDisable":true,"isSingle":true},"supplierInvoiceNo":{"name":"Supplier Invoice No","id":"supplierInvoiceNo","type":"input","inputType":"text","required":true},"supplierInvoiceDate":{"name":"Supplier Invoice Date","id":"supplierInvoiceDate","type":"input","inputType":"date","required":true},"subTotal":{"name":"Sub Total","id":"subTotal","afterMapping":true,"type":"span"},"extraAmount":{"name":"Extra Amount","id":"extraAmount","type":"input","inputType":"number","action":"updatePOTotalAmount","afterMapping":true},"gstTotal":{"name":"Tax Total","id":"gstTotal","type":"span","afterMapping":true},"total":{"name":"Total","id":"total","type":"span","afterMapping":true}},"mapping":{"name":"Detail Mapping","fields":{"id":{"name":"RM Name","id":"id","type":"select","options":{},"dataFrom":"purchase.rmMaster","replaceName":"rmName","valuePrefixData":"grade","isDisable":true},"qty":{"name":"PO Qty","id":"qty","type":"span"},"uomCode":{"name":"UOM","id":"uomCode","type":"select","options":{},"dataFrom":"marketing.uomMaster","replaceName":"uomName","isDisable":true},"receivedQty":{"name":"Received Qty","id":"receivedQty","type":"input","inputType":"text","action":"updateRmTotal","required":true},"acceptedQty":{"name":"Accepted Qty","id":"acceptedQty","type":"input","inputType":"text","action":"updateRmTotal","required":true},"rate":{"name":"Rate","id":"rate","type":"span"},"total":{"name":"Total","id":"total","type":"span"}},"actions":{"add":false}}},"listView":[{"title":"GRN NO","id":"grnNo","valuePrefix":"VT-GRN-"},{"title":"Supplier","id":"supplierCode","dataFrom":"purchase.supplierMaster","replaceName":"supplierName","type":"select","isFilterBy":true}],"page":{"link":"store/grnSupplier","name":"list"},"services":{"list":{"params":{"year":true}}}},"grnGeneralSupplier":{"id":"grnGeneralSupplier","title":"Good Receipt Note - General Supplier","masterData":{"grnNo":null,"date":null,"generalSupplierCode":null,"poNo":null,"generalSupplierInvoiceNo":null,"generalSupplierInvoiceDate":null,"status":0,"subTotal":null,"extraAmount":null,"gst":null,"sgst":null,"cgst":null,"igst":null,"gstTotal":null,"total":null,"mapping":[{"id":null,"qty":null,"uomCode":null,"receivedQty":null,"acceptedQty":null,"rate":null,"cost":null,"total":null}]},"form":{"name":"grnSupplier","id":"grnSupplier","autoGenKey":"grnNo","disableByField":"id","fields":{"grnNo":{"name":"GRN No","id":"grnNo","type":"span","valuePrefix":"VT-GRN-"},"date":{"name":"Date","id":"date","type":"input","inputType":"date","required":true},"supplierCode":{"name":"General Supplier Code","id":"generalSupplierCode","type":"select","options":{},"action":"getPOGeneralSupplier","dataFrom":"purchase.generalSupplierMaster","replaceName":"generalSupplierName","isSingle":true,"isEditDisable":true},"poNo":{"name":"PO No","id":"poNo","type":"select","options":{},"action":"changeMapping","updateMapping":true,"updateData":["mapping","subTotal","extraAmount","gst","sgst","cgst","igst","gstTotal","total"],"dataFrom":"purchase.poGeneralSupplier","replaceName":"poNo","valuePrefix":"VT-GSP-PO-","filter":{"status":0},"isEditDisable":true,"isSingle":true},"supplierInvoiceNo":{"name":"General Supplier Invoice No","id":"generalSupplierInvoiceNo","type":"input","inputType":"text","required":true},"supplierInvoiceDate":{"name":"General Supplier Invoice Date","id":"generalSupplierInvoiceDate","type":"input","inputType":"date","required":true},"subTotal":{"name":"Sub Total","id":"subTotal","afterMapping":true,"type":"span"},"extraAmount":{"name":"Extra Amount","id":"extraAmount","type":"input","inputType":"number","action":"updatePOTotalAmount","afterMapping":true},"gstTotal":{"name":"Tax Total","id":"gstTotal","type":"span","afterMapping":true},"total":{"name":"Total","id":"total","type":"span","afterMapping":true}},"mapping":{"name":"Detail Mapping","fields":{"id":{"name":"Part No","id":"id","type":"select","options":{},"dataFrom":"marketing.partMaster","replaceName":"partNo","isDisable":true},"qty":{"name":"PO Qty","id":"qty","type":"span"},"uomCode":{"name":"UOM","id":"uomCode","type":"select","options":{},"dataFrom":"marketing.uomMaster","replaceName":"uomName","isDisable":true},"receivedQty":{"name":"Received Qty","id":"receivedQty","type":"input","inputType":"text","action":"updatePTTotal","required":true},"acceptedQty":{"name":"Accepted Qty","id":"acceptedQty","type":"input","inputType":"text","action":"updatePTTotal","required":true},"rate":{"name":"Rate","id":"rate","type":"span"},"total":{"name":"Total","id":"total","type":"span"}},"actions":{"add":false}}},"listView":[{"title":"GRN NO","id":"grnNo","valuePrefix":"VT-GRN-"},{"title":"General General Supplier","id":"generalSupplierCode","dataFrom":"purchase.generalSupplierMaster","replaceName":"generalSupplierName","type":"select","isFilterBy":true}],"page":{"link":"store/grnGeneralSupplier","name":"list"},"services":{"list":{"params":{"year":true}}}},"dcSubContractor":{"id":"dcSubContractor","title":"Delivery Chellan - Sub Contractor","masterData":{"dcNo":null,"date":null,"subContractorCode":null,"address":null,"gstin":null,"poNo":null,"status":0,"extraAmount":null,"gst":null,"sgst":null,"cgst":null,"igst":null,"gstTotal":null,"total":null,"mapping":[{"id":null,"operationFrom":null,"operationTo":null,"acceptedQty":null,"uomCode":null,"rate":null,"total":null}]},"form":{"name":"dcSubContractor","id":"dcSubContractor","disableByField":"id","autoGenKey":"dcNo","fields":{"dcNo":{"name":"DC No","id":"dcNo","type":"span","valuePrefix":"VT-DC-"},"date":{"name":"Date","id":"date","type":"input","inputType":"date","required":true},"subContractorCode":{"name":"To Sub Contractor","id":"subContractorCode","type":"select","options":{},"action":"getPOSubContractor","dataFrom":"purchase.subContractorMaster","replaceName":"subContractorName","updateData":["address","gstin"],"isSingle":true,"isEditDisable":true},"address":{"name":"Address","id":"address","type":"span"},"gstin":{"name":"GSTIN","id":"gstin","type":"span"},"poNo":{"name":"PO No","id":"poNo","type":"select","options":{},"action":"changeMapping","dataFrom":"purchase.poSubContractor","replaceName":"poNo","valuePrefix":"VT-SC-PO-","updateMapping":true,"updateData":["mapping","subTotal","extraAmount","gst","sgst","cgst","igst","gstTotal","total"],"filter":{"status":0},"isSingle":true,"isEditDisable":true},"extraAmount":{"name":"Extra Amount","id":"extraAmount","type":"input","inputType":"number","action":"updatePOTotalAmount","afterMapping":true},"gstTotal":{"name":"GST/IGST Total","id":"gstTotal","type":"span","afterMapping":true},"total":{"name":"Total","id":"total","type":"span","afterMapping":true}},"mapping":{"name":"Detail Mapping","fields":{"id":{"name":"Part No","id":"id","type":"select","options":{},"dataFrom":"marketing.partMaster","replaceName":"partNo","isDisable":true},"operationFrom":{"name":"Part From","id":"operationFrom","type":"select","options":{},"required":true,"dataFrom":"production.operationMaster","replaceName":"opName","valuePrefixData":"opCode","isDisable":true},"operationTo":{"name":"For the purpose","id":"operationTo","type":"select","options":{},"dataFrom":"production.operationMaster","replaceName":"opName","valuePrefixData":"opCode","isDisable":true},"acceptedQty":{"name":"Qty","id":"acceptedQty","type":"input","inputType":"text","action":"updatePartTotal","required":true},"uomCode":{"name":"UOM","id":"uomCode","type":"select","options":{},"dataFrom":"marketing.uomMaster","replaceName":"uomName","isDisable":true},"rate":{"name":"Rate","id":"rate","type":"span"},"total":{"name":"total","id":"total","type":"span"}},"actions":{"add":false}}},"listView":[{"title":"DC NO","id":"dcNo","valuePrefix":"VT-DC-"},{"title":"Sub Contractor Code","id":"subContractorCode","dataFrom":"purchase.subContractorMaster","replaceName":"subContractorName","type":"select","isFilterBy":true},{"title":"Stutus","id":"status"}],"page":{"link":"store/dcSubContractor","name":"list"},"services":{"list":{"params":{"year":true}}}},"grnSubContractor":{"id":"grnSubContractor","title":"Good Receipt Note - Sub Contractor","masterData":{"grnNo":null,"date":null,"subContractorCode":null,"poNo":null,"subContractorDCNo":null,"subContractorDCDate":null,"dcNo":null,"status":0,"extraAmount":null,"gst":null,"sgst":null,"cgst":null,"igst":null,"gstTotal":null,"total":null,"mapping":[{"id":null,"operationFrom":null,"operationTo":null,"uomCode":null,"receivedQty":null,"acceptedQty":null,"rate":null,"gst":null,"cost":null,"total":null}]},"form":{"name":"grnSubContractor","id":"grnSubContractor","disableByField":"id","autoGenKey":"grnNo","fields":{"grnNo":{"name":"GRN No","id":"grnNo","type":"span","valuePrefix":"VT-SC-GRN-"},"date":{"name":"Date","id":"date","type":"input","inputType":"date","required":true},"subContractorCode":{"name":"Sub Contractor Code","id":"subContractorCode","type":"select","options":{},"action":"getPOSubContractor","dataFrom":"purchase.subContractorMaster","replaceName":"subContractorName","isSingle":true},"poNo":{"name":"PO No","id":"poNo","type":"select","options":{},"action":"getDCSubContractor","dataFrom":"purchase.poSubContractor","replaceName":"poNo","valuePrefix":"VT-SC-PO-","filter":{"status":0},"isSingle":true,"isEditDisable":true},"dcNo":{"name":"Our DC No","id":"dcNo","type":"select","options":{},"dataFrom":"store.dcSubContractor","action":"changeMapping","replaceName":"dcNo","valuePrefix":"VT-DC-","updateMapping":true,"updateData":["mapping","subTotal","extraAmount","gst","sgst","cgst","igst","gstTotal","total"],"filter":{"status":0},"isSingle":true,"isEditDisable":true,"onLoadActions":true},"subContractorDCCode":{"name":"Sub Contractor DC Code","id":"subContractorDCCode","type":"input","inputType":"number","required":true},"subContractorDCDate":{"name":"Sub Contractor DC Date","id":"subContractorDCDate","type":"input","inputType":"date","required":true},"extraAmount":{"name":"Extra Amount","id":"extraAmount","type":"input","inputType":"number","action":"updatePOTotalAmount","afterMapping":true},"gstTotal":{"name":"GST/IGST Total","id":"gstTotal","type":"span","afterMapping":true},"total":{"name":"Total","id":"total","type":"span","afterMapping":true}},"mapping":{"name":"Detail Mapping","fields":{"id":{"name":"Part No","id":"id","type":"select","options":{},"dataFrom":"marketing.partMaster","replaceName":"partNo","isDisable":true},"operationFrom":{"name":"Part From","id":"operationFrom","type":"select","options":{},"dataFrom":"production.operationMaster","replaceName":"opName","valuePrefixData":"opCode","isDisable":true},"operationTo":{"name":"Op Name","id":"operationTo","type":"select","options":{},"dataFrom":"production.operationMaster","replaceName":"opName","valuePrefixData":"opCode","isDisable":true},"receivedQty":{"name":"Received Qty","id":"receivedQty","type":"input","inputType":"text","action":"updatePartTotal","required":true},"acceptedQty":{"name":"Accepted Qty","id":"acceptedQty","type":"input","inputType":"text","action":"updatePartTotal","required":true},"uomCode":{"name":"UOM","id":"uomCode","type":"select","options":{},"dataFrom":"marketing.uomMaster","replaceName":"uomName","isDisable":true},"rate":{"name":"Rate","id":"rate","type":"span"},"total":{"name":"total","id":"total","type":"span"}},"actions":{"add":false}}},"listView":[{"title":"GRN NO","id":"grnNo","valuePrefix":"VT-SC-GRN-"},{"title":"Sub Contractor Code","id":"subContractorCode","dataFrom":"purchase.subContractorMaster","replaceName":"subContractorName","type":"select","isFilterBy":true}],"page":{"link":"store/grnSubContractor","name":"list"},"services":{"list":{"params":{"year":true}}}}},"production":{"id":"production","name":"Production","title":"Production","icon":"cogs","operationMaster":{"id":"operationMaster","title":"Operation Master","masterData":{"opCode":null,"opName":null,"source":null},"form":{"name":"operationMaster","id":"operationMaster","fields":{"opCode":{"name":"Operation","id":"opCode","type":"input","inputType":"text","required":true},"opName":{"name":"Operation Name","id":"opName","type":"input","inputType":"text","action":"isCheckExistField","required":true},"source":{"name":"Source","id":"source","type":"select","options":{"Supplier":{"optionId":"Supplier","optionName":"Supplier"},"In-House":{"optionId":"In-House","optionName":"IN House"},"In-House-Assembly":{"optionId":"In-House-Assembly","optionName":"IN House Assembly"},"Sub-Contractor":{"optionId":"Sub-Contractor","optionName":"Sub Contractor"}},"makeFieldOptions":false,"required":true}}},"listView":[{"title":"Operation","id":"opCode"},{"title":"Operation Name","id":"id","dataFrom":"production.operationMaster","replaceName":"opName","type":"select","isFilterBy":true}],"page":{"link":"production/operationMaster","name":"list"}},"bom":{"id":"bom","title":"BOM","masterData":{"partNo":null,"partName":null,"rmCode":null,"partNorms":null},"form":{"name":"bom","id":"bom","fields":{"partNo":{"name":"Part No","id":"partNo","type":"select","options":{},"dataFrom":"marketing.partMaster","replaceName":"partNo","updateData":["rmCode","partName"],"action":"changeMapping","existingCheck":true,"isSingle":true},"partName":{"name":"Part Name","id":"partName","type":"span"},"rmCode":{"name":"RM Code","id":"rmCode","type":"select","options":{},"dataFrom":"purchase.rmMaster","replaceName":"rmName","valuePrefixData":"grade","isSingle":true},"partNorms":{"name":"Part Norms","id":"partNorms","type":"input","inputType":"text","required":true}}},"listView":[{"title":"Part No","id":"partNo","dataFrom":"marketing.partMaster","replaceName":"partNo","type":"select","isFilterBy":true},{"title":"RM Name","id":"rmCode","dataFrom":"purchase.rmMaster","replaceName":"rmName","valuePrefixData":"grade","type":"select","isFilterBy":true}],"page":{"link":"production/bom","name":"list"}},"bomAssemblePart":{"id":"bomAssemblePart","title":"BOM Assemble Part","masterData":{"partNo":null,"partName":null,"mapping":[{"id":null,"partName":null,"partNorms":null}]},"form":{"name":"bomAssemblePart","id":"bomAssemblePart","fields":{"partNo":{"name":"Part No","id":"partNo","type":"select","options":{},"dataFrom":"marketing.partMaster","replaceName":"partNo","updateData":["partName"],"action":"changeMapping","existingCheck":true,"isSingle":true,"filter":{"isAssemblePart":1}},"partName":{"name":"Part Name","id":"partName","type":"span"}},"mapping":{"name":"Sub Part Mapping","enabled":false,"fields":{"id":{"name":"Sub Part No","id":"id","type":"select","options":{},"dataFrom":"marketing.partMaster","replaceName":"partNo","action":"changeMapping","updateData":["partName"],"isSingle":true},"partName":{"name":"Part Name","id":"partName","type":"span"},"partNorms":{"name":"Part Norms","id":"partNorms","type":"input","inputType":"text","required":true}}}},"listView":[{"title":"Part No","id":"partNo","dataFrom":"marketing.partMaster","replaceName":"partNo","type":"select","isFilterBy":true,"filter":{"isAssemblePart":1}}],"page":{"link":"production/bomAssemblePart","name":"list"}},"machineMaster":{"id":"machineMaster","title":"Machine Master","masterData":{"machineNo":null,"machineName":null,"make":null,"model":null,"capacity":null,"yop":null,"id":null,"machineShiftRate":null,"shiftHrs":null},"form":{"name":"machineMaster","id":"machineMaster","autoGenKey":"machineNo","fields":{"machineNo":{"name":"Machine No","id":"machineNo","type":"span","valuePrefix":"VT-M/C-"},"machineName":{"name":"Machine Name","id":"machineName","type":"input","inputType":"text","action":"isCheckExistField","required":true},"make":{"name":"Make","id":"make","type":"input","inputType":"text","required":true},"model":{"name":"Model","id":"model","type":"input","inputType":"text","required":true},"capacity":{"name":"Capacity","id":"capacity","type":"input","inputType":"text","required":true},"yop":{"name":"Year of Purchase","id":"yop","type":"input","inputType":"text","required":true},"value":{"name":"Value","id":"value","type":"input","inputType":"text","required":true},"machineShiftRate":{"name":"Machine Shift Rate","id":"machineShiftRate","type":"input","inputType":"text","required":true},"shiftHrs":{"name":"Shift Hrs","id":"shiftHrs","type":"input","inputType":"text","required":true}}},"listView":[{"title":"Machine No","id":"machineNo","valuePrefix":"VT-M/C-"},{"title":"Machine Name","id":"machineNo","dataFrom":"production.machineMaster","replaceName":"machineName","type":"select","isFilterBy":true}],"page":{"link":"production/machineMaster","name":"list"}},"flowMaster":{"id":"flowMaster","title":"Flow Master","masterData":{"partNo":null,"partName":null,"mapping":[{"id":null,"opName":null,"source":null,"toolNo":null,"machineNo":null,"palnQtyPerHr":null,"costAnalysis":null,"otherCost":null}],"totalCost":null},"form":{"name":"flowMaster","id":"flowMaster","fields":{"partNo":{"name":"Part No","id":"partNo","type":"select","options":{},"required":true,"action":"changeMapping","updateData":["partName"],"dataFrom":"marketing.partMaster","replaceName":"partNo","existingCheck":true,"isSingle":true},"partName":{"name":"Part Name","id":"partName","type":"span"},"totalCost":{"name":"Total Cost","id":"totalCost","type":"span","afterMapping":true}},"mapping":{"name":"OP Mapping","fields":{"id":{"name":"Part op code","id":"id","type":"select","options":{},"action":"changeMapping","dataFrom":"production.operationMaster","replaceName":"opName","valuePrefixData":"opCode","required":true},"opName":{"name":"op Name","id":"opName","type":"span"},"source":{"name":"Source","id":"source","type":"span"},"toolNo":{"name":"Tool Name","id":"toolNo","type":"select","options":{},"dataFrom":"production.toolMaster","replaceName":"toolName","required":true},"machineNo":{"name":"M/C No","id":"machineNo","type":"select","options":{},"dataFrom":"production.machineMaster","replaceName":"machineName","action":"updateCostAnalysis","required":true},"palnQtyPerHr":{"name":"Paln Qty Per Hr","id":"palnQtyPerHr","type":"input","inputType":"number","action":"updateCostAnalysis","required":true},"costAnalysis":{"name":"Cost Analysis","id":"costAnalysis","type":"span"},"otherCost":{"name":"Other Cost","id":"otherCost","type":"input","inputType":"number","action":"updateTotalCost"}}}},"listView":[{"title":"Part NO","id":"partNo","dataFrom":"marketing.partMaster","replaceName":"partNo","type":"select","isFilterBy":true}],"page":{"link":"store/flowMaster","name":"list"}},"toolMaster":{"id":"toolMaster","title":"Tool Master","masterData":{"toolNo":null,"toolName":null,"make":null,"type":null,"toolLife":null,"yop":null,"id":null},"form":{"name":"toolMaster","id":"toolMaster","autoGenKey":"toolNo","fields":{"toolNo":{"name":"Tool No","id":"toolNo","type":"span","valuePrefix":"VT-T-"},"toolName":{"name":"Tool Name","id":"toolName","type":"input","inputType":"text","action":"isCheckExistField","required":true},"make":{"name":"Make","id":"make","type":"input","inputType":"text","required":true},"type":{"name":"Type","id":"type","type":"input","inputType":"text","required":true},"toolLife":{"name":"Tool Life","id":"toolLife","type":"input","inputType":"text","required":true},"yop":{"name":"Year of Purchase","id":"yop","type":"input","inputType":"text","required":true},"value":{"name":"Value","id":"value","type":"input","inputType":"text","required":true}}},"listView":[{"title":"Tool No","id":"toolNo","valuePrefix":"VT-T-"},{"title":"Tool Name","id":"toolNo","dataFrom":"production.toolMaster","replaceName":"toolName","type":"select","isFilterBy":true}],"page":{"link":"production/toolMaster","name":"list"}},"materialIssueNote":{"id":"materialIssueNote","title":"Material Issue Note","masterData":{"jobCardNo":null,"date":null,"rmCode":null,"partNo":null,"partNorms":null,"issueQty":null,"qtyCanMake":null,"operationTo":null,"status":0},"form":{"name":"materialIssueNote","id":"materialIssueNote","autoGenKey":"jobCardNo","disableByField":"id","fields":{"jobCardNo":{"name":"Job Card No","id":"jobCardNo","type":"span","valuePrefix":"VT-"},"date":{"name":"Job Card Date","id":"date","type":"input","inputType":"date","required":true},"rmCode":{"name":"RM Code","id":"rmCode","type":"select","options":{},"dataFrom":"purchase.rmMaster","replaceName":"rmName","valuePrefixData":"grade","action":"getPartNo","isEditDisable":true,"isSingle":true},"partNo":{"name":"Part No","id":"partNo","type":"select","options":{},"dataFrom":"marketing.partMaster","replaceName":"partNo","action":"getNorms","isEditDisable":true,"isSingle":true},"partNorms":{"name":"Part Norms","id":"partNorms","type":"input","inputType":"text","required":true,"action":"updateQtyMake"},"issueQty":{"name":"Issue Qty","id":"issueQty","type":"input","inputType":"text","required":true,"action":"updateQtyMake"},"qtyCanMake":{"name":"Qty Can Make","id":"qtyCanMake","type":"input","inputType":"text","isDisable":true,"required":true},"operationTo":{"name":"Issue Stage","id":"operationTo","type":"select","options":{},"required":true,"dataFrom":"production.operationMaster","replaceName":"opName","valuePrefixData":"opCode","filter":{"source":["Supplier"]},"isEditDisable":true,"isSingle":true}}},"listView":[{"title":"Job Card No","id":"jobCardNo","valuePrefix":"VT-"},{"title":"PartNo","id":"partNo","dataFrom":"marketing.partMaster","replaceName":"partNo","type":"select","isFilterBy":true},{"title":"Qty Can Make","id":"qtyCanMake"},{"title":"Date","id":"date","type":"date"},{"title":"Status","id":"status"}],"page":{"link":"production/materialIssueNote","name":"list"},"services":{"list":{"params":{"year":true}}}},"assembleMaterialIssueNote":{"id":"assembleMaterialIssueNote","title":"Assemble Material Issue Note","masterData":{"jobCardNo":null,"date":null,"partNo":null,"status":0,"operationTo":null,"qtyCanMake":null,"isAssemblePart":1,"mapping":[{"id":null,"partName":null,"partNorms":null,"issueQty":null,"qtyCanMake":null,"operationTo":null}]},"form":{"name":"assembleMaterialIssueNote","id":"assembleMaterialIssueNote","autoGenKey":"jobCardNo","disableByField":"id","fields":{"jobCardNo":{"name":"Job Card No","id":"jobCardNo","type":"span","valuePrefix":"VT-"},"date":{"name":"Job Card Date","id":"date","type":"input","inputType":"date","required":true},"partNo":{"name":"Part No","id":"partNo","type":"select","options":{},"dataFrom":"marketing.partMaster","replaceName":"partNo","action":"getSubParts","isSingle":true,"filter":{"isAssemblePart":1}},"operationTo":{"name":"Issue Stage","id":"operationTo","type":"select","options":{},"required":true,"dataFrom":"production.operationMaster","replaceName":"opName","valuePrefixData":"opCode","isEditDisable":true,"filter":{"source":["In-House-Assembly"]},"isSingle":true},"qtyCanMake":{"name":"Total Qty Can Make","id":"qtyCanMake","type":"input","inputType":"text","isDisable":true,"required":true,"afterMapping":true}},"mapping":{"name":"Sub Part Mapping","enabled":false,"fields":{"id":{"name":"Sub Part No","id":"id","type":"select","options":{},"dataFrom":"marketing.partMaster","replaceName":"partNo","isDisable":true,"isSingle":true},"partName":{"name":"Part Name","id":"partName","type":"span"},"partNorms":{"name":"Part Norms","id":"partNorms","type":"span"},"issueQty":{"name":"Issue Qty","id":"issueQty","type":"input","inputType":"text","required":true,"action":"updateQtyMake"},"qtyCanMake":{"name":"Qty Can Make","id":"qtyCanMake","type":"input","inputType":"text","isDisable":true,"required":true}},"actions":{"add":false}}},"listView":[{"title":"Job Card No","id":"jobCardNo","valuePrefix":"VT-"},{"title":"PartNo","id":"partNo","dataFrom":"marketing.partMaster","replaceName":"partNo","type":"select","isFilterBy":true,"filter":{"isAssemblePart":1}},{"title":"Qty Can Make","id":"qtyCanMake"},{"title":"Date","id":"date","type":"date"},{"title":"Status","id":"status"}],"page":{"link":"production/assembleMaterialIssueNote","name":"list","filter":{"isAssemblePart":1}},"services":{"list":{"id":"materialIssueNote","params":{"year":true}}}},"productionEntry":{"id":"productionEntry","title":"Production Entry","masterData":{"jobCardNo":null,"partNo":null,"mapping":[{"date":null,"machineNo":null,"operationFrom":null,"operationTo":null,"toolNo":null,"operator":null,"startTime":null,"endTime":null,"planQty":null,"acceptedQty":null,"rejectionQty":null,"rwQty":null}]},"form":{"name":"productionEntry","id":"productionEntry","disableByField":"id","fields":{"jobCardNo":{"name":"Job Card No","id":"jobCardNo","type":"select","options":{},"required":true,"dataFrom":"production.materialIssueNote","replaceName":"jobCardNo","valuePrefix":"VT-","action":"changeMapping","updateData":["partNo"],"existingCheck":true,"isEditDisable":true,"isSingle":true,"onLoadActions":true},"partNo":{"name":"Part No","id":"partNo","type":"select","options":{},"required":true,"dataFrom":"marketing.partMaster","replaceName":"partNo","isDisable":true,"isEditDisable":true,"isSingle":true}},"mapping":{"name":"Production Mapping","fields":{"date":{"name":"Date","id":"date","type":"input","inputType":"date","required":true},"machineNo":{"name":"M/C No","id":"machineNo","type":"select","options":{},"dataFrom":"production.machineMaster","replaceName":"machineName","required":true},"operationFrom":{"name":"Operation From","id":"operationFrom","type":"select","options":{},"action":"updateOperationTo","dataFrom":"production.operationMaster","replaceName":"opName","valuePrefixData":"opCode","required":true},"operationTo":{"name":"Operation To","id":"operationTo","type":"select","options":{},"required":true,"dataFrom":"production.operationMaster","replaceName":"opName","action":"updateToolNo","valuePrefixData":"opCode"},"toolName":{"name":"Tool Name","id":"toolNo","type":"select","options":{},"dataFrom":"production.toolMaster","replaceName":"toolName"},"operator":{"name":"Operator","id":"operator","type":"select","options":{},"required":true,"dataFrom":"marketing.empMaster","replaceName":"employeeName"},"startTime":{"name":"Start Time: (1-24)","id":"startTime","type":"input","inputType":"number","required":true},"endTime":{"name":"End Time: (1-24)","id":"endTime","type":"input","inputType":"number","required":true,"action":"calculatePlanQty"},"planQty":{"name":"Plan Qty","id":"planQty","type":"input","inputType":"number","required":true},"acceptedQty":{"name":"Accepted Qty","id":"acceptedQty","type":"input","inputType":"number","required":true,"action":"checkAcceptedQty"},"rejectionQty":{"name":"Rejection Qty","id":"rejectionQty","type":"input","inputType":"number","required":true,"action":"checkAcceptedQty"},"rwQty":{"name":"R/w Qty","id":"rwQty","type":"input","inputType":"number","required":true,"action":"checkAcceptedQty"}},"actions":{"add":false,"delete":false}}},"listView":[{"title":"Job Card No","id":"jobCardNo","dataFrom":"production.materialIssueNote","isFilterBy":true,"replaceName":"id","valuePrefix":"VT-","type":"select","options":{}},{"title":"Part No","id":"partNo","dataFrom":"marketing.partMaster","replaceName":"partNo","type":"select","isFilterBy":true,"options":{}}],"page":{"link":"production/productionEntry","name":"list","downloadTableData":"prodEntryDownload"},"services":{"list":{"params":{"year":true}}}}},"report":{"id":"report","name":"Report","title":"Report","icon":"tasks","rmStock":{"id":"rmStock","title":"Raw Material Stock","masterData":{"rmName":null,"rmStockQty":null,"uomCode":null},"form":{"name":"RMStock","id":"RMStock","fields":{"rmName":{"name":"RM Name","id":"rmCode","type":"select","options":{},"action":"changeMapping","updateData":["uomCode"],"dataFrom":"purchase.rmMaster","replaceName":"rmName","valuePrefixData":"grade","isSingle":true},"rmStockQty":{"name":"Stock Qty","id":"rmStockQty","type":"input","inputType":"number","required":true},"uomCode":{"name":"UOM","id":"uomCode","type":"select","options":{},"dataFrom":"marketing.uomMaster","replaceName":"uomName","isSingle":true}}},"listView":[{"title":"Raw Material Name","id":"rmCode","dataFrom":"purchase.rmMaster","replaceName":"rmName","valuePrefixData":"grade","isFilterBy":true,"type":"select","options":{}},{"title":"Rm Stock Qty","id":"rmStockQty"},{"title":"UOM","id":"uomCode","dataFrom":"marketing.uomMaster","replaceName":"uomName"},{"title":"Rate","id":"rate"},{"title":"Total Amount","id":"totalAmount"},{"title":"Updated","id":"updated","type":"input","inputType":"date"}],"page":{"link":"report/rmStock","name":"list","downloadExcel":true,"downloadTableData":true}},"partStock":{"id":"partStock","title":"Part Stock","masterData":{"partNo":null,"partStockQty":null,"operationFrom":null,"operationTo":null},"form":{"name":"PartStock","id":"PartStock","fields":{"partNo":{"name":"Part No","id":"partNo","type":"select","options":{},"dataFrom":"marketing.partMaster","replaceName":"partNo","action":"updateOperationFrom","isSingle":true},"partStockQty":{"name":"Part Qty","id":"partStockQty","type":"input","inputType":"number","required":true},"operationFrom":{"name":"Operation From","id":"operationFrom","type":"select","options":{},"dataFrom":"production.operationMaster","action":"updateOperationTo","replaceName":"opName","isSingle":true},"operationTo":{"name":"Operation To","id":"operationTo","type":"select","options":{},"dataFrom":"production.operationMaster","replaceName":"opName","isSingle":true}}},"listView":[{"title":"Part No","id":"partNo","dataFrom":"marketing.partMaster","replaceName":"partNo","type":"select","isFilterBy":true},{"title":"Part Stock Qty","id":"partStockQty"},{"title":"Operation From","id":"operationFrom","dataFrom":"production.operationMaster","replaceName":"opName","type":"select"},{"title":"Operation To","id":"operationTo","dataFrom":"production.operationMaster","replaceName":"opName","type":"select"},{"title":"Rate","id":"rate"},{"title":"Total Amount","id":"totalAmount"},{"title":"Updated","id":"updated","type":"input","inputType":"date"}],"page":{"link":"report/partStock","name":"list","downloadExcel":true,"downloadTableData":true}},"subContractorStock":{"id":"subContractorStock","title":"SubContractor Stock","masterData":{"subContractorCode":null,"partStockQty":null,"operationFrom":null,"operationTo":null},"form":{"name":"subContractorStock","id":"subContractorStock","fields":{"subContractorCode":{"name":"SubContractor Code","id":"subContractorCode","type":"select","options":{},"dataFrom":"purchase.subContractorMaster","replaceName":"subContractorName","action":"getPartNos","isSingle":true},"partNo":{"name":"Part No","id":"partNo","type":"select","options":{},"dataFrom":"marketing.partMaster","replaceName":"partNo","action":"updateOperationFrom","isSingle":true},"partStockQty":{"name":"SubContractor Qty","id":"partStockQty","type":"input","inputType":"number","required":true},"operationFrom":{"name":"Operation From","id":"operationFrom","type":"select","options":{},"dataFrom":"production.operationMaster","action":"updateOperationTo","replaceName":"opName","isSingle":true},"operationTo":{"name":"Operation To","id":"operationTo","type":"select","options":{},"dataFrom":"production.operationMaster","replaceName":"opName","isSingle":true}}},"listView":[{"title":"SubContractor Code","id":"subContractorCode","dataFrom":"purchase.subContractorMaster","replaceName":"subContractorName","type":"select","isFilterBy":true},{"title":"Part No","id":"partNo","dataFrom":"marketing.partMaster","replaceName":"partNo","type":"select"},{"title":"Part Stock Qty","id":"partStockQty"},{"title":"Operation From","id":"operationFrom","dataFrom":"production.operationMaster","replaceName":"opName","type":"select","isFilterBy":true},{"title":"Operation To","id":"operationTo","dataFrom":"production.operationMaster","replaceName":"opName","type":"select","isFilterBy":true},{"title":"Rate","id":"rate"},{"title":"Total Amount","id":"totalAmount"},{"title":"Updated","id":"updated","type":"input","inputType":"date"}],"page":{"link":"report/subContractorStock","name":"list","downloadExcel":true,"downloadTableData":true}},"salesAnalysisInvoice":{"id":"salesAnalysisInvoice","title":"Sales Analysis - Invoice","cashBill":false,"filterView":{"title":"Filter","data":{"customerCode":null,"frmDate":null,"toDate":null},"fields":[{"title":"Customer","id":"customerCode","type":"select","dataFrom":"marketing.customerMaster","replaceName":"customerName"},{"title":"From Date","id":"frmDate","type":"input","inputType":"date"},{"title":"To Date","id":"toDate","type":"input","inputType":"date"}]},"listView":[{"title":"Customer","id":"customerCode","type":"select","dataFrom":"marketing.customerMaster","replaceName":"customerName"},{"title":"Part No","id":"partNo","dataFrom":"marketing.partMaster","replaceName":"partNo","type":"select"},{"title":"Part Qty","id":"unit"},{"title":"Part Price","id":"rate"},{"title":"Sales Value","id":"amount"},{"title":"Dates","id":"dates"},{"title":"Invoice Nos","id":"invoiceNos"}],"page":{"link":"report/salesAnalysisInvoice","name":"list","downloadExcel":true,"actions":false},"services":{"list":{"id":"invoice","params":{"year":true}}}},"salesAnalysisCashBill":{"id":"salesAnalysisCashBill","name":"salesAnalysisCashBill","title":"Sales Analysis - Cash Bill","parentModule":"report.salesAnalysisInvoice","cashBill":true,"page":{"link":"report/salesAnalysisCashBill","name":"list","downloadExcel":true,"actions":false},"services":{"list":{"id":"cashBill","params":{"year":true}}}},"costAnalysis":{"id":"costAnalysis","title":"Cost Analysis","listView":[{"title":"PartNo","id":"id","dataFrom":"marketing.partMaster","replaceName":"partNo","type":"select","isFilterBy":true},{"title":"Input Weight","id":"inputWeight"},{"title":"Finished Weight","id":"finishedWeight"},{"title":"RM Rate","id":"rmRate"},{"title":"Scrap Rate","id":"scrapRate"},{"title":"Material Cost","id":"materialCost"},{"title":"Conversion Cost","id":"conversionCost"},{"title":"Sub Total","id":"subTotal"},{"title":"Rej Cost","id":"rejCost"},{"title":"ICC cost","id":"iccCost"},{"title":"Tool Maint cost","id":"toolMaintCost"},{"title":"Trans Cost","id":"transCost"},{"title":"Profit Cost","id":"profitCost"},{"title":"Total","id":"total"},{"title":"Sales Rate","id":"salesRate"},{"title":"Difference in cost","id":"differenceInCost"},{"title":"% of Gain or Loss","id":"gainOrLoss"}],"page":{"link":"report/costAnalysis","name":"list","downloadExcel":true,"actions":false},"services":{"list":{"id":"partMaster"}}},"productionEntryReport":{"id":"productionEntryReport","title":"Production Entry Report","filterView":{"title":"Filter","data":{"frmDate":null,"toDate":null},"fields":[{"title":"From Date","id":"frmDate","type":"input","inputType":"date"},{"title":"To Date","id":"toDate","type":"input","inputType":"date"}]},"listView":[{"title":"Date","id":"date","type":"input","inputType":"date"},{"title":"M/C No","id":"machineNo","type":"select","dataFrom":"production.machineMaster","replaceName":"machineName"},{"title":"Job Card No","id":"jobCardNo","type":"input"},{"title":"Part No","id":"partNo","dataFrom":"marketing.partMaster","replaceName":"partNo","type":"select"},{"title":"Operation","id":"operationTo","dataFrom":"production.operationMaster","replaceName":"opName","valuePrefixData":"opCode","type":"select"},{"title":"Operator","id":"operator","type":"select","dataFrom":"marketing.empMaster","replaceName":"employeeName"},{"title":"Start Time","id":"startTime"},{"title":"End Time","id":"endTime"},{"title":"Plan Qty","id":"planQty"},{"title":"Qty","id":"acceptedQty"},{"title":"Rejection Qty","id":"rejectionQty"},{"title":"RW Qty","id":"rwQty"}],"page":{"link":"report/productionEntryReport","name":"list","downloadExcel":true,"actions":false},"services":{"list":{"id":"productionEntry","params":{"year":true}}}},"toolHistoryCard":{"id":"toolHistoryCard","title":"Tool History Card","filterView":{"title":"Filter","data":{"toolNo":null,"partNo":null,"frmDate":null,"toDate":null},"fields":[{"title":"Tool Name","id":"toolNo","type":"select","dataFrom":"production.toolMaster","replaceName":"toolName"},{"title":"Part No","id":"partNo","dataFrom":"marketing.partMaster","replaceName":"partNo","type":"select"},{"title":"From Date","id":"frmDate","type":"input","inputType":"date"},{"title":"To Date","id":"toDate","type":"input","inputType":"date"}]},"listView":[{"title":"Date","id":"date","type":"input","inputType":"date"},{"title":"Tool Name","id":"toolNo","type":"select","dataFrom":"production.toolMaster","replaceName":"toolName"},{"title":"Part No","id":"partNo","dataFrom":"marketing.partMaster","replaceName":"partNo","type":"select"},{"title":"Qty","id":"qty"},{"title":"Cummulative Qty","id":"cummulativeQty"},{"title":"Activity","id":"activity","dataFrom":"production.operationMaster","replaceName":"opName","valuePrefixData":"opCode"}],"page":{"link":"report/toolHistoryCard","name":"list","downloadExcel":true,"actions":false},"services":{"list":{"id":"productionEntry","params":{"year":true}}}},"machineRunningTime":{"id":"machineRunningTime","title":"Machine Running Time","filterView":{"title":"Filter","data":{"machineNo":null,"frmDate":null,"toDate":null},"fields":[{"title":"Machine Name","id":"machineNo","type":"select","dataFrom":"production.machineMaster","replaceName":"machineName"},{"title":"From Date","id":"frmDate","type":"input","inputType":"date"},{"title":"To Date","id":"toDate","type":"input","inputType":"date"}]},"listView":[{"title":"Date","id":"date","type":"input","inputType":"date"},{"title":"Machine No","id":"machineNo","type":"select","dataFrom":"production.machineMaster","replaceName":"machineName"},{"title":"Year","id":"machineNo","type":"select","dataFrom":"production.machineMaster","replaceName":"yop"},{"title":"Time On","id":"startTime"},{"title":"Time Off","id":"endTime"},{"title":"Running Time","id":"runningTime"},{"title":"Cum Running Time","id":"cumRunningTime"}],"page":{"link":"report/machineRunningTime","name":"list","downloadExcel":true,"actions":false},"services":{"list":{"id":"productionEntry","params":{"year":true}}}},"empPerformanceReport":{"id":"empPerformanceReport","title":"Employee Performance Report","filterView":{"title":"Filter","data":{"partNo":null,"frmDate":null,"toDate":null},"fields":[{"title":"Part No","id":"partNo","type":"select","dataFrom":"marketing.partMaster","replaceName":"partNo"},{"title":"Employee Name","id":"operator","type":"select","dataFrom":"marketing.empMaster","replaceName":"employeeName"},{"title":"From Date","id":"frmDate","type":"input","inputType":"date"},{"title":"To Date","id":"toDate","type":"input","inputType":"date"}]},"listView":[{"title":"Date","id":"date","type":"input","inputType":"date"},{"title":"Employee Name","id":"operator","type":"select","dataFrom":"marketing.empMaster","replaceName":"employeeName"},{"title":"Part No","id":"partNo","dataFrom":"marketing.partMaster","replaceName":"partNo","type":"select"},{"title":"Operation","id":"operationTo","dataFrom":"production.operationMaster","replaceName":"opName","valuePrefixData":"opCode","type":"select"},{"title":"Start Time","id":"startTime"},{"title":"End Time","id":"endTime"},{"title":"Plan Qty","id":"planQty"},{"title":"Qty","id":"acceptedQty"}],"page":{"link":"report/empPerformanceReport","name":"list","downloadExcel":true,"actions":false},"services":{"list":{"id":"productionEntry","params":{"year":true}}}}},"accounts":{"id":"accounts","name":"Accounts","title":"Accounts","icon":"money","customerPaymentInvoice":{"id":"customerPaymentInvoice","title":"Customer Payment - Invoice","masterData":{"invoiceNo":null,"customerCode":null,"date":null,"total":null,"balanceAmount":0,"mapping":[{"amount":null,"date":null,"remark":null}]},"form":{"name":"Customer Payment","id":"customerPayment","fields":{"invoiceNo":{"name":"Invoice No","id":"invoiceNo","type":"select","options":{},"action":"changeMapping","updateData":["customerCode","total","date"],"dataFrom":"marketing.invoice","replaceName":"invoiceNo","valuePrefix":"VT-","required":true,"existingCheck":true,"isSingle":true},"customerCode":{"name":"Customer Code","id":"customerCode","type":"select","options":{},"dataFrom":"marketing.customerMaster","replaceName":"customerName","isSingle":true,"isDisable":true},"date":{"name":"Invoice Date","id":"date","type":"span"},"total":{"name":"Total","id":"total","type":"span"},"balanceAmount":{"name":"Balance Amount","id":"balanceAmount","type":"span"}},"mapping":{"name":"Received instalment","fields":{"amount":{"name":"Amount","id":"amount","type":"input","inputType":"number","action":"updateBalanceAmount","required":true},"date":{"name":"Date","id":"date","type":"input","inputType":"date","required":true},"remark":{"name":"Remark","id":"remark","type":"input","inputType":"text"}}}},"listView":[{"title":"Invoice No","id":"invoiceNo","dataFrom":"marketing.invoice","valuePrefix":"VT-","replaceName":"invoiceNo","isFilterBy":true,"type":"select","options":{}},{"title":"Customer","id":"customerCode","dataFrom":"marketing.customerMaster","replaceName":"customerName","isFilterBy":true,"type":"select","options":{}},{"title":"Total Amount","id":"total"},{"title":"Balance Amount","id":"balanceAmount"}],"page":{"link":"accounts/customerPaymentInvoice","name":"list","downloadExcel":true},"services":{"list":{"params":{"year":true}}}},"customerPaymentCashBill":{"id":"customerPaymentCashBill","name":"customerPaymentCashBill","title":"Customer Payment - Cash Bill","parentModule":"accounts.customerPaymentInvoice","form":{"fields":{"invoiceNo":{"name":"CashBill No","id":"invoiceNo","options":{},"action":"changeMapping","updateData":["date","customerCode","total"],"dataFrom":"marketing.cashBill","replaceName":"invoiceNo","valuePrefix":"","required":true,"existingCheck":true,"isSingle":true}}},"listView":[{"title":"Cash Bill No","id":"invoiceNo","valuePrefix":"","dataFrom":"marketing.cashBill","replaceName":"invoiceNo","isFilterBy":true,"type":"select","options":{}}],"page":{"link":"accounts/customerPaymentCashBill","name":"list","downloadExcel":true},"services":{"list":{"params":{"year":true}}}},"suppilerPayment":{"id":"suppilerPayment","title":"Suppiler Payment","masterData":{"grnNo":null,"supplierCode":null,"supplierInvoiceNo":null,"supplierInvoiceDate":null,"invoiceDate":null,"date":null,"total":null,"balanceAmount":0,"mapping":[{"amount":null,"date":null,"remark":null}]},"form":{"name":"Suppiler Payment","id":"suppilerPayment","fields":{"grnNo":{"name":"GRN No","id":"grnNo","type":"select","options":{},"action":"changeMapping","updateData":["supplierCode","supplierInvoiceNo","supplierInvoiceDate","date"],"dataFrom":"store.grnSupplier","replaceName":"grnNo","valuePrefix":"VT-GRN-","required":true,"existingCheck":true,"isSingle":true},"supplierCode":{"name":"Supplier Name","id":"supplierCode","type":"select","options":{},"dataFrom":"purchase.supplierMaster","replaceName":"supplierName","required":true,"isDisable":true,"isSingle":true},"supplierInvoiceNo":{"name":"Supplier Invoice No","id":"supplierInvoiceNo","type":"span"},"supplierInvoiceDate":{"name":"Supplier Invoice Date","id":"supplierInvoiceDate","type":"span"},"date":{"name":"GRN Date","id":"date","type":"span"},"total":{"name":"Total","id":"total","type":"span"},"balanceAmount":{"name":"Balance Amount","id":"balanceAmount","type":"span"}},"mapping":{"name":"Received instalment","fields":{"amount":{"name":"Amount","id":"amount","type":"input","inputType":"number","action":"updateBalanceAmount","required":true},"date":{"name":"Date","id":"date","type":"input","inputType":"date","required":true},"remark":{"name":"Remark","id":"remark","type":"input","inputType":"text"}}}},"listView":[{"title":"GRN No","id":"grnNo","dataFrom":"store.grnSupplier","replaceName":"grnNo","valuePrefix":"VT-GRN-","isFilterBy":true,"type":"select","options":{}},{"title":"Supplier Name","id":"supplierCode","dataFrom":"purchase.supplierMaster","replaceName":"supplierName","isFilterBy":true,"type":"select","options":{}},{"title":"Supplier InvoiceNo No","id":"supplierInvoiceNo","dataFrom":"store.grnSupplier","replaceName":"supplierInvoiceNo","isFilterBy":true,"type":"select","options":{}},{"title":"Total Amount","id":"total"},{"title":"Balance Amount","id":"balanceAmount"}],"page":{"link":"accounts/suppilerPayment","name":"list","downloadExcel":true},"services":{"list":{"params":{"year":true}}}},"subContractorPayment":{"id":"subContractorPayment","title":"Sub Contractor Payment","masterData":{"grnNo":null,"subContractorCode":null,"subContractorDCCode":null,"subContractorDCDate":null,"date":null,"total":null,"balanceAmount":0,"mapping":[{"amount":null,"date":null,"remark":null}]},"form":{"name":"Sub Contractor Payment","id":"subContractorPayment","fields":{"grnNo":{"name":"GRN No","id":"grnNo","type":"select","options":{},"action":"changeMapping","updateData":["subContractorCode","subContractorDCCode","subContractorDCDate","date"],"dataFrom":"store.grnSubContractor","replaceName":"grnNo","valuePrefix":"VT-SC-GRN","required":true,"existingCheck":true,"isSingle":true},"subContractorCode":{"name":"Sub Contractor Name","id":"subContractorCode","type":"select","options":{},"dataFrom":"purchase.subContractorMaster","replaceName":"subContractorName","required":true,"isDisable":true,"isSingle":true},"subContractorDCCode":{"name":"Sub Contractor Invoice No","id":"subContractorDCCode","type":"span"},"subContractorDCDate":{"name":"Sub Contractor Invoice Date","id":"subContractorDCDate","type":"span"},"date":{"name":"GRN Date","id":"date","type":"span"},"total":{"name":"Total","id":"total","type":"span"},"balanceAmount":{"name":"Balance Amount","id":"balanceAmount","type":"span"}},"mapping":{"name":"Received instalment","fields":{"amount":{"name":"Amount","id":"amount","type":"input","inputType":"number","action":"updateBalanceAmount","required":true},"date":{"name":"Date","id":"date","type":"input","inputType":"date","required":true},"remark":{"name":"Remark","id":"remark","type":"input","inputType":"text"}}}},"listView":[{"title":"GRN No","id":"grnNo","dataFrom":"store.grnSupplier","replaceName":"grnNo","valuePrefix":"VT-GRN-","isFilterBy":true,"type":"select","options":{}},{"title":"Sub Contractor Name","id":"subContractorCode","dataFrom":"purchase.subContractorMaster","replaceName":"subContractorName","isFilterBy":true,"type":"select","options":{}},{"title":"Sub Contractor InvoiceNo No","id":"subContractorDCCode","dataFrom":"store.grnSupplier","replaceName":"subContractorDCCode","isFilterBy":true,"type":"select","options":{}},{"title":"Total Amount","id":"total"},{"title":"Balance Amount","id":"balanceAmount"}],"page":{"link":"accounts/subContractorPayment","name":"list","downloadExcel":true},"services":{"list":{"params":{"year":true}}}},"empPayment":{"id":"empPayment","title":"Employee Labor Payment","masterData":{"employeeCode":null,"frmDate":null,"toDate":null,"total":0,"balanceAmount":0,"mapping":[{"id":null,"operationTo":null,"qty":null,"laborCost":null,"totalCost":null,"date":null,"paidStatus":false,"productionEntryKey":null,"productionEntryDate":null}]},"form":{"name":"Employee Payment","id":"employeePayment","disableByField":"id","fields":{"employeeCode":{"name":"Employee Name","id":"employeeCode","type":"select","options":{},"action":"addPartMap","updateMapping":true,"updateData":["mapping"],"required":true,"dataFrom":"marketing.empMaster","replaceName":"employeeName","isEditDisable":true},"frmDate":{"name":"From Date","id":"frmDate","type":"input","action":"addPartMap","inputType":"date","isEditDisable":true},"toDate":{"name":"To Date","id":"toDate","type":"input","action":"addPartMap","inputType":"date","isEditDisable":true},"total":{"name":"Total","id":"total","type":"span"},"balanceAmount":{"name":"Balance Amount","id":"balanceAmount","type":"span"}},"mapping":{"name":"Payment","fields":{"id":{"name":"Part No","id":"id","type":"select","options":{},"dataFrom":"marketing.partMaster","replaceName":"partNo","isDisable":true},"partName":{"name":"Part Name","id":"partName","type":"span"},"operationTo":{"name":"Stage","id":"operationTo","type":"select","options":{},"required":true,"dataFrom":"production.operationMaster","replaceName":"opName","valuePrefixData":"opCode","isSingle":true,"isDisable":true},"qty":{"name":"Qty","id":"qty","type":"span"},"laborCost":{"name":"Labor Cost","id":"laborCost","type":"span"},"totalLaborCost":{"name":"Total Labor Cost","id":"totalLaborCost","type":"span"},"date":{"name":"Date","id":"date","type":"input","inputType":"date"},"paidStatus":{"name":"Paid Status","id":"paidStatus","type":"input","action":"updateBalanceAmount","inputType":"checkbox"}},"actions":{"add":false,"delete":false}}},"listView":[{"title":"Employee Name","id":"employeeCode","dataFrom":"marketing.empMaster","replaceName":"employeeName","isFilterBy":true,"type":"select","options":{}},{"title":"From Date","id":"frmDate","type":"input","inputType":"date"},{"title":"To Date","id":"toDate","type":"input","inputType":"date"},{"title":"Total Amount","id":"total"},{"title":"Balance Amount","id":"balanceAmount"}],"page":{"link":"accounts/empPayment","name":"list","downloadExcel":true},"services":{"list":{"params":{"year":true}}}}},"admin":{"id":"admin","name":"Admin","title":"Admin","icon":"cog","defaultRelease":true,"allUser":true,"superUsers":{"id":"superUsers","title":"Super Users","superAdmin":true,"masterData":{"userName":null,"password":null,"userType":"SUPERADMIN"},"form":{"name":"Users","id":"superUsers","fields":{"userName":{"name":"User Name","id":"userName","type":"input","inputType":"text","required":true},"password":{"name":"Password","id":"password","type":"input","inputType":"password","required":true}}},"listView":[{"title":"User Name","id":"userName"}],"page":{"link":"superAdmin/users","name":"list"},"services":{"list":{"id":"users","dataUri":"restrict"}}},"appCustomers":{"name":"App Customers","id":"appCustomers","title":"App Customers","superAdmin":true,"masterData":{"companyName":null,"address":null,"appModules":null},"form":{"name":"App Customers","id":"appCustomers","fields":{"companyName":{"name":"Company Name","id":"companyName","type":"input","inputType":"text","required":true},"address":{"name":"Company Adress","id":"address","type":"input","inputType":"text","required":true},"appModules":{"name":"App Modules","id":"appModules","type":"multiSelect","isMultiple":true,"required":true,"options":{},"makeFieldOptions":false}}},"listView":[{"title":"Company Name","id":"companyName"}],"page":{"link":"appCustomers","name":"list","custumActions":{"downloadZip":{"title":"Download app","class":"download","method":"downloadAppCustomer"},"appCustomerlogin":{"title":"App Customer login","class":"sign-in","method":"appCustomerlogin"}}},"services":{"list":{"dataUri":"restrict"}}},"settings":{"id":"settings","title":"Settings","masterData":{"companyName":null,"companyLogoUrl":null,"companyAddress":null,"companyMobile":null,"companyEmail":null,"companyGstin":null,"finalStageOpp":null,"mapping":[{"module":null,"restrictUser":null,"add":null,"edit":null,"delete":null}]},"form":{"name":"Settings","id":"settings","fields":{"companyName":{"name":"Company Name","id":"companyName","type":"input","inputType":"text","required":true},"companyLogoUrl":{"name":"Company Logo Url","id":"companyLogoUrl","type":"input","inputType":"text"},"companyAddress":{"name":"Company Address","id":"companyAddress","type":"input","inputType":"text"},"companyMobile":{"name":"Company Mobile","id":"companyMobile","type":"input","inputType":"text"},"companyEmail":{"name":"Company Email","id":"companyEmail","type":"input","inputType":"text"},"companyGstin":{"name":"Company GSTIN","id":"companyGstin","type":"input","inputType":"text"},"finalStageOpp":{"name":"Operation Final Stage","id":"finalStageOpp","type":"select","options":{},"dataFrom":"production.operationMaster","replaceName":"opName","valuePrefixData":"opCode"}},"mapping":{"name":"Restrict User Modules","fields":{"module":{"name":"Page name","id":"module","type":"select","options":{},"makeFieldOptions":false},"restrictUser":{"name":"Restrict Type","id":"restrictUser","type":"select","options":{},"dataFrom":"admin.userTypes","replaceName":"userType"},"add":{"name":"Show Add action","id":"add","type":"input","inputType":"checkbox"},"edit":{"name":"Show Edit action","id":"edit","type":"input","inputType":"checkbox"},"delete":{"name":"Show Delete action","id":"delete","type":"input","inputType":"checkbox"}}}},"listView":[{"title":"Company Name","id":"companyName"}],"page":{"link":"admin/settings","name":"list","actions":{"edit":true}}},"userTypes":{"id":"userTypes","title":"User Types","masterData":{"userType":null,"desc":null},"form":{"name":"User Types","id":"userTypes","fields":{"userType":{"name":"User Type","id":"userType","type":"input","inputType":"text","required":true},"desc":{"name":"Description","id":"desc","type":"input","inputType":"text","required":true}}},"listView":[{"title":"User Name","id":"userType"}],"page":{"link":"admin/userTypes","name":"list"}},"users":{"id":"users","title":"Users","masterData":{"userName":null,"password":null,"userType":null},"form":{"name":"Users","id":"users","fields":{"userName":{"name":"User Name","id":"userName","type":"input","inputType":"text","required":true},"password":{"name":"Password","id":"password","type":"input","inputType":"password","required":true},"userType":{"name":"User Type","id":"userType","type":"select","options":{},"required":true,"dataFrom":"admin.userTypes","replaceName":"userType"}}},"listView":[{"title":"User Name","id":"userName"}],"page":{"link":"admin/users","name":"list"}}}},"components":{"header":{"id":"header"},"customForm":{"id":"customForm"},"mappingForm":{"id":"mappingForm"},"entryInvoice":{"id":"entryInvoice"},"listView":{"id":"listView"},"filterView":{"id":"filterView"},"alertRol":{"id":"alertRol"},"fileModel":{"id":"fileModel","restrict":"A","template":false},"multipleSelect":{"id":"multipleSelect","restrict":"A","template":false}},"filters":{"startFrom":{"id":"startFrom"}},"factory":{"appFact":{"id":"appFact"},"authFact":{"id":"authFact"},"commonFact":{"id":"commonFact"}}},"moduleFiles":{}};
var erpApp = (function() {
    var routers = [];
    var erpAngularApp = angular.module('erpApp', ['ngRoute']).directive('myApp', function() {
            return {
                restrict: 'E',
                templateUrl: 'template/app.html'
            };
        })
        .config(['$routeProvider', function($routeProvider) {
            var ctrl;
            for (var i in routers) {
                ctrl = routers[i];
                $routeProvider.when('/' + ctrl.page.link, {
                    templateUrl: ctrl.page.templateUrl || "template/defaultView.html",
                    controller: ctrl.id
                });
            }
            $routeProvider.otherwise({
                redirectTo: erpConfig.appBaseUrl
            });
        }]);

    var buildControllers = function(controllers) {
        var ctrl,
            buildCtrl = function(ctrl) {
                if (ctrl.page.link) {

                    erpAngularApp.controller(ctrl.id, function($scope, appFact) {
                        appFact.initCtrl($scope, ctrl, erpConfig.moduleFiles[ctrl.id]);
                    });
                    routers.push(ctrl);
                } else {
                    for (var i in page) {
                        buildCtrl(page[i]);
                    }
                }
            };
        for (var i in controllers) {
            ctrl = controllers[i];
            if (ctrl.page) {
                buildCtrl(ctrl);
            } else if (typeof(ctrl) === 'object') {
                buildControllers(ctrl);
            }
        }
    };
    var buildComponents = function(components) {
        var buildComp = function(comp) {
            erpAngularApp.directive(comp.id, function(appFact) {
                var compMethods = erpConfig.moduleFiles[comp.id];
                var compLink = compMethods && compMethods(appFact);
                return {
                    restrict: comp.restrict || 'E',
                    templateUrl: comp.template || comp.template === undefined ? 'template/components/' + comp.id + '.html' : '',
                    link: compLink
                };
            });
        };
        for (var i in components) {
            buildComp(components[i]);
        }
    };

    buildControllers(erpConfig.modules.controllers);
    buildComponents(erpConfig.modules.components);


    return erpAngularApp;
})();
erpConfig.moduleFiles.fileModel = function() {
    return function(scope, element, attrs) {

        element.bind('change', function(changeEvent) {
            var reader = new FileReader();
            reader.onload = function(loadEvent) {
                scope.$apply(function() {
                    try {
                        scope.context.controller.data.databaseUpload = JSON.parse(loadEvent.target.result);
                    } catch (err) {
                        scope.context.controller.data.databaseUpload = {};
                    }

                });
            }
            reader.readAsText(changeEvent.target.files[0]);

        });
    };
};
erpConfig.moduleFiles.header = function(appFact) {
    var context = appFact.context || null;
    context.erpAppConfig.calendarYear = new Date().getMonth() >= context.erpAppConfig.yearChangeMonth ? new Date().getFullYear() : new Date().getFullYear() - 1;

    context.calendarYearList = [];
    for (var i = 10; i >= 0; i--) {
        var nextYear = parseInt(context.erpAppConfig.calendarYear - i + 1);

        context.calendarYearList.push({
            optionId: context.erpAppConfig.calendarYear - i,
            optionName: context.erpAppConfig.calendarYear - i + '-' + ('' + nextYear).substring(2)
        });
    }
    return function(scope) {
        scope.context = context;
    };
};

erpConfig.moduleFiles.multipleSelect = function() {
    return function(scope, element, attrs) {
        var field = scope.context.controller.form.fields[attrs.id];
        if (field && field.isMultiple) {
            element.attr('multiple', "true");
            $compile(element)(scope);
            scope.$digest();
        }
    };

};
erpConfig.moduleFiles.startFrom = function() {
    return function(input, start) {
        start = +start; //parse to int
        return input && input.slice(start) || false;
    }
};
erpApp.filter('startFrom', erpConfig.moduleFiles.startFrom);
erpConfig.moduleFiles.appFact = function(authFact, commonFact, serviceApi, $q) {
    var erpLoadProm = $q.defer();
    var context = {
        erpAppConfig: erpConfig,
        erpLoadProm: erpLoadProm,
        showLoading: true
    };
    var initApp = (function() {
        context = angular.extend(context, {
            serviceApi: serviceApi(context),
            commonFact: commonFact(context),
            authFact: authFact(context)
        });
        context.authFact.loadAuth().then(function() {
            context.commonFact.appModuleAccess().then(function() {
                erpLoadProm.resolve();
            });
        });
    })();

    var initCtrl = function(scope, module, methods) {
        var returnPageProm = $q.defer();
        return erpLoadProm.promise.then(function() {
            var parentModule;

            context.controller = angular.extend(angular.copy(module), { methods: methods && methods(context) || {} });
            var isLogged = context.authFact.isLogged();
            context.erpLoaded = true;
            scope.context = context;
            if (context.controller.parentModule) {
                parentModule = angular.copy(context.commonFact.getDeepProp(context.erpAppConfig.modules.controllers, context.controller.parentModule));
                context.controller = angular.merge({}, angular.copy(parentModule), context.controller);
            }
            if (!isLogged && context.controller.id !== 'login') {
                context.commonFact.goToPage(context.erpAppConfig.modules.controllers.login.page.link);
                return;
            } else if (context.controller.disable) {
                context.commonFact.goToPage(context.erpAppConfig.modules.controllers.dashboard.page.link);
                return;
            }
            context.showLoading = true;

            context.commonFact.showAlertRol();

            if (context.commonFact[context.controller.page.name]) {
                context.commonFact[context.controller.page.name]().then(function() {
                    scope.context = context;
                    context.commonFact.showLoadingHttp(scope);
                    context.controller.methods.onLoad && context.controller.methods.onLoad();
                    returnPageProm.resolve();
                });
            } else {
                context.controller.methods.onLoad && context.controller.methods.onLoad();
                returnPageProm.resolve();
            }

            return returnPageProm.promise;
        });
    };
    return {
        initCtrl: initCtrl,
        context: context
    };
};

erpApp.factory('appFact', erpConfig.moduleFiles.appFact);
erpConfig.moduleFiles.authFact = function($window) {
    return function(context) {
        var erpUserDetails = null;
        var login = function() {
            return context.commonFact.updateData(context.controller, context.controller.data).then(function(res) {
                var data = res.data;

                if (data.userName === context.controller.data.userName) {
                    setUserDetail(data);
                }

                return data;
            });
        };
        var setUserDetail = function(userDetail) {
            erpUserDetails = JSON.stringify(userDetail);
            !context.erpAppConfig.serverAuth && $window.sessionStorage.setItem(context.erpAppConfig.appName, erpUserDetails);
            return userDetail;
        };
        var getUserDetail = function() {
            var userDetail = erpUserDetails || !context.erpAppConfig.serverAuth && $window.sessionStorage.getItem(context.erpAppConfig.appName);
            if (userDetail !== 'undefined') {
                userDetail = JSON.parse(userDetail);
            }
            return userDetail;
        };

        var logout = function() {
            var promiseRes = context.commonFact.getPromiseRes();
            setUserDetail();
            erpUserDetails = null;
            if (context.erpAppConfig.serverAuth) {
                context.commonFact.getData({
                    dataUri: 'logout',
                    cache: false
                }).then(function(res) {
                    promiseRes.resolve();
                });
            } else {
                promiseRes.resolve();
            }
            return promiseRes.promise;

        };

        var isLogged = function() {
            var userDetail = getUserDetail();
            if (userDetail && userDetail.userType) {
                return true;
            }
            return false;
        };

        var loadAuth = function() {
            var path = context.commonFact.location.path();
            var promiseRes = context.commonFact.getPromiseRes();

            if (context.erpAppConfig.serverAuth && path !== '/login') {
                context.commonFact.getData({ dataUri: 'checkLoggedIn', cache: false }).then(function(res) {
                    var data = res.data || {};
                    if (data.userName) {
                        context.authFact.setUserDetail(data);
                    }
                    promiseRes.resolve();
                });
            } else {
                promiseRes.resolve();
            }
            return promiseRes.promise;
        }


        return {
            loadAuth: loadAuth,
            login: login,
            logout: logout,
            setUserDetail: setUserDetail,
            getUserDetail: getUserDetail,
            isLogged: isLogged
        };
    };
};

erpApp.factory('authFact', erpConfig.moduleFiles.authFact);
erpConfig.moduleFiles.commonFact = function($filter, $location, $window, $http) {
    return function(context) {
        return {
            add: function() {
                context.controller.page.name = 'add';
                context.controller.data = angular.copy(context.controller.masterData);
                if (context.controller.form.autoGenKey) {
                    context.commonFact.setAutoGenKey();
                }
                if (context.controller.data.date === null) {
                    context.controller.data.date = new Date();
                }
                return context.commonFact.formRender().then(function() {
                    context.controller.methods.callBackAdd && context.controller.methods.callBackAdd();
                    return true;
                });
            },
            edit: function(key, printView) {
                context.controller.page.name = 'edit';
                context.controller.page.printView = printView;
                context.controller.page.editKey = key;
                context.controller.existEditData = context.controller.page.editKey && context.commonFact.findObjectByKey(context.controller.listViewDataMaster, 'id', context.controller.page.editKey);

                return context.commonFact.formRender().then(function() {
                    return context.commonFact.getData(context.controller, key).then(function(res) {
                        context.controller.data = res.data;
                        context.controller.printData = angular.copy(context.controller.data);
                        if (context.controller.data['date']) {
                            context.controller.data['date'] = new Date(context.controller.data['date']);
                        }
                        if (context.controller.data['frmDate']) {
                            context.controller.data['frmDate'] = new Date(context.controller.data['frmDate']);
                        }
                        if (context.controller.data['toDate']) {
                            context.controller.data['toDate'] = new Date(context.controller.data['toDate']);
                        }
                        context.controller.methods.callBackEdit && context.controller.methods.callBackEdit(key);
                        return context;
                    });
                });

            },
            printView: function(key, printView) {
                context.commonFact.edit(key, printView);
            },
            disable: function(id, item) {
                context.controller.methods.callBeforeDelete && context.controller.methods.callBeforeDelete(item);
                context.controller.listViewDataMaster[id]['disabled'] = true;
                context.commonFact.updateData(context.controller, context.controller.listViewData[id]);
                context.commonFact.list();
                context.controller.methods.callBackDelete && context.controller.methods.callBackDelete(id, item);
            },
            delete: function(id, item) {
                var isConfirmed = confirm("Are you sure to delete this record ?");
                if (isConfirmed) {
                    context.controller.methods.callBeforeDelete && context.controller.methods.callBeforeDelete(id, item);
                    context.commonFact.updateData(context.controller, { id: id, delete: 'yes' });
                    context.commonFact.list();
                    context.controller.methods.callBackDelete && context.controller.methods.callBackDelete(id, item);
                } else {
                    return false;
                }
            },
            list: function() {
                var pageProm = [];
                var promiseRes = context.commonFact.getPromiseRes();
                context.controller.existEditData = null;
                context.controller.page.editKey = undefined;
                context.controller.page.printView = undefined;
                context.controller.page.name = 'list';
                context.controller.currentPage = 0;
                context.controller.pageSize = 10;
                context.controller.filterBy = context.controller.page.filter || {};
                context.controller.listViewData = [];
                context.controller.orderByProperty = 'updated';
                context.commonFact.pageActionsAccess();
                pageProm.push(context.commonFact.updateFields(context.controller.listView));
                context.controller.filterView && pageProm.push(context.commonFact.updateFields(context.controller.filterView.fields));


                Promise.all(pageProm).then(function() {
                    context.commonFact.getData().then(function(res) {
                        var listViewData = res.data;
                        for (var x in listViewData) {
                            listViewData.hasOwnProperty(x) && !listViewData[x].disabled && context.controller.listViewData.push(listViewData[x])
                        }
                        context.controller.listViewDataMaster = angular.copy(context.controller.listViewData);
                        context.controller.lastData = angular.copy(context.controller.listViewData[context.controller.listViewData.length - 1]);
                        context.controller.methods.callBackList && context.controller.methods.callBackList();
                        promiseRes.resolve(context);
                    });
                });
                return promiseRes.promise;

            },
            formRender: function() {
                return context.commonFact.updateFields(context.controller.form.fields).then(function() {
                    if (context.controller.form.mapping) {
                        return context.commonFact.updateFields(context.controller.form.mapping.fields);
                    }
                    return context;
                });

            },
            getPageData: function() {
                return $filter('filter')(context.controller.listViewData, context.controller.filterBy, true) || [];
            },
            numberOfPages: function() {
                return Math.ceil(context.commonFact.getPageData().length / context.controller.pageSize);
            },
            submit: function() {
                return context.commonFact.updateData(context.controller, context.controller.data).then(function(res) {
                    context.commonFact.list();
                    context.controller.methods.callBackSubmit && context.controller.methods.callBackSubmit(res.data);
                    return context;
                });

            },
            cancel: function() {
                context.commonFact.list();
            },
            getData: function(module, data) {
                var ctrl = angular.copy(module || context.controller);
                var serviceConf = context.commonFact.getServiceConfig(ctrl, 'GET');
                var params = data && typeof(data) !== 'object' ? { id: data } : data;
                serviceConf.params = angular.extend(serviceConf.params || {}, params);
                //Get Part master data
                return context.serviceApi.callServiceApi(serviceConf);
            },
            updateData: function(module, data) {
                var ctrl = angular.copy(module || context.controller);
                var userDetails = context.authFact.getUserDetail();
                var serviceConf = context.commonFact.getServiceConfig(ctrl, 'POST');
                serviceConf.cache = false;
                data.updatedUserId = (userDetails && context.commonFact.isSuperAdmin()) ? context.commonFact.isSuperAdmin() + '-' + userDetails.id : userDetails ? userDetails.id : null;
                //Get Part master data
                return context.serviceApi.callServiceApi(serviceConf, data);
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
                        if (context.commonFact.isFloat(fieldData)) {
                            fieldData = parseFloat(fieldData).toFixed(2);
                        }
                        return fieldData;
                    };
                //Get Part master data
                if (field.type === 'select' || field.dataFrom) {
                    viewData = field.options && field.options[viewData] && field.options[viewData].optionName || (field.allOptions && field.allOptions[viewData]) && field.allOptions[viewData].optionName || viewData;
                } else if (field.type === 'date' || field.inputType === 'date') {
                    viewData = viewData && context.commonFact.dateFormatChange(viewData) || '';
                } else if (field.inputType === 'password') {
                    viewData = 'XXX';
                } else {
                    viewData = updateField(field, viewData);
                }
                return viewData;
            },
            matchFilter: function(field, list) {
                var returnFlag = false;
                // if (context && context.controller.page.name === 'edit') {
                //     return true;
                // }
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
            makeOptionsFields: function(field, fields) {
                var self = this,
                    list;

                field.options = {};
                field.allOptions = {};
                if (field.dataFrom && (typeof(field.dataFrom) === 'object' || context.commonFact.getDeepProp(context.erpAppConfig.modules.controllers, field.dataFrom))) {
                    return context.commonFact.getData(field.dataFrom).then(function(res) {
                        list = res.data;
                        for (var i in list) {
                            var optionVal = field.optionId && list[i][field.optionId] || list[i]['id'];
                            var optionIdVal = field.optionId && list[i][field.optionId] || list[i]['id'];
                            var optionNameVal = field.valuePrefix && field.valuePrefix || '';
                            var editOption = context.controller.existEditData && optionIdVal === context.controller.existEditData[field.id] || false;
                            optionNameVal += field.valuePrefixData && list[i][field.valuePrefixData] + ' - ' || '';
                            optionNameVal += list[i][field.replaceName] || '';
                            var isCheckExistVal = field.existingCheck && context.controller.listViewDataMaster && context.commonFact.findObjectByKey(context.controller.listViewDataMaster, field.id, optionIdVal) || false;
                            field.allOptions[optionVal] = list[i];
                            if (optionVal && field.allOptions[optionVal]) {
                                field.allOptions[optionVal]['optionName'] = optionNameVal;
                                field.allOptions[optionVal]['optionId'] = optionIdVal;
                            }

                            if ((field.filter === undefined ||
                                    context.commonFact.matchFilter(field, list[i], context) === true) &&
                                (!isCheckExistVal || editOption)) {
                                field.options[optionVal] = field.allOptions[optionVal];
                            }
                        }
                        return field;
                    });
                } else if (fields && fields[field.id] && fields[field.id].dataFrom) {
                    delete fields[field.id];
                    return true;
                }
            },
            addMapping: function(mapping) {
                var newMapping = angular.extend({}, context.controller.masterData.mapping[0]);
                for (var mapKey in newMapping) {
                    newMapping[mapKey] = null;
                }
                mapping.push(newMapping);
            },
            removeMapping: function(data, key) {
                var isConfirmed = confirm("Are you sure to delete this record ?");
                if (isConfirmed) {
                    delete data.splice(key, 1);
                    context.controller.methods.callBackRemoveMapping && context.controller.methods.callBackRemoveMapping(data, key);

                }
            },
            changeMapping: function(data, key, field, fieldMapKey) {
                for (var dataKey in data) {
                    if ((field.updateData && field.updateData.indexOf(dataKey) >= 0) || field.updateData === undefined) {
                        if (key === null) {
                            data[dataKey] = angular.copy(context.controller.masterData[dataKey]);
                        } else if (key !== undefined && field.options[key][dataKey]) {
                            if (typeof(field.options[key][dataKey]) !== 'object') {
                                data[dataKey] = field.options[key][dataKey];
                            } else if (field.updateMapping) {
                                data[dataKey] = angular.copy(context.controller.masterData[dataKey]);
                                for (var mapKey in field.options[key][dataKey]) {
                                    var copyDataMapKey = angular.copy(context.controller.masterData[dataKey][0]);
                                    if (field.options[key][dataKey][mapKey] !== null || field.options[key][dataKey][mapKey] !== '') {
                                        data[dataKey][mapKey] = angular.extend(copyDataMapKey, field.options[key][dataKey][mapKey]);
                                        for (var mapFieldKey in context.controller.form.mapping.fields) {
                                            var mapfield = context.controller.form.mapping.fields[mapFieldKey];
                                            if (mapfield.action) {
                                                if (mapfield.type === 'select') {
                                                    context.commonFact.callActions(mapfield.action, [data[dataKey][mapKey], data[dataKey][mapKey][mapfield.id], mapfield, mapKey]);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                field.callBack !== false && context.controller.methods.callBackChangeMapping && context.controller.methods.callBackChangeMapping(data, key, field, fieldMapKey);
            },
            setAutoGenKey: function() {
                var lastDataKey = context.controller.lastData ? context.controller.lastData[context.controller.form.autoGenKey] : undefined;
                lastDataKey = lastDataKey ? parseInt(lastDataKey) + 1 : context.controller.form.autoGenValStart ? context.controller.form.autoGenValStart : 1;
                context.controller.data[context.controller.form.autoGenKey] = lastDataKey;
                context.controller.methods.callBackSetAutoGenKey && context.controller.methods.callBackSetAutoGenKey();
            },
            dateFormatChange: function(dateValue) {
                dateValue = new Date(dateValue);
                return dateValue.getDate() + '-' + (dateValue.getMonth() + 1) + '-' + dateValue.getFullYear();
            },
            timeFormatChange: function(value) {
                value = new Date(value);
                return value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
            },
            getOperationFromFlow: function(field, restriction) {
                var self = this,
                    partNo = restriction.partNo || context.controller.data.partNo,
                    limit = 0;
                var promiseRes = context.commonFact.getPromiseRes();

                if (partNo) {
                    context.commonFact.makeOptionsFields(field).then(function() {
                        var localOptions = field.options;
                        context.commonFact.getData('production.flowMaster').then(function(res) {
                            var flowMasterData = res.data,
                                flowMasterVal;
                            var isPartFlow = false;
                            field.options = {};
                            for (var i in flowMasterData) {
                                if (flowMasterData[i].partNo === partNo) {
                                    //context.commonFact.mergeOprFlowMap(flowMasterData[i].mapping).then(function(flowMasterMap) {
                                    var flowMasterMap = flowMasterData[i].mapping;
                                    var startWith = context.commonFact.findObjectByKey(flowMasterMap, 'id', restriction.startWith);
                                    //flowMasterMap = context.commonFact.objectSort(flowMasterMap, 'opCode');
                                    for (var j in flowMasterMap) {
                                        flowMasterVal = flowMasterMap[j];
                                        if ((!restriction.limit || limit < restriction.limit) &&
                                            (!restriction.startWith || (startWith.index < j)) &&
                                            (restriction.filter === undefined || context.commonFact.matchFilter(restriction, flowMasterVal) === true)) {
                                            limit++;
                                            field.options[flowMasterVal.id] = localOptions[flowMasterVal.id];
                                        }
                                    }
                                    promiseRes.resolve(field);
                                    //});
                                    isPartFlow = true;
                                }
                            }
                            if (!isPartFlow) {
                                promiseRes.resolve(field);
                            }
                        });
                    });
                } else {
                    promiseRes.resolve(field);
                }
                return promiseRes.promise;
            },
            updatePartStock: function(newContext) {
                var self = this;
                var localContext = newContext || context;
                var promiseRes = context.commonFact.getPromiseRes();
                var currentPartProm = context.commonFact.getPromiseRes();
                var currentData;
                var prevData;
                context.commonFact.getData('report.partStock').then(function(res) {
                    var partStockData = res.data,
                        partStock = {};
                    for (var i in partStockData) {
                        partStock[partStockData[i].partNo + '-' + partStockData[i].operationFrom + '-' + partStockData[i].operationTo] = partStockData[i] && partStockData[i] || undefined;
                        partStock[partStockData[i].partNo + '-' + partStockData[i].operationTo] = partStockData[i] && partStockData[i] || undefined;
                    }
                    var existingStock = partStock[localContext.controller.data.partNo + '-' + localContext.controller.data.operationFrom + '-' + localContext.controller.data.operationTo];
                    var partStockQty = existingStock ? parseInt(existingStock.partStockQty) + parseInt(localContext.controller.data.acceptedQty) : parseInt(localContext.controller.data.acceptedQty);
                    if (localContext.controller.updateCurStock === undefined || localContext.controller.updateCurStock) {
                        currentData = {
                            id: existingStock && existingStock.id || undefined,
                            partNo: localContext.controller.data.partNo,
                            partStockQty: partStockQty,
                            operationFrom: localContext.controller.data.operationFrom,
                            operationTo: localContext.controller.data.operationTo
                        }
                        context.commonFact.updateData('report.partStock', currentData).then(function() {
                            context.commonFact.getPartStock();
                            currentPartProm.resolve();
                        });
                    } else {
                        currentPartProm.resolve();
                    }
                    currentPartProm.promise.then(function() {
                        var existingPrevStock = partStock[localContext.controller.data.partNo + '-' + localContext.controller.data.operationFrom];
                        if (existingPrevStock && (localContext.controller.updatePrevStock === undefined || localContext.controller.updatePrevStock)) {
                            var existPartStockQty = parseInt(localContext.controller.data.acceptedQty);
                            existPartStockQty += parseInt(localContext.controller.data.rejectionQty) || 0;
                            existPartStockQty += parseInt(localContext.controller.data.rwQty) || 0;
                            existPartStockQty = parseInt(existingPrevStock.partStockQty) - parseInt(existPartStockQty);
                            prevData = {
                                id: existingPrevStock.id,
                                partNo: localContext.controller.data.partNo,
                                partStockQty: existPartStockQty,
                                operationFrom: existingPrevStock.operationFrom,
                                operationTo: existingPrevStock.operationTo
                            }
                            context.commonFact.updateData('report.partStock', prevData).then(function() {
                                context.commonFact.getPartStock();
                                promiseRes.resolve();
                            });
                        } else {
                            promiseRes.resolve();
                        }
                    });

                });

                return promiseRes.promise;
            },
            updateSCStock: function(newContext) {
                var promiseRes = context.commonFact.getPromiseRes();
                var localContext = newContext || context;
                var returnPromise = [];
                context.commonFact.getData('report.subContractorStock').then(function(res) {
                    var scStockData = res.data,
                        scStock = {};
                    for (var i in scStockData) {
                        scStock[scStockData[i].partNo + '-' + scStockData[i].operationFrom + '-' + scStockData[i].operationTo] = scStockData[i] && scStockData[i] || undefined;
                        scStock[scStockData[i].partNo + '-' + scStockData[i].operationTo] = scStockData[i] && scStockData[i] || undefined;
                    }
                    var existingStock = scStock[localContext.controller.data.partNo + '-' + newContext.controller.data.operationFrom + '-' + newContext.controller.data.operationTo];
                    var partStockQty = existingStock ? parseInt(existingStock.partStockQty) + parseInt(newContext.controller.data.acceptedQty) : parseInt(newContext.controller.data.acceptedQty);
                    var data = {
                        id: existingStock && existingStock.id || undefined,
                        partNo: localContext.controller.data.partNo,
                        subContractorCode: localContext.controller.data.subContractorCode,
                        partStockQty: partStockQty,
                        operationFrom: localContext.controller.data.operationFrom,
                        operationTo: localContext.controller.data.operationTo
                    }
                    promiseRes.resolve(context.commonFact.updateData('report.subContractorStock', data));
                });

                return promiseRes.promise;
            },
            updatePartTotal: function(data, newValue, field, fieldMapKey) {
                var total = 0,
                    totalBeforTax = 0,
                    qty = newValue,
                    operation = data.operationFrom;
                if (data.id &&
                    operation &&
                    (context.controller.partStock === undefined ||
                        context.controller.partStock[data.id + '-' + operation] === undefined ||
                        context.controller.partStock[data.id + '-' + operation].partStockQty < qty)) {
                    data[field.id] = qty = null;
                }
                totalBeforTax = qty * data.rate;
                data.total = parseFloat(totalBeforTax).toFixed(2);
                context.controller.methods.callBackUpdatePartTotal && context.controller.methods.callBackUpdatePartTotal(data, newValue, field, fieldMapKey);

            },
            getServiceConfig: function(ctrl, replaceMethod) {
                var currentYear = context.erpAppConfig.calendarYear;
                var serviceConfig = ctrl;
                var genUrl = function(serviceConfig) {
                    var url = context.erpAppConfig.serverApiUri;
                    url += context.erpAppConfig.serverAuth ? ('/' + context.erpAppConfig.serverAuth) : '';
                    url += !serviceConfig.notDataUri ? (serviceConfig.dataUri ? ('/' + serviceConfig.dataUri) : ('/' + context.erpAppConfig.serverDataUri)) : '';
                    url += serviceConfig.id ? ('/' + serviceConfig.id) : '';
                    return url;
                };

                if (typeof(ctrl) !== 'object') {
                    ctrl = angular.copy(context.commonFact.getDeepProp(context.erpAppConfig.modules.controllers, ctrl));
                }
                if (!ctrl) {
                    return {};
                }
                if (ctrl.id && ctrl.page) {
                    serviceConfig = ctrl.services && ctrl.services.list || {};
                    serviceConfig.id = serviceConfig.id || ctrl.id;
                }
                serviceConfig.params = angular.extend(serviceConfig.params || {}, { appCustomer: serviceConfig.params && serviceConfig.params.appCustomer || context.commonFact.isAppCustomer() || '' })

                if (serviceConfig.params.year && typeof(serviceConfig.params.year) !== 'string') {
                    serviceConfig.params.year = context.erpAppConfig.calendarYear || currentYear;
                }
                serviceConfig.url = genUrl(serviceConfig);
                serviceConfig.method = replaceMethod ? replaceMethod : serviceConfig.method;
                serviceConfig.cache = serviceConfig.cache === undefined ? context.erpAppConfig.httpCache : serviceConfig.cache;
                return serviceConfig;
            },
            getPartStock: function() {
                context.commonFact.getData('report.partStock').then(function(res) {
                    var partStockData = res.data,
                        partStock = {};
                    for (var i in partStockData) {
                        partStock[partStockData[i].partNo + '-' + partStockData[i].operationTo] = partStockData[i] && partStockData[i] || undefined;
                    }
                    context.controller.partStock = partStock;
                });
            },
            getSCStock: function() {
                return context.commonFact.getData('report.subContractorStock').then(function(res) {
                    var scStockData = res.data,
                        scStock = {};
                    for (var i in scStockData) {
                        scStock[scStockData[i].partNo + '-' + scStockData[i].operationFrom] = scStockData[i] && scStockData[i] || undefined;
                    }
                    context.controller.partStock = scStock;
                    return scStock;
                });
            },
            getRMStock: function() {
                context.commonFact.getData('report.rmStock').then(function(res) {
                    var rmStockData = res.data,
                        rmStock = {};
                    for (var i in rmStockData) {
                        rmStock[rmStockData[i].rmCode] = rmStockData[i] && rmStockData[i] || undefined;
                    }
                    context.controller.rmStock = rmStock;
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
            viewFilterBy: function(list) {
                var self = this;
                if (!list.selectedFilterBy) {
                    delete context.controller.filterBy[list.id];
                } else {
                    if (list.type === 'date' || list.inputType === 'date') {
                        context.controller.filterBy[list.id] = new Date(list.selectedFilterBy).toISOString();
                    } else {
                        context.controller.filterBy[list.id] = list.selectedFilterBy;
                    }
                }
            },
            getFlowMaster: function() {
                context.controller.flowMasterData = {};
                context.controller.flowMasterByPart = {};
                context.controller.flowMasterByPartOpr = {};

                return context.commonFact.getData('production.flowMaster').then(function(res) {
                    var flowMasterData = res.data,
                        prevOpp;

                    context.controller.flowMasterData = flowMasterData;
                    for (var i in flowMasterData) {
                        context.controller.flowMasterByPart[flowMasterData[i].partNo] = flowMasterData[i];
                        for (var j in flowMasterData[i].mapping) {
                            context.controller.flowMasterByPartOpr[flowMasterData[i].partNo + '-' + flowMasterData[i].mapping[j].id] = flowMasterData[i].mapping[j];
                        }
                    }
                    return context;
                });

            },
            mergeOprFlowMap: function(flowMap) {
                var promiseRes = context.commonFact.getPromiseRes();
                context.commonFact.getData('production.operationMaster').then(function(res) {
                    for (var i in flowMap) {
                        flowMap[i] = res.data[flowMap[i].id];
                        flowMap[i].opCode = parseInt(res.data[flowMap[i].id].opCode);
                    }
                    promiseRes.resolve(flowMap);
                });
                return promiseRes.promise;
            },
            getOperations: function() {
                context.controller.operationsData = {};

                context.commonFact.getData('production.operationMaster').then(function(res) {
                    context.controller.operationsData = res.data;
                });

            },
            isCheckExistField: function(data, value, field) {
                if (context.controller.listViewData && context.commonFact.findObjectByKey(context.controller.listViewData, field.id, value)) {
                    data[field.id] = null;
                }
            },
            findObjectByKey: function(array, findKey, value) {
                var isExist = false;
                var data = array;
                var filter = findKey;
                if (typeof(filter) === 'object') {
                    isExist = data.filter(function(item) {
                        for (var key in filter) {
                            if (item[key] === undefined || item[key] != filter[key])
                                return false;
                        }
                        return true;
                    });
                    isExist = isExist && isExist[isExist.length - 1];
                } else {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i][filter] === value) {
                            isExist = data[i];
                            isExist['index'] = i;
                        }
                    }
                }

                return isExist;
            },
            updateGstPart: function(data, newValue, field, fieldMapKey) {
                var acceptedQtyField = context.controller.form.mapping.fields['acceptedQty'];
                var cgstField = context.controller.form.mapping.fields['cgst'];
                var sgstField = context.controller.form.mapping.fields['sgst'];
                if (cgstField && sgstField) {
                    if (newValue > 0) {
                        data[cgstField.id] = parseInt(newValue) / 2;
                        data[sgstField.id] = parseInt(newValue) / 2;
                    } else {
                        data[cgstField.id] = 0;
                        data[sgstField.id] = 0;
                    }
                }
                context.commonFact.updatePartTotal(data, data[acceptedQtyField.id], acceptedQtyField, fieldMapKey);
            },
            updateFields: function(fields) {
                var returnPromise = [];
                for (var i in fields) {
                    if (fields[i].makeFieldOptions === undefined || fields[i].makeFieldOptions) {
                        returnPromise.push(context.commonFact.makeOptionsFields(fields[i], fields));
                    }
                }
                return Promise.all(returnPromise);
            },
            showSubModule: function(module) {
                var subModules = {};

                for (var i in module) {
                    if (typeof(module[i]) === 'object') {
                        subModules[i] = module[i];
                    }
                }
                return subModules;
            },
            pageActionsAccess: function() {
                var actions = {
                    add: false,
                    edit: false,
                    delete: false,
                    print: false
                };
                if (context.controller.page && (context.controller.page.actions === undefined || context.controller.page.actions)) {
                    actions.add = context.controller.page.actions === undefined ? true : context.controller.page.actions.add;
                    actions.edit = context.controller.page.actions === undefined ? true : context.controller.page.actions.edit;
                    actions.delete = context.controller.page.actions === undefined ? true : context.controller.page.actions.delete;
                    actions.print = context.controller.page.actions === undefined ? true : context.controller.page.actions.print;
                }
                context.controller.page.actions = actions;
            },
            isFloat: function(n) {
                return Number(n) === n && n % 1 !== 0;
            },
            downloadExcel: function(table) {
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
            updatePORmTotal: function(data) {
                var total = 0;
                var qty = data['qty'] || data['acceptedQty'] || 0;
                total = qty * data.rate;
                data.total = parseFloat(total).toFixed(2);
                context.commonFact.updatePOTotalAmount();

            },
            updatePOTotalAmount: function() {
                var gst = context.controller.data.gst,
                    igst = context.controller.data.igst,
                    cgst = context.controller.data.cgst,
                    sgst = context.controller.data.sgst,
                    igstTotal = 0,
                    cgstTotal = 0,
                    sgstTotal = 0,
                    gstTotal = 0,
                    total = 0,
                    subTotal = 0,
                    mapping = context.controller.data.mapping,
                    extraAmount = context.controller.data.extraAmount || 0;

                for (var i in mapping) {
                    subTotal += mapping[i].total && parseFloat(mapping[i].total) || 0;
                }
                cgstTotal = context.controller.data.cgst && ((parseFloat(extraAmount) + parseFloat(subTotal)) * parseFloat(context.controller.data.cgst / 100)) || 0;
                sgstTotal = context.controller.data.sgst && ((parseFloat(extraAmount) + parseFloat(subTotal)) * parseFloat(context.controller.data.sgst / 100)) || 0;
                igstTotal = context.controller.data.igst && ((parseFloat(extraAmount) + parseFloat(subTotal)) * parseFloat(context.controller.data.igst / 100)) || 0;

                gstTotal = (parseFloat(cgstTotal) + parseFloat(sgstTotal) + parseFloat(igstTotal));
                total = subTotal + gstTotal + extraAmount;
                context.controller.data.gstTotal = parseFloat(gstTotal).toFixed(2);
                context.controller.data.subTotal = parseFloat(subTotal).toFixed(2);
                context.controller.data.total = parseInt(total);
            },
            goToPage: function(url, isReload) {
                window.location.hash = '#!/' + url;
                if (isReload) {
                    setTimeout(function() { window.location.reload() }, 200);
                }
            },
            setSessionStore: function(key, data) {
                $window.sessionStorage.setItem(key, data);
            },
            getSessionStore: function(key) {
                var data = $window.sessionStorage.getItem(key);

                return data;
            },
            selectListData: function(data) {
                if (!context.selectedTableData) {
                    context.selectedTableData = {};
                    context.selectedTableData[context.controller.id] = {};
                }
                context.selectedTableData[context.controller.id][data.id] = angular.copy(data);
                delete context.selectedTableData[context.controller.id][data.id].id;
                delete context.selectedTableData[context.controller.id][data.id].isExported;
            },
            downloadTableData: function() {
                context.commonFact.downloadFile(context.selectedTableData, context.controller.id + '.json');
            },
            downloadFile: function(data, name, type) {

                if (!type || type === 'json') {
                    data = JSON.stringify(data);
                }
                //Convert JSON string to BLOB.
                data = [data];

                var blob1 = new Blob(data, { type: 'application/octet-stream' });

                //Check the Browser.
                var isIE = false || !!document.documentMode;
                if (isIE) {
                    window.navigator.msSaveBlob(blob1, name);
                } else {
                    var url = window.URL || window.webkitURL;
                    var hrefData = url.createObjectURL(blob1);

                    var downloadLink = document.createElement("a");

                    downloadLink.href = hrefData;
                    downloadLink.download = name;

                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                }
            },
            downloadDatabase: function(year) {
                var downloadDbName = 'database' + (year ? context.erpAppConfig.calendarYear + '-' + ('' + parseInt(context.erpAppConfig.calendarYear + 1)).substring(2) : '');

                context.commonFact.getData({ id: 'databaseDownload', params: { year: year } }).then(function(res) {
                    context.commonFact.downloadFile(res.data, downloadDbName + '.json');
                });
            },
            showLoadingHttp: function(scope) {
                var showLoader = function(v) {
                    if (v) {
                        scope.context.showLoading = false;
                    } else {
                        scope.context.showLoading = true;
                    }
                };
                scope.isLoading = function() {
                    return $http.pendingRequests.length <= 0;
                };

                scope.$watch(scope.isLoading, showLoader);
            },
            getDeepProp: function(obj, desc) {
                var arr = desc.split(".");
                while (arr.length && (obj = obj[arr.shift()]));
                return obj;
            },
            location: $location,
            changeCalendarYear: function() {
                context.commonFact.goToPage(context.erpAppConfig.modules.controllers.dashboard.page.link);
            },
            downloadData: function() {
                angular.element('#downloadModal').modal('show');
            },
            showAlertRol: function() {
                var userDetail = context.authFact.getUserDetail();
                context.alertRolContext = {
                    partRolYellow: [],
                    partRolRed: []
                };
                if (userDetail && userDetail.userType) {
                    context.commonFact.getData('marketing.partMaster').then(function(res) {
                        var partMaster = res.data;
                        context.commonFact.getData('report.partStock').then(function(res1) {
                            var partStockData = res1.data,
                                partStock = {};
                            for (var i in partStockData) {
                                partStock[partStockData[i].partNo + '-' + partStockData[i].operationTo] = partStockData[i] && partStockData[i] || undefined;
                            }
                            for (var j in partMaster) {
                                var yellowAlert = partMaster[j].rolQtyYellowRage;
                                var redAlert = partMaster[j].rolQtyRedRage;
                                var checkPartStock = partStock[partMaster[j].id + '-' + context.erpAppConfig.finalStageOpp];

                                if (checkPartStock) {
                                    checkPartStock.partName = partMaster[j].partName;
                                    checkPartStock.partNo = partMaster[j].partNo;
                                    if (redAlert >= checkPartStock.partStockQty) {
                                        context.alertRolContext.partRolRed.push(checkPartStock);
                                    } else if (yellowAlert >= checkPartStock.partStockQty) {
                                        context.alertRolContext.partRolYellow.push(checkPartStock);
                                    }
                                }

                            }
                            if ((context.alertRolContext.partRolRed.length > 0 || context.alertRolContext.partRolYellow.length > 0) && !context.alertRolHideROL) {
                                angular.element('#RolModal').modal('show');
                            }
                        });
                    });
                }
            },
            isAppUser: function() {
                var userDetail = context.authFact.getUserDetail();
                return userDetail && userDetail.userType !== 'SUPERADMIN' && userDetail.userType !== 'ADMIN';
            },
            isSuperAdmin: function() {
                var userDetail = context.authFact.getUserDetail();
                return userDetail && userDetail.userType === 'SUPERADMIN' && userDetail.userType || null;
            },
            isAppAdmin: function() {
                var userDetail = context.authFact.getUserDetail();
                return userDetail && userDetail.userType === 'ADMIN' && userDetail.userType || null;
            },
            isAppCustomer: function() {
                var userDetails = context.authFact.getUserDetail();
                return userDetails && userDetails.appCustomer || context.commonFact.isLocalAppCustomer();
            },
            isLocalAppCustomer: function() {
                return context.erpAppConfig.appCustomer;
            },
            isShowMenu: function(menu) {
                var disabled = menu.disableMenu || menu.disable || (context.commonFact.isAppCustomer() ? context.erpAppConfig.appModules ? (!context.erpAppConfig.appModules.includes('all') && !menu.show) : true : false);
                var superAdmin = context.commonFact.isSuperAdmin() && menu.superAdmin || false;
                var isAppCustomer = !menu.superAdmin && context.commonFact.isAppCustomer();
                return !disabled && (superAdmin || isAppCustomer || menu.allUser);
            },
            errorHandler: function(e) {
                context.authFact.logout();
                context.commonFact.goToPage(context.erpAppConfig.modules.controllers.login.page.link);
                return e;
            },
            callActions: function(actionName, params) {
                var actionMethod = actionName && (context.controller.methods[actionName] || context.authFact[actionName] || context.commonFact[actionName]);
                actionMethod && actionMethod.apply(this, params);
            },
            appModuleAccess: function() {
                var promiseRes = context.commonFact.getPromiseRes();
                var isAppCustomer = context.commonFact.isAppCustomer();
                var userDetail = context.authFact.getUserDetail();
                if (userDetail && isAppCustomer) {
                    context.commonFact.getData(context.erpAppConfig.modules.controllers.admin.settings, isAppCustomer).then(function(res) {
                        context.erpAppConfig = angular.extend(context.erpAppConfig, res.data);
                        if (context.erpAppConfig.appModules && !context.erpAppConfig.appModules.includes('all')) {
                            for (var i in context.erpAppConfig.modules.controllers) {
                                let module = context.erpAppConfig.modules.controllers[i];
                                let isSubModule = false;
                                if (!module.page) {
                                    for (var j in module) {
                                        if (typeof(module[j]) === 'object') {
                                            if (!module.defaultRelease && !context.erpAppConfig.appModules.includes(i + '/' + j) && !context.erpAppConfig.appModules.includes(i + '/**')) {
                                                delete context.erpAppConfig.modules.controllers[i][j];
                                            } else {
                                                isSubModule = true;
                                                context.erpAppConfig.modules.controllers[i][j].show = true;
                                            }
                                        }
                                    }
                                }
                                if (!context.erpAppConfig.appModules.includes(i) && !isSubModule && !module.defaultRelease) {
                                    delete context.erpAppConfig.modules.controllers[i];
                                } else {
                                    context.erpAppConfig.modules.controllers[i].show = true;
                                }
                            }

                        }
                        if (context.commonFact.isAppUser()) {
                            for (var i in context.erpAppConfig.mapping) {
                                var map = context.erpAppConfig.mapping[i];
                                var module = context.commonFact.getDeepProp(context.erpAppConfig.modules.controllers, map.module) || {};
                                if (!userDetail.userType || (userDetail.userType && map.restrictUser !== userDetail.userType)) {
                                    module.disable = map.restrictUser && true;
                                }
                                if (module.page && (module.page.actions || module.page.actions === undefined)) {
                                    module.page.actions = {
                                        print: true
                                    };
                                    module.page.actions.add = map.restrictUser === userDetail.userType && map['add'] || false;
                                    module.page.actions.edit = map.restrictUser === userDetail.userType && map['edit'] || false;
                                    module.page.actions.delete = map.restrictUser === userDetail.userType && map['delete'] || false;
                                }
                            }
                        }
                        promiseRes.resolve();
                    });
                } else {
                    promiseRes.resolve();
                }
                return promiseRes.promise;
            },
            getPromiseRes: function() {
                var returnPromiseRes;
                var returnPromiseRej;
                var returnPromise = new Promise(function(res, rej) {
                    returnPromiseRes = res;
                    returnPromiseRej = rej;
                });
                return {
                    promise: returnPromise,
                    resolve: returnPromiseRes,
                    reject: returnPromiseRej
                };
            },
            getAllYearData: function() {
                var listOfDbsConfig = {
                    id: 'getYearDatabases'
                };
                var prodTabConfig = context.erpAppConfig.modules.controllers.report.productionEntryReport.services.list;

                return context.commonFact.getData(listOfDbsConfig).then(function(res) {
                    var listOfDbs = res.data.list;
                    var listOfDbsProm = [];
                    var dataList = [];
                    for (var i in listOfDbs) {
                        var serConf = angular.copy(prodTabConfig);
                        serConf.params.year = listOfDbs[i];
                        listOfDbsProm.push(context.commonFact.getData(serConf).then(function(prodRes) {
                            dataList.push(prodRes.data);
                        }));
                    }
                    return Promise.all(listOfDbsProm).then(function() {
                        return dataList;
                    });
                });
            }
        };
    };
};

erpApp.factory('commonFact', erpConfig.moduleFiles.commonFact);
erpConfig.moduleFiles.serviceApi = function($http, $cacheFactory, $q, $httpParamSerializer) {
    return function(context) {
        var callServiceApi = function(serviceConf, inputData) {
            var servicePromise,
                httpCache = $cacheFactory.get('$http');
            var promiseRes = context.commonFact.getPromiseRes();
            var removeListCacheUrl;
            var removeEditCacheUrl;
            var paramsId;
            serviceConf['data'] = inputData;
            if (serviceConf.method === 'POST') {
                removeListCacheUrl = serviceConf.url;
                removeListCacheUrl += serviceConf.params ? '?' + $httpParamSerializer(serviceConf.params) : '';
                httpCache.remove(removeListCacheUrl);
                if (inputData && inputData.id) {
                    paramsId = angular.extend({}, angular.copy(serviceConf.params), { id: inputData.id });
                }
                removeEditCacheUrl = serviceConf.url;
                removeEditCacheUrl += paramsId ? '?' + $httpParamSerializer(paramsId) : '';
                httpCache.remove(removeEditCacheUrl);

            }
            if (!serviceConf.url) {
                setTimeout(function() {
                    promiseRes.resolve({});
                }, 200);
                servicePromise = promiseRes.promise;
            } else {
                servicePromise = $http(serviceConf)
                    .then(function(res) {
                        return res;
                    }, function(e) {
                        return context.commonFact.errorHandler(e);

                    });
            }
            return servicePromise;
        };
        return {
            callServiceApi: callServiceApi
        }
    };
};

erpApp.service('serviceApi', erpConfig.moduleFiles.serviceApi);
erpConfig.moduleFiles.settings = function(context) {
    return {
        callBackList: function() {
            var moduleField = context.controller.form.mapping.fields['module'];
            moduleField.options = {};
            moduleField.allOptions = {};
            context.controller.methods.makeModuleOptions(context.erpAppConfig.modules.controllers, moduleField);
            var adminOption = {
                userType: 'ADMIN',
                desc: 'ADMIN',
                optionName: 'ADMIN',
                optionId: 'ADMIN'
            };
            context.controller.form.mapping.fields['restrictUser'].options['ADMIN'] = adminOption;
            if (context.controller.lastData === undefined) {
                context.commonFact.add();
            } else {
                context.commonFact.edit(context.controller.lastData.id);
            }
        },
        makeModuleOptions: function(modules, field, parentModule) {
            for (var i in modules) {
                var module = angular.copy(modules[i]);
                var optionIdVal = parentModule && parentModule.id + '.' + module.id || module.id;
                var optionNameVal = parentModule && '-- ' + module.title || module.title;
                if (i !== 'disable') {
                    field.allOptions[optionIdVal] = module;
                    field.allOptions[optionIdVal]['optionName'] = optionNameVal;
                    field.allOptions[optionIdVal]['optionId'] = optionIdVal;
                    field.options[optionIdVal] = field.allOptions[optionIdVal];

                    if (!module.page) {
                        context.controller.methods.makeModuleOptions(context.commonFact.showSubModule(modules[i]), field, modules[i]);
                    }
                }
            }
        }
    };
};
erpConfig.moduleFiles.login = function(context) {
    return {
        loginSubmit: function() {
            context.authFact.login().then(function(userDetail) {
                if (!userDetail || !userDetail.userType) {
                    context.controller.alertMessage = 'Invalid User!!!';
                } else {
                    context.commonFact.goToPage(context.erpAppConfig.modules.controllers.dashboard.page.link, true);
                }
            });
        },
        redirectLogin: function() {
            context.commonFact.location.search('');
            context.commonFact.goToPage(context.erpAppConfig.modules.controllers.login.page.link, true);
        },
        onLoad: function() {
            if (context.commonFact.location.search() && context.commonFact.location.search()['type'] === 'logout') {
                context.erpAppConfig.serverAuth && context.authFact.logout().then(function() {
                    context.controller.methods.redirectLogin();
                }) || context.controller.methods.redirectLogin();

            }
        }
    };
};
erpConfig.moduleFiles.databaseUpload = function(context) {
    return {
        uploadDatabase: function() {
            if (context.controller.data && context.controller.data.databaseUpload && context.controller.data.databaseUpload) {
                context.commonFact.updateData(context.controller, context.controller.data.databaseUpload).then(function() {
                    context.controller.message = 'Successfully uploded...';
                    context.controller.alertMessage = undefined;
                    context.commonFact.goToPage(context.erpAppConfig.modules.controllers.dashboard.page.link, true);
                });
            } else {
                context.controller.alertMessage = 'Failed uploded...';
                context.controller.message = undefined;
            }

        },
        onLoad: function() {
            context.controller.data = context.controller.masterData;
        }
    };
};
erpConfig.moduleFiles.customerPaymentInvoice = function(context) {
    return {
        callBackList: function() {
            context.controller.form.mapping.actions = {};
        },
        callBackAdd: function() {
            context.commonFact.makeOptionsFields(context.controller.form.fields['invoiceNo']);
            context.controller.data['date'] = null;
        },
        callBackEdit: function() {
            for (var i in context.controller.data.mapping) {
                context.controller.data.mapping[i].date = new Date(context.controller.data.mapping[i].date);
            }
            if (context.controller.data.balanceAmount <= 0) {
                context.controller.form.mapping.actions.add = false;
            }
        },
        callBackChangeMapping: function() {
            context.controller.data.balanceAmount = context.controller.data.total;
            context.controller.data['date'] = context.commonFact.dateFormatChange(context.controller.data['date']);
        },
        updateBalanceAmount: function() {
            var amount = 0;
            for (var i in context.controller.data.mapping) {
                amount += parseFloat(context.controller.data.mapping[i].amount);
            }
            context.controller.data.balanceAmount = parseFloat(context.controller.data.total) - parseFloat(amount);
            if (context.controller.data.balanceAmount <= 0) {
                context.controller.form.mapping.actions.add = false;
            }
            if (context.controller.data.balanceAmount < 0) {
                context.controller.data.balanceAmount = 0;
                //data.amount = null;
            }
        }
    };
};

erpConfig.moduleFiles.customerPaymentCashBill = erpConfig.moduleFiles.customerPaymentInvoice;
erpConfig.moduleFiles.empPayment = function(context) {
    return {
        callBackAdd: function() {
            context.controller.data['toDate'] = new Date();
        },
        getProductionEntry: function() {
            var frmDate = context.controller.data.frmDate;
            var toDate = context.controller.data.toDate;
            var filterOperator = context.controller.data.employeeCode;
            var empPaidList = context.controller.methods.getEmpPaymentPaid();
            return context.commonFact.getData('report.productionEntryReport').then(function(res) {
                var productionEntry = res.data;
                var productionEntryList = {};
                for (var i in productionEntry) {
                    for (var j in productionEntry[i].mapping) {
                        var date = new Date(productionEntry[i].mapping[j].date);
                        var operator = productionEntry[i].mapping[j].operator;
                        var objKey = productionEntry[i].mapping[j].operator + '-' + productionEntry[i].partNo + '-' + productionEntry[i].mapping[j].operationTo;
                        if ((!filterOperator || (operator === filterOperator)) &&
                            (!frmDate || (frmDate && new Date(frmDate) <= date)) &&
                            (!toDate || toDate && new Date(toDate) >= date) &&
                            (!empPaidList[objKey] || (empPaidList[objKey] && new Date(empPaidList[objKey].productionEntryDate) < date))) {

                            var qty = parseInt(productionEntry[i].mapping[j].acceptedQty) || 0;
                            if (productionEntryList[objKey]) {
                                qty += productionEntryList[objKey].qty;
                            }

                            var details = {
                                partNo: productionEntry[i].partNo,
                                operationTo: productionEntry[i].mapping[j].operationTo,
                                operator: productionEntry[i].mapping[j].operator,
                                qty: qty,
                                productionEntryKey: objKey,
                                productionEntryDate: productionEntry[i].mapping[j].date,
                                date: null
                            };
                            productionEntryList[objKey] = details;

                        }
                    }
                }
                return productionEntryList;
            });

        },
        getEmpPaymentPaid: function() {
            var listViewData = angular.copy(context.controller.listViewDataMaster);
            var filterOperator = context.controller.data.employeeCode;
            var empPaidList = {};

            for (var i in listViewData) {
                var operator = listViewData[i].employeeCode;
                if (!filterOperator || (operator === filterOperator)) {
                    for (var j in listViewData[i].mapping) {
                        empPaidList[listViewData[i].mapping[j].productionEntryKey] = listViewData[i].mapping[j];
                    }
                }
            }
            return empPaidList;
        },
        callBackEdit: function() {
            for (var i in context.controller.data.mapping) {
                context.controller.data.mapping[i].date = new Date(context.controller.data.mapping[i].date);
            }
            if (context.controller.data.balanceAmount <= 0) {
                context.controller.form.mapping.actions.add = false;
            }
        },
        addPartMap: function(data) {
            context.commonFact.changeMapping(data, data.employeeCode, context.controller.form.fields['employeeCode']);
        },
        callBackChangeMapping: function(data, key, field, fieldMapKey) {
            context.controller.methods.updatePartMap(data, key, field, fieldMapKey);
        },
        updatePartMap: function() {

            context.controller.methods.getProductionEntry().then(function(productionEntryList) {
                var total = 0;
                var employeeCode = context.controller.data.employeeCode;
                var newMapData = [];
                newMapData = context.controller.data.mapping.filter(function(data) {
                    var mapFindKey = employeeCode + '-' + data.id + '-' + data.operationTo;
                    if (productionEntryList[mapFindKey] && productionEntryList[mapFindKey].qty > 0) {
                        data = angular.extend(data, angular.copy(productionEntryList[mapFindKey]));
                        data.totalLaborCost = parseInt(productionEntryList[mapFindKey].qty * data.laborCost);
                        total += data.totalLaborCost;
                        return true;
                    }
                });
                context.controller.data.mapping = newMapData;
                context.controller.data.total = total;
                context.controller.data.balanceAmount = context.controller.data.total;
            });

        },
        updateBalanceAmount: function(data) {
            var amount = context.controller.data.balanceAmount;
            if (data.paidStatus) {
                amount -= parseInt(data.totalLaborCost);
            } else {
                amount += parseInt(data.totalLaborCost);
            }
            data.date = new Date();
            context.controller.data.balanceAmount = amount;
        }
    };
};
erpConfig.moduleFiles.subContractorPayment = function(context) {
    return {
        callBackList: function() {
            context.controller.form.mapping.actions = {};
        },
        callBackAdd: function() {
            context.commonFact.makeOptionsFields(context.controller.form.fields['grnNo']);
        },
        callBackEdit: function() {
            for (var i in context.controller.data.mapping) {
                context.controller.data.mapping[i].date = new Date(context.controller.data.mapping[i].date);
            }
            if (context.controller.data.balanceAmount <= 0) {
                context.controller.form.mapping.actions.add = false;
            }
        },
        callBackChangeMapping: function(data, key, field) {
            var total = 0;
            var grnMap = field.options[context.controller.data.grnNo];
            context.controller.data.total = grnMap.total;
            context.controller.data.subContractorDCDate = context.commonFact.dateFormatChange(context.controller.data.subContractorDCDate);
            context.controller.data.balanceAmount = context.controller.data.total;
        },
        updateBalanceAmount: function() {
            var amount = 0;
            for (var i in context.controller.data.mapping) {
                amount += parseFloat(context.controller.data.mapping[i].amount);
            }
            context.controller.data.balanceAmount = parseFloat(context.controller.data.total) - parseFloat(amount);
            if (context.controller.data.balanceAmount <= 0) {
                context.controller.form.mapping.actions.add = false;
            }
            if (context.controller.data.balanceAmount < 0) {
                context.controller.data.balanceAmount = 0;
            }
        }
    };
};
erpConfig.moduleFiles.suppilerPayment = function(context) {
    return {
        callBackList: function() {
            context.controller.form.mapping.actions = {};
        },
        callBackAdd: function() {
            context.commonFact.makeOptionsFields(context.controller.form.fields['grnNo']);
        },
        callBackEdit: function() {
            for (var i in context.controller.data.mapping) {
                context.controller.data.mapping[i].date = new Date(context.controller.data.mapping[i].date);
            }
            if (context.controller.data.balanceAmount <= 0) {
                context.controller.form.mapping.actions.add = false;
            }
        },
        callBackChangeMapping: function(data, key, field) {
            var total = 0;
            var grnMap = field.options[context.controller.data.grnNo];
            context.controller.data.total = grnMap.total;
            context.controller.data.supplierInvoiceDate = context.commonFact.dateFormatChange(context.controller.data.supplierInvoiceDate);
            context.controller.data.balanceAmount = context.controller.data.total;
        },
        updateBalanceAmount: function() {
            var amount = 0;
            for (var i in context.controller.data.mapping) {
                amount += parseFloat(context.controller.data.mapping[i].amount);
            }
            context.controller.data.balanceAmount = parseFloat(context.controller.data.total) - parseFloat(amount);
            if (context.controller.data.balanceAmount <= 0) {
                context.controller.form.mapping.actions.add = false;
            }
            if (context.controller.data.balanceAmount < 0) {
                context.controller.data.balanceAmount = 0;
            }
        }
    };
};
erpConfig.moduleFiles.empMaster = function(context) {
    return {
        updateStage: function(mappingData, key, field, _this) {
            var restriction = {
                partNo: mappingData.id
            };
            field.options = {};
            context.commonFact.getOperationFromFlow(field, restriction);
        },
        callBackEdit: function() {
            context.controller.data.mapping = !context.controller.data.mapping && context.controller.masterData.mapping || context.controller.data.mapping;
        }
    };
};
erpConfig.moduleFiles.invoice = function(context) {
    var orgItemVal = null,
        delMapItemVal = [];
    return {
        callBackList: function() {
            context.commonFact.getPartStock();
            orgItemVal = null;
            delMapItemVal = [];
        },
        callBackSetAutoGenKey: function() {
            var year = context.erpAppConfig.calendarYear;
            context.controller.data[context.controller.form.autoGenKey] = context.controller.data[context.controller.form.autoGenKey] + '/' + year + '-' + ('' + parseInt(year + 1)).substring(2);
        },
        callBackChangeMapping: function(data, key, field) {
            context.controller.methods.getPartStockDetail(data, key, field);
            orgItemVal.mapping = angular.copy(context.controller.data.mapping);
            context.controller.methods.updateTotalAmount();
        },
        callBackRemoveMapping: function(data, key) {
            if (context.controller.page.name === 'edit') {
                delMapItemVal.push(orgItemVal.mapping[key]);
            }
            delete orgItemVal.mapping.splice(key, 1);
        },
        callBackAdd: function() {
            orgItemVal = angular.copy(context.controller.data);
            delMapItemVal = [];
        },
        callBackEdit: function() {
            orgItemVal = angular.copy(context.controller.data);
            delMapItemVal = [];
        },
        getPartStockDetail: function() {
            var newMapData = [];
            newMapData = context.controller.data.mapping.filter(function(data) {
                if (context.controller.partStock[data.id + '-' + context.erpAppConfig.finalStageOpp]) {
                    data.operationFrom = context.controller.partStock[data.id + '-' + context.erpAppConfig.finalStageOpp].operationFrom;
                    data.operationTo = context.controller.partStock[data.id + '-' + context.erpAppConfig.finalStageOpp].operationTo;
                }

                return (context.controller.partStock && context.controller.partStock[data.id + '-' + context.erpAppConfig.finalStageOpp] && parseInt(context.controller.partStock[data.id + '-' + context.erpAppConfig.finalStageOpp].partStockQty) > 0);
            });
            context.controller.data.mapping = newMapData;
        },
        updateTotal: function(data, updateValue, field, fieldKey) {
            var partDetail = context.controller.form.mapping.fields['id'].options[data.id],
                totalBeforTax = 0,
                partStock = 0;

            if (context.controller.partStock[data.id + '-' + context.erpAppConfig.finalStageOpp]) {
                partStock = parseInt(context.controller.partStock[data.id + '-' + context.erpAppConfig.finalStageOpp].partStockQty);
                if (context.controller.page.name === 'edit') {
                    partStock += parseInt(orgItemVal.mapping[fieldKey].unit);
                }
                data.unit = partStock < data.unit ? null : data.unit;
            }

            totalBeforTax = data.unit * data.rate;

            data.amount = parseFloat(totalBeforTax).toFixed(2);
            context.controller.methods.updateTotalAmount();

        },
        updateTotalAmount: function() {
            var taxRateTotal = 0,
                cgstTotal = 0,
                sgstTotal = 0,
                igstTotal = 0,
                total = 0,
                subTotal = 0,
                mapping = context.controller.data.mapping;

            for (var i in mapping) {
                subTotal += mapping[i].amount && parseFloat(mapping[i].amount) || 0;
            }

            if (context.controller.cashBill === false) {

                cgstTotal = context.controller.data.cgst && (parseFloat(subTotal) * parseFloat(context.controller.data.cgst / 100)) || 0;
                sgstTotal = context.controller.data.sgst && (parseFloat(subTotal) * parseFloat(context.controller.data.sgst / 100)) || 0;
                igstTotal = context.controller.data.igst && (parseFloat(subTotal) * parseFloat(context.controller.data.igst / 100)) || 0;
                taxRateTotal = (parseFloat(cgstTotal) + parseFloat(sgstTotal) + parseFloat(igstTotal));

                total = subTotal + taxRateTotal;
                context.controller.data.taxRate = context.controller.data.gst;
                context.controller.data.cgstTotal = parseFloat(cgstTotal).toFixed(2);
                context.controller.data.sgstTotal = parseFloat(sgstTotal).toFixed(2);
                context.controller.data.igstTotal = parseFloat(igstTotal).toFixed(2);
            } else {
                total = subTotal;
            }

            context.controller.data.subTotal = parseFloat(subTotal).toFixed(2);
            context.controller.data.total = Math.round(total);
            if (context.controller.cashBill) {
                context.controller.methods.updatePreBalance();
            }
        },
        updatePreBalance: function() {
            var total = parseFloat(context.controller.data.subTotal);
            if (context.controller.data.preBalance) {
                total = total + parseFloat(context.controller.data.preBalance);
            }
            context.controller.data.total = Math.round(total);
        },
        updateInvoicePartStock: function() {
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
                newContext.controller.data = data;
                newContext.controller.updatePrevStock = false;
                context.commonFact.updatePartStock(newContext);
            };
            for (var i in context.controller.data.mapping) {
                mapStockUpdate(context.controller.data.mapping[i], i, false);
            }
            for (var j in delMapItemVal) {
                mapStockUpdate(delMapItemVal[j], j, true);
            }

        },
        callBackSubmit: function() {
            context.controller.methods.updateInvoicePartStock();
        },
        callBeforeDelete: function(id, item) {
            context.controller.data = item;
            context.controller.methods.updateInvoicePartStock();
        }
    };
};

erpConfig.moduleFiles.cashBill = erpConfig.moduleFiles.invoice;
erpConfig.moduleFiles.assembleMaterialIssueNote = function(context) {
    var orgItemVal = null;
    return {
        callBackEdit: function() {
            orgItemVal = angular.copy(context.controller.data);
        },
        callBackAdd: function() {
            orgItemVal = null;
        },
        callBackList: function() {
            context.commonFact.getPartStock();
            orgItemVal = null;
            var listViewData = angular.copy(context.controller.listViewDataMaster);
            var partDetailList = [];
            for (var i in listViewData) {
                if (listViewData[i].isAssemblePart === 1) {
                    partDetailList.push(listViewData[i]);
                }

            }
            context.controller.listViewData = partDetailList;
        },
        getSubParts: function() {
            context.commonFact.getData('production.bomAssemblePart').then(function(res) {
                var bomData = res.data;
                for (var i in bomData) {
                    if (bomData[i].partNo === context.controller.data.partNo) {
                        context.controller.data.mapping = angular.extend(context.controller.data.mapping, bomData[i].mapping);
                    }
                }
            });
        },
        updateQtyMake: function(mappingData, value, field, fieldMapkey) {
            if (mappingData.id) {
                var partStockVal = context.controller.partStock[mappingData.id + '-' + context.erpAppConfig.finalStageOpp];
                if (partStockVal) {
                    if (context.controller.page.name === 'edit' && orgItemVal && orgItemVal.mapping && orgItemVal.mapping[fieldMapkey].issueQty) {
                        field.max = parseInt(orgItemVal.mapping[fieldMapkey].issueQty) + parseInt(partStockVal.partStockQty);
                    } else {
                        field.max = partStockVal.partStockQty;
                    }

                    mappingData.operationFrom = partStockVal.operationFrom;
                    mappingData.operationTo = partStockVal.operationTo;
                }
                if (mappingData.partNorms && mappingData.issueQty && field.max && field.max >= mappingData.issueQty) {
                    mappingData.qtyCanMake = mappingData.issueQty / mappingData.partNorms;
                } else {
                    mappingData.qtyCanMake = null;
                }

            }
            context.controller.methods.updateTotalQtyMake();
        },
        updateTotalQtyMake: function() {
            var subPartsLength = context.controller.data.mapping.length;
            var totalQtyMake = 0;
            var qtyCanMake;
            var prevCanMake;
            var isValid = false;
            for (var i in context.controller.data.mapping) {
                if (context.controller.data.mapping[i].qtyCanMake) {
                    totalQtyMake += context.controller.data.mapping[i].qtyCanMake;
                }
                if (!prevCanMake || prevCanMake === context.controller.data.mapping[i].qtyCanMake) {
                    isValid = true;
                } else {
                    isValid = false;
                }
                prevCanMake = context.controller.data.mapping[i].qtyCanMake;
            }
            qtyCanMake = totalQtyMake / subPartsLength;
            if (Number.isInteger(qtyCanMake) && isValid) {
                context.controller.data.qtyCanMake = qtyCanMake;
            } else {
                context.controller.data.qtyCanMake = null;
            }

        },
        updateSubPartStock: function(isDel) {
            var mapStockUpdate = function(map, key, del) {
                var data = angular.copy(map);
                var newContext = angular.copy(context);
                data.partNo = data.id;
                if (!del) {
                    if (orgItemVal && orgItemVal.id && orgItemVal.mapping && orgItemVal.mapping[key]) {
                        data.acceptedQty = parseInt(orgItemVal.mapping[key].issueQty) - parseInt(map.issueQty);
                    } else {
                        data.acceptedQty = 0 - parseInt(map.issueQty);
                    }
                } else {
                    data.acceptedQty = parseInt(map.issueQty);
                }
                newContext.controller.data = data;
                newContext.controller.updatePrevStock = false;
                context.commonFact.updatePartStock(newContext);
            };
            for (var i in context.controller.data.mapping) {
                mapStockUpdate(context.controller.data.mapping[i], i, isDel || false);
            }
        },
        callBackSubmit: function() {
            var qtyCanMake;
            var newContext = angular.copy(context);
            if (orgItemVal && orgItemVal.qtyCanMake) {
                qtyCanMake = parseInt(newContext.controller.data.qtyCanMake) - parseInt(orgItemVal.qtyCanMake);
                newContext.controller.data.acceptedQty = qtyCanMake;
            } else {
                newContext.controller.data.acceptedQty = newContext.controller.data.qtyCanMake;
            }
            context.commonFact.updatePartStock(newContext).then(function() {
                context.controller.methods.updateSubPartStock();
            });

        },
        callBeforeDelete: function(id, item) {
            var qtyCanMake;
            var newContext = angular.copy(context);
            newContext.controller.data = item;
            newContext.controller.data.acceptedQty = 0 - parseInt(newContext.controller.data.qtyCanMake);
            context.commonFact.updatePartStock(newContext).then(function() {
                context.controller.methods.updateSubPartStock(true);
            });
        }
    };
};
erpConfig.moduleFiles.flowMaster = function(context) {
    return {
        updateCostAnalysis: function(mappingData, value, field, fieldMapkey) {
            var machineDetails = context.controller.form.mapping.fields.machineNo.options[mappingData.machineNo];
            var costAnalysis = 0;

            costAnalysis = machineDetails && (machineDetails.machineShiftRate / machineDetails.shiftHrs);
            mappingData.costAnalysis = costAnalysis > 0 && mappingData.palnQtyPerHr > 0 && (costAnalysis / mappingData.palnQtyPerHr) || 0;
            context.controller.methods.updateTotalCost();
        },
        updateTotalCost: function() {
            var totalCost = 0;
            for (var i in context.controller.data.mapping) {
                var mappingData = context.controller.data.mapping[i];
                var otherCost = mappingData.otherCost || 0;
                var costAnalysis = mappingData.costAnalysis || 0;

                totalCost += parseFloat(otherCost) + parseFloat(costAnalysis);
            }
            context.controller.data.totalCost = totalCost;
        }
    }
};
erpConfig.moduleFiles.materialIssueNote = function(context) {
    var orgItemVal = null;
    return {
        callBackEdit: function() {
            orgItemVal = angular.copy(context.controller.data);
        },
        callBackAdd: function() {
            var rmStock = [];
            orgItemVal = null;

            for (var i in context.controller.rmStock) {
                if (context.controller.rmStock[i] && context.controller.rmStock[i].rmStockQty > 0) {
                    rmStock.push(context.controller.rmStock[i].rmCode);
                }

            }
            context.controller.form.fields['rmCode'] = angular.extend(context.controller.form.fields['rmCode'], {
                filter: {
                    id: rmStock
                }
            });
            context.commonFact.makeOptionsFields(context.controller.form.fields['rmCode']);

        },
        callBackList: function() {
            context.commonFact.getRMStock();
            context.controller.listView[1].filter = {
                isAssemblePart: undefined
            };
            context.commonFact.makeOptionsFields(context.controller.listView[1]);

            var listViewData = angular.copy(context.controller.listViewDataMaster);
            var partDetailList = [];
            for (var i in listViewData) {
                if (listViewData[i].isAssemblePart === undefined) {
                    partDetailList.push(listViewData[i]);
                }

            }
            context.controller.listViewData = partDetailList;
        },
        getPartNo: function() {
            if (context.controller.data.rmCode) {
                context.controller.form.fields['partNo'].filter = {
                    rmCode: context.controller.data.rmCode
                };
                context.commonFact.makeOptionsFields(context.controller.form.fields['partNo']);
            }
        },
        getNorms: function() {
            if (context.controller.data.rmCode && context.controller.data.partNo) {
                context.controller.data.partNorms = null;
                context.controller.data.qtyCanMake = null;
                context.controller.data.issueQty = null;
                context.commonFact.getData('production.bom').then(function(res) {
                    var bomData = res.data;
                    for (var i in bomData) {
                        if (bomData[i].partNo === context.controller.data.partNo && bomData[i].rmCode === context.controller.data.rmCode) {
                            context.controller.data.partNorms = bomData[i].partNorms;
                        }
                    }
                });
            }
        },
        updateQtyMake: function() {
            if (context.controller.data.rmCode) {

                if (orgItemVal && orgItemVal.issueQty) {
                    context.controller.form.fields['issueQty'].max = parseInt(orgItemVal.issueQty) + parseInt(context.controller.rmStock[context.controller.data.rmCode].rmStockQty);
                } else {
                    context.controller.form.fields['issueQty'].max = context.controller.rmStock[context.controller.data.rmCode].rmStockQty;
                }

                if (context.controller.data.partNorms && context.controller.data.issueQty && context.controller.form.fields['issueQty'].max >= context.controller.data.issueQty) {
                    context.controller.data.qtyCanMake = context.controller.data.issueQty / context.controller.data.partNorms;
                } else {
                    context.controller.data.qtyCanMake = null;
                }

            }
        },
        removeRMStockQty: function(del) {
            var rmCode = context.controller.data.rmCode,
                existingStock = null,
                removeQty = context.controller.data.issueQty;

            existingStock = context.controller.rmStock[rmCode];
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
                };
                context.commonFact.updateData('report.rmStock', data);
            }
        },
        callBackSubmit: function() {
            var qtyCanMake;
            context.controller.methods.removeRMStockQty();

            if (orgItemVal && orgItemVal.issueQty) {
                qtyCanMake = parseInt(context.controller.data.qtyCanMake) - parseInt(orgItemVal.qtyCanMake);
                context.controller.data.acceptedQty = qtyCanMake;
            } else {
                context.controller.data.acceptedQty = context.controller.data.qtyCanMake;
            }
            context.commonFact.updatePartStock();
        },
        callBeforeDelete: function(id, item) {
            var qtyCanMake;
            context.controller.data = item;
            context.controller.methods.removeRMStockQty(true);
            context.controller.data.acceptedQty = 0 - parseInt(context.controller.data.qtyCanMake);
            context.commonFact.updatePartStock();
        }
    };
};
erpConfig.moduleFiles.productionEntry = function(context) {
    return {
        callBackAdd: function() {
            context.controller.page.printViewMapping = false;
            context.controller.finalMapping = 0;
        },
        callBackEdit: function() {
            if (!context.controller.page.printView) {
                context.controller.page.printViewMapping = true;
                context.commonFact.addMapping(context.controller.data.mapping);
                context.controller.finalMapping = context.controller.data.mapping.length - 1;
                context.controller.methods.callBackChangeMapping();
            }
        },
        callBackList: function() {
            context.commonFact.getPartStock();
            context.controller.methods.getPRQty();
            context.commonFact.getFlowMaster();
            context.commonFact.getOperations();
        },
        checkAcceptedQty: function(mappingData, value, field, fieldMapkey) {
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

            prFrmQtyMap = context.controller.data.jobCardNo + '-' + context.controller.data.partNo + '-' + mappingData.operationFrom + '-frm';
            prToQtyMap = context.controller.data.jobCardNo + '-' + context.controller.data.partNo + '-' + mappingData.operationTo + '-to';
            prFrmToQtyMap = context.controller.data.jobCardNo + '-' + context.controller.data.partNo + '-' + mappingData.operationFrom + '-to';

            if (context.controller.data.partNo && mappingData.operationFrom) {
                if (context.controller.operationsData[mappingData.operationFrom].source === 'Supplier' || context.controller.form.fields['jobCardNo'].options[context.controller.data.jobCardNo].isAssemblePart === 1) {
                    qtyCanMake = context.controller.form.fields['jobCardNo'].options[context.controller.data.jobCardNo].qtyCanMake;
                } else if (context.controller.operationsData[mappingData.operationFrom].source === 'Sub-Contractor') {
                    qtyCanMake = context.controller.prQty[context.controller.data.jobCardNo + '-' + context.controller.data.partNo + '-' + context.controller.partStock[context.controller.data.partNo + '-' + mappingData.operationFrom].operationFrom + '-to'].prAcpQty || 0;
                } else {
                    qtyCanMake = context.controller.prQty[prFrmToQtyMap] && context.controller.prQty[prFrmToQtyMap].prAcpQty || 0;
                }
                stockQty = context.controller.partStock[context.controller.data.partNo + '-' + mappingData.operationFrom] && context.controller.partStock[context.controller.data.partNo + '-' + mappingData.operationFrom].partStockQty || 0;
                fullQty = context.controller.prQty[prFrmQtyMap] && parseInt(context.controller.prQty[prFrmQtyMap].prQty) + parseInt(qty) || qty;
            }

            if (qty > stockQty || fullQty > qtyCanMake || (context.controller.prQty[prFrmToQtyMap] && context.controller.prQty[prFrmToQtyMap].prAcpQty < qty)) {
                mappingData[field.id] = null
            }
        },
        callBackChangeMapping: function(data, key, field) {
            context.controller.methods.updateOperationFrom(data, key, field);
            context.controller.methods.updateOperationTo(data, key, field);
        },
        updateOperationFrom: function(data, key, field) {
            var prQtyFrmMap;
            var prQtyPrevMap;
            var prQtyToMap;
            var flwMap;
            var jobCard = context.controller.form.fields['jobCardNo'].options[context.controller.data.jobCardNo];
            var jobCardQty = jobCard && jobCard.qtyCanMake;

            if (context.controller.data.jobCardNo) {
                var restriction = {
                        partNo: context.controller.data.partNo
                    },
                    operation = [];
                for (var i in context.controller.partStock) {
                    if (context.controller.partStock[i].partStockQty > 0 && context.controller.data.partNo === context.controller.partStock[i].partNo) {
                        prQtyPrevMap = context.controller.data.jobCardNo + '-' + context.controller.partStock[i].partNo + '-' + context.controller.partStock[i].operationFrom + '-frm';
                        prQtyFrmMap = context.controller.data.jobCardNo + '-' + context.controller.partStock[i].partNo + '-' + context.controller.partStock[i].operationTo + '-frm';
                        prQtyToMap = context.controller.data.jobCardNo + '-' + context.controller.partStock[i].partNo + '-' + context.controller.partStock[i].operationFrom + '-to';
                        flwMap = context.controller.partStock[i].partNo + '-' + context.controller.partStock[i].operationTo;

                        if ((!context.controller.prQty[prQtyFrmMap] &&
                                (!context.controller.partStock[i].operationFrom ||
                                    (context.controller.prQty[prQtyPrevMap] &&
                                        context.controller.prQty[prQtyPrevMap].prQty > 0))) ||
                            (context.controller.prQty[prQtyFrmMap] &&
                                context.controller.prQty[prQtyFrmMap].prQty < jobCardQty) ||
                            (context.controller.flowMasterByPartOpr[flwMap] &&
                                context.controller.flowMasterByPartOpr[flwMap].source === "Sub-Contractor")) {
                            operation.push(context.controller.partStock[i].operationTo);
                        }
                    }
                }
                restriction.filter = {
                    id: operation
                }
                context.commonFact.getOperationFromFlow(context.controller.form.mapping.fields['operationFrom'], restriction);
            }
        },
        updateOperationTo: function(mappingData) {
            context.controller.form.mapping.fields['operationTo'].options = {};
            if (context.controller.data.jobCardNo) {
                var partNo = context.controller.data.partNo,
                    restriction = {
                        partNo: partNo
                    };
                if (mappingData && mappingData.operationFrom) {
                    restriction = angular.extend(restriction, {
                        limit: 1,
                        startWith: mappingData.operationFrom
                    });
                }

                context.commonFact.getOperationFromFlow(context.controller.form.mapping.fields['operationTo'], restriction).then(function() {
                    var options = context.controller.form.mapping.fields['operationTo'].options;
                    var firstOption = options[Object.keys(options)[0]];
                    if (firstOption && firstOption.source === 'Sub-Contractor') {
                        context.controller.form.mapping.fields['operationTo'].options = {};
                    }
                });
            }
        },
        updateToolNo: function(mappingData) {
            mappingData.toolNo = context.controller.data.partNo && mappingData.operationTo && context.controller.flowMasterByPartOpr[context.controller.data.partNo + '-' + mappingData.operationTo].toolNo || null;
        },
        calculatePlanQty: function(mappingData) {
            var startDate = mappingData.startTime;
            var endDate = mappingData.endTime;
            var timeDiff = endDate - startDate;
            var palnQtyPerHr = context.controller.data.partNo && mappingData.operationTo && context.controller.flowMasterByPartOpr[context.controller.data.partNo + '-' + mappingData.operationTo].palnQtyPerHr || 1;
            mappingData.planQty = timeDiff * palnQtyPerHr;
        },
        updateMaterialIssue: function() {
            var jobCard = context.controller.form.fields['jobCardNo'].options[context.controller.data.jobCardNo];
            var jobCardQty = jobCard && jobCard.qtyCanMake;
            jobCard.status = 1;
            context.commonFact.updateData('production.materialIssueNote', jobCard);
        },
        getPRQty: function() {
            context.controller.prQty = {};
            return context.commonFact.getData('production.productionEntry').then(function(res) {
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
                        prFrmAcpQty = context.controller.prQty[prFrmQtyMap] ? parseInt(context.controller.prQty[prFrmQtyMap].prAcpQty) + parseInt(listViewData[i].mapping[j].acceptedQty) : parseInt(listViewData[i].mapping[j].acceptedQty);
                        prFrmQty = context.controller.prQty[prFrmQtyMap] ? parseInt(context.controller.prQty[prFrmQtyMap].prQty) + parseInt(prQty) : parseInt(prQty);
                        prToQty = context.controller.prQty[prToQtyMap] ? parseInt(context.controller.prQty[prToQtyMap].prQty) + parseInt(prQty) : parseInt(prQty);
                        prToAcpQty = context.controller.prQty[prToQtyMap] ? parseInt(context.controller.prQty[prToQtyMap].prAcpQty) + parseInt(listViewData[i].mapping[j].acceptedQty) : parseInt(listViewData[i].mapping[j].acceptedQty);

                        context.controller.prQty[prFrmQtyMap] = listViewData[i].mapping[j];
                        context.controller.prQty[prFrmQtyMap].prQty = prFrmQty;
                        context.controller.prQty[prFrmQtyMap].prAcpQty = prFrmAcpQty;
                        context.controller.prQty[prToQtyMap] = listViewData[i].mapping[j];
                        context.controller.prQty[prToQtyMap].prQty = prToQty;
                        context.controller.prQty[prToQtyMap].prAcpQty = prToAcpQty;
                    }
                };
                return context.controller.prQty;
            });
        },
        callBackSubmit: function() {
            var newQty;
            var data = angular.copy(context.controller.data.mapping[context.controller.finalMapping]);
            var newContext = angular.copy(context);
            data.partNo = context.controller.data.partNo;
            newContext.controller.data = data;
            context.commonFact.updatePartStock(newContext);
            context.controller.methods.updateMaterialIssue();
        },
        prodEntryDownload: function() {
            if (!context.selectedTableData) {
                return;
            }
            var prodData = context.selectedTableData[context.controller.id];
            context.commonFact.getData('production.materialIssueNote').then(function(res) {
                var materData = res.data;
                var jobCardNo = 1;
                context.selectedTableData['materialIssueNote'] = {};
                for (var i in prodData) {
                    context.selectedTableData['materialIssueNote'][jobCardNo] = materData[prodData[i].jobCardNo];
                    context.selectedTableData['materialIssueNote'][jobCardNo].id = jobCardNo;
                    context.selectedTableData['materialIssueNote'][jobCardNo].jobCardNo = jobCardNo;
                    prodData[i].jobCardNo = jobCardNo;
                    jobCardNo++;
                }
                context.commonFact.downloadFile(context.selectedTableData, context.controller.id + '.json');
            });
        }
    };
};
erpConfig.moduleFiles.poGeneralSupplier = function(context) {
    return {
        updatePartDetails: function(mapping) {
            context.commonFact.getData('marketing.partMaster', mapping.id).then(function(res) {
                var partData = res.data;
                for (var mapKey in partData) {
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
erpConfig.moduleFiles.poSupplier = function(context) {
    return {
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
            }
        }
    };
};
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
erpConfig.moduleFiles.costAnalysis = function(context) {
    return {
        callBackList: function() {
            context.commonFact.getFlowMaster().then(function() {
                context.commonFact.getData('purchase.rmMaster').then(function(res) {

                    for (var i in context.controller.listViewData) {
                        var partDetails = context.controller.listViewData[i];
                        var rmCode = context.controller.listViewData[i].rmCode;
                        var rmDetails = rmCode && res.data[rmCode];
                        var flowMasterDetails = context.controller.flowMasterByPart[partDetails.id];
                        if (rmDetails) {
                            partDetails.rmRate = rmDetails.rate;
                            partDetails.scrapRate = rmDetails.scrapRate;
                            partDetails.materialCost = rmDetails && ((parseFloat(partDetails.inputWeight) * parseFloat(rmDetails.rate)) - (((parseFloat(partDetails.inputWeight) - parseFloat(partDetails.finishedWeight)) * parseFloat(rmDetails.scrapRate))));
                            partDetails.conversionCost = flowMasterDetails && flowMasterDetails.totalCost;
                            partDetails.subTotal = parseFloat(partDetails.materialCost) + parseFloat(partDetails.conversionCost);
                            partDetails.rejCost = partDetails.subTotal * (partDetails.rejection / 100);
                            partDetails.iccCost = partDetails.subTotal * (partDetails.icc / 100);
                            partDetails.toolMaintCost = partDetails.subTotal * (partDetails.toolMaintenance / 100);
                            partDetails.transCost = rmDetails && ((parseFloat(partDetails.finishedWeight) * parseFloat(partDetails.transportCostKg)) + (parseFloat(partDetails.inputWeight) * parseFloat(rmDetails.transportCostKg)));
                            partDetails.profitCost = partDetails.subTotal * (partDetails.profit / 100);
                            partDetails.total = partDetails.subTotal + partDetails.rejCost + partDetails.iccCost + partDetails.toolMaintCost + partDetails.transCost + partDetails.profitCost;
                            partDetails.salesRate = partDetails.rate;
                            partDetails.differenceInCost = partDetails.salesRate - partDetails.total;
                            partDetails.gainOrLoss = (partDetails.differenceInCost / partDetails.salesRate) * 100;
                        }
                    }

                });
            });
        }
    };
};
erpConfig.moduleFiles.empPerformanceReport = function(context) {
    return {
        callBackList: function() {
            var list = [];
            var listViewData = angular.copy(context.controller.listViewDataMaster);
            for (var i in listViewData) {
                var frmDate = context.controller.filterView.data['frmDate'];
                var toDate = context.controller.filterView.data['toDate'];
                var filterPartNo = context.controller.filterView.data['partNo'];
                var partNo = listViewData[i]['partNo'];
                var filterOperator = context.controller.filterView.data['operator'];

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
            context.controller.listViewData = list;
        }
    };
};
erpConfig.moduleFiles.machineRunningTime = function(context) {
    return {
        callBackList: function() {
            var list = [];
            context.controller.listViewData = [];
            context.commonFact.getAllYearData().then(function(listViewYearData) {
                for (var x in listViewYearData) {
                    var listViewData = listViewYearData[x];
                    for (var i in listViewData) {
                        var frmDate = context.controller.filterView.data['frmDate'];
                        var toDate = context.controller.filterView.data['toDate'];
                        var filterMachineNo = context.controller.filterView.data['machineNo'];

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
                                var isExist = context.commonFact.findObjectByKey(list, 'machineNo', details.machineNo);
                                if (isExist) {
                                    details.cumRunningTime += parseFloat(isExist.cumRunningTime);
                                }
                                list.push(details);
                            }
                        }
                    }
                }
                context.controller.listViewData = list;
            });

        }
    };
};
erpConfig.moduleFiles.partStock = function(context) {
    return {
        callBackList: function() {
            var newList = angular.copy(context.controller.listViewData);
            if (context.commonFact.location.search() && context.commonFact.location.search()['showall'] === 'no') {
                newList = context.controller.listViewData.filter(function(data) {
                    return data.partStockQty > 0;
                });
                context.controller.listViewData = newList
            }

            context.commonFact.getData('marketing.partMaster').then(function(res) {
                var listViewData = angular.copy(context.controller.listViewDataMaster);
                for (var i in listViewData) {
                    var stockData = context.controller.listViewData[i];
                    var partNo = stockData.partNo;
                    var partDetails = partNo && res.data[partNo];
                    stockData.rate = partDetails && partDetails.rate;
                    stockData.totalAmount = stockData.rate && (stockData.rate * stockData.partStockQty);
                }
            });
        },
        updateOperationFrom: function() {
            if (context.controller.data.partNo) {
                var restriction = {
                    partNo: context.controller.data.partNo
                };
                context.commonFact.getOperationFromFlow(context.controller.form.fields['operationFrom'], restriction);
            }
        },
        updateOperationTo: function(data, key, field) {
            if (context.controller.data.partNo) {
                var partNo = context.controller.data.partNo,
                    restriction = {
                        partNo: partNo
                    };

                if (data.operationFrom) {
                    restriction = angular.extend(restriction, {
                        limit: 1,
                        startWith: data.operationFrom
                    });
                }

                context.commonFact.getOperationFromFlow(context.controller.form.fields['operationTo'], restriction);
            }
        },
        submit: function() {
            var submitService;
            if (context.controller.data.id) {
                submitService = context.commonFact.updateData(context.controller, context.controller.data)
            } else {
                context.updatePrevStock = false;
                context.controller.data.acceptedQty = context.controller.data.partStockQty;
                submitService = context.commonFact.updatePartStock();
            }

            submitService.then(function() {
                context.controller.page.name = 'list';
                context.commonFact.list();
            });
        }
    };
};
erpConfig.moduleFiles.productionEntryReport = function(context) {
    return {
        callBackList: function() {
            var list = [];
            var listViewData = angular.copy(context.controller.listViewDataMaster);

            for (var i in listViewData) {
                var frmDate = context.controller.filterView.data['frmDate'];
                var toDate = context.controller.filterView.data['toDate'];

                for (var j in listViewData[i].mapping) {
                    var date = new Date(listViewData[i].mapping[j].date);
                    var machineNo = listViewData[i].mapping[j]['machineNo'];
                    if ((!frmDate || (frmDate && new Date(frmDate) <= date)) && (!toDate || toDate && new Date(toDate) >= date)) {
                        var details = {
                            machineNo: machineNo,
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
            context.controller.listViewData = list;
        }
    };
};
erpConfig.moduleFiles.rmStock = function(context) {
    return {
        callBackList: function() {
            var newList = angular.copy(context.controller.listViewData);
            if (context.commonFact.location.search() && context.commonFact.location.search()['showall'] === 'no') {
                newList = context.controller.listViewData.filter(function(data) {
                    return data.partStockQty > 0;
                });
                context.controller.listViewData = newList
            }
            context.commonFact.getData('purchase.rmMaster').then(function(res) {
                var listViewData = angular.copy(context.controller.listViewDataMaster);
                for (var i in listViewData) {
                    var stockData = context.controller.listViewData[i];
                    var rmCode = stockData.rmCode;
                    var rmDetails = rmCode && res.data[rmCode];
                    stockData.rate = rmDetails && rmDetails.rate;
                    stockData.totalAmount = stockData.rate && (stockData.rate * stockData.rmStockQty);
                }
            });
        },
        submit: function() {
            var stockData;
            context.commonFact.getData('report.rmStock').then(function(res) {
                stockData = res.data;
                for (var i in stockData) {
                    if (!context.controller.data.id && stockData[i].rmCode === context.controller.data.rmCode) {
                        context.controller.data.id = stockData[i].id;
                        context.controller.data.rmStockQty = parseInt(context.controller.data.rmStockQty) + parseInt(stockData[i].rmStockQty);
                    }
                }
                commonFact.submit();
            });

        }
    };
};
erpConfig.moduleFiles.salesAnalysisInvoice = function(context) {
    return {
        callBackList: function() {
            var partDetailList = [];
            var listViewData = angular.copy(context.controller.listViewDataMaster);
            for (var i in listViewData) {
                var frmDate = context.controller.filterView.data['frmDate'];
                var toDate = context.controller.filterView.data['toDate'];
                var filterCustomerCode = context.controller.filterView.data['customerCode'];
                var customerCode = listViewData[i]['customerCode'];
                var date = new Date(listViewData[i]['date']);
                frmDate = frmDate && new Date(frmDate) || false;
                toDate = toDate && new Date(toDate) || false;
                toDate = toDate && new Date(toDate.setDate(toDate.getDate() + 1)) || false;
                if ((!filterCustomerCode || (customerCode === filterCustomerCode)) && (!frmDate || (frmDate && frmDate <= date)) && (!toDate || toDate && toDate >= date)) {
                    for (var j in listViewData[i].mapping) {
                        var partDetail = {
                            partNo: listViewData[i].mapping[j].id,
                            amount: listViewData[i].mapping[j].amount,
                            rate: listViewData[i].mapping[j].rate,
                            taxRate: listViewData[i].taxRate || listViewData[i].igst,
                            unit: listViewData[i].mapping[j].unit,
                            customerCode: listViewData[i]['customerCode'],
                            dates: context.commonFact.dateFormatChange(date),
                            invoiceNos: !context.controller.cashBill ? 'VT-' + listViewData[i]['invoiceNo'] : listViewData[i]['invoiceNo']
                        };

                        if (!context.controller.cashBill) {
                            partDetail.amount = parseFloat(partDetail.amount) + (parseFloat(partDetail.amount) * parseFloat(partDetail.taxRate / 100));
                        }
                        var isPartExist = context.commonFact.findObjectByKey(partDetailList, 'partNo', partDetail['partNo']);
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
            context.controller.listViewData = partDetailList;
        }
    };
};
erpConfig.moduleFiles.salesAnalysisCashBill = erpConfig.moduleFiles.salesAnalysisInvoice
erpConfig.moduleFiles.subContractorStock = function(context) {
    return {
        callBackList: function() {
            var newList = angular.copy(context.controller.listViewData);
            if (context.commonFact.location.search() && context.commonFact.location.search()['showall'] === 'no') {
                newList = context.controller.listViewData.filter(function(data) {
                    return data.partStockQty > 0;
                });
                context.controller.listViewData = newList
            }
            context.commonFact.getData('marketing.partMaster').then(function(res) {
                var listViewData = angular.copy(context.controller.listViewDataMaster);
                for (var i in listViewData) {
                    var stockData = context.controller.listViewData[i];
                    var partNo = stockData.partNo;
                    var partDetails = partNo && res.data[partNo];
                    stockData.rate = partDetails && partDetails.rate;
                    stockData.totalAmount = stockData.rate && (stockData.rate * stockData.partStockQty);
                }
            });
            context.commonFact.getFlowMaster();
        },
        callBackEdit: function() {
            setTimeout(function() {
                context.controller.methods.updateOperationFrom();
                context.controller.methods.updateOperationTo();
            }, 1000);
        },
        getPartNos: function() {
            var partNos = [];
            if (context.controller.data.subContractorCode) {
                context.commonFact.getData('purchase.subContractorMaster', context.controller.data.subContractorCode).then(function(res) {
                    var data = res.data;
                    for (var i in data.mapping) {
                        partNos.push(data.mapping[i].id);
                    }
                    context.controller.form.fields['partNo'].filter = {
                        id: partNos
                    };
                    context.commonFact.makeOptionsFields(context.controller.form.fields['partNo']);
                });
            }
        },
        updateOperationFrom: function() {
            var prevOpp;
            var operationFrom;
            if (context.controller.data && context.controller.data.partNo) {
                var restriction = {
                    partNo: context.controller.data.partNo
                };
                for (var j in context.controller.flowMasterData) {
                    if (context.controller.flowMasterData[j].partNo === context.controller.data.partNo) {
                        for (var k in context.controller.flowMasterData[j].mapping) {
                            prevOpp = context.controller.flowMasterData[j].mapping[k - 1];
                            if (prevOpp && context.controller.flowMasterData[j].mapping[k].source === 'Sub-Contractor') {
                                operationFrom = prevOpp.id;
                            }
                        }
                    }
                }
                restriction.filter = {
                    id: operationFrom
                }
                context.commonFact.getOperationFromFlow(context.controller.form.fields['operationFrom'], restriction);
            }
        },
        updateOperationTo: function() {
            if (context.controller.data && context.controller.data.partNo) {
                var partNo = context.controller.data.partNo,
                    restriction = {
                        partNo: partNo
                    };

                if (context.controller.data.operationFrom) {
                    restriction = angular.extend(restriction, {
                        limit: 1,
                        startWith: context.controller.data.operationFrom
                    });
                }

                context.commonFact.getOperationFromFlow(context.controller.form.fields['operationTo'], restriction);
            }
        },
        submit: function() {
            var submitService;
            if (context.controller.data.id) {
                submitService = context.commonFact.updateData(context.controller, context.controller.data)
            } else {
                context.controller.data.acceptedQty = context.controller.data.partStockQty;
                submitService = context.commonFact.updateSCStock();
            }

            submitService.then(function() {
                context.controller.page.name = 'list';
                context.commonFact.list();
            });
        }
    };
};
erpConfig.moduleFiles.toolHistoryCard = function(context) {
    return {
        callBackList: function() {
            var list = [];
            context.controller.listViewData = [];
            context.commonFact.getAllYearData().then(function(listViewYearData) {
                for (var x in listViewYearData) {
                    var listViewData = listViewYearData[x];
                    for (var i in listViewData) {
                        var frmDate = context.controller.filterView.data['frmDate'];
                        var toDate = context.controller.filterView.data['toDate'];
                        var filterToolNo = context.controller.filterView.data['toolNo'];
                        var filterPartNo = context.controller.filterView.data['partNo'];
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

                                var isPartExist = context.commonFact.findObjectByKey(list, 'toolNo', details.toolNo);
                                if (isPartExist) {
                                    details.cummulativeQty += parseInt(isPartExist.cummulativeQty);
                                }
                                list.push(details);
                            }
                        }
                    }
                }
                context.controller.listViewData = list;
            });

        }
    };
};
erpConfig.moduleFiles.dcSubContractor = function(context) {
    var orgItemVal = null;
    return {
        callBackList: function() {
            context.commonFact.getPartStock();
        },
        callBackEdit: function() {
            context.controller.form.mapping.actions.delete = false;
            orgItemVal = angular.copy(context.controller.data);
            context.controller.methods.getDCQty();
        },
        getPOSubContractor: function(data, key, field) {
            context.controller.form.fields['poNo'] = angular.extend(context.controller.form.fields['poNo'], {
                filter: {
                    subContractorCode: key,
                    status: 0
                }
            });
            context.commonFact.makeOptionsFields(context.controller.form.fields['poNo']);
            context.commonFact.changeMapping(context.controller.data, context.controller.data['subContractorCode'], context.controller.form.fields['subContractorCode']);
        },
        callBackChangeMapping: function() {
            context.controller.methods.checkAcceptedQty();
            context.controller.methods.getDCQty();
        },
        checkAcceptedQty: function() {
            var partNo,
                operationFrom;
            context.commonFact.getData('production.flowMaster').then(function(res) {
                var flowMasterData = res.data,
                    prevOpp,
                    qty;
                var dcPartStockQty;
                for (var i in context.controller.data.mapping) {
                    partNo = context.controller.data.mapping[i].id;
                    qty = context.controller.data.mapping[i].acceptedQty;
                    for (var j in flowMasterData) {
                        if (flowMasterData[j].partNo === partNo) {
                            for (var k in flowMasterData[j].mapping) {
                                prevOpp = flowMasterData[j].mapping[k - 1];
                                if (prevOpp && flowMasterData[j].mapping[k].source === 'Sub-Contractor') {
                                    operationFrom = prevOpp.id;
                                }

                                if (operationFrom) {
                                    dcPartStockQty = context.controller.partStock[partNo + '-' + operationFrom];

                                    if (dcPartStockQty === undefined || dcPartStockQty.partStockQty < qty) {
                                        context.controller.data.mapping[i].acceptedQty = qty = null;
                                    }
                                }
                            }
                        }
                    }
                    context.controller.data.mapping[i].operationFrom = operationFrom;
                }
            });
        },
        callBackUpdatePartTotal: function(data) {
            var qty = parseInt(data.acceptedQty),
                poQty = parseInt(context.controller.methods.getPOQty(data)),
                dcQty = context.controller.dcQty && context.controller.dcQty[context.controller.data['poNo'] + '-' + data.id] || 0;

            qty += parseInt(dcQty);
            if (poQty < qty) {
                data.acceptedQty = null;
            }
            context.commonFact.updatePOTotalAmount();
        },
        getPOQty: function(data) {
            var poSubContractor = context.controller.form.fields['poNo'].options[context.controller.data.poNo];
            var poQty = 0;
            var poNo = context.controller.data.poNo;

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
        updatePoSubContractor: function() {
            var poSubContractor = context.controller.form.fields['poNo'].options[context.controller.data.poNo];
            var poQty = 0;
            var dcQty = 0;
            var qty = 0;
            poSubContractor.status = 1;
            for (var i in context.controller.data.mapping) {
                poQty = context.controller.methods.getPOQty(context.controller.data.mapping[i]);
                dcQty = parseInt(context.controller.dcQty[context.controller.data['poNo'] + '-' + context.controller.data.mapping[i].id]) || 0;
                qty = parseInt(context.controller.data.mapping[i].acceptedQty) + dcQty;
                if (parseInt(poQty) > parseInt(qty)) {
                    poSubContractor.status = 0;
                }
            }

            context.commonFact.updateData('purchase.poSubContractor', poSubContractor);

        },
        getDCQty: function(partNo) {
            var dcQtyTag;
            var dcQty;
            context.controller.dcQty = [];
            return context.commonFact.getData('store.dcSubContractor').then(function(res) {
                var listViewData = res.data;
                for (var i in listViewData) {
                    if (context.controller.data.poNo === listViewData[i].poNo && (!orgItemVal || listViewData[i].id !== orgItemVal.id)) {
                        for (var j in listViewData[i].mapping) {
                            dcQtyTag = listViewData[i].poNo + '-' + listViewData[i].mapping[j].id;
                            if (partNo === undefined || listViewData[i].mapping[j].id === partNo) {
                                dcQty = parseInt(listViewData[i].mapping[j].acceptedQty);
                            }
                            context.controller.dcQty[dcQtyTag] = context.controller.dcQty[dcQtyTag] === undefined ? dcQty : parseInt(context.controller.dcQty[dcQtyTag]) + dcQty;
                        }
                    }
                }
                return dcQty;
            });
        },
        callBackSubmit: function() {
            var acceptedQty;
            for (var i in context.controller.data.mapping) {
                var data = angular.copy(context.controller.data.mapping[i]);
                var newContext = angular.copy(context);
                data.partNo = data.id;
                data.subContractorCode = context.controller.data.subContractorCode;
                if (orgItemVal && orgItemVal.mapping[i] && orgItemVal.mapping[i].acceptedQty) {
                    acceptedQty = parseInt(data.acceptedQty) - parseInt(orgItemVal.mapping[i].acceptedQty);
                    data.acceptedQty = acceptedQty;
                }
                newContext.controller.data = data;
                context.commonFact.updateSCStock(newContext);
                newContext.controller.updateCurStock = false;
                context.commonFact.updatePartStock(newContext);
            }
            context.controller.methods.updatePoSubContractor();
        },
        callBeforeDelete: function(id, item) {
            var acceptedQty;
            var poSubContractor;
            for (var i in item.mapping) {
                var data = angular.copy(item.mapping[i]);
                var newContext = angular.copy(context);
                data.partNo = data.id;
                data.subContractorCode = item.subContractorCode;
                acceptedQty = 0 - parseInt(data.acceptedQty);
                data.acceptedQty = acceptedQty;

                newContext.controller.data = data;
                context.commonFact.updateSCStock(newContext);
                newContext.controller.updateCurStock = false;
                context.commonFact.updatePartStock(newContext);
            }

            context.commonFact.getData('purchase.poSubContractor', item.poNo).then(function(res) {
                poSubContractor = res.data;
                poSubContractor.status = 0;
                context.commonFact.updateData('purchase.poSubContractor', poSubContractor);
            });

        }
    };
};
erpConfig.moduleFiles.grnGeneralSupplier = function(context) {
    var orgItemVal = null;
    return {
        getPOGeneralSupplier: function(data, key, field) {
            context.controller.form.fields['poNo'] = angular.extend(context.controller.form.fields['poNo'], {
                dataFrom: 'purchase.poGeneralSupplier',
                replaceName: 'poNo',
                filter: {
                    generalSupplierCode: key,
                    status: 0
                }
            });
            context.commonFact.makeOptionsFields(context.controller.form.fields['poNo']);
        },
        updatePTTotal: function(data, updateValue) {
            var total = 0;
            var qty = updateValue || 0;
            total = qty * data.rate;
            data.total = parseFloat(total).toFixed(2);
            context.commonFact.updatePOTotalAmount();
        },
        callBackAdd: function() {
            orgItemVal = null;
        },
        callBackEdit: function(key) {
            context.controller.form.mapping.actions.delete = false;
            orgItemVal = angular.copy(context.controller.data);
            context.controller.data['generalSupplierInvoiceDate'] = new Date(context.controller.data['generalSupplierInvoiceDate']);
        },
        updatePoGeneralSupplier: function() {
            context.commonFact.getData('purchase.poGeneralSupplier', context.controller.data.poNo).then(function(res) {
                var poGeneralSupplierData = res.data;
                poGeneralSupplierData.status = 1;
                poGeneralSupplierData.id = context.controller.data.poNo;
                context.commonFact.updateData('purchase.poGeneralSupplier', poGeneralSupplierData);
            });
        },
        callBackSubmit: function() {
            var newQty;
            var acceptedQty;
            for (var i in context.controller.data.mapping) {
                var data = angular.copy(context.controller.data.mapping[i]);
                var newContext = angular.copy(context);
                data.partNo = data.id;
                data.operationTo = context.erpAppConfig.finalStageOpp;
                newContext.controller.data = data;
                newContext.controller.updatePrevStock = false;
                if (orgItemVal && orgItemVal.mapping[i].acceptedQty) {
                    acceptedQty = parseInt(newContext.controller.data.acceptedQty) - parseInt(orgItemVal.mapping[i].acceptedQty);
                    newContext.controller.data.acceptedQty = acceptedQty;
                }
                context.commonFact.updatePartStock(newContext);

            }
            context.controller.methods.updatePoGeneralSupplier();
        }
    };
};
erpConfig.moduleFiles.grnSubContractor = function(context) {
    var orgItemVal = null
    return {
        callBackAdd: function() {
            orgItemVal = null;
        },
        callBackEdit: function() {
            context.controller.form.mapping.actions.delete = false;
            orgItemVal = angular.copy(context.controller.data);
            context.controller.data['subContractorDCDate'] = new Date(context.controller.data['subContractorDCDate']);
        },
        callBackList: function() {
            context.controller.grnSC = true;
        },
        getDCSubContractor: function(data, key, field) {
            context.controller.form.fields['dcNo'] = angular.extend(context.controller.form.fields['dcNo'], {
                filter: {
                    poNo: key,
                    status: 0
                }
            });
            context.commonFact.makeOptionsFields(context.controller.form.fields['dcNo']);
        },
        getPOSubContractor: function(data, key, field) {
            context.controller.form.fields['poNo'] = angular.extend(context.controller.form.fields['poNo'], {
                filter: {
                    subContractorCode: key
                }
            });
            context.commonFact.makeOptionsFields(context.controller.form.fields['poNo']);
        },
        updateDCSubContractor: function() {
            var dcSubContractor = context.controller.form.fields['dcNo'].options[context.controller.data.dcNo];
            var grnQty = 0;
            var dcQty = 0;
            var qty = 0;
            var updateDC = true;
            dcSubContractor.status = 1;
            for (var i in context.controller.data.mapping) {
                dcQty = context.controller.methods.getDCQty(context.controller.data.mapping[i]);
                grnQty = parseInt(context.controller.grnQty[context.controller.data['dcNo'] + '-' + context.controller.data.mapping[i].id]) || 0;
                qty = parseInt(context.controller.data.mapping[i].acceptedQty) + grnQty;
                if (parseInt(dcQty) > parseInt(qty)) {
                    updateDC = false;
                }
            }
            if (updateDC) {
                context.commonFact.updateData('store.dcSubContractor', dcSubContractor);
            }

        },
        callBackChangeMapping: function() {
            context.commonFact.getSCStock().then(function() {
                if (orgItemVal) {
                    for (var i in orgItemVal.mapping) {
                        var scStockMap = orgItemVal.mapping[i].id + '-' + orgItemVal.mapping[i].operationFrom;
                        if (context.controller.partStock[scStockMap]) {
                            context.controller.partStock[scStockMap].partStockQty = parseInt(context.controller.partStock[scStockMap].partStockQty) + parseInt(orgItemVal.mapping[i].acceptedQty);
                        }
                    }
                }
            });
            context.controller.methods.getGrnQty();
        },
        callBackUpdatePartTotal: function(data, newValue, field, fieldMapKey) {
            var qty = parseInt(data.acceptedQty),
                dcQty = parseInt(context.controller.methods.getDCQty(data)),
                grnQty = context.controller.grnQty[context.controller.data['dcNo'] + '-' + data.id] || 0;

            qty += parseInt(grnQty);
            if (dcQty < qty) {
                data.acceptedQty = null;
            }
            context.commonFact.updatePOTotalAmount();
        },
        getDCQty: function(data) {
            var dcSubContractor = context.controller.form.fields['dcNo'].options[context.controller.data.dcNo];
            var dcQty = 0;
            var poNo = context.controller.data.poNo;

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
        getGrnQty: function(partNo) {
            var grnQtyTag;
            var grnQty;
            context.controller.grnQty = [];

            return context.commonFact.getData('store.grnSubContractor').then(function(res) {
                var listViewData = res.data;
                for (var i in listViewData) {
                    if (context.controller.data.dcNo === listViewData[i].dcNo) {
                        for (var j in listViewData[i].mapping) {
                            if (listViewData[i].mapping[j].id !== orgItemVal.mapping[j].id) {
                                grnQtyTag = listViewData[i].dcNo + '-' + listViewData[i].mapping[j].id;
                                if (partNo === undefined || listViewData[i].mapping[j].id === partNo) {
                                    grnQty = parseInt(listViewData[i].mapping[j].acceptedQty);
                                }
                                context.controller.grnQty[grnQtyTag] = context.controller.grnQty[grnQtyTag] === undefined ? grnQty : parseInt(context.controller.grnQty[grnQtyTag]) + grnQty;
                            }
                        }
                    }
                }
                return grnQty;
            });
        },
        callBackSubmit: function() {
            var newQty;
            var acceptedQty;
            for (var i in context.controller.data.mapping) {
                var data = angular.copy(context.controller.data.mapping[i]);
                var newContext = angular.copy(context);
                data.partNo = data.id;
                newContext.controller.data = data;
                newContext.controller.updatePrevStock = false;
                if (orgItemVal && orgItemVal.mapping[i].acceptedQty) {
                    acceptedQty = parseInt(newContext.controller.data.acceptedQty) - parseInt(orgItemVal.mapping[i].acceptedQty);
                    newContext.controller.data.acceptedQty = acceptedQty;
                }
                context.commonFact.updatePartStock(newContext);
                var scData = angular.copy(data);
                var newScContext = angular.copy(context);
                scData.subContractorCode = context.controller.data.subContractorCode;
                scData.acceptedQty = 0 - scData.acceptedQty;
                newScContext.controller.data = scData;
                context.commonFact.updateSCStock(newScContext);
            }
            context.controller.methods.updateDCSubContractor();
        }
    };
};
erpConfig.moduleFiles.grnSupplier = function(context) {
    var orgItemVal = null;
    return {
        getPOSupplier: function(data, key, field) {
            context.controller.form.fields['poNo'] = angular.extend(context.controller.form.fields['poNo'], {
                dataFrom: 'purchase.poSupplier',
                replaceName: 'poNo',
                filter: {
                    supplierCode: key,
                    status: 0
                }
            });
            context.commonFact.makeOptionsFields(context.controller.form.fields['poNo']);
        },
        updateRmTotal: function(data, updateValue) {
            var total = 0;
            var qty = updateValue || 0;
            total = qty * data.rate;
            data.total = parseFloat(total).toFixed(2);
            context.commonFact.updatePOTotalAmount();
        },
        callBackAdd: function() {
            orgItemVal = null;
        },
        callBackEdit: function(key) {
            context.controller.form.mapping.actions.delete = false;
            orgItemVal = angular.copy(context.controller.data);
            context.controller.data['supplierInvoiceDate'] = new Date(context.controller.data['supplierInvoiceDate']);
        },
        updateRMStockQty: function() {
            context.commonFact.getData('report.rmStock').then(function(res) {
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

                for (var i in context.controller.data.mapping) {
                    existingStock = rmStock[context.controller.data.mapping[i].id];
                    qty = context.controller.data.mapping[i].acceptedQty || context.controller.data.mapping[i].receivedQty;
                    if (orgItemVal && orgItemVal.mapping[i].acceptedQty) {
                        oldQty = orgItemVal.mapping[i].acceptedQty || orgItemVal.mapping[i].receivedQty;
                        qty = parseInt(qty) - parseInt(oldQty);
                    }
                    rmStockQty = existingStock && parseInt(existingStock.rmStockQty) + parseInt(qty) || parseInt(qty);
                    data = {
                        id: existingStock && existingStock.id || undefined,
                        rmCode: context.controller.data.mapping[i].id,
                        rmStockQty: rmStockQty,
                        uomCode: context.controller.data.mapping[i].uomCode
                    }
                    context.commonFact.updateData('report.rmStock', data);
                }
            });
        },
        updatePoSupplier: function() {
            context.commonFact.getData('purchase.poSupplier', context.controller.data.poNo).then(function(res) {
                var poSupplierData = res.data;
                poSupplierData.status = 1;
                poSupplierData.id = context.controller.data.poNo;
                context.commonFact.updateData('purchase.poSupplier', poSupplierData);
            });
        },
        callBackSubmit: function() {
            context.controller.methods.updateRMStockQty();
            context.controller.methods.updatePoSupplier();
        }
    };
};
erpConfig.moduleFiles.appCustomers = function(context) {
    var editKey = null;
    var editAppCustomer = null;
    return {
        callBackEdit: function() {
            editKey = context.controller.page.editKey;
            var appSettings = {
                dataUri: 'restrict/settings',
                params: {
                    appCustomer: editKey
                }
            };
            context.commonFact.getData(appSettings, editKey).then(function(res) {
                editAppCustomer = res.data;
            });
        },
        callBackAdd: function() {
            editKey = null;
            editAppCustomer = null;
        },
        callBackList: function() {
            var moduleField = context.controller.form.fields['appModules'];
            moduleField.options = {
                all: {
                    'optionName': 'All',
                    'optionId': 'all'
                }
            };
            moduleField.allOptions = {
                all: {
                    'optionName': 'All',
                    'optionId': 'all'
                }
            };
            context.controller.methods.makeModuleOptions(context.erpAppConfig.modules.controllers, moduleField);


        },
        makeModuleOptions: function(modules, field, parentModule) {
            for (var i in modules) {
                var module = angular.copy(modules[i]);
                var optionIdVal = parentModule && parentModule.id + '/' + module.id || module.id + '/**';
                var optionNameVal = parentModule && '-- ' + module.title || module.title;
                if (module.defaultRelease === undefined) {
                    field.allOptions[optionIdVal] = module;
                    field.allOptions[optionIdVal]['optionName'] = optionNameVal;
                    field.allOptions[optionIdVal]['optionId'] = optionIdVal;
                    field.options[optionIdVal] = field.allOptions[optionIdVal];

                    if (!module.page) {
                        context.controller.methods.makeModuleOptions(context.commonFact.showSubModule(modules[i]), field, modules[i]);
                    }
                }
            }
        },
        callBackSubmit: function(data) {
            var appCustomer = data.id;
            var userData = {
                userName: data.companyName.replace(' ', '').toLowerCase(),
                password: data.companyName.replace(' ', '').toLowerCase(),
                userType: 'ADMIN'
            };
            var appSettings = {
                dataUri: 'restrict/settings',
                params: {
                    appCustomer: appCustomer
                }
            };

            var appUsers = {
                dataUri: 'data/users',
                params: {
                    appCustomer: appCustomer
                }
            };
            editAppCustomer = angular.extend(editAppCustomer || {}, { id: appCustomer, appModules: data.appModules });
            context.commonFact.updateData(appSettings, editAppCustomer).then(function() {
                !editKey && context.commonFact.updateData(appUsers, userData);
            });
        },
        callBackDelete: function(id) {
            var removeAppCustomer = {
                dataUri: 'removeAppCustomer',
                params: {
                    appCustomer: id
                }
            };
            context.commonFact.getData(removeAppCustomer);
        },
        downloadAppCustomer: function(id) {
            window.open('/api/auth/downloadAppCustomers/?appCustomer=' + id);
        },
        appCustomerlogin: function(id) {
            var appCustomerlogin = {
                dataUri: 'appCustomerlogin',
                params: {
                    appCustomer: id
                }
            };
            context.commonFact.getData(appCustomerlogin).then(function(res) {
                var userDetail = res.data;
                if (userDetail && userDetail.userType) {
                    context.commonFact.goToPage(context.erpAppConfig.modules.controllers.dashboard.page.link, true);
                }
            });
        }
    };
};
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
    '    <h1 class="align-center company-name" ng-if="context.erpAppConfig.companyName">{{context.erpAppConfig.companyName}}</h1>\n' +
    '    <alert-rol></alert-rol>\n' +
    '\n' +
    '    <div class="mb-3">\n' +
    '        <h3>{{context.controller.title}}</h3>\n' +
    '        <div ng-if="context.controller.page.name==\'add\' || context.controller.page.name==\'edit\'">\n' +
    '            <div class="card">\n' +
    '                <div class="card-header hide-print">\n' +
    '                    <b ng-if="!context.controller.page.printView">{{context.controller.form.title||\'Add/Edit\'}}</b>\n' +
    '                    <a ng-if="context.controller.page.printView && context.commonFact.isAppCustomer()" class="fa fa-print" href=\'javascript: void();\' onclick="window.print()"><b>Print View</b></a>\n' +
    '                    <button type="button" class="close float-right" aria-label="Close" ng-click="context.commonFact.cancel()">\n' +
    '                        <span aria-hidden="true">&times;</span>\n' +
    '                    </button>\n' +
    '                </div>\n' +
    '                <div ng-if="context.controller.page.printView && context.commonFact.isAppCustomer()" class="row">\n' +
    '                    <div class="col-8">\n' +
    '                        <img ng-if="context.erpAppConfig.companyLogoUrl" class="logo" title="{{context.erpAppConfig.companyName}}" ng-src="{{context.erpAppConfig.companyLogoUrl}}" />\n' +
    '                        <h1 ng-if="!context.erpAppConfig.companyLogoUrl" class="logo">{{context.erpAppConfig.companyName}}</h1>\n' +
    '                    </div>\n' +
    '                    <div class="col-4">\n' +
    '\n' +
    '                        <p class="font-italic"><b>{{context.erpAppConfig.companyAddress}}</b></p>\n' +
    '                        <p class="font-italic"><b>Mobile:</b> {{context.erpAppConfig.companyMobile}} <b>Email:</b> {{context.erpAppConfig.companyEmail}}</p>\n' +
    '                        <p class="font-italic" ng-if="!context.controller.cashBill"><b>GSTIN:</b> {{context.erpAppConfig.companyGstin}}</p>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="card-body">\n' +
    '                    <custom-form></custom-form>\n' +
    '                </div>\n' +
    '                <div ng-if="context.controller.page.printView && context.commonFact.isAppCustomer()" class="row">\n' +
    '                    <div class="col-8"></div>\n' +
    '                    <div class="col-4">\n' +
    '                        <p class="text-center font-italic"><b>For {{context.erpAppConfig.companyName}}</b></p>\n' +
    '                        <br/>\n' +
    '                        <p class="text-center font-italic"><b>Authorised Signatory</b></p>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div ng-if="context.controller.page.name==\'list\'">\n' +
    '            <filter-view></filter-view>\n' +
    '            <list-view></list-view>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div ng-if="context.showLoading" id="overlay-loader" class="d-flex justify-content-center">\n' +
    '        <div class="spinner-border text-primary" role="status">\n' +
    '            <span class="sr-only">Loading...</span>\n' +
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
    '    <h1 class="align-center company-name" ng-if="context.erpAppConfig.companyName">{{context.erpAppConfig.companyName}}</h1>\n' +
    '    <alert-rol></alert-rol>\n' +
    '    <div class="mb-3">\n' +
    '        <h3>{{context.controller.title}}</h3>\n' +
    '        <ul class="navbar-nav" ng-if="context.authFact.isLogged() && context.erpLoaded">\n' +
    '            <li ng-if="context.commonFact.isShowMenu(module)" class="nav-item dropdown" ng-repeat="(key, module) in context.erpAppConfig.modules.controllers">\n' +
    '                <a ng-if="module.page" class="nav-link" href="#!{{module.page.link}}">\n' +
    '                    <i class="fa fa-fw fa-{{module.icon}}"></i>\n' +
    '                    <span class="nav-link-text">{{module.title}}</span>\n' +
    '                </a>\n' +
    '                <a ng-if="!module.page" class="nav-link">\n' +
    '                    <i class="fa fa-fw fa-{{module.icon}}"></i>\n' +
    '                    <span class="nav-link-text">{{module.title}}</span>\n' +
    '                </a>\n' +
    '                <ul>\n' +
    '                    <li ng-if="context.commonFact.isShowMenu(subModule)" ng-repeat="subModule in context.commonFact.showSubModule(module)">\n' +
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
    '        <li class="breadcrumb-item active">Upload</li>\n' +
    '    </ol>\n' +
    '    <!-- Example DataTables Card-->\n' +
    '    <div class="mb-3">\n' +
    '        <h3>{{context.controller.title}}</h3>\n' +
    '        <div>\n' +
    '            <div class="card">\n' +
    '                <div class="card-body">\n' +
    '                    <div ng-if="context.controller.alertMessage!==undefined" class="alert alert-danger" role="alert">\n' +
    '                        {{context.controller.alertMessage}}\n' +
    '                    </div>\n' +
    '                    <div ng-if="context.controller.message!==undefined" class="alert alert-success" role="alert">\n' +
    '                        {{context.controller.message}}\n' +
    '                    </div>\n' +
    '                    <h5 style="color:green;">{{context.controller.data.uploadSuccess}}</h5>\n' +
    '                    <form name="customForm">\n' +
    '                        <input type="file" file-model="context.controller.data.databaseUpload" class="form-control" />\n' +
    '\n' +
    '                        <button ng-click="context.controller.methods.uploadDatabase()" class="btn btn-primary">Submit</button>\n' +
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
  $templateCache.put('template/components/alertRol.html',
    '<div>\n' +
    '    <div class="modal fade" id="RolModal" role="dialog">\n' +
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
    '                            <div ng-repeat="rolRed in context.alertRolContext.partRolRed | orderBy:\'partStockQty\'">\n' +
    '                                <div class="alert alert-danger" role="alert">\n' +
    '                                    <b>Part No:</b> {{rolRed.partNo}} - <b>Qty:</b> {{rolRed.partStockQty}}\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="col-6">\n' +
    '                            <p><b>Yellow alert:</b></p>\n' +
    '                            <div ng-repeat="rolYellow in context.alertRolContext.partRolYellow | orderBy:\'partStockQty\'">\n' +
    '                                <div class="alert alert-warning" role="alert">\n' +
    '                                    <b>Part No:</b> {{rolYellow.partNo}} - <b>Qty:</b> {{rolYellow.partStockQty}}\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="modal-footer">\n' +
    '                    <button type="button" class="btn btn-primary" ng-click="context.alertRolHideROL=true" data-dismiss="modal">OK</button>\n' +
    '                    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>\n' +
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
    '    <div ng-if="context.controller.alertMessage!==undefined" class="alert alert-danger" role="alert">\n' +
    '        {{context.controller.alertMessage}}\n' +
    '    </div>\n' +
    '    <form id="{{context.controller.form.id}}" name="customForm" autocomplete="off">\n' +
    '        <div class="form-group row" ng-switch="field.type" ng-repeat="field in context.controller.form.fields" ng-if="!context.controller.page.printView && !field.afterMapping">\n' +
    '            <label for="{{field.id}}" class="col-2 col-form-label"><b>{{field.name}}:</b></label>\n' +
    '            <div ng-switch-when="span" class="col-10">\n' +
    '                <span id="{{field.id}}">{{field.valuePrefix}}{{context.controller.data[field.id]}}</span>\n' +
    '            </div>\n' +
    '            <div ng-switch-when="input" class="col-6">\n' +
    '                <input type="{{field.inputType}}" id="{{field.id}}" name="{{context.controller.form.id}}-{{field.id}}" class="form-control" ng-model="context.controller.data[field.id]" ng-required="{{field.required}}" ng-change="context.commonFact.callActions(field.action, [context.controller.data, context.controller.data[field.id], field])"\n' +
    '                    max="{{field.max}}" ng-disabled="field.isDisable || (field.isEditDisable && context.controller.data[context.controller.form.disableByField])" />\n' +
    '            </div>\n' +
    '            <div ng-switch-when="select" class="col-6">\n' +
    '                <select id="{{field.id}}" class="form-control" ng-model="context.controller.data[field.id]" ng-required="{{field.required}}" ng-change="context.commonFact.callActions(field.action,[context.controller.data, context.controller.data[field.id], field])" ng-options="option.optionId as option.optionName for option in field.options"\n' +
    '                    ng-disabled="field.isDisable || (field.isEditDisable && context.controller.data[context.controller.form.disableByField])">\n' +
    '                    <option value="">--Select--</option>\n' +
    '                </select>\n' +
    '            </div>\n' +
    '            <div ng-switch-when="multiSelect" class="col-6">\n' +
    '                <select id="{{field.id}}" class="form-control" ng-model="context.controller.data[field.id]" ng-required="{{field.required}}" ng-change="context.commonFact.callActions(field.action,[context.controller.data, context.controller.data[field.id], field])" ng-options="option.optionId as option.optionName for option in field.options"\n' +
    '                    ng-disabled="field.isDisable || (field.isEditDisable && context.controller.data[context.controller.form.disableByField])" multiple>\n' +
    '                    <option value="">--Select--</option>\n' +
    '                </select>\n' +
    '            </div>\n' +
    '            <div class="col-2">\n' +
    '                <span style="color:red" ng-show="customForm[field.id].$invalid">*Invalid input!</span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="form-group row" ng-repeat="field in context.controller.form.fields" ng-if="context.controller.page.printView && !field.afterMapping">\n' +
    '            <label for="{{field.id}}" class="col-2 col-form-label"><b>{{field.name}}:</b></label>\n' +
    '            <div class="col-10">\n' +
    '                <span id="{{field.id}}" ng-bind="context.commonFact.replaceFieldVal(context.controller.printData[field.id], field)"></span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="form-group row" ng-if="context.controller.form.mapping">\n' +
    '            <div class="col-12">\n' +
    '                <mapping-form></mapping-form>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="form-group row" ng-switch="field.type" ng-repeat="field in context.controller.form.fields" ng-if="!context.controller.page.printView && field.afterMapping">\n' +
    '            <label ng-switch-when="span" for="{{field.id}}" class="col-2 col-form-label"><b>{{field.name}}:</b></label>\n' +
    '            <div ng-switch-when="span" class="col-10">\n' +
    '                <span id="{{field.id}}">{{field.valuePrefix}}{{context.controller.data[field.id]}}</span>\n' +
    '            </div>\n' +
    '            <label ng-switch-when="input" for="{{field.id}}" class="col-2 col-form-label"><b>{{field.name}}:</b></label>\n' +
    '            <div ng-switch-when="input" class="col-6">\n' +
    '                <input type="{{field.inputType}}" id="{{field.id}}" name="{{field.id}}" class="form-control" ng-model="context.controller.data[field.id]" ng-required="{{field.required}}" ng-change="context.commonFact.callActions(field.action, [context.controller.data, context.controller.data[field.id], field])"\n' +
    '                    max="{{field.max}}" ng-disabled="field.isDisable || (field.isEditDisable && context.controller.data[context.controller.form.disableByField])" />\n' +
    '            </div>\n' +
    '            <label ng-switch-when="select" for="{{field.id}}" class="col-2 col-form-label"><b>{{field.name}}:</b></label>\n' +
    '            <div ng-switch-when="select" class="col-6">\n' +
    '                <select id="{{field.id}}" class="form-control" ng-model="context.controller.data[field.id]" ng-required="{{field.required}}" ng-change="context.commonFact.callActions(field.action, [context.controller.data, context.controller.data[field.id], field])"\n' +
    '                    ng-options="option.optionId as option.optionName for option in field.options" ng-disabled="field.isDisable || (field.isEditDisable && context.controller.data[context.controller.form.disableByField])">\n' +
    '                    <option value="">--Select--</option>\n' +
    '                </select>\n' +
    '            </div>\n' +
    '            <div class="col-2">\n' +
    '                <span style="color:red" ng-show="customForm[field.id].$invalid">*Invalid input!</span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="form-group row" ng-repeat="field in context.controller.form.fields" ng-if="context.controller.page.printView && field.afterMapping">\n' +
    '            <label for="{{field.id}}" class="col-2 col-form-label"><b>{{field.name}}:</b></label>\n' +
    '            <div class="col-10">\n' +
    '                <span id="{{field.id}}" ng-bind="context.commonFact.replaceFieldVal(context.controller.printData[field.id], field)"></span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="form-group row" ng-if="!context.controller.page.printView">\n' +
    '            <div class="col-2">\n' +
    '            </div>\n' +
    '            <div class="col-10">\n' +
    '                <button ng-if="context.controller.form.actions.submit === undefined || context.controller.form.actions.submit" type="button" class="btn btn-primary" id="submit" ng-click="context.controller.form.actions.customSubmit ? context.commonFact.callActions(context.controller.form.actions.customSubmit) : context.commonFact.submit()"\n' +
    '                    ng-disabled="customForm.$invalid">Submit</button>\n' +
    '                <button ng-if="context.controller.form.actions.cancel === undefined || context.controller.form.actions.cancel" type="button" class="btn btn-primary" id="cancel" ng-click="context.commonFact.cancel()">Cancel</button>\n' +
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
    '    <form id="{{context.controller.form.id}}" name="entryInvoice">\n' +
    '        <table class="table table-bordered">\n' +
    '            <tbody>\n' +
    '                <tr>\n' +
    '                    <td><b>{{context.controller.form.fields.invoiceNo.name}}</b></td>\n' +
    '                    <td colspan="2">\n' +
    '                        <span id="{{context.controller.form.fields.invoiceNo.id}}"><b>{{context.controller.form.fields.invoiceNo.valuePrefix}}{{context.controller.data[context.controller.form.fields.invoiceNo.id]}}</b></span>\n' +
    '                    </td>\n' +
    '                    <td align="right"><b>{{context.controller.form.fields.date.name}}</b></td>\n' +
    '                    <td colspan="2">\n' +
    '                        <input ng-if="!context.controller.page.printView" type="date" id="{{context.controller.form.fields.date.id}}" class="form-control" ng-model="context.controller.data[context.controller.form.fields.date.id]" ng-required="{{context.controller.form.fields.date.required}}"\n' +
    '                        />\n' +
    '                        <span ng-if="context.controller.page.printView" id="{{context.controller.form.fields.date.id}}" ng-bind="context.commonFact.replaceFieldVal(context.controller.data[context.controller.form.fields.date.id], context.controller.form.fields.date)">{{context.controller.data[context.controller.form.fields.date.id]}}</span>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td><b>{{context.controller.form.fields.customerCode.name}}</b></td>\n' +
    '                    <td colspan="6">\n' +
    '                        <select ng-if="!context.controller.page.printView" id="{{context.controller.form.fields.customerCode.id}}" class="form-control" ng-model="context.controller.data[context.controller.form.fields.customerCode.id]" ng-required="{{context.controller.form.fields.customerCode.required}}"\n' +
    '                            ng-change="context.commonFact.callActions(context.controller.form.fields.customerCode.action, [context.controller.data, context.controller.data[context.controller.form.fields.customerCode.id], context.controller.form.fields.customerCode])"\n' +
    '                            ng-options="option.optionId as option.optionName for option in context.controller.form.fields.customerCode.options" ng-disabled="context.controller.form.fields.customerCode.isDisable || (context.controller.form.fields.customerCode.isEditDisable && context.controller.data[context.controller.form.disableByField])"\n' +
    '                            ng-required="{{context.controller.form.fields.customerCode.required}}">\n' +
    '                            <option value="">--Select--</option>\n' +
    '                        </select>\n' +
    '                        <span ng-if="context.controller.page.printView" id="{{context.controller.form.fields.customerCode.id}}" ng-bind="context.commonFact.replaceFieldVal(context.controller.data[context.controller.form.fields.customerCode.id], context.controller.form.fields.customerCode)"></span>\n' +
    '\n' +
    '                        <span id="{{context.controller.form.fields.address.id}}">, {{context.controller.data[context.controller.form.fields.address.id]}}</span>\n' +
    '\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '                <tr ng-if="!context.controller.cashBill">\n' +
    '                    <td><b>{{context.controller.form.fields.partyGstin.name}}</b></td>\n' +
    '                    <td colspan="2">\n' +
    '                        <input ng-if="!context.controller.page.printView" type="text" id="{{context.controller.form.fields.partyGstin.id}}" class="form-control" ng-model="context.controller.data[context.controller.form.fields.partyGstin.id]" ng-required="{{context.controller.form.fields.required}}"\n' +
    '                        />\n' +
    '                        <span ng-if="context.controller.page.printView" id="{{context.controller.form.fields.partyGstin.id}}">{{context.controller.form.fields.partyGstin.valuePrefix}}{{context.controller.data[context.controller.form.fields.partyGstin.id]}}</span>\n' +
    '                    </td>\n' +
    '                    <td colspan="4"></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td ng-repeat="mappingFieldKey in context.controller.form.mapping.fields"><b>{{mappingFieldKey.name}}</b></td>\n' +
    '                    <td ng-if="!context.controller.page.printView">\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '                <tr ng-repeat="(key, map) in context.controller.data.mapping" ng-if="!context.controller.page.printView">\n' +
    '                    <td ng-switch="field.type" ng-repeat="field in context.controller.form.mapping.fields">\n' +
    '                        <span ng-switch-when="span" id="{{field.id}}-{{key}}" ng-bind="map[field.id]"></span>\n' +
    '                        <input ng-switch-when="input" type="{{field.inputType}}" id="{{field.id}}-{{key}}" class="form-control" ng-model="map[field.id]" ng-change="context.commonFact.callActions(field.action, [map, map[field.id], field, key])" ng-required="{{field.required}}"\n' +
    '                        />\n' +
    '                        <select class="form-control" ng-switch-when="select" id="{{field.id}}-{{key}}" ng-change="context.commonFact.callActions(field.action, [map, map[field.id], field, key])" ng-model="map[field.id]" ng-options="option.optionId as option.optionName for option in field.options"\n' +
    '                            ng-required="{{field.required}}" ng-disabled="field.isDisable">\n' +
    '                            <option value="">--Select--</option>\n' +
    '                        </select>\n' +
    '                    </td>\n' +
    '                    <td>\n' +
    '                        <a ng-if="context.controller.form.mapping.actions.delete || context.controller.form.mapping.actions.delete===undefined" class="fa fa-fw fa-times" href="javascript: void(0);" ng-click="context.commonFact.removeMapping(context.controller.data.mapping, key)">\n' +
    '                        </a>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '                <tr ng-repeat="(key, map) in context.controller.data.mapping" ng-if="context.controller.page.printView">\n' +
    '                    <td ng-repeat="field in context.controller.form.mapping.fields">\n' +
    '                        <span id="{{field.id}}-{{key}}" ng-bind="context.commonFact.replaceFieldVal(map[field.id], field)"></span>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '\n' +
    '                <tr>\n' +
    '                    <td colspan="4" align="right"><b>Sub Total:</b></td>\n' +
    '                    <td colspan="2"><span id="{{context.controller.form.fields.subTotal.id}}" ng-bind="context.controller.data[context.controller.form.fields.subTotal.id]"></span></td>\n' +
    '                </tr>\n' +
    '                <tr ng-if="context.controller.cashBill">\n' +
    '                    <td colspan="4" align="right"><b>Previous Balance:</b></td>\n' +
    '                    <td colspan="2"><input ng-if="!context.controller.page.printView" type="text" id="{{context.controller.form.fields.preBalance.id}}" class="form-control" ng-model="context.controller.data[context.controller.form.fields.preBalance.id]" ng-change="context.commonFact.callActions(context.controller.form.fields.preBalance.action, [map, map[context.controller.form.fields.preBalance.id], field])"\n' +
    '                        />\n' +
    '                        <span ng-if="context.controller.page.printView" id="{{context.controller.form.fields.preBalance.id}}">{{context.controller.data[context.controller.form.fields.preBalance.id]}}</span></td>\n' +
    '                </tr>\n' +
    '                <tr ng-if="!context.controller.cashBill">\n' +
    '                    <td rowspan="3" align="right"><b>{{context.controller.form.fields.taxRate.name}}</b></td>\n' +
    '                    <td rowspan="3"><span id="{{context.controller.form.fields.taxRate.id}}" ng-bind="context.controller.data[context.controller.form.fields.taxRate.id]"></span>%</td>\n' +
    '                    <td align="right"><b>{{context.controller.form.fields.cgst.name}}</b></td>\n' +
    '                    <td><span id="{{context.controller.form.fields.cgst.id}}" ng-bind="context.controller.data[context.controller.form.fields.cgst.id]"></span>%</td>\n' +
    '                    <td colspan="2"><span id="{{context.controller.form.fields.cgstTotal.id}}" ng-bind="context.controller.data[context.controller.form.fields.cgstTotal.id]"></span></td>\n' +
    '                </tr>\n' +
    '                <tr ng-if="!context.controller.cashBill">\n' +
    '                    <td align="right"><b>{{context.controller.form.fields.sgst.name}}</b></td>\n' +
    '                    <td><span id="{{context.controller.form.fields.sgst.id}}" ng-bind="context.controller.data[context.controller.form.fields.sgst.id]"></span>%</td>\n' +
    '                    <td colspan="2"><span id="{{context.controller.form.fields.sgstTotal.id}}" ng-bind="context.controller.data[context.controller.form.fields.sgstTotal.id]"></span></td>\n' +
    '                </tr>\n' +
    '                <tr ng-if="!context.controller.cashBill">\n' +
    '                    <td align="right"><b>{{context.controller.form.fields.igst.name}}</b></td>\n' +
    '                    <td><span id="{{context.controller.form.fields.igst.id}}" ng-bind="context.controller.data[context.controller.form.fields.igst.id]"></span>%</td>\n' +
    '                    <td colspan="2"><span id="{{context.controller.form.fields.igstTotal.id}}" ng-bind="context.controller.data[context.controller.form.fields.igstTotal.id]"></span></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td colspan="4" align="right"><b>{{context.controller.form.fields.total.name}}:</b></td>\n' +
    '                    <td colspan="2"><b><span id="{{context.controller.form.fields.total.id}}" ng-bind="context.controller.data[context.controller.form.fields.total.id]"></span></b></td>\n' +
    '                </tr>\n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '        <div class="form-group row" ng-if="!context.controller.page.printView">\n' +
    '            <div class="col-2">\n' +
    '            </div>\n' +
    '            <div class="col-10">\n' +
    '                <button type="button" class="btn btn-primary" id="submit" ng-click="context.commonFact.submit()" ng-disabled="entryInvoice.$invalid">Submit</button>\n' +
    '                <button type="button" class="btn btn-primary" id="cancel" ng-click="context.commonFact.cancel()">Cancel</button>\n' +
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
    '    <h3>{{context.controller.filterView.title}}\n' +
    '        <div ng-if="context.controller.page.downloadTableData" class="pull-right">\n' +
    '            <a href="javascript: void(0);" ng-click="context.controller.page.downloadTableData === true && context.commonFact.downloadTableData() || context.commonFact.callActions(context.controller.page.downloadTableData)" title="Download Table Data" class="fa fa-fw fa-download"></a>\n' +
    '        </div>\n' +
    '        <div ng-if="context.controller.page.downloadExcel" class="pull-right">\n' +
    '            <a href="javascript: void(0);" ng-click="context.commonFact.downloadExcel(\'listView\')" title="Download Excel" class="fa fa-fw fa-file-excel-o"></a>\n' +
    '        </div>\n' +
    '    </h3>\n' +
    '    <table class="table table-bordered">\n' +
    '        <thead>\n' +
    '            <tr>\n' +
    '                <th ng-repeat="(key, list) in context.controller.filterView.fields">\n' +
    '                    {{list.title}}:<select ng-if="list.type===\'select\'" id="{{list.id}}" class="form-control font-weight-bold" ng-model="context.controller.filterView.data[list.id]" ng-change="context.commonFact.callActions(list.action, [list]) || context.commonFact[\'list\']()"\n' +
    '                        ng-options="option.optionId as option.optionName for option in list.options">\n' +
    '                        <option value="">--Select--</option>\n' +
    '                    </select> <input ng-if="list.type===\'input\'" type="{{list.inputType}}" class="form-control font-weight-bold" ng-model="context.controller.filterView.data[list.id]" ng-change="context.commonFact.callActions(list.action, [list]) || context.commonFact[\'list\']()"\n' +
    '                    />\n' +
    '                </th>\n' +
    '            </tr>\n' +
    '        </thead>\n' +
    '    </table>\n' +
    '    <table class="table table-bordered" id="listView" style="display: none;">\n' +
    '        <thead>\n' +
    '            <tr>\n' +
    '                <th ng-repeat="(key, list) in context.controller.listView">\n' +
    '                    <div>{{list.title}}</div>\n' +
    '                </th>\n' +
    '            </tr>\n' +
    '        </thead>\n' +
    '        <tbody>\n' +
    '            <tr ng-repeat="dataList in context.controller.listViewData">\n' +
    '                <td ng-repeat="(key, list) in context.controller.listView">\n' +
    '                    <div ng-if="!list.actions" ng-bind="context.commonFact.replaceFieldVal(dataList[list.id], list)"></div>\n' +
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
    '        <div><a class="navbar-brand" href="#/">{{context.erpAppConfig.appName}}</a></div>\n' +
    '        <div ng-if="context.authFact.isLogged() && context.erpLoaded" class="collapse navbar-collapse" id="navbarSupportedContent">\n' +
    '            <ul class="navbar-nav mr-auto">\n' +
    '                <li ng-if="context.commonFact.isShowMenu(module)" class="nav-item dropdown" ng-repeat="(key, module) in context.erpAppConfig.modules.controllers">\n' +
    '                    <a ng-if="module.page" class="nav-link" href="#!{{module.page.link}}">\n' +
    '                        <i class="fa fa-fw fa-{{module.icon}}"></i>\n' +
    '                        <span class="nav-link-text">{{module.title}}</span>\n' +
    '                    </a>\n' +
    '                    <a ng-if="!module.page" class="nav-link dropdown-toggle" href="javascript: void(0);" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n' +
    '                        <i class="fa fa-fw fa-{{module.icon}}"></i>\n' +
    '                        <span class="nav-link-text">{{module.title}}</span>\n' +
    '                    </a>\n' +
    '                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">\n' +
    '                        <div ng-repeat="(subKey, subModule) in context.commonFact.showSubModule(module)">\n' +
    '                            <a ng-if="context.commonFact.isShowMenu(subModule)" class="dropdown-item" href="#!{{subModule.page.link}}">{{subModule.title}}</a>\n' +
    '                            <div ng-if="context.commonFact.isShowMenu(subModule)" class="dropdown-divider"></div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '            <ul ng-if="context.erpAppConfig.modules.controllers && context.commonFact.isAppCustomer()" class="navbar-nav">\n' +
    '                <li class="nav-item dropdown">\n' +
    '                </li>\n' +
    '                <li ng-if="!context.erpAppConfig.modules.controllers[\'calendarYear\'].disable" class="nav-item">\n' +
    '                    <select class="form-control" id="calendarYear" ng-change="context.commonFact.changeCalendarYear()" ng-model="context.erpAppConfig.calendarYear" ng-options="option.optionId as option.optionName for option in context.calendarYearList">\n' +
    '                        <option value="">--Select--</option>\n' +
    '                    </select>\n' +
    '                </li>\n' +
    '                <li ng-if="!context.erpAppConfig.modules.controllers[\'databaseUpload\'].disable" class="nav-item">\n' +
    '                    <a class="nav-link" title="Import data" href="#!{{context.erpAppConfig.modules.controllers[\'databaseUpload\'].page.link}}">\n' +
    '                        <i class="fa fa-fw fa-upload"></i>\n' +
    '                    </a>\n' +
    '                </li>\n' +
    '                <li ng-if="!context.erpAppConfig.modules.controllers[\'databaseDownload\'].disable" class="nav-item">\n' +
    '                    <a class="nav-link" title="Download data" href="#" ng-click="context.commonFact.downloadData()">\n' +
    '                        <i class="fa fa-fw fa-download"></i>\n' +
    '                    </a>\n' +
    '\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '            <ul ng-if="context.erpAppConfig.modules.controllers" class="navbar-nav">\n' +
    '                <li class="nav-item">\n' +
    '                    <a title="Logout" class="nav-link" href="#!{{context.erpAppConfig.modules.controllers[\'login\'].page.link}}?type=logout">\n' +
    '                        <i class="fa fa-fw fa-sign-out"></i>\n' +
    '                    </a>\n' +
    '                    <a ng-if="!context.authFact.isLogged()" title="Login" class="nav-link" href="#!{{context.erpAppConfig.modules.controllers[\'login\'].page.link}}">\n' +
    '                        <i class="fa fa-fw fa-sign-in"></i>\n' +
    '                    </a>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '        </div>\n' +
    '    </nav>\n' +
    '\n' +
    '    <div>\n' +
    '        <div class="modal fade" id="downloadModal" role="dialog">\n' +
    '            <div class="modal-dialog modal-lg">\n' +
    '                <div class="modal-content">\n' +
    '                    <div class="modal-header">\n' +
    '                        <h4>Download Database</h4>\n' +
    '                        <button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
    '                    </div>\n' +
    '                    <div class="modal-body modal-Scroll">\n' +
    '                        <a href="" ng-click="context.commonFact.downloadDatabase()"> Master database</a> ||\n' +
    '                        <a href="" ng-click="context.commonFact.downloadDatabase(true)"> Current Year database</a>\n' +
    '                    </div>\n' +
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
  $templateCache.put('template/components/listView.html',
    '<div class="table-responsive">\n' +
    '    <table class="table table-bordered">\n' +
    '        <thead>\n' +
    '            <tr>\n' +
    '                <th ng-if="context.controller.page.downloadTableData"></th>\n' +
    '                <th ng-repeat="(key, list) in context.controller.listView">\n' +
    '                    <div ng-if="!list.action && list.isFilterBy===undefined">{{list.title}}</div>\n' +
    '                    <div ng-if="list.isFilterBy">\n' +
    '                        <select ng-if="list.type===\'select\'" id="{{list.id}}" class="form-control font-weight-bold" ng-model="list.selectedFilterBy" ng-change="context.commonFact.viewFilterBy(list)" ng-options="option.optionId as option.optionName for option in list.options">\n' +
    '                            <option value="">{{list.title}}</option>\n' +
    '                        </select>\n' +
    '                        <input ng-if="list.type===\'input\'" type="{{list.inputType}}" class="form-control font-weight-bold" ng-model="list.selectedFilterBy" ng-change="context.commonFact.viewFilterBy(list)" />\n' +
    '                    </div>\n' +
    '                </th>\n' +
    '                <th>\n' +
    '                    <div ng-if="context.controller.page.actions.add" class="pull-right"><a href="javascript: void(0);" ng-click="context.commonFact.add()" class="fa fa-fw fa-plus-square-o">Add</a></div>\n' +
    '                </th>\n' +
    '            </tr>\n' +
    '        </thead>\n' +
    '        <tbody>\n' +
    '            <tr ng-repeat="(dataKey, dataList) in context.controller.listViewData | orderBy:context.controller.orderByProperty: true  | filter:context.controller.filterBy:true | startFrom:context.controller.currentPage*context.controller.pageSize | limitTo:context.controller.pageSize">\n' +
    '                <td ng-if="context.controller.page.downloadTableData"><input type="checkbox" ng-model="dataList.isExported" ng-change="context.commonFact.selectListData(dataList)"></td>\n' +
    '                <td ng-repeat="(key, list) in context.controller.listView">\n' +
    '                    <div ng-if="!list.actions" ng-bind="context.commonFact.replaceFieldVal(dataList[list.id], list)"></div>\n' +
    '                </td>\n' +
    '                <td>\n' +
    '                    <div class="row">\n' +
    '                        <div ng-if="context.controller.page.actions.print" class="col">\n' +
    '                            <a href="javascript: void(0);" ng-click="context.commonFact.printView(dataList.id, true)" title="Print View" class="fa fa-fw fa-print">\n' +
    '                            </a>\n' +
    '                        </div>\n' +
    '                        <div class="col" ng-if="context.controller.page.actions.edit">\n' +
    '                            <a href="javascript: void(0);" ng-click="context.commonFact.edit(dataList.id)" title="Edit" class="fa fa-fw fa-edit"> </a>\n' +
    '                        </div>\n' +
    '                        <div class="col" ng-if="context.controller.page.actions.delete">\n' +
    '                            <a href="javascript: void(0);" title="Delete" ng-click="context.commonFact.delete(dataList.id, dataList)" class="fa fa-fw fa-times"> </a>\n' +
    '                        </div>\n' +
    '                        <div class="col" ng-if="context.controller.page.custumActions" ng-repeat="(key, actions) in context.controller.page.custumActions">\n' +
    '                            <a href="javascript: void(0);" title="{{actions.title}}" ng-click="context.commonFact.callActions(actions.method, [dataList.id, dataList])" class="fa fa-fw fa-{{actions.class}}"> </a>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr ng-if="context.controller.listViewData.length > 0 && context.controller.listViewData.length >= context.controller.pageSize">\n' +
    '                <td colspan="{{context.controller.listView.length + 2}}" align="center">\n' +
    '                    <button ng-disabled="context.controller.currentPage == 0" class="btn btn-primary" ng-click="context.controller.currentPage=context.controller.currentPage-1">\n' +
    '                        Previous\n' +
    '                    </button> {{context.controller.currentPage+1}}/{{context.commonFact.numberOfPages()}}\n' +
    '                    <button ng-disabled="context.controller.currentPage >= context.commonFact.getPageData().length/context.controller.pageSize - 1" ng-click="context.controller.currentPage=context.controller.currentPage+1" class="btn btn-primary">\n' +
    '                        Next\n' +
    '                    </button>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr ng-if="!context.controller.listViewData || context.controller.listViewData.length===0">\n' +
    '                <td colspan="{{context.controller.listView.length + 2}}">No recodes...</td>\n' +
    '\n' +
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
    '    <div class="card-header" ng-if="!context.controller.form.mapping.disableTitle"><b>{{context.controller.form.mapping.name}}</b></div>\n' +
    '    <div class="card-body">\n' +
    '        <table class="table table-bordered">\n' +
    '            <thead>\n' +
    '                <tr>\n' +
    '                    <th ng-repeat="mappingFieldKey in context.controller.form.mapping.fields">\n' +
    '                        <div>{{mappingFieldKey.name}}</div>\n' +
    '                    </th>\n' +
    '                    <th ng-if="!context.controller.page.printView && !context.controller.page.printViewMapping && (context.controller.form.mapping.actions.delete || context.controller.form.mapping.actions.delete===undefined)">\n' +
    '                    </th>\n' +
    '                </tr>\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '                <tr ng-repeat="(key, map) in context.controller.printData.mapping" ng-if="context.controller.page.printView || context.controller.page.printViewMapping">\n' +
    '                    <td ng-repeat="field in context.controller.form.mapping.fields">\n' +
    '                        <span id="{{field.id}}-{{key}}" ng-bind="context.commonFact.replaceFieldVal(map[field.id], field)">{{map[field.id]}}</span>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '                <tr ng-repeat="(key, map) in context.controller.data.mapping" ng-if="(!context.controller.page.printView && (!context.controller.page.printViewMapping || (context.controller.page.printViewMapping && ((context.controller.data.mapping.length-1)===key))))">\n' +
    '                    <td ng-switch="field.type" ng-repeat="field in context.controller.form.mapping.fields">\n' +
    '                        <span ng-switch-when="span" id="{{field.id}}-{{key}}" ng-bind="map[field.id]"></span>\n' +
    '                        <input ng-switch-when="input" type="{{field.inputType}}" id="{{field.id}}-{{key}}" class="form-control" ng-model="map[field.id]" ng-change="context.commonFact.callActions(field.action, [map, map[field.id], field, key])" ng-required="{{field.required}}"\n' +
    '                            max="{{field.max}}" ng-disabled="field.isDisable" />\n' +
    '                        <select class="form-control" ng-switch-when="select" id="{{field.id}}-{{key}}" ng-focus="context.commonFact.callActions(field.focusAction, [map, map[field.id], field, key])" ng-change="context.commonFact.callActions(field.action, [map, map[field.id], field, key])"\n' +
    '                            ng-model="map[field.id]" ng-options="option.optionId as option.optionName for option in field.options" ng-required="{{field.required}}" ng-disabled="field.isDisable">\n' +
    '                            <option value="">--Select--</option>\n' +
    '                        </select>\n' +
    '                    </td>\n' +
    '                    <td ng-if="context.controller.form.mapping.actions.delete || context.controller.form.mapping.actions.delete===undefined">\n' +
    '                        <a class="fa fa-fw fa-times" href="javascript: void(0);" ng-click="context.commonFact.removeMapping(context.controller.data.mapping, key)"> </a>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '        <div class="row" ng-if="!context.controller.page.printView && (context.controller.form.mapping.actions.add || context.controller.form.mapping.actions.add==undefined)">\n' +
    '            <div class="col">\n' +
    '                <a class="fa fa-fw fa-plus-square-o" href="javascript: void(0);" ng-click="context.commonFact.addMapping(context.controller.data.mapping)"> </a>\n' +
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
    '    <h1 class="align-center company-name" ng-if="context.erpAppConfig.companyName">{{context.erpAppConfig.companyName}}</h1>\n' +
    '    <!-- Example DataTables Card-->\n' +
    '    <div class="mb-3">\n' +
    '        <h3 class="print-title">{{context.controller.title}}</h3>\n' +
    '        <div ng-if="context.controller.page.name==\'add\' || context.controller.page.name==\'edit\'">\n' +
    '            <div class="card">\n' +
    '                <div class="card-header hide-print">\n' +
    '                    <b ng-if="!context.controller.page.printView">Add/Edit</b>\n' +
    '                    <a ng-if="context.controller.page.printView" class="fa fa-print" href=\'javascript: void();\' onclick="window.print()"><b>Print View</b></a>\n' +
    '                    <button type="button" class="close float-right" aria-label="Close" ng-click="context.commonFact.cancel()">\n' +
    '                        <span aria-hidden="true">&times;</span>\n' +
    '                    </button>\n' +
    '                </div>\n' +
    '                <div ng-if="context.controller.page.printView" class="row">\n' +
    '                    <div class="col-8">\n' +
    '                        <img ng-if="context.erpAppConfig.companyLogoUrl" class="logo" title="{{context.erpAppConfig.companyName}}" ng-src="{{context.erpAppConfig.companyLogoUrl}}" />\n' +
    '                        <h1 ng-if="!context.erpAppConfig.companyLogoUrl" class="logo">{{context.erpAppConfig.companyName}}</h1>\n' +
    '                    </div>\n' +
    '                    <div class="col-4">\n' +
    '\n' +
    '                        <p class="font-italic"><b>{{context.erpAppConfig.companyAddress}}</b></p>\n' +
    '                        <p class="font-italic"><b>Mobile:</b> {{context.erpAppConfig.companyMobile}} <b>Email:</b> {{context.erpAppConfig.companyEmail}}</p>\n' +
    '                        <p class="font-italic" ng-if="!context.controller.cashBill"><b>GSTIN:</b> {{context.erpAppConfig.companyGstin}}</p>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="card-body">\n' +
    '                    <entry-invoice></entry-invoice>\n' +
    '                </div>\n' +
    '                <div ng-if="context.controller.page.printView" class="row">\n' +
    '                    <div class="col-8"></div>\n' +
    '                    <div class="col-4">\n' +
    '                        <p class="text-center font-italic"><b>For {{context.erpAppConfig.companyName}}</b></p>\n' +
    '                        <br/>\n' +
    '                        <p class="text-center font-italic"><b>Authorised Signatory</b></p>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div ng-if="context.controller.page.name==\'list\'">\n' +
    '            <list-view></list-view>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();
