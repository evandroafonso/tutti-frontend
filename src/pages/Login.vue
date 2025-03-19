<script setup>
import GuestLayout from "../components/GuestLayout.vue";
console.log(GuestLayout);
</script>

<template>
  <GuestLayout>
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Acesse sua conta</h2>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">E-mail</label>
          <div class="mt-2">
            <input type="email" name="email" id="email" autocomplete="email" required="" class="block w-full rounded-md border border-gray-400 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-stone-100 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Senha</label>

          </div>
          <div class="mt-2">
            <input type="password" name="password" id="password" autocomplete="current-password" required="" class="block w-full rounded-md border border-gray-400  bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6" />
          </div>
          <div class="text-sm">
            <a href="#" class="font-semibold text-green-600 hover:text-green-500">Esqueceu sua senha?</a>
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Login</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Não possui cadastro?
        {{ ' ' }}
        <RouterLink :to="{ name: 'Signup' }" href="#" class="font-semibold text-green-600 hover:text-green-500">
          Acesse o conteúdo gratuíto
        </RouterLink>
      </p>
    </div>
  </GuestLayout>
</template>

<style scoped></style>