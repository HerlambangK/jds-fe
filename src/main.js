import Vue from 'vue'
import App from './App.vue'
import axios from './plugins/axios'
import vuetify from './plugins/vuetify'
// import './index.css'; // Import file CSS Tailwind


Vue.config.productionTip = false

new Vue({
  axios,
  vuetify,
  render: h => h(App)
}).$mount('#app')
// 