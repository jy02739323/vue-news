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
			<h2 class="title" v-html="news.title"></h2>
			<!--<div class="eDetImg">
				<img :src="comments"/>
			</div>-->
			<div class="edContent" v-html="news.content"></div>
			<!--评论区-->
			<div class="ehotComment">
				<p>热门评论</p>
				<div class="eCommentList">
					<ul>
						<li>666666</li>
						<li>某某大神的一句神回复</li>
						<li>沧海桑田</li>
						<li>浮云</li>
						<li>12345....坚持点评</li>
					</ul>
				</div>
			</div>
		</div>
		
		<div class="eAdres">
			<span>发表</span>
			<textarea cols="30" rows="10" placeholder="我来说两句"></textarea>
			
		</div>
	</div>
</template>
<script>
	export default {

		data() {
			return {
				src: require("../img/back.png"),
				comments:require("../img/comment.png"),
				like:require("../img/like.png"),
				id: this.$route.params.id,
				news:'',
//				page: 1,
//				limit: 10,
			}
		},
		methods: {
			getlistInfo() {
				var self = this;
				var id=this.$route.params.id;
				$.ajax({
					type: "GET",
					url: "http://wangyi.butterfly.mopaasapp.com/detail/api?",
					data: {
						simpleId:self.id
					},
					dataType: "json",
					success: function(data) {
						self.news = data
						console.log(data)
					}
				})
			},
			back(){
				history.back(); 
//				window.location.href = "#/index/travel"
			}
		},
		mounted() {
			this.getlistInfo();
			console.log(this.$route.path)
			console.log(window.history)
			$(".opacity_0").css({"width":"100%","heght":"250px"})
		}
	}
</script>
<style>
	body{font-size: 18px;}
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
	
	.eDetailHeader {height: 56px;max-width: 450px;position: fixed;top: 0;left: 0;right: 0;margin: auto; z-index: 1;}
	.eDetail{padding: 20px;position: absolute;top: 56px;max-width: 450px;left: 0;right: 0;margin: auto;}
	
	.title{height: 100px;font-size: 24px;border-bottom: 1px solid #ddd;text-align: center;}

	.edContent{
		line-height: 2;
		margin-bottom: 20px;
		font-size: 18px;
		margin-top: 20px;
	}
	.edContent img{width: 100% !important;height: 250px !important;}
	.edContent .f_center{width: 100%;height: 100%;}
	.edContent .f_center img{width: 100% !important;height: 100% !important;position: static !important;}

	.eAdres{height: 40px;line-height: 32px;position: fixed;left: 0;bottom: 0;background-color: #474a4f;color: #fff;max-width: 450px;right: 0;margin: auto;}
	.eAdres span{text-align: center;line-height: 40px; width: 20%;height: 40px;position: absolute;right: 0;display: inline-block;border: 1px solid #474a4f;}
	.eAdres textarea{padding: 0 10px; width: 80%;position: absolute;top: 2px;left: 0;box-sizing: border-box;height: 38px;text-indent: 10px;border: 1px solid #ccc;}
	.eAdres textarea:focus{outline: none;}
</style>