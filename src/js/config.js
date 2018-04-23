erpApp.constant('erpAppConfig', {
    appName: 'Vasutechs-ERP',
    appBaseUrl: '/dashboard',
    appNavMenus: {
        '0-dashboard': {
            description: {
                name: 'Dashboard',
                title: 'Dashboard',
                url: '/',
                icon: 'dashboard',
                child: 'no'
            }
        },
        '1-marketing': {
            description: {
                name: 'Marketing',
                title: 'Marketing',
                url: 'collapseMarakets',
                icon: 'stack-exchange',
                order: 1,
                child: 'yes'
            },
            childs: {
                partMaster: {
                    description: {
                        name: 'Part Master',
                        url: 'master/partMaster/list',
                        order: 0
                    }
                },
                employeeMaster: {
                    description: {
                        name: 'Employee Master',
                        url: 'master/empMaster/list',
                        order: 1
                    }
                },
                customerMaster: {
                    description: {
                        name: 'Customer Master',
                        url: 'master/customerMaster/list',
                        order: 2
                    }
                },
                uomMaster: {
                    description: {
                        name: 'UOM Master',
                        url: 'master/uomMaster/list',
                        order: 3
                    }
                },
                invoice: {
                    description: {
                        name: 'Invoice',
                        url: 'master/invoice/list',
                        order: 4
                    }
                }
            }
        },
        '2-purchase': {
            description: {
                name: 'Purchase',
                title: 'Purchase',
                url: 'collapsePurchase',
                icon: 'money',
                order: 2,
                child: 'yes'
            },
            childs: {
                rawMaterialMaster: {
                    description: {
                        name: 'Raw Material Master',
                        url: 'master/partMaster/list',
                        order: 0
                    }
                },
                supplierMaster: {
                    description: {
                        name: 'Supplier Master',
                        url: 'master/empMaster/list',
                        order: 1
                    }
                },
                subcontractorMaster: {
                    description: {
                        name: 'Subcontractor Master',
                        url: 'master/customerMaster/list',
                        order: 2
                    }
                },
                poSupplier: {
                    description: {
                        name: 'PURCHASE ORDER- Supplier',
                        url: 'master/uomMaster/list',
                        order: 3
                    }
                },
                poSubcontractor: {
                    description: {
                        name: 'PURCHASE ORDER- Subcontractor',
                        url: 'master/invoice/list',
                        order: 4
                    }
                },
                poSupplierGeneral: {
                    description: {
                        name: 'PURCHASE ORDER- Supplier General',
                        url: 'master/invoice/list',
                        order: 5
                    }
                }
            }
        },
        '3-store': {
            description: {
                name: 'Store',
                title: 'Store',
                url: 'collapseStore',
                icon: 'suitcase',
                order: 3,
                child: 'yes'
            },
            childs: {
                openingRawMaterialStock: {
                    description: {
                        name: 'Opening Raw material Stock',
                        url: 'master/partMaster/list',
                        order: 0
                    }
                },
                openingPartStock: {
                    description: {
                        name: 'Opening Part Stock',
                        url: 'master/empMaster/list',
                        order: 1
                    }
                },
                subcontractorMaster: {
                    description: {
                        name: 'Sub Contractor Opening Stock',
                        url: 'master/customerMaster/list',
                        order: 2
                    }
                },
                subContractorOpeningStock: {
                    description: {
                        name: 'Sub Contractor Opening Stock',
                        url: 'master/uomMaster/list',
                        order: 3
                    }
                },
                deliveryChallan: {
                    description: {
                        name: 'Delivery Challan',
                        url: 'master/invoice/list',
                        order: 4
                    }
                },
                goodsReceiptNoteSupplier: {
                    description: {
                        name: 'Goods Receipt Note- Supplier',
                        url: 'master/invoice/list',
                        order: 5
                    }
                }
            }
        },
        '4-production': {
            description: {
                name: 'Production',
                title: 'Production',
                url: 'collapseProduction',
                icon: 'cogs',
                order: 4,
                child: 'yes'
            },
            childs: {
                operationMaster: {
                    description: {
                        name: 'Operation Master',
                        url: 'master/partMaster/list',
                        order: 0
                    }
                },
                machineMaster: {
                    description: {
                        name: 'Machine Master',
                        url: 'master/empMaster/list',
                        order: 1
                    }
                },
                bom: {
                    description: {
                        name: 'BOM',
                        url: 'master/customerMaster/list',
                        order: 2
                    }
                },
                toolMaster: {
                    description: {
                        name: 'Tool Master',
                        url: 'master/uomMaster/list',
                        order: 3
                    }
                },
                flowProcess: {
                    description: {
                        name: 'Flow Process',
                        url: 'master/invoice/list',
                        order: 4
                    }
                },
                materialIssueNote: {
                    description: {
                        name: 'Material issue note',
                        url: 'master/invoice/list',
                        order: 5
                    }
                },
                productionEntry: {
                    description: {
                        name: 'PRODUCTION Entry',
                        url: 'master/invoice/list',
                        order: 6
                    }
                },
                productionEntryPacking: {
                    description: {
                        name: 'PRODUCTION Entry for packing',
                        url: 'master/invoice/list',
                        order: 7
                    }
                }
            }
        },
        '5-quality': {
            description: {
                name: 'Quality',
                title: 'Quality',
                url: 'collapseQuality',
                icon: 'check-square',
                order: 5,
                child: 'yes'
            },
            childs: {
                rawMaterialSpecification: {
                    description: {
                        name: 'Raw material Specification',
                        url: 'master/partMaster/list',
                        order: 0
                    }
                },
                partSpecification: {
                    description: {
                        name: 'Part Specification',
                        url: 'master/empMaster/list',
                        order: 1
                    }
                },
                receivingInspectionSupplier: {
                    description: {
                        name: 'Receiving Inspection- Supplier',
                        url: 'master/customerMaster/list',
                        order: 2
                    }
                },
                receivingInspectionSubcontractor: {
                    description: {
                        name: 'Receiving Inspection- Subcontractor',
                        url: 'master/uomMaster/list',
                        order: 3
                    }
                }
            }
        }
    },
    modules: {
        dashboard: {
            pages: {
                link: 'dashboard',
                name: 'dashboard',
                templateUrl: 'template/dashboard.html',
                controller: 'dashboardCtrl'
            }
        },
        master: {
            partMaster: {
                title: 'Part Master',
                data: {
                    partNo: '',
                    partName: '',
                    rawMaterial: '',
                    inputWeight: '',
                    finishedWeight: '',
                    finishedWeight: '',
                    hsnNo: '',
                    uom: '',
                    prodRateHr: '',
                    rate: '',
                    gst: '',
                    sgst: '',
                    cgst: ''
                },
                form: {
                    name: 'partMaster',
                    id: 'partMaster',
                    fields: [{
                        name: 'Part No',
                        id: 'partNo',
                        type: 'text'
                    }, {
                        name: 'Part Name',
                        id: 'partName',
                        type: 'text'
                    }, {
                        name: 'Raw material',
                        id: 'rawMaterial',
                        type: 'select',
                        options: [
                            { id: '1', name: 'Option A' },
                            { id: '2', name: 'Option B' },
                            { id: '3', name: 'Option C' }
                        ]
                    }, {
                        name: 'Input weight',
                        id: 'inputWeight',
                        type: 'text'
                    }, {
                        name: 'Finished weight',
                        id: 'finishedWeight',
                        type: 'text'
                    }, {
                        name: 'HSN No',
                        id: 'hsnNo',
                        type: 'text'
                    }, {
                        name: 'UOM',
                        id: 'uom',
                        type: 'select',
                        options: {}
                    }, {
                        name: 'Prod Rate/ hr',
                        id: 'prodRateHr',
                        type: 'text'
                    }, {
                        name: 'Rate',
                        id: 'rate',
                        type: 'text'
                    }, {
                        name: 'GST',
                        id: 'gst',
                        type: 'text'
                    }, {
                        name: 'SGST',
                        id: 'sgst',
                        type: 'text'
                    }, {
                        name: 'CGST',
                        id: 'cgst',
                        type: 'text'
                    }, {
                        name: 'Submit',
                        id: 'submit',
                        type: 'submit',
                        action: 'submit'
                    }]
                },
                pages: {
                    list: {
                        link: 'master/partMaster/list',
                        name: 'list',
                        templateUrl: 'template/master/partMaster.html',
                        controller: 'partMasterCtrl'
                    },
                    edit: {
                        link: 'master/partMaster/edit',
                        name: 'edit',
                        templateUrl: 'template/master/partMaster.html',
                        controller: 'partMasterCtrl'
                    },
                    add: {
                        link: 'master/partMaster/add',
                        name: 'add',
                        templateUrl: 'template/master/partMaster.html',
                        controller: 'partMasterCtrl'
                    },
                    delete: {
                        link: 'master/partMaster/delete',
                        name: 'delete',
                        templateUrl: 'template/master/partMaster.html',
                        controller: 'partMasterCtrl'
                    }
                },
                services: {
                    list: {
                        url: 'api/partMaster/data',
                        method: 'GET'
                    }
                }
            },
            customerMaster: {
                title: 'Customer Master',
                data: {
                    customerCode: '',
                    customerName: '',
                    address: '',
                    contactNo: '',
                    gstin: '',
                    mapping: [{
                        partNo: '',
                        rate: '',
                        gst: ''
                    }]
                },
                mappingForm: {
                    name: 'Part Mapping',
                    fields: [{
                            name: 'Part No',
                            id: 'partNo',
                            type: 'select',
                            options: {}
                        },
                        {
                            name: 'Rate',
                            id: 'rate',
                            type: 'text'
                        },
                        {
                            name: 'GST %',
                            id: 'gst',
                            type: 'text'
                        }
                    ]
                },
                form: {
                    name: 'customerMaster',
                    id: 'customerMaster',
                    fields: [{
                        name: 'Customer Code',
                        id: 'customerCode',
                        type: 'text'
                    }, {
                        name: 'Customer Name',
                        id: 'customerName',
                        type: 'text'
                    }, {
                        name: 'Address',
                        id: 'address',
                        type: 'text'
                    }, {
                        name: 'Contact No',
                        id: 'contactNo',
                        type: 'text'
                    }, {
                        name: 'GSTIN',
                        id: 'gstin',
                        type: 'text'
                    }]
                },
                pages: {
                    list: {
                        link: 'master/customerMaster/list',
                        name: 'list',
                        templateUrl: 'template/master/customerMaster.html',
                        controller: 'customerMasterCtrl'
                    },
                    edit: {
                        link: 'master/customerMaster/edit',
                        name: 'edit',
                        templateUrl: 'template/master/customerMaster.html',
                        controller: 'customerMasterCtrl'
                    },
                    add: {
                        link: 'master/customerMaster/add',
                        name: 'add',
                        templateUrl: 'template/master/customerMaster.html',
                        controller: 'customerMasterCtrl'
                    },
                    delete: {
                        link: 'master/customerMaster/delete',
                        name: 'delete',
                        templateUrl: 'template/master/customerMaster.html',
                        controller: 'customerMasterCtrl'
                    }
                },
                services: {
                    list: {
                        url: 'api/customerMaster/data',
                        method: 'GET'
                    }
                }
            },
            empMaster: {
                title: 'Employee Master',
                data: {
                    id: '',
                    employeeCode: '',
                    employeeName: '',
                    address: '',
                    contactNo: '',
                    mailId: '',
                    qualification: '',
                    designation: '',
                    basicSalary: '',
                    hra: '',
                    ca: '',
                    ot: '',
                    totalSalary: ''
                },
                form: {
                    name: 'empMaster',
                    id: 'empMaster',
                    fields: [{
                        name: 'Employee Code',
                        id: 'employeeCode',
                        type: 'text'
                    }, {
                        name: 'Employee Name',
                        id: 'employeeName',
                        type: 'text'
                    }, {
                        name: 'Address',
                        id: 'address',
                        type: 'text'
                    }, {
                        name: 'Contact No',
                        id: 'contactNo',
                        type: 'text'
                    }, {
                        name: 'Mail Id',
                        id: 'mailId',
                        type: 'text'
                    }, {
                        name: 'Qualification',
                        id: 'qualification',
                        type: 'text'
                    }, {
                        name: 'Designation',
                        id: 'designation',
                        type: 'text'
                    }, {
                        name: 'BasicSalary',
                        id: 'basicSalary',
                        type: 'text'
                    }, {
                        name: 'HRA',
                        id: 'hra',
                        type: 'text'
                    }, {
                        name: 'CA',
                        id: 'ca',
                        type: 'text'
                    }, {
                        name: 'OT',
                        id: 'ot',
                        type: 'text'
                    }, {
                        name: 'Total',
                        id: 'total',
                        type: 'text'
                    }, {
                        name: 'Submit',
                        id: 'submit',
                        type: 'submit',
                        action: 'submit'
                    }]
                },
                pages: {
                    list: {
                        link: 'master/empMaster/list',
                        name: 'list',
                        templateUrl: 'template/master/empMaster.html',
                        controller: 'empMasterCtrl'
                    },
                    edit: {
                        link: 'master/empMaster/edit',
                        name: 'edit',
                        templateUrl: 'template/master/empMaster.html',
                        controller: 'empMasterCtrl'
                    },
                    add: {
                        link: 'master/empMaster/add',
                        name: 'add',
                        templateUrl: 'template/master/empMaster.html',
                        controller: 'empMasterCtrl'
                    },
                    delete: {
                        link: 'master/empMaster/delete',
                        name: 'delete',
                        templateUrl: 'template/master/empMaster.html',
                        controller: 'empMasterCtrl'
                    }
                },
                services: {
                    list: {
                        url: 'api/empMaster/data',
                        method: 'GET'
                    }
                }
            },
            uomMaster: {
                title: 'UOM Master',
                data: {
                    uomCode: '',
                    uomName: ''
                },
                form: {
                    name: 'uomMaster',
                    id: 'uomMaster',
                    fields: [{
                        name: 'UOM Code',
                        id: 'uomCode',
                        type: 'text'
                    }, {
                        name: 'UOM Name',
                        id: 'uomName',
                        type: 'text'
                    }, {
                        name: 'Submit',
                        id: 'submit',
                        type: 'submit',
                        action: 'submit'
                    }]
                },
                pages: {
                    list: {
                        link: 'master/uomMaster/list',
                        name: 'list',
                        templateUrl: 'template/master/uomMaster.html',
                        controller: 'uomMasterCtrl'
                    },
                    edit: {
                        link: 'master/uomMaster/edit',
                        name: 'edit',
                        templateUrl: 'template/master/uomMaster.html',
                        controller: 'uomMasterCtrl'
                    },
                    add: {
                        link: 'master/uomMaster/add',
                        name: 'add',
                        templateUrl: 'template/master/uomMaster.html',
                        controller: 'uomMasterCtrl'
                    },
                    delete: {
                        link: 'master/uomMaster/delete',
                        name: 'delete',
                        templateUrl: 'template/master/uomMaster.html',
                        controller: 'uomMasterCtrl'
                    }
                },
                services: {
                    list: {
                        url: 'api/uomMaster/data',
                        method: 'GET'
                    }
                }
            },
            invoice: {
                title: 'Invoice',
                data: {
                    id: '',
                    invoiceNo: '',
                    date: '',
                    customerCode: '',
                    partyGstin: '',
                    partyArnNo: '',
                    taxRate: '',
                    cgst: '',
                    sgst: '',
                    total: '',
                    mapping: [{
                        sNo: 1,
                        partNo: '',
                        unit: '',
                        rate: '',
                        amount: ''
                    }]
                },
                mappingForm: {
                    name: 'Part Mapping',
                    fields: [{
                            name: 'SNo',
                            id: 'sNo',
                            type: 'span'
                        }, {
                            name: 'Part No',
                            id: 'partNo',
                            type: 'select',
                            options: {}
                        },
                        {
                            name: 'Part Name',
                            id: 'partName',
                            type: 'span'
                        },
                        {
                            name: 'HSN Code',
                            id: 'hsnNo',
                            type: 'span'
                        },
                        {
                            name: 'Unit',
                            id: 'unit',
                            type: 'span'
                        },
                        {
                            name: 'Rate',
                            id: 'rate',
                            type: 'span'
                        },
                        {
                            name: 'Amount',
                            id: 'amount',
                            type: 'span'
                        }
                    ]
                },
                invoiceForm: {
                    name: 'Invoice',
                    id: 'invoice',
                    fields: {
                        'invoiceNo': {
                            name: 'Invoice No',
                            id: 'invoiceNo',
                            type: 'text'
                        },
                        'date': {
                            name: 'Date',
                            id: 'date',
                            type: 'text'
                        },
                        'customerCode': {
                            name: 'To',
                            id: 'customerCode',
                            type: 'select',
                            options: {}
                        },
                        'partyGstin': {
                            name: 'Party GSTIN',
                            id: 'partyGstin',
                            type: 'text'
                        },
                        'partyArnNo': {
                            name: 'Party ARN No',
                            id: 'partyArnNo',
                            type: 'text'
                        },
                        'taxRate': {
                            name: 'Tax Rate',
                            id: 'taxRate',
                            type: 'text'
                        },
                        'cgst': {
                            name: 'CGST',
                            id: 'cgst',
                            type: 'span'
                        },
                        'cgstTotal': {
                            name: 'CGST Total',
                            id: 'cgstTotal',
                            type: 'span'
                        },
                        'sgst': {
                            name: 'SGST',
                            id: 'sgst',
                            type: 'text'
                        },
                        'sgstTotal': {
                            name: 'SGST Total',
                            id: 'sgstTotal',
                            type: 'text'
                        },
                        'total': {
                            name: 'Total',
                            id: 'total',
                            type: 'text'
                        },
                        'submit': {
                            name: 'Submit',
                            id: 'submit',
                            type: 'submit',
                            action: 'submit'
                        }
                    }
                },
                pages: {
                    list: {
                        link: 'master/invoice/list',
                        name: 'list',
                        templateUrl: 'template/master/invoice.html',
                        controller: 'invoiceCtrl'
                    },
                    edit: {
                        link: 'master/invoice/edit',
                        name: 'edit',
                        templateUrl: 'template/master/invoice.html',
                        controller: 'invoiceCtrl'
                    },
                    add: {
                        link: 'master/invoice/add',
                        name: 'add',
                        templateUrl: 'template/master/invoice.html',
                        controller: 'invoiceCtrl'
                    },
                    delete: {
                        link: 'master/invoice/delete',
                        name: 'delete',
                        templateUrl: 'template/master/invoice.html',
                        controller: 'invoiceCtrl'
                    }
                },
                services: {
                    list: {
                        url: 'api/invoice/data',
                        method: 'GET'
                    }
                }
            }
        }
    }
});