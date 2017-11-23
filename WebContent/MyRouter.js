jQuery.sap.declare("sap.ui.SplitApp.MyRouter");
sap.ui.demo.myFiori.MyRouter = {
	/*  * to monkey patch the router with the mobile nav back handling
	*/
	myNavBack : function (route, data) {
		var history = sap.ui.core.routing.History.getInstance();
		var url = this.getURL(route, data);
		var direction = history.getDirection(url);
		if ("Backwards" === direction) {
			window.history.go(-1);
		} else {
			var replace = true; // otherwise we go backwards with a forward history
			this.navTo(route, data, replace);
		}
	},
};