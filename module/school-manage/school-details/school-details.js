mui.init();
mui.ready(function(){
		var v = new Vue({
		el:"body",
		data:{
			data:{}
		},
		methods:{
			submit:function(){
				var success = function(){
					mui.toast('操作成功！');
					setTimeout(function(){
						mui.back();
					},500);
				};
				var error = function(result){
					mui.toast(result.msg);
				}
				mui.format(this.data,".");
				mui.POST("/school/update",this.data,success,error);
			
			}
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
				mui.POST("/school/read/detail",{},success,error);
		}
	seach();
	
	var get_scope = function(){
				var success = function(result){
				console.log(result);
				v.$set("scopes",result.data.list);
				console.log(v.scopes);
				}
				var error = function(result){
					mui.toast(result.msg);
				}
				mui.POST("/dic/read/list",{"key":"SCHOOL_SCOPE"},success,error);
		}
	get_scope();
	var get_type = function(){
				var success = function(result){
				console.log(result);
				v.$set("types",result.data.list);
				}
				var error = function(result){
					mui.toast(result.msg);
				}
				mui.POST("/dic/read/list",{"key":"GRADE_TYPE"},success,error);
		}
	get_type();
	var get_nature = function(){
				var success = function(result){
				console.log(result);
				v.$set("natures",result.data.list);
				}
				var error = function(result){
					mui.toast(result.msg);
				}
				mui.POST("/dic/read/list",{"key":"SCHOOL_NATURE"},success,error);
		}
	get_nature();
	var submit = function(){
				var success = function(result){
				console.log(result);
				v.$set("natures",result.data.list);
				}
				var error = function(result){
					mui.toast(result.msg);
				}
				mui.POST("/school/update",{data},success,error);
	}
})
