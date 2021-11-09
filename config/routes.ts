const isDev = process.env.NODE_ENV === 'development';

const routes = [
  { path: '/welcome', name: '欢迎', hideInMenu: !isDev, icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    component: './Admin',
    routes: [
      { path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './Welcome' },
      { component: './404' },
    ],
  },
  { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];

if (isDev) {
  routes.unshift({
    path: '/user/login',
    layout: false,
    component: './user/Login',
  });
}

export default routes;
