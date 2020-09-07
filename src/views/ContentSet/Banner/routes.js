import RouterView from '@/router-view'
export default {
  path: '',
  component: RouterView,
  children: [{
    path: '/banners',
    component: RouterView,
    children: [{
        path: '',
        name: 'BannerList',
        component: () => import('./List'),
      },
      {
        path: 'create',
        name: 'BannerCreate',
        component: () => import('./Create'),
      },
      {
        path: ':id/edit',
        name: 'BannerEdit',
        component: () => import('./Edit'),
        props: true
      },
    ],
  }],
}