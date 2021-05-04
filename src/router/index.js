import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/components/Login'
import home from '@/components/Home'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/about',
  //   name: 'About'
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/home',
    component: home
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') next()

  if (to.path === '/home') {
    if (sessionStorage.getItem('token') != null) {
      next()
    }else {
      router.push({
        path:'/login'
      })
    }
  }

})

export default router
