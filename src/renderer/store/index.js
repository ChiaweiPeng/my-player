import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import pathify from '@/plugins/pathify'

// import modules from './modules'
import * as modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    pathify.plugin,
    createPersistedState()
    // createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})

// export const createStore = () => {
//   const store = new Vuex.Store({
//     plugins: [
//       pathify.plugin,
//       createPersistedState(),
//       createSharedMutations()
//     ],
//     modules,
//     strict: process.env.NODE_ENV !== 'production',
//     state:{
//       name:'pjw'
//     },
//     mutations:{
//       edit(state){
//         console.log('321')
//         state.name = 'jack'
//       }
//     }
//   })
//   store.subscribe(mutation => {
//     if (!mutation.type.startsWith('settings/')) return
//     store.dispatch('settings/update', mutation)
//   })
//   return store
// }
