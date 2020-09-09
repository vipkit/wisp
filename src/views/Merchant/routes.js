import RouterView from '@/router-view'
export default {
  path: '',
  component: RouterView,
  children: [
    {
      path: '/merchants',
      name: 'Merchants',
      component: () => import('./List'),
    },
  ],
}
