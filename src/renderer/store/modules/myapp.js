import { make } from 'vuex-pathify'

const state = {
  showLogin: false
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: async ({dispatch}) => {
    const modules = ['settings/fetch']
    for (const module of modules) dispatch(module, null, {root: true})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
