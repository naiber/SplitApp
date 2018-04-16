jQuery.sap.require("sap.ui.SplitApp.Gateway");

sap.ui.controller("sap.ui.SplitApp.view.Detail", {
	getRouter : function () {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf splitapp.Detail
*/

	onInit: function() {
		console.log("inizio onInit DetailPage")
		var dataSelect = new sap.ui.model.json.JSONModel();
		var supplierSelect = new sap.ui.model.json.JSONModel();
		var that = this;
		sap.ui.SplitApp.Gateway.get('https://servernodeforsapui5.herokuapp.com/works',function(err,res){
			if(err) return;

			console.log('commesse -> ',res);
			dataSelect.setData(res);
			that.getView().setModel(dataSelect,'commesse');
		})

		sap.ui.SplitApp.Gateway.get('https://servernodeforsapui5.herokuapp.com/suppliers',function(err,res){
			if(err) return;

			console.log('fornitori -> ',res);
			supplierSelect.setData(res);
			that.getView().setModel(supplierSelect,'fornitori');
		})

//		this.getView().setModel(dataSelect);
//		this.getView().setModel(supplierSelect,'fornitori');
		var options = new sap.ui.model.json.JSONModel();
		options.setData({
			user : {},
			orders : [],
			menu : "",
			savedCommit : ""
		});
		this.getView().setModel(options);
		console.log('odata',dataSelect);
		options.setProperty("/user",this.getUser());

		var eventBus = sap.ui.getCore().getEventBus();
		eventBus.subscribe("MainDetailChannel", "toDetail", this.onDataReceived, this);
	},

	onBeforeRendering : function(){
		console.log('dentro beforeRendering')
		this.getView().byId("selectField").addStyleClass("select");
		this.getView().byId("dateStart").addStyleClass("date");
		this.getView().byId("dateEnd").addStyleClass("date");
		this.getView().byId("saveButton").addStyleClass("saveB");
		this.getView().byId("orderTable").addStyleClass("table");
		this.getView().byId("commessa").addStyleClass("selectOrder");
		this.getView().byId("editSupplier").addStyleClass("supplierField");
	},

	onAfterRendering : function(){
		console.log('dentro onAfterRendering');
		console.log('user in detail model',this.getView().getModel().getProperty('/user'))
		console.log('commessa model',this.getView().getModel());
	},

	handleNavButton : function(){
		this.getRouter().navTo('list');
	},

	getUser : function(){
		console.log("dentro getUser")
		var app = sap.ui.getCore().byId("FullApp");
		var LoginPage = app.getPage("Login");
		console.log('Odata of LoginPage',LoginPage.getModel());
		var user = {
				"_id" : LoginPage.getModel().oData._id,
				"name" : LoginPage.getModel().oData.name,
				"user" : LoginPage.getModel().oData.user,
				"password" : LoginPage.getModel().oData.password,
		}
		console.log("user",user);
		return user;
	},

	onDataReceived : function(channel, event, data) {
		   // do something with the data (bind to model)
		console.log("data passed-->",data.name)
		console.log("channel",channel)
		console.log("event",event)
		var that=this;
		var model = this.getView().getModel();
		var user = model.getProperty("/user/name");
		var menu = data.name;
		model.setProperty("/menu",menu);
		console.log("username",user);
		var url = "http://127.0.0.1:8000/api/db/"+user+"/"+menu.charAt(0);
//		var url = "http://127.0.0.1:8000/api/db/"+user+"/"+b;
		console.log("url",url)
		sap.ui.SplitApp.Gateway.get(url,function(err,data){
			if(err) return err;

			if(data !== 'no result'){
				that.getView().getModel().setProperty('/orders',data);
				console.log('orders--> ',that.getView().getModel().getProperty('/orders'));
				that.getView().getModel().refresh(true);
			}else{
				console.log('dati non presenti')
				that.getView().getModel().setProperty('/orders',null);
//				that.getView().getModel().setProperty('/menu',null);
			}
		});


//		var req = new XMLHttpRequest();
//
//		req.open('GET',url,true);
//		req.setRequestHeader('Accept', 'application/json');
//		console.log(req.response);
	},

	handleCalendarSelect : function(evt){
		console.log("dentro handleCalendarSelect")
		var Calendar = evt.getSource();
		var oButton = this.getView().byId("saveButton");
		var date = Calendar.getSelectedDates()[0].getStartDate();
		var startDate = new Date(date.setHours(9));
		var endDate = new Date(date.setHours(18));
		var startPick = this.getView().byId("startDate");
		var endPick = this.getView().byId("endDate");
		startPick.setDateValue(startDate);
		endPick.setDateValue(endDate);
		console.log("startDate",startDate)
		console.log("dates",Calendar.getSelectedDates());
		this.updateButtonEnabledStateForDate(startPick,endPick,oButton);
	},

	selectCommessaCreate : function(evt){
		var oSelect = this.getView().byId('commessa'),
		oButton = this.getView().byId('saveButton');

		this._validateSelect(oSelect);
		this.updateButtonEnabledStateForOrder(oSelect,oButton);
	},

	selectFornitoreCreate : function(evt){
		var oSelect = this.getView().byId('fornitore'),
		oButton = this.getView().byId('saveButton');

		this._validateSelect(oSelect);
		this.updateButtonEnabledStateForOrder(oSelect,oButton);
	},

	selectCommessaEdit : function(evt){
		console.log("dentro handleSelectChange");
		console.log("evt",evt.getSource())
		var oFrag = sap.ui.core.Fragment,
		oSelect = sap.ui.core.Fragment.byId("EditFrag","selectCommessa"),
		oButton = sap.ui.core.Fragment.byId("EditFrag", "OKButton");

		this._validateSelect(oSelect);
		this.updateButtonEnabledStateForOrder(oSelect,oButton);
	},

	selectFornitoreEdit : function(evt){
		var oFrag = sap.ui.core.Fragment,
		oSelect = sap.ui.core.Fragment.byId("EditFrag","selectFornitore"),
		oButton = sap.ui.core.Fragment.byId("EditFrag", "OKButton");

		this._validateSelect(oSelect);
		this.updateButtonEnabledStateForOrder(oSelect,oButton);
	},

	selectDateEdit : function(evt){
		var oFrag =  sap.ui.core.Fragment,
		oDTPStart = sap.ui.core.Fragment.byId("EditFrag", "startDate"),
		oDTPEnd = sap.ui.core.Fragment.byId("EditFrag", "endDate"),
		oOKButton = sap.ui.core.Fragment.byId("EditFrag", "OKButton");

		this._validateDateTimePicker(evt.getParameter("value"), evt.oSource);
		this.updateButtonEnabledStateForDate(oDTPStart, oDTPEnd, oOKButton);
	},

	handleSaveButton : function(evt){
		var that=this;
		var detailPage = this.getView();
		var model = detailPage.getModel();
		var order = detailPage.byId("commessa");
		var supplier = detailPage.byId("fornitore");
		var datePickStart = detailPage.byId("startDate");
		var datePickEnd = detailPage.byId("endDate")
		var startDate = datePickStart.getDateValue();
		var endDate = datePickEnd.getDateValue();
		var saveButton = detailPage.byId("saveButton");

		if(order.getSelectedItem() != null && supplier.getSelectedItem() != null){
			that.saveOrder({
				idOrder : order.getSelectedItem().getKey(),
				order : order.getSelectedItem().getText(),
				supplier : supplier.getSelectedItem().getText(),
				hours : (endDate.getHours()-startDate.getHours())-1
			})
		}else if(order.getSelectedItem() == null && supplier.getSelectedItem() != null){
			saveButton.setEnabled(false);
			order.setValueState('Error');
			return;
		}else if(order.getSelectedItem() != null && supplier.getSelectedItem() == null){
			saveButton.setEnabled(false);
			supplier.setValueState('Error');
			return;
		}else{
			saveButton.setEnabled(false);
			order.setValueState('Error');
			supplier.setValueState('Error');
			return;
		}
	},


	saveOrder : function(data){
		var that = this;
		console.log("data",data);
		var name = this.getView().getModel().getProperty("/user/id");
		var menu = this.getView().getModel().getProperty("/menu").charAt(0);

		var url = "http://127.0.0.1:8000/api/db/"+name+"/"+menu;

		sap.ui.SplitApp.Gateway.post(url,data,function(err,model){
			if(err) return err;

			if(model == 1){
				console.log("save success");
				that.getView().getModel().setProperty('orders',model);
				that.getView().refresh(true);
			}
		});
	},

	getItemId : function(event){
		if(!event) return;

		var orders = this.getView().getModel().getProperty('/orders');
		var orderTable = this.getView().byId('orderTable');
		var context = event.getSource();
		var sPath = context.getBindingContext().sPath;
		var itemId = sPath.substring(sPath.length-1,sPath.length);
		console.log('itemId',itemId);
		var id = orders[itemId].id;
		return id;
	},

	deleteItem : function(evt){
		console.log('dentro deleteItem')
		var id = this.getItemId(evt);
		var url = 'http://127.0.0.1:8000/api/db/delete/'+id;
		sap.ui.SplitApp.Gateway.deleteItem(url,function(err,res){
			if(err) return err;

			console.log('deleted ',res);
		})
	},

	getDefaultStart : function(date){
		var start = new Date(date.setHours(9));
		start.setMinutes(0);
		start.setSeconds(0);
		return start;
	},

	getDefaultEnd : function(date){
		var end = new Date(date.setHours(18));
		end.setMinutes(0);
		end.setSeconds(0);
		return end;
	},

	editItem : function(evt){
		console.log('dentro editItem');
		console.log('evt',evt);
		var id = this.getItemId(evt);

		var oAppointment = evt.getSource();
		var oFrag =  sap.ui.core.Fragment,
		that = this,
		oAppBC,
		oSelectCommesse,
		oSelectedItemCommesse,
		oDateTimePickerStart,
		oDateTimePickerEnd,
		oSelectFornitori,
		oSelectedItemFornitori,
		oOKButton;

		if (!this._oDetailsPopover) {

			this._oDetailsPopover = sap.ui.xmlfragment("EditFrag", "sap.ui.SplitApp.view.Edit", this);
			this.getView().addDependent(this._oDetailsPopover);
		}

		// the binding context is needed, because later when the OK button is clicked, the information must be updated
		oAppBC = oAppointment.getBindingContext();
		console.log("oAppBC",oAppBC)

		console.log("oAppointemnt",oAppointment)

		this._oDetailsPopover.setBindingContext(oAppBC);
		console.log("_oDetailsPopover",this._oDetailsPopover)
		oModel = that.getView().getModel();

		oDateTimePickerStart = sap.ui.core.Fragment.byId("EditFrag", "startDate");
		oDateTimePickerEnd = sap.ui.core.Fragment.byId("EditFrag", "endDate");

		oOKButton = sap.ui.core.Fragment.byId("EditFrag", "OKButton");


		oDateTimePickerStart.setDateValue(this.getDefaultStart(new Date()));
		oDateTimePickerEnd.setDateValue(this.getDefaultEnd(new Date()));
//		oSupplierInput.setValue(oAppointment.getText());

		oDateTimePickerStart.setValueState("None");
		oDateTimePickerEnd.setValueState("None");

//		this.updateButtonEnabledStateForDate(oDateTimePickerStart,oDateTimePickerEnd,oOKButton);
		this._oDetailsPopover.openBy(oAppointment);

	},

	handleOkButton: function (oEvent) {

		console.log("dentro handleOkButton")
		var that = this;
		var sPath = oEvent.getSource().getBindingContext().sPath;
		var index = sPath.substring(sPath.length-1,sPath.length);
		var model = this.getView().getModel();
		var id = model.getProperty('/orders')[index].id;
		console.log(id);
		var oFrag =  sap.ui.core.Fragment,
		oSelectCommessa = sap.ui.core.Fragment.byId("EditFrag", "selectCommessa"),
		oStartValue = sap.ui.core.Fragment.byId("EditFrag", "startDate").getValue(),
		oEndValue = sap.ui.core.Fragment.byId("EditFrag", "endDate").getValue(),
		oSelectFornitore = sap.ui.core.Fragment.byId("EditFrag", "selectFornitore"),
		oButton = sap.ui.core.Fragment.byId("EditFrag", "OKButton"),
		sAppointmentPath = this._oDetailsPopover.getBindingContext().sPath;

		if(oSelectCommessa.getSelectedItem() == null || oSelectFornitore.getSelectedItem() == null || oStartValue == "" || oEndValue == ""){
			sap.m.MessageToast.show("Inserisci tutti i campi", {
			    duration: 3000,                  // default
			    width: "15em",                   // default
			    my: "center top",             // default
			    at: "center top",             // default
			    of: that._oDetailsPopover,                      // default
			    offset: "0 0",                   // default
			    collision: "fit fit",            // default
			    onClose: null,                   // default
			    autoClose: true,                 // default
			    animationTimingFunction: "ease", // default
			    animationDuration: 1000,         // default
			    closeOnBrowserNavigation: true   // default
			});
			return
		}
		var itemToMod = {
					idOrder : oSelectCommessa.getSelectedKey(),
					order : oSelectCommessa.getSelectedItem().getText(),
					supplier : oSelectFornitore.getSelectedItem().getText(),
					hours : ((oEndValue-oStartValue)+1)
			};

		var url = 'http://127.0.0.1:8000/api/db/put/'+id;
		sap.ui.SplitApp.Gateway.put(url,itemToMod,function(err,res){
			if(err) return err;

			model.refresh(true);
		})

		this._oDetailsPopover.close();
	},

	handleCancelButton : function(evt){
		this._oDetailsPopover.close();
	},

	updateButtonEnabledStateForDate: function (oDateTimePickerStart, oDateTimePickerEnd, oButton) {
		console.log("dentro updateButtonEnabledStateForDate")
		var bEnabled = oDateTimePickerStart.getValueState() !== "Error"
						&& oDateTimePickerStart.getValue() !== ""
							&& oDateTimePickerEnd.getValue() !== ""
								&& oDateTimePickerEnd.getValueState() !== "Error";

		oButton.setEnabled(bEnabled);
	},

	updateButtonEnabledStateForOrder : function(oSelect,oButton){

		console.log("dentroupdateButtonEnabledStateForOrder");
		var bEnabled = oSelect.getSelectedItem() != null;

		oButton.setEnabled(bEnabled)
	},

	_validateDateTimePicker: function (sValue, oDateTimePicker) {

		console.log("dentro _validateDateTimePicker")
		if (sValue === "") {
			oDateTimePicker.setValueState("Error");
		} else {
			oDateTimePicker.setValueState("None");
		}

	},

	_validateSelect : function (oSelect){
		if(oSelect.getSelectedItem()){
			oSelect.setValueState("None");
		}
		else{
			console.log("oSelect vuoto")
			oSelect.setValueState("Error")
			oSelect.setValueStateText("Inserisci un campo")
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
