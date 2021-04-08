import { make } from 'vuex-pathify'

const state = {
  showLogin: false,
  showList: false,
  showLyricPage:false,
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: async ({dispatch}) => {
    const modules = ['settings/fetch', 'change/fetch']
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
