import RouterView from '@/router-view'
export default {
  path: '',
  component: RouterView,
  children: [{
    path: '/entry',
    component: RouterView,
    children: [{
      path: '',
      name: 'EntryList',
      component: () => import('./List'),
    }, ],
  }],
}