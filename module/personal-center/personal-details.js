mui.init();
mui.ready(function(){
	
		var v = new Vue({
			el:".mui-card",
			data:{
				data:"",
				type:"",
				scope:"",
				nature:""
			}
		})
	
	var get_details = function(){
				var success = function(result){
				console.log(result);
				v.$set("data",result.data);
				//console.log(v.data);
				}
				var error = function(result){
					mui.toast(result.msg);
				}
				mui.POST("/user/read/userDetail",{},success,error);
	}
	get_details();
//	学校类型
	var get_type = function(){
		var success = function(result){
				console.log(result);
				for(var i=0;i<result.data.list.length;i++){
					if(result.data.list[i].code==v.data[1].type){
						v.data[1].typeName= result.data.list[i].codeText;
					}
				}
				console.log(v.data[1].typeName);
				
				v.$set("type",v.data[1].typeName);
				console.log(v.type);
				}
				var error = function(result){
					mui.toast(result.msg);
				}
				mui.POST("/dic/read/list",{"key":"GRADE_TYPE"},success,error);
	}
	get_type();
	//学校规模
	var get_scope = function(){
		var success = function(result){
				console.log(result);
				for(var i=0;i<result.data.list.length;i++){
					if(result.data.list[i].code==v.data[1].scope){
						v.data[1].scopeName= result.data.list[i].codeText;
					}
				}
				console.log(v.data[1].scopeName);
				
				v.$set("scope",v.data[1].scopeName);
		
				}
				var error = function(result){
					mui.toast(result.msg);
				}
				mui.POST("/dic/read/list",{"key":"SCHOOL_SCOPE"},success,error);
	}
	get_scope();
	//学校性质
	var get_nature = function(){
		var success = function(result){
				console.log(result);
				for(var i=0;i<result.data.list.length;i++){
					if(result.data.list[i].code==v.data[1].nature){
						v.data[1].natureName= result.data.list[i].codeText;
					}
				}

				v.$set("nature",v.data[1].natureName);
				}
				var error = function(result){
					mui.toast(result.msg);
				}
				mui.POST("/dic/read/list",{"key":"SCHOOL_NATURE"},success,error);
	}
	get_nature();
})


