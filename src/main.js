import Vue from 'vue'
import App from './App.vue'
import SimpleLineIcons from 'simple-line-icons/css/simple-line-icons.css';

Vue.config.productionTip = false
Vue.use(SimpleLineIcons);

new Vue({
  render: h => h(App)
}).$mount('#app')
