import RouterView from '@/router-view'
export default {
  path: '',
  component: RouterView,
  children: [{
    path: '/articles',
    component: RouterView,
    children: [{
        path: '',
        name: 'ArticleList',
        component: () => import('./List'),
      },
      {
        path: 'create',
        name: 'ArticleCreate',
        component: () => import('./Create'),
      },
      {
        path: ':id/edit',
        name: 'ArticleEdit',
        component: () => import('./Edit'),
        props: true
      },
    ],
  }],
}