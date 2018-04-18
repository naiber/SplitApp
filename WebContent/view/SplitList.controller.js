jQuery.sap.require("sap.ui.SplitApp.Gateway");

sap.ui.controller("sap.ui.SplitApp.view.SplitList", {
	
	getRouter : function () {
		return sap.ui.core.UIComponent.getRouterFor(this);	
	},
	
	onInit : function(){
		console.log("dentro onInit della master")
		var that=this;
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData({
			items : [{
						id : 0,
						name : "Report",
						icon : "sap-icon://account",
						selected : true
					  },
					  {
						id : 1,
						name : "Admin",
						icon : "sap-icon://arobase",
						selected : false
					  }],
			isPhone : jQuery.device.is.phone
		})
		
		this.getView().setModel(oModel);
		this.getView().byId("masterIcon").addStyleClass("footerIcon");
	},
	
	dataToDetail : function(data){
		var eventBus = sap.ui.getCore().getEventBus();
		// 1. ChannelName, 2. EventName, 3. the data
		eventBus.publish("MainDetailChannel", "toDetail", data);
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
		console.log("sPath--> ",sPath);
		var indexItem = sPath.substring(sPath.length-1,sPath.length);
		var modelToShow = this.getView().getModel().getProperty(sPath);
		this.getView().byId("userIcon").setSrc(modelToShow.icon);
		this.getView().byId("userName").setText(modelToShow.name);
		console.log("modelToShow",modelToShow);
		this.dataToDetail(modelToShow);
		if(this.getView().getModel().getProperty('/isPhone')){
			this.getRouter().navTo('detail');
		}
	}
	
});