sap.ui.controller("sap.ui.SplitApp.view.SplitList", {
	
	getRouter : function () {
		return sap.ui.core.UIComponent.getRouterFor(this);	
	},
	
	onInit : function(){
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData({
			items : [{
						name : "Report",
						icon : "sap-icon://account",
						selected : true
					  },
					  {
						name : "Admin",
						icon : "sap-icon://arobase",
						selected : false
					  }],
			odata : false
		})
		
		this.getView().setModel(oModel);
		this.dataToDetail(oModel.oData.items[0]);
		this.getView().byId("masterIcon").addStyleClass("footerIcon");
		var eventBus = sap.ui.getCore().getEventBus();
		eventBus.subscribe("AppChannel", "toApp", this.onDataReceived, this);
//		var firstItem = this.getView().byId("list").getItems()[0];
//		this.getView().byId("list").setSelectedItemById(0,true);
//		console.log(this.getView().byId("list").getSelectedItem())
	},
	
	onDataReceived : function(channel, event, data) {
		   // do something with the data (bind to model)
		console.log("data from login: ",data);
		this.getView().getModel().setProperty("/odata",data)
	},
	
	dataToDetail : function(data){
		var eventBus = sap.ui.getCore().getEventBus();
		// 1. ChannelName, 2. EventName, 3. the data
		eventBus.publish("MainDetailChannel", "toDetail", data);
	},
	
	onAfterRendering : function(){
		console.log("dopo il rendering");
	},
	
	toLogin : function(oEvent){
		console.log("dentro toLogin")
		this.getRouter().navTo("Login")
	},
	
//	handleListSelect : function(evt){
//		console.log("dentro handleListSelect")
//		var context = evt.getParameter("listItem").getBindingContext();
//		console.log("handleListSelect's context-->",context)
////		this.nav.to("Detail",context);
//	},
	
	handleListItemPress : function (evt) {
		console.log("dentro handleListItemPress")
		var context = evt.getSource().getBindingContext();//
		console.log("handleListItemPress's context-->",context)
		console.log("is selected?",this.getView().byId("list").getItems()[0].isSelected());
		var sPath = context.sPath;
		var indexItem = context.sPath.substring(context.sPath.length-1,context.sPath.length);
		var modelToShow = this.getView().getModel().getProperty(sPath);
		this.getView().byId("userIcon").setSrc(modelToShow.icon);
		this.getView().byId("userName").setText(modelToShow.name);
		console.log("modelToShow",modelToShow);
		this.dataToDetail(modelToShow);
//		this.nav.to("Detail", context);
	}
	
});