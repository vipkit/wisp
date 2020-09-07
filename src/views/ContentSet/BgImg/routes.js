import RouterView from '@/router-view'
export default {
  path: '',
  component: RouterView,
  children: [{
    path: '/bg_img',
    component: RouterView,
    children: [{
      path: '',
      name: 'BgImg',
      component: () => import('./List'),
    }],
  }],
}