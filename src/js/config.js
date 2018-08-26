erpApp.constant('erpAppConfig', {
    appName: 'VASUTECHS',
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
                    rmCode: null,
                    inputWeight: null,
                    finishedWeight: null,
                    finishedWeight: null,
                    hsnCode: null,
                    uomCode: null,
                    prodRateHr: null,
                    rate: null,
                    gst: null,
                    sgst: null,
                    cgst: null
                },
                form: {
                    name: 'partMaster',
                    id: 'partMaster',
                    fields: {
                        'partNo': {
                            name: 'Part No',
                            id: 'partNo',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'partName': {
                            name: 'Part Name',
                            id: 'partName',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'rmCode': {
                            name: 'Raw material',
                            id: 'rmCode',
                            type: 'select',
                            options: {},
                            dataFrom: 'purchase.rmMaster',
                            replaceName: 'rmName'
                        },
                        'inputWeight': {
                            name: 'Input weight',
                            id: 'inputWeight',
                            type: 'input',
                            inputType: 'number',
                            required: true
                        },
                        'finishedWeight': {
                            name: 'Finished weight',
                            id: 'finishedWeight',
                            type: 'input',
                            inputType: 'number',
                            required: true
                        },
                        'hsnCode': {
                            name: 'HSN Code',
                            id: 'hsnCode',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'uomCode': {
                            name: 'UOM',
                            id: 'uomCode',
                            type: 'select',
                            options: {},
                            dataFrom: 'marketing.uomMaster',
                            replaceName: 'uomName'
                        },
                        'prodRateHr': {
                            name: 'Prod Rate/ hr',
                            id: 'prodRateHr',
                            type: 'input',
                            inputType: 'number',
                            required: true
                        },
                        'rate': {
                            name: 'Rate',
                            id: 'rate',
                            type: 'input',
                            inputType: 'number',
                            required: true
                        },
                        'gst': {
                            name: 'GST',
                            id: 'gst',
                            type: 'input',
                            inputType: 'number',
                            required: true
                        },
                        'sgst': {
                            name: 'SGST',
                            id: 'sgst',
                            type: 'input',
                            inputType: 'number',
                            required: true
                        },
                        'cgst': {
                            name: 'CGST',
                            id: 'cgst',
                            type: 'input',
                            inputType: 'number',
                            required: true
                        }
                    }
                },
                listView: [{
                        title: 'Part No',
                        id: 'partNo'
                    },
                    {
                        title: 'Part Name',
                        id: 'partName'
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
                        hsnCode: null,
                        rate: null,
                        gst: null
                    }]
                },
                form: {
                    name: 'customerMaster',
                    id: 'customerMaster',
                    autoGenKey: 'customerCode',
                    fields: {
                        'customerCode': {
                            name: 'Customer Code',
                            id: 'customerCode',
                            type: 'span',
                            idPrefix: 'VT-'
                        },
                        'customerName': {
                            name: 'Customer Name',
                            id: 'customerName',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'address': {
                            name: 'Address',
                            id: 'address',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'contactNo': {
                            name: 'Contact No',
                            id: 'contactNo',
                            type: 'input',
                            inputType: 'number',
                            required: true
                        },
                        'gstin': {
                            name: 'GSTIN',
                            id: 'gstin',
                            type: 'input',
                            inputType: 'number',
                            required: true
                        }
                    },
                    mapping: {
                        name: 'Part Mapping',
                        fields: {
                            'id': {
                                name: 'Part No',
                                id: 'id',
                                type: 'select',
                                options: {},
                                action: 'changeMapping',
                                dataFrom: 'marketing.partMaster',
                                replaceName: 'partName',
                                isList: true
                            },
                            'partName': {
                                name: 'Part Name',
                                id: 'partName',
                                type: 'span'
                            },
                            'rate': {
                                name: 'Rate',
                                id: 'rate',
                                type: 'span'
                            },
                            'gst': {
                                name: 'GST %',
                                id: 'gst',
                                type: 'span'
                            }
                        }
                    }
                },
                listView: [{
                        title: 'Customer Code',
                        id: 'customerCode',
                        idPrefix: 'VT-'
                    },
                    {
                        title: 'Customer Name',
                        id: 'customerName'
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
                    fields: {
                        'employeeCode': {
                            name: 'Employee Code',
                            id: 'employeeCode',
                            idPrefix: 'VT-EMP-',
                            type: 'span'
                        },
                        'employeeName': {
                            name: 'Employee Name',
                            id: 'employeeName',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'address': {
                            name: 'Address',
                            id: 'address',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'contactNo': {
                            name: 'Contact No',
                            id: 'contactNo',
                            type: 'input',
                            inputType: 'number',
                            required: true
                        },
                        'mailId': {
                            name: 'Mail Id',
                            id: 'mailId',
                            type: 'input',
                            inputType: 'email',
                            required: true
                        },
                        'qualification': {
                            name: 'Qualification',
                            id: 'qualification',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'designation': {
                            name: 'Designation',
                            id: 'designation',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'basicSalary': {
                            name: 'BasicSalary',
                            id: 'basicSalary',
                            type: 'input',
                            inputType: 'number',
                            required: true
                        },
                        'hra': {
                            name: 'HRA',
                            id: 'hra',
                            type: 'input',
                            inputType: 'number',
                            required: true
                        },
                        'ca': {
                            name: 'CA',
                            id: 'ca',
                            type: 'input',
                            inputType: 'number',
                            required: true
                        },
                        'ot': {
                            name: 'OT',
                            id: 'ot',
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
                        }
                    }
                },
                listView: [{
                        title: 'Employee Name',
                        id: 'employeeName'
                    },
                    {
                        title: 'Mail Id',
                        id: 'mailId'
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
                    fields: {
                        'uomCode': {
                            name: 'UOM Code',
                            id: 'uomCode',
                            type: 'span',
                            idPrefix: 'VT-'
                        },
                        'uomName': {
                            name: 'UOM Name',
                            id: 'uomName',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        }
                    }
                },
                listView: [{
                        title: 'UOM Code',
                        id: 'uomCode',
                        idPrefix: 'VT-'
                    },
                    {
                        title: 'UOM Name',
                        id: 'uomName'
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
                    gstin: null,
                    arnNo: null,
                    subTotal: null,
                    taxRate: null,
                    cgst: null,
                    sgst: null,
                    cgstTotal: null,
                    sgstTotal: null,
                    total: null,
                    mapping: [{
                        id: null,
                        hsnCode: null,
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
                            inputType: 'text',
                            required: true,
                            idPrefix: 'H-'
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
                            action: 'changeMapping',
                            updateMapping: true,
                            updateData: ['gstin', 'mapping'],
                            dataFrom: 'marketing.customerMaster',
                            replaceName: 'customerName'
                        },
                        'partyGstin': {
                            name: 'Party GSTIN',
                            id: 'gstin',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'partyArnno': {
                            name: 'Party ARN No',
                            id: 'partyArnno',
                            type: 'input',
                            inputType: 'text',
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
                        }
                    },
                    mapping: {
                        name: 'Part Mapping',
                        fields: {
                            'id': {
                                name: 'Part No',
                                id: 'id',
                                type: 'select',
                                options: {},
                                action: 'changeMapping',
                                dataFrom: 'marketing.partMaster',
                                replaceName: 'partName',
                                isList: true,
                                callBack: false
                            },
                            'hsnCode': {
                                name: 'HSN Code',
                                id: 'hsnCode',
                                type: 'span'
                            },
                            'unit': {
                                name: 'Unit',
                                id: 'unit',
                                type: 'input',
                                inputType: 'text',
                                action: 'updateTotal',
                                required: true
                            },
                            'rate': {
                                name: 'Rate',
                                id: 'rate',
                                type: 'span'
                            },
                            'amount': {
                                name: 'Amount',
                                id: 'amount',
                                type: 'span'
                            }
                        }
                    }
                },
                listView: [{
                        title: 'Invoice No',
                        id: 'invoiceNo',
                        idPrefix: 'H-'
                    },
                    {
                        title: 'Customer',
                        id: 'customerCode',
                        dataFrom: 'marketing.customerMaster',
                        replaceName: 'customerName',
                        isList: true
                    },
                    {
                        action: true,
                        printView: true,
                        edit: false
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
                        url: 'api/invoice/data/{{YEAR}}',
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
                    uomCode: null,
                    rate: null,
                    gst: null,
                    sgst: null,
                    cgst: null
                },
                form: {
                    name: 'rmMaster',
                    id: 'rmMaster',
                    autoGenKey: 'rmCode',
                    fields: {
                        'rmCode': {
                            name: 'RM Code',
                            id: 'rmCode',
                            idPrefix: 'RM-',
                            type: 'span'
                        },
                        'rmName': {
                            name: 'RM Name',
                            id: 'rmName',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'grade': {
                            name: 'Grade',
                            id: 'grade',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'type': {
                            name: 'Type',
                            id: 'type',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'hsnCode': {
                            name: 'HSN Code',
                            id: 'hsnCode',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'uomCode': {
                            name: 'UOM',
                            id: 'uomCode',
                            type: 'select',
                            options: {},
                            dataFrom: 'marketing.uomMaster',
                            replaceName: 'uomName'
                        },
                        'rate': {
                            name: 'Rate',
                            id: 'rate',
                            type: 'input',
                            inputType: 'number',
                            required: true
                        },
                        'gst': {
                            name: 'GST',
                            id: 'gst',
                            type: 'input',
                            inputType: 'number',
                            required: true
                        },
                        'sgst': {
                            name: 'SGST',
                            id: 'sgst',
                            type: 'input',
                            inputType: 'number',
                            required: true
                        },
                        'cgst': {
                            name: 'CGST',
                            id: 'cgst',
                            type: 'input',
                            inputType: 'number',
                            required: true
                        }
                    }
                },
                listView: [{
                        title: 'RM Code',
                        id: 'rmCode',
                        idPrefix: 'RM-'
                    },
                    {
                        title: 'RM Name',
                        id: 'rmName'
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
                    fields: {
                        'supplierCode': {
                            name: 'Supplier Code',
                            id: 'supplierCode',
                            type: 'span',
                            idPrefix: 'VT-SP-'
                        },
                        'supplierName': {
                            name: 'Supplier Name',
                            id: 'supplierName',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'address': {
                            name: 'Address',
                            id: 'address',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'contactNo': {
                            name: 'Contact No',
                            id: 'contactNo',
                            type: 'input',
                            inputType: 'number',
                            required: true
                        },
                        'gstin': {
                            name: 'GSTIN',
                            id: 'gstin',
                            type: 'input',
                            inputType: 'number',
                            required: true
                        }
                    },
                    mapping: {
                        name: 'RM Mapping',
                        fields: {
                            'id': {
                                name: 'RM Name',
                                id: 'id',
                                type: 'select',
                                options: {},
                                action: 'changeMapping',
                                dataFrom: 'purchase.rmMaster',
                                replaceName: 'rmName',
                                isList: true
                            },
                            'rate': {
                                name: 'Rate',
                                id: 'rate',
                                type: 'input',
                                inputType: 'text',
                                required: true
                            },
                            'gst': {
                                name: 'GST %',
                                id: 'gst',
                                type: 'input',
                                inputType: 'text',
                                required: true
                            }
                        }
                    }
                },
                listView: [{
                        title: 'Supplier Code',
                        id: 'supplierCode',
                        idPrefix: 'VT-SP-'
                    },
                    {
                        title: 'Supplier Name',
                        id: 'supplierName'
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
                    status: 0,
                    mapping: [{
                        id: null,
                        qty: null,
                        uomCode: null,
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
                    fields: {
                        'poNo': {
                            name: 'PO Code',
                            id: 'poNo',
                            type: 'span',
                            idPrefix: 'VT-SP-PO-'
                        },
                        'date': {
                            name: 'Date',
                            id: 'date',
                            type: 'input',
                            inputType: 'date',
                            required: true
                        },
                        'supplierCode': {
                            name: 'Supplier Code',
                            id: 'supplierCode',
                            type: 'select',
                            options: {},
                            action: 'changeMapping',
                            updateMapping: true,
                            updateData: ['gstin', 'mapping'],
                            dataFrom: 'purchase.supplierMaster',
                            replaceName: 'supplierName'
                        },
                        'gstin': {
                            name: 'Party Gstin',
                            id: 'gstin',
                            type: 'span'
                        }
                    },
                    mapping: {
                        name: 'RM Mapping',
                        fields: {
                            'id': {
                                name: 'RM Name',
                                id: 'id',
                                type: 'select',
                                options: {},
                                action: 'changeMapping',
                                dataFrom: 'purchase.rmMaster',
                                replaceName: 'rmName',
                                isList: true
                            },
                            'qty': {
                                name: 'Qty',
                                id: 'qty',
                                type: 'input',
                                inputType: 'text',
                                action: 'updateRmTotal',
                                required: true
                            },
                            'uomCode': {
                                name: 'UOM',
                                id: 'uomCode',
                                type: 'select',
                                options: {},
                                dataFrom: 'marketing.uomMaster',
                                replaceName: 'uomName',
                                isList: true
                            },
                            'rate': {
                                name: 'Rate',
                                id: 'rate',
                                type: 'span'
                            },
                            'gst': {
                                name: 'GST%',
                                id: 'gst',
                                type: 'span'
                            },
                            'cgst': {
                                name: 'CGST%',
                                id: 'cgst',
                                type: 'span'
                            },
                            'sgst': {
                                name: 'SGST%',
                                id: 'sgst',
                                type: 'span'
                            },
                            'total': {
                                name: 'total',
                                id: 'total',
                                type: 'span'
                            }
                        }
                    }
                },
                listView: [{
                        title: 'PO NO',
                        id: 'poNo',
                        idPrefix: 'VT-SP-PO-'
                    },
                    {
                        title: 'Supplier Code',
                        id: 'supplierCode',
                        dataFrom: 'purchase.supplierMaster',
                        replaceName: 'supplierName',
                        isList: true
                    },
                    {
                        title: 'Stutus',
                        id: 'status'
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
                        url: 'api/poSupplier/data/{{YEAR}}',
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
                        operationTo: null,
                        rate: null,
                        gst: null
                    }]
                },
                form: {
                    name: 'subContractorMaster',
                    id: 'subContractorMaster',
                    autoGenKey: 'subContractorCode',
                    fields: {
                        'subContractorCode': {
                            name: 'Sub Contractor Code',
                            id: 'subContractorCode',
                            type: 'span',
                            idPrefix: 'VT-SC-'
                        },
                        'subContractorName': {
                            name: 'Sub Contractor Name',
                            id: 'subContractorName',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'address': {
                            name: 'Address',
                            id: 'address',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'contactNo': {
                            name: 'Contact No',
                            id: 'contactNo',
                            type: 'input',
                            inputType: 'number',
                            required: true
                        },
                        'gstin': {
                            name: 'GSTIN',
                            id: 'gstin',
                            type: 'input',
                            inputType: 'number',
                            required: true
                        }
                    },
                    mapping: {
                        name: 'Part Mapping',
                        fields: {
                            'id': {
                                name: 'Part Name',
                                id: 'id',
                                type: 'select',
                                options: {},
                                action: 'changeMapping',
                                dataFrom: 'marketing.partMaster',
                                replaceName: 'partName',
                                isList: true
                            },
                            'operationTo': {
                                name: 'Op Name',
                                id: 'operationTo',
                                type: 'select',
                                options: {},
                                dataFrom: 'production.operationMaster',
                                replaceName: 'opName',
                                isList: true
                            },
                            'rate': {
                                name: 'Rate',
                                id: 'rate',
                                type: 'span'
                            },
                            'gst': {
                                name: 'GST %',
                                id: 'gst',
                                type: 'span'
                            }
                        }
                    }
                },
                listView: [{
                        title: 'Sub Contractor Code',
                        id: 'subContractorCode',
                        idPrefix: 'VT-SC-'
                    },
                    {
                        title: 'Sub Contractor Name',
                        id: 'subContractorName'
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
                    status: 0,
                    mapping: [{
                        id: null,
                        operationTo: null,
                        acceptedQty: null,
                        uomCode: null,
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
                    fields: {
                        'poNo': {
                            name: 'PO Code',
                            id: 'poNo',
                            type: 'span',
                            idPrefix: 'VT-SC-PO-'
                        },
                        'date': {
                            name: 'Date',
                            id: 'date',
                            type: 'input',
                            inputType: 'date',
                            required: true
                        },
                        'subContractorCode': {
                            name: 'Sub Contractor Code',
                            id: 'subContractorCode',
                            type: 'select',
                            options: {},
                            action: 'changeMapping',
                            updateMapping: true,
                            updateData: ['gstin', 'mapping'],
                            dataFrom: 'purchase.subContractorMaster',
                            replaceName: 'subContractorName'
                        },
                        'gstin': {
                            name: 'Party Gstin',
                            id: 'gstin',
                            type: 'span'
                        }
                    },
                    mapping: {
                        name: 'Part Mapping',
                        fields: {
                            'id': {
                                name: 'Part No',
                                id: 'id',
                                type: 'select',
                                options: {},
                                action: 'changeMapping',
                                dataFrom: 'marketing.partMaster',
                                replaceName: 'partName',
                                isList: true
                            },
                            'operationTo': {
                                name: 'Op Name',
                                id: 'operationTo',
                                type: 'select',
                                options: {},
                                dataFrom: 'production.operationMaster',
                                replaceName: 'opName',
                                isList: true
                            },
                            'acceptedQty': {
                                name: 'Qty',
                                id: 'acceptedQty',
                                type: 'input',
                                inputType: 'text',
                                action: 'updatePartTotal',
                                required: true
                            },
                            'uomCode': {
                                name: 'UOM',
                                id: 'uomCode',
                                type: 'select',
                                options: {},
                                dataFrom: 'marketing.uomMaster',
                                replaceName: 'uomName',
                                isList: true
                            },
                            'rate': {
                                name: 'Rate',
                                id: 'rate',
                                type: 'span'
                            },
                            'gst': {
                                name: 'GST%',
                                id: 'gst',
                                type: 'span'
                            },
                            'cgst': {
                                name: 'CGST%',
                                id: 'cgst',
                                type: 'span'
                            },
                            'sgst': {
                                name: 'SGST%',
                                id: 'sgst',
                                type: 'span'
                            },
                            'total': {
                                name: 'total',
                                id: 'total',
                                type: 'span'
                            }
                        }
                    }
                },
                listView: [{
                        title: 'PO NO',
                        id: 'poNo',
                        idPrefix: 'VT-SC-PO-'
                    },
                    {
                        title: 'SubContractor Code',
                        id: 'subContractorCode',
                        dataFrom: 'purchase.subContractorMaster',
                        replaceName: 'subContractorName',
                        isList: true
                    },
                    {
                        title: 'Stutus',
                        id: 'status'
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
                        url: 'api/poSubContractor/data/{{YEAR}}',
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
                    status: 0,
                    mapping: [{
                        id: null,
                        qty: null,
                        uomCode: null,
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
                    fields: {
                        'grnNo': {
                            name: 'GRN No',
                            id: 'grnNo',
                            type: 'span',
                            idPrefix: 'VT-GRN-'
                        },
                        'date': {
                            name: 'Date',
                            id: 'date',
                            type: 'input',
                            inputType: 'date',
                            required: true
                        },
                        'supplierCode': {
                            name: 'Supplier Code',
                            id: 'supplierCode',
                            type: 'select',
                            options: {},
                            action: 'getPOSupplier',
                            dataFrom: 'purchase.supplierMaster',
                            replaceName: 'supplierName'
                        },
                        'poNo': {
                            name: 'PO No',
                            id: 'poNo',
                            type: 'select',
                            options: {},
                            action: 'changeMapping',
                            updateMapping: true,
                            updateData: ['mapping'],
                            dataFrom: 'purchase.poSupplier',
                            replaceName: 'poNo',
                            replaceNamePrefix: 'VT-SP-PO-'
                        },
                        'supplierInvoiceNo': {
                            name: 'Supplier Invoice No',
                            id: 'supplierInvoiceNo',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'supplierInvoiceDate': {
                            name: 'Supplier Invoce Date',
                            id: 'supplierInvoiceDate',
                            type: 'input',
                            inputType: 'date',
                            required: true
                        }
                    },
                    mapping: {
                        name: 'Detail Mapping',
                        fields: {
                            'id': {
                                name: 'RM Name',
                                id: 'id',
                                type: 'select',
                                options: {},
                                action: 'changeMapping',
                                dataFrom: 'purchase.rmMaster',
                                replaceName: 'rmName',
                                isList: true
                            },
                            'qty': {
                                name: 'PO Qty',
                                id: 'qty',
                                type: 'span'
                            },
                            'uomCode': {
                                name: 'UOM',
                                id: 'uomCode',
                                type: 'select',
                                options: {},
                                dataFrom: 'marketing.uomMaster',
                                replaceName: 'uomName',
                                isList: true
                            },
                            'receivedQty': {
                                name: 'Received Qty',
                                id: 'receivedQty',
                                type: 'input',
                                inputType: 'text',
                                action: 'updateRmTotal',
                                required: true
                            },
                            'acceptedQty': {
                                name: 'Accepted Qty',
                                id: 'acceptedQty',
                                type: 'input',
                                inputType: 'text',
                                action: 'updateRmTotal',
                                required: true
                            },
                            'rate': {
                                name: 'Rate',
                                id: 'rate',
                                type: 'span'
                            },
                            'gst': {
                                name: 'GST%',
                                id: 'gst',
                                type: 'span'
                            },
                            'total': {
                                name: 'total',
                                id: 'total',
                                type: 'span'
                            }
                        }
                    }
                },
                listView: [{
                        title: 'GRN NO',
                        id: 'grnNo',
                        idPrefix: 'VT-GRN-'
                    },
                    {
                        title: 'Supplier',
                        id: 'supplierCode',
                        dataFrom: 'purchase.supplierMaster',
                        replaceName: 'supplierName',
                        isList: true
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
                        url: 'api/grnSupplier/data/{{YEAR}}',
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
                    status: 0,
                    mapping: [{
                        id: null,
                        operationFrom: null,
                        operationTo: null,
                        acceptedQty: null,
                        uomCode: null,
                        total: null
                    }]
                },
                form: {
                    name: 'dcSubContractor',
                    id: 'dcSubContractor',
                    autoGenKey: 'dcNo',
                    fields: {
                        'dcNo': {
                            name: 'DC No',
                            id: 'dcNo',
                            type: 'span',
                            idPrefix: 'VT-DC-'
                        },
                        'date': {
                            name: 'Date',
                            id: 'date',
                            type: 'input',
                            inputType: 'date',
                            required: true
                        },
                        'subContractorCode': {
                            name: 'Sub Contractor Code',
                            id: 'subContractorCode',
                            type: 'select',
                            options: {},
                            action: 'getPOSubContractor',
                            dataFrom: 'purchase.subContractorMaster',
                            replaceName: 'subContractorName'
                        },
                        'poNo': {
                            name: 'PO No',
                            id: 'poNo',
                            type: 'select',
                            options: {},
                            action: 'changeMapping',
                            dataFrom: 'purchase.poSubContractor',
                            replaceName: 'poNo',
                            replaceNamePrefix: 'VT-SC-PO-',
                            updateMapping: true,
                            updateData: ['mapping']
                        }
                    },
                    mapping: {
                        name: 'Detail Mapping',
                        fields: {
                            'id': {
                                name: 'Part No',
                                id: 'id',
                                type: 'select',
                                options: {},
                                dataFrom: 'marketing.partMaster',
                                replaceName: 'partName',
                                isList: true
                            },
                            'operationFrom': {
                                name: 'Part From',
                                id: 'operationFrom',
                                type: 'select',
                                options: {},
                                required: true,
                                dataFrom: 'production.operationMaster',
                                replaceName: 'opName',
                                replaceNamePrefixData: 'opCode',
                                isList: true
                            },
                            'operationTo': {
                                name: 'For the purpose',
                                id: 'operationTo',
                                type: 'select',
                                options: {},
                                required: true,
                                dataFrom: 'production.operationMaster',
                                replaceName: 'opName',
                                replaceNamePrefixData: 'opCode',
                                isList: true
                            },
                            'acceptedQty': {
                                name: 'Qty',
                                id: 'acceptedQty',
                                type: 'span'
                            },
                            'uomCode': {
                                name: 'UOM',
                                id: 'uomCode',
                                type: 'select',
                                options: {},
                                dataFrom: 'marketing.uomMaster',
                                replaceName: 'uomName',
                                isList: true
                            },
                            'total': {
                                name: 'App Cost',
                                id: 'total',
                                type: 'span'
                            }
                        }
                    }
                },
                listView: [{
                        title: 'DC NO',
                        id: 'dcNo',
                        idPrefix: 'VT-DC-'
                    },
                    {
                        title: 'Sub Contractor Code',
                        id: 'subContractorCode',
                        dataFrom: 'purchase.subContractorMaster',
                        replaceName: 'subContractorName',
                        isList: true
                    },
                    {
                        title: 'Stutus',
                        id: 'status'
                    },
                    {
                        action: true,
                        printView: true,
                        edit: false
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
                        url: 'api/dcSubContractor/data/{{YEAR}}',
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
                    dcNo: null,
                    status: 0,
                    mapping: [{
                        id: null,
                        partFrom: null,
                        qty: null,
                        uomCode: null,
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
                    fields: {
                        'grnNo': {
                            name: 'GRN No',
                            id: 'grnNo',
                            type: 'span',
                            idPrefix: 'VT-SC-GRN-'
                        },
                        'date': {
                            name: 'Date',
                            id: 'date',
                            type: 'input',
                            inputType: 'date',
                            required: true
                        },
                        'subContractorCode': {
                            name: 'Sub Contractor Code',
                            id: 'subContractorCode',
                            type: 'select',
                            options: {},
                            action: 'getPOSubContractor',
                            dataFrom: 'purchase.subContractorMaster',
                            replaceName: 'subContractorName'
                        },
                        'poNo': {
                            name: 'PO No',
                            id: 'poNo',
                            type: 'select',
                            options: {},
                            action: 'getDCSubContractor',
                            dataFrom: 'purchase.poSubContractor',
                            replaceName: 'poNo',
                            replaceNamePrefix: 'VT-SC-PO-'
                        },
                        'dcNo': {
                            name: 'Our DC No',
                            id: 'dcNo',
                            type: 'select',
                            options: {},
                            dataFrom: 'store.dcSubContractor',
                            action: 'changeMapping',
                            replaceName: 'dcNo',
                            replaceNamePrefix: 'VT-DC-',
                            updateMapping: true,
                            updateData: ['mapping']
                        },
                        'subContractorDCCode': {
                            name: 'Sub Contractor DC Code',
                            id: 'subContractorDCCode',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'subContractorDCDate': {
                            name: 'Sub Contractor DC Date',
                            id: 'subContractorDCDate',
                            type: 'input',
                            inputType: 'date',
                            required: true
                        }
                    },
                    mapping: {
                        name: 'Detail Mapping',
                        fields: {
                            'id': {
                                name: 'Part No',
                                id: 'id',
                                type: 'select',
                                options: {},
                                action: 'changeMapping',
                                dataFrom: 'marketing.partMaster',
                                replaceName: 'partName',
                                isList: true
                            },
                            'operationFrom': {
                                name: 'Part From',
                                id: 'operationFrom',
                                type: 'select',
                                options: {},
                                required: true,
                                dataFrom: 'production.operationMaster',
                                replaceName: 'opName',
                                replaceNamePrefixData: 'opCode',
                                isList: true
                            },
                            'operationTo': {
                                name: 'Op Name',
                                id: 'operationTo',
                                type: 'select',
                                options: {},
                                dataFrom: 'production.operationMaster',
                                replaceName: 'opName',
                                replaceNamePrefixData: 'opCode',
                                isList: true
                            },
                            'receivedQty': {
                                name: 'Received Qty',
                                id: 'receivedQty',
                                type: 'input',
                                inputType: 'text',
                                action: 'updatePartTotal',
                                required: true
                            },
                            'acceptedQty': {
                                name: 'Accepted Qty',
                                id: 'acceptedQty',
                                type: 'input',
                                inputType: 'text',
                                action: 'updatePartTotal',
                                required: true
                            },
                            'uomCode': {
                                name: 'UOM',
                                id: 'uomCode',
                                type: 'select',
                                options: {},
                                dataFrom: 'marketing.uomMaster',
                                replaceName: 'uomName',
                                isList: true
                            },
                            'rate': {
                                name: 'Rate',
                                id: 'rate',
                                type: 'span'
                            },
                            'gst': {
                                name: 'GST%',
                                id: 'gst',
                                type: 'span'
                            },
                            'cgst': {
                                name: 'CGST%',
                                id: 'cgst',
                                type: 'span'
                            },
                            'sgst': {
                                name: 'SGST%',
                                id: 'sgst',
                                type: 'span'
                            },
                            'total': {
                                name: 'total',
                                id: 'total',
                                type: 'span'
                            }
                        }
                    }
                },
                listView: [{
                        title: 'GRN NO',
                        id: 'grnNo',
                        idPrefix: 'VT-SC-GRN-'
                    },
                    {
                        title: 'Sub Contractor Code',
                        id: 'subContractorCode',
                        dataFrom: 'purchase.subContractorMaster',
                        replaceName: 'subContractorName',
                        isList: true
                    },
                    {
                        action: true,
                        printView: true,
                        edit: false
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
                        url: 'api/grnSubContractor/data/{{YEAR}}',
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
                    fields: {
                        'opCode': {
                            name: 'Operation',
                            id: 'opCode',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'opName': {
                            name: 'Operation Name',
                            id: 'opName',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'source': {
                            name: 'Source',
                            id: 'source',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        }
                    }
                },
                listView: [{
                        title: 'Operation',
                        id: 'opCode'
                    },
                    {
                        title: 'Operation Name',
                        id: 'opName'
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
                    fields: {
                        'partNo': {
                            name: 'Part No',
                            id: 'partNo',
                            type: 'select',
                            options: {},
                            dataFrom: 'marketing.partMaster',
                            replaceName: 'partName'
                        },
                        'rmCode': {
                            name: 'RM Code',
                            id: 'rmCode',
                            type: 'select',
                            options: {},
                            dataFrom: 'purchase.rmMaster',
                            replaceName: 'rmName'
                        },
                        'partNorms': {
                            name: 'Part Norms',
                            id: 'partNorms',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        }
                    }
                },
                listView: [{
                        title: 'Part No',
                        id: 'partNo',
                        dataFrom: 'marketing.partMaster',
                        replaceName: 'partName',
                        isList: true
                    },
                    {
                        title: 'RM Code',
                        id: 'rmCode',
                        idPrefix: 'RM-'
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
                    id: null
                },
                form: {
                    name: 'machineMaster',
                    id: 'machineMaster',
                    autoGenKey: 'machineNo',
                    fields: {
                        'machineNo': {
                            name: 'Machine No',
                            id: 'machineNo',
                            type: 'span',
                            idPrefix: 'VT-HPP-'
                        },
                        'machineName': {
                            name: 'Machine Name',
                            id: 'machineName',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'make': {
                            name: 'Make',
                            id: 'make',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'model': {
                            name: 'Model',
                            id: 'model',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'capacity': {
                            name: 'Capacity',
                            id: 'capacity',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'yoe': {
                            name: 'Year of experience',
                            id: 'yoe',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'value': {
                            name: 'Value',
                            id: 'value',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        }
                    }
                },
                listView: [{
                        title: 'Machine No',
                        id: 'machineNo',
                        idPrefix: 'VT-HPP-'
                    },
                    {
                        title: 'Machine Name',
                        id: 'machineName'
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
                    fields: {
                        'partNo': {
                            name: 'Part No',
                            id: 'partNo',
                            type: 'select',
                            options: {},
                            required: true,
                            dataFrom: 'marketing.partMaster',
                            replaceName: 'partName'
                        }
                    },
                    mapping: {
                        name: 'OP Mapping',
                        fields: {
                            'id': {
                                name: 'Part op code',
                                id: 'id',
                                type: 'select',
                                options: {},
                                action: 'changeMapping',
                                dataFrom: 'production.operationMaster',
                                replaceName: 'opName',
                                replaceNamePrefixData: 'opCode',
                                isList: true
                            },
                            'opName': {
                                name: 'op Name',
                                id: 'opName',
                                type: 'span'
                            },
                            'source': {
                                name: 'Source',
                                id: 'source',
                                type: 'span'
                            }
                        }
                    }
                },
                listView: [{
                        title: 'Part NO',
                        id: 'partNo',
                        dataFrom: 'marketing.partMaster',
                        replaceName: 'partName',
                        isList: true
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
                    partNo: null,
                    make: null,
                    type: null,
                    toolLife: null,
                    yop: null,
                    id: null
                },
                form: {
                    name: 'toolMaster',
                    id: 'toolMaster',
                    autoGenKey: 'toolNo',
                    fields: {
                        'toolNo': {
                            name: 'Tool No',
                            id: 'toolNo',
                            type: 'span',
                            idPrefix: 'VT-T'
                        },
                        'partNo': {
                            name: 'Part No',
                            id: 'partNo',
                            type: 'select',
                            options: {},
                            dataFrom: 'marketing.partMaster',
                            replaceName: 'partName',
                            required: true
                        },
                        'make': {
                            name: 'Make',
                            id: 'make',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'type': {
                            name: 'Type',
                            id: 'type',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'toolLife': {
                            name: 'Tool Life',
                            id: 'toolLife',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'yop': {
                            name: 'Year of Purchase',
                            id: 'yop',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'value': {
                            name: 'Value',
                            id: 'value',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        }
                    }
                },
                listView: [{
                        title: 'Tool No',
                        id: 'toolNo',
                        idPrefix: 'VT-T'
                    },
                    {
                        title: 'PartName',
                        id: 'partNo',
                        dataFrom: 'marketing.partMaster',
                        replaceName: 'partName',
                        isList: true
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
                    partNorms: null,
                    issueQty: null,
                    qtyCanMake: null,
                    operationFrom: null,
                    status: 0
                },
                form: {
                    name: 'materialIssueNote',
                    id: 'materialIssueNote',
                    autoGenKey: 'jobCardNo',
                    fields: {
                        'jobCardNo': {
                            name: 'Job Card No',
                            id: 'jobCardNo',
                            type: 'span',
                            idPrefix: 'VT-'
                        },
                        'date': {
                            name: 'Job Card Date',
                            id: 'date',
                            type: 'input',
                            inputType: 'date',
                            required: true
                        },
                        'rmCode': {
                            name: 'RM Code',
                            id: 'rmCode',
                            type: 'select',
                            options: {},
                            dataFrom: 'purchase.rmMaster',
                            replaceName: 'rmName',
                            action: 'getPartNo'
                        },
                        'partNo': {
                            name: 'Part No',
                            id: 'partNo',
                            type: 'select',
                            options: {},
                            dataFrom: 'marketing.partMaster',
                            replaceName: 'partName',
                            action: 'getNorms'
                        },
                        'partNorms': {
                            name: 'Part Norms',
                            id: 'partNorms',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'issueQty': {
                            name: 'Issue Qty',
                            id: 'issueQty',
                            type: 'input',
                            inputType: 'text',
                            required: true,
                            action: 'updateQtyMake'
                        },
                        'qtyCanMake': {
                            name: 'Qty Can Make',
                            id: 'qtyCanMake',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'operationFrom': {
                            name: 'Issue Stage',
                            id: 'operationFrom',
                            type: 'select',
                            options: {},
                            required: true,
                            dataFrom: 'production.operationMaster',
                            replaceName: 'opName',
                            replaceNamePrefixData: 'opCode'
                        }
                    }
                },
                listView: [{
                        title: 'Job Card No',
                        id: 'jobCardNo',
                        idPrefix: 'VT-'
                    },
                    {
                        title: 'PartName',
                        id: 'partNo',
                        dataFrom: 'marketing.partMaster',
                        replaceName: 'partName',
                        isList: true
                    },
                    {
                        title: 'Qty Can Make',
                        id: 'qtyCanMake'
                    },
                    {
                        title: 'Status',
                        id: 'status'
                    },
                    {
                        action: true,
                        printView: true,
                        edit: false
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
                        url: 'api/materialIssueNote/data/{{YEAR}}',
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
                    fields: {
                        'date': {
                            name: 'Date',
                            id: 'date',
                            type: 'input',
                            inputType: 'date',
                            required: true
                        },
                        'mcNo': {
                            name: 'M/C No',
                            id: 'mcNo',
                            type: 'select',
                            options: {},
                            dataFrom: 'production.machineMaster',
                            replaceName: 'machineNo',
                            replaceNamePrefix: 'VT-HPP-',
                            required: true
                        },
                        'jobCardNo': {
                            name: 'Job Card No',
                            id: 'jobCardNo',
                            type: 'select',
                            options: {},
                            required: true,
                            dataFrom: 'production.materialIssueNote',
                            replaceName: 'jobCardNo',
                            replaceNamePrefix: 'VT-',
                            action: 'updatePartDetails',
                            updateData: ['partNo', 'operationFrom'],
                            filter: {
                                status: 0
                            }
                        },
                        'partNo': {
                            name: 'Part No',
                            id: 'partNo',
                            type: 'select',
                            options: {},
                            required: true,
                            dataFrom: 'marketing.partMaster',
                            replaceName: 'partName',
                            isDisable: true
                        },
                        'operationFrom': {
                            name: 'Operation From',
                            id: 'operationFrom',
                            type: 'select',
                            options: {},
                            required: true,
                            dataFrom: 'production.operationMaster',
                            replaceName: 'opName',
                            replaceNamePrefixData: 'opCode'
                        },
                        'operationTo': {
                            name: 'Operation To',
                            id: 'operationTo',
                            type: 'select',
                            options: {},
                            required: true,
                            dataFrom: 'production.operationMaster',
                            replaceName: 'opName',
                            replaceNamePrefixData: 'opCode'
                        },
                        'toolNo': {
                            name: 'Tool No',
                            id: 'toolNo',
                            type: 'select',
                            options: {},
                            required: true,
                            dataFrom: 'production.toolMaster',
                            replaceName: 'toolNo',
                            replaceNamePrefix: 'VT-T-'
                        },
                        'Operator': {
                            name: 'Operator',
                            id: 'Operator',
                            type: 'select',
                            options: {},
                            required: true,
                            dataFrom: 'marketing.empMaster',
                            replaceName: 'employeeName'
                        },
                        'startTime': {
                            name: 'Start Time',
                            id: 'startTime',
                            type: 'input',
                            inputType: 'time',
                            required: true
                        },
                        'endTime': {
                            name: 'End Time',
                            id: 'endTime',
                            type: 'input',
                            inputType: 'time',
                            required: true,
                            action: 'calculatePlanQty'
                        },
                        'planQty': {
                            name: 'Plan Qty',
                            id: 'planQty',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'acceptedQty': {
                            name: 'Accepted Qty',
                            id: 'acceptedQty',
                            type: 'input',
                            inputType: 'number',
                            required: true,
                            action: 'checkAcceptedQty'
                        },
                        'rejectionQty': {
                            name: 'Rejection Qty',
                            id: 'rejectionQty',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'rwQty': {
                            name: 'R/w Qty',
                            id: 'rwQty',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        }
                    }
                },
                listView: [{
                        title: 'Job Card No',
                        id: 'jobCardNo',
                        idPrefix: 'VT-'
                    }, {
                        title: 'Part No',
                        id: 'partNo',
                        dataFrom: 'marketing.partMaster',
                        replaceName: 'partName',
                        isList: true
                    },
                    {
                        title: 'Operation From',
                        id: 'operationFrom',
                        dataFrom: 'production.operationMaster',
                        replaceName: 'opName',
                        isList: true
                    },
                    {
                        title: 'Operation To',
                        id: 'operationTo',
                        dataFrom: 'production.operationMaster',
                        replaceName: 'opName',
                        isList: true
                    },
                    {
                        title: 'Accepted Qty',
                        id: 'acceptedQty'
                    },
                    {
                        action: true,
                        printView: true,
                        edit: false
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
                        url: 'api/productionEntry/data/{{YEAR}}',
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
                        id: 'rmCode',
                        dataFrom: 'purchase.rmMaster',
                        replaceName: 'rmName',
                        isList: true
                    },
                    {
                        title: 'Rm Stock Qty',
                        id: 'rmStockQty'
                    }, {
                        title: 'UOM',
                        id: 'uomCode',
                        dataFrom: 'marketing.uomMaster',
                        replaceName: 'uomName',
                        isList: true
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
                        url: 'api/rmStock/data/{{YEAR}}',
                        method: 'GET'
                    }
                }
            },
            partStock: {
                title: 'Part Stock',
                masterData: {
                    partNo: '',
                    operationFrom: '',
                    operationTo: '',
                    partStockQty: ''
                },
                form: {},
                listView: [{
                        title: 'Part Name',
                        id: 'partNo',
                        dataFrom: 'marketing.partMaster',
                        replaceName: 'partName',
                        isList: true
                    },
                    {
                        title: 'Part Stock Qty',
                        id: 'partStockQty'
                    }, {
                        title: 'Operation From',
                        id: 'operationFrom',
                        dataFrom: 'production.operationMaster',
                        replaceName: 'opName',
                        isList: true
                    }, {
                        title: 'Operation To',
                        id: 'operationTo',
                        dataFrom: 'production.operationMaster',
                        replaceName: 'opName',
                        isList: true
                    },
                    {
                        action: false
                    }
                ],
                page: {
                    link: 'report/partStock/list',
                    name: 'list',
                    templateUrl: 'template/defaultController.html',
                    controller: 'partStockCtrl'
                },
                services: {
                    list: {
                        url: 'api/partStock/data/{{YEAR}}',
                        method: 'GET'
                    }
                }
            }
        }
    }
});