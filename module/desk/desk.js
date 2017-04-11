mui.init();

mui.ready(function(){
	
	mui.hash_change();
	var app_title = new Vue({
		el:".mui-title",
		data:{
			title:""
		}
	})
	
	
	//取得个人信息
	var get_user_info = function(){
		
		mui.POST(
			"/read/user/info",
			{},
			function(msg){
				console.log();
				new Vue({
					el:".user_content",
					data:msg.data,
					methods:{
						chage_role:function(roleId){
							change_role(roleId);
						}
					}
				})
			}
		)
	}
	
	//切换角色
	var change_role = function(roleId){
		var success = function(result){
			location.reload();
       };

        mui.POST("/switch/user",{"roleId":roleId},success);
	}
	
	var app_vm = new Vue({
					el:".app_lay",
					data:{
						"record":null,
						"title":"",
						"tip":""
					}
//					methods:{
//						re_modulename:function(){
//							
//						}
//					}
					
	});
	
	//取得所有模块
	var get_modules = function(desk_obj){
		var success = function(result){
			new Vue({
				el:".module_lay",
				data:result,
				methods:{
					set_desk:function(sign){
						alert(sign);
					}
				}
			})
			
			//各个桌面数据统一做处理
			if(desk_obj!=null){
				if(Object.prototype.toString.call(desk_obj)=='[object Array]'){  //其它模块桌面
					app_vm.$set("record",(desk_obj!=null?{"app":desk_obj}:{}));
				}else{ //我的桌面
					app_vm.$set("record",(desk_obj!=null?desk_obj:{}));
				}
				
				app_vm.$set("re_modulename",function(id){
							
							for(var i=0; i<result.data.length; i++){
								if(result.data[i].id==id){
									return result.data[i].name;
									break;
								}
							}
							
							return "";
							
					});
			}
			
			
       };

        mui.POST("/user/getRoleTopApp",{},success);
	}
	
	var init = function(params_obj){
		
		console.log(params_obj);
		//取得桌面数据
		mui.POST(
			"/user/getDesktop",
			{"module":params_obj.module},
			function(msg){
				
				//取得个人信息
				get_user_info();
				
				//取得模块
				//判断是否有桌面数据
				if(msg.data && msg.data.ios){
					var obj = mui.parseJSON(msg.data.ios);
					get_modules(obj);
				}else{
					get_modules(null);
					app_vm.$set("record",{});
					app_vm.$set("tip","<br><p>暂无桌面应用，请到应用中心添加！</p>");
				}
				
				//app_title.$set("title",params_obj.title);
				app_title.$set("title",decodeURI(params_obj.title));
				
				
			}
		)
		
	}
	init(mui.get_params("desk"));
	
	
	
	//退出
	mui(".aside_bottom").on("tap",'.quit',function(){
		
		mui.POST("/logout",{},function(msg){
			init(mui.get_params("desk"));
		});
	})
	
	
})