<template>
  <GuestLayout>
    <h2 class="mt-10 font-bold tracking-tight text-center text-gray-900 text-2xl/9">Crie sua conta</h2>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label for="name" class="block font-medium text-gray-900 text-sm/6">Nome Completo</label>
          <div class="mt-2">
            <input name="name" id="name" required v-model="data.name" class="block w-full rounded-md border border-purple-300  bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>
        <div>
          <label for="email" class="block font-medium text-gray-900 text-sm/6">E-mail</label>
          <div class="mt-2">
            <input type="email" name="email" id="email" autocomplete="email" required v-model="data.email" class="block w-full rounded-md border border-purple-300  bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block font-medium text-gray-900 text-sm/6">Senha</label>

          </div>
          <div class="mt-2">
            <input type="password" name="password" id="password" required v-model="data.password" class="block w-full rounded-md border border-purple-300  bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="passwordConfirmation" class="block font-medium text-gray-900 text-sm/6">Confirme sua senha</label>

          </div>
          <div class="mt-2">
            <input type="password" name="password" id="passwordConfirmation" required v-model="data.passwordConfirmation" class="block w-full rounded-md border border-purple-300  bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Criar Conta</button>
        </div>
      </form>

      <p class="mt-10 text-center text-gray-500 text-sm/6">
        Já possui uma conta?
        {{ ' ' }}
        <RouterLink :to="{ name: 'Login' }" href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">
          Faça o login aqui!
        </RouterLink>
      </p>
    </div>
  </GuestLayout>
</template>

<script setup>
import { ref } from "vue";
import axiosClient from "../axios.js";
import GuestLayout from "../components/GuestLayout.vue";

const data = ref({
  name: "",
  email: "",
  password: "",
  passwordConfirmation: ""
});

function submit() {
  axiosClient.post("/users", data.value)
    .catch(error => {
      alert(error.response.data.message);
    });
}

</script>

<style scoped></style>
