'use strict'

var staticConfig = {
    appName: 'VASUTECHS',
    appBaseUrl: '/dashboard',
    dataDownloadUrl: '/api/download',
    calendarYear: new Date().getMonth() > 4 ? new Date().getFullYear() : new Date().getFullYear() - 1,
    finalStageOpp: 9,
    modules: {
        databaseUpload: {
            id: 'databaseUpload',
            name: 'Database Upload',
            title: 'Database Upload',
            disableMenu: true,
            masterData: {
                databaseUpload: null
            },
            page: {
                link: 'databaseUpload',
                name: 'databaseUpload',
                templateUrl: 'template/databaseUpload.html',
                controller: 'databaseUploadCtrl'
            },
            services: {
                list: {
                    url: 'api/upload',
                    method: 'POST'
                }
            }
        },
        databaseDonwload: {
            id: 'databaseDonwload',
            name: 'Database Download',
            title: 'Database Download',
            disableMenu: true,
            page: {
                link: '/api/download',
                name: 'databaseUpload'
            }
        },
        calendarYear: {
            id: 'calendarYear',
            name: 'Calendar Year',
            title: 'Calendar Year',
            disableMenu: true,
            page: {
                link: 'calendarYear',
                name: 'calendarYear'
            }
        },
        dashboard: {
            id: 'dashboard',
            name: 'Dashboard',
            title: 'Dashboard',
            icon: 'dashboard',
            disableMenu: true,
            page: {
                link: 'dashboard',
                name: 'dashboard',
                templateUrl: 'template/dashboard.html',
                controller: 'dashboardCtrl'
            }
        },
        marketing: {
            id: 'marketing',
            name: 'Marketing',
            title: 'Marketing',
            icon: 'stack-exchange',
            partMaster: {
                id: 'partMaster',
                title: 'Part Master',
                masterData: {
                    partNo: null,
                    partName: null,
                    rmCode: null,
                    inputWeight: null,
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
                            action: 'isCheckExistField',
                            required: true
                        },
                        'partName': {
                            name: 'Part Name',
                            id: 'partName',
                            type: 'input',
                            inputType: 'text',
                            action: 'isCheckExistField',
                            required: true
                        },
                        'rmCode': {
                            name: 'Raw material',
                            id: 'rmCode',
                            type: 'select',
                            options: {},
                            dataFrom: 'purchase.rmMaster',
                            replaceName: 'rmName',
                            valuePrefixData: 'grade',
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
                    }
                ],
                page: {
                    link: 'marketing/partMaster/list',
                    name: 'list',
                    templateUrl: 'template/defaultView.html',
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
                id: 'customerMaster',
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
                            valuePrefix: 'VT-CUS-'
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
                        title: 'Customer Code',
                        id: 'customerCode',
                        valuePrefix: 'VT-CUS-'
                    },
                    {
                        title: 'Customer Name',
                        id: 'customerName'
                    }
                ],
                page: {
                    link: 'marketing/customerMaster/list',
                    name: 'list',
                    templateUrl: 'template/defaultView.html',
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
                id: 'empMaster',
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
                            valuePrefix: 'VT-EMP-',
                            type: 'span'
                        },
                        'employeeName': {
                            name: 'Employee Name',
                            id: 'employeeName',
                            type: 'input',
                            inputType: 'text',
                            action: 'isCheckExistField',
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
                    }
                ],
                page: {
                    link: 'marketing/empMaster/list',
                    name: 'list',
                    templateUrl: 'template/defaultView.html',
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
                id: 'uomMaster',
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
                            valuePrefix: 'VT-UOM-'
                        },
                        'uomName': {
                            name: 'UOM Name',
                            id: 'uomName',
                            type: 'input',
                            inputType: 'text',
                            action: 'isCheckExistField',
                            required: true
                        }
                    }
                },
                listView: [{
                        title: 'UOM Code',
                        id: 'uomCode',
                        valuePrefix: 'VT-UOM-'
                    },
                    {
                        title: 'UOM Name',
                        id: 'uomName'
                    }
                ],
                page: {
                    link: 'marketing/uomMaster/list',
                    name: 'list',
                    templateUrl: 'template/defaultView.html',
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
                id: 'invoice',
                title: 'Invoice',
                masterData: {
                    invoiceNo: null,
                    date: null,
                    customerCode: null,
                    address: null,
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
                            valuePrefix: 'H-',
                            required: true
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
                            updateData: ['gstin', 'address', 'mapping'],
                            dataFrom: 'marketing.customerMaster',
                            replaceName: 'customerName',
                            isSingle: true
                        },
                        'address': {
                            name: 'Customer Address',
                            id: 'address'
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
                        'subTotal': {
                            name: 'Sub Total',
                            id: 'subTotal',
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
                        valuePrefix: 'H-'
                    },
                    {
                        title: 'Customer',
                        id: 'customerCode',
                        dataFrom: 'marketing.customerMaster',
                        replaceName: 'customerName'
                    },
                    {
                        title: 'Date',
                        id: 'date',
                        type: 'date'
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
                id: 'cashBill',
                name: 'cashBill',
                title: 'Cash Bill',
                parentModule: 'marketing.invoice',
                form: {
                    autoGenValStart: null,
                    fields: {
                        'invoiceNo': {
                            name: 'CashBill No',
                            id: 'invoiceNo',
                            type: 'span',
                            valuePrefix: '',
                            required: true
                        }
                    }
                },
                listView: [{
                    title: 'Cash Bill No',
                    id: 'invoiceNo',
                    valuePrefix: ''
                }],
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
            id: 'purchase',
            name: 'Purchase',
            title: 'Purchase',
            icon: 'shopping-bag',
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
                            valuePrefix: 'RM-',
                            type: 'span'
                        },
                        'rmName': {
                            name: 'RM Name',
                            id: 'rmName',
                            type: 'input',
                            inputType: 'text',
                            action: 'isCheckExistField',
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
                        valuePrefix: 'RM-'
                    },
                    {
                        title: 'RM Name',
                        id: 'rmName'
                    }
                ],
                page: {
                    link: 'purchase/rmMaster/list',
                    name: 'list',
                    templateUrl: 'template/defaultView.html',
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
                id: 'supplierMaster',
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
                            valuePrefix: 'VT-SP-'
                        },
                        'supplierName': {
                            name: 'Supplier Name',
                            id: 'supplierName',
                            type: 'input',
                            inputType: 'text',
                            action: 'isCheckExistField',
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
                                replaceName: 'rmName',
                                valuePrefixData: 'grade'
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
                        valuePrefix: 'VT-SP-'
                    },
                    {
                        title: 'Supplier Name',
                        id: 'supplierName'
                    }
                ],
                page: {
                    link: 'purchase/supplierMaster/list',
                    name: 'list',
                    templateUrl: 'template/defaultView.html',
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
                id: 'poSupplier',
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
                            valuePrefix: 'VT-SP-PO-'
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
                                valuePrefixData: 'grade',
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
                                type: 'input',
                                inputType: 'text',
                                action: 'updateRmTotal',
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
                            add: false
                        }
                    }
                },
                listView: [{
                        title: 'PO NO',
                        id: 'poNo',
                        valuePrefix: 'VT-SP-PO-'
                    },
                    {
                        title: 'Supplier Code',
                        id: 'supplierCode',
                        dataFrom: 'purchase.supplierMaster',
                        replaceName: 'supplierName',
                        type: 'select',
                        isFilterBy: true
                    },
                    {
                        title: 'Stutus',
                        id: 'status'
                    }
                ],
                page: {
                    link: 'purchase/poSupplier/list',
                    name: 'list',
                    templateUrl: 'template/defaultView.html',
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
                id: 'subContractorMaster',
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
                            valuePrefix: 'VT-SC-'
                        },
                        'subContractorName': {
                            name: 'Sub Contractor Name',
                            id: 'subContractorName',
                            type: 'input',
                            inputType: 'text',
                            action: 'isCheckExistField',
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
                                filter: {
                                    source: ['Sub-Contractor']
                                },
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
                        valuePrefix: 'VT-SC-'
                    },
                    {
                        title: 'Sub Contractor Name',
                        id: 'subContractorName'
                    }
                ],
                page: {
                    link: 'purchase/subContractorMaster/list',
                    name: 'list',
                    templateUrl: 'template/defaultView.html',
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
                id: 'poSubContractor',
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
                            valuePrefix: 'VT-SC-PO-'
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
                            isSingle: true,
                            callBack: false
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
                                action: 'updateTaxPart',
                                required: true
                            },
                            'gst': {
                                name: 'GST%',
                                id: 'gst',
                                type: 'input',
                                inputType: 'text',
                                action: 'updateGstPart',
                                required: true
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
                            add: false
                        }
                    }
                },
                listView: [{
                        title: 'PO NO',
                        id: 'poNo',
                        valuePrefix: 'VT-SC-PO-'
                    },
                    {
                        title: 'SubContractor Code',
                        id: 'subContractorCode',
                        dataFrom: 'purchase.subContractorMaster',
                        replaceName: 'subContractorName',
                        type: 'select',
                        isFilterBy: true
                    },
                    {
                        title: 'Stutus',
                        id: 'status'
                    }
                ],
                page: {
                    link: 'purchase/poSubContractor/list',
                    name: 'list',
                    templateUrl: 'template/defaultView.html',
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
            id: 'store',
            name: 'Store',
            title: 'Store',
            icon: 'suitcase',
            grnSupplier: {
                id: 'grnSupplier',
                title: 'Good Receipt Note - Supplier',
                masterData: {
                    grnNo: null,
                    date: null,
                    supplierCode: null,
                    poNo: null,
                    supplierInvoiceNo: null,
                    supplierInvoiceDate: null,
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
                    disableByField: 'id',
                    fields: {
                        'grnNo': {
                            name: 'GRN No',
                            id: 'grnNo',
                            type: 'span',
                            valuePrefix: 'VT-GRN-'
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
                            valuePrefix: 'VT-SP-PO-',
                            filter: {
                                status: 0
                            },
                            isEditDisable: true,
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
                            name: 'Supplier Invoice Date',
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
                                valuePrefixData: 'grade',
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
                                type: 'input',
                                inputType: 'text',
                                action: 'updateGstPart',
                                required: true
                            },
                            'total': {
                                name: 'total',
                                id: 'total',
                                type: 'span'
                            }
                        },
                        actions: {
                            add: false
                        }
                    }
                },
                listView: [{
                        title: 'GRN NO',
                        id: 'grnNo',
                        valuePrefix: 'VT-GRN-'
                    },
                    {
                        title: 'Supplier',
                        id: 'supplierCode',
                        dataFrom: 'purchase.supplierMaster',
                        replaceName: 'supplierName'
                    }
                ],
                page: {
                    link: 'store/grnSupplier/list',
                    name: 'list',
                    templateUrl: 'template/defaultView.html',
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
                id: 'dcSubContractor',
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
                            valuePrefix: 'VT-DC-'
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
                            valuePrefix: 'VT-SC-PO-',
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
                                valuePrefixData: 'opCode',
                                isDisable: true
                            },
                            'operationTo': {
                                name: 'For the purpose',
                                id: 'operationTo',
                                type: 'select',
                                options: {},
                                dataFrom: 'production.operationMaster',
                                replaceName: 'opName',
                                valuePrefixData: 'opCode',
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
                                type: 'span'
                            },
                            'gst': {
                                name: 'GST%',
                                id: 'gst',
                                type: 'input',
                                inputType: 'text',
                                action: 'updateGstPart',
                                required: true
                            },
                            'total': {
                                name: 'total',
                                id: 'total',
                                type: 'span'
                            }
                        },
                        actions: {
                            add: false
                        }
                    }
                },
                listView: [{
                        title: 'DC NO',
                        id: 'dcNo',
                        valuePrefix: 'VT-DC-'
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
                    }
                ],
                page: {
                    link: 'store/dcSubContractor/list',
                    name: 'list',
                    templateUrl: 'template/defaultView.html',
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
                id: 'grnSubContractor',
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
                        operationFrom: null,
                        operationTo: null,
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
                    disableByField: 'id',
                    autoGenKey: 'grnNo',
                    fields: {
                        'grnNo': {
                            name: 'GRN No',
                            id: 'grnNo',
                            type: 'span',
                            valuePrefix: 'VT-SC-GRN-'
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
                            valuePrefix: 'VT-SC-PO-',
                            filter: {
                                status: 0
                            },
                            isSingle: true,
                            isEditDisable: true
                        },
                        'dcNo': {
                            name: 'Our DC No',
                            id: 'dcNo',
                            type: 'select',
                            options: {},
                            dataFrom: 'store.dcSubContractor',
                            action: 'changeMapping',
                            replaceName: 'dcNo',
                            valuePrefix: 'VT-DC-',
                            updateMapping: true,
                            updateData: ['mapping'],
                            filter: {
                                status: 0
                            },
                            isSingle: true,
                            isEditDisable: true,
                            onLoadActions: true
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
                                valuePrefixData: 'opCode',
                                isDisable: true
                            },
                            'operationTo': {
                                name: 'Op Name',
                                id: 'operationTo',
                                type: 'select',
                                options: {},
                                dataFrom: 'production.operationMaster',
                                replaceName: 'opName',
                                valuePrefixData: 'opCode',
                                isDisable: true
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
                            add: false
                        }
                    }
                },
                listView: [{
                        title: 'GRN NO',
                        id: 'grnNo',
                        valuePrefix: 'VT-SC-GRN-'
                    },
                    {
                        title: 'Sub Contractor Code',
                        id: 'subContractorCode',
                        dataFrom: 'purchase.subContractorMaster',
                        replaceName: 'subContractorName'
                    }
                ],
                page: {
                    link: 'store/grnSubContractor/list',
                    name: 'list',
                    templateUrl: 'template/defaultView.html',
                    controller: 'grnSubContractorCtrl'
                },
                services: {
                    list: {
                        url: 'api/grnSubContractor/data/{{YEAR}}',
                        method: 'GET'
                    }
                }
            }
        },
        production: {
            id: 'production',
            name: 'Production',
            title: 'Production',
            icon: 'cogs',
            operationMaster: {
                id: 'operationMaster',
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
                            action: 'isCheckExistField',
                            required: true
                        },
                        'source': {
                            name: 'Source',
                            id: 'source',
                            type: 'select',
                            options: {
                                'Supplier': {
                                    optionId: 'Supplier',
                                    optionName: 'Supplier'
                                },
                                'In-House': {
                                    optionId: 'In-House',
                                    optionName: 'IN House'
                                },
                                'Sub-Contractor': {
                                    optionId: 'Sub-Contractor',
                                    optionName: 'Sub Contractor'
                                }
                            },
                            makeFieldOptions: false,
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
                    }
                ],
                page: {
                    link: 'production/operationMaster/list',
                    name: 'list',
                    templateUrl: 'template/defaultView.html',
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
                id: 'bom',
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
                            existingCheck: true,
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
                            valuePrefixData: 'grade',
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
                        title: 'RM Name',
                        id: 'rmCode',
                        dataFrom: 'purchase.rmMaster',
                        replaceName: 'rmName',
                        valuePrefixData: 'grade'
                    }
                ],
                page: {
                    link: 'production/bom/list',
                    name: 'list',
                    templateUrl: 'template/defaultView.html',
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
                id: 'machineMaster',
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
                            valuePrefix: 'VT-M/C-'
                        },
                        'machineName': {
                            name: 'Machine Name',
                            id: 'machineName',
                            type: 'input',
                            inputType: 'text',
                            action: 'isCheckExistField',
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
                        valuePrefix: 'VT-M/C-'
                    },
                    {
                        title: 'Machine Name',
                        id: 'machineName'
                    }
                ],
                page: {
                    link: 'production/machineMaster/list',
                    name: 'list',
                    templateUrl: 'template/defaultView.html',
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
                id: 'flowMaster',
                title: 'Flow Master',
                masterData: {
                    partNo: null,
                    partName: null,
                    mapping: [{
                        id: null,
                        opName: null,
                        source: null,
                        toolNo: null
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
                            existingCheck: true,
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
                                valuePrefixData: 'opCode',
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
                            },
                            'toolNo': {
                                name: 'Tool Name',
                                id: 'toolNo',
                                type: 'select',
                                options: {},
                                dataFrom: 'production.toolMaster',
                                replaceName: 'toolName'
                            }
                        }
                    }
                },
                listView: [{
                    title: 'Part NO',
                    id: 'partNo',
                    dataFrom: 'marketing.partMaster',
                    replaceName: 'partNo'
                }],
                page: {
                    link: 'store/flowMaster/list',
                    name: 'list',
                    templateUrl: 'template/defaultView.html',
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
                id: 'toolMaster',
                title: 'Tool Master',
                masterData: {
                    toolNo: null,
                    toolName: null,
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
                            valuePrefix: 'VT-T-'
                        },
                        'toolName': {
                            name: 'Tool Name',
                            id: 'toolName',
                            type: 'input',
                            inputType: 'text',
                            action: 'isCheckExistField',
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
                    valuePrefix: 'VT-T-'
                }, {
                    title: 'Tool Name',
                    id: 'toolName'
                }],
                page: {
                    link: 'production/toolMaster/list',
                    name: 'list',
                    templateUrl: 'template/defaultView.html',
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
                id: 'materialIssueNote',
                title: 'Material Issue Note',
                masterData: {
                    jobCardNo: null,
                    date: null,
                    rmCode: null,
                    partNo: null,
                    partNorms: null,
                    issueQty: null,
                    qtyCanMake: null,
                    operationTo: null,
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
                            valuePrefix: 'VT-'
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
                            valuePrefixData: 'grade',
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
                            inputType: 'text',
                            required: true,
                            action: 'updateQtyMake'
                        },
                        'qtyCanMake': {
                            name: 'Qty Can Make',
                            id: 'qtyCanMake',
                            type: 'input',
                            inputType: 'text',
                            isDisable: true,
                            required: true
                        },
                        'operationTo': {
                            name: 'Issue Stage',
                            id: 'operationTo',
                            type: 'select',
                            options: {},
                            required: true,
                            dataFrom: 'production.operationMaster',
                            replaceName: 'opName',
                            valuePrefixData: 'opCode',
                            isSingle: true
                        }
                    }
                },
                listView: [{
                        title: 'Job Card No',
                        id: 'jobCardNo',
                        valuePrefix: 'VT-'
                    },
                    {
                        title: 'PartNo',
                        id: 'partNo',
                        dataFrom: 'marketing.partMaster',
                        replaceName: 'partNo',
                        type: 'select',
                        isFilterBy: true
                    },
                    {
                        title: 'Qty Can Make',
                        id: 'qtyCanMake'
                    },
                    {
                        title: 'Date',
                        id: 'date',
                        type: 'date'
                    },
                    {
                        title: 'Status',
                        id: 'status'
                    }
                ],
                page: {
                    link: 'production/materialIssueNote/list',
                    name: 'list',
                    templateUrl: 'template/defaultView.html',
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
                id: 'productionEntry',
                title: 'Production Entry',
                masterData: {
                    mcNo: null,
                    jobCardNo: null,
                    partNo: null,
                    mapping: [{
                        date: null,
                        operationFrom: null,
                        operationTo: null,
                        toolNo: null,
                        operator: null,
                        startTime: null,
                        endTime: null,
                        planQty: null,
                        acceptedQty: null,
                        rejectionQty: null,
                        rwQty: null
                    }]
                },
                form: {
                    name: 'productionEntry',
                    id: 'productionEntry',
                    disableByField: 'id',
                    fields: {
                        'mcNo': {
                            name: 'M/C No',
                            id: 'mcNo',
                            type: 'select',
                            options: {},
                            dataFrom: 'production.machineMaster',
                            replaceName: 'machineNo',
                            valuePrefix: 'VT-M/C-',
                            required: true,
                            isEditDisable: true,
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
                            valuePrefix: 'VT-',
                            action: 'changeMapping',
                            updateData: ['partNo'],
                            filter: {
                                status: 0
                            },
                            isEditDisable: true,
                            isSingle: true,
                            onLoadActions: true
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
                            isEditDisable: true,
                            isSingle: true
                        }
                    },
                    mapping: {
                        name: 'Production Mapping',
                        fields: {
                            'date': {
                                name: 'Date',
                                id: 'date',
                                type: 'input',
                                inputType: 'date',
                                required: true
                            },
                            'operationFrom': {
                                name: 'Operation From',
                                id: 'operationFrom',
                                type: 'select',
                                options: {},
                                action: 'updateOperationTo',
                                //makeFieldOptions: false,
                                dataFrom: 'production.operationMaster',
                                replaceName: 'opName',
                                valuePrefixData: 'opCode',
                                required: true
                            },
                            'operationTo': {
                                name: 'Operation To',
                                id: 'operationTo',
                                type: 'select',
                                options: {},
                                required: true,
                                dataFrom: 'production.operationMaster',
                                replaceName: 'opName',
                                action: 'updateToolNo',
                                //makeFieldOptions: false,
                                valuePrefixData: 'opCode'
                            },
                            'toolName': {
                                name: 'Tool Name',
                                id: 'toolNo',
                                type: 'select',
                                options: {},
                                dataFrom: 'production.toolMaster',
                                replaceName: 'toolName'
                            },
                            'operator': {
                                name: 'Operator',
                                id: 'operator',
                                type: 'select',
                                options: {},
                                required: true,
                                dataFrom: 'marketing.empMaster',
                                replaceName: 'employeeName'
                            },
                            'startTime': {
                                name: 'Start Time: (1-24)',
                                id: 'startTime',
                                type: 'input',
                                inputType: 'number',
                                required: true
                            },
                            'endTime': {
                                name: 'End Time: (1-24)',
                                id: 'endTime',
                                type: 'input',
                                inputType: 'number',
                                required: true,
                                action: 'calculatePlanQty'
                            },
                            'planQty': {
                                name: 'Plan Qty',
                                id: 'planQty',
                                type: 'input',
                                inputType: 'number',
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
                        },
                        actions: {
                            add: false,
                            delete: false
                        }
                    }
                },
                listView: [{
                    title: 'Job Card No',
                    id: 'jobCardNo',
                    dataFrom: 'production.materialIssueNote',
                    isFilterBy: true,
                    replaceName: 'id',
                    valuePrefix: 'VT-',
                    type: 'select',
                    options: {}
                }, {
                    title: 'Part No',
                    id: 'partNo',
                    dataFrom: 'marketing.partMaster',
                    replaceName: 'partNo',
                    type: 'select',
                    isFilterBy: true,
                    options: {}
                }],
                page: {
                    link: 'production/productionEntry/list',
                    name: 'list',
                    templateUrl: 'template/defaultView.html',
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
            id: 'report',
            name: 'Report',
            title: 'Report',
            icon: 'tasks',
            rmStock: {
                id: 'rmStock',
                title: 'Raw Material Stock',
                masterData: {
                    rmName: null,
                    rmStockQty: null,
                    uomCode: null
                },
                form: {
                    name: 'RMStock',
                    id: 'RMStock',
                    fields: {
                        'rmName': {
                            name: 'RM Name',
                            id: 'rmCode',
                            type: 'select',
                            options: {},
                            action: 'changeMapping',
                            updateData: ['uomCode'],
                            dataFrom: 'purchase.rmMaster',
                            replaceName: 'rmName',
                            valuePrefixData: 'grade',
                            isSingle: true
                        },
                        'rmStockQty': {
                            name: 'Stock Qty',
                            id: 'rmStockQty',
                            type: 'input',
                            inputType: 'number',
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
                        }
                    }
                },
                listView: [{
                        title: 'Raw Material Name',
                        id: 'rmCode',
                        dataFrom: 'purchase.rmMaster',
                        replaceName: 'rmName',
                        valuePrefixData: 'grade',
                        isFilterBy: true,
                        type: 'select',
                        options: {}
                    },
                    {
                        title: 'Rm Stock Qty',
                        id: 'rmStockQty'
                    }, {
                        title: 'UOM',
                        id: 'uomCode',
                        dataFrom: 'marketing.uomMaster',
                        replaceName: 'uomName'
                    }, {
                        title: 'Updated',
                        id: 'updated',
                        type: 'input',
                        inputType: 'date'
                    }
                ],
                page: {
                    link: 'report/rmStock/list',
                    name: 'list',
                    templateUrl: 'template/defaultView.html',
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
                id: 'partStock',
                title: 'Part Stock',
                masterData: {
                    partNo: null,
                    partStockQty: null,
                    operationFrom: null,
                    operationTo: null
                },
                form: {
                    name: 'PartStock',
                    id: 'PartStock',
                    fields: {
                        'partNo': {
                            name: 'Part No',
                            id: 'partNo',
                            type: 'select',
                            options: {},
                            dataFrom: 'marketing.partMaster',
                            replaceName: 'partNo',
                            action: 'updateOperationFrom',
                            isSingle: true
                        },
                        'partStockQty': {
                            name: 'Part Qty',
                            id: 'partStockQty',
                            type: 'input',
                            inputType: 'number',
                            required: true
                        },
                        'operationFrom': {
                            name: 'Operation From',
                            id: 'operationFrom',
                            type: 'select',
                            options: {},
                            dataFrom: 'production.operationMaster',
                            action: 'updateOperationTo',
                            replaceName: 'opName',
                            isSingle: true
                        },
                        'operationTo': {
                            name: 'Operation To',
                            id: 'operationTo',
                            type: 'select',
                            options: {},
                            dataFrom: 'production.operationMaster',
                            replaceName: 'opName',
                            isSingle: true
                        }
                    }
                },
                listView: [{
                        title: 'Part No',
                        id: 'partNo',
                        dataFrom: 'marketing.partMaster',
                        replaceName: 'partNo',
                        type: 'select',
                        isFilterBy: true
                    },
                    {
                        title: 'Part Stock Qty',
                        id: 'partStockQty'
                    }, {
                        title: 'Operation From',
                        id: 'operationFrom',
                        dataFrom: 'production.operationMaster',
                        replaceName: 'opName',
                        type: 'select'
                    }, {
                        title: 'Operation To',
                        id: 'operationTo',
                        dataFrom: 'production.operationMaster',
                        replaceName: 'opName',
                        type: 'select'
                    }, {
                        title: 'Updated',
                        id: 'updated',
                        type: 'input',
                        inputType: 'date'
                    }
                ],
                page: {
                    link: 'report/partStock/list',
                    name: 'list',
                    templateUrl: 'template/defaultView.html',
                    controller: 'partStockCtrl'
                },
                services: {
                    list: {
                        url: 'api/partStock/data/{{YEAR}}',
                        method: 'GET'
                    }
                }
            },
            subContractorStock: {
                id: 'subContractorStock',
                title: 'SubContractor Stock',
                masterData: {
                    subContractorCode: null,
                    partStockQty: null,
                    operationFrom: null,
                    operationTo: null
                },
                form: {
                    name: 'subContractorStock',
                    id: 'subContractorStock',
                    fields: {
                        'subContractorCode': {
                            name: 'SubContractor Code',
                            id: 'subContractorCode',
                            type: 'select',
                            options: {},
                            dataFrom: 'purchase.subContractorMaster',
                            replaceName: 'subContractorName',
                            action: 'getPartNos',
                            isSingle: true
                        },
                        'partNo': {
                            name: 'Part No',
                            id: 'partNo',
                            type: 'select',
                            options: {},
                            dataFrom: 'marketing.partMaster',
                            replaceName: 'partNo',
                            action: 'updateOperationFrom',
                            isSingle: true
                        },
                        'partStockQty': {
                            name: 'SubContractor Qty',
                            id: 'partStockQty',
                            type: 'input',
                            inputType: 'number',
                            required: true
                        },
                        'operationFrom': {
                            name: 'Operation From',
                            id: 'operationFrom',
                            type: 'select',
                            options: {},
                            dataFrom: 'production.operationMaster',
                            action: 'updateOperationTo',
                            replaceName: 'opName',
                            isSingle: true
                        },
                        'operationTo': {
                            name: 'Operation To',
                            id: 'operationTo',
                            type: 'select',
                            options: {},
                            dataFrom: 'production.operationMaster',
                            replaceName: 'opName',
                            isSingle: true
                        }
                    }
                },
                listView: [{
                        title: 'SubContractor Code',
                        id: 'subContractorCode',
                        dataFrom: 'purchase.subContractorMaster',
                        replaceName: 'subContractorName',
                        type: 'select',
                        isFilterBy: true
                    },
                    {
                        title: 'Part No',
                        id: 'partNo',
                        dataFrom: 'marketing.partMaster',
                        replaceName: 'partNo',
                        type: 'select'
                    },
                    {
                        title: 'Part Stock Qty',
                        id: 'partStockQty'
                    }, {
                        title: 'Operation From',
                        id: 'operationFrom',
                        dataFrom: 'production.operationMaster',
                        replaceName: 'opName',
                        type: 'select',
                        isFilterBy: true
                    }, {
                        title: 'Operation To',
                        id: 'operationTo',
                        dataFrom: 'production.operationMaster',
                        replaceName: 'opName',
                        type: 'select',
                        isFilterBy: true
                    }, {
                        title: 'Updated',
                        id: 'updated',
                        type: 'input',
                        inputType: 'date'
                    }
                ],
                page: {
                    link: 'report/subContractorStock/list',
                    name: 'list',
                    templateUrl: 'template/defaultView.html',
                    controller: 'subContractorStockCtrl'
                },
                services: {
                    list: {
                        url: 'api/subContractorStock/data/{{YEAR}}',
                        method: 'GET'
                    }
                }
            },
            salesAnalysisInvoice: {
                id: 'salesAnalysisInvoice',
                title: 'Sales Analysis - Invoice',
                filterView: {
                    title: 'Filter',
                    data: {
                        frmDate: null,
                        toDate: null
                    },
                    fields: [{
                            title: 'Customer',
                            id: 'customerCode',
                            type: 'select',
                            action: 'partSalesFilter',
                            dataFrom: 'marketing.customerMaster',
                            replaceName: 'customerName'
                        }, {
                            title: 'From Date',
                            id: 'frmDate',
                            type: 'input',
                            inputType: 'date',
                            action: 'partSalesFilter'
                        },
                        {
                            title: 'To Date',
                            id: 'toDate',
                            type: 'input',
                            inputType: 'date',
                            action: 'partSalesFilter'
                        }
                    ]
                },
                listView: [{
                        title: 'Customer',
                        id: 'customerCode',
                        type: 'select',
                        dataFrom: 'marketing.customerMaster',
                        replaceName: 'customerName'
                    }, {
                        title: 'Part No',
                        id: 'partNo',
                        dataFrom: 'marketing.partMaster',
                        replaceName: 'partNo',
                        type: 'select'
                    },
                    {
                        title: 'Part Qty',
                        id: 'unit'
                    }, {
                        title: 'Part Price',
                        id: 'rate'
                    }, {
                        title: 'Sales Value',
                        id: 'amount'
                    }
                ],
                page: {
                    link: 'report/salesAnalysisInvoice/list',
                    name: 'list',
                    templateUrl: 'template/defaultView.html',
                    controller: 'salesAnalysisInvoiceCtrl',
                    actions: {
                        downloadExcel: true
                    }
                },
                services: {
                    list: {
                        url: 'api/invoice/data/{{YEAR}}',
                        method: 'GET'
                    }
                }
            },
            salesAnalysisCashBill: {
                id: 'salesAnalysisCashBill',
                name: 'salesAnalysisCashBill',
                title: 'Sales Analysis - Cash Bill',
                parentModule: 'report.salesAnalysisInvoice',
                page: {
                    link: 'report/salesAnalysisInvoice/list?type=cashBill',
                    name: 'list',
                    templateUrl: 'template/defaultView.html',
                    controller: 'salesAnalysisInvoiceCtrl',
                    actions: {
                        downloadExcel: true
                    }
                },
                services: {
                    list: {
                        url: 'api/cashBill/data/{{YEAR}}',
                        method: 'GET'
                    }
                }
            }
        },
        accounts: {
            id: 'accounts',
            name: 'Accounts',
            title: 'Accounts',
            icon: 'money',
            customerPaymentInvoice: {
                id: 'customerPaymentInvoice',
                title: 'Customer Payment - Invoice',
                masterData: {
                    invoiceNo: null,
                    date: null,
                    customerCode: null,
                    total: null,
                    balanceAmount:0,
                    mapping: [{
                        amount: null,
                        date: null,
                        remark: null
                    }]
                },
                form: {
                    name: 'Customer Payment',
                    id: 'customerPayment',
                    fields: {
                        'invoiceNo': {
                            name: 'Invoice No',
                            id: 'invoiceNo',
                            type: 'select',
                            options: {},
                            action: 'changeMapping',
                            updateData: ['date', 'customerCode', 'total'],
                            dataFrom: 'marketing.invoice',
                            replaceName: 'id',
                            valuePrefix: 'H-',
                            required: true,
                            isSingle: true
                        },
                        'date': {
                            name: 'Date',
                            id: 'date',
                            type: 'span'
                        },
                        'customerCode': {
                            name: 'Customer Code',
                            id: 'customerCode',
                            type: 'select',
                            options: {},
                            dataFrom: 'marketing.customerMaster',
                            replaceName: 'customerName',
                            isSingle: true,
                            isDisable: true
                        },
                        'total': {
                            name: 'Total',
                            id: 'total',
                            type: 'span'
                        },
                        'balanceAmount': {
                            name: 'Balance Amount',
                            id: 'balanceAmount',
                            type: 'span'
                        }
                    },
                    mapping: {
                        name: 'Received instalment',
                        fields: {
                            amount: {
                                name: 'Amount',
                                id: 'amount',
                                type: 'input',
                                inputType: 'number',
                                action:'updateBalanceAmount',
                                required: true
                            },
                            date: {
                                name: 'Date',
                                id: 'date',
                                type: 'input',
                                inputType: 'date',
                                required: true
                            },
                            remark: {
                                name: 'Remark',
                                id: 'remark',
                                type: 'input',
                                inputType: 'text'
                            }
                        }
                    }
                },
                listView: [{
                    title: 'Invoice No',
                    id: 'invoiceNo',
                    valuePrefix: 'H-'
                },
                {
                    title: 'Total Amount',
                    id: 'total'
                },
                {
                    title: 'Balance Amount',
                    id: 'balanceAmount'
                }],
                page: {
                    link: 'accounts/customerPaymentInvoice/list',
                    name: 'list',
                    templateUrl: 'template/defaultView.html',
                    controller: 'customerPaymentInvoiceCtrl'
                },
                services: {
                    list: {
                        url: 'api/customerPaymentInvoice/data/{{YEAR}}',
                        method: 'GET'
                    }
                }
            },
            customerPaymentCashBill: {
                id: 'customerPaymentCashBill',
                name: 'customerPaymentCashBill',
                title: 'Customer Payment - Cash Bill',
                parentModule: 'accounts.customerPaymentInvoice',
                form: {
                    fields: {
                        'invoiceNo': {
                            name: 'CashBill No',
                            id: 'invoiceNo',
                            options: {},
                            action: 'changeMapping',
                            updateData: ['date', 'customerCode', 'total'],
                            dataFrom: 'marketing.cashBill',
                            replaceName: 'id',
                            valuePrefix: '',
                            required: true,
                            isSingle: true
                        }
                    }
                },
                listView: [{
                    title: 'Cash Bill No',
                    id: 'invoiceNo',
                    valuePrefix: ''
                }],
                page: {
                    link: 'accounts/customerPaymentInvoice/list?type=cashBill',
                    name: 'list',
                    templateUrl: 'template/defaultView.html',
                    controller: 'customerPaymentInvoiceCtrl'
                },
                services: {
                    list: {
                        url: 'api/customerPaymentCashBill/data/{{YEAR}}',
                        method: 'GET'
                    }
                }
            }
        },
        admin: {
            id: 'admin',
            name: 'Admin',
            title: 'Admin',
            icon: 'cog',
            settings: {
                id: 'settings',
                title: 'Settings',
                masterData: {
                    companyName: null,
                    companyLogoUrl: null,
                    companyAddress: null,
                    companyMobile: null,
                    companyEmail: null,
                    companyGstin: null,
                    mapping: [{
                        module: null,
                        restrictUser: null,
                        add: null,
                        edit: null,
                        delete: null
                    }]
                },
                form: {
                    name: 'Settings',
                    id: 'settings',
                    fields: {
                        'companyName': {
                            name: 'Company Name',
                            id: 'companyName',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'companyLogoUrl': {
                            name: 'Company Logo Url',
                            id: 'companyLogoUrl',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'companyAddress': {
                            name: 'Company Address',
                            id: 'companyAddress',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'companyMobile': {
                            name: 'Company Mobile',
                            id: 'companyMobile',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'companyLogoUrl': {
                            name: 'Company Logo Url',
                            id: 'companyLogoUrl',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'companyEmail': {
                            name: 'Company Email',
                            id: 'companyEmail',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'companyGstin': {
                            name: 'Company GSTIN',
                            id: 'companyGstin',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        finalStageOpp: {
                            name: 'Operation Final Stage',
                            id: 'finalStageOpp',
                            type: 'select',
                            options: {},
                            required: true,
                            dataFrom: 'production.operationMaster',
                            replaceName: 'opName',
                            valuePrefixData: 'opCode'
                        }
                    },
                    mapping: {
                        name: 'Restrict Mapping',
                        fields: {
                            module: {
                                name: 'Page name',
                                id: 'module',
                                type: 'select',
                                options: {},
                                makeFieldOptions: false
                            },
                            restrictUser: {
                                name: 'Restrict Type',
                                id: 'restrictUser',
                                type: 'select',
                                options: {
                                    1: {
                                        optionId: '1',
                                        optionName: 'Admin'
                                    },
                                    2: {
                                        optionId: '2',
                                        optionName: 'User'
                                    }
                                },
                                makeFieldOptions: false
                            },
                            add: {
                                name: 'Show Add action',
                                id: 'add',
                                type: 'input',
                                inputType: 'checkbox'
                            },
                            edit: {
                                name: 'Show Edit action',
                                id: 'edit',
                                type: 'input',
                                inputType: 'checkbox'
                            },
                            delete: {
                                name: 'Show Delete action',
                                id: 'delete',
                                type: 'input',
                                inputType: 'checkbox'
                            }
                        }
                    }
                },
                listView: [{
                    title: 'Company Name',
                    id: 'companyName'
                }],
                page: {
                    link: 'admin/settings/list',
                    name: 'list',
                    templateUrl: 'template/defaultView.html',
                    controller: 'settingsCtrl',
                    actions: false
                },
                services: {
                    list: {
                        url: 'api/settings/data',
                        method: 'GET'
                    }
                }
            },
            users: {
                id: 'users',
                title: 'Users',
                masterData: {
                    userName: null,
                    password: null,
                    userType: null
                },
                form: {
                    name: 'Users',
                    id: 'users',
                    fields: {
                        'userName': {
                            name: 'User Name',
                            id: 'userName',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'password': {
                            name: 'Password',
                            id: 'password',
                            type: 'input',
                            inputType: 'password',
                            required: true
                        },
                        'userType': {
                            name: 'User Type',
                            id: 'userType',
                            type: 'select',
                            options: {
                                1: {
                                    optionId: '1',
                                    optionName: 'Admin'
                                },
                                2: {
                                    optionId: '2',
                                    optionName: 'User'
                                }
                            },
                            makeFieldOptions: false,
                            required: true
                        }
                    }
                },
                listView: [{
                    title: 'User Name',
                    id: 'userName'
                }],
                page: {
                    link: 'admin/users/list',
                    name: 'list',
                    templateUrl: 'template/defaultView.html',
                    controller: 'usersCtrl'
                },
                services: {
                    list: {
                        url: 'api/users/data',
                        method: 'GET'
                    }
                }
            },
            login: {
                id: 'login',
                title: 'Login',
                disableMenu: true,
                masterData: {
                    userName: null,
                    password: null
                },
                form: {
                    name: 'Login',
                    id: 'login',
                    title: 'Login',
                    fields: {
                        'userName': {
                            name: 'User Name',
                            id: 'userName',
                            type: 'input',
                            inputType: 'text',
                            required: true
                        },
                        'password': {
                            name: 'Password',
                            id: 'password',
                            type: 'input',
                            inputType: 'password',
                            required: true
                        }
                    },
                    actions: {
                        cancel: false
                    }
                },
                page: {
                    link: 'admin/login',
                    name: 'add',
                    templateUrl: 'template/defaultView.html',
                    controller: 'loginCtrl',
                    actions: false
                }
            }
        }
    }
};
erpApp.constant('staticConfig', staticConfig);