import {make} from 'vuex-pathify'

// data
const state = {
  showSetting: false,
  showLogin: false,
  drawermini: false,
  version: null,
  nav: []
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: async ({dispatch}) => {
    const modules = ['settings/fetch', 'music/fetch']
    for (const module of modules) dispatch(module, null, {root: true})
  }
}

const getters = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
