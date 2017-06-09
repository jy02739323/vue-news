<template>
	<div class="userContent">
		<div class="title">
			<router-link to="/index/travel" class="routeReset">
				<span>首页</span>
			</router-link>
			C ' NewsAPP
		</div>
		<div class="reglogBG">
			<div class="eAppLogo">
				<img :src="src" />
			</div>
			<!--登录注册-->
			<div class="showLogin" id="showLogin" v-if="isShowLog">
				<div class="regLog">
					<p>
						<label for="username">用户名:</label>
						<input type="text" name="username" id="username" v-model="logName" />
					</p>
					<p>
						<label for="password">密码:</label>
						<input type="password" name="password" id="password" v-model="logPsw" />
					</p>
				</div>
				<div class="regLogBtn">
					<button class="logBtn" id="logBtn" @click="login()">登录</button>
					<button class="regBtn" id="regBtn" @click="showReg()">注册</button>
				</div>
			</div>
		</div>
		<div class="showReg" id="showReg" v-if="isShowReg">
			<div class="regLog">
				<p>
					<label for="regUser">用户名:</label>
					<input type="text" name="regUser" id="regUser" placeholder="请输入用户名" v-model="ReName" />
				</p>
				<p>
					<label for="regPsw">密码:</label>
					<input type="password" name="regPsw" id="regPsw" placeholder="请输入密码" v-model="RegPsw" />
				</p>
			</div>
			<div class="reg2Btn">
				<button @click="register()">注册</button>
				<span @click="backLog()">返回登录</span>
			</div>
			<div></div>
		</div>
		<div class="regOk" v-if="isShowRegOk">
			<span>注册成功,正在跳转登录界面</span>
		</div>
	</div>
</template>
<script>
	
	export default {
		data() {
			return {
				src: require("../../img/newsLogo.jpg"),
				isShowReg:false,
				isShowLog:true,
				isShowRegOk:false,
				logName:'',
				logPsw:'',
				ReName:'',
				RegPsw:'',
			}
		},
		computed:{
			
		},
		methods:{
			showReg(){
				this.isShowReg = true;
				this.isShowLog = false
			},
			//登录
			login(){
				var self = this;
				//登录注册 此功能请求PHP链接数据库 
				$.ajax({
					type:"POST",
					url:"http://localhost/vue/museUI/api/login.php",
					data:{
						"username": self.logName,
                        "password": self.logPsw
					},
					success:function(data){
						console.log(data)
						if(data=="登录成功"){
							
							self.isShowLog = false;
							self.isShowLogOk = true;
							//设置cookie
							self.$cookie.set('adminUser', self.logName, 7);
							//用户名提交仓库短暂方法 没有cookie实用
//							self.nickName = self.logName;

//							var nickName = self.logName;
//							
//							console.log(nickName)
//							
//							self.$store.commit("getNickName",nickName)
							
							
//							console.log(self.$store.state.type)

							setTimeout(function(){
								window.location.href = "#/index/travel";
							},1500)
						}else{
							console.log(0)
						}
					}
					
				});
//				$.cookie('adminuser',self.logName,{expires:7,path:'/'});
			},
			register(){
				if(this.ReName!=""&&this.RegPsw!=""){
					var self = this;
					$.ajax({
						type:"POST",
						url:"http://localhost/vue/museUI/api/resigter.php",
						data:{
							"username": self.ReName,
	                        "password": self.RegPsw
						},
						success:function(data){
							console.log(data)
							if(data=="注册成功"){
								self.isShowReg = false;
								self.isShowRegOk = true;
								setTimeout(function(){
									self.isShowLog = true;
									self.isShowRegOk = false;
								},1000)
							}
							
						}
					});
				}
			},
			//返回登录
			backLog(){
				this.isShowReg = false;
				this.isShowLog = true
			}
		},
		mounted(){
//			this.showReg()
		}
	}
</script>
<style lang="scss" scoped>
	.title,.userContent{max-width: 450px;max-height: 1000px; left: 0;right: 0;margin: auto;}
	.userContent {
		/*width: 100%;*/
		border: 1px solid #474a4f;
		height: 694px;
		max-height: 1000px;
		.reg2Btn{
			margin-top: 20px;
			width: 100%;
			height: 40px;
			padding: 0 5%;
			button{
				min-width: 20%;
				height: 100%;
				font-size: 20px;
				background-color: #474a4f;
				border-radius: 15px;
				color: #fff;
				margin-left: 30%;
			}
			button:focus{outline: none;}
			span{
				width: 80px;
			    height: 100%;
			    display: inline-block;
			    vertical-align: middle;
			    font-size: 18px;
			    line-height: 40px;
			    text-align: center;
			    margin-left: 20px;
			    color: red;
			    text-decoration: underline;
			}
		}
		.title {
			width: 100%;
			height: 48px;
			position: absolute;
			left: 0;
			top: 0;
			text-align: center;
			font-size: 20px;
			line-height: 48px;
			background-color: #474a4f;
			color: #fff;
			.routeReset{
				color: #fff;
			}
			span {
				width: 48px;
				height: 48px;
				display: inline-block;
				z-index: 1;
				position: absolute;
				left: 15px;
				top: 0;
			}
		}
		/*eAppLogo*/
		.eAppLogo {
			width: 180px;
		    height: 180px;
		    transform: rotate(45deg);
		    left: 0;
		    right: 0;
		    margin: 100px auto 0;
			img {
				width: 100%;
				height: 100%;
				border-radius: 15px;
				
			}
		}
		.regLog {
			width: 100%;
			height: 140px;
			margin-top: 60px;
			p {
				font-size: 18px;
				margin: 0;
				padding: 10px 20px;
				label {
					width: 20%;
					height: 40px;
					display: inline-block;
					text-align: right;
					margin-right: 2%;
				}
				input {
					width: 60%;
					height: 40px;
					border-radius: 25px;
					text-indent: 14px;
				}
				input:focus {
					outline: none;
				}
			}
		}
		.regLogBtn {
			width: 100%;
			height: 45px;
			margin-top: 20px;
			button {
				padding: 8px 35px;
				border-radius: 15px;
				color: #fff;
				background-color: #474a4f;
			}
			button:first-child{
				margin-left: 25%;
				margin-right: 2%;
			}
			button:focus {
				outline: none;
			}
		}
		
		.showLogOk{
		    width: 128px;
		    height: 128px;
		    position: absolute;
		    bottom: 24%;
		    left: 34%;
		    span{
		    	display: block;
		    	width: 100%;
		    	height: 100%;
		    	background: url(../../img/loading.gif);
		    	/*animation: Logloading 1.5s linear infinite;*/
		    }
		}
		.regOk{
			position: absolute;
			bottom: 40%;
			left: 0;
			width: 100%;
			height: 24px;
			color: red;
			text-align: center;
		}
	}
	@keyframes Logloading{
		from{transform:rotate(0)}
		to{transform:rotate(360deg)}
	}
</style>