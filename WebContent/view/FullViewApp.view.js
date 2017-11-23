sap.ui.jsview("sap.ui.SplitApp.view.FullViewApp", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.FullViewApp
	*/ 
	getControllerName : function() {
		return "sap.ui.SplitApp.view.FullViewApp";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.FullViewApp
	*/ 
	createContent : function(oController) {
		console.log("dentro createContent di FullViewApp")
		this.setDisplayBlock(true);
		
		this.app = new sap.m.App("FullApp");
		
		var login = sap.ui.xmlview("Login", "sap.ui.SplitApp.view.Login");
		login.getController().nav = this.getController();
		this.app.addPage(login, true);
			
		return this.app;
	}

});