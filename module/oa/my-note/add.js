

mui.init();

var v = new Vue({
	el:"body",
	data:{
		record:{
			"isRemind":false
		}
	},
	methods:{
		submit:function(){
			console.log(this.record.title);
			console.log(this.record.remindTime);
			console.log(this.record.content);
			
			if(this.record.title=="" || (this.record.title==undefined)){
				mui.toast('请输入标题！');
				return false;
			}
			if(this.record.remindTime=="" || (this.record.remindTime==undefined)){
				mui.toast('请选择时间！');
				return false;
			}
			
			if(this.record.content=="" || (this.record.content==undefined)){
				mui.toast('请输入内容！');
				return false;
			}
			
			
			var success = function(){
				
				mui.toast('操作成功！');
				setTimeout(function(){
					mui.back();
				},500);
			};
			var error = function(result){
				mui.toast(result.msg);
			}
			
			if(mui.get_params("my-note-add").id){
				
				mui.format(this.record,".");
				
				mui.POST("/reminder/update",this.record,success,error);
			}else{
				mui.POST("/reminder/add",this.record,success,error);
			}
			
			
		}
		
	}
});


if(mui.get_params("my-note-add").id){
	v.$set("title","修改备忘录");
	var success = function(result){
		console.log(result);
		v.$set("record",result.data);
	}
	
	mui.POST("/reminder/read/detail",{"id":mui.get_params("my-note-add").id},success);
}else{
	v.$set("title","添加备忘录");
}
