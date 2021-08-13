import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new 
Vuex.Store({
	state: { //存放状态
	'loginStatus':0,
	'result':'',
	},
	mutations:{
		updateEnterpriseInformation(state,obj){
			// 更新企业信息
			state.result = obj;
		},
		toClear(state){
			state.result = {};
		}
	}
})
 
export default store;
