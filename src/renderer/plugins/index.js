import { optional_chain } from '@/utils/fn'
import dayjs from '@/plugins/dayjs'

const install = function (Vue) {
  Vue.prototype.$ochain = optional_chain
  Vue.prototype.$dayjs = dayjs
}

export default {
  install
}
