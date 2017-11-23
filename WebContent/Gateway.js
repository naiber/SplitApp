jQuery.sap.declare("sap.ui.SplitApp.Gateway");

sap.ui.SplitApp.Gateway = {
		
	userLogged : {
		user : {}
	},
	
	setUser : function(data){
		console.log("dentro setUser");
		this.userLogged.user = data
	},
	
	getUser : function(){
		console.log("dentro getUser");
		return this.userLogged.user;
	},
	
	getAjax : function(url){
		console.log("get ajax data");
		var user = {};
		$.ajax({
			  url: url,
			  method: 'GET',
			  success: function(data,textStatus,jqXHR) {
			    console.log("success: "+data.name)
			    user.name = data.name;
			    user.appointment = data.appointment;
			    return user;
//			    model.setProperty("/user",user);
//				model.refresh(true)
			  },
			  error: function(jqXHR,textStatus,err) {
			    console.log('error:' + err)
			    return err;
//			    model.setProperty("/user",{})
			  }
			});
	},
	
	getOData : function(url,callback){
		console.log("get odata");
//		var odata = new sap.ui.model.odata.v2.ODataModel(url)
//		odata.read("",{
//			success : function(data,response){
//				model.setProperty("/user",data)
//			},
//			error : function(error){
//				console.log("errore: ",error)
//			}
//		})
	},
	
	post : function(url,dati){
		console.log("dentro post")
		var that = this;
		$.ajax({
			  url: url,
			  method: 'POST',
			  data : dati,
			  success: function(data,textStatus,jqXHR) {
				console.log("data",data[1]);
				that.setUser(data[1]);
			  },
			  error: function(jqXHR,textStatus,err) {
			    console.log('error:' + err);
			  }
			})
			
	}
	
}