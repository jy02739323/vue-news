<template>
	<div>
		<div id="eheader">
			<div>
				<div id="eleftBar">
					<mu-icon-button icon="menu" slot="left" @click="open('left')" />	
				</div>
				<div class="aaa">
					<mu-popup position="left" popupClass="demo-popup-left" :open="leftPopup" @close="close('left')">
						<div class="userAbout">
							<div class="userAvatar">
								<img :src="src" />
							</div>
							<div class="nickname">
								<!--<router-link to="/user" class="routeUserReset">-->
								<span>{{adminUser}}</span>
								<!--</router-link>-->
							</div>
						</div>
						<div class="eItem">
							<ul>
								<li class="eTravel" @click="jump('travel')">
									<a href="#/index/travel">
										<p><span></span>旅游看点</p>
									</a>
								</li>
								<li class="eLadyWiki" @click="jump('lady')">
									<a href="#/index/lady">
										<p><span></span>女性百科</p>
									</a>
								</li>
								<li class="eEntHeadline" @click="jump('ent')">
									<a href="#/index/ent">
										<p><span></span>娱乐头条</p>
									</a>
								</li>
								<li class="eWarState" @click="jump('war')">
									<a href="#/index/war">
										<p><span></span>军事动态</p>
									</a>
								</li>
								<li class="eSportInfo" @click="jump('sport')">
									<a href="#/index/sport">
										<p><span></span>体育资讯</p>
									</a>
								</li>
							</ul>
						</div>
						<div class="eSet">
							<router-link to="/setting" class="routerReset">
								<p><span></span>设置</p>
							</router-link>
							<!--<router-link to="/user" class="routerReset">-->
							<p @click="changLogState()"><span></span>{{logState}}</p>
							<!--</router-link>-->
						</div>
					</mu-popup>
				</div>
			</div>
			<div id="ebarNav">
				<mu-tabs :value="activeTab" @change="handleTabChange">
					<mu-tab value="tab1" href="#/index/travel" title="旅游" @click="getType('travel')" />
					<mu-tab value="tab2" href="#/index/lady" title="女性" @click="getType('lady')" />
					<mu-tab value="tab3" href="#/index/ent" title="娱乐" @click="getType('ent')" />
					<mu-tab value="tab4" href="#/index/war" title="军事" @click="getType('war')" />
					<mu-tab value="tab5" href="#/index/sport" title="体育" @click="getType('sport')" />
				</mu-tabs>
			</div>
			<div>
				<mu-icon-menu icon="expand_more" slot="right">
				
					<mu-menu-item title="个人中心" />
					<mu-menu-item title="注销用户" />
					<mu-menu-item title="关于我们" />
				</mu-icon-menu>
				</mu-appbar>
			</div>
		</div>
		<router-view></router-view>
	</div>

</template>

<script>
	export default {
		data() {
				return {
					src: require("../img/1.jpg"),
					srclike: require("../img/like_red.png"),
					concerned: require("../img/fk.png"),
					setIcon: require("../img/setting.png"),
					activeTab: 'tab1',
					//弹出窗 侧边栏
					bottomPopup: false,
					topPopup: false,
					leftPopup: false,
					rightPopup: false,
					newss: [],
					page: 1,
					limit: 10,
					adminUser: '',
					logState: ''
				}
			},
			computed: {
				//				nickName(){
				//					return this.$store.state.nickName;
				//				}
			},
			methods: {
				handleTabChange(val) {
					this.activeTab = val
				},
				open(position) {
					this[position + 'Popup'] = true;
				},
				close(position) {
					this[position + 'Popup'] = false;
				},
				getType(type) {
					//					console.log(type)
					this.$store.commit("getType", type)
				},
				jump(type) {
					//提交频道类型
					this.$store.commit("getType", type)

					//隐藏侧边栏
					$(".demo-popup-left").hide(400)
					$(".mu-overlay").hide()

				},
				special() {
					//显示侧边栏
					$("#eleftBar").on('click', function() {
						$(".demo-popup-left").show(400)
						$(".mu-overlay").show()
					});
					$(".mu-overlay").on('click', function() {
						//隐藏侧边栏
						$(".demo-popup-left").hide(400)
						$(".mu-overlay").hide()
					})
				},
				//获取昵称 
				getNickName() {
					if(this.$cookie.get('adminUser') == null) {
						this.adminUser = "请登录";
						this.logState = "登录";
					} else {
						this.adminUser = this.$cookie.get('adminUser');
						this.logState = "注销";
					}
				},
				changLogState() {
					var state = this.logState;
					if(state == "注销") {
						this.$cookie.delete('adminUser');
						this.adminUser = "请登录";
						this.logState = "登录";
					}
					if(state == "登录") {
						window.location.href = "#/user";
					}
				}
			},
			watch: {
				topPopup(val) {
					if(val) {
						setTimeout(() => {
							this.topPopup = false
						}, 2000)
					}
				}
			},
			mounted() {
				this.getType();
				this.special();
				this.getNickName();
				//				this.changLogState();
				console.log(this.$cookie.get('adminUser'));
			}
	}
