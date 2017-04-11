mui.init();
mui.ready(function(){
		var v = new Vue({
		el:".mui-table-view-cell",
		data:{
			data:""
		}
	});
	
	var get_details = function(){
				var success = function(result){
				console.log(result);
				v.$set("data",result.data);
				console.log(v.data);
				}
				var error = function(result){
					mui.toast(result.msg);
				}
				mui.POST("/classes/teacher/read/teacherDetailById",{"id":mui.get_params("teacher-details").id},success,error);
	}
	get_details();
})
