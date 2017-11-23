sap.ui.controller("sap.ui.SplitApp.view.Detail", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf splitapp.Detail
*/

	onInit: function() {
		console.log("inizio onInit DetailPage")
		var dataSelect = new sap.ui.model.json.JSONModel();
		dataSelect.setData({
			user : {},
			items : [
			{
				"id" : "1",
				"title" : "order 1"
			},
			{
				"id" : "2",
				"title" : "order 2"
			}
			],
			selectedUser : ""
		})
		this.getView().setModel(dataSelect);
		this.getView().byId("selectField").addStyleClass("select");
		this.getView().byId("dateStart").addStyleClass("date");
		this.getView().byId("dateEnd").addStyleClass("date");
		this.getView().byId("saveButton").addStyleClass("saveB");
		this.getView().byId("orderTable").addStyleClass("table");
		this.getView().byId("selectOrder").addStyleClass("selectOrder");
		var eventBus = sap.ui.getCore().getEventBus();
		eventBus.subscribe("MainDetailChannel", "toDetail", this.onDataReceived, this);
	},

	onDataReceived : function(channel, event, data) {
		   // do something with the data (bind to model)
		console.log("data passed-->",data.name)
		console.log("channel",channel)
		console.log("event",event)
		var model = this.getView().getModel();
		var user = {};
		var url = "http://127.0.0.1:8000/api/orders/"+data.name+"/"+b;
		console.log("url: ",url)
		if(!b){
			
		}else{
			/////////////Odata Request\\\\\\\\\\\\\\\\
			
			model.setProperty("/user",{})
			return;
		}
		
		
		console.log("user",user)
		
		console.log("model",model)
	},
	
	handleTButton : function(){
		var tButton = this.getView().byId("bButton");
		if(tButton.getPressed()){
			tButton.setText("ODATA");
		}else{
			tButton.setText("AJAX");
		}
	},
	
	
	handleCalendarSelect : function(evt){
		console.log("dentro handleCalendarSelect")
		var Calendar = evt.getSource();
		var oSelect = this.getView().byId("selectOrder").getSelectedItem();
		var oButton = this.getView().byId("saveButton");
		var date = Calendar.getSelectedDates()[0].getStartDate();
		var startDate = new Date(date.setHours(9));
		var endDate = new Date(date.setHours(18));
		this.getView().byId("startDate").setDateValue(startDate);
		this.getView().byId("endDate").setDateValue(endDate);
		console.log("startDate",startDate)
		console.log("dates",Calendar.getSelectedDates());
		this.updateButtonEnabledState(oSelect,oButton);
	},
	
	handleSelectChange : function(evt){
		console.log("dentro handleSelectChange");
		console.log("evt",evt.getSource())
		var oSelect = this.getView().byId("selectOrder").getSelectedItem();
		var oButton = this.getView().byId("saveButton");
		this.updateButtonEnabledState(oSelect,oButton);
	},
	
	handleDateInput : function(evt){
		
	},
	
	handleSaveButton : function(evt){
		var detailPage = this.getView();
		var model = detailPage.getModel();
		var order = detailPage.byId("selectOrder").getSelectedItem();
		var datePickStart = detailPage.byId("startDate");
		var datePickEnd = detailPage.byId("endDate")
		var startDate = datePickStart.getDateValue();
		var endDate = datePickEnd.getDateValue();
		var saveButton = detailPage.byId("saveButton");
		
		if(!model.oData.user.ordersSaved){
			model.oData.user.ordersSaved = [];
			model.oData.user.ordersSaved.push({
				idOrder : order.getKey(),
				order : order.getText(),
				supplier : "",
				hours : (endDate.getHours()-startDate.getHours())-1,
				actions : ""
			})
			
		}else{
			model.oData.user.ordersSaved.push({
				idOrder : order.getKey(),
				order : order.getText(),
				supplier : "",
				hours : (endDate.getHours()-startDate.getHours())-1,
				actions : ""
			})
		}
		
		model.refresh(true);
		
//		for (item in model.getProperty("/user")){
//			console.log("item",item)
//		}
				
	},
	
	updateButtonEnabledState: function (oSelect, oButton) {
		console.log("dentro updateButtonEnabledState")
		var bEnabled = false;
		if(oSelect){
			bEnabled = oSelect.getText() !== "" || oSelect.getText() !== null;
		}

		oButton.setEnabled(bEnabled);
	},
	
	_validateDateTimePicker: function (sValue, oDateTimePicker) {
		console.log("dentro _validateDateTimePicker")
		if (sValue === "") {
			oDateTimePicker.setValueState("Error");
		} else {
			oDateTimePicker.setValueState("None");
		}
	},

	
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf splitapp.Detail
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf splitapp.Detail
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf splitapp.Detail
*/
//	onExit: function() {
//
//	}

});