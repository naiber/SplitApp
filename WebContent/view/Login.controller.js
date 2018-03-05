jQuery.sap.require("sap.ui.SplitApp.Gateway");

sap.ui.controller("sap.ui.SplitApp.view.Login", {
	
	getRouter : function () {
		return sap.ui.core.UIComponent.getRouterFor(this);	
	},
	
	onInit : function(){
		console.log("dentro onInit di Login")
		var userLogged = new sap.ui.model.json.JSONModel();
		this.getView().setModel(userLogged);
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
		var url = "http://127.0.0.1:8000/api/db/login";
		
		sap.ui.SplitApp.Gateway.post(url,dataToPost, function(error, data) {
			if(error) return error
			that.getView().getModel().setData(data);
			console.log(that.getView().getModel());
			that.getRouter().navTo('app');
		});
		
		//The set of functions that I want to call in order
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




//function asincrona(cb) {
//	$.jax....
//		success: function(data) {
//			cb(null, data)
//		}, error: function(error) {
//			cb(error, null)
//		}
//}
//
//
//
//function a () {
//	return 'b';
//}
//
//var c = a();
//
//asincrona(function(error, data) {
//	if (error)
//		return new Error()
//	
//	data
//})
//
//function asyncornaSync(a, b) {
//	return new Promise((resolve, reject) => {
//		$.jax....
//		success: function(data) {
//			resolve(data)
//		}, error: function(error) {
//			reject(error)
//		}
//	})
//}
//
//asyncornaSync(a, b).then().catch()

//fuction a(){}
//var b = a;
//b()