import Vue from 'vue'
import VueRouter from 'vue-router'
import Root from '@/views/Root'
import { store } from './store'

import { childRoutes } from './routes'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/articles',
    component: Root,
  },
  {
    path: '/',
    name: 'home',
    redirect: '/articles',
    component: Root,
    children: childRoutes,
  },
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "Login" */ './views/Account/Login'),
  },
  {
    path: '/code_login',
    component: () =>
      import(/* webpackChunkName: "CodeLogin" */ './views/Account/CodeLogin'),
  },
  {
    path: '*',
    component: () => import('./views/NotFound.vue'),
  },
]
const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  if (
    to.matched.some(record => record.path === '*') ||
    ['/login', '/code_login', '/'].includes(to.path) ||
    store.state.isLogin
  ) {
    next()
  } else {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath,
      },
    })
  }
})

export default router
