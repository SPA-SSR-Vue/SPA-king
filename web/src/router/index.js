import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main.vue'
import Home from '@/views/Home/Home.vue'
import Strategy from '@/views/Strategy/Strategy.vue'
import Competition from '@/views/Competition/Competition.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/', name: 'home', component: Home },
      { path: '/strategy', name: 'strategy', component: Strategy },
      { path: '/Competition', name: 'competition', component: Competition },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
