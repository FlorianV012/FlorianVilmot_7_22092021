import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from "@/views/Login.vue";
import Signup from "@/views/Signup.vue";
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
    component: () => import(/* webpackChunkName: "about" */ '@/views/GifPost.vue')
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
    component: () => import("@/views/Profile.vue"),
  },
  {
    path: '/gif/:id', name: "Gif", component: Gif,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/signup', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // Redirection de l’utilisateur si celui-ci n’est pas connecté et tente d’accéder à une page nécessitant une connexion active
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
