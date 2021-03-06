import Vue from 'vue'
import axios from 'axios'

import App from './App'
// import router from './router'
import {createRouter} from '@/router'
// import store from './store'
import {createStore} from './store'

import '@/scss/global.scss'

// 全局引入ant-design-vue
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { Icon } from 'ant-design-vue'
Vue.use(Antd)

// 挂载插件
import plugins from '@/plugins'
// import filters from '@/filters' 
Vue.use(plugins)

// 引入iconfont 并挂载到全局组件
const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2430341_v0vobokfez.js'
})
Vue.component('MyIcon', MyIcon)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios

Vue.config.productionTip = false

// 去除chrome控制台报错
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

const store = createStore()
const router = createRouter(store)
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
