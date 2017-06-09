//import 
import $ from "jquery";
window.$ = $;
//slider
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css';
//import Vue & VueRouter & Vuex
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Vuex from 'vuex'
Vue.use(Vuex);
var VueCookie = require('vue-cookie');
Vue.use(VueCookie);

//axios
import axios from 'axios'
Vue.prototype.$http = axios  //其他页面在使用axios的时候直接  this.$http就可以了
//import  MuseUI
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css' // 使用 carbon 主题
Vue.use(MuseUI);

//import index component

import war from "./components/war.vue";
import travel from "./components/travel.vue";
import lady from "./components/lady.vue";
import ent from "./components/ent.vue";
import sport from "./components/sport.vue";


//用户登录注册
var userLogReg = require("./components/userLogReg/userLogReg.vue");
//设置中心
var setting = require("./components/setting/setting.vue");
//详情页
var detail = require("./components/detail.vue");
//首页
var index = require("./components/index.vue");
//测试页 已放弃  该接口没有详情页面
//var yydetail = require("./components/yydetail/yydetail.vue");

//setting router 
var router = new VueRouter({
	routes: [{
		path: "/index",
		component: index,
		children:[{
			path: "war",
			component: war
		},{
			path: "travel",
			component: travel
		},{
			path: "lady",
			component: lady
		},{
			path: "ent",
			component: ent
		},{
			path: "sport",
			component: sport
		}]
	}
	,{
		path: "/user",
		component: userLogReg
	},
	{
		path: "/setting",
		component: setting
	},
	{
		path: "/detail/:id",
		component: detail
	},{
		path:"/",
		redirect:"/index/travel"
	}]
});
//状态管理 存储数据  vuex 
var store = new Vuex.Store({
		state: {
			type:'travel',
			nickName:'E-Gree'
		},
		mutations: {
			getType(state,type){
				state.type = type;
			},
			getNickName(state,nickName){
				state.nickName = nickName;
			}
		},
		getters: {

		}
	})
	//vue:
new Vue({
	el: "#demo",
//	render: (createElement) => createElement(index),
	template: `
		<router-view></router-view>
	`,
	//注册
	router,
	store,
	data: {
		author: "Alex"
	}
});