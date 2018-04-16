erpApp.constant('erpAppConfig', {
    appName: 'Vasutechs-ERP',
    appBaseUrl: '/databases/',
    appNavMenus: {
        dashboard: {
            description: {
                name: 'Dashboard',
                title: 'Dashboard',
                url: '/',
                icon: 'dashboard',
                child: 'no'
            }
        },
        marketing: {
            description: {
                name: 'Marketing',
                title: 'Marketing',
                url: 'collapseMarakets',
                icon: 'stack-exchange',
                child: 'yes'
            },
            childs: {
                partMaster: {
                    description: {
                        name: 'Part Master',
                        url: 'master/partMaster/list'
                    }
                },
                employeeMaster: {
                    description: {
                        name: 'Employee Master',
                        url: 'master/empMaster/list'
                    }
                },
                customerMaster: {
                    description: {
                        name: 'Customer Master',
                        url: 'master/customerMaster/list'
                    }
                },
                uomMaster: {
                    description: {
                        name: 'UOM Master',
                        url: 'master/uomMaster/list'
                    }
                },
                invoice: {
                    description: {
                        name: 'Invoice',
                        url: 'master/invoice/list'
                    }
                }
            }
        },
        purchase:  {
            description: {
                name: 'Purchase',
                title: 'Purchase',
                url: 'collapsePurchase',
                icon: 'money',
                child: 'yes'
            },
            childs: {
                rawMaterialMaster: {
                    description: {
                        name: 'Raw Material Master',
                        url: 'master/partMaster/list'
                    }
                },
                supplierMaster: {
                    description: {
                        name: 'Supplier Master',
                        url: 'master/empMaster/list'
                    }
                },
                subcontractorMaster: {
                    description: {
                        name: 'Subcontractor Master',
                        url: 'master/customerMaster/list'
                    }
                },
                poSupplier: {
                    description: {
                        name: 'PURCHASE ORDER- Supplier',
                        url: 'master/uomMaster/list'
                    }
                },
                poSubcontractor: {
                    description: {
                        name: 'PURCHASE ORDER- Subcontractor',
                        url: 'master/invoice/list'
                    }
                },
                poSupplierGeneral: {
                    description: {
                        name: 'PURCHASE ORDER- Supplier General',
                        url: 'master/invoice/list'
                    }
                }
            }
        },
        store: {
            description: {
                name: 'Store',
                title: 'Store',
                url: 'collapseStore',
                icon: 'suitcase',
                child: 'yes'
            },
            childs: {
                openingRawMaterialStock: {
                    description: {
                        name: 'Opening Raw material Stock',
                        url: 'master/partMaster/list'
                    }
                },
                openingPartStock: {
                    description: {
                        name: 'Opening Part Stock',
                        url: 'master/empMaster/list'
                    }
                },
                subcontractorMaster: {
                    description: {
                        name: 'Sub Contractor Opening Stock',
                        url: 'master/customerMaster/list'
                    }
                },
                subContractorOpeningStock: {
                    description: {
                        name: 'Sub Contractor Opening Stock',
                        url: 'master/uomMaster/list'
                    }
                },
                deliveryChallan: {
                    description: {
                        name: 'Delivery Challan',
                        url: 'master/invoice/list'
                    }
                },
                goodsReceiptNoteSupplier: {
                    description: {
                        name: 'Goods Receipt Note- Supplier',
                        url: 'master/invoice/list'
                    }
                }
            }
        },
        production:  {
            description: {
                name: 'Production',
                title: 'Production',
                url: 'collapseProduction',
                icon: 'cogs',
                child: 'yes'
            },
            childs: {
                operationMaster: {
                    description: {
                        name: 'Operation Master',
                        url: 'master/partMaster/list'
                    }
                },
                machineMaster: {
                    description: {
                        name: 'Machine Master',
                        url: 'master/empMaster/list'
                    }
                },
                bom: {
                    description: {
                        name: 'BOM',
                        url: 'master/customerMaster/list'
                    }
                },
                toolMaster: {
                    description: {
                        name: 'Tool Master',
                        url: 'master/uomMaster/list'
                    }
                },
                flowProcess: {
                    description: {
                        name: 'Flow Process',
                        url: 'master/invoice/list'
                    }
                },
                materialIssueNote: {
                    description: {
                        name: 'Material issue note',
                        url: 'master/invoice/list'
                    }
                },
                productionEntry: {
                    description: {
                        name: 'PRODUCTION Entry',
                        url: 'master/invoice/list'
                    }
                },
                productionEntryPacking: {
                    description: {
                        name: 'PRODUCTION Entry for packing',
                        url: 'master/invoice/list'
                    }
                }
            }
        },
        quality: {
            description: {
                name: 'Quality',
                title: 'Quality',
                url: 'collapseQuality',
                icon: 'check-square',
                child: 'yes'
            },
            childs: {
                rawMaterialSpecification: {
                    description: {
                        name: 'Raw material Specification',
                        url: 'master/partMaster/list'
                    }
                },
                partSpecification: {
                    description: {
                        name: 'Part Specification',
                        url: 'master/empMaster/list'
                    }
                },
                receivingInspectionSupplier: {
                    description: {
                        name: 'Receiving Inspection- Supplier',
                        url: 'master/customerMaster/list'
                    }
                },
                receivingInspectionSubcontractor: {
                    description: {
                        name: 'Receiving Inspection- Subcontractor',
                        url: 'master/uomMaster/list'
                    }
                }
            }
        }
    },
    pages: {
        dashboard: {
            link: 'dashboard',
            name: 'dashboard',
            templateUrl: 'template/dashboard.html',
            controller: 'dashboardCtrl'
        },
        master: {
            partMaster: {
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
                    name: 'delete'
                }
            }
        }
    },
    master: {
        partMaster: {
            title: 'Part Master',
            form: {
                name: 'partMaster',
                id: 'partMaster',
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
                    options: [
                        { id: '1', name: 'Option A' },
                        { id: '2', name: 'Option B' },
                        { id: '3', name: 'Option C' }
                    ]
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
                    type: 'button',
                    action: 'submit'
                }]
            }
        }
    },
    services: {
        partMasterList: {
            url: 'api/partMasterList/data',
            method: 'GET'
        }
    }
});