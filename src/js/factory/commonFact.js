erpApp.factory('commonFact', function() {
    var getPage = function(pages, location) {
    	var pagePathArr = location.path().split('/'),
    	page;
    	if(pages.link){
    		return pages;
    	}
    	page = pages[pagePathArr[pagePathArr.length - 1]];
        return page;
    };
    return {
        getPage: getPage
    };
});