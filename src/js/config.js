erpApp.constant('erpAppConfig', {
    appName: 'Vasutechs-ERP',
    appBaseUrl: '/dashboard',
    appNavMenus: [{
            description: {
                name: 'Dashboard',
                title: 'Dashboard',
                url: '/',
                icon: 'dashboard',
                order: 0,
                child: 'no'
            }
        },
        {
            description: {
                name: 'Marketing',
                title: 'Marketing',
                url: 'collapseMarakets',
                icon: 'stack-exchange',
                order: 1,
                child: 'yes'
            },
            childs: [{
                    description: {
                        name: 'Part Master',
                        url: 'marketing/partMaster/list',
                        order: 0
                    }
                },
                {
                    description: {
                        name: 'Employee Master',
                        url: 'marketing/empMaster/list',
                        order: 1
                    }
                },
                {
                    description: {
                        name: 'Customer Master',
                        url: 'marketing/customerMaster/list',
                        order: 2
                    }
                },
                {
                    description: {
                        name: 'UOM Master',
                        url: 'marketing/uomMaster/list',
                        order: 3
                    }
                },
                {
                    description: {
                        name: 'Invoice',
                        url: 'marketing/invoice/list',
                        order: 4
                    }
                }
            ]
        },
        {
            description: {
                name: 'Purchase',
                title: 'Purchase',
                url: 'collapsePurchase',
                icon: 'money',
                order: 2,
                child: 'yes'
            },
            childs: [{
                    description: {
                        name: 'Raw Material Master',
                        url: 'purchase/rmMaster/list',
                        order: 0
                    }
                },
                {
                    description: {
                        name: 'Supplier Master',
                        url: 'purchase/supplierMaster/list',
                        order: 1
                    }
                },
                {
                    description: {
                        name: 'Subcontractor Master',
                        url: 'purchase/subContractorMaster/list',
                        order: 2
                    }
                },
                {
                    description: {
                        name: 'PURCHASE ORDER- Supplier',
                        url: 'purchase/poSupplier/list',
                        order: 3
                    }
                },
                {
                    description: {
                        name: 'PURCHASE ORDER- Subcontractor',
                        url: 'purchase/poSubContractor/list',
                        order: 4
                    }
                },
                {
                    description: {
                        name: 'PURCHASE ORDER- Supplier General',
                        url: '/',
                        order: 5
                    }
                }
            ]
        },
        {
            description: {
                name: 'Store',
                title: 'Store',
                url: 'collapseStore',
                icon: 'suitcase',
                order: 3,
                child: 'yes'
            },
            childs: [{
                    description: {
                        name: 'Opening Raw material Stock',
                        url: 'master/partMaster/list',
                        order: 0
                    }
                },
                {
                    description: {
                        name: 'Opening Part Stock',
                        url: 'master/empMaster/list',
                        order: 1
                    }
                },
                {
                    description: {
                        name: 'Sub Contractor Opening Stock',
                        url: 'master/customerMaster/list',
                        order: 2
                    }
                },
                {
                    description: {
                        name: 'Sub Contractor Opening Stock',
                        url: 'master/uomMaster/list',
                        order: 3
                    }
                },
                {
                    description: {
                        name: 'Delivery Challan',
                        url: 'master/invoice/list',
                        order: 4
                    }
                },
                {
                    description: {
                        name: 'Goods Receipt Note- Supplier',
                        url: 'master/invoice/list',
                        order: 5
                    }
                }
            ]
        },
        {
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
            page: {
                link: 'dashboard',
                name: 'dashboard',
                templateUrl: 'template/dashboard.html',
                controller: 'dashboardCtrl'
            }
        },
        marketing: {
            partMaster: {
                title: 'Part Master',
                data: {
                    partNo: '',
                    partName: '',
                    rawMaterial: '',
                    inputWeight: '',
                    finishedWeight: '',
                    finishedWeight: '',
                    hsnCode: '',
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
                        options: {}
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
                        options: {}
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
                data: {
                    customerCode: '',
                    customerName: '',
                    address: '',
                    contactNo: '',
                    gstin: '',
                    mapping: [{
                        id: '',
                        partName: '',
                        rate: '',
                        gst: ''
                    }]
                },
                form: {
                    name: 'customerMaster',
                    id: 'customerMaster',
                    autoGenKey: 'customerCode',
                    fields: [{
                        name: 'Customer Code',
                        id: 'customerCode',
                        type: 'span'
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
                                options: {}
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
                        value: 'customerCode'
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
                        type: 'input',
                        inputType: 'text',
                        required: true
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
                        value: 'uomCode'
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
                data: {
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
                        id: '',
                        sNo: '',
                        partNo: '',
                        partName: '',
                        unit: '',
                        rate: '',
                        amount: ''
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
                            options: {}
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
                                options: {}
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
            rmMaster: {
                title: 'Raw Material Master',
                data: {
                    rmCode: '',
                    rmName: '',
                    grade: '',
                    type: '',
                    hsnCode: '',
                    uom: '',
                    rate: '',
                    gst: '',
                    sgst: '',
                    cgst: ''
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
                        options: {}
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
                data: {
                    supplierCode: '',
                    supplierName: '',
                    address: '',
                    contactNo: '',
                    gstin: '',
                    mapping: [{
                        id: '',
                        rmCode: '',
                        rate: '',
                        gst: ''
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
                                name: 'RM Code',
                                id: 'id',
                                type: 'select',
                                options: {}
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
                data: {
                    poNo: '',
                    date: '',
                    supplierCode: '',
                    partyGstin: '',
                    mapping: [{
                        id: '',
                        rmName: '',
                        qty: '',
                        uom: '',
                        rate: '',
                        gst: '',
                        cgst: '',
                        sgst: '',
                        total: ''
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
                        options: {}
                    }, {
                        name: 'Party Gstin',
                        id: 'partyGstin',
                        type: 'input',
                        inputType: 'number',
                        required: true
                    }],
                    mapping: {
                        name: 'RM Mapping',
                        fields: [{
                                name: 'RM Code',
                                id: 'id',
                                type: 'select',
                                options: {}
                            },
                            {
                                name: 'RM Name',
                                id: 'rmName',
                                type: 'span'
                            },
                            {
                                name: 'Qty',
                                id: 'qty',
                                type: 'input',
                                inputType: 'text',
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
                        value: 'supplierCode'
                    },
                    {
                        action: true
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
                data: {
                    subContractorCode: '',
                    subContractorName: '',
                    address: '',
                    contactNo: '',
                    gstin: '',
                    mapping: [{
                        id: '',
                        partName: '',
                        oppCode: '',
                        rate: '',
                        gst: ''
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
                                name: 'Part No',
                                id: 'id',
                                type: 'select',
                                options: {}
                            },
                            {
                                name: 'Part Name',
                                id: 'partName',
                                type: 'span'
                            }, {
                                name: 'Opp Name',
                                id: 'oppCode',
                                type: 'select',
                                options: {}
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
                data: {
                    poNo: '',
                    date: '',
                    subContractorCode: '',
                    partyGstin: '',
                    mapping: [{
                        id: '',
                        partName: '',
                        oppCode: '',
                        qty: '',
                        uom: '',
                        rate: '',
                        gst: '',
                        cgst: '',
                        sgst: '',
                        total: ''
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
                        options: {}
                    }, {
                        name: 'Party Gstin',
                        id: 'partyGstin',
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
                                options: {}
                            },
                            {
                                name: 'Part Name',
                                id: 'partName',
                                type: 'span'
                            }, {
                                name: 'Opp Name',
                                id: 'oppCode',
                                type: 'select',
                                options: {}
                            },
                            {
                                name: 'Qty',
                                id: 'qty',
                                type: 'input',
                                inputType: 'text',
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
                        value: 'subContractorCode'
                    },
                    {
                        action: true
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
            grnSupplier: {
                title: 'Good Receipt Note - Supplier',
                data: {
                    grnNo: '',
                    date: '',
                    supplierCode: '',
                    partyGstin: '',
                    mapping: [{
                        id: '',
                        partName: '',
                        oppCode: '',
                        qty: '',
                        uom: '',
                        rate: '',
                        gst: '',
                        cgst: '',
                        sgst: '',
                        total: ''
                    }]
                },
                form: {
                    name: 'grnSupplier',
                    id: 'grnSupplier',
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
                        inputType: 'text',
                        required: true
                    }, {
                        name: 'Supplier Code',
                        id: 'supplierCode',
                        type: 'select',
                        options: {}
                    }, {
                        name: 'Party Gstin',
                        id: 'partyGstin',
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
                                options: {}
                            },
                            {
                                name: 'Part Name',
                                id: 'partName',
                                type: 'span'
                            }, {
                                name: 'Opp Name',
                                id: 'oppCode',
                                type: 'select',
                                options: {}
                            },
                            {
                                name: 'Qty',
                                id: 'qty',
                                type: 'input',
                                inputType: 'text',
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
                        value: 'subContractorCode'
                    },
                    {
                        action: true
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
        }
    }
});