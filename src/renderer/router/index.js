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
  props: route => ({id: route.params.id, type: route.matched[1].name}),
  meta: { keepAlive: true }
},
{
  path: '/album/:id',
  name: 'album',
  component: () => import('../view/List'),
  props: route => ({id: route.params.id, type: route.matched[1].name}),
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
