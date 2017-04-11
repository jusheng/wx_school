

mui.init()

mui.ready(function(){
	
	var save_desk = function(curr_desk,sign,callback){
		var success = function(result){
			
			callback();
		}
		
		mui.POST("/user/saveDesktop",{"module":sign,"ios":JSON.stringify(curr_desk)},success);
	}
	
	//取得桌面
	var get_desk = function(callback,sign){
		
		var success = function(result){
			callback(result);
		}
		
		mui.POST("/user/getDesktop",{"module":sign},success);
		
	}
	
	
	//从桌面删除应用
	var del_desk = function(v){
		
		var callback = function(result){
			var curr_desk = mui.parseJSON(result.data.ios);
			
			//判断桌面是否存在 该app所在的模块
			if(curr_desk[v.pid]){
				
				var t; //记录app在数组中的位置
				for(var i=0;i<curr_desk[v.pid].length;i++){
					if(parseInt(curr_desk[v.pid][i].ID)==v.id){
						t = i;
						break;
					}
				}
				
			 (typeof t != undefined) && curr_desk[v.pid].splice(t,1);
				
			}
			
			
			save_desk(curr_desk,"appdesktop",function(){
				v.deskFlag = 0;
				mui.toast('操作成功！');
			})
			
		}
		
		get_desk(callback,'appdesktop');
		
	}
	
	//添加应用到桌面
	var add_desk = function(v){
		console.log(v.identify);
		var callback = function(result){
			console.log(result);
			if(result.data && result.data.ios!="" && result.data.ios!=null){
				var curr_desk = mui.parseJSON(result.data.ios);
			}else{
				var curr_desk = {};
			}
			
			
			//判断桌面是否存在 该app所在的模块
			if(curr_desk[v.pid]){
				curr_desk[v.pid].push(
					{
						ID:v.id,
						name:v.name,
						imgUrlApp:v.imgUrlApp,
						identify:v.identify
					}
				)
			}else{
				curr_desk[v.pid] = [
					{
						ID:v.id,
						name:v.name,
						imgUrlApp:v.imgUrlApp,
						identify:v.identify
					}
				]
				
			}
			
			
			save_desk(curr_desk,"appdesktop",function(){
				v.deskFlag = 1;
				mui.toast('操作成功！');
			})
			
		}
		
		get_desk(callback,'appdesktop');
		
	}
	
	
	//添加应用到相应模块桌面
	var add_module = function(v){
		console.log(v.pid);
		
		var callback = function(result){
			if(result.data.ios == null){
				var curr_desk = [];
			}else{
				var curr_desk = mui.parseJSON(result.data.ios);
			}
			
			curr_desk.push(
				{
					ID:v.id,
					name:v.name,
					imgUrlApp:v.imgUrlApp,
					identify:v.identify
				}
			);
			
			
			save_desk(curr_desk,'app'+v.pid,function(){
				v.moduleFlag = 1;
				mui.toast('操作成功！');
			})
			
			
		}
		
		
		get_desk(callback,'app'+v.pid);
	}
	
	
	//从模块桌面删除应用
	var del_module = function(v){
		var callback = function(result){
			
			var curr_desk = mui.parseJSON(result.data.ios);
			
			var t;
			for (var i = 0; i < curr_desk.length; i ++) {
				if(parseInt(curr_desk[i].ID) == v.id){
					t = i;
					break;
				}
			}
			
			(typeof t != undefined) && curr_desk.splice(t,1);
			
			
			save_desk(curr_desk,'app'+v.pid,function(){
				v.moduleFlag = 0;
				mui.toast('操作成功！');
			})
			
			
		}
		
		
		get_desk(callback,'app'+v.pid);
	}
	
	//取得应用
	var list_data_obj = new Vue({
		el:".mui-content",
		data:{
			record:null
		},
		methods:{
			add_desk:function(v){  //添加到桌面
				add_desk(v);
			},
			del_desk:function(v){  //从桌面删除
				del_desk(v);
			},
			add_module:function(v){ //添加到相应模块桌面
				add_module(v);
			},
			del_module:function(v){ //从相应模块从删除
				del_module(v);
			}
		}
	});
	
	var get_app = function(pid){
		list_data_obj.$set('record',null);
		var sucess = function(result){
			
			list_data_obj.$set('record',result.data);
			
			mui('#offCanvasContentScroll').scroll().scrollTo(0,0,100);
		}
		if(pid && pid!=0){
			mui.POST("/user/getUserRoleApp",{"device":"app","pid":pid},sucess);	
		}else{
			mui.POST("/user/getUserRoleApp",{"device":"app"},sucess);	
		}
		
	}
	
	//取得所有模块
	var get_modules = function(desk_obj){
		var success = function(result){
			var len = result.data.length + 1;
			var w = len * 80;
			console.log(w);
			new Vue({
				el:".module_lay",
				data:{
					data:result.data,
					w:w,
					curr_id:0
				},
				methods:{
					set_curr_id:function(pid){
						this.curr_id = pid;
					},
					get_app_by_module:function(id){
						get_app(id);
						this.set_curr_id(id);
					}
				}
			})
			
			mui(".module_lay").scroll(
				{
				 scrollY: false, //是否竖向滚动
				 scrollX: true, //是否横向滚动
				 startX: 0, //初始化时滚动至x
				 startY: 0, //初始化时滚动至y
				 indicators: false, //是否显示滚动条
				 deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
				 bounce: true, //是否启用回弹
				}
			)
			mui(".module_lay").on('tap', 'li', function (event) {
				this.click();
				//offCanvasWrapper.offCanvas('close');
			});
			
			get_app();
			
			
       };

        mui.POST("/user/getRoleTopApp",{},success);
	}
	
	get_modules();
	
	
	
	
	
})

