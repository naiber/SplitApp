jQuery.sap.declare("sap.ui.SplitApp.Gateway");

sap.ui.SplitApp.Gateway = {
		
	get : function(url,cb){
		console.log("get ajax data");
		$.ajax({
			  url: url,
			  method: 'GET',
			  success: function(data,textStatus,jqXHR) {
			    console.log("success: "+data)
			    cb(null,data);
			  },
			  error: function(jqXHR,textStatus,err) {
			    console.log('error: ' + err)
			    cb(err,null)
			  }
			});
	},
	
	put : function(url,dati,cb){
		console.log('dentro put');
		var that = this;
		$.ajax({
			url : url,
			method : 'PUT',
			data : dati,
			success : function(data,textStatus,jqXHR) {
				console.log('data',data);
				cb(null,data);
			},
			error : function(jqXHR,textStatus,err){
				console.log('error: '+err);
				cb(err,null);
			}
		})
	},
	
	post : function(url,dati,cb){
		console.log("dentro post")
		var that = this;
		$.ajax({
			  url: url,
			  method: 'POST',
			  data : dati,
			  success: function(data,textStatus,jqXHR) {
				console.log("data",data);
				cb(null, data);
			  },
			  error: function(jqXHR,textStatus,err) {
			    console.log('error: ' + err);
			    cb(err,null);
			  }
			})		
	},
	
	deleteItem : function(url,cb){
		console.log('dentro deleteItem')
		var that= this;
		$.ajax({
			url : url,
			method : 'DELETE',
			crossDomain : true,
			success: function(data,textStatus,jqXHR) {
			    console.log("success: "+data)
			    cb(null,data);
			},
			error: function(jqXHR,textStatus,err) {
			    console.log('error: ' + err)
			    cb(err,null)
			}
		})
	}
	
}