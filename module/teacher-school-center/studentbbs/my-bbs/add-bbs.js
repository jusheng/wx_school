mui.init();
mui.ready(function(){
	 Vue.config.debug = true;// 开启vue 调试功能
    new Vue({
        el: '#app',
        data: {
            images: []
        },
        methods: {
            addPic(e){
                e.preventDefault();
                $('input[type=file]').trigger('click');
                return false;
            },
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)return; 
                this.createImage(files);

            },
            createImage(file) {
                if(typeof FileReader==='undefined'){
                    alert('您的浏览器不支持图片上传，请升级您的浏览器');
                    return false;
                }
                var image = new Image();         
                var vm = this;
                var leng=file.length;
                for(var i=0;i<leng;i++){
                    var reader = new FileReader();
                    reader.readAsDataURL(file[i]); 
                    reader.onload =function(e){
                    vm.images.push(e.target.result);                                    
                    };                 
                }                        
            },
            delImage:function(index){
                this.images.shift(index);
            },
            removeImage: function(e) {
                this.images = [];
            },
            uploadImage: function() {
                console.log(this.images);
                return false;
                var obj = {};
                obj.images=this.images
                $.ajax({
                    type: 'post',
                    url: "/upload/file",
                    data: obj,
                    dataType: "json",
                    success: function(data) {
                        if(data.status){
                            alert(data.msg);
                            return false;
                        }else{
                            alert(data.msg);
                            return false;
                        }
                    }
                });
            }
        }
    })
    
    
    
		var v = new Vue({
		el:"body",
		data:{
			record:{
			"isRemind":false
			},
			title:""
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
		v.$set("title","修改帖子");
		var success = function(result){
			console.log(result);
			v.$set("record",result.data);
		}
		
		mui.POST("/scl/bbs/read/detail",{"id":mui.get_params("add-bbs").id},success);
	}else{
		v.$set("title","添加帖子");
	};
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
