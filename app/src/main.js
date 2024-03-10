import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 引入路由器
import router from './router'

// 引入全局过滤器
import '@/filters'

//引入仓库
import store from './store/index'

// 引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')