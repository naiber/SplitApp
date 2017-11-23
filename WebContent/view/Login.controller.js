jQuery.sap.require("sap.ui.SplitApp.Gateway");

sap.ui.controller("sap.ui.SplitApp.view.Login", {
	
	getRouter : function () {
		return sap.ui.core.UIComponent.getRouterFor(this);	
	},
	
	onInit : function(){
		console.log("dentro onInit di Login")
	},
	
//	getStatusToken : function(url){
//		var res = new sap.ui.model.json.JSONModel();
//		res.loadData(url,null,true,'GET');
////		var b = res.attachRequestCompleted(function(oEvent){
////			var out = false;
////			if(oEvent.getParameter("message")==="OK"){
////				out = true;
////			}
////			return out;
////		})
////		console.log("out-->",b)
////		return b;
//		res.attachRequestCompleted(function(oEvent){
//			console.log("data",res.getData());
//		})
////		return res.getProperty("/oData/status")
////		var data = new sap.ui.model.json.JSONModel();
////		data = res.attachRequestCompleted(function(){
////			var out;
////			out = res.getData();
////			return out;
////		})
////		return data;
//	},
	
	submitPressed : function(oEvent){
		console.log("dentro submitPressed")
		var that=this;
		var user = this.getView().byId("userF").getValue();
		var password = this.getView().byId("passF").getValue();
		var dataToPost = {
				"username" : user,
				"password" : password
		};
		var url = "http://127.0.0.1:8000/api/login/";
		
		////////////////handler data\\\\\\\\\\\\\\\\\
		var dataReq = function(url,data,callback){
			sap.ui.SplitApp.Gateway.post(url,data);
			if (callback && typeof callback === 'function') callback();
		}
		
		
		var data = dataReq(url,dataToPost,sap.ui.SplitApp.Gateway.getUser());
		if(data == {}){
			console.log("no data");
		}else{
			
			console.log("data",data);
			this.dataToApp(data);
			this.getRouter().navTo("app");
		}
		
		
//		sap.ui.SplitApp.Gateway.post(url,dataToPost)
//		var dataReq = sap.ui.SplitApp.Gateway.getUser();
//		console.log("success: "+dataReq)
		
		
		
//	    if(data[0].message != "OK"){
//			return
//		}else{
//			that.dataToApp(data[1]);
//			that.getRouter().navTo("app")
//		}
		///////////////////////////////////////////////
//		var response = this.getStatusToken("http://127.0.0.1:8000/api/login/"+user+"&&"+password);
//		if(response){
//			this.getRouter().navTo("app")
//		}else{
//			return
//		}

//		if(user == "admin" && password == "admin"){
//			
//			console.log("ok!")
//			
//		}else{
//			console.log("wrong user and password")
//			return
//		}
	},
	
	dataToApp : function(data){
		console.log("dentro dataToApp con questi dati,",data)
		var eventBus = sap.ui.getCore().getEventBus();
		// 1. ChannelName, 2. EventName, 3. the data
		eventBus.publish("AppChannel", "toApp", data);
	},

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf zui_plancal.Login
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf zui_plancal.Login
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf zui_plancal.Login
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf zui_plancal.Login
*/
//	onExit: function() {
//
//	}

});