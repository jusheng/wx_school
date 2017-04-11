mui.init();
mui.ready(function(){
		var v = new Vue({
		el:".mui-table-view",
		data:{
			data:""
		}
	});
	
	var seach = function(){
				var success = function(result){
				console.log(result);
				v.$set("data",result.data);
				console.log(v.data);
				}
				var error = function(result){
					mui.toast(result.msg);
				}
				mui.POST("/classes/cadre/read/cadreInfoByClassId",{},success,error);
		}
	seach();

})
