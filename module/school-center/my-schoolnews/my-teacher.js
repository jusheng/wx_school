mui.init();
mui.ready(function(){
	
	
	var v = new Vue({
		el:"#item1mobile",
		data:{
			data:""
		},
		methods:{
			
		}
	});
	
	
	//分类
	var vm = new Vue({
		el:".mui-slider",
		data:{
			news:"",
		}
	});
	
	var seach = function(){
				var success = function(result){
				console.log(result);
				v.$set("data",result.data.list);		
					setTimeout(function(){
						var aWidth=$(window).width();
						var aHeight=aWidth*0.4;
						$(".imgbox").height(aHeight);
					},200);
				}
				
				var error = function(result){
					mui.toast(result.msg);
				}
				mui.POST("/scl/news/read/list",{},success,error);
		}
	seach();
	var get_newssorts = function(id){
				var success = function(result){
					console.log(result);
					vm.$set("news",result.data.list);
					vm.$set("class_num",result.data.list.length);

				
				}
				var error = function(result){
					mui.toast(result.msg);
				}
				var param={"sortsId":id};
				mui.POST("/scl/newssorts/read/list",param,success,error);
		}
	get_newssorts();
	
	
	
	

});

function get_data(id,index){
	    
	    if(v.$get("data"+index)){
	    	return false;
	    }
	
		console.log(id);
		var success = function(result){
		console.log(result);
		v.$set("data"+index,result.data.list);		
			setTimeout(function(){
				var aWidth=$(window).width();
				var aHeight=aWidth*0.4;
				$(".imgbox").height(aHeight);
			},200);
		}
		
		var error = function(result){
			mui.toast(result.msg);
		}
		mui.POST("/scl/news/read/list",{"sortsId":id},success,error);
	}