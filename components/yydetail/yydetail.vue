<template>
	<div>
		<div class="eDetailHeader">
			<div class="back" @click="back()">
				<img :src="src" />
			</div>
			<mu-appbar title="健康资讯">
				<mu-icon-menu icon="more_vert" slot="right">
					<mu-menu-item title="个人中心" />
					<mu-menu-item title="注销用户" />
					<mu-menu-item title="关于我们" />
				</mu-icon-menu>
			</mu-appbar>
		</div>
		<div class="eDetail">
			<h2 class="title">{{news.title}}</h2>
			<div class="eDetImg">
				<img :src="news.img"/>
			</div>
			<p class="edContent" v-html="news.content"></p>
			<!--评论区-->
			<div class="ehotComment">
				<p>热门评论</p>
				<div class="eCommentList">
					<ul>
						<li>撒的</li>
						<li>111111</li>
						<li>111111</li>
						<li>111111</li>
						<li>111111</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="eAdres">
			<span class="comment"><img :src="comments"/></span>
			<span class="eSay"><button>我来说两句</button></span>
			<span class="elike"><img :src="like"/></span>
		</div>
	</div>
</template>
<script>
	export default {

		data() {
				return {
					src: require("../../img/back.png"),
					comments:require("../../img/comment.png"),
					like:require("../../img/like.png"),
					id: this.$route.params.id,
					news:""
				}
		},
			methods: {
				detailHealthInfo() {
					var self = this;
					$.ajax({
						type: "GET",
						url: "http://route.showapi.com/96-36?",
						data: {
							id:this.id,
							page:this.page,
							showapi_appid: "38355",
							showapi_sign: "ad9ef8862753452ca8a5d6774db018e5",
						},
						dataType: "json",
						success: function(data) {
							console.log(data)
							self.news = data.showapi_res_body.item;
						}
					})
				},
				back(){
					window.location.href = "#/index/health"
				}
			},
			mounted() {
				this.detailHealthInfo();
				console.log(this.id)
			}
	}
</script>
<style>
	.mu-appbar-title span {
		margin-left: 45%;
		z-index: 10;
	}
	
	.back {
		width: 30px;
		height: 16px;
		display: inline-block;
		position: absolute;
		left: 24px;
		top: 21px;
	}
	
	.back img {
		width: 100%;
		height: 100%;
	}
	
	.eDetailHeader {height: 56px;width: 100%;position: fixed;top: 0;left: 0;z-index: 1;}
	.mu-menu-item{border-bottom: 1px solid #007AFF;}
	.eDetail{padding: 20px;position: absolute;top: 56px;width: 100%;}
	.title{height: 100px;font-size: 24px;border-bottom: 1px solid #ddd;text-align: center;}
	.eDetImg{height: 150px;width: 100%;margin-bottom: 20px;display: block;}
	.eDetImg img{width: 100%;height: 100%;}
	
	.edContent{
		line-height: 2;
		margin-bottom: 20px;
		font-size: 18px;
		margin-top: 20px;
	}
	.eAdres{width: 100%;height: 40px;background: #7e57c2;line-height: 32px;position: fixed;left: 0;bottom: 0;}
	.eAdres span{display: inline-block;}
	.comment{width: 34px;height: 30px;display: inline-block;margin-top: 8px;float: left;margin-left: 60px;}
	.comment img{width: 100%;height: 100%;}
	.eSay{float: left;margin-left: 50px;color: #fff;background: #7E57C2;}
	.eSay button{padding: 2px 10px;border-radius: 50%;}
	.eSay button:focus{outline: none;}
	.elike{width: 34px;height: 30px;float: left;margin-left: 45px;margin-top: 5px;}
	.elike img{widows: 100%;height: 100%;}
	.ehotComment{border-top: 1px solid #ddd;margin-bottom: 35px;}
	.eCommentList li{line-height: 40px;}
</style>