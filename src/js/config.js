erpApp.constant('erpAppConfig', {
    appName: 'Vasutechs-ERP',
    appBaseUrl: '/dashboard',
    dataDownloadUrl: '/api/download',
    appNavMenus: [{
            description: {
                name: 'Production',
                title: 'Production',
                url: 'collapseProduction',
                icon: 'cogs',
                order: 4,
                child: 'yes'
            },
            childs: [{
                    description: {
                        name: 'Operation Master',
                        url: 'master/partMaster/list',
                        order: 0
                    }
                },
                {
                    description: {
                        name: 'Machine Master',
                        url: 'master/empMaster/list',
                        order: 1
                    }
                },
                {
                    description: {
                        name: 'BOM',
                        url: 'master/customerMaster/list',
                        order: 2
                    }
                },
                {
                    description: {
                        name: 'Tool Master',
                        url: 'master/uomMaster/list',
                        order: 3
                    }
                },
                {
                    description: {
                        name: 'Flow Process',
                        url: 'master/invoice/list',
                        order: 4
                    }
                },
                {
                    description: {
                        name: 'Material issue note',
                        url: 'master/invoice/list',
                        order: 5
                    }
                },
                {
                    description: {
                        name: 'PRODUCTION Entry',
                        url: 'master/invoice/list',
                        order: 6
                    }
                },
                {
                    description: {
                        name: 'PRODUCTION Entry for packing',
                        url: 'master/invoice/list',
                        order: 7
                    }
                }
            ]
        },
        {
            description: {
                name: 'Quality',
                title: 'Quality',
                url: 'collapseQuality',
                icon: 'check-square',
                order: 5,
                child: 'yes'
            },
            childs: [{
                    description: {
                        name: 'Raw material Specification',
                        url: 'master/partMaster/list',
                        order: 0
                    }
                },
                {
                    description: {
                        name: 'Part Specification',
                        url: 'master/empMaster/list',
                        order: 1
                    }
                },
                {
                    description: {
                        name: 'Receiving Inspection- Supplier',
                        url: 'master/customerMaster/list',
                        order: 2
                    }
                },
                {
                    description: {
                        name: 'Receiving Inspection- Subcontractor',
                        url: 'master/uomMaster/list',
                        order: 3
                    }
                }
            ]
        }
    ],
    modules: {
        dashboard: {
            name: 'Dashboard',
            title: 'Dashboard',
            icon: 'dashboard',
            page: {
                link: 'dashboard',
                name: 'dashboard',
                templateUrl: 'template/dashboard.html',
                controller: 'dashboardCtrl'
            }
        },
        marketing: {
            name: 'Marketing',
            title: 'Marketing',
            icon: 'stack-exchange',
            partMaster: {
                title: 'Part Master',
                masterData: {
                    partNo: null,
                    partName: null,
                    rawMaterial: null,
                    inputWeight: null,
                    finishedWeight: null,
                    finishedWeight: null,
                    hsnCode: null,
                    uom: null,
                    prodRateHr: null,
                    rate: null,
                    gst: null,
                    sgst: null,
                    cgst: null
                },
                form: {
                    name: 'partMaster',
                    id: 'partMaster',
                    fields: [{
                        name: 'Part No',
                        id: 'partNo',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Part Name',
                        id: 'partName',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Raw material',
                        id: 'rawMaterial',
                        type: 'select',
                        options: {},
                        dataFrom: 'purchase.rmMaster',
                        optionFieldName: 'rmName'
                    }, {
                        name: 'Input weight',
                        id: 'inputWeight',
                        type: 'input',
                        inputType: 'number',
                        required: true
                    }, {
                        name: 'Finished weight',
                        id: 'finishedWeight',
                        type: 'input',
                        inputType: 'number',
                        required: true
                    }, {
                        name: 'HSN Code',
                        id: 'hsnCode',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'UOM',
                        id: 'uom',
                        type: 'select',
                        options: {},
                        dataFrom: 'marketing.uomMaster',
                        optionFieldName: 'uomName'
                    }, {
                        name: 'Prod Rate/ hr',
                        id: 'prodRateHr',
                        type: 'input',
                        inputType: 'number',
                        required: true
                    }, {
                        name: 'Rate',
                        id: 'rate',
                        type: 'input',
                        inputType: 'number',
                        required: true
                    }, {
                        name: 'GST',
                        id: 'gst',
                        type: 'input',
                        inputType: 'number',
                        required: true
                    }, {
                        name: 'SGST',
                        id: 'sgst',
                        type: 'input',
                        inputType: 'number',
                        required: true
                    }, {
                        name: 'CGST',
                        id: 'cgst',
                        type: 'input',
                        inputType: 'number',
                        required: true
                    }]
                },
                listView: [{
                        title: 'Part No',
                        value: 'partNo'
                    },
                    {
                        title: 'Part Name',
                        value: 'partName'
                    },
                    {
                        action: true
                    }
                ],
                page: {
                    link: 'marketing/partMaster/list',
                    name: 'list',
                    templateUrl: 'template/defaultController.html',
                    controller: 'partMasterCtrl'
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
                masterData: {
                    customerCode: null,
                    customerName: null,
                    address: null,
                    contactNo: null,
                    gstin: null,
                    mapping: [{
                        id: null,
                        partName: null,
                        rate: null,
                        gst: null
                    }]
                },
                form: {
                    name: 'customerMaster',
                    id: 'customerMaster',
                    autoGenKey: 'customerCode',
                    fields: [{
                        name: 'Customer Code',
                        id: 'customerCode',
                        type: 'span',
                        valuePrefix: 'VT-'
                    }, {
                        name: 'Customer Name',
                        id: 'customerName',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Address',
                        id: 'address',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Contact No',
                        id: 'contactNo',
                        type: 'input',
                        inputType: 'number',
                        required: true
                    }, {
                        name: 'GSTIN',
                        id: 'gstin',
                        type: 'input',
                        inputType: 'number',
                        required: true
                    }],
                    mapping: {
                        name: 'Part Mapping',
                        fields: [{
                                name: 'Part No',
                                id: 'id',
                                type: 'select',
                                options: {},
                                action: 'changeMapping',
                                dataFrom: 'marketing.partMaster',
                                optionFieldName: 'partNo'
                            },
                            {
                                name: 'Part Name',
                                id: 'partName',
                                type: 'span'
                            },
                            {
                                name: 'Rate',
                                id: 'rate',
                                type: 'span'
                            },
                            {
                                name: 'GST %',
                                id: 'gst',
                                type: 'span'
                            }
                        ]
                    }
                },
                listView: [{
                        title: 'Customer Code',
                        value: 'customerCode',
                        valuePrefix: 'VT-'
                    },
                    {
                        title: 'Customer Name',
                        value: 'customerName'
                    },
                    {
                        action: true
                    }
                ],
                page: {
                    link: 'marketing/customerMaster/list',
                    name: 'list',
                    templateUrl: 'template/defaultController.html',
                    controller: 'customerMasterCtrl'
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
                masterData: {
                    id: null,
                    employeeCode: null,
                    employeeName: null,
                    address: null,
                    contactNo: null,
                    mailId: null,
                    qualification: null,
                    designation: null,
                    basicSalary: null,
                    hra: null,
                    ca: null,
                    ot: null,
                    totalSalary: null
                },
                form: {
                    name: 'empMaster',
                    id: 'empMaster',
                    autoGenKey: 'employeeCode',
                    fields: [{
                        name: 'Employee Code',
                        id: 'employeeCode',
                        valuePrefix: 'VT-EMP-',
                        type: 'span'
                    }, {
                        name: 'Employee Name',
                        id: 'employeeName',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Address',
                        id: 'address',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Contact No',
                        id: 'contactNo',
                        type: 'input',
                        inputType: 'number',
                        required: true
                    }, {
                        name: 'Mail Id',
                        id: 'mailId',
                        type: 'input',
                        inputType: 'email',
                        required: true
                    }, {
                        name: 'Qualification',
                        id: 'qualification',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Designation',
                        id: 'designation',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'BasicSalary',
                        id: 'basicSalary',
                        type: 'input',
                        inputType: 'number',
                        required: true
                    }, {
                        name: 'HRA',
                        id: 'hra',
                        type: 'input',
                        inputType: 'number',
                        required: true
                    }, {
                        name: 'CA',
                        id: 'ca',
                        type: 'input',
                        inputType: 'number',
                        required: true
                    }, {
                        name: 'OT',
                        id: 'ot',
                        type: 'input',
                        inputType: 'number',
                        required: true
                    }, {
                        name: 'Total',
                        id: 'total',
                        type: 'input',
                        inputType: 'number',
                        required: true
                    }]
                },
                listView: [{
                        title: 'Employee Name',
                        value: 'employeeName'
                    },
                    {
                        title: 'Mail Id',
                        value: 'mailId'
                    },
                    {
                        action: true
                    }
                ],
                page: {
                    link: 'marketing/empMaster/list',
                    name: 'list',
                    templateUrl: 'template/defaultController.html',
                    controller: 'empMasterCtrl'
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
                masterData: {
                    uomCode: null,
                    uomName: null
                },
                form: {
                    name: 'uomMaster',
                    id: 'uomMaster',
                    autoGenKey: 'uomCode',
                    fields: [{
                        name: 'UOM Code',
                        id: 'uomCode',
                        type: 'span',
                        valuePrefix: 'VT-'
                    }, {
                        name: 'UOM Name',
                        id: 'uomName',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }]
                },
                listView: [{
                        title: 'UOM Code',
                        value: 'uomCode',
                        valuePrefix: 'VT-'
                    },
                    {
                        title: 'UOM Name',
                        value: 'uomName'
                    },
                    {
                        action: true
                    }
                ],
                page: {
                    link: 'marketing/uomMaster/list',
                    name: 'list',
                    templateUrl: 'template/defaultController.html',
                    controller: 'uomMasterCtrl'
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
                masterData: {
                    invoiceNo: null,
                    date: null,
                    customerCode: null,
                    partyGstin: null,
                    partyArnNo: null,
                    taxRate: null,
                    cgst: null,
                    sgst: null,
                    total: null,
                    mapping: [{
                        id: null,
                        sNo: null,
                        partNo: null,
                        partName: null,
                        unit: null,
                        rate: null,
                        amount: null
                    }]
                },
                form: {
                    name: 'Invoice',
                    id: 'invoice',
                    autoGenKey: 'invoiceNo',
                    fields: {
                        'invoiceNo': {
                            name: 'Invoice No',
                            id: 'invoiceNo',
                            type: 'input',
                            inputtype: 'input',
                            inputType: 'text',
                            required: true,
                            valuePrefix: 'H-'
                        },
                        'date': {
                            name: 'Date',
                            id: 'date',
                            type: 'input',
                            inputType: 'date',
                            required: true
                        },
                        'customerCode': {
                            name: 'To',
                            id: 'customerCode',
                            type: 'select',
                            options: {},
                            dataFrom: 'marketing.customerMaster',
                            optionFieldName: 'customerName'
                        },
                        'partyGstin': {
                            name: 'Party GSTIN',
                            id: 'partyGstin',
                            type: 'input',
                            inputType: 'number',
                            required: true
                        },
                        'partyArnNo': {
                            name: 'Party ARN No',
                            id: 'partyArnNo',
                            type: 'input',
                            inputType: 'number',
                            required: true
                        },
                        'taxRate': {
                            name: 'Tax Rate',
                            id: 'taxRate',
                            type: 'input',
                            inputType: 'number',
                            required: true
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
                            type: 'input',
                            inputType: 'number',
                            required: true
                        },
                        'sgstTotal': {
                            name: 'SGST Total',
                            id: 'sgstTotal',
                            type: 'input',
                            inputType: 'number',
                            required: true
                        },
                        'total': {
                            name: 'Total',
                            id: 'total',
                            type: 'input',
                            inputType: 'number',
                            required: true
                        },
                        'submit': {
                            name: 'Submit',
                            id: 'submit',
                            type: 'submit',
                            action: 'submit'
                        }
                    },
                    mapping: {
                        name: 'Part Mapping',
                        fields: [{
                                name: 'SNo',
                                id: 'sNo',
                                type: 'span'
                            }, {
                                name: 'Part No',
                                id: 'id',
                                type: 'select',
                                options: {},
                                action: 'changeMapping',
                                dataFrom: 'marketing.partMaster',
                                optionFieldName: 'partNo'
                            },
                            {
                                name: 'Part Name',
                                id: 'partName',
                                type: 'span'
                            },
                            {
                                name: 'HSN Code',
                                id: 'hsnCode',
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
                    }
                },
                listView: [{
                        title: 'Invoice No',
                        value: 'invoiceNo',
                        valuePrefix: 'H-'
                    },
                    {
                        title: 'Customer',
                        value: 'customerCode'
                    },
                    {
                        action: true
                    }
                ],
                page: {
                    link: 'marketing/invoice/list',
                    name: 'list',
                    templateUrl: 'template/marketing/invoice.html',
                    controller: 'invoiceCtrl'
                },
                services: {
                    list: {
                        url: 'api/invoice/data',
                        method: 'GET'
                    }
                }
            }
        },
        purchase: {
            name: 'Purchase',
            title: 'Purchase',
            icon: 'money',
            rmMaster: {
                title: 'Raw Material Master',
                masterData: {
                    rmCode: null,
                    rmName: null,
                    grade: null,
                    type: null,
                    hsnCode: null,
                    uom: null,
                    rate: null,
                    gst: null,
                    sgst: null,
                    cgst: null
                },
                form: {
                    name: 'rmMaster',
                    id: 'rmMaster',
                    autoGenKey: 'rmCode',
                    fields: [{
                        name: 'RM Code',
                        id: 'rmCode',
                        valuePrefix: 'RM-',
                        type: 'span'
                    }, {
                        name: 'RM Name',
                        id: 'rmName',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Grade',
                        id: 'grade',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Type',
                        id: 'type',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'HSN Code',
                        id: 'hsnCode',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'UOM',
                        id: 'uom',
                        type: 'select',
                        options: {},
                        dataFrom: 'marketing.uomMaster',
                        optionFieldName: 'uomName'
                    }, {
                        name: 'Rate',
                        id: 'rate',
                        type: 'input',
                        inputType: 'number',
                        required: true
                    }, {
                        name: 'GST',
                        id: 'gst',
                        type: 'input',
                        inputType: 'number',
                        required: true
                    }, {
                        name: 'SGST',
                        id: 'sgst',
                        type: 'input',
                        inputType: 'number',
                        required: true
                    }, {
                        name: 'CGST',
                        id: 'cgst',
                        type: 'input',
                        inputType: 'number',
                        required: true
                    }]
                },
                listView: [{
                        title: 'RM Code',
                        value: 'rmCode',
                        valuePrefix: 'RM-'
                    },
                    {
                        title: 'RM Name',
                        value: 'rmName'
                    },
                    {
                        action: true
                    }
                ],
                page: {
                    link: 'purchase/rmMaster/list',
                    name: 'list',
                    templateUrl: 'template/defaultController.html',
                    controller: 'rmMasterCtrl'
                },
                services: {
                    list: {
                        url: 'api/rmMaster/data',
                        method: 'GET'
                    }
                }
            },
            supplierMaster: {
                title: 'Supplier Master',
                masterData: {
                    supplierCode: null,
                    supplierName: null,
                    address: null,
                    contactNo: null,
                    gstin: null,
                    mapping: [{
                        id: null,
                        rmCode: null,
                        rate: null,
                        gst: null
                    }]
                },
                form: {
                    name: 'supplierMaster',
                    id: 'supplierMaster',
                    autoGenKey: 'supplierCode',
                    fields: [{
                        name: 'Supplier Code',
                        id: 'supplierCode',
                        type: 'span',
                        valuePrefix: 'VT-SP-'
                    }, {
                        name: 'Supplier Name',
                        id: 'supplierName',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Address',
                        id: 'address',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Contact No',
                        id: 'contactNo',
                        type: 'input',
                        inputType: 'number',
                        required: true
                    }, {
                        name: 'GSTIN',
                        id: 'gstin',
                        type: 'input',
                        inputType: 'number',
                        required: true
                    }],
                    mapping: {
                        name: 'RM Mapping',
                        fields: [{
                                name: 'RM Name',
                                id: 'id',
                                type: 'select',
                                options: {},
                                action: 'changeMapping',
                                dataFrom: 'purchase.rmMaster',
                                optionFieldName: 'rmName'
                            },
                            {
                                name: 'Rate',
                                id: 'rate',
                                type: 'input',
                                inputType: 'text',
                                required: true
                            },
                            {
                                name: 'GST %',
                                id: 'gst',
                                type: 'input',
                                inputType: 'text',
                                required: true
                            }
                        ]
                    }
                },
                listView: [{
                        title: 'Supplier Code',
                        value: 'supplierCode',
                        valuePrefix: 'VT-SP-'
                    },
                    {
                        title: 'Supplier Name',
                        value: 'supplierName'
                    },
                    {
                        action: true
                    }
                ],
                page: {
                    link: 'purchase/supplierMaster/list',
                    name: 'list',
                    templateUrl: 'template/defaultController.html',
                    controller: 'supplierMasterCtrl'
                },
                services: {
                    list: {
                        url: 'api/supplierMaster/data',
                        method: 'GET'
                    }
                }
            },
            poSupplier: {
                title: 'Purchase Order - Supplier',
                masterData: {
                    poNo: null,
                    date: null,
                    supplierCode: null,
                    gstin: null,
                    mapping: [{
                        id: null,
                        qty: null,
                        uom: null,
                        rate: null,
                        gst: null,
                        cgst: null,
                        sgst: null,
                        total: null
                    }]
                },
                form: {
                    name: 'poSupplier',
                    id: 'poSupplier',
                    autoGenKey: 'poNo',
                    fields: [{
                        name: 'PO Code',
                        id: 'poNo',
                        type: 'span',
                        valuePrefix: 'VT-SP-PO-'
                    }, {
                        name: 'Date',
                        id: 'date',
                        type: 'input',
                        inputType: 'date',
                        required: true
                    }, {
                        name: 'Supplier Code',
                        id: 'supplierCode',
                        type: 'select',
                        options: {},
                        action: 'changeMapping',
                        updateMapping: true,
                        updateData: ['gstin', 'mapping'],
                        dataFrom: 'purchase.supplierMaster',
                        optionFieldName: 'supplierName'
                    }, {
                        name: 'Party Gstin',
                        id: 'gstin',
                        type: 'span'
                    }],
                    mapping: {
                        name: 'RM Mapping',
                        fields: [{
                                name: 'RM Name',
                                id: 'id',
                                type: 'select',
                                options: {},
                                action: 'changeMapping',
                                dataFrom: 'purchase.rmMaster',
                                optionFieldName: 'rmName'
                            },
                            {
                                name: 'Qty',
                                id: 'qty',
                                type: 'input',
                                inputType: 'text',
                                action: 'updateRmTotal',
                                required: true
                            },
                            {
                                name: 'UOM',
                                id: 'uom',
                                type: 'span'
                            },
                            {
                                name: 'Rate',
                                id: 'rate',
                                type: 'span'
                            },
                            {
                                name: 'GST%',
                                id: 'gst',
                                type: 'span'
                            },
                            {
                                name: 'CGST%',
                                id: 'cgst',
                                type: 'span'
                            },
                            {
                                name: 'SGST%',
                                id: 'sgst',
                                type: 'span'
                            },
                            {
                                name: 'total',
                                id: 'total',
                                type: 'span'
                            }
                        ]
                    }
                },
                listView: [{
                        title: 'PO NO',
                        value: 'poNo',
                        valuePrefix: 'VT-SP-PO-'
                    },
                    {
                        title: 'Supplier Code',
                        value: 'supplierCode',
                        valuePrefix: 'VT-SP-'
                    },
                    {
                        action: true,
                        printView: true,
                        edit: false
                    }
                ],
                page: {
                    link: 'purchase/poSupplier/list',
                    name: 'list',
                    templateUrl: 'template/defaultController.html',
                    controller: 'poSupplierCtrl'
                },
                services: {
                    list: {
                        url: 'api/poSupplier/data',
                        method: 'GET'
                    }
                }
            },
            subContractorMaster: {
                title: 'Sub Contractor Master',
                masterData: {
                    subContractorCode: null,
                    subContractorName: null,
                    address: null,
                    contactNo: null,
                    gstin: null,
                    mapping: [{
                        id: null,
                        opCode: null,
                        rate: null,
                        gst: null
                    }]
                },
                form: {
                    name: 'subContractorMaster',
                    id: 'subContractorMaster',
                    autoGenKey: 'subContractorCode',
                    fields: [{
                        name: 'Sub Contractor Code',
                        id: 'subContractorCode',
                        type: 'span',
                        valuePrefix: 'VT-SC-'
                    }, {
                        name: 'Sub Contractor Name',
                        id: 'subContractorName',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Address',
                        id: 'address',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Contact No',
                        id: 'contactNo',
                        type: 'input',
                        inputType: 'number',
                        required: true
                    }, {
                        name: 'GSTIN',
                        id: 'gstin',
                        type: 'input',
                        inputType: 'number',
                        required: true
                    }],
                    mapping: {
                        name: 'Part Mapping',
                        fields: [{
                                name: 'Part Name',
                                id: 'id',
                                type: 'select',
                                options: {},
                                action: 'changeMapping',
                                dataFrom: 'marketing.partMaster',
                                optionFieldName: 'partNo'
                            }, {
                                name: 'Op Name',
                                id: 'opCode',
                                type: 'select',
                                options: {},
                                dataFrom: 'production.operationMaster',
                                optionFieldName: 'opName'
                            },
                            {
                                name: 'Rate',
                                id: 'rate',
                                type: 'span'
                            },
                            {
                                name: 'GST %',
                                id: 'gst',
                                type: 'span'
                            }
                        ]
                    }
                },
                listView: [{
                        title: 'Sub Contractor Code',
                        value: 'subContractorCode',
                        valuePrefix: 'VT-SC-'
                    },
                    {
                        title: 'Sub Contractor Name',
                        value: 'subContractorName'
                    },
                    {
                        action: true
                    }
                ],
                page: {
                    link: 'purchase/subContractorMaster/list',
                    name: 'list',
                    templateUrl: 'template/defaultController.html',
                    controller: 'subContractorMasterCtrl'
                },
                services: {
                    list: {
                        url: 'api/subContractorMaster/data',
                        method: 'GET'
                    }
                }
            },
            poSubContractor: {
                title: 'Purchase Order - Sub Contractor',
                masterData: {
                    poNo: null,
                    date: null,
                    subContractorCode: null,
                    gstin: null,
                    mapping: [{
                        id: null,
                        opCode: null,
                        qty: null,
                        uom: null,
                        rate: null,
                        gst: null,
                        cgst: null,
                        sgst: null,
                        total: null
                    }]
                },
                form: {
                    name: 'poSubContractor',
                    id: 'poSubContractor',
                    autoGenKey: 'poNo',
                    fields: [{
                        name: 'PO Code',
                        id: 'poNo',
                        type: 'span',
                        valuePrefix: 'VT-SC-PO-'
                    }, {
                        name: 'Date',
                        id: 'date',
                        type: 'input',
                        inputType: 'date',
                        required: true
                    }, {
                        name: 'Sub Contractor Code',
                        id: 'subContractorCode',
                        type: 'select',
                        options: {},
                        action: 'changeMapping',
                        updateMapping: true,
                        updateData: ['gstin', 'mapping'],
                        dataFrom: 'purchase.subContractorMaster',
                        optionFieldName: 'subContractorName'
                    }, {
                        name: 'Party Gstin',
                        id: 'gstin',
                        type: 'span'
                    }],
                    mapping: {
                        name: 'Part Mapping',
                        fields: [{
                                name: 'Part No',
                                id: 'id',
                                type: 'select',
                                options: {},
                                action: 'changeMapping',
                                dataFrom: 'marketing.partMaster',
                                optionFieldName: 'partNo'
                            }, {
                                name: 'Op Name',
                                id: 'opCode',
                                type: 'select',
                                options: {},
                                dataFrom: 'production.operationMaster',
                                optionFieldName: 'opName'
                            },
                            {
                                name: 'Qty',
                                id: 'qty',
                                type: 'input',
                                inputType: 'text',
                                action: 'updatePartTotal',
                                required: true
                            },
                            {
                                name: 'UOM',
                                id: 'uom',
                                type: 'span'
                            },
                            {
                                name: 'Rate',
                                id: 'rate',
                                type: 'span'
                            },
                            {
                                name: 'GST%',
                                id: 'gst',
                                type: 'span'
                            },
                            {
                                name: 'CGST%',
                                id: 'cgst',
                                type: 'span'
                            },
                            {
                                name: 'SGST%',
                                id: 'sgst',
                                type: 'span'
                            },
                            {
                                name: 'total',
                                id: 'total',
                                type: 'span'
                            }
                        ]
                    }
                },
                listView: [{
                        title: 'PO NO',
                        value: 'poNo',
                        valuePrefix: 'VT-SC-PO-'
                    },
                    {
                        title: 'SubContractor Code',
                        value: 'subContractorCode',
                        valuePrefix: 'VT-SC-'
                    },
                    {
                        action: true,
                        printView: true,
                        edit: false
                    }
                ],
                page: {
                    link: 'purchase/poSubContractor/list',
                    name: 'list',
                    templateUrl: 'template/defaultController.html',
                    controller: 'poSubContractorCtrl'
                },
                services: {
                    list: {
                        url: 'api/poSubContractor/data',
                        method: 'GET'
                    }
                }
            }
        },
        store: {
            name: 'Store',
            title: 'Store',
            icon: 'suitcase',
            grnSupplier: {
                title: 'Good Receipt Note - Supplier',
                masterData: {
                    grnNo: null,
                    date: null,
                    supplierCode: null,
                    poNo: null,
                    supplierDCCode: null,
                    supplierDCDate: null,
                    mapping: [{
                        id: null,
                        qty: null,
                        uom: null,
                        receivedQty: null,
                        acceptedQty: null,
                        rate: null,
                        gst: null,
                        cost: null,
                        total: null
                    }]
                },
                form: {
                    name: 'grnSupplier',
                    id: 'grnSupplier',
                    autoGenKey: 'grnNo',
                    fields: [{
                            name: 'GRN No',
                            id: 'grnNo',
                            type: 'span',
                            valuePrefix: 'VT-GRN-'
                        }, {
                            name: 'Date',
                            id: 'date',
                            type: 'input',
                            inputType: 'date',
                            required: true
                        }, {
                            name: 'Supplier Code',
                            id: 'supplierCode',
                            type: 'select',
                            options: {},
                            action: 'getPOSupplier',
                            dataFrom: 'purchase.supplierMaster',
                            optionFieldName: 'supplierName'
                        },
                        {
                            name: 'PO No',
                            id: 'poNo',
                            type: 'select',
                            options: {},
                            action: 'changeMapping',
                            updateMapping: true,
                            updateData: ['mapping'],
                            dataFrom: 'purchase.poSupplier',
                            optionFieldName: 'poNo'
                        },
                        {
                            name: 'Supplier DC Code',
                            id: 'supplierDCCode',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        }, {
                            name: 'Supplier DC Date',
                            id: 'supplierDCDate',
                            type: 'input',
                            inputType: 'date',
                            required: true
                        }
                    ],
                    mapping: {
                        name: 'Detail Mapping',
                        fields: [{
                                name: 'RM Name',
                                id: 'id',
                                type: 'select',
                                options: {},
                                action: 'changeMapping',
                                dataFrom: 'purchase.rmMaster',
                                optionFieldName: 'rmName'
                            },
                            {
                                name: 'PO Qty',
                                id: 'qty',
                                type: 'span'
                            },
                            {
                                name: 'UOM',
                                id: 'uom',
                                type: 'span'
                            },
                            {
                                name: 'Received Qty',
                                id: 'receivedQty',
                                type: 'input',
                                inputType: 'text',
                                required: true
                            },
                            {
                                name: 'Accepted Qty',
                                id: 'acceptedQty',
                                type: 'input',
                                inputType: 'text',
                                required: true
                            },
                            {
                                name: 'Rate',
                                id: 'rate',
                                type: 'span'
                            },
                            {
                                name: 'GST%',
                                id: 'gst',
                                type: 'span'
                            },
                            {
                                name: 'total',
                                id: 'total',
                                type: 'span'
                            }
                        ]
                    }
                },
                listView: [{
                        title: 'GRN NO',
                        value: 'grnNo',
                        valuePrefix: 'VT-GRN-'
                    },
                    {
                        title: 'Supplier DC Code',
                        value: 'supplierDCCode'
                    },
                    {
                        action: true,
                        printView: true,
                        edit: false
                    }
                ],
                page: {
                    link: 'store/grnSupplier/list',
                    name: 'list',
                    templateUrl: 'template/defaultController.html',
                    controller: 'grnSupplierCtrl'
                },
                services: {
                    list: {
                        url: 'api/grnSupplier/data',
                        method: 'GET'
                    }
                }
            },
            dcSubContractor: {
                title: 'Delivery Chellan - Sub Contractor',
                masterData: {
                    dcNo: null,
                    date: null,
                    subContractorCode: null,
                    poNo: null,
                    mapping: [{
                        id: null,
                        partFrom: null,
                        forPurpose: null,
                        qty: null,
                        uom: null,
                        appCost: null
                    }]
                },
                form: {
                    name: 'dcSubContractor',
                    id: 'dcSubContractor',
                    autoGenKey: 'dcNo',
                    fields: [{
                        name: 'DC No',
                        id: 'dcNo',
                        type: 'span'
                    }, {
                        name: 'Date',
                        id: 'date',
                        type: 'input',
                        inputType: 'date',
                        required: true
                    }, {
                        name: 'Sub Contractor Code',
                        id: 'subContractorCode',
                        type: 'select',
                        options: {},
                        dataFrom: 'purchase.SubContractor',
                        optionFieldName: 'subContractorName'
                    }],
                    mapping: {
                        name: 'Detail Mapping',
                        fields: [{
                                name: 'PO No',
                                id: 'id',
                                type: 'select',
                                options: {},
                                action: 'changeMapping',
                        dataFrom: 'purchase.poSupplier',
                        optionFieldName: 'poNo'
                            },
                            {
                                name: 'Part No',
                                id: 'partNo',
                                type: 'span'
                            },
                            {
                                name: 'Part From',
                                id: 'partFrom',
                                type: 'span'
                            },
                            {
                                name: 'For the purpose',
                                id: 'poQty',
                                type: 'span'
                            },
                            {
                                name: 'Qty',
                                id: 'qty',
                                type: 'span'
                            },
                            {
                                name: 'UOM',
                                id: 'uom',
                                type: 'span'
                            },
                            {
                                name: 'App Cost',
                                id: 'appCost',
                                type: 'span'
                            }
                        ]
                    }
                },
                listView: [{
                        title: 'DC NO',
                        value: 'dcNo'
                    },
                    {
                        title: 'Sub Contractor Code',
                        value: 'subContractorCode'
                    },
                    {
                        action: true
                    }
                ],
                page: {
                    link: 'store/dcSubContractor/list',
                    name: 'list',
                    templateUrl: 'template/defaultController.html',
                    controller: 'dcSubContractorCtrl'
                },
                services: {
                    list: {
                        url: 'api/dcSubContractor/data',
                        method: 'GET'
                    }
                }
            },
            grnSubContractor: {
                title: 'Good Receipt Note - Sub Contractor',
                masterData: {
                    grnNo: null,
                    date: null,
                    subContractorCode: null,
                    poNo: null,
                    subContractorDCNo: null,
                    subContractorDCDate: null,
                    mapping: [{
                        id: null,
                        partNo: null,
                        partFrom: null,
                        ourDCNo: null,
                        dcQty: null,
                        uom: null,
                        receivedQty: null,
                        acceptedQty: null,
                        rate: null,
                        gst: null,
                        cost: null,
                        total: null
                    }]
                },
                form: {
                    name: 'grnSubContractor',
                    id: 'grnSubContractor',
                    autoGenKey: 'grnNo',
                    fields: [{
                        name: 'GRN No',
                        id: 'grnNo',
                        type: 'span'
                    }, {
                        name: 'Date',
                        id: 'date',
                        type: 'input',
                        inputType: 'date',
                        required: true
                    }, {
                        name: 'Sub Contractor Code',
                        id: 'subContractorCode',
                        type: 'select',
                        options: {},
                        dataFrom: 'purchase.SubContractor',
                        optionFieldName: 'subContractorName'
                    }, {
                        name: 'Sub Contractor DC Code',
                        id: 'subContractorDCCode',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Sub Contractor DC Date',
                        id: 'subContractorDCDate',
                        type: 'input',
                        inputType: 'date',
                        required: true
                    }],
                    mapping: {
                        name: 'Detail Mapping',
                        fields: [{
                                name: 'PO No',
                                id: 'id',
                                type: 'select',
                                options: {},
                                action: 'changeMapping',
                        dataFrom: 'purchase.poSupplier',
                        optionFieldName: 'poNo'
                            },
                            {
                                name: 'Part No',
                                id: 'partNo',
                                type: 'span'
                            },
                            {
                                name: 'Part Name',
                                id: 'partName',
                                type: 'span'
                            },
                            {
                                name: 'Part From',
                                id: 'partFrom',
                                type: 'span'
                            },
                            {
                                name: 'Our DC No',
                                id: 'ourDCNo',
                                type: 'span'
                            },
                            {
                                name: 'DC Qty',
                                id: 'dcQty',
                                type: 'span'
                            },
                            {
                                name: 'UOM',
                                id: 'uom',
                                type: 'span'
                            },
                            {
                                name: 'Received Qty',
                                id: 'receivedQty',
                                type: 'span'
                            },
                            {
                                name: 'Accepted Qty',
                                id: 'acceptedQty',
                                type: 'span'
                            },
                            {
                                name: 'Rate',
                                id: 'rate',
                                type: 'span'
                            },
                            {
                                name: 'GST%',
                                id: 'gst',
                                type: 'span'
                            },
                            {
                                name: 'Cost',
                                id: 'cost',
                                type: 'span'
                            },
                            {
                                name: 'total',
                                id: 'total',
                                type: 'span'
                            }
                        ]
                    }
                },
                listView: [{
                        title: 'GRN NO',
                        value: 'grnNo'
                    },
                    {
                        title: 'Sub Contractor Code',
                        value: 'subContractorCode'
                    },
                    {
                        action: true
                    }
                ],
                page: {
                    link: 'store/grnSubContractor/list',
                    name: 'list',
                    templateUrl: 'template/defaultController.html',
                    controller: 'grnSubContractorCtrl'
                },
                services: {
                    list: {
                        url: 'api/grnSubContractor/data',
                        method: 'GET'
                    }
                }
            },
            openingRMStock: {
                title: 'Opening Raw material Stock'
            },
            openingPartStock: {
                title: 'Opening Part Stock'
            }
        },
        production: {
            name: 'Production',
            title: 'Production',
            icon: 'cogs',
            operationMaster: {
                title: 'Operation Master',
                masterData: {
                    opCode: null,
                    opName: null,
                    source: null
                },
                form: {
                    name: 'operationMaster',
                    id: 'operationMaster',
                    fields: [{
                        name: 'Operation',
                        id: 'opCode',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Operation Name',
                        id: 'opName',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Source',
                        id: 'source',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }]
                },
                listView: [{
                        title: 'Operation',
                        value: 'opCode'
                    },
                    {
                        title: 'Operation Name',
                        value: 'opName'
                    },
                    {
                        action: true
                    }
                ],
                page: {
                    link: 'production/operationMaster/list',
                    name: 'list',
                    templateUrl: 'template/defaultController.html',
                    controller: 'operationMasterCtrl'
                },
                services: {
                    list: {
                        url: 'api/operationMaster/data',
                        method: 'GET'
                    }
                }
            },
            bom: {
                title: 'BOM',
                masterData: {
                    partNo: null,
                    rmCode: null,
                    partNorms: null
                },
                form: {
                    name: 'bom',
                    id: 'bom',
                    fields: [{
                        name: 'Part No',
                        id: 'partNo',
                        type: 'select',
                        options: {},
                        dataFrom: 'marketing.partMaster',
                        optionFieldName: 'partNo'
                    }, {
                        name: 'RM Code',
                        id: 'rmCode',
                        type: 'select',
                        options: {},
                        dataFrom: 'purchase.rmMaster',
                        optionFieldName: 'rmName'
                    }, {
                        name: 'Part Norms',
                        id: 'partNorms',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }]
                },
                listView: [{
                        title: 'Part No',
                        value: 'partNo'
                    },
                    {
                        title: 'RM Code',
                        value: 'rmCode',
                        valuePrefix: 'RM-'
                    },
                    {
                        action: true
                    }
                ],
                page: {
                    link: 'production/bom/list',
                    name: 'list',
                    templateUrl: 'template/defaultController.html',
                    controller: 'bomCtrl'
                },
                services: {
                    list: {
                        url: 'api/bom/data',
                        method: 'GET'
                    }
                }
            },
            machineMaster: {
                title: 'Machine Master',
                masterData: {
                    machineNo: null,
                    machineName: null,
                    make: null,
                    model: null,
                    capacity: null,
                    yoe: null,
                    value: null
                },
                form: {
                    name: 'machineMaster',
                    id: 'machineMaster',
                    autoGenKey: 'machineNo',
                    fields: [{
                        name: 'Machine No',
                        id: 'machineNo',
                        type: 'span',
                        valuePrefix: 'VT-HPP-'
                    }, {
                        name: 'Machine Name',
                        id: 'machineName',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Make',
                        id: 'make',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Model',
                        id: 'model',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Capacity',
                        id: 'capacity',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Year of experience',
                        id: 'yoe',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Value',
                        id: 'value',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }]
                },
                listView: [{
                        title: 'Machine No',
                        value: 'machineNo',
                        valuePrefix: 'VT-HPP-'
                    },
                    {
                        title: 'Machine Name',
                        value: 'machineName'
                    },
                    {
                        action: true
                    }
                ],
                page: {
                    link: 'production/machineMaster/list',
                    name: 'list',
                    templateUrl: 'template/defaultController.html',
                    controller: 'machineMasterCtrl'
                },
                services: {
                    list: {
                        url: 'api/machineMaster/data',
                        method: 'GET'
                    }
                }
            },
            flowMaster: {
                title: 'Flow Master',
                masterData: {
                    partNo: null,
                    mapping: [{
                        id: null,
                        opName: null,
                        source: null
                    }]
                },
                form: {
                    name: 'flowMaster',
                    id: 'flowMaster',
                    fields: [{
                        name: 'Part No',
                        id: 'partNo',
                        type: 'select',
                        options: {},
                        required: true,
                        dataFrom: 'marketing.partMaster',
                        optionFieldName: 'partNo'
                    }],
                    mapping: {
                        name: 'OP Mapping',
                        fields: [{
                                name: 'Part op code',
                                id: 'id',
                                type: 'select',
                                options: {},
                                action: 'changeMapping',
                                dataFrom: 'production.operationMaster',
                                optionFieldName: 'opCode'
                            },
                            {
                                name: 'op Name',
                                id: 'opName',
                                type: 'span'
                            },
                            {
                                name: 'Source',
                                id: 'source',
                                type: 'span'
                            }
                        ]
                    }
                },
                listView: [{
                        title: 'Part NO',
                        value: 'partNo'
                    },
                    {
                        action: true
                    }
                ],
                page: {
                    link: 'store/flowMaster/list',
                    name: 'list',
                    templateUrl: 'template/defaultController.html',
                    controller: 'flowMasterCtrl'
                },
                services: {
                    list: {
                        url: 'api/flowMaster/data',
                        method: 'GET'
                    }
                }
            },
            toolMaster: {
                title: 'Tool Master',
                masterData: {
                    toolNo: null,
                    partName: null,
                    make: null,
                    type: null,
                    toolLife: null,
                    yop: null,
                    value: null
                },
                form: {
                    name: 'toolMaster',
                    id: 'toolMaster',
                    autoGenKey: 'toolNo',
                    fields: [{
                        name: 'Tool No',
                        id: 'toolNo',
                        type: 'span',
                        valuePrefix: 'VT-T'
                    }, {
                        name: 'Part Name',
                        id: 'partName',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Make',
                        id: 'make',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Type',
                        id: 'type',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Tool Life',
                        id: 'toolLife',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Year of Purchase',
                        id: 'yop',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Value',
                        id: 'value',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }]
                },
                listView: [{
                        title: 'Tool No',
                        value: 'toolNo',
                        valuePrefix: 'VT-T'
                    },
                    {
                        title: 'Part Name',
                        value: 'partName'
                    },
                    {
                        action: true
                    }
                ],
                page: {
                    link: 'production/toolMaster/list',
                    name: 'list',
                    templateUrl: 'template/defaultController.html',
                    controller: 'toolMasterCtrl'
                },
                services: {
                    list: {
                        url: 'api/toolMaster/data',
                        method: 'GET'
                    }
                }
            },
            materialIssueNote: {
                title: 'Material Issue Note',
                masterData: {
                    jobCardNo: null,
                    date: null,
                    rmCode: null,
                    partNo: null,
                    norms: null,
                    issueQty: null,
                    qtyCanMake: null,
                    issueStage: null
                },
                form: {
                    name: 'materialIssueNote',
                    id: 'materialIssueNote',
                    autoGenKey: 'jobCardNo',
                    fields: [{
                        name: 'Job Card No',
                        id: 'jobCardNo',
                        type: 'span'
                    }, {
                        name: 'Job Card Date',
                        id: 'date',
                        type: 'input',
                        inputType: 'date',
                        required: true
                    }, {
                        name: 'RM Code',
                        id: 'rmCode',
                        type: 'select',
                        options: {},
                        dataFrom: 'purchase.rmMaster',
                        optionFieldName: 'rmName'
                    }, {
                        name: 'Part No',
                        id: 'partNo',
                        type: 'select',
                        options: {},
                        dataFrom: 'marketing.partMaster',
                        optionFieldName: 'partNo'
                    }, {
                        name: 'Norms',
                        id: 'norms',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Issue Qty',
                        id: 'issueQty',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Qty Can Make',
                        id: 'qtyCanMake',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Issue Stage',
                        id: 'issueStage',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }]
                },
                listView: [{
                        title: 'Job Card No',
                        value: 'jobCardNo'
                    },
                    {
                        title: 'Job Card Date',
                        value: 'date'
                    },
                    {
                        action: true
                    }
                ],
                page: {
                    link: 'production/materialIssueNote/list',
                    name: 'list',
                    templateUrl: 'template/defaultController.html',
                    controller: 'materialIssueNoteCtrl'
                },
                services: {
                    list: {
                        url: 'api/materialIssueNote/data',
                        method: 'GET'
                    }
                }
            },
            productionEntry: {
                title: 'Production Entry',
                masterData: {
                    date: null,
                    mcNo: null,
                    jobCardNo: null,
                    partNo: null,
                    operationFrom: null,
                    operationTo: null,
                    toolNo: null,
                    operator: null,
                    startTime: null,
                    endTime: null,
                    planQty: null,
                    acceptedQty: null,
                    rejectionQty: null,
                    rmQty: null
                },
                form: {
                    name: 'productionEntry',
                    id: 'productionEntry',
                    fields: [{
                        name: 'Date',
                        id: 'date',
                        type: 'input',
                        inputType: 'date',
                        required: true
                    }, {
                        name: 'M/C No',
                        id: 'mcNo',
                        type: 'select',
                        options: {},
                        required: true
                    }, {
                        name: 'Job Card No',
                        id: 'jobCardNo',
                        type: 'select',
                        options: {},
                        required: true,
                        action: 'changeMapping',
                        updateData: ['partNo']
                    }, {
                        name: 'Part No',
                        id: 'partNo',
                        type: 'select',
                        options: {},
                        required: true
                    }, {
                        name: 'Operation From',
                        id: 'operationFrom',
                        type: 'select',
                        options: {},
                        required: true
                    }, {
                        name: 'Operation To',
                        id: 'operationTo',
                        type: 'select',
                        options: {},
                        required: true
                    }, {
                        name: 'Tool No',
                        id: 'toolNo',
                        type: 'select',
                        options: {},
                        required: true
                    }, {
                        name: 'Operator',
                        id: 'Operator',
                        type: 'select',
                        options: {},
                        required: true
                    }, {
                        name: 'Start Time',
                        id: 'startTime',
                        type: 'input',
                        inputType: 'date',
                        required: true
                    }, {
                        name: 'End Time',
                        id: 'endTime',
                        type: 'input',
                        inputType: 'date',
                        required: true
                    }, {
                        name: 'Plan Qty',
                        id: 'planQty',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Accepted Qty',
                        id: 'acceptedQty',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Rejection Qty',
                        id: 'rejectionQty',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'RM Qty',
                        id: 'rmQty',
                        type: 'input',
                        inputType: 'text',
                        required: true
                    }]
                },
                listView: [{
                        title: 'Date',
                        value: 'date'
                    },
                    {
                        title: 'M/C No',
                        value: 'mcNo'
                    },
                    {
                        action: true
                    }
                ],
                page: {
                    link: 'production/productionEntry/list',
                    name: 'list',
                    templateUrl: 'template/defaultController.html',
                    controller: 'productionEntryCtrl'
                },
                services: {
                    list: {
                        url: 'api/productionEntry/data',
                        method: 'GET'
                    }
                }
            }
        },
        report: {
            name: 'Report',
            title: 'Report',
            icon: 'tasks',
            rmStock: {
                title: 'Raw Material Stock',
                masterData: {
                    opCode: null,
                    opName: null,
                    source: null
                },
                form: {},
                listView: [{
                        title: 'Raw Material Name',
                        value: 'id'
                    },
                    {
                        title: 'Rm Stock Qty',
                        value: 'rmStockQty'
                    },
                    {
                        action: false
                    }
                ],
                page: {
                    link: 'report/rmStock/list',
                    name: 'list',
                    templateUrl: 'template/defaultController.html',
                    controller: 'rmStockCtrl'
                },
                services: {
                    list: {
                        url: 'api/rmStock/data',
                        method: 'GET'
                    }
                }
            }
        }
    }
});