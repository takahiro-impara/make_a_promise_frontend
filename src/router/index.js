import Vue from 'vue'
import VueRouter from 'vue-router'
import { authGuard } from '../auth/authGuard'
import Home from '../views/Home.vue'

import CreateItem from "../views/CreateItem.vue";
import ImageUpload from "../views/ImageUpload.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/item',
    name: 'CreateItem',
    component: CreateItem,
    beforeEnter: authGuard

  },
  /*
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    beforeEnter: authGuard
  },
  */
  {
    path: "/:itemId/attachement",
    name: "ImageUpload",
    component: ImageUpload,
    props: true,
    beforeEnter: authGuard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
