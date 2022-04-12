import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Publish from '../views/Publish.vue'
import Article from '../views/Article.vue'
import Tagi from '../views/Tagi.vue'
import LogIn from '../views/LogIn.vue'
import Chosen from '../views/Chosen.vue'
import EditArticle from '../views/EditArticle.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/edytuj/:id',
    name: 'Home',
    component: EditArticle
  },
  {
    path: '/dostep/:nazwa',
    name: 'Home',
    component: Chosen
  },
  {
    path: '/logowanie',
    name: 'Home',
    component: LogIn
  },
  {
    path: '/wyswietl/:id/',
    name: 'Home',
    component: Article
  },
  {
    path: '/slowa/',
    name: 'Home',
    component: Tagi
  },
  {
    path: '/dodaj/',
    name: 'Home',
    component: Publish
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
