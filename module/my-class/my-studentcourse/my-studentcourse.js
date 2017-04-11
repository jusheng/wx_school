mui.init();
mui.ready(function(){
	var v = new Vue({
		el:".tr_list",
		data:{
			data:"",
			dict:""
		}
	});
	
	var seach = function(){
				var success = function(result){
				console.log(result);
				v.$set("data",result.data);
//				console.log(v.data);
				}
				var error = function(result){
					mui.toast(result.msg);
				}
				mui.POST("/edu/schedule/read/all",{},success,error);
		}
	seach();
	
	//获取科目字典
    var dict = function () {
                var success = function (result) {
                	console.log(result);
                    v.$set("dict",result.data);
                }
                var error = function (result) {
                    mui.toast(result.msg);
                }
                mui.POST('/dic/read/key', {key:"SCHEDULE_TIME_ZONE"}, success, error);
            }
    dict();

})
