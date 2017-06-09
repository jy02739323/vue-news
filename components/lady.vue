<template>
	<elist></elist>
</template>
<script>
	import elist from "../template/elist.vue"
	export default {
		data(){
			return {
				
			}
		},
		components: {
			//组件注册
			elist
		},
	}
	
</script>
<style>
	.eLady{
		position: absolute;
		top: 48px;
		left: 0;
		width: 100%;
		box-sizing: border-box;
		padding: 0 20px;
	}
</style>