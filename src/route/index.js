import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router);

import BaseLayout from '../layout/BaseLayout'
import Login from '../view/Login'
import {role} from '../config/role'

export const constantRoutes = [
  {
    path: '/',
    component: BaseLayout,
    redirect: 'login',
    children: [
      {
        path: '/register',
        name: 'register',
        component: () => import('../view/registrar/Register'),
        role: role.reg
      },
      {
        path: '/register/back',
        name: 'registerBack',
        component: () => import('../view/registrar/RegisterBack'),
        role: role.reg
      },
      {
        path: '/payment',
        name: 'payment',
        component: () => import('../view/registrar/Payment'),
        role: role.reg
      },
      {
        path: '/diagnose',
        name: 'diagnose',
        component: () => import('../view/doctor/Diagnose'),
        role: role.doctor
      },
      {
        path: '/prescribe',
        name: 'prescribe',
        component: () => import('../view/doctor/Prescribe')
      },
      {
        path: '/send',
        name: 'send',
        component: () => import('../view/drugRoom/Send'),
        role: role.doctor
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
];

const router = new Router({
  mode: "history",
  routes: constantRoutes
});

// const whiteList = ['/login'];
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.matched.length === 0) {
    next("/login")
  }

  next();
});

router.afterEach(() => NProgress.done());

export default router;
