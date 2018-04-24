jQuery.sap.declare("sap.ui.SplitApp.Gateway");

sap.ui.SplitApp.Gateway = {
		
	get : function(url,cb){
		console.log("get ajax data");
		$.ajax({
			  url: url,
				method: 'GET',
				crossDomain: true,
				contentType : "application/json",
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
		$.ajax({
			url : url,
			method : 'PUT',
			data : JSON.stringify(dati),
			crossDomain: true,
			contentType : "application/json",
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
		$.ajax({
			  url: url,
			  method: 'POST',
				data : JSON.stringify(dati),
				crossDomain: true,
				contentType : "application/json",
			  success: function(data,textStatus,jqXHR) {
				console.log("data",data);
				$( "#postResponse" ).text(data);
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
		$.ajax({
			url : url,
			method : 'DELETE',
			crossDomain : true,
			contentType : "application/json",
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