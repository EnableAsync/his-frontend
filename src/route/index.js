import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import BaseLayout from '../layout/BaseLayout'
import {role} from '../config/role'

export const constantRoutes = [
  {
    path: '/',
    component: BaseLayout,
    children: [
      {
        path: '/home',
        name: '主页',
        component: () => import('../view/Home'),
        role: role.admin
      },
      {
        path: '/register',
        name: '挂号',
        component: () => import('../view/registrar/Register'),
        role: role.reg
      },
      {
        path: '/register/back',
        name: '退号',
        component: () => import('../view/registrar/RegisterBack'),
        role: role.reg
      }
    ]
  }
];

export default new Router({
  mode: "history",
  routes: constantRoutes
})
