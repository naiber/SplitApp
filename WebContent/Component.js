jQuery.sap.declare("sap.ui.SplitApp.Component");

sap.ui.core.UIComponent.extend("sap.ui.SplitApp.Component", {
	metadata : {
		
		"rootView": 
        {
          "viewName": "sap.ui.SplitApp.view.FullViewApp",
          "type": "JS",
          "id": "fullApp"
        },
		
		"routing" : {
			"config" : {
				"routerClass": "sap.m.routing.Router",
				"viewType" : "JS",
				"viewPath" : "sap.ui.SplitApp.view",
				"controlId" : "FullApp",
				"controlAggregation" : "pages"
//				"clearTarget" : false
			},
			"routes" : [
				{
					"pattern" : "",
					"name" : "login",
					"target" : "login"
//					"view" : "Login",
//					"viewType" : "XML"
				},
				{
					"pattern" : "Split", 
					"name" : "app",     // Name that is used in navTo method
					"target" : "app",
//					"view" : "Master",
					"subroutes" : [{
						"pattern" : "Master",
						"name" : "list",
						"target" : "list"
//						"view" : "SplitList",
//						"targetAggregation" : "masterPages",
//						"targetControl" : "Master",
//						"preservePageInSplitContainer": true,
					}
					,
					{
						"pattern" : "Object",
						"name" : "detail",
						"target" : "detail"
					}						
					]
				}
			],
			"targets" : {
				"login" : {
					"viewName" : "Login",
					"viewType" : "XML",
					"viewLevel" : 1
				},
				"app" : {
					"viewName" : "Master",
					"viewType" : "JS",
					"viewLevel" : 2
				},
				"list" :{
					"viewName" : "SplitList",
					"viewType" : "XML",
				}
				,
				"detail" : {
					"viewName" : "Detail",
					"viewType" : "XML",
				}
			}
//			,
//			"targets" : {
//				"login" : {
//					"viewName" : "Login",
//					"controlId" : "FullApp",
//					"controlAggregation" : "pages"
//				},
//				
//				"split" : {
//					"viewName" : "SplitList",
//					"controlId" : "Master",
//					"controlAggregation" : "masterPages"
//				}
//			}
		}
	},
	
	init : function(){
		console.log("dentro init di Component")
//		var orders = new sap.ui.model.json.JSONModel();
//		orders.setData({
//				items : [
//							{
//								"id" : "1",
//								"title" : "order 1"
//							},
//							{
//								"id" : "2",
//								"title" : "order 2"
//							}
//							]
//		})
//		
//		sap.ui.getCore().setModel(orders,"orders");
        sap.ui.core.UIComponent.prototype.init.apply(this, arguments);	
        this.getRouter().initialize();						
	},

	createContent : function() {
		console.log("dentro createContent di Component")
		var oView = sap.ui.view({
			id : "app",
			viewName : "sap.ui.SplitApp.view.FullViewApp",
			type : "JS",
			viewData : { component : this }
		});
		
		

		var deviceModel = new sap.ui.model.json.JSONModel({
			isPhone : jQuery.device.is.phone,
			isNoPhone : !jQuery.device.is.phone,
			listMode : (jQuery.device.is.phone) ? sap.m.ListMode.None : sap.m.ListMode.SingleSelectMaster,
			listItemType : (jQuery.device.is.phone) ? "Active" : "Inactive"
		});
		
		deviceModel.setDefaultBindingMode("OneWay");
		oView.setModel(deviceModel,"device");

		return oView;
	}
});