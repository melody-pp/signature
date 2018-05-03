import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Exhibition from '@/pages/Exhibition'

Vue.use(Router)

export default new Router({
  base:'/signature/',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/exhibition',
      name: 'Exhibition',
      component: Exhibition
    },
  ]
})
