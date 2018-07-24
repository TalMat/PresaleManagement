import Vue from 'vue'
import Router from 'vue-router'

import Portal from '@/components/Portal'



Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Portal',
      component: Portal
    }, {
      path: '/logout',
      name: 'Log Out',
      component: Portal
    }
  ]
})
