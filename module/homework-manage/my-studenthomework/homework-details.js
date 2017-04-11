mui.init();
mui.ready(function(){
	
	var a_click = function(t){
		
	}
		var v = new Vue({
			el:".mui-table-view",
			data:{
				data:[]
			}
		});
		
		
	
	var get_details = function(){
				var success = function(result){
				console.log(result);
				v.$set("data",[result.data]);
				//console.log(v.data);
				v.$set('f',function(){
					alert('ddd');
				})
				}
				var error = function(result){
					mui.toast(result.msg);
				}
				mui.POST("/homework/stuhomeworkDetail",{"id":mui.get_params("homework-details").id},success,error);
	}
	get_details();
})
