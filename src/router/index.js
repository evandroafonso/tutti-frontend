import { createRouter, createWebHistory } from "vue-router";
import CadastroUsuario from ".././pages/CadastroUsuario.vue";

const routes = [{ path: "/cadastro", component: CadastroUsuario }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
