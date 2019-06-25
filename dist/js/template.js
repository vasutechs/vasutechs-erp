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
    '    <h1 class="align-center show-print logo-title">{{appName}}</h1>\n' +
    '    <!-- Breadcrumbs-->\n' +
    '    <ol class="breadcrumb hide-print">\n' +
    '        <li class="breadcrumb-item">\n' +
    '            <a href="#/">Dashboard</a>\n' +
    '        </li>\n' +
    '        <li class="breadcrumb-item active">{{context.title}}</li>\n' +
    '    </ol>\n' +
    '    <!-- Example DataTables Card-->\n' +
    '    <div class="mb-3">\n' +
    '        <h3>{{context.title}}</h3>\n' +
    '        <div ng-if="context.page.name==\'add\' || context.page.name==\'edit\'">\n' +
    '            <div class="card">\n' +
    '                <div class="card-header hide-print">\n' +
    '                    <b ng-if="!context.page.printView">{{context.form.title||\'Add/Edit\'}}</b>\n' +
    '                    <a ng-if="context.page.printView" class="fa fa-print" href=\'javascript: void();\' onclick="window.print()"><b>Print View</b></a>\n' +
    '                    <button type="button" class="close float-right" aria-label="Close" ng-click="context.actions.cancel(context)">\n' +
    '                        <span aria-hidden="true">&times;</span>\n' +
    '                    </button>\n' +
    '                </div>\n' +
    '                <div class="card-body">\n' +
    '                    <custom-form></custom-form>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div ng-if="context.page.name==\'list\'">\n' +
    '            <filter-view></filter-view>\n' +
    '            <list-view></list-view>\n' +
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
    '    <div ng-if="context.alertMessage!==undefined" class="alert alert-danger" role="alert">\n' +
    '      {{context.alertMessage}}\n' +
    '    </div>\n' +
    '    <form id="{{context.form.id}}" name="customForm">\n' +
    '        <div class="form-group row" ng-switch="field.type" ng-repeat="field in context.form.fields" ng-if="!context.page.printView">\n' +
    '            <label ng-switch-when="span" for="{{field.id}}" class="col-2 col-form-label"><b>{{field.name}}:</b></label>\n' +
    '            <div ng-switch-when="span" class="col-10">\n' +
    '                <span id="{{field.id}}">{{field.valuePrefix}}{{context.data[field.id]}}</span>\n' +
    '            </div>\n' +
    '            <label ng-switch-when="input" for="{{field.id}}" class="col-2 col-form-label"><b>{{field.name}}:</b></label>\n' +
    '            <div ng-switch-when="input" class="col-6">\n' +
    '                <input type="{{field.inputType}}" id="{{field.id}}" name="{{field.id}}" class="form-control" ng-model="context.data[field.id]" ng-required="{{field.required}}" ng-change="field.action && context.actions[field.action] && context.actions[field.action](context, context.data, context.data[field.id], field)" max="{{field.max}}" ng-disabled="field.isDisable || (field.isEditDisable && context.data[context.form.disableByField])" />\n' +
    '            </div>\n' +
    '            <label ng-switch-when="select" for="{{field.id}}" class="col-2 col-form-label"><b>{{field.name}}:</b></label>\n' +
    '            <div ng-switch-when="select" class="col-6">\n' +
    '                <select id="{{field.id}}" class="form-control" ng-model="context.data[field.id]" ng-required="{{field.required}}" ng-change="field.action && context.actions[field.action] && context.actions[field.action](context, context.data, context.data[field.id], field)" ng-options="option.optionId as option.optionName for option in field.options" ng-disabled="field.isDisable || (field.isEditDisable && context.data[context.form.disableByField])">\n' +
    '                    <option value="">--Select--</option>\n' +
    '                </select>\n' +
    '            </div>\n' +
    '            <div class="col-2">\n' +
    '                <span style="color:red" ng-show="customForm[field.id].$invalid">*Invalid input!</span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="form-group row" ng-repeat="field in context.form.fields" ng-if="context.page.printView">\n' +
    '            <label for="{{field.id}}" class="col-2 col-form-label"><b>{{field.name}}:</b></label>\n' +
    '            <div class="col-10">\n' +
    '                <span id="{{field.id}}" ng-bind="context.actions.replaceFieldVal(context.printData[field.id], field)"></span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="form-group row" ng-if="context.form.mapping">\n' +
    '            <div class="col-12">\n' +
    '                <mapping-form></mapping-form>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="form-group row" ng-if="!context.page.printView">\n' +
    '            <div class="col-2">\n' +
    '            </div>\n' +
    '            <div class="col-10">\n' +
    '                <button ng-if="context.form.actions.submit === undefined || context.form.actions.submit" type="button" class="btn btn-primary" id="submit" ng-click="context.form.action.customSubmit && context.form.actions.customSubmit() || context.actions.submit(context)" ng-disabled="customForm.$invalid">Submit</button>\n' +
    '                <button ng-if="context.form.actions.cancel === undefined || context.form.actions.cancel" type="button" class="btn btn-primary" id="cancel" ng-click="context.actions.cancel(context)">Cancel</button>\n' +
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
    '    <form id="{{context.form.id}}" name="entryInvoice">\n' +
    '        <table class="table table-bordered">\n' +
    '            <tbody>\n' +
    '                <tr>\n' +
    '                    <td><b>{{context.form.fields.invoiceNo.name}}</b></td>\n' +
    '                    <td colspan="2">\n' +
    '                        <span id="{{context.form.fields.invoiceNo.id}}"><b>{{context.form.fields.invoiceNo.valuePrefix}}{{context.data[context.form.fields.invoiceNo.id]}}</b></span>\n' +
    '                    </td>\n' +
    '                    <td align="right"><b>{{context.form.fields.date.name}}</b></td>\n' +
    '                    <td colspan="2">\n' +
    '                        <input ng-if="!context.page.printView" type="date" id="{{context.form.fields.date.id}}" class="form-control" ng-model="context.data[context.form.fields.date.id]" ng-required="{{context.form.fields.date.required}}" />\n' +
    '                        <span ng-if="context.page.printView" id="{{context.form.fields.date.id}}" ng-bind="context.actions.replaceFieldVal(context.data[context.form.fields.date.id], context.form.fields.date)">{{context.data[context.form.fields.date.id]}}</span>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td><b>{{context.form.fields.customerCode.name}}</b></td>\n' +
    '                    <td colspan="6">\n' +
    '                        <select ng-if="!context.page.printView" id="{{context.form.fields.customerCode.id}}" class="form-control" ng-model="context.data[context.form.fields.customerCode.id]" ng-required="{{context.form.fields.customerCode.required}}" ng-change="context.form.fields.customerCode.action && context.actions[context.form.fields.customerCode.action] && context.actions[context.form.fields.customerCode.action](context, context.data, context.data[context.form.fields.customerCode.id], context.form.fields.customerCode)"\n' +
    '                            ng-options="option.optionId as option.optionName for option in context.form.fields.customerCode.options" ng-disabled="context.form.fields.customerCode.isDisable || (context.form.fields.customerCode.isEditDisable && context.data[context.form.disableByField])"\n' +
    '                            ng-required="{{context.form.fields.customerCode.required}}">\n' +
    '                            <option value="">--Select--</option>\n' +
    '                        </select>\n' +
    '                        <span ng-if="context.page.printView" id="{{context.form.fields.customerCode.id}}" ng-bind="context.actions.replaceFieldVal(context.data[context.form.fields.customerCode.id], context.form.fields.customerCode)"></span>\n' +
    '\n' +
    '                        <span id="{{context.form.fields.address.id}}">, {{context.data[context.form.fields.address.id]}}</span>\n' +
    '\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '                <tr ng-if="!context.cashBill">\n' +
    '                    <td><b>{{context.form.fields.partyGstin.name}}</b></td>\n' +
    '                    <td colspan="2">\n' +
    '                        <input ng-if="!context.page.printView" type="text" id="{{context.form.fields.partyGstin.id}}" class="form-control" ng-model="context.data[context.form.fields.partyGstin.id]" ng-required="{{context.form.fields.required}}" />\n' +
    '                        <span ng-if="context.page.printView" id="{{context.form.fields.partyGstin.id}}">{{context.form.fields.partyGstin.valuePrefix}}{{context.data[context.form.fields.partyGstin.id]}}</span>\n' +
    '                    </td>\n' +
    '                    <td colspan="4"></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td ng-repeat="mappingFieldKey in context.form.mapping.fields"><b>{{mappingFieldKey.name}}</b></td>\n' +
    '                    <td ng-if="!context.page.printView">\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '                <tr ng-repeat="(key, map) in context.data.mapping" ng-if="!context.page.printView">\n' +
    '                    <td ng-switch="field.type" ng-repeat="field in context.form.mapping.fields">\n' +
    '                        <span ng-switch-when="span" id="{{field.id}}-{{key}}" ng-bind="map[field.id]"></span>\n' +
    '                        <input ng-switch-when="input" type="{{field.inputType}}" id="{{field.id}}-{{key}}" class="form-control" ng-model="map[field.id]" ng-change="field.action && context.actions[field.action] && context.actions[field.action](context, map, map[field.id], key, field)"\n' +
    '                            ng-required="{{field.required}}" />\n' +
    '                        <select class="form-control" ng-switch-when="select" id="{{field.id}}-{{key}}" ng-change="field.action && context.actions[field.action] && context.actions[field.action](context, map, map[field.id], key, field)" ng-model="map[field.id]" ng-options="option.optionId as option.optionName for option in field.options"\n' +
    '                            ng-required="{{field.required}}" ng-disabled="field.isDisable">\n' +
    '                            <option value="">--Select--</option>\n' +
    '                        </select>\n' +
    '                    </td>\n' +
    '                    <td>\n' +
    '                        <a ng-if="context.form.mapping.actions.delete || context.form.mapping.actions.delete===undefined" class="fa fa-fw fa-times" href="javascript: void(0);" ng-click="context.actions.removeMapping(context, context.data.mapping, key)"> </a>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '                <tr ng-repeat="(key, map) in context.data.mapping" ng-if="context.page.printView">\n' +
    '                    <td ng-repeat="field in context.form.mapping.fields">\n' +
    '                        <span id="{{field.id}}-{{key}}" ng-bind="context.actions.replaceFieldVal(map[field.id], field)"></span>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '\n' +
    '                <tr>\n' +
    '                    <td colspan="4" align="right"><b>Sub Total:</b></td>\n' +
    '                    <td colspan="2"><span id="{{context.form.fields.subTotal.id}}" ng-bind="context.data[context.form.fields.subTotal.id]"></span></td>\n' +
    '                </tr>\n' +
    '                <tr ng-if="context.cashBill">\n' +
    '                    <td colspan="4" align="right"><b>Previous Balance:</b></td>\n' +
    '                    <td colspan="2"><input ng-if="!context.page.printView" type="text" id="{{context.form.fields.preBalance.id}}" class="form-control" ng-model="context.data[context.form.fields.preBalance.id]" ng-change="context.form.fields.preBalance.action && context.actions[context.form.fields.preBalance.action] && context.actions[context.form.fields.preBalance.action](context, map, map[context.form.fields.preBalance.id], field)"\n' +
    '                        />\n' +
    '                        <span ng-if="context.page.printView" id="{{context.form.fields.preBalance.id}}">{{context.data[context.form.fields.preBalance.id]}}</span></td>\n' +
    '                </tr>\n' +
    '                <tr ng-if="!context.cashBill">\n' +
    '                    <td rowspan="2" align="right"><b>{{context.form.fields.taxRate.name}}</b></td>\n' +
    '                    <td rowspan="2"><span id="{{context.form.fields.taxRate.id}}" ng-bind="context.data[context.form.fields.taxRate.id]"></span>%</td>\n' +
    '                    <td align="right"><b>{{context.form.fields.cgst.name}}</b></td>\n' +
    '                    <td><span id="{{context.form.fields.cgst.id}}" ng-bind="context.data[context.form.fields.cgst.id]"></span>%</td>\n' +
    '                    <td colspan="2"><span id="{{context.form.fields.cgstTotal.id}}" ng-bind="context.data[context.form.fields.cgstTotal.id]"></span></td>\n' +
    '                </tr>\n' +
    '                <tr ng-if="!context.cashBill">\n' +
    '                    <td align="right"><b>{{context.form.fields.sgst.name}}</b></td>\n' +
    '                    <td><span id="{{context.form.fields.sgst.id}}" ng-bind="context.data[context.form.fields.sgst.id]"></span>%</td>\n' +
    '                    <td colspan="2"><span id="{{context.form.fields.sgstTotal.id}}" ng-bind="context.data[context.form.fields.sgstTotal.id]"></span></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td colspan="4" align="right"><b>{{context.form.fields.total.name}}:</b></td>\n' +
    '                    <td colspan="2"><b><span id="{{context.form.fields.total.id}}" ng-bind="context.data[context.form.fields.total.id]"></span></b></td>\n' +
    '                </tr>\n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '        <div class="form-group row" ng-if="!context.page.printView">\n' +
    '            <div class="col-2">\n' +
    '            </div>\n' +
    '            <div class="col-10">\n' +
    '                <button type="button" class="btn btn-primary" id="submit" ng-click="context.actions.submit(context)" ng-disabled="entryInvoice.$invalid">Submit</button>\n' +
    '                <button type="button" class="btn btn-primary" id="cancel" ng-click="context.actions.cancel(context)">Cancel</button>\n' +
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
    '	<h3>{{context.filterView.title}} <div ng-if="context.page.actions.downloadExcel" class="pull-right"><a href="javascript: void(0);" ng-click="context.actions.downloadExcel(context, \'listView\')" title="Download Excel" class="fa fa-fw fa-file-excel-o"></a></div></h3>\n' +
    '    <table class="table table-bordered">\n' +
    '        <thead>\n' +
    '            <tr>\n' +
    '                <th ng-repeat="(key, list) in context.filterView.fields">\n' +
    '					{{list.title}}:<select ng-if="list.type===\'select\'" id="{{list.id}}" class="form-control font-weight-bold" ng-model="context.filterView.data[list.id]" ng-change="context.actions[list.action] && context.actions[list.action](context, list) || context.actions[\'list\'](context)" ng-options="option.optionId as option.optionName for option in list.options">\n' +
    '                        <option value="">--Select--</option>\n' +
    '                    </select> <input ng-if="list.type===\'input\'" type="{{list.inputType}}" class="form-control font-weight-bold" ng-model="context.filterView.data[list.id]" ng-change="context.actions[list.action] && context.actions[list.action](context, list) || context.actions[\'list\'](context)" />\n' +
    '                </th>\n' +
    '            </tr>\n' +
    '        </thead>\n' +
    '    </table>\n' +
    '    <table class="table table-bordered" id="listView" style="display: none;">\n' +
    '        <thead>\n' +
    '            <tr>\n' +
    '                <th ng-repeat="(key, list) in context.listView">\n' +
    '                    <div>{{list.title}}</div>\n' +
    '                </th>\n' +
    '            </tr>\n' +
    '        </thead>\n' +
    '        <tbody>\n' +
    '            <tr ng-repeat="dataList in context.listViewData">\n' +
    '                <td ng-repeat="(key, list) in context.listView">\n' +
    '                    <div ng-if="!list.actions" ng-bind="context.actions.replaceFieldVal(dataList[list.id], list)"></div>\n' +
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
    '        <a class="navbar-brand" href="#/">{{headerContext.appName}}</a>\n' +
    '        <div class="collapse navbar-collapse" id="navbarSupportedContent">\n' +
    '            <ul class="navbar-nav mr-auto">\n' +
    '                <li ng-if="!module.disableMenu && !module.disable" class="nav-item dropdown" ng-repeat="(key, module) in headerContext.modules">\n' +
    '                    <a ng-if="module.page" class="nav-link" href="#!{{module.page.link}}">\n' +
    '                        <i class="fa fa-fw fa-{{module.icon}}"></i>\n' +
    '                        <span class="nav-link-text">{{module.title}}</span>\n' +
    '                    </a>\n' +
    '                    <a ng-if="!module.page" class="nav-link dropdown-toggle" href="javascript: void(0);" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n' +
    '                        <i class="fa fa-fw fa-{{module.icon}}"></i>\n' +
    '                        <span class="nav-link-text">{{module.title}}</span>\n' +
    '                    </a>\n' +
    '                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">\n' +
    '                        <div ng-repeat="(subKey, subModule) in headerContext.actions.showSubModule(module)">\n' +
    '                            <a ng-if="!subModule.disableMenu && !subModule.disable" class="dropdown-item" href="#!{{subModule.page.link}}">{{subModule.title}}</a>\n' +
    '                            <div ng-if="!subModule.disableMenu && !subModule.disable" class="dropdown-divider"></div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '            <ul class="navbar-nav ml-auto">\n' +
    '                <li class="nav-item dropdown">\n' +
    '                </li>\n' +
    '                <li ng-if="!headerContext.modules[\'calendarYear\'].disable" class="nav-item">\n' +
    '                    <select class="form-control" id="calendarYear" ng-change="headerContext.actions.changeCalendarYear(headerContext)" ng-model="headerContext.calendarYear" ng-options="option.optionId as option.optionName for option in headerContext.calendarYearList">\n' +
    '                        <option value="">--Select--</option>\n' +
    '                    </select>\n' +
    '                </li>\n' +
    '                <li ng-if="!headerContext.modules[\'databaseUpload\'].disable" class="nav-item">\n' +
    '                    <a class="nav-link" title="Import data" href="#!{{headerContext.modules[\'databaseUpload\'].page.link}}">\n' +
    '                        <i class="fa fa-fw fa-upload"></i> \n' +
    '                    </a>\n' +
    '                </li>\n' +
    '                <li ng-if="!headerContext.modules[\'databaseDownload\'].disable" class="nav-item">\n' +
    '                    <a class="nav-link" title="Download data" href="{{headerContext.modules[\'databaseDownload\'].page.link}}" download="database.json">\n' +
    '                        <i class="fa fa-fw fa-download"></i> \n' +
    '                    </a>\n' +
    '                </li>\n' +
    '                <li class="nav-item">\n' +
    '                    <a ng-if="headerContext.isLogin" class="nav-link" href="#!{{headerContext.modules[\'admin\'][\'login\'].page.link}}?type=logout">\n' +
    '                        Logout \n' +
    '                    </a>\n' +
    '                    <a ng-if="!headerContext.isLogin" class="nav-link" href="#!{{headerContext.modules[\'admin\'][\'login\'].page.link}}">\n' +
    '                        Login \n' +
    '                    </a>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '        </div>\n' +
    '    </nav>\n' +
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
    '<div>\n' +
    '    <table class="table table-bordered">\n' +
    '        <thead>\n' +
    '            <tr>\n' +
    '                <th ng-repeat="(key, list) in context.listView">\n' +
    '                    <div ng-if="!list.action && list.isFilterBy===undefined">{{list.title}}</div>\n' +
    '                    <div ng-if="list.isFilterBy">\n' +
    '                        <select ng-if="list.type===\'select\'" id="{{list.id}}" class="form-control font-weight-bold" ng-model="list.selectedFilterBy" ng-change="context.actions.viewFilterBy(context, list)" ng-options="option.optionId as option.optionName for option in list.options">\n' +
    '                            <option value="">{{list.title}}</option>\n' +
    '                        </select>\n' +
    '                        <input ng-if="list.type===\'input\'" type="{{list.inputType}}" class="form-control font-weight-bold" ng-model="list.selectedFilterBy" ng-change="context.actions.viewFilterBy(context, list)" />\n' +
    '                    </div>\n' +
    '                </th>\n' +
    '                <th>\n' +
    '                    <div ng-if="context.page.actions === undefined || context.page.actions.add" class="pull-right"><a href="javascript: void(0);" ng-click="context.actions.add(context)" class="fa fa-fw fa-plus-square-o">Add</a></div>\n' +
    '                </th>\n' +
    '            </tr>\n' +
    '        </thead>\n' +
    '        <tbody>\n' +
    '            <tr ng-repeat="(dataKey, dataList) in context.listViewData | orderBy:context.orderByProperty: true  | filter:context.filterBy:true | startFrom:context.currentPage*context.pageSize | limitTo:context.pageSize">\n' +
    '                <td ng-repeat="(key, list) in context.listView">\n' +
    '                    <div ng-if="!list.actions" ng-bind="context.actions.replaceFieldVal(dataList[list.id], list)"></div>\n' +
    '                </td>\n' +
    '                <td>\n' +
    '                    <div class="row">\n' +
    '                        <div class="col">\n' +
    '                            <a ng-if="context.page.actions === undefined || context.page.actions.print" href="javascript: void(0);" ng-click="context.actions.printView(context, dataList.id, true)" title="Print View" class="fa fa-fw fa-print"> </a>\n' +
    '                        </div>\n' +
    '                        <div class="col" ng-if="context.page.actions === undefined || context.page.actions.edit">\n' +
    '                            <a href="javascript: void(0);" ng-click="context.actions.edit(context, dataList.id)" title="Edit" class="fa fa-fw fa-edit"> </a>\n' +
    '                        </div>\n' +
    '                        <div class="col" ng-if="context.page.actions === undefined || context.page.actions.delete">\n' +
    '                            <a href="javascript: void(0);" title="Delete" ng-click="context.actions.delete(context, dataList.id, dataList)" class="fa fa-fw fa-times"> </a>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr ng-if="context.listViewData.length > 0 && context.listViewData.length >= context.pageSize">\n' +
    '                <td colspan="{{context.listView.length}}" align="center">\n' +
    '                    <button ng-disabled="context.currentPage == 0" class="btn btn-primary" ng-click="context.currentPage=context.currentPage-1">\n' +
    '                        Previous\n' +
    '                    </button> {{context.currentPage+1}}/{{context.actions.numberOfPages(context)}}\n' +
    '                    <button ng-disabled="context.currentPage >= context.actions.getPageData(context).length/context.pageSize - 1" ng-click="context.currentPage=context.currentPage+1" class="btn btn-primary">\n' +
    '                        Next\n' +
    '                    </button>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            <tr ng-if="!context.listViewData || context.listViewData.length===0">\n' +
    '                <td colspan="{{context.listView.length}}">No recodes...</td>\n' +
    '                <td></td>\n' +
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
    '    <div class="card-header"><b>{{context.form.mapping.name}}</b></div>\n' +
    '    <div class="card-body">\n' +
    '        <table class="table table-bordered">\n' +
    '            <thead>\n' +
    '                <tr>\n' +
    '                    <th ng-repeat="mappingFieldKey in context.form.mapping.fields">\n' +
    '                        <div>{{mappingFieldKey.name}}</div>\n' +
    '                    </th>\n' +
    '                    <th ng-if="!context.page.printView && !context.page.printViewMapping">\n' +
    '                    </th>\n' +
    '                </tr>\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '                <tr ng-repeat="(key, map) in context.printData.mapping" ng-if="context.page.printView || context.page.printViewMapping">\n' +
    '                    <td ng-repeat="field in context.form.mapping.fields">\n' +
    '                        <span id="{{field.id}}-{{key}}" ng-bind="context.actions.replaceFieldVal(map[field.id], field)">{{map[field.id]}}</span>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '                <tr ng-repeat="(key, map) in context.data.mapping" ng-if="(!context.page.printView && (!context.page.printViewMapping || (context.page.printViewMapping && ((context.data.mapping.length-1)===key))))">\n' +
    '                    <td ng-switch="field.type" ng-repeat="field in context.form.mapping.fields">\n' +
    '                        <span ng-switch-when="span" id="{{field.id}}-{{key}}" ng-bind="map[field.id]"></span>\n' +
    '                        <input ng-switch-when="input" type="{{field.inputType}}" id="{{field.id}}-{{key}}" class="form-control" ng-model="map[field.id]" ng-change="field.action && context.actions[field.action] && context.actions[field.action](context, map, map[field.id], key, field)"\n' +
    '                            ng-required="{{field.required}}" max="{{field.max}}" />\n' +
    '                        <select class="form-control" ng-switch-when="select" id="{{field.id}}-{{key}}" ng-change="field.action && context.actions[field.action] && context.actions[field.action](context, map, map[field.id], field)" ng-model="map[field.id]" ng-options="option.optionId as option.optionName for option in field.options"\n' +
    '                            ng-required="{{field.required}}" ng-disabled="field.isDisable">\n' +
    '                            <option value="">--Select--</option>\n' +
    '                        </select>\n' +
    '                    </td>\n' +
    '                    <td ng-if="context.form.mapping.actions.delete || context.form.mapping.actions.delete===undefined">\n' +
    '                        <a class="fa fa-fw fa-times" href="javascript: void(0);" ng-click="context.actions.removeMapping(context, context.data.mapping, key)"> </a>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '        <div class="row" ng-if="!context.page.printView && (context.form.mapping.actions.add || context.form.mapping.actions.add==undefined)">\n' +
    '            <div class="col">\n' +
    '                <a class="fa fa-fw fa-plus-square-o" href="javascript: void(0);" ng-click="context.actions.addMapping(context.data.mapping)"> </a>\n' +
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
  $templateCache.put('template/controllers/dashboard.html',
    '<div class="container-fluid">\n' +
    '    <!-- Breadcrumbs-->\n' +
    '    <ol class="breadcrumb">\n' +
    '        <li class="breadcrumb-item">\n' +
    '            <a href="#/">Dashboard</a>\n' +
    '        </li>\n' +
    '        <li class="breadcrumb-item active">My Dashboard</li>\n' +
    '    </ol>\n' +
    '    <!-- Example DataTables Card-->\n' +
    '    <div class="mb-3">\n' +
    '        <h3>{{context.title}}</h3>\n' +
    '        <ul class="navbar-nav">\n' +
    '            <li ng-if="!module.disableMenu && !module.disable" ng-repeat="(key, module) in headerContext.modules">\n' +
    '                <a ng-if="module.page" class="nav-link" href="#!{{module.page.link}}">\n' +
    '                    <i class="fa fa-fw fa-{{module.icon}}"></i>\n' +
    '                    <span class="nav-link-text">{{module.title}}</span>\n' +
    '                  </a>\n' +
    '                <a ng-if="!module.page" class="nav-link">\n' +
    '                    <i class="fa fa-fw fa-{{module.icon}}"></i>\n' +
    '                    <span class="nav-link-text">{{module.title}}</span>\n' +
    '                  </a>\n' +
    '                <ul>\n' +
    '                    <li ng-if="!subModule.disableMenu && !subModule.disable" ng-repeat="subModule in headerContext.actions.showSubModule(module)">\n' +
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
    '        <li class="breadcrumb-item active">My Dashboard</li>\n' +
    '    </ol>\n' +
    '    <!-- Example DataTables Card-->\n' +
    '    <div class="mb-3">\n' +
    '        <h3>{{context.title}}</h3>\n' +
    '        <div>\n' +
    '            <div class="card">\n' +
    '                <div class="card-body">\n' +
    '                    <div ng-if="context.alertMessage!==undefined" class="alert alert-danger" role="alert">\n' +
    '                      {{context.alertMessage}}\n' +
    '                    </div>\n' +
    '                    <div ng-if="context.message!==undefined" class="alert alert-success" role="alert">\n' +
    '                      {{context.message}}\n' +
    '                    </div>\n' +
    '                    <h5 style="color:green;">{{context.data.uploadSuccess}}</h5>\n' +
    '                    <form name="customForm">\n' +
    '                        <input type="file" file-model="context.data.databaseUpload" class="form-control" />\n' +
    '\n' +
    '                        <button ng-click="context.actions.uploadDatabase(context)" class="btn btn-primary">Submit</button>\n' +
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
  $templateCache.put('template/controllers/marketing/invoice.html',
    '<div class="container-fluid">\n' +
    '    <!-- Breadcrumbs-->\n' +
    '    <ol class="breadcrumb hide-print">\n' +
    '        <li class="breadcrumb-item">\n' +
    '            <a href="#/">Dashboard</a>\n' +
    '        </li>\n' +
    '        <li class="breadcrumb-item active">{{context.title}}</li>\n' +
    '    </ol>\n' +
    '    <!-- Example DataTables Card-->\n' +
    '    <div class="mb-3">\n' +
    '        <h3 class="print-title">{{context.title}}</h3>\n' +
    '        <div ng-if="context.page.name==\'add\' || context.page.name==\'edit\'">\n' +
    '            <div class="card">\n' +
    '                <div class="card-header hide-print">\n' +
    '                    <b ng-if="!context.page.printView">Add/Edit</b>\n' +
    '                    <a ng-if="context.page.printView" class="fa fa-print" href=\'javascript: void();\' onclick="window.print()"><b>Print View</b></a>\n' +
    '                    <button type="button" class="close float-right" aria-label="Close" ng-click="context.actions.cancel(context)">\n' +
    '                        <span aria-hidden="true">&times;</span>\n' +
    '                    </button>\n' +
    '                </div>\n' +
    '                <div ng-if="context.page.printView" class="row">\n' +
    '                    <div class="col-4">\n' +
    '                        <img ng-if="context.appConfig.companyLogoUrl" class="logo" src="{{context.appConfig.companyLogoUrl}}" title="{{context.appConfig.companyName}}" />\n' +
    '                        <h1 ng-if="!context.appConfig.companyLogoUrl" class="logo">{{context.appConfig.companyName}}</h1>\n' +
    '                    </div>\n' +
    '                    <div class="col-6">\n' +
    '\n' +
    '                        <p class="font-italic"><b>{{context.appConfig.companyAddress}}</b></p>\n' +
    '                        <p class="font-italic"><b>Mobile:</b> {{context.appConfig.companyMobile}} <b>Email:</b> {{context.appConfig.companyEmail}}</p>\n' +
    '                        <p class="font-italic" ng-if="!context.cashBill"><b>GSTIN:</b> {{context.appConfig.companyGstin}}</p>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="card-body">\n' +
    '                    <entry-invoice></entry-invoice>\n' +
    '                </div>\n' +
    '                <div ng-if="context.page.printView" class="row">\n' +
    '                    <div class="col-7"></div>\n' +
    '                    <div class="col-3">\n' +
    '                        <p class="text-center font-italic"><b>For {{context.companyDetail.name}}</b></p>\n' +
    '                        <br/>\n' +
    '                        <p class="text-center font-italic"><b>Authorised Signatory</b></p>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div ng-if="context.page.name==\'list\'">\n' +
    '            <list-view></list-view>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();
