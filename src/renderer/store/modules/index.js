/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const files = require.context('.', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

// export default modules
// export {default as music} from './music'
// export {default as app} from './app'
// export {default as settings} from './settings'
// export {default as snackbar} from './snackbar'
export {default as change} from './change'
export {default as myapp} from './myapp'
export {default as settings} from './settings'