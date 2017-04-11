
mui.init();
mui.ready(function(){
	
	var a_click = function(t){
		
	}
		var v = new Vue({
			el:"body",
			data:{
				data:[]
			},
			methods:{
				f:function(t){
					a_click(t);
				}
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
				mui.POST("/scl/news/read/detail",{"id":mui.get_params("news-details").id},success,error);
	}
	get_details();

	
})

