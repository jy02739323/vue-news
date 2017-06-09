<template>
	<div>
		<div id="elayer">
			<div class="eSetting">
				<div class="title">
					<router-link to="/index/travel" class="routeReset">
						<span>首页</span>
					</router-link>
					{{setting}}
				</div>
				<div class="eAppLogo">
					<img :src="src" />
				</div>
			</div>
			<div class="releaseProfile" v-if="releaseProfile">
				<p @click="eUpdate()">版本更新</p>
				<p @click="introduce()">功能介绍</p>
				<p @click="aboutEnewsApp()">C ' NewsAPP相关</p>
				<p @click="fkForme()">反 馈</p>
				<p @click="EGree()">关于作者C-zq</p>
			</div>
			<!--版本更新-->
			<div class="update" v-if="update">
				<p>新闻快乐每一天,暂无更新消息哦~~~<img :src="smileImg" alt="此笑脸正在路上" /></p>
				<p @click="backSetting()" class="backSetting">返回设置</p>
			</div>
			<!--功能介绍-->
			<div class="eIntroduce" v-if="showIntrodce">
				<p>
					看大千世界,观三川五月,赏世间美景!
				</p>
				<p>
					品细腻生活,做成熟女人,过美丽人生!
				</p>
				<p>
					谈娱乐八卦,聊生活百事,说周边趣事!
				</p>
				<p>
					观军国大事,知国际风云,解军事百态!
				</p>
				<p>
					看体育动态,解运动风向,走健康之路!
				</p>
				<p>
					这一切,尽在C'NewsAPP~~~
				</p>
				<p @click="backSetting()" class="backSetting">返回设置</p>
			</div>
			<div class="aboutEnewsApp" v-if="aboutApp">
				<p>
					嗯...终于有人点开这里了，我觉得吧能点到这里的人都是有故事
					的人，为了让你更加充满故事，我决定再告诉你一个故事，这是一
					个神奇的App，为什么我说他神奇呢？首先吧，我觉得用过这个App
					的肯定会说好，嗯嗯~~，本作者我吧也是这样觉得的！它不仅能看
					新闻，还能看新闻，还能看各种新闻~~<br />
					好吧....不扯那么多了----<br />
					该app运用vue,vuex,vue-router,vue-kookie,php,mysql,
					jquery,webpack.......等等大量知识，你没看错，我前端切图
					仔照样能写app！<br />
					额~~觉得自己说的太多了，对于不懂前端切图仔的你直接无视吧，
					对于那些乱七八糟专业术语不要去深究。懂得也看看就好。总之
					就一句，无视这个故事！！！
				</p>
				<p @click="backSetting()" class="backSetting">返回设置</p>
			</div>
			<!--反馈-->
			<div class="fkForme" v-if="fkforme">
				<p>反馈系统暂未开放作者有点累了，过几日在实现</p>
				<p @click="backSetting()" class="backSetting">返回设置</p>
			</div>
			<!--关于作者-->
			<div class="EGree" v-if="greeHe">
				<p>前端切图仔，苦逼程序员，二笔小码农，代码搬运工。。。。</p>
				<p>说多了都是累......</p>
				<p @click="backSetting()" class="backSetting">返回设置</p>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
				return {
					src: require("../../img/newsLogo.jpg"),
					smileImg: require("../../img/smile.png"),
					setting:"设置",
					releaseProfile: true,
					update: false,
					showIntrodce:false,
					aboutApp:false,
					fkforme:false,
					greeHe:false
				}
			},
			computed: {

			},
			methods: {
				//更新
				eUpdate() {
					this.releaseProfile = false;
					this.update = true;
					this.setting="版本更新";
				},
				//介绍
				introduce(){
					this.releaseProfile = false;
					this.showIntrodce= true;
					this.setting = "功能介绍";
				},
				aboutEnewsApp(){
					this.releaseProfile = false;
					this.aboutApp = true;
					this.setting = "APP相关"
				},
				//反馈
				fkForme(){
					this.releaseProfile = false;
					this.fkforme = true;
					this.setting = "反馈";
				},
				//关于我
				EGree(){
					this.releaseProfile = false;
					this.greeHe = true;
					this.setting = "关于作者";
				},
				//返回设置
				backSetting(){
					this.update = false
					this.releaseProfile = true;
					this.showIntrodce = false;
					this.aboutApp = false;
					this.fkforme = false;
					this.greeHe = false;
					this.setting = "设置";
				}
			},
			mounted() {

			}
	}
</script>
<style lang="scss" scoped>
	#elayer{max-width: 450px;left: 0;right: 0;margin: auto;border: 1px solid #474a4f;}
	.eSetting {
		width: 100%;
		height: 360px;
		max-width: 450px;left: 0;right: 0;margin: auto;
		.title {
			/*width: 100%;*/
			height: 48px;
			position: absolute;
			left: 0;
			top: 0;
			text-align: center;
			font-size: 20px;
			line-height: 48px;
			background-color: #474a4f;
			color: #fff;
			max-width: 450px;left: 0;right: 0;margin: auto;
			.routeReset {
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
		.eAppLogo {
			width: 180px;
			height: 180px;
			position: absolute;
			margin: auto;
			top: 110px;
			left: 50%;
			margin-left: -90px;
			img {
				width: 100%;
				height: 100%;
				border-radius: 15px;
				transform: rotate(45deg);
			}
		}
	}
	
	.releaseProfile {
		max-width: 450px;left: 0;right: 0;margin: auto;
		padding: 5%;
		p {
			height: 50px;
			line-height: 50px;
			font-size: 18px;
			text-align: center;
		}
	}
	
	.update {
		/*display: none;*/
		padding: 5%;
		text-align: center;
		p {
			width: 100%;
			height: 67px;
			line-height: 67px;
			font-size: 18px;
		}
		img {
			vertical-align: middle;
		}
		
	}
	.backSetting{text-decoration: underline; color: red;text-align: center;}
	.eIntroduce{
		width: 100%;
		padding: 0 5%;
		p {
			text-align: center;
			font-size: 20px;
		};
	}
	.aboutEnewsApp{
		width: 100%;
		padding: 0 5%;
		p{
			text-align: left;
			font-size: 20px;
			line-height: 2;
		}
	}
	.fkForme{
		width: 100%;
		p{
			font-size: 20px;
			text-align: center;
		}
	}
	.EGree{
		width: 100%;
		p{
			font-size: 20px;
			text-align: center;
		}
	}
</style>