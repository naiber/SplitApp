sap.ui.jsview("sap.ui.SplitApp.view.Master", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.Master
	*/ 
	getControllerName : function() {
		return "sap.ui.SplitApp.view.Master";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.Master
	*/ 
	createContent : function(oController) {
		console.log("dentro createContent di Master.view.js")
		this.setDisplayBlock(true);
		
		this.app = new sap.m.SplitApp("Master");
		
		var master = sap.ui.xmlview("SplitList", "sap.ui.SplitApp.view.SplitList");
		master.getController().nav = this.getController();
		this.app.addPage(master, true);
		
		var detail = sap.ui.xmlview("Detail","sap.ui.SplitApp.view.Detail");
		this.app.addPage(detail,false);
		
		this.app.addStyleClass("wrapperShell")
		return this.app;
	}

});