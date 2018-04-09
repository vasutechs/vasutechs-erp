erpApp.constant('erpAppConfig', {
    appName: 'Vasutechs-ERP',
    appBaseUrl: '/databases/',
    appNavMenus: {
        dashboard: {
            description: {
                name: 'Dashboard',
                title: 'Dashboard',
                url: '/',
                icon: 'dashboard'
            }
        },
        marketing: {
            description: {
                name: 'Marketing',
                title: 'Marketing',
                url: 'collapseMarakets',
                icon: 'stack-exchange'
            },
            childs: {
                partMaster: {
                    description: {
                        name: 'Part Master',
                        url: '#'
                    }
                }
            }
        },
        purchase: {},
        store: {},
        production: {},
        quality: {}
    },
    master: {
        partMaster: {
            title: 'Part Master',
            form: {
                name: 'partMaster',
                id: 'partMaster',
                data: {
                    partNo: '1',
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
                    type: 'select'
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
                    type: 'select'
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
                }, {
                    name: 'Cancel',
                    id: 'cancel',
                    type: 'button',
                    action: 'cancel'
                }]
            }
        }
    },
    services:{
        partMasterList:{
            url: 'api/partMasterList',
            method:'GET'
        }
    }
});