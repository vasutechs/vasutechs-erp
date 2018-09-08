erpApp.constant('erpAppConfig', {
    appName: 'VASUTECHS',
    appBaseUrl: '/dashboard',
    dataDownloadUrl: '/api/download',
    appNavMenus: [],
    calendarYear: new Date().getFullYear(),
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
                            replaceName: 'rmName',
                            isSingle: true
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
                            replaceName: 'uomName',
                            isSingle: true
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
                            idPrefix: 'VT-CUS-'
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
                            inputType: 'text',
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
                                replaceName: 'partNo'
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
                        idPrefix: 'VT-CUS-'
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
                            idPrefix: 'VT-UOM-'
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
                        idPrefix: 'VT-UOM-'
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
                    subTotal: null,
                    includeTax: null,
                    taxRate: null,
                    cgst: null,
                    sgst: null,
                    cgstTotal: null,
                    sgstTotal: null,
                    totalBeforTax: null,
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
                            type: 'span',
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
                            replaceName: 'customerName',
                            isSingle: true,
                            callBack: false
                        },
                        'partyGstin': {
                            name: 'Party GSTIN',
                            id: 'gstin',
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
                                replaceName: 'partNo',
                                isDisable: true
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
                        replaceName: 'customerName'
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
            },
            cashBill: {
                name: 'cashBill',
                title: 'Cash Bill',
                form: {
                    fields: {
                        'invoiceNo': {
                            name: 'CashBill No'
                        }
                    }
                },
                listView: [{
                        title: 'Cash Bill No',
                        id: 'invoiceNo',
                        idPrefix: 'H-'
                    }
                ],
                page: {
                    link: 'marketing/invoice/list?type=cashBill',
                    name: 'list',
                    templateUrl: 'template/marketing/invoice.html',
                    controller: 'invoiceCtrl'
                },
                services: {
                    list: {
                        url: 'api/cashBill/data/{{YEAR}}',
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
                            replaceName: 'uomName',
                            isSingle: true
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
                            inputType: 'text',
                            required: true
                        },
                        'gstin': {
                            name: 'GSTIN',
                            id: 'gstin',
                            type: 'input',
                            inputType: 'text',
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
                                replaceName: 'rmName'
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
                        action: true,
                        delete: false
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
                            replaceName: 'supplierName',
                            isSingle: true
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
                                isDisable: true
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
                                isDisable: true
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
                        },
                        actions: {
                            add: false,
                            delete: false
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
                        replaceName: 'supplierName'
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
                            inputType: 'text',
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
                                replaceName: 'partNo',
                                required: true
                            },
                            'operationTo': {
                                name: 'Op Name',
                                id: 'operationTo',
                                type: 'select',
                                options: {},
                                dataFrom: 'production.operationMaster',
                                replaceName: 'opName',
                                required: true
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
                            replaceName: 'subContractorName',
                            isSingle: true
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
                                updateData: ['uomCode', 'cgst', 'sgst'],
                                dataFrom: 'marketing.partMaster',
                                replaceName: 'partNo',
                                isDisable: true
                            },
                            'operationTo': {
                                name: 'Op Name',
                                id: 'operationTo',
                                type: 'select',
                                options: {},
                                dataFrom: 'production.operationMaster',
                                replaceName: 'opName',
                                isDisable: true
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
                                isDisable: true
                            },
                            'rate': {
                                name: 'Rate',
                                id: 'rate',
                                type: 'input',
                                inputType: 'text',
                                action: 'updatePartTotal',
                                required: true
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
                        },
                        actions: {
                            add: false,
                            delete: false
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
                        replaceName: 'subContractorName'
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
                            replaceName: 'supplierName',
                            isSingle: true
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
                            replaceNamePrefix: 'VT-SP-PO-',
                            filter: {
                                status: 0
                            },
                            isSingle: true
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
                                isDisable: true
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
                                isDisable: true
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
                        },
                        actions: {
                            add: false,
                            delete: false
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
                        replaceName: 'supplierName'
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
                        rate: null,
                        gst: null,
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
                            replaceName: 'subContractorName',
                            isSingle: true
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
                            updateData: ['mapping'],
                            filter: {
                                status: 0
                            },
                            isSingle: true
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
                                replaceName: 'partNo',
                                isDisable: true
                            },
                            'operationFrom': {
                                name: 'Part From',
                                id: 'operationFrom',
                                type: 'select',
                                options: {},
                                required: true,
                                dataFrom: 'production.operationMaster',
                                replaceName: 'opName',
                                replaceNamePrefixData: 'opCode'
                            },
                            'operationTo': {
                                name: 'For the purpose',
                                id: 'operationTo',
                                type: 'select',
                                options: {},
                                dataFrom: 'production.operationMaster',
                                replaceName: 'opName',
                                replaceNamePrefixData: 'opCode',
                                isDisable: true
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
                                isDisable: true
                            },
                            'total': {
                                name: 'App Cost',
                                id: 'total',
                                type: 'span'
                            }
                        },
                        actions: {
                            add: false,
                            delete: false
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
                        replaceName: 'subContractorName'
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
                            replaceName: 'subContractorName',
                            isSingle: true
                        },
                        'poNo': {
                            name: 'PO No',
                            id: 'poNo',
                            type: 'select',
                            options: {},
                            action: 'getDCSubContractor',
                            dataFrom: 'purchase.poSubContractor',
                            replaceName: 'poNo',
                            replaceNamePrefix: 'VT-SC-PO-',
                            filter: {
                                status: 0
                            },
                            isSingle: true
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
                            updateData: ['mapping'],
                            filter: {
                                status: 0
                            },
                            isSingle: true
                        },
                        'subContractorDCCode': {
                            name: 'Sub Contractor DC Code',
                            id: 'subContractorDCCode',
                            type: 'input',
                            inputType: 'number',
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
                                dataFrom: 'marketing.partMaster',
                                replaceName: 'partNo',
                                isDisable: true
                            },
                            'operationFrom': {
                                name: 'Part From',
                                id: 'operationFrom',
                                type: 'select',
                                options: {},
                                dataFrom: 'production.operationMaster',
                                replaceName: 'opName',
                                replaceNamePrefixData: 'opCode',
                                isDisable: true
                            },
                            'operationTo': {
                                name: 'Op Name',
                                id: 'operationTo',
                                type: 'select',
                                options: {},
                                dataFrom: 'production.operationMaster',
                                replaceName: 'opName',
                                replaceNamePrefixData: 'opCode',
                                isDisable: true
                            },
                            'receivedQty': {
                                name: 'Received Qty',
                                id: 'receivedQty',
                                type: 'input',
                                inputType: 'number',
                                action: 'updatePartTotal',
                                required: true
                            },
                            'acceptedQty': {
                                name: 'Accepted Qty',
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
                                isDisable: true
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
                        },
                        actions: {
                            add: false,
                            delete: false
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
                        replaceName: 'subContractorName'
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
                    partName: null,
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
                            replaceName: 'partNo',
                            updateData: ['rmCode', 'partName'],
                            action: 'changeMapping',
                            isSingle: true
                        },
                        'partName': {
                            name: 'Part Name',
                            id: 'partName',
                            type: 'span'
                        },
                        'rmCode': {
                            name: 'RM Code',
                            id: 'rmCode',
                            type: 'select',
                            options: {},
                            dataFrom: 'purchase.rmMaster',
                            replaceName: 'rmName',
                            isDisable: true,
                            isSingle: true
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
                        replaceName: 'partNo'
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
                    yop: null,
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
                            idPrefix: 'VT-M/C-'
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
                        title: 'Machine No',
                        id: 'machineNo',
                        idPrefix: 'VT-M/C-'
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
                    partName: null,
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
                            action: 'changeMapping',
                            updateData: ['partName'],
                            dataFrom: 'marketing.partMaster',
                            replaceName: 'partNo',
                            isSingle: true
                        },
                        'partName': {
                            name: 'Part Name',
                            id: 'partName',
                            type: 'span'
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
                                required: true
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
                        replaceName: 'partNo'
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
                    toolName: null,
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
                        'toolName': {
                            name: 'Tool Name',
                            id: 'toolName',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'partNo': {
                            name: 'Part No',
                            id: 'partNo',
                            type: 'select',
                            options: {},
                            dataFrom: 'marketing.partMaster',
                            replaceName: 'partNo',
                            required: true,
                            isSingle: true
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
                    }, {
                        title: 'Tool Name',
                        id: 'toolName'
                    },
                    {
                        title: 'PartName',
                        id: 'partNo',
                        dataFrom: 'marketing.partMaster',
                        replaceName: 'partName'
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
                            action: 'getPartNo',
                            isSingle: true
                        },
                        'partNo': {
                            name: 'Part No',
                            id: 'partNo',
                            type: 'select',
                            options: {},
                            dataFrom: 'marketing.partMaster',
                            replaceName: 'partNo',
                            action: 'getNorms',
                            isSingle: true
                        },
                        'partNorms': {
                            name: 'Part Norms',
                            id: 'partNorms',
                            type: 'input',
                            inputType: 'text',
                            required: true,
                            action: 'updateQtyMake'
                        },
                        'issueQty': {
                            name: 'Issue Qty',
                            id: 'issueQty',
                            type: 'input',
                            inputType: 'number',
                            required: true,
                            action: 'updateQtyMake'
                        },
                        'qtyCanMake': {
                            name: 'Qty Can Make',
                            id: 'qtyCanMake',
                            type: 'input',
                            inputType: 'number',
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
                            replaceNamePrefixData: 'opCode',
                            isSingle: true
                        }
                    }
                },
                listView: [{
                        title: 'Job Card No',
                        id: 'jobCardNo',
                        idPrefix: 'VT-'
                    },
                    {
                        title: 'PartNo',
                        id: 'partNo',
                        dataFrom: 'marketing.partMaster',
                        replaceName: 'partNo'
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
                            required: true,
                            isSingle: true
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
                            },
                            isSingle: true
                        },
                        'partNo': {
                            name: 'Part No',
                            id: 'partNo',
                            type: 'select',
                            options: {},
                            required: true,
                            dataFrom: 'marketing.partMaster',
                            replaceName: 'partNo',
                            isDisable: true,
                            isSingle: true
                        },
                        'operationFrom': {
                            name: 'Operation From',
                            id: 'operationFrom',
                            type: 'select',
                            options: {},
                            required: true,
                            dataFrom: 'production.operationMaster',
                            replaceName: 'opName',
                            replaceNamePrefixData: 'opCode',
                            isSingle: true
                        },
                        'operationTo': {
                            name: 'Operation To',
                            id: 'operationTo',
                            type: 'select',
                            options: {},
                            required: true,
                            dataFrom: 'production.operationMaster',
                            replaceName: 'opName',
                            replaceNamePrefixData: 'opCode',
                            isSingle: true
                        },
                        'toolName': {
                            name: 'Tool Name',
                            id: 'toolName',
                            type: 'select',
                            options: {},
                            required: true,
                            dataFrom: 'production.toolMaster',
                            replaceName: 'toolName',
                            isSingle: true
                        },
                        'Operator': {
                            name: 'Operator',
                            id: 'Operator',
                            type: 'select',
                            options: {},
                            required: true,
                            dataFrom: 'marketing.empMaster',
                            replaceName: 'employeeName',
                            isSingle: true
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
                            inputType: 'number',
                            required: true,
                            action: 'checkAcceptedQty'
                        },
                        'rwQty': {
                            name: 'R/w Qty',
                            id: 'rwQty',
                            type: 'input',
                            inputType: 'number',
                            required: true,
                            action: 'checkAcceptedQty'
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
                        replaceName: 'partNo'
                    },
                    {
                        title: 'Operation From',
                        id: 'operationFrom',
                        dataFrom: 'production.operationMaster',
                        replaceName: 'opName'
                    },
                    {
                        title: 'Operation To',
                        id: 'operationTo',
                        dataFrom: 'production.operationMaster',
                        replaceName: 'opName'
                    },
                    {
                        title: 'Accepted Qty',
                        id: 'acceptedQty'
                    },
                    {
                        title: 'Date',
                        id: 'date',
                        type: 'date'
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
                        replaceName: 'rmName'
                    },
                    {
                        title: 'Rm Stock Qty',
                        id: 'rmStockQty'
                    }, {
                        title: 'UOM',
                        id: 'uomCode',
                        dataFrom: 'marketing.uomMaster',
                        replaceName: 'uomName'
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
                        title: 'Part No',
                        id: 'partNo',
                        dataFrom: 'marketing.partMaster',
                        replaceName: 'partNo'
                    },
                    {
                        title: 'Part Stock Qty',
                        id: 'partStockQty'
                    }, {
                        title: 'Operation From',
                        id: 'operationFrom',
                        dataFrom: 'production.operationMaster',
                        replaceName: 'opName'
                    }, {
                        title: 'Operation To',
                        id: 'operationTo',
                        dataFrom: 'production.operationMaster',
                        replaceName: 'opName'
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