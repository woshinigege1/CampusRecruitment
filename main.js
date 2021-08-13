import Vue from 'vue'
import App from './App'
import store from './store'
import uView from "uview-ui";
import headBanner from './components/headBanner.vue'


Vue.component('head-Banner',headBanner)
Vue.use(uView);
Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    store,
	...App
})
app.$mount()
