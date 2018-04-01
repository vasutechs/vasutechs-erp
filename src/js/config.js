erpApp.constant('erpAppConfig', {
    appName: 'Vasutechs-ERP',
    baseUrl: '/databases/',
    navMenus: {
        dashboard: {
            description: {
                name: 'Dashboard',
                title: 'Dashboard',
                url: 'index.html',
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
    }
});