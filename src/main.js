import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import './registerServiceWorker'
import VueAnalytics from 'vue-analytics'
import Toasted from 'vue-toasted'


Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(VueAnalytics, {
  id: 'UA-152377012-1'
})
Vue.use(Toasted)
new Vue({
  render: h => h(App),
}).$mount('#app')
