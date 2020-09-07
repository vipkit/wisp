import RouterView from '@/router-view'
export default {
  path: '',
  component: RouterView,
  children: [
    {
      path: '/activities',
      component: RouterView,
      children: [
        {
          path: '',
          name: 'ActivityList',
          component: () => import('./List'),
        },
        {
          path: 'create',
          name: 'ActivityCreate',
          component: () => import('./Create'),
        },
        {
          path: ':id/edit',
          name: 'ActivityEdit',
          component: () => import('./Edit'),
          props: true,
        },
      ],
    },
  ],
}
