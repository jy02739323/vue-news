<template>
	<div id="dropdown" class="eContent">
		
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="slider in newss">
					<router-link class="jump" :to="'/detail/'+slider.id">
						<img :src='slider.imgurl' />
					</router-link>					
				</div>
			</div>
			<div class="swiper-pagination swiper-pagination-white"></div>
		</div>
		<div class="loading" v-if="showLoading"><img :src="loadImg" /></div>
		<div v-for="news in newss">
			<div class="listInfo">
				<div class="eTitle">
					<router-link class="jump" :to="'/detail/'+news.id">
						<p v-html="news.title"></p>
					</router-link>
					<!--<span v-html="news.time"></span>-->
					<span class="time">
						{{getDateDiff(news.time)}}
					</span>
				</div>
				<div class="listImg">
					<img :src="news.imgurl" />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				loadImg: require("../img/loading.gif"),
				page: 1,
				limit: 10,
				newss: [],
				newssTime: [],
				showLoading: true
			}

		},
		computed: {

		},
		methods: {
			//获取信息
			getlistInfo() {
				var type = this.$store.state.type;
				//					console.log(type)
				this.showLoading = true;
				if(this.$route.path == "/index/travel") {
					type = "travel"
				}
				var self = this;
				setTimeout(function() {
					$.ajax({
						type: "GET",
						url: "http://wangyi.butterfly.mopaasapp.com/news/api",
						data: {
							type: type,
							page: self.page,
							limit: self.limit
						},
						dataType: "json",
						success: function(data) {
							self.newss = self.newss.concat(data.list)
							self.showLoading = false
							self.newssTime = self.newssTime.concat(data.list.time)
						}
					})
				}, 500);
			},
			//轮播图
			liSlider() {
				$(function() {
					var swiper = new Swiper('.swiper-container', {
						pagination: '.swiper-pagination',
						paginationClickable: true,
						loop: true,
						speed: 600,
						autoplay: 3000,
						observer: true, //修改swiper自己或子元素时，自动初始化swiper 
						observeParents: false, //修改swiper的父元素时，自动初始化swiper 
						onTouchEnd: function() {
							swiper.startAutoplay()
							swiper.update()
						}
					});
				})
			},
			//下拉刷新
			dropdown() {
				//					console.log($("#dropdown").get(0).scrollTop)
				var refreshEl = $("#dropdown").get(0)
				var height = refreshEl.clientHeight;
				var scrollTop = refreshEl.scrollTop;
				var scrollHeight = refreshEl.scrollHeight;
				//滚动刷新条件
				if(scrollHeight - scrollTop - height <= 10) {
					this.page++;
					this.getlistInfo()
				}
			},
			//自定义过滤器处理时间
			getDateDiff(dateTimeStamp) {
				dateTimeStamp = new Date(Date.parse(dateTimeStamp.replace(/-/g, "/")));
				dateTimeStamp = dateTimeStamp.getTime();

				var result = "";
				var minute = 1000 * 60;
				var hour = minute * 60;
				var day = hour * 24;
				var halfamonth = day * 15;
				var month = day * 30;
				var now = new Date().getTime();
				var diffValue = now - dateTimeStamp;
				if(diffValue < 0) {
					return;
				}
				var monthC = diffValue / month;
				var weekC = diffValue / (7 * day);
				var dayC = diffValue / day;
				var hourC = diffValue / hour;
				var minC = diffValue / minute;
				if(monthC >= 1) {
					result = "" + parseInt(monthC) + "月前";
				} else if(weekC >= 1) {
					result = "" + parseInt(weekC) + "周前";
				} else if(dayC >= 1) {
					result = "" + parseInt(dayC) + "天前";
				} else if(hourC >= 1) {
					result = "" + parseInt(hourC) + "小时前";
				} else if(minC >= 1) {
					result = "" + parseInt(minC) + "分钟前";
				} else {
					result = "刚刚";
				}
				return result;
			}
		},
		mounted() {
			this.getlistInfo();
			this.liSlider();			
			console.log(this.$route.path)
			//				滚动加载
			//				console.log($("#dropdown").get(0).scrollHeight)
			$("#dropdown").get(0).addEventListener("scroll", this.dropdown);
		},
	}
</script>
<style lang="scss">
	.swiper-container {
		width: 102%;
		height: 14rem;
		margin-top: 10px;
		.swiper-wrapper {
			width: 100%;
			height: 100%;
			img {
				width: 100%;
			}
		}
		.swiper-slide {
			background-position: center;
			background-size: cover;
			width: 100%;
			height: 100%;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.swiper-pagination-bullet {
			width: 0.833rem;
			height: 0.833rem;
			display: inline-block;
			background: #7c5e53;
		}
	}
	
	.eContent {
		position: absolute;
		top: 48px;
		left: 0;
		right: 0;
		max-width: 450px;
		margin: auto;
		box-sizing: border-box;
		padding: 0 20px;
		overflow: auto;
		height: 100%;
		border: 1px solid #474a4f;
	}
	
	.eContent::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		background-color: #ccc;
	}
	
	.eContent::-webkit-scrollbar {
		width: 2px;
		background-color: #474a4f;
	}
	
	.eContent::-webkit-scrollbar-thumb {
		background-color: #474a4f;
	}
	
	.loading {
		width: 80px;
		height: 80px;
		position: fixed;
		left: 50%;
		top: 50%;
		margin-left: -40px;
		margin-top: -80px;
	}
	
	@keyframes rotating {
		from {
			transform: rotate(0)
		}
		to {
			transform: rotate(360deg)
		}
	}
	
	.loading img {
		width: 100%;
		height: 100%;
		animation: rotating 1.5s linear infinite;
	}
	
	.listInfo {
		width: 100%;
		height: 120px;
		border: 1px solid #474a4f;
		border-radius: 15px;
	}
	
	.listInfo:first-child {
		margin-top: 20px;
	}
	
	.listInfo .eTitle {
		float: left;
		width: 50%;
		margin-left: 5%;
	}
	
	.listInfo .eTitle p {}
	
	.listInfo .eTitle .time {
		font-size: 12px;
	}
	
	.listInfo p {
		font-size: 16px;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		word-wrap: break-word;
		width: 100%;
		height: 60px;
		margin: 0;
		line-height: 30px;
		box-sizing: border-box;
		margin-top: 20px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}
	
	.listImg {
		width: 45%;
		height: 120px;
		display: inline-block;
		float: right;
		padding: 15px 10px;
		box-sizing: border-box;
	}
	
	.listInfo .listImg img {
		width: 100%;
		height: 100%;
	}
	
	.jump {
		color: black;
	}
</style>