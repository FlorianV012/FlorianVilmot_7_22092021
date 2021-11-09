import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from "@/components/Login.vue";
import Signup from "@/components/Signup.vue";
import Gif from '@/views/Gif.vue'

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
    path: '/gif',
    name: 'Gifpost',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/components/GifPost.vue')
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/signup",
    component: Signup,
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/components/Profile.vue"),
  },
  {
    path: '/gif/:id', name: "Gif", component: Gif,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router