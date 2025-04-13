import {createRouter, createWebHistory} from "vue-router";
import DefaultLayout from "./components/DefaultLayout.vue";
import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Signup from "./pages/Signup.vue";
import NotFound from "./pages/NotFound.vue";
import useUserStore from "./store/user.js";

const routes = [
  {
    path: '/',
    children: [
      { path: '/', name: 'Home', component: Home },
      { path: '/classes', name: 'Classes', component: () => import('./pages/Class.vue') },
      { path: '/register-class', name: 'ClassRegister', component: () => import('./pages/ClassRegister.vue') },
    ],
    beforeEnter: async (to, from, next) => {
      try {
        const userStore = useUserStore();
        await userStore.fetchUser();
        next();
      } catch (error) {
        next(false);
      }
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;