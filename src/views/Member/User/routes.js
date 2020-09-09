import RouterView from '@/router-view'
export default {
  path: '',
  component: RouterView,
  children: [
    {
      path: '/user',
      name: 'User',
      component: () => import('./List'),
    },
  ],
}
