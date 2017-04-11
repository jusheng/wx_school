mui.init();
mui.ready(function(){
	
		var v = new Vue({
		el:"body",
		data:{
			record:{
			"isRemind":false
			},
			title:"",
			ftype:[
                    {
                        "id":1,
                        "name":"学生"
                    },
                    {
                        "id":2,
                        "name":"老师"
                    },
                    {
                        "id":0,
                        "name":"全部"
                    }
            ]
		},
		methods:{
		submit:function(){
			console.log(this.record.title);
			console.log(this.record.remindTime);
			if(this.record.title=="" || (this.record.title==undefined)){
				mui.toast('请输入标题！');
				return false;
			}
			if(this.record.sectorId=="" || (this.record.sectorId==undefined)){
				mui.toast('请选择板版块！');
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
			
			if(mui.get_params("add-bbs").id){
				mui.format(this.record,".");
				mui.POST("/scl/bbs/publish",this.record,success,error);
			}else{
				mui.POST("/scl/bbs/add",this.record,success,error);
			}
		}
	}
	});
	if(mui.get_params("add-bbs").id){
		v.$set("title","修改公告");
		var success = function(result){
			console.log(result);
			v.$set("record",result.data);
		}
		
		mui.POST("/scl/bbs/read/detail",{"id":mui.get_params("add-bbs").id},success);
	}else{
		v.$set("title","添加公告");
	};
	console.log(v.ftype);
	var get_type = function(){
						var success = function(result){						
						v.$set("types",result.data.list);
						
						}
						var error = function(result){
							mui.toast(result.msg);
						}
						mui.POST("/scl/bbs/plate/read/list",{},success,error);
				}
	get_type();
	
})
