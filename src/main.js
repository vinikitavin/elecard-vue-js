import '@/assets/scss/index.scss'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/getCards'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
