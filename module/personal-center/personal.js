mui.init();
	mui.ready(function() {
					
					var v = new Vue({
						el:".userbox",
						data:{
							data:""
						}
					});
					
					var seach = function(){
								var success = function(result){
								console.log(result);
								v.$set("data",result.data);
								console.log(v.data);
								var roles=v.data.ownerRoles;
								var temp=[];
								console.log(roles.length);
								for(var i=0;i<roles.length;i++){
									temp.push(roles[i].roleName);
								}
								
								userPicker.setData(temp);
								}
								var error = function(result){
									mui.toast(result.msg);
								}
								mui.POST("/read/user/info",{},success,error);
						}
					seach();
					
					
					//普通示例
					var userPicker = new mui.PopPicker();
                   
					var showUserPickerButton = document.getElementById('showUserPicker');
					var userResult = document.getElementById('userResult');
					showUserPickerButton.addEventListener('tap', function(event) {
						userPicker.show(function(items) {
							userResult.innerText = items[0];
							//返回 false 可以阻止选择框的关闭
							//return false;
						});
					}, false);
					
	});