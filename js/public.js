


mui.POST = function(url,data,success,error){
	mui.post(
		url,
		data,
		function(result){
			 if(result.httpCode==401){ //没有登录
                mui.openWindow(modules_obj["login"])
             }

             if(result.httpCode==200){
                success(result);
             }else{
                error && error(result);
             }
		}
	)
}

mui.format=function(obj,ico){

    for(var i in obj){
       if(Object.prototype.toString.call(obj[i])=='[object Object]'){
           for(var j in obj[i]){
                 j!="createTime" && j!="updateTime" && obj[i][j]!=null && (obj[i+ico+j]=obj[i][j]);
            }
          delete obj[i];
        }

        if(obj[i]==null){
          delete obj[i];
        }
    }

    delete obj.updateTime;
    delete obj.createTime;

  };

mui.hash_change = function(){
	if( ("onhashchange" in window) && ((typeof document.documentMode==='undefined') || document.documentMode==8)) {
		//if( ("onhashchange" in window)) {	


		    // 浏览器支持onhashchange事件


		    window.onhashchange = function(){
		    	location.reload();
		    };  // TODO，对应新的hash执行的操作函数


		} else {
		    // 不支持则用定时器检测的办法


		    //alert('ie');


		    setInterval(function(){
		    	location.reload();
		    }, 100);
		}; 
}



//取得参数
mui.get_params = function(id){
	
	 var p_arr = (location.hash!="") && location.hash.replace("#/","").split("/");
	 var obj = {};
	 
	 //为配置对象中的参数名对应
	 if(modules_obj[id].params && (p_arr.length>0)){
	 	
	 	for(var i = 0; i < p_arr.length; i ++){
	 		modules_obj[id].params[i] && (obj[modules_obj[id].params[i]] = p_arr[i]);
	 	}
	 	
	 }
    
 	return 	obj;
}

mui.ready(function(){
	
	
	//统一处理打开页面 （元素格式要求）
	// 1、添加openWindow类 
	// 2、必须有id  (为了取得模板地址 在modules_template.js)
	// 3、属性 data-params选添  (传参)
	mui("body").on("tap",".openWindow",function(ev){
	
		//this.dataset.params && localStorage.setItem(this.id,this.dataset.params);
		//console.log(mui.parseJSON('{"id":5}'));
//		var params_obj = mui.parseJSON(this.dataset.params);
//		for(var i in params_obj){
//				localStorage.setItem(i,params_obj[i]);
//			
//		}
	
		
		
//		if(this.dataset.params){
//			
//			var temp = {};
//			for (var i in  modules_obj[this.id]) {
//				temp[i] = modules_obj[this.id][i];
//			}
//			
//			
//			mui.extend(modules_obj[this.id],{extras:mui.parseJSON(this.dataset.params)});
//			
//		};
		
		//----处理参数的问题------
		//先复制一个份配置对象
		var temp = {};
		for (var i in  modules_obj[this.id]) {
			temp[i] = modules_obj[this.id][i];
		}
		if(this.dataset.params && this.dataset.params !="" ){
			
			var p_obj = this.dataset.params.split(',');
			var t="#";
			for(var i = 0; i<p_obj.length; i ++){
				t += "/"+p_obj[i];
			}
			console.log(t);
			temp.url +=t;
			console.log(temp);
		}

		
		if(!modules_obj[this.id]){
			mui.toast('请在modules_config.js文件中配置该应用模板！');
			return false;
		}
		
		
		mui.openWindow(temp);
		
		
	})
	
	
})
