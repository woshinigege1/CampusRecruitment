import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new 
Vuex.Store({
	state: { //存放状态
	"username": "fff",
	"password": '123456',
	"authentication":true
	}
})
 
export default store;
