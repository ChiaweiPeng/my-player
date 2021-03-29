import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const musicRoutes = [{
  path: '/discover',
  name: 'discover',
  component: () => import('../view/Discover'),
  meta: {keepAlive: true}
},
{
  path: '/explore',
  name: 'explore',
  component: () => import('../view/Explore'),
  meta: { keepAlive: true }
}]

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../view/index'),
      children: musicRoutes,
      redirect: {path: '/discover'}
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
