<template>
	<div id="eContent">
		<div v-for="news in newss" @refresh="refresh">
			<router-link :to="'/yydetail/'+news.id">
				<div>
					<mu-card>
						<mu-card-header :title="news.author" :subTitle="news.time">
							<mu-avatar :src="news.img" slot="avatar" />
						</mu-card-header>
						<!--<mu-card-header title="Myron Avatar" subTitle="sub title">
							<mu-avatar :src="src" slot="avatar" />
						</mu-card-header>-->
						<mu-card-title :title="news.title" />
						<mu-card-media>
							<img :src="news.image0" />
						</mu-card-media>
						<div class="details">
							<mu-icon value="info" slot="right" />
						</div>
					</mu-card>
				</div>
			</router-link>	
		</div>
	</div>
</template>
<script>
	export default {
		data() {
				return {
					page:1,
					newss: [],
					
					refreshing: false,
				}
			},
			methods: {
				getHealthInfo() {
					var self = this;
					$.ajax({
						type: "GET",
						url: "http://route.showapi.com/96-109?",
						data: {
							page:this.page,
							showapi_appid: "38356",
							showapi_sign: "ad9ef8862753452ca8a5d6774db018e5",
						},
						dataType: "json",
						success: function(data) {
							console.log(data)
								//							console.log(data.showapi_res_body.pagebean.contentlist)
							self.newss = self.newss.concat(data.showapi_res_body.pagebean.contentlist);
							console.log(self.newss)

						}
					})
				},
				refresh(){
					
				},
				
			},
			mounted() {
				this.getHealthInfo()
			}
	}
</script>