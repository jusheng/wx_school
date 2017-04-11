mui.init();
mui.ready(function(){
		var v = new Vue({
		el:"body",
		data:{
			data:"",
			massage:"",
			record:""
		},
		methods:{
				reply:function(){
					get_reply();
				}
			}
	});
	
	var get_details = function(){
				var success = function(result){
				console.log(result.data.length);
				v.$set("data",result.data);
						setTimeout(function(){
								var aWidth=$(window).width() - 30;
								var aHeight=aWidth*0.4;
								$(".imgbox").height(aHeight);
						},200);
//				console.log(aWidth);
				}
				var error = function(result){
					mui.toast(result.msg);
				}
				mui.POST("/scl/bbs/read/detail",{"id":mui.get_params("my-bbs-details").id},success,error);
	}
	get_details();
	
	var get_comment = function(){
				var success = function(result){
				console.log(result);
				v.$set("massage",result.data);
				console.log(v.massage);
				}
				var error = function(result){
					mui.toast(result.msg);
				}
				mui.POST("/scl/bbs/read/followDetailList",{"followBbsId":mui.get_params("my-bbs-details").id},success,error);
	}
	get_comment();
	var get_reply = function(){
				var success = function(result){
				console.log(result);
				v.$set("massage",result.data);
				v.$set('reply',result.data);
				console.log(v.massage);
				}
				var error = function(result){
					mui.toast(result.msg);
				}
				mui.POST("/scl/bbs/add/followMessage",{"bbsId":mui.get_params("my-bbs-details").id,"content":v.record.content},success,error);
	}
	
})
