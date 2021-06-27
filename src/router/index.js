import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login/:session_id',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/oauth/:token',
    name: 'Oauth',
    component: () => import('../views/Oauth.vue')
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import('../views/Error.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/spending-log',
    name: 'SpendingLog.Index',
    component: () => import('../views/Spending/SpendingLogIndex.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/spending-log/:spending_id',
    name: 'SpendingLog.Detail',
    component: () => import('../views/Spending/SpendingLogDetail.vue'),
    meta: {
      requiresAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

import store from '../store'
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthorized) {
      next()
      return
    }
    store.dispatch('logout')
  } else if (to.name == 'Login' && store.getters.isAuthorized) {
    next('/')
  } else {
    next()
  }
})

export default router
