<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
        	<img src="../../CV-master/src/assets/logo.png" alt="" />
            <div class="swiper-slide" v-for="str in listImg"  v-html="str.imgurl">
            	
            </div>
        </div>
        <div class="swiper-pagination swiper-pagination-white"></div>
    </div>
</template>

<script>
	import Swiper from 'swiper'
	import 'swiper/dist/css/swiper.min.css';
	export default {
		data(){
			return {
				listImg:[]
			}
		},
        mounted() {
        		console.log('mounted', this)
	            var swiper = new Swiper('.swiper-container', {
	                pagination: '.swiper-pagination',
	                paginationClickable: true,
	                loop: true,
	                speed: 600,
	                autoplay: 4000,
	                onTouchEnd: function() {
	                    swiper.startAutoplay()
	                }
	            });
	           // this.bnData();
        },
        methods:{
        	bnData(){
				var _this = this;       	
	        	$.ajax({
						type: "GET",
						url: "'http://wangyi.butterfly.mopaasapp.com/news/api?type=sport&page=1&limit=10'",
						dataType: "json",
						data:{
							
						},
						success: function(data) {
							self.listImg = data.list
							console.log(data)
						}
				});
       }
	}
 }
</script>

<style lang="scss">
	.swiper-container {
		width: 102%;
		height: 14rem;
		margin-top:10px;
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
</style>