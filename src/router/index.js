import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/Login'
import home from '@/views/Home'
import welcome from '@/components/Welcome/Welcome'
import users from '@/components/users/users'
import roles from '@/components/roles/roles'
import rights from '@/components/rights/rights'
import goods from '@/components/goods/goods'
import addGoods from '@/components/goods/addGoods'
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
    component: home,
    redirect:'/welcome',
    children:[
      {
        path:'/welcome',
        component:welcome
      },
      {
        path: '/users',
        component: users
      },
      {
        path: '/roles',
        component: roles
      },
      {
        path: '/rights',
        component: rights
      },
      {
        path: '/goods',
        component:goods
      },
      {
        path: '/goods/add',
        component: addGoods
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {

  if (to.path === '/login'){
    return next()
  }
  if (sessionStorage.getItem('token') == null) {
    return next('/login')
  } else {
    next()
  }

})

export default router
