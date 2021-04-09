import Vue from 'vue'
import Router from 'vue-router'
import { message } from 'ant-design-vue'

Vue.use(Router)
const musicRoutes = [{
  path: '/discover',
  name: 'discover',
  component: () => import('../view/Discover'),
  meta: { keepAlive: true }
},
{
  path: '/explore',
  name: 'explore',
  component: () => import('../view/Explore'),
  meta: { keepAlive: true }
},
{
  path: '/fm',
  name: 'fm',
  component: () => import('../view/FM'),
  meta: { keepAlive: true, needLogin:true }
},
{
  path: '/daily',
  name: 'daily',
  component: () => import('../view/Daily'),
  meta: { keepAlive: true, needLogin: true }
},
{
  path: '/collection',
  name: 'collection',
  component: () => import('../view/Collection'),
  meta: { keepAlive: true, needLogin: true }
},
{
  path: '/musicvideo/:id/',
  name: 'musicvideo',
  props: true,
  component: () => import('../view/MusicVideo'),
  meta: { keepAlive: true }
},
{
  path: '/moods_genres/:type',
  name: 'moods_genres_detail',
  component: () => import('../view/moods_genres/detail'),
  props: true,
  meta: { keepAlive: true }
},
{
  path: '/playlist/:id',
  name: 'playlist',
  component: () => import('../view/List'),
  props: route => ({ id: route.params.id, type: route.matched[1].name }),
  meta: { keepAlive: true }
},
{
  path: '/album/:id',
  name: 'album',
  component: () => import('../view/List'),
  props: route => ({ id: route.params.id, type: route.matched[1].name }),
  meta: { keepAlive: true }
},
{
  path: '/artist/:id',
  name: 'artist',
  component: () => import('../view/Artist'),
  props: true,
  meta: { keepAlive: true }
}
]
// 去除重复点击报错
const originalPush  = Router.prototype.push
Router.prototype.push = function push(location){
  return originalPush.call(this, location).catch(err => err)
}

export function createRouter(store) {
  const router = new Router({
    scrollBehavior: (to, from, savedPosition) => (savedPosition || { x: 0, y: 0 }),
    routes: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../view/index'),
        children: musicRoutes,
        redirect: { path: '/discover' }
      },
      {
        path: '*',
        redirect: '/'
      }
    ]
  })
  router.beforeEach(({ meta }, from, next) => {
    const logged = store.getters['settings/logged']
    if (meta.needLogin && !logged) {
      store.commit('myapp/showLogin', true)
      message.warning('需要登录哦，请先登录')
    } else {
      next()
    }
  })
  return router
}