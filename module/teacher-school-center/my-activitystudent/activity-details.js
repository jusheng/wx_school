mui.init();
mui.ready(function(){
	
	var a_click = function(t){
		
	}
		var v = new Vue({
			el:".module_lay",
			data:{
				data:[]
			}
		});
		
		
	
	var get_details = function(){
				var success = function(result){
				console.log(result);
				v.$set("data",[result.data]);
						setTimeout(function(){
								var aWidth=$(window).width();
								var aHeight=aWidth*0.4;
								$(".imgbox").height(aHeight);
							},200);
				}
				var error = function(result){
					mui.toast(result.msg);
				}
				mui.POST("/scl/activity/getListById",{"id":mui.get_params("activity-details").id},success,error);
	}
	get_details();
})
