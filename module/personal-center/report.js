mui.init();
mui.ready(function(){

		var v = new Vue({
		el:".module_lay",
		data:{
			data:"",
			feedback:""
		},
		methods:{
			add:function(){
				seach();
				}
		}
	});
	
	var seach = function(){
				var success = function(result){
					
					v.$set("data",result.data);
					v.$set("feedback",result.data);
					document.getElementById("toastBtn").addEventListener('tap', function() {
						mui.toast('提交成功');
					});
				}
				var error = function(result){
					mui.toast(result.msg);
				}
				mui.POST("/edu/feedback/add",v.feedback,success,error);
	}


})
