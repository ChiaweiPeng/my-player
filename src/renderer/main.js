import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import '@/scss/global.scss'


// 全局引入ant-design-vue
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { Icon } from 'ant-design-vue'
Vue.use(Antd)

// 引入iconfont 并挂载到全局组件
const MyIcon = Icon.createFromIconfontCN({
  scriptUrl:'//at.alicdn.com/t/font_2430341_cxx3oddcv34.js'
})
Vue.component('MyIcon',MyIcon)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

// 去除chrome控制台报错
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
