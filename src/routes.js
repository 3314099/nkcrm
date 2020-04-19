import VueRouter from 'vue-router'
import Register from '@/pages/user/Register'
import Login from '@/pages/user/Login'
import Business from '@/pages/crm/Business'
import CRM from '@/pages/crm/CRM'
import FinPln from '@/pages/FinPlan/FinPln'
// import Test from '@/components/test'
import fin_plan from '@/pages/FinPlan/fin_plan'
import admin from '@/pages/admin/admin'


export default new VueRouter({
    routes: [
      {
        path: '/admin',
        name: 'admin',
          meta: {
            layuot: 'CrmLayout'
          },
        component: admin
      },
      {
        path: '/accounts',
        name: 'accounts',
          meta: {
            layuot: 'CrmLayout'
          },
        component: FinPln
      },
      {
        path: '/operations',
        name: 'operations',
          meta: {
            layuot: 'CrmLayout'
          },
        component: FinPln
      },
      {
        path: '/properties',
        name: 'properties',
          meta: {
            layuot: 'CrmLayout'
          },
        component: FinPln
      },
      {
        path: '/statistic',
        name: 'statistic',
          meta: {
            layuot: 'CrmLayout'
          },
        component: FinPln
      },
      {
        path: '/register',
        name: 'register',
          meta: {
            layuot: 'EmptyLayout'
          },
        component: Register
      },
      {
      path: '/login',
      name: 'login',
        meta: {
          layuot: 'EmptyLayout',
          page: 'login'
        },
      component: Login
      },
      {
        path: '/',
        name: 'Login',
          meta: {
            layuot: 'EmptyLayout',
            page: 'login'
          },
        component: Login
        },
      {
        path: '/client',
        name: 'client',
          meta: {
            layuot: 'CrmLayout',
            page: 'client'
          },
        component: CRM
        },
        {
          path: '/business',
          name: 'business',
            meta: {
              layuot: 'CrmLayout',
              page: 'client'
            },
          component: Business
          },
          {
          path: '/accounts2',
          name: 'accounts2',
            meta: {
              layuot: 'CrmLayout',
              page: 'accounts2'
            },
          component: fin_plan
          },
    ],
    mode: 'history'
})