</script>
<style lang="scss">

	.routerReset {
		color: black;
	}
	
	.routeUserReset {
		color: #fff;
	}
	/*侧边栏*/
	.demo-popup-left{
		max-width: 315px !important;
	    left: -135px;
	    right: 0;
	    margin: auto;
    }
	.mu-overlay{
		max-width: 450px !important;
	    left: 0;
	    right: 0;
	    margin: auto;
	}
	.userAvatar {
		width: 60px;
		height: 60px;
		position: absolute;
		left: 15%;
		top: 32%;
		img {
			width: 100%;
			height: 100%;
			border-radius: 50%;
			border: 2px solid #fff;
		}
	}

	.userAbout {
		position: absolute;
		width: 100%;
		height: 25%;
		background: url(../img/ebjUserAbout.jpg) no-repeat;
		left: 0;
		top: 0;
		.nickname {
			width: 160px;
			height: 32px;
			font-size: 24px;
			color: #fff;
			position: absolute;
			left: 40%;
			top: 40%;
		}
	}
	
	.eItem {
		width: 100%;
		height: 50%;
		position: absolute;
		left: 0;
		top: 30%;
		li {
			width: 100%;
			height: 20%;
			line-height: 60px;
			list-style: none;
			font-size: 18px;
			p {
				width: 60%;
				height: 87%;
				display: inline-block;
				margin: 0;
			}
			span {
				width: 30px;
				height: 30px;
				display: inline-block;
				float: left;
				margin-top: 8px;
				margin-right: 15px;
			}
		}
		.eTravel span {
			background: url(../img/eTravelIoc.png);
		}
		
		.eLadyWiki span {
			background: url(../img/eLadyIcon.png);
		}
		
		.eEntHeadline span {
			background: url(../img/eEnt.png);
		}
		
		.eWarState span {
			background: url(../img/eArm.png);
		}
		
		.eSportInfo span {
			background: url(../img/eSport.png);
		}
		
		a {
			color: black;
		}
	}
	/*登录注册设置*/
	
	.eSet {
		width: 100%;
		height: 40px;
		position: absolute;
		bottom: 10px;
		left: 0;
		p {
			width: 30%;
			display: inline-block;
			height: 40px;
			text-align: center;
			font-size: 18px;
			margin: 0;
			line-height: 40px;
		}
		p:first-child {
			margin-left: 12%;
		}
	}
	
	.mu-popup .mu-card-header {
		position: absolute;
		left: 20%;
		top: 80px;
	}
	
	.mu-tabs {
		width: 75%;
		position: absolute;
		left: 14%;
		top: 0;
	}
	
	.demo-popup-left {
		display: flex;
		width: 75%;
		max-width: 375px;
		height: 100%;
		align-items: center;
		padding: 24px;
	}
	/*个人中心按钮*/
	
	.mu-icon-menu {
		position: absolute;
		right: 0;
		width: 12%;
		height: 48px;
		background-color: #474a4f; 
		display: inline-block;
		color: #ffffff;
	}
	
	#eleftBar {
		width: 15%;
		height: 48px;
		line-height: 48px;
		position: absolute;
		left: 0;
		top: 0;
		text-align: center;
		background-color: #474a4f;
		color: white;
	}
	
	#eheader {
		display: block;
		height: 48px;
		left: 0;
		right: 0;
		max-width: 450px;
		margin: auto;
		position: fixed;
		z-index: 99;
	}
	
	#eContent {
		position: absolute;
		width: 100%;
		top: 48px;
		left: 0;
	}
	
	.mu-tab-link-highlight {
		display: none;
	}
	
	.mu-card-title-container .mu-card-title {
		font-size: 16px;
		color: rgba(0, 0, 0, .87);
		line-height: 20px;
	}
	
	.mu-card {
		border-bottom: 2px solid #ddd;
	}
	
	.mu-card-media {
		margin-bottom: 10px;
	}
	
	.details {
		position: absolute;
		width: 24px;
		height: 24px;
		top: 60px;
		right: 22px;
	}
</style>