mui.init();
mui.ready(function(){
		var v = new Vue({
		el:"body",
		data:{
			list:"",
			message:""
		},
		methods:{
			
		}
	});
	var seach = function(){
				var success = function(result){
				console.log(result);
				v.$set("list",result.data);
				
				if(result.data.length>0){
					gethisroryscore(result.data[0]);
					v.$set("curr_id",result.data[0].id);
				}
				
				v.$set("w",result.data.length*68);
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
				};
				
				v.$set("list_click",function(obj){
					v.$set("curr_id",obj.id);
					gethisroryscore(obj);
				});
				
				
				var error = function(result){
					mui.toast(result.msg);
				}
				mui.POST("/res/exam/score/read/current/subject",{},success,error);
		}
	seach();
	
	
	var gethisroryscore = function(obj){
		
				var success = function(result){
					console.log(result);
					var code = obj.code;
	                var a=function (){
	                	    var names = [];
	                        if(result.data["historyScore"].length==0)return names;
	                        for(var i=0;i<result.data["historyScore"].length;i++){
	                            var tmp =[];
	                            tmp= result.data["historyScore"][i].exam.name;
	                            names.push(tmp);
	                        }
	                        return names;
	                  };
	                var x_name = a();
	                console.log(x_name);
	                
	                var b=function (){
	                		var score = [];
	                        if(result.data["historyScore"].length==0)return score;
	                        for(var i=0;i<result.data["historyScore"].length;i++){
	                            var tmp =[];
	                            tmp= result.data["historyScore"][i][obj.code];
	                            score.push(tmp);
	                        }
	                        return score;
	                  };
		            
		            var personnal_cj = b(); 
		            console.log(b());
	                
	                var c=function (){
	                		var score = [];
	                        if(result.data["classHistoryAvg"].length==0)return score;
	                        for(var i=0;i<result.data["classHistoryAvg"].length;i++){
	                            var tmp =[];
	                            tmp= result.data["classHistoryAvg"][i][obj.code];
	                            score.push(tmp);
	                        }
	                        return score;
	                  };
	                
	                var class_avg = c();
	                console.log(c());
	                var d=function (){
	                		var score = [];
	                        if(result.data["gradeHistoryAvg"].length==0)return score;
	                        for(var i=0;i<result.data["gradeHistoryAvg"].length;i++){
	                            var tmp =[];
	                            tmp= result.data["gradeHistoryAvg"][i][obj.code];
	                            score.push(tmp);
	                        }
	                        return score;
	                  };
	                
	                var grade_avg = d();
	                console.log(d());
	                
	                var yz = function(avg){
	                	for(var i=0;i<avg.length;i++){
		                	if(avg[i]==null){
		                		avg[i] =  0;
		                	}
	                	}
	                }
	                yz(class_avg);
	                yz(grade_avg);
	                
	                x_name = x_name.length==0?[""]:x_name;
	                personnal_cj = personnal_cj.length==0?[""]:personnal_cj;
	                class_avg = class_avg.length==0?[""]:class_avg;
	                grade_avg = grade_avg.length==0?[""]:grade_avg;
	                
					var lineChart = echarts.init(byId('lineChart'));
					lineChart.setOption(getOption('line',x_name,personnal_cj,class_avg,grade_avg));
				
				}
				var error = function(result){
					mui.toast(result.msg);
				}
				mui.POST("/res/exam/score/read/score/history",{"examId":obj.id},success,error);
	}
	
	//getoptions
	var getOption = function(chartType,a,b,c,d) {
				var chartOption = chartType == 'pie' ? {
					calculable: false,
					series: [{
						name: '访问来源',
						type: 'pie',
						radius: '65%',
						center: ['50%', '50%'],
						data: [{
							value: 335,
							name: '直接访问'
						}, {
							value: 310,
							name: '邮件营销'
						}, {
							value: 234,
							name: '联盟广告'
						}, {
							value: 135,
							name: '视频广告'
						}, {
							value: 1548,
							name: '搜索引擎'
						}]
					}]
				} : {
					legend: {
						orient: 'horizontal', // 'vertical'
						x: 'center', // 'center' | 'left' | {number},
						y: 'bottom',
						data: ['个人成绩', '班级平均成绩','年级平均成绩'],
						itemGap:5,
						textStyle: {
					        color: '#fff'
					    }
					},
					grid: {
						x: 30,
						x2: 10,
						y: 30,
						y2: 60
					},
					toolbox: {
						show: false,
						feature: {
							mark: {
								show: true
							},
							dataView: {
								show: true,
								readOnly: false
							},
							magicType: {
								show: true,
								type: ['line', 'bar']
							},
							restore: {
								show: true
							},
							saveAsImage: {
								show: true
							}
						}
					},
					calculable: false,
					xAxis: [{
						type: 'category',
						axisLabel: {
                                textStyle: {
                                    color: '#fff'
                                }
                       },
						data: a
					}],
					yAxis: [{
						type: 'value',
						min:0,
						max:100,
						axisLabel: {
                                textStyle: {
                                    color: '#fff'
                                }
                       },
						splitArea:{
							show: true
						},
						splitNumber:10
					}],
					series: [{
						name: '个人成绩',
						type: chartType,
						symbol:"circle",
						itemStyle:{
							normal:{
								color:'#fd1e7a',
								lineStyle:{
									color:'#fd1e7a'
								}
							}
						},
						data: b
					}, 
					{
						name: '班级平均成绩',
						type: chartType,
						symbol:"circle",
						normal:{
							color:'#fd1e7a',
							lineStyle:{
								color:'#fd1e7a'
							}
					},
						data: c
					},
					{
						name: '年级平均成绩',
						type: chartType,
						symbol:"circle",
						normal:{
							color:'#fd1e7a',
							lineStyle:{
								color:'#fd1e7a'
							}
					},
						data: d
					}]
				};
				return chartOption;
			};
			var byId = function(id) {
				return document.getElementById(id);
			};

			//var lineChart = echarts.init(byId('lineChart'));
			//lineChart.setOption(getOption('line'));


})
