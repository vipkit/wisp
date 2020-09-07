import RouterView from '@/router-view'
export default {
  path: '',
  component: RouterView,
  children: [{
    path: '/merchants',
    component: () => import('./List')
  }]
}